'use client';

import Link from 'next/link';
import { fontDisplay, fontDisplayOutlined } from '@/lib/fonts';
import { useTranslations } from 'next-intl';

export default function NotFoundCatchAll() {
  const t = useTranslations('NotFoundPage');
  const g = useTranslations('General');

  return (
    <div
      className={`flex flex-col p-14 w-full justify-center items-center text-center animate-fade-in ${fontDisplayOutlined.className}`}
    >
      <h1 className="text-red-600 glitch" data-text="404">
        404
      </h1>
      <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-8">{t('subtitle')}</p>
      <Link
        href="/"
        className={`px-6 py-2 border border-red-500 rounded hover:bg-red-600 hover:text-white transition ${fontDisplay.className}`}
      >
        {g('home')}
      </Link>
    </div>
  );
}
