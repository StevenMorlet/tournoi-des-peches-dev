import Link from 'next/link';
import { fontDisplay, fontDisplayOutlined } from '@/lib/fonts';
import { useTranslations } from 'next-intl';
import { getMessages } from '@/lib/i18n/messages';
import { createTranslator } from 'next-intl';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages(locale);
  const t = createTranslator({ locale: locale, messages });

  return {
    title: t('Metadata.notFoundTitle'),
    description: t('Metadata.notFoundDescription'),
  };
}

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
