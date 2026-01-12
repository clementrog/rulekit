'use client';

import { useState, useCallback } from 'react';
import { getOrCreateRulekitId } from '@/lib/identity';
import type { Database } from '@/lib/database.types';

type Rule = Database['public']['Tables']['rules']['Row'];

interface VoteButtonsProps {
  rule: Rule;
  userVote: 'upvote' | 'downvote' | null;
  onVoteChange?: (ruleId: string, voteType: 'upvote' | 'downvote' | null) => void;
}

export function VoteButtons({ rule, userVote, onVoteChange }: VoteButtonsProps) {
  const [isVoting, setIsVoting] = useState(false);
  const [optimisticVote, setOptimisticVote] = useState<'upvote' | 'downvote' | null>(userVote);
  const [optimisticUpvotes, setOptimisticUpvotes] = useState(rule.upvotes);
  const [optimisticDownvotes, setOptimisticDownvotes] = useState(rule.downvotes);

  const handleVote = useCallback(
    async (voteType: 'upvote' | 'downvote') => {
      if (isVoting) return;

      const rulekitId = getOrCreateRulekitId();
      const previousVote = optimisticVote;
      const previousUpvotes = optimisticUpvotes;
      const previousDownvotes = optimisticDownvotes;

      // Optimistic update
      setIsVoting(true);
      
      // Determine new vote state
      let newVote: 'upvote' | 'downvote' | null;
      let newUpvotes = optimisticUpvotes;
      let newDownvotes = optimisticDownvotes;

      if (previousVote === voteType) {
        // Toggle off: remove vote
        newVote = null;
        if (voteType === 'upvote') {
          newUpvotes = Math.max(0, optimisticUpvotes - 1);
        } else {
          newDownvotes = Math.max(0, optimisticDownvotes - 1);
        }
      } else if (previousVote === null) {
        // Add new vote
        newVote = voteType;
        if (voteType === 'upvote') {
          newUpvotes = optimisticUpvotes + 1;
        } else {
          newDownvotes = optimisticDownvotes + 1;
        }
      } else {
        // Switch vote type
        newVote = voteType;
        if (voteType === 'upvote') {
          newUpvotes = optimisticUpvotes + 1;
          newDownvotes = Math.max(0, optimisticDownvotes - 1);
        } else {
          newDownvotes = optimisticDownvotes + 1;
          newUpvotes = Math.max(0, optimisticUpvotes - 1);
        }
      }

      setOptimisticVote(newVote);
      setOptimisticUpvotes(newUpvotes);
      setOptimisticDownvotes(newDownvotes);

      try {
        const response = await fetch('/api/vote', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ruleId: rule.id,
            rulekitId,
            voteType,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP ${response.status}`);
        }

        const data = await response.json();
        
        // Update with server response
        setOptimisticUpvotes(data.upvotes);
        setOptimisticDownvotes(data.downvotes);
        setOptimisticVote(data.user_vote || null);
        
        // Notify parent component
        if (onVoteChange) {
          onVoteChange(rule.id, data.user_vote || null);
        }
      } catch (error) {
        // Rollback optimistic update
        setOptimisticVote(previousVote);
        setOptimisticUpvotes(previousUpvotes);
        setOptimisticDownvotes(previousDownvotes);
        
        // Show error (you could use a toast library here)
        console.error('Failed to vote:', error);
        alert(error instanceof Error ? error.message : 'Failed to vote. Please try again.');
      } finally {
        setIsVoting(false);
      }
    },
    [rule.id, optimisticVote, optimisticUpvotes, optimisticDownvotes, isVoting, onVoteChange]
  );

  const isUpvoted = optimisticVote === 'upvote';
  const isDownvoted = optimisticVote === 'downvote';

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleVote('upvote')}
        disabled={isVoting}
        className={`
          flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors
          ${isUpvoted 
            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
          }
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
        aria-label={`Upvote ${rule.title}`}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
        <span>{optimisticUpvotes}</span>
      </button>
      
      <button
        onClick={() => handleVote('downvote')}
        disabled={isVoting}
        className={`
          flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors
          ${isDownvoted 
            ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
          }
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
        aria-label={`Downvote ${rule.title}`}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
        <span>{optimisticDownvotes}</span>
      </button>
    </div>
  );
}
