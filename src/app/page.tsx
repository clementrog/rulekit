'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useRules } from '@/hooks/useRules';
import { useUserVotes } from '@/hooks/useUserVotes';
import { RuleCard } from '@/components/RuleCard';
import { FilterPanel } from '@/components/FilterPanel';
import { SearchInput } from '@/components/SearchInput';
import { EmptyState } from '@/components/EmptyState';
import { SelectionProvider } from '@/context/SelectionContext';
import { BundleBar } from '@/components/BundleBar';
import type { UserVote } from '@/hooks/useUserVotes';

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
        >
          <div className="h-4 w-3/4 bg-gray-200 rounded mb-2 dark:bg-gray-700 animate-pulse" />
          <div className="h-3 w-full bg-gray-200 rounded mb-1 dark:bg-gray-700 animate-pulse" />
          <div className="h-3 w-5/6 bg-gray-200 rounded dark:bg-gray-700 animate-pulse" />
        </div>
      ))}
    </div>
  );
}

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Parse URL params
  const toolsParam = searchParams.get('tools')?.split(',').filter(Boolean) || [];
  const taskTypesParam = searchParams.get('task_types')?.split(',').filter(Boolean) || [];
  const stacksParam = searchParams.get('stacks')?.split(',').filter(Boolean) || [];
  const searchParam = searchParams.get('search') || '';

  // Default: cursor selected
  const [tools, setTools] = useState<string[]>(
    toolsParam.length > 0 ? toolsParam : ['cursor']
  );
  const [taskTypes, setTaskTypes] = useState<string[]>(taskTypesParam);
  const [stacks, setStacks] = useState<string[]>(stacksParam);
  const [search, setSearch] = useState<string>(searchParam);

  // Update URL when filters change
  const updateURL = useCallback(
    (newTools: string[], newTaskTypes: string[], newStacks: string[], newSearch: string) => {
      const params = new URLSearchParams();

      if (newTools.length > 0 && !(newTools.length === 1 && newTools[0] === 'cursor')) {
        params.set('tools', newTools.join(','));
      }
      if (newTaskTypes.length > 0) {
        params.set('task_types', newTaskTypes.join(','));
      }
      if (newStacks.length > 0) {
        params.set('stacks', newStacks.join(','));
      }
      if (newSearch.trim()) {
        params.set('search', newSearch.trim());
      }

      const queryString = params.toString();
      const newURL = queryString ? `/?${queryString}` : '/';
      router.replace(newURL, { scroll: false });
    },
    [router]
  );

  // Sync state with URL on mount
  useEffect(() => {
    if (toolsParam.length > 0) {
      setTools(toolsParam);
    }
    if (taskTypesParam.length > 0) {
      setTaskTypes(taskTypesParam);
    }
    if (stacksParam.length > 0) {
      setStacks(stacksParam);
    }
    if (searchParam) {
      setSearch(searchParam);
    }
  }, []); // Only on mount

  // Update URL when filters change (debounced for search)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateURL(tools, taskTypes, stacks, search);
    }, search ? 300 : 0); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [tools, taskTypes, stacks, search, updateURL]);

  const { rules, loading, error } = useRules({
    tools,
    taskTypes,
    stacks,
    search,
  });

  // Fetch user votes for all rules
  const ruleIds = rules.map((r) => r.id);
  const { votes: userVotes, refetch: refetchVotes } = useUserVotes(ruleIds);

  const handleVoteChange = useCallback((ruleId: string, voteType: UserVote) => {
    // Refetch votes to ensure consistency
    refetchVotes();
  }, [refetchVotes]);

  return (
    <SelectionProvider rules={rules}>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 md:pb-16">
      {/* Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:border-r md:border-gray-200 md:bg-white dark:md:border-gray-800 dark:md:bg-gray-900">
        <div className="flex h-16 items-center border-b border-gray-200 px-4 dark:border-gray-800">
          <h1 className="text-sm font-semibold text-gray-900 dark:text-gray-100">RuleKit</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <FilterPanel
            tools={tools}
            taskTypes={taskTypes}
            stacks={stacks}
            onToolsChange={setTools}
            onTaskTypesChange={setTaskTypes}
            onStacksChange={setStacks}
          />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Header with search */}
        <div className="sticky top-0 z-10 border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900">
          <div className="mx-auto max-w-4xl">
            <SearchInput value={search} onChange={setSearch} />
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-4xl p-4">
            {loading ? (
              <LoadingSkeleton />
            ) : error ? (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
                <p className="text-sm text-red-800 dark:text-red-200">
                  Error loading rules: {error.message}
                </p>
              </div>
            ) : rules.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="space-y-4">
                {rules.map((rule) => (
                  <RuleCard 
                    key={rule.id} 
                    rule={rule} 
                    userVote={userVotes[rule.id] || null}
                    onVoteChange={handleVoteChange}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile filter button */}
      <button
        className="fixed bottom-4 right-4 rounded-full bg-blue-600 p-3 text-white shadow-lg md:hidden"
        onClick={() => {
          // TODO: Implement mobile filter drawer
          alert('Mobile filter drawer - to be implemented');
        }}
        aria-label="Open filters"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
      </button>
      
      <BundleBar />
      </div>
    </SelectionProvider>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <HomeContent />
    </Suspense>
  );
}
