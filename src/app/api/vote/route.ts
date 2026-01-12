import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseAdmin } from '@/lib/supabase';
import { voteRateLimiter } from '@/lib/ratelimit';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ruleId, rulekitId, voteType } = body;

    // Validate input
    if (!ruleId || !rulekitId || !voteType) {
      return NextResponse.json(
        { error: 'Missing required fields: ruleId, rulekitId, voteType' },
        { status: 400 }
      );
    }

    if (voteType !== 'upvote' && voteType !== 'downvote') {
      return NextResponse.json(
        { error: 'voteType must be "upvote" or "downvote"' },
        { status: 400 }
      );
    }

    // Compute identity hash (server-side, synchronous)
    let identityHash: string;
    try {
      // On server, use Node.js crypto directly
      const crypto = require('crypto');
      const IDENTITY_SECRET = process.env.IDENTITY_SECRET;
      if (!IDENTITY_SECRET) {
        throw new Error('IDENTITY_SECRET is not configured');
      }
      identityHash = crypto
        .createHmac('sha256', IDENTITY_SECRET)
        .update(rulekitId)
        .digest('hex');
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to compute identity hash. IDENTITY_SECRET may not be configured.' },
        { status: 500 }
      );
    }

    // Rate limiting
    const rateLimitResult = await voteRateLimiter.limit(identityHash);
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded',
          retryAfter: rateLimitResult.reset
        },
        { status: 429 }
      );
    }

    // Call cast_vote function via Supabase
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase.rpc('cast_vote', {
      p_rule_id: ruleId,
      p_user_id: null,
      p_identity_hash: identityHash,
      p_vote_type: voteType,
    } as any);

    if (error) {
      console.error('Error calling cast_vote:', error);
      return NextResponse.json(
        { error: 'Failed to cast vote', details: error.message },
        { status: 500 }
      );
    }

    // data is the JSONB returned by cast_vote
    const result = data as any;

    return NextResponse.json({
      success: true,
      ...(result || {}),
    });
  } catch (error) {
    console.error('Error in vote API route:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
