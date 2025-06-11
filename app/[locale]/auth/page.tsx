'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import tournoilogo from '@/public/assets/logos/VNoirCBlanc.png';
import { useNotify } from '@/contexts/NotificationContext';
import { useEffect, useState } from 'react';
import { fontDisplayOutlined } from '@/lib/fonts';
import AuthForms from '@/components/auth/AuthForms';
import { useTranslations } from 'next-intl';

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const notify = useNotify();
  const [isClient, setIsClient] = useState(false);
  const g = useTranslations('General');
  const t = useTranslations('AuthPage');

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const verified = searchParams.get('verified');
    if (verified) {
      switch (verified) {
        case '0':
          notify(g('invalidLink'), 'error');
          break;
        case '1':
          notify(g('emailConfirmed'), 'success');
          break;
        case '2':
          notify(g('expiredLink'), 'error');
          break;
        case '3':
          notify(t('userAlreadyExistsOrNotFound'), 'error');
          break;
      }

      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.delete('verified');
      const newQuery = current.toString();

      router.replace(`?${newQuery}`, { scroll: false });
    }
  }, [searchParams, notify, isClient, router, t, g]);

  return (
    <div className="flex flex-col justify-center items-center gap-4 px-10 sm:gap-6 md:gap-8 lg:gap-10">
      <h1
        className={`text-3xl sm:text-4xl md:text-5xl text-center drop-shadow-xl ${fontDisplayOutlined.className}`}
      >
        {g('welcomeToTheTournament')}
      </h1>

      <div className={`flex justify-center items-center gap-20 w-full`}>
        <div className="hidden lg:flex px-6">
          <Image
            alt={g('tournamentLogo')}
            src={tournoilogo}
            quality={100}
            className="w-full h-auto max-w-[180px]"
          />
        </div>
        <div className={`flex justify-center items-center w-full max-w-md lg:max-w-lg px-6`}>
          <AuthForms />
        </div>
      </div>
    </div>
  );
}
