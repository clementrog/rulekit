import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { rulekitId, ruleIds } = body;

    // Validate input
    if (!rulekitId || !ruleIds || !Array.isArray(ruleIds)) {
      return NextResponse.json(
        { error: 'Missing required fields: rulekitId, ruleIds (array)' },
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

    // Fetch votes for these rules with this identity_hash
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from('votes')
      .select('rule_id, vote_type')
      .eq('identity_hash', identityHash)
      .in('rule_id', ruleIds);

    if (error) {
      console.error('Error fetching votes:', error);
      return NextResponse.json(
        { error: 'Failed to fetch votes', details: error.message },
        { status: 500 }
      );
    }

    // Convert to map: ruleId -> voteType
    const voteMap: Record<string, 'upvote' | 'downvote'> = {};
    if (data && Array.isArray(data)) {
      for (const vote of data as Array<{ rule_id: string; vote_type: 'upvote' | 'downvote' }>) {
        if (vote && vote.rule_id && vote.vote_type) {
          voteMap[vote.rule_id] = vote.vote_type;
        }
      }
    }

    return NextResponse.json({
      success: true,
      votes: voteMap,
    });
  } catch (error) {
    console.error('Error in votes API route:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
