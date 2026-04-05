import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { cookies } from 'next/headers';
import { ThemeProvider } from 'next-themes';

import Header from '@/components/Header';
import { WebVitals } from '@/components/WebVitals';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export const metadata: Metadata = {
  title: 'Emanuel Pereyra - Senior Software Engineer',
  description: '19+ years building scalable systems.',
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params;

  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value || null;

  if (!routing.locales.includes(lang as 'en' | 'es')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${inter.variable} ${robotoMono.variable} ${theme}`}
      data-theme={theme}
    >
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className="bg-white font-sans text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100"
        data-lang={lang}
      >
        <WebVitals />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="theme"
        >
          <NextIntlClientProvider messages={messages}>
            <Header />
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
