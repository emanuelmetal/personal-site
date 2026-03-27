import { useTranslations } from 'next-intl';

interface TimelineItemProps {
  position: {
    company: string;
    title: string;
    startDate: string;
    endDate: string;
    achievements: string[];
  };
  isLast: boolean;
}

export default function TimelineItem({ position, isLast }: TimelineItemProps) {
  const t = useTranslations('experience.timeline');
  const presentText = t('present');
  const { company, title, startDate, endDate, achievements } = position;

  return (
    <li className="flex gap-4 lg:gap-6">
      {/* Left column: timeline marker */}
      <div className="relative flex flex-col items-center">
        {/* Dot */}
        <div className="z-10 h-3 w-3 rounded-full bg-blue-600 dark:bg-blue-400" />
        {/* Connector line - hidden on last item */}
        {!isLast && (
          <div className="w-0.5 flex-1 bg-gray-300 dark:bg-gray-700" />
        )}
      </div>

      {/* Right column: content card */}
      <div className="flex-1 pb-8 lg:pb-12">
        {/* Company name */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {company}
        </h3>

        {/* Job title */}
        <p className="text-base font-medium text-blue-600 dark:text-blue-400">
          {title}
        </p>

        {/* Date range */}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {startDate} - {endDate === 'Present' ? presentText : endDate}
        </p>

        {/* Achievement bullets */}
        <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-600 dark:text-gray-300">
          {achievements.map((achievement, index) => (
            <li key={index}>{achievement}</li>
          ))}
        </ul>
      </div>
    </li>
  );
}
