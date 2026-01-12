-- Migration 002: Schema Gaps - Filters & Anonymous Voting
-- Adds filter columns, anonymous voting support, and fixes FTS config

-- Add filter columns to rules table
ALTER TABLE rules
  ADD COLUMN IF NOT EXISTS tools TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS task_types TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS stacks TEXT[] DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS content_hash TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS upvotes INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS downvotes INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS verified_upvotes INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS verified_downvotes INTEGER NOT NULL DEFAULT 0;

-- Add identity_hash to votes table for anonymous voting
ALTER TABLE votes
  ADD COLUMN IF NOT EXISTS identity_hash TEXT DEFAULT NULL;

-- Make user_id nullable to support anonymous votes
-- Note: For anonymous votes, user_id will be NULL and identity_hash will be set
ALTER TABLE votes
  ALTER COLUMN user_id DROP NOT NULL;

-- Drop the existing unique constraint on (rule_id, user_id) since user_id can now be NULL
ALTER TABLE votes
  DROP CONSTRAINT IF EXISTS votes_rule_id_user_id_key;

-- Drop existing partial unique indexes
DROP INDEX IF EXISTS votes_rule_user_upvote_unique;
DROP INDEX IF EXISTS votes_rule_user_downvote_unique;

-- Create new partial unique indexes supporting both authenticated and anonymous votes
-- For authenticated users: (rule_id, user_id) must be unique
CREATE UNIQUE INDEX votes_rule_user_upvote_unique 
  ON votes (rule_id, user_id) 
  WHERE vote_type = 'upvote' AND user_id IS NOT NULL;

CREATE UNIQUE INDEX votes_rule_user_downvote_unique 
  ON votes (rule_id, user_id) 
  WHERE vote_type = 'downvote' AND user_id IS NOT NULL;

-- For anonymous votes: (rule_id, identity_hash) must be unique
CREATE UNIQUE INDEX votes_rule_identity_upvote_unique 
  ON votes (rule_id, identity_hash) 
  WHERE vote_type = 'upvote' AND identity_hash IS NOT NULL;

CREATE UNIQUE INDEX votes_rule_identity_downvote_unique 
  ON votes (rule_id, identity_hash) 
  WHERE vote_type = 'downvote' AND identity_hash IS NOT NULL;

-- Add constraint: either user_id or identity_hash must be set
ALTER TABLE votes
  ADD CONSTRAINT votes_user_or_identity_check 
  CHECK ((user_id IS NOT NULL AND identity_hash IS NULL) OR (user_id IS NULL AND identity_hash IS NOT NULL));

-- Drop the old FTS column and index
ALTER TABLE rules DROP COLUMN IF EXISTS fts;
DROP INDEX IF EXISTS rules_fts_idx;

-- Recreate FTS column with 'simple' config instead of 'english'
ALTER TABLE rules
  ADD COLUMN fts TSVECTOR GENERATED ALWAYS AS (
    setweight(to_tsvector('simple', COALESCE(title, '')), 'A') ||
    setweight(to_tsvector('simple', COALESCE(description, '')), 'B') ||
    setweight(to_tsvector('simple', COALESCE(content, '')), 'C')
  ) STORED;

-- Recreate FTS index
CREATE INDEX rules_fts_idx ON rules USING GIN (fts);

-- Drop and recreate cast_vote() function to support identity_hash
DROP FUNCTION IF EXISTS cast_vote(UUID, UUID, TEXT);

CREATE OR REPLACE FUNCTION cast_vote(
  p_rule_id UUID,
  p_user_id UUID DEFAULT NULL,
  p_identity_hash TEXT DEFAULT NULL,
  p_vote_type TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_result JSONB;
  v_existing_vote votes%ROWTYPE;
  v_vote_id UUID;
BEGIN
  -- Validate that either user_id or identity_hash is provided
  IF (p_user_id IS NULL AND p_identity_hash IS NULL) THEN
    RAISE EXCEPTION 'Either user_id or identity_hash must be provided';
  END IF;

  IF (p_user_id IS NOT NULL AND p_identity_hash IS NOT NULL) THEN
    RAISE EXCEPTION 'Cannot provide both user_id and identity_hash';
  END IF;

  -- Check if vote already exists
  IF p_user_id IS NOT NULL THEN
    SELECT * INTO v_existing_vote
    FROM votes
    WHERE rule_id = p_rule_id AND user_id = p_user_id;
  ELSE
    SELECT * INTO v_existing_vote
    FROM votes
    WHERE rule_id = p_rule_id AND identity_hash = p_identity_hash;
  END IF;

  IF v_existing_vote IS NOT NULL THEN
    -- Update existing vote if different type
    IF v_existing_vote.vote_type != p_vote_type THEN
      UPDATE votes
      SET vote_type = p_vote_type, created_at = NOW()
      WHERE id = v_existing_vote.id;
      v_vote_id := v_existing_vote.id;
    ELSE
      -- Same vote type, delete it (toggle off)
      DELETE FROM votes WHERE id = v_existing_vote.id;
      v_vote_id := NULL;
    END IF;
  ELSE
    -- Insert new vote
    INSERT INTO votes (rule_id, user_id, identity_hash, vote_type)
    VALUES (p_rule_id, p_user_id, p_identity_hash, p_vote_type)
    RETURNING id INTO v_vote_id;
  END IF;

  -- Update vote counts on rules table
  UPDATE rules
  SET 
    upvotes = (SELECT COUNT(*) FROM votes WHERE rule_id = p_rule_id AND vote_type = 'upvote'),
    downvotes = (SELECT COUNT(*) FROM votes WHERE rule_id = p_rule_id AND vote_type = 'downvote'),
    verified_upvotes = (SELECT COUNT(*) FROM votes WHERE rule_id = p_rule_id AND vote_type = 'upvote' AND user_id IS NOT NULL),
    verified_downvotes = (SELECT COUNT(*) FROM votes WHERE rule_id = p_rule_id AND vote_type = 'downvote' AND user_id IS NOT NULL)
  WHERE id = p_rule_id;

  -- Return vote counts and current vote
  SELECT jsonb_build_object(
    'upvotes', (SELECT COUNT(*) FROM votes WHERE rule_id = p_rule_id AND vote_type = 'upvote'),
    'downvotes', (SELECT COUNT(*) FROM votes WHERE rule_id = p_rule_id AND vote_type = 'downvote'),
    'verified_upvotes', (SELECT COUNT(*) FROM votes WHERE rule_id = p_rule_id AND vote_type = 'upvote' AND user_id IS NOT NULL),
    'verified_downvotes', (SELECT COUNT(*) FROM votes WHERE rule_id = p_rule_id AND vote_type = 'downvote' AND user_id IS NOT NULL),
    'user_vote', (
      SELECT vote_type FROM votes 
      WHERE rule_id = p_rule_id 
        AND (
          (p_user_id IS NOT NULL AND user_id = p_user_id) OR
          (p_identity_hash IS NOT NULL AND identity_hash = p_identity_hash)
        )
      LIMIT 1
    )
  ) INTO v_result;

  RETURN v_result;
END;
$$;

-- Update match_rules() function to use 'simple' config
DROP FUNCTION IF EXISTS match_rules(TEXT, INTEGER, TEXT, TEXT[]);

CREATE OR REPLACE FUNCTION match_rules(
  p_query TEXT,
  p_limit INTEGER DEFAULT 20,
  p_category TEXT DEFAULT NULL,
  p_tags TEXT[] DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  description TEXT,
  content TEXT,
  category TEXT,
  tags TEXT[],
  status TEXT,
  created_at TIMESTAMPTZ,
  rank REAL
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    r.id,
    r.title,
    r.description,
    r.content,
    r.category,
    r.tags,
    r.status,
    r.created_at,
    ts_rank(r.fts, plainto_tsquery('simple', p_query)) AS rank
  FROM rules r
  WHERE r.status = 'approved'
    AND r.fts @@ plainto_tsquery('simple', p_query)
    AND (p_category IS NULL OR r.category = p_category)
    AND (p_tags IS NULL OR r.tags && p_tags)
  ORDER BY rank DESC, r.created_at DESC
  LIMIT p_limit;
END;
$$;

-- Add indexes for new filter columns
CREATE INDEX IF NOT EXISTS rules_tools_idx ON rules USING GIN (tools);
CREATE INDEX IF NOT EXISTS rules_task_types_idx ON rules USING GIN (task_types);
CREATE INDEX IF NOT EXISTS rules_stacks_idx ON rules USING GIN (stacks);
CREATE INDEX IF NOT EXISTS rules_content_hash_idx ON rules(content_hash);

-- Add index for identity_hash in votes
CREATE INDEX IF NOT EXISTS votes_identity_hash_idx ON votes(identity_hash);
