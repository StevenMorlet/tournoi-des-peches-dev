import { fontDisplay, fontDisplayOutlined, fontGameCompact } from '@/lib/fonts';
import { User, Users } from 'lucide-react';
import { createTranslator, useTranslations } from 'next-intl';
import { getMessages } from '@/lib/i18n/messages';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages(locale);
  const t = createTranslator({ locale: locale, messages });

  return {
    title: t('Metadata.homeTitle'),
    description: t('Metadata.homeDescription'),
  };
}

export default function HomePage() {
  const g = useTranslations('General');

  return (
    <div className="flex flex-col w-full justify-center p-8 gap-8">
      <h1
        className={`text-center text-3xl sm:text-5xl md:text-7xl drop-shadow-xl ${fontDisplayOutlined.className}`}
      >
        {g('enterTheTournament')}
      </h1>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-20 px-4">
        <button
          className={`flex flex-col items-center px-8 py-6 text-lg sm:text-xl rounded-2xl border-4 border-primary bg-black/70 hover:bg-ternary transition-all shadow-lg uppercase tracking-wide w-60 sm:w-72 ${fontDisplay.className}`}
        >
          <User className="w-14 h-14 mb-2" />
          {g('soloMode')}
          <div className={`text-sm mt-1 opacity-60 ${fontGameCompact.className}`}>
            {g('comingSoon')}
          </div>
        </button>

        <div className="hidden sm:flex justify-center items-center">
          <div className="w-1.5 h-40 bg-white rounded-xl shadow-xl" />
        </div>

        <button
          className={`flex flex-col items-center px-8 py-6 text-lg sm:text-xl rounded-2xl border-4 border-primary bg-black/70 hover:bg-ternary transition-all shadow-lg uppercase tracking-wide w-60 sm:w-72 ${fontDisplay.className}`}
        >
          <Users className="w-14 h-14 mb-2" />
          {g('multiplayerMode')}
          <div className={`text-sm mt-1 opacity-60 ${fontGameCompact.className}`}>
            {g('comingSoon')}
          </div>
        </button>
      </div>
    </div>
  );
}
