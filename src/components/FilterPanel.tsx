'use client';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterGroupProps {
  title: string;
  options: FilterOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

function FilterGroup({ title, options, selected, onChange }: FilterGroupProps) {
  const handleToggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
        {title}
      </h3>
      <div className="space-y-1.5">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={selected.includes(option.value)}
              onChange={() => handleToggle(option.value)}
              className="h-3.5 w-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

interface FilterPanelProps {
  tools: string[];
  taskTypes: string[];
  stacks: string[];
  onToolsChange: (tools: string[]) => void;
  onTaskTypesChange: (taskTypes: string[]) => void;
  onStacksChange: (stacks: string[]) => void;
}

const TOOL_OPTIONS: FilterOption[] = [
  { value: 'cursor', label: 'Cursor' },
  { value: 'claude_code', label: 'Claude Code' },
  { value: 'copilot', label: 'Copilot' },
  { value: 'windsurf', label: 'Windsurf' },
];

const TASK_TYPE_OPTIONS: FilterOption[] = [
  { value: 'mvp', label: 'MVP' },
  { value: 'prototype', label: 'Prototype' },
  { value: 'production', label: 'Production' },
  { value: 'refactor', label: 'Refactor' },
];

const STACK_OPTIONS: FilterOption[] = [
  { value: 'typescript', label: 'TypeScript' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'react', label: 'React' },
  { value: 'nextjs', label: 'Next.js' },
  { value: 'python', label: 'Python' },
];

export function FilterPanel({
  tools,
  taskTypes,
  stacks,
  onToolsChange,
  onTaskTypesChange,
  onStacksChange,
}: FilterPanelProps) {
  return (
    <div className="space-y-6">
      <FilterGroup
        title="Tools"
        options={TOOL_OPTIONS}
        selected={tools}
        onChange={onToolsChange}
      />
      <FilterGroup
        title="Task Type"
        options={TASK_TYPE_OPTIONS}
        selected={taskTypes}
        onChange={onTaskTypesChange}
      />
      <FilterGroup
        title="Stack"
        options={STACK_OPTIONS}
        selected={stacks}
        onChange={onStacksChange}
      />
    </div>
  );
}
