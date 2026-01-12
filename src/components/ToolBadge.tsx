interface ToolBadgeProps {
  tool: string;
}

const toolLabels: Record<string, string> = {
  cursor: 'Cursor',
  claude_code: 'Claude Code',
  copilot: 'Copilot',
  windsurf: 'Windsurf',
};

export function ToolBadge({ tool }: ToolBadgeProps) {
  const label = toolLabels[tool] || tool;
  
  return (
    <span className="inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
      {label}
    </span>
  );
}
