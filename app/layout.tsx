import type { Metadata } from 'next';
import '@/app/globals.css';
import AppProviders from '@/app/contexts/AppProviders';
import Navbar from '@/app/components/ui/NavBar';
import SessionDebug from '@/app/components/debug/SessionDebug';
import React from 'react';
import { fontGame } from '@/app/lib/fonts';

export const metadata: Metadata = {
  title: 'Le Tournoi des Péchés',
  description: "Un jeu multijoueur en ligne basé sur le Yam's",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body className="min-h-screen flex flex-col">
        <div className="fixed inset-0 -z-10 bg-[url('/assets/backgrounds/background.png')] bg-cover bg-center bg-fixed" />
        <div className="fixed inset-0 bg-black/15 -z-10" />

        <AppProviders>
          <div className={`flex flex-1 flex-col`}>
            <header className={`flex flex-row justify-between items-center`}>
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
      </body>
    </html>
  );
}
