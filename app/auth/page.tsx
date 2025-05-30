'use client';

import Image from 'next/image';
import tournoilogo from '@/app/assets/logos/VNoir-CBlanc.png';
import { fontDisplayOutlined } from '../fonts';
import AuthForms from '@/app/components/auth/AuthForms';

export default function AuthPage() {
  return (
    <div className="relative min-h-screen grid grid-rows-[20px_1fr_20px] justify-items-center items-center gap-16 px-8 pb-20 sm:px-20">
      <main className="relative z-20 row-start-2 flex flex-col gap-15 items-center sm:items-start text-white text-center sm:text-left mask-cover">
        <h1 className={`text-4xl sm:text-6xl drop-shadow-xl ${fontDisplayOutlined.className}`}>
          Bienvenue au Tournoi !
        </h1>

        <div className={`flex w-full max-w-4xl gap-4 items-center`}>
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
      </main>
    </div>
  );
}
