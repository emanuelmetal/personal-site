import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Linkedin, Github, Mail } from 'lucide-react';
import Section from '@/components/Section';
import Timeline from '@/components/Timeline';
import { ProjectGrid } from '@/components/Portfolio';

export default function Home() {
  const t = useTranslations();

  // Category colors for skill badges
  const categoryColors: Record<string, string> = {
    frontend: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    backend: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    cloud: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
    tools: 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300',
  };
  const categories = ['frontend', 'backend', 'cloud', 'tools'] as const;
  const tiers = ['10plus', '5to10', '2to5'] as const;

  return (
    <main>
      <Section id="about">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left column: Profile photo */}
          <div className="flex justify-center lg:justify-start">
            <Image
              src="/placeholder.svg"
              alt="Emanuel Pereyra"
              width={200}
              height={200}
              priority={true}
              className="rounded-full"
            />
          </div>

          {/* Right column: Bio and details */}
          <div className="flex flex-col justify-center">
            <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl dark:text-white">
              Emanuel Pereyra
            </h1>
            <p className="mb-4 text-lg font-medium text-blue-600 dark:text-blue-400">
              {t('home.heading')}
            </p>
            <p className="text-lg text-gray-600 sm:text-xl dark:text-gray-300">
              {t('about.bio')}
            </p>
            <p className="mt-2 text-base text-gray-500 sm:text-lg dark:text-gray-400">
              {t('about.description')}
            </p>
          </div>
        </div>
      </Section>

      <Section id="experience" alternate>
        <h2 className="mb-8 text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl dark:text-white">
          {t('sections.experience')}
        </h2>
        <Timeline />
      </Section>

      <Section id="skills">
        <h2 className="mb-8 text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl dark:text-white">
          {t('skills.heading')}
        </h2>
        <div className="space-y-10">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {t(`skills.categories.${category}` as any)}
              </h3>
              <div className="space-y-3">
                {tiers.map((tier) => {
                  const skills = t.raw(`skills.data.${category}.${tier}`) as string[];
                  return (
                    <div key={tier}>
                      <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {t(`skills.tiers.${tier}` as any)}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <span
                            key={skill}
                            className={`inline-block rounded-full px-3 py-1.5 text-sm font-medium transition-transform hover:scale-105 ${categoryColors[category]}`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="portfolio" alternate>
        <h2 className="mb-8 text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl dark:text-white">
          {t('sections.portfolio')}
        </h2>
        <ProjectGrid />
      </Section>

      <Section id="contact">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl dark:text-white">
            {t('contact.heading')}
          </h2>
          <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
            {t('contact.cta')}
          </p>

          {/* Email link */}
          <div className="mb-6">
            <a
              href={`mailto:${t('contact.emailAddress')}`}
              className="inline-flex items-center gap-2 text-lg font-medium text-blue-600 underline transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <Mail className="h-5 w-5" />
              <span>{t('contact.emailAddress')}</span>
            </a>
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-4">
            <a
              href={t('contact.linkedinUrl')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              aria-label="LinkedIn profile"
            >
              <Linkedin className="h-5 w-5" />
              <span className="text-sm font-medium">{t('contact.linkedin')}</span>
            </a>
            <a
              href={t('contact.githubUrl')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              aria-label="GitHub profile"
            >
              <Github className="h-5 w-5" />
              <span className="text-sm font-medium">{t('contact.github')}</span>
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
}
