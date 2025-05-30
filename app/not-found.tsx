'use client';

import Link from 'next/link';
import { fontDisplay, fontDisplayOutlined } from '@/app/lib/fonts';

export default function NotFoundPage() {
  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center text-white px-4 ${fontDisplayOutlined.className}`}
    >
      <h1 className={`text-7xl text-red-600 mb-4`}>404</h1>
      <p className={`text-3xl mb-6`}>Oups... cette page n&#39;existe pas.</p>
      <Link
        href="/"
        className={`px-6 py-2 border border-red-500 rounded hover:bg-red-600 hover:text-white transition ${fontDisplay.className}`}
      >
        Retour à l’accueil
      </Link>
    </div>
  );
}
