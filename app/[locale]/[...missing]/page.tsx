'use client';

import Link from 'next/link';
import { fontDisplay, fontDisplayOutlined } from '@/lib/fonts';
import { useTranslations } from 'next-intl';

export default function NotFoundCatchAll() {
  const t = useTranslations('NotFound');

  return (
    <div
      className={`flex-1 flex flex-col p-10 justify-center items-center w-full text-white text-center sm:text-left animate-fade-in ${fontDisplayOutlined.className}`}
    >
      <h1 className="text-7xl text-red-600 mb-4 glitch" data-text="404">
        404
      </h1>
      <p className="text-3xl mb-6">{t('subtitle')}</p>
      <Link
        href="/"
        className={`px-6 py-2 border border-red-500 rounded hover:bg-red-600 hover:text-white transition ${fontDisplay.className}`}
      >
        {t('cta')}
      </Link>
    </div>
  );
}
