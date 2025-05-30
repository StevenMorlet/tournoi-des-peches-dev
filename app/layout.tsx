import type { Metadata } from 'next';
import './globals.css';
import { fontDisplay } from '@/app/fonts';
import Image from 'next/image';
import background from '@/app/assets/backgrounds/background.png';
import SessionDebug from '@/app/components/debug/SessionDebug';
import { NotificationProvider } from '@/app/components/notifications/NotificationContext';

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
    <html lang="fr">
      <body className={`antialiased`}>
        <Image
          src={background}
          alt="Background"
          fill
          quality={100}
          className="object-cover z-0"
          priority
        />

        <div className="absolute inset-0 bg-black/15 z-10" />

        <NotificationProvider>
          <SessionDebug />
          <div className={`${fontDisplay.className}`}>{children}</div>
        </NotificationProvider>
      </body>
    </html>
  );
}
