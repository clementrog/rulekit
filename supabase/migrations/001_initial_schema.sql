-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgvector"; -- For embeddings/semantic search

-- Users table (for GitHub OAuth)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  github_id TEXT UNIQUE NOT NULL,
  github_username TEXT NOT NULL,
  github_avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Rules table
CREATE TABLE rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  content TEXT NOT NULL, -- The actual rule content
  category TEXT,
  tags TEXT[], -- Array of tags
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  -- Full-text search column (computed)
  fts TSVECTOR GENERATED ALWAYS AS (
    setweight(to_tsvector('english', COALESCE(title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(description, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(content, '')), 'C')
  ) STORED
);

-- Votes table with dual-key partial unique indexes
CREATE TABLE votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rule_id UUID NOT NULL REFERENCES rules(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  vote_type TEXT NOT NULL CHECK (vote_type IN ('upvote', 'downvote')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (rule_id, user_id) -- One vote per user per rule
);

-- Partial unique indexes for dual-key constraint
-- This ensures a user can only have one upvote OR one downvote per rule
CREATE UNIQUE INDEX votes_rule_user_upvote_unique 
  ON votes (rule_id, user_id) 
  WHERE vote_type = 'upvote';

CREATE UNIQUE INDEX votes_rule_user_downvote_unique 
  ON votes (rule_id, user_id) 
  WHERE vote_type = 'downvote';

-- Full-text search index on rules
CREATE INDEX rules_fts_idx ON rules USING GIN (fts);

-- Indexes for common queries
CREATE INDEX rules_status_idx ON rules(status);
CREATE INDEX rules_created_by_idx ON rules(created_by);
CREATE INDEX votes_rule_id_idx ON votes(rule_id);
CREATE INDEX votes_user_id_idx ON votes(user_id);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Users: Anyone can read, authenticated users can update their own
CREATE POLICY "Users are viewable by everyone"
  ON users FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  USING (auth.uid()::text = id::text);

-- Rules: Everyone can read approved rules, authenticated users can create
CREATE POLICY "Approved rules are viewable by everyone"
  ON rules FOR SELECT
  USING (status = 'approved' OR created_by::text = auth.uid()::text);

CREATE POLICY "Authenticated users can create rules"
  ON rules FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own rules"
  ON rules FOR UPDATE
  USING (created_by::text = auth.uid()::text);

-- Votes: Everyone can read, authenticated users can vote
CREATE POLICY "Votes are viewable by everyone"
  ON votes FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can vote"
  ON votes FOR INSERT
  WITH CHECK (auth.role() = 'authenticated' AND user_id::text = auth.uid()::text);

CREATE POLICY "Users can update their own votes"
  ON votes FOR UPDATE
  USING (user_id::text = auth.uid()::text);

CREATE POLICY "Users can delete their own votes"
  ON votes FOR DELETE
  USING (user_id::text = auth.uid()::text);

-- Function: cast_vote() - Atomic vote function
CREATE OR REPLACE FUNCTION cast_vote(
  p_rule_id UUID,
  p_user_id UUID,
  p_vote_type TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_result JSONB;
  v_existing_vote votes%ROWTYPE;
BEGIN
  -- Check if vote already exists
  SELECT * INTO v_existing_vote
  FROM votes
  WHERE rule_id = p_rule_id AND user_id = p_user_id;

  IF v_existing_vote IS NOT NULL THEN
    -- Update existing vote if different type
    IF v_existing_vote.vote_type != p_vote_type THEN
      UPDATE votes
      SET vote_type = p_vote_type, created_at = NOW()
      WHERE id = v_existing_vote.id;
    ELSE
      -- Same vote type, delete it (toggle off)
      DELETE FROM votes WHERE id = v_existing_vote.id;
    END IF;
  ELSE
    -- Insert new vote
    INSERT INTO votes (rule_id, user_id, vote_type)
    VALUES (p_rule_id, p_user_id, p_vote_type);
  END IF;

  -- Return vote counts
  SELECT jsonb_build_object(
    'upvotes', COUNT(*) FILTER (WHERE vote_type = 'upvote'),
    'downvotes', COUNT(*) FILTER (WHERE vote_type = 'downvote'),
    'user_vote', (
      SELECT vote_type FROM votes 
      WHERE rule_id = p_rule_id AND user_id = p_user_id
      LIMIT 1
    )
  ) INTO v_result
  FROM votes
  WHERE rule_id = p_rule_id;

  RETURN v_result;
END;
$$;

-- Function: claim_pending_rules() - Claim pending rules for review
CREATE OR REPLACE FUNCTION claim_pending_rules(
  p_user_id UUID,
  p_limit INTEGER DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  description TEXT,
  content TEXT,
  category TEXT,
  tags TEXT[],
  created_at TIMESTAMPTZ
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
    r.created_at
  FROM rules r
  WHERE r.status = 'pending'
    AND (r.created_by IS NULL OR r.created_by != p_user_id)
  ORDER BY r.created_at ASC
  LIMIT p_limit;
END;
$$;

-- Function: match_rules() - Semantic search using embeddings
-- Note: This is a placeholder for semantic search. In production, you'd use pgvector
-- with actual embeddings. For now, it uses full-text search as a fallback.
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
    ts_rank(r.fts, plainto_tsquery('english', p_query)) AS rank
  FROM rules r
  WHERE r.status = 'approved'
    AND r.fts @@ plainto_tsquery('english', p_query)
    AND (p_category IS NULL OR r.category = p_category)
    AND (p_tags IS NULL OR r.tags && p_tags)
  ORDER BY rank DESC, r.created_at DESC
  LIMIT p_limit;
END;
$$;

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rules_updated_at
  BEFORE UPDATE ON rules
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
