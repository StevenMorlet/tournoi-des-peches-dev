import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import AppProviders from '@/contexts/AppProviders';
import Navbar from '@/components/ui/NavBar';
import SessionDebug from '@/components/debug/SessionDebug';
import { fontGame } from '@/lib/fonts';
import type { ReactNode } from 'react';
import { getMessages } from '@/lib/i18n/messages';
import { createTranslator } from 'next-intl';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages(locale);

  const t = createTranslator({ locale: locale, messages });

  const siteTitle = t('Metadata.siteTitle');
  const siteDesc = t('Metadata.siteDescription');

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
    title: {
      default: siteTitle,
      template: `%s | ${siteTitle}`,
    },
    description: siteDesc,
    openGraph: {
      title: siteTitle,
      description: siteDesc,
      type: 'website',
      url: process.env.NEXT_PUBLIC_BASE_URL,
      siteName: siteTitle,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/logos/VBlancCNoir.png`,
          width: 512,
          height: 512,
          alt: 'Logo The Tournament',
        },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;

  const messages = await getMessages(locale);
  if (!messages) notFound();

  return (
    <html lang={locale} className={'min-h-screen min-w-screen'}>
      <body className="min-h-screen min-w-full text-white">
        <link rel="icon" href="/favicon.ico" />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="fixed inset-0 -z-10 bg-[url('/assets/backgrounds/background.png')]" />
          <div className="fixed inset-0 -z-10 bg-black/15" />
          <AppProviders>
            <div className={'min-h-screen flex flex-col'}>
              <header className="min-h-16 flex">
                <Navbar />
              </header>
              <main className="flex grow justify-center items-center">
                <SessionDebug />
                {children}
              </main>
              <footer className={`backdrop-blur-sm bg-black/5 opacity-50 ${fontGame.className}`}>
                <div className="flex flex-row justify-center text-sm p-6">
                  <a
                    className="hover:text-neutral-600"
                    href="https://github.com/StevenMorlet/tournoi-des-peches-dev"
                    target="_blank"
                  >
                    {messages.LocaleLayoutPage.githubProject}
                  </a>
                </div>
              </footer>
            </div>
          </AppProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
