import { useTranslations } from 'next-intl';
import TimelineItem from './TimelineItem';

interface TimelinePosition {
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  achievements: string[];
}

export default function Timeline() {
  const t = useTranslations('experience.timeline');
  const items = t.raw('items') as TimelinePosition[];

  return (
    <ol className="space-y-8 lg:space-y-12">
      {items.map((position, index) => (
        <TimelineItem
          key={`${position.company}-${position.startDate}`}
          position={position}
          isLast={index === items.length - 1}
        />
      ))}
    </ol>
  );
}
