'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { Database } from '@/lib/database.types';

type Rule = Database['public']['Tables']['rules']['Row'];

interface SelectionContextType {
  selectedIds: Set<string>;
  selectedRules: Rule[];
  toggleRule: (ruleId: string) => void;
  isSelected: (ruleId: string) => boolean;
  clearSelection: () => void;
  addRule: (rule: Rule) => void;
  removeRule: (ruleId: string) => void;
  maxRules: number;
}

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

const STORAGE_KEY = 'rulekit-selected-rules';
const MAX_RULES = 25;

interface SelectionProviderProps {
  children: ReactNode;
  rules: Rule[]; // All available rules (for lookup)
}

export function SelectionProvider({ children, rules }: SelectionProviderProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const ids = JSON.parse(stored) as string[];
        setSelectedIds(new Set(ids.slice(0, MAX_RULES)));
      }
    } catch (err) {
      // Ignore localStorage errors
    }
  }, []);

  // Save to localStorage when selection changes
  useEffect(() => {
    try {
      if (selectedIds.size > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(selectedIds)));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (err) {
      // Ignore localStorage errors
    }
  }, [selectedIds]);

  const toggleRule = useCallback((ruleId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(ruleId)) {
        next.delete(ruleId);
      } else {
        // Enforce max rules limit
        if (next.size >= MAX_RULES) {
          return next; // Don't add if at limit
        }
        next.add(ruleId);
      }
      return next;
    });
  }, []);

  const isSelected = useCallback(
    (ruleId: string) => {
      return selectedIds.has(ruleId);
    },
    [selectedIds]
  );

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const addRule = useCallback(
    (rule: Rule) => {
      if (selectedIds.size >= MAX_RULES) return;
      setSelectedIds((prev) => new Set(prev).add(rule.id));
    },
    [selectedIds.size]
  );

  const removeRule = useCallback((ruleId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(ruleId);
      return next;
    });
  }, []);

  // Get selected rules from the rules array
  const selectedRules = rules.filter((rule) => selectedIds.has(rule.id));

  const value: SelectionContextType = {
    selectedIds,
    selectedRules,
    toggleRule,
    isSelected,
    clearSelection,
    addRule,
    removeRule,
    maxRules: MAX_RULES,
  };

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
}

export function useSelection() {
  const context = useContext(SelectionContext);
  if (context === undefined) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
}
