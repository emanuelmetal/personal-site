import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('home');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <Image
          src="/placeholder.svg"
          alt="Emanuel Pereyra"
          width={120}
          height={120}
          priority={true}
          className="mx-auto mb-8 rounded-full"
        />
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Emanuel Pereyra
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          {t('heading')}
        </p>
        <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
          {t('subheading')}
        </p>
      </div>
    </main>
  );
}
