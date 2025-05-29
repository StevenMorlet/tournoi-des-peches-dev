import type { Metadata } from 'next';
import './globals.css';
import { fontDisplay } from '@/app/fonts';

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
      <body className={`antialiased ${fontDisplay.className}`}>{children}</body>
    </html>
  );
}
