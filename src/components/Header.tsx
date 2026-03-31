'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';

const MobileDrawer = dynamic(() => import('./MobileDrawer'), {
  ssr: false,
});

const NAV_ITEMS = [
  'about',
  'experience',
  'skills',
  'portfolio',
  'contact',
] as const;

export default function Header() {
  const t = useTranslations('nav');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('about');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            // Update URL hash without triggering scroll
            window.history.replaceState(null, '', `#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-10% 0px -80% 0px' }
    );

    NAV_ITEMS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-8 lg:px-12">
        <div className="flex h-14 items-center lg:h-20">
          <a
            href="#about"
            className="text-lg font-bold text-gray-900 dark:text-white"
          >
            EP
          </a>
        </div>

        <nav
          className="hidden lg:flex lg:items-center lg:gap-1"
          aria-label="Main navigation"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                activeSection === item
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              {t(item)}
              {activeSection === item && (
                <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-gray-900 dark:bg-white" />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden lg:flex lg:items-center lg:gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
          <button
            onClick={() => setDrawerOpen(true)}
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 lg:hidden dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </div>

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        activeSection={activeSection}
      />
    </header>
  );
}
