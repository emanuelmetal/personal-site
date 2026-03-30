'use client';

import { useReportWebVitals } from 'next/web-vitals';

const handleWebVitals = (metric: {
  name: string;
  value: number;
  rating: string;
}) => {
  if (process.env.NODE_ENV === 'development') {
    const { name, value, rating } = metric;
    const formattedValue =
      name === 'CLS' ? value.toFixed(4) : `${value.toFixed(0)}ms`;
    const icon =
      rating === 'good' ? 'v' : rating === 'needs-improvement' ? '!' : 'x';
    console.log(`[Web Vitals] ${icon} ${name}: ${formattedValue} (${rating})`);
  }
};

export function WebVitals() {
  useReportWebVitals(handleWebVitals);
  return null;
}
