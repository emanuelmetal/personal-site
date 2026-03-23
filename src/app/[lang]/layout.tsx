import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/providers/ThemeProvider';
import Header from '@/components/Header';
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

  if (!routing.locales.includes(lang as 'en' | 'es')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${inter.variable} ${robotoMono.variable}`}
    >
      <body className="bg-white font-sans text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100">
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('disable-transitions');setTimeout(()=>document.documentElement.classList.remove('disable-transitions'),100);`,
          }}
        />
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <Header />
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
