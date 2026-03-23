'use client';

import { useParams } from 'next/navigation';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.lang as string;
  const t = useTranslations('language');

  const handleLanguageSwitch = (newLocale: 'en' | 'es') => {
    if (newLocale === currentLocale) return;

    const hash = window.location.hash;
    router.push(`${pathname}${hash}`, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-1 text-sm">
      <button
        onClick={() => handleLanguageSwitch('en')}
        className={
          currentLocale === 'en'
            ? 'font-bold text-gray-900 dark:text-white'
            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
        }
        aria-label={t('switchToEnglish')}
        aria-current={currentLocale === 'en' ? 'true' : undefined}
      >
        EN
      </button>
      <span className="text-gray-400 dark:text-gray-600">/</span>
      <button
        onClick={() => handleLanguageSwitch('es')}
        className={
          currentLocale === 'es'
            ? 'font-bold text-gray-900 dark:text-white'
            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
        }
        aria-label={t('switchToSpanish')}
        aria-current={currentLocale === 'es' ? 'true' : undefined}
      >
        ES
      </button>
    </div>
  );
}
