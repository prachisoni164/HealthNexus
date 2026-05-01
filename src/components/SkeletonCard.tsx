export default function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700 animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
      </div>
    </div>
  );
}

export function SkeletonStatCard() {
  return (
    <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-10 w-10 rounded-xl bg-gray-200 dark:bg-gray-700" />
        <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
      </div>
      <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
      <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
    </div>
  );
}
