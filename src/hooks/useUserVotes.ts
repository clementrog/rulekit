'use client';

import { useEffect, useState, useCallback } from 'react';
import { getOrCreateRulekitId } from '@/lib/identity';

export type UserVote = 'upvote' | 'downvote' | null;

export interface UseUserVotesResult {
  votes: Record<string, UserVote>;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Hook to fetch and manage user votes for rules.
 * Fetches votes based on the user's rulekit_id (anonymous identity).
 */
export function useUserVotes(ruleIds: string[]): UseUserVotesResult {
  const [votes, setVotes] = useState<Record<string, UserVote>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchVotes = useCallback(async () => {
    if (ruleIds.length === 0) {
      setVotes({});
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const rulekitId = getOrCreateRulekitId();
      
      const response = await fetch('/api/votes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rulekitId,
          ruleIds,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      setVotes(data.votes || {});
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      setVotes({});
    } finally {
      setLoading(false);
    }
  }, [ruleIds.join(',')]); // Re-fetch when ruleIds change

  useEffect(() => {
    fetchVotes();
  }, [fetchVotes]);

  return {
    votes,
    loading,
    error,
    refetch: fetchVotes,
  };
}
