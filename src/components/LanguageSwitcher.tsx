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

    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname: `${pathname}${hash}`, params },
      { locale: newLocale }
    );
  };

  return (
    <div className="flex items-center gap-1 text-sm">
      <button
        onClick={() => handleLanguageSwitch('en')}
        className={
          currentLocale === 'en'
            ? 'font-bold text-slate-900 dark:text-white'
            : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
        }
        aria-label={t('switchToEnglish')}
        aria-current={currentLocale === 'en' ? 'true' : undefined}
      >
        EN
      </button>
      <span className="text-slate-400 dark:text-slate-600">/</span>
      <button
        onClick={() => handleLanguageSwitch('es')}
        className={
          currentLocale === 'es'
            ? 'font-bold text-slate-900 dark:text-white'
            : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
        }
        aria-label={t('switchToSpanish')}
        aria-current={currentLocale === 'es' ? 'true' : undefined}
      >
        ES
      </button>
    </div>
  );
}
