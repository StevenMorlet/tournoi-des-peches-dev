'use client';

import { fontDisplay, fontDisplayOutlined, fontGameCompact } from './lib/fonts';
import { User, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex-1 flex flex-col gap-20 p-10 justify-center items-center w-full text-white text-center sm:text-left">
      <h1 className={`text-5xl sm:text-7xl drop-shadow-xl ${fontDisplayOutlined.className}`}>
        Entrez dans le Tournoi !
      </h1>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-20">
        <button
          className={`flex flex-col items-center px-8 py-6 text-lg sm:text-xl rounded-2xl border-4 border-primary bg-black/70 hover:bg-ternary transition-all shadow-lg uppercase tracking-wide w-60 sm:w-72 ${fontDisplay.className}`}
        >
          <User className="w-14 h-14 mb-2" />
          Mode Solo
          <div className={`text-sm mt-1 opacity-60 ${fontGameCompact.className}`}>(à venir)</div>
        </button>

        <div className="hidden sm:flex justify-center items-center">
          <div className="w-1.5 h-40 bg-white rounded-xl shadow-xl" />
        </div>

        <button
          className={`flex flex-col items-center px-8 py-6 text-lg sm:text-xl rounded-2xl border-4 border-primary bg-black/70 hover:bg-ternary transition-all shadow-lg uppercase tracking-wide w-60 sm:w-72 ${fontDisplay.className}`}
        >
          <Users className="w-14 h-14 mb-2" />
          Multijoueur
          <div className={`text-sm mt-1 opacity-60 ${fontGameCompact.className}`}>(à venir)</div>
        </button>
      </div>
    </div>
  );
}
