import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Section from '@/components/Section';

export default function Home() {
  const t = useTranslations();

  return (
    <main>
      <Section id="about">
        <div className="text-center">
          <Image
            src="/placeholder.svg"
            alt="Emanuel Pereyra"
            width={120}
            height={120}
            priority={true}
            className="mx-auto mb-8 rounded-full"
          />
          <h1 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl dark:text-white">
            Emanuel Pereyra
          </h1>
          <p className="text-lg text-gray-600 sm:text-xl dark:text-gray-300">
            {t('home.heading')}
          </p>
          <p className="mt-2 text-base text-gray-500 sm:text-lg dark:text-gray-400">
            {t('home.subheading')}
          </p>
        </div>
      </Section>

      <Section id="experience" alternate>
        <h2 className="mb-8 text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl dark:text-white">
          {t('sections.experience')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {t('placeholders.comingSoon')}
        </p>
      </Section>

      <Section id="skills">
        <h2 className="mb-8 text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl dark:text-white">
          {t('sections.skills')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {t('placeholders.comingSoon')}
        </p>
      </Section>

      <Section id="portfolio" alternate>
        <h2 className="mb-8 text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl dark:text-white">
          {t('sections.portfolio')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {t('placeholders.comingSoon')}
        </p>
      </Section>

      <Section id="contact">
        <h2 className="mb-8 text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl dark:text-white">
          {t('sections.contact')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {t('placeholders.comingSoon')}
        </p>
      </Section>
    </main>
  );
}
