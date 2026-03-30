export default function ProjectGridSkeleton() {
  return (
    <div
      className="grid animate-pulse grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8"
      aria-label="Loading projects"
    >
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="flex flex-col rounded-lg bg-white p-6 shadow-md dark:bg-gray-800"
        >
          {/* Title placeholder */}
          <div className="h-7 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />

          {/* Description placeholder - two lines */}
          <div className="mt-2 space-y-2">
            <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Tech badges placeholder - 3 pills */}
          <div className="mt-4 flex gap-2">
            <div className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="h-6 w-20 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="h-6 w-14 rounded-full bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      ))}
    </div>
  );
}
