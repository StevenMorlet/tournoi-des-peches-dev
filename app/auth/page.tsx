'use client';

import Image from 'next/image';
import tournoilogo from '@/app/assets/logos/VNoirCBlanc.png';
import { fontDisplayOutlined } from '@/app/lib/fonts';
import AuthForms from '@/app/components/auth/AuthForms';
import { useNotify } from '@/app/contexts/NotificationContext';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthPage() {
  const searchParams = useSearchParams();
  const notify = useNotify();

  useEffect(() => {
    const verified = searchParams.get('verified');
    if (verified === '0') {
      notify('Token invalide ou manquant.', 'error');
    } else if (verified === '1') {
      notify('Adresse email confirmée avec succès !', 'success');
    } else if (verified === '2') {
      notify('Token de confirmation expiré.', 'error');
    } else if (verified === '3') {
      notify('Utilisateur déjà existant ou introuvable.', 'error');
    }
  }, [searchParams, notify]);

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
