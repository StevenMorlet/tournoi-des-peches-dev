import type { Metadata } from 'next';
import './globals.css';
import { fontArcade, fontDigital, fontDisplay, fontGame, fontGameCompact } from './fonts';

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
    <html
      lang="fr"
      className={`
        ${fontArcade.variable}
        ${fontDigital.variable}
        ${fontDisplay.variable}
        ${fontGame.variable}
        ${fontGameCompact.variable}
      `}
    >
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
