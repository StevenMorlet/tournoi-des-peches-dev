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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale;

  const messages = await getMessages(locale);
  if (!messages) notFound();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="fixed inset-0 -z-10 bg-[url('/assets/backgrounds/background.png')] bg-cover bg-center bg-fixed" />
          <div className="fixed inset-0 bg-black/15 -z-10" />
          <AppProviders>
            <div className="min-h-screen flex flex-col">
              <header className="flex flex-row justify-between items-center">
                <Navbar />
              </header>
              <main className="flex flex-1 pt-16 px-4">
                <SessionDebug />
                {children}
              </main>
              <footer
                className={`w-full backdrop-blur-sm bg-black/5 text-sm opacity-50 ${fontGame.className}`}
              >
                <div className="flex flex-row justify-center gap-6 p-6">
                  <a
                    className="hover:text-neutral-600"
                    href="https://github.com/StevenMorlet/tournoi-des-peches-dev"
                    target="_blank"
                  >
                    Projet GitHub
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
