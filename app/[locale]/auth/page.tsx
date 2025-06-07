'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import tournoilogo from '@/assets/logos/VNoirCBlanc.png';
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
    <div className="flex flex-1 flex-col justify-center items-center">
      <div className="flex flex-1 flex-col justify-center items-center text-white">
        <h1 className={`text-6xl mb-8 drop-shadow-xl ${fontDisplayOutlined.className}`}>
          {g('welcomeToTheTournament')}
        </h1>

        <div className={`flex w-full max-w-[850px] items-center`}>
          <div className="flex w-1/3 justify-center">
            <Image
              alt={g('tournamentLogo')}
              src={tournoilogo}
              quality={100}
              className="w-full h-auto max-w-[180px]"
            />
          </div>
          <div className={`flex w-2/3 justify-center`}>
            <AuthForms />
          </div>
        </div>
      </div>
    </div>
  );
}
