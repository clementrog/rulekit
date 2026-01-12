'use client';

import type { Database } from '@/lib/database.types';
import { ToolBadge } from './ToolBadge';
import { VoteButtons } from './VoteButtons';
import { useSelection } from '@/context/SelectionContext';
import type { UserVote } from '@/hooks/useUserVotes';

type Rule = Database['public']['Tables']['rules']['Row'];

interface RuleCardProps {
  rule: Rule;
  userVote?: UserVote;
  onVoteChange?: (ruleId: string, voteType: UserVote) => void;
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function RuleCard({ rule, userVote = null, onVoteChange }: RuleCardProps) {
  const { isSelected, toggleRule, selectedRules, maxRules } = useSelection();
  const selected = isSelected(rule.id);
  const contentPreview = truncateText(rule.content, 200);
  const atLimit = selectedRules.length >= maxRules && !selected;

  return (
    <div className="group rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700 dark:hover:bg-gray-800">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => toggleRule(rule.id)}
            disabled={atLimit}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-600 dark:bg-gray-800"
            aria-label={`Select rule: ${rule.title}`}
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {rule.title}
            </h3>
            {rule.description && (
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                {rule.description}
              </p>
            )}
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {contentPreview}
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1">
          {rule.tools.map((tool) => (
            <ToolBadge key={tool} tool={tool} />
          ))}
        </div>
        
        <VoteButtons 
          rule={rule} 
          userVote={userVote}
          onVoteChange={onVoteChange}
        />
      </div>
    </div>
  );
}
