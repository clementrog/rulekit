'use client';

import { useState, useEffect } from 'react';
import { useSelection } from '@/context/SelectionContext';
import { generateBundle, downloadBundle, copyToClipboard, getFilename, type Tool } from '@/lib/bundle';

const TOOLS: { value: Tool; label: string }[] = [
  { value: 'cursor', label: 'Cursor' },
  { value: 'claude_code', label: 'Claude Code' },
  { value: 'copilot', label: 'GitHub Copilot' },
  { value: 'windsurf', label: 'Windsurf' },
];

interface BundleModalProps {
  onClose: () => void;
}

export function BundleModal({ onClose }: BundleModalProps) {
  const { selectedRules } = useSelection();
  const [tool, setTool] = useState<Tool>('cursor');
  const [copied, setCopied] = useState(false);
  const [bundleContent, setBundleContent] = useState('');

  useEffect(() => {
    const content = generateBundle({ tool, rules: selectedRules });
    setBundleContent(content);
  }, [tool, selectedRules]);

  const handleCopy = async () => {
    try {
      await copyToClipboard(bundleContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    const filename = getFilename(tool);
    downloadBundle(bundleContent, filename);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col rounded-lg bg-white shadow-xl dark:bg-gray-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Generate Bundle
          </h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Close"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Tool Selector */}
        <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Select Tool
          </label>
          <div className="flex gap-2">
            {TOOLS.map((t) => (
              <button
                key={t.value}
                onClick={() => setTool(t.value)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  tool === t.value
                    ? 'bg-blue-600 text-white dark:bg-blue-500'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            File: <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-800">{getFilename(tool)}</code>
          </p>
        </div>

        {/* Preview */}
        <div className="flex-1 overflow-auto px-6 py-4">
          <div className="rounded-md border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950">
            <pre className="whitespace-pre-wrap font-mono text-xs text-gray-800 dark:text-gray-200">
              {bundleContent}
            </pre>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4 dark:border-gray-800">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {selectedRules.length} rule{selectedRules.length !== 1 ? 's' : ''} included
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleCopy}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                copied
                  ? 'bg-green-600 text-white dark:bg-green-500'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              onClick={handleDownload}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
