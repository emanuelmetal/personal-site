export default function TimelineSkeleton() {
  return (
    <div
      className="animate-pulse space-y-8 lg:space-y-12"
      aria-label="Loading timeline"
    >
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-4 lg:gap-6">
          {/* Timeline dot */}
          <div className="relative flex flex-col items-center">
            <div className="h-3 w-3 rounded-full bg-gray-200 dark:bg-gray-800" />
            {/* Connector line - show on all but last item */}
            {i < 3 && (
              <div className="w-0.5 flex-1 bg-gray-200 dark:bg-gray-800" />
            )}
          </div>

          {/* Content placeholders */}
          <div className="flex-1 pb-8 lg:pb-12">
            {/* Company placeholder */}
            <div className="h-7 w-48 rounded bg-gray-200 dark:bg-gray-800" />

            {/* Title placeholder */}
            <div className="mt-1 h-5 w-36 rounded bg-gray-200 dark:bg-gray-800" />

            {/* Date placeholder */}
            <div className="mt-1 h-4 w-28 rounded bg-gray-200 dark:bg-gray-800" />

            {/* Achievement placeholder */}
            <div className="mt-3 h-16 w-full rounded bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>
      ))}
    </div>
  );
}
