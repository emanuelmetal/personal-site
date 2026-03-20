'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

const NAV_ITEMS = [
  'about',
  'experience',
  'skills',
  'portfolio',
  'contact',
] as const;

type MobileDrawerProps = {
  open: boolean;
  onClose: () => void;
  activeSection: string;
};

export default function MobileDrawer({
  open,
  onClose,
  activeSection,
}: MobileDrawerProps) {
  const t = useTranslations('nav');

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  function handleNavClick() {
    onClose();
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed top-0 right-0 z-50 h-auto w-72 transform bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden dark:bg-gray-950 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex h-14 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-800">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Menu
          </span>
          <button
            onClick={onClose}
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            aria-label="Close navigation menu"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="p-4" aria-label="Mobile navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={handleNavClick}
              className={`block rounded-md px-4 py-3 text-base font-medium transition-colors ${
                activeSection === item
                  ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white'
              }`}
            >
              {t(item)}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
