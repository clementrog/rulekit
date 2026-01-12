'use client';

import { useState } from 'react';
import { useSelection } from '@/context/SelectionContext';
import { BundleModal } from './BundleModal';

export function BundleBar() {
  const { selectedRules, clearSelection, maxRules } = useSelection();
  const [showModal, setShowModal] = useState(false);
  const count = selectedRules.length;
  const atLimit = count >= maxRules;

  if (count === 0) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white px-4 py-3 shadow-lg dark:border-gray-800 dark:bg-gray-900 md:left-64">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {count} rule{count !== 1 ? 's' : ''} selected
              {atLimit && <span className="ml-2 text-xs text-gray-500">(max {maxRules})</span>}
            </span>
            <button
              onClick={clearSelection}
              className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Clear
            </button>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Generate Bundle
          </button>
        </div>
      </div>
      {showModal && <BundleModal onClose={() => setShowModal(false)} />}
    </>
  );
}
