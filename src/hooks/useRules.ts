'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/database.types';

type Rule = Database['public']['Tables']['rules']['Row'];

export interface UseRulesFilters {
  tools: string[];
  taskTypes: string[];
  stacks: string[];
  search: string;
}

export interface UseRulesResult {
  rules: Rule[];
  loading: boolean;
  error: Error | null;
}

export function useRules(filters: UseRulesFilters): UseRulesResult {
  const [rules, setRules] = useState<Rule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchRules() {
      try {
        setLoading(true);
        setError(null);

        // Check if Supabase is configured
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
          throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL.');
        }

        let query = supabase
          .from('rules')
          .select('*')
          .eq('status', 'approved')
          .order('created_at', { ascending: false });

        // Filter by tools (if any selected)
        // Use contains with single-element arrays to check if column contains that value
        // Then combine with OR logic
        if (filters.tools.length > 0) {
          // For array overlap (any match), we check each tool individually
          // Supabase's contains checks if column array contains all elements in filter array
          // So we use single-element arrays and combine with OR
          const toolOrConditions = filters.tools
            .map((tool) => `tools.cs.{${tool}}`)
            .join(',');
          query = (query as any).or(toolOrConditions);
        }

        // Filter by task_types (if any selected)
        if (filters.taskTypes.length > 0) {
          const taskTypeOrConditions = filters.taskTypes
            .map((taskType) => `task_types.cs.{${taskType}}`)
            .join(',');
          query = (query as any).or(taskTypeOrConditions);
        }

        // Filter by stacks (if any selected)
        if (filters.stacks.length > 0) {
          const stackOrConditions = filters.stacks
            .map((stack) => `stacks.cs.{${stack}}`)
            .join(',');
          query = (query as any).or(stackOrConditions);
        }

        // Full-text search
        if (filters.search.trim()) {
          query = query.textSearch('fts', filters.search.trim(), {
            type: 'plain',
            config: 'simple',
          });
        }

        const { data, error: fetchError } = await query;

        if (cancelled) return;

        if (fetchError) {
          setError(fetchError);
          setRules([]);
        } else {
          setRules(data || []);
        }
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setRules([]);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchRules();

    return () => {
      cancelled = true;
    };
  }, [filters.tools, filters.taskTypes, filters.stacks, filters.search]);

  return { rules, loading, error };
}
