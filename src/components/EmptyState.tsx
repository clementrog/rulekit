interface EmptyStateProps {
  message?: string;
}

export function EmptyState({ message = 'No rules found' }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>
      <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
        Try adjusting your filters or search query
      </p>
    </div>
  );
}
