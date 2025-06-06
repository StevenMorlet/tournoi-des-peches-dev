'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import tournoilogo from '@/assets/logos/VNoirCBlanc.png';
import { useNotify } from '@/contexts/NotificationContext';
import { useEffect, useState } from 'react';
import { fontDisplayOutlined } from '@/lib/fonts';
import AuthForms from '@/components/auth/AuthForms';

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const notify = useNotify();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const verified = searchParams.get('verified');
    if (verified) {
      switch (verified) {
        case '0':
          notify('Token invalide ou manquant.', 'error');
          break;
        case '1':
          notify('Adresse email confirmée avec succès !', 'success');
          break;
        case '2':
          notify('Token de confirmation expiré.', 'error');
          break;
        case '3':
          notify('Utilisateur déjà existant ou introuvable.', 'error');
          break;
      }

      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.delete('verified');
      const newQuery = current.toString();

      router.replace(`?${newQuery}`, { scroll: false });
    }
  }, [searchParams, notify, isClient, router]);

  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <div className="flex flex-1 flex-col justify-center items-center text-white">
        <h1 className={`text-6xl mb-8 drop-shadow-xl ${fontDisplayOutlined.className}`}>
          Bienvenue au Tournoi !
        </h1>

        <div className={`flex w-full items-center`}>
          <div className="flex w-1/3 justify-center">
            <Image
              alt="Logo du Tournoi"
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
