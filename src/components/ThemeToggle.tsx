'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { Sun, Moon, Monitor, type LucideIcon } from 'lucide-react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const t = useTranslations('theme');

  // Fix ESLint error: use effect callback pattern instead of direct setState
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  // Fix ESLint error: useMemo to prevent creating component during render
  const Icon: LucideIcon = useMemo(() => {
    if (theme === 'dark') return Moon;
    if (theme === 'light') return Sun;
    return Monitor;
  }, [theme]);

  if (!mounted) {
    return (
      <button
        className="h-10 w-10 rounded-md p-2 text-gray-600 dark:text-gray-400"
        aria-label="Loading theme toggle"
        disabled
      >
        <div className="h-6 w-6" />
      </button>
    );
  }

  return (
    <button
      onClick={cycleTheme}
      className="rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white dark:focus-visible:outline-white"
      aria-label={t('toggleLabel', { current: theme || 'system' })}
      title={t('cycleHint')}
    >
      <Icon className="h-6 w-6" />
    </button>
  );
}
