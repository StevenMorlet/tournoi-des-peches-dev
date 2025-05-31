import Link from 'next/link';
import { fontDisplay, fontDisplayOutlined, fontGameCompact } from './lib/fonts';
import { User, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative min-h-screen grid grid-rows-[20px_1fr_20px] justify-items-center items-center gap-16 px-8 pb-20 sm:px-20">
      <main className="relative z-20 row-start-2 flex flex-col gap-20 items-center w-full max-w-5xl text-white text-center sm:text-left">
        <h1
          className={`text-5xl sm:text-7xl drop-shadow-xl text-white ${fontDisplayOutlined.className}`}
        >
          Entrez dans le Tournoi
        </h1>

        <div className="relative w-full max-w-4xl flex items-center justify-center">
          <div className="absolute w-[4px] h-[200px] bg-gradient-to-b from-transparent via-white/50 to-transparent rotate-[30deg] z-10" />

          <div className="relative z-20 flex flex-col sm:flex-row items-center gap-52 mt-5 mb-5">
            <button
              className={`flex flex-col items-center px-10 py-6 text-xl rounded-2xl border-4 border-primary bg-black/70 hover:bg-ternary transition-all shadow-lg uppercase tracking-wide ${fontDisplay.className}`}
            >
              <User className="w-16 h-16 mb-2" />
              Mode Solo
              <div className={`text-sm mt-1 opacity-60 ${fontGameCompact.className}`}>
                (à venir)
              </div>
            </button>

            <button
              className={`flex flex-col items-center px-10 py-6 text-xl rounded-2xl border-4 border-primary bg-black/70 hover:bg-ternary transition-all shadow-lg uppercase tracking-wide ${fontDisplay.className}`}
            >
              <Users className="w-16 h-16 mb-2" />
              Multijoueur
              <div className={`text-sm mt-1 opacity-60 ${fontGameCompact.className}`}>
                (à venir)
              </div>
            </button>
          </div>
        </div>

        <div className="mt-12 text-sm opacity-70">
          <Link href="/auth" className="underline hover:text-primary">
            Se connecter ou créer un compte
          </Link>
        </div>
      </main>

      <footer className="relative z-20 row-start-3 flex flex-wrap gap-6 items-center justify-center text-white text-sm opacity-50">
        <a
          className="hover:underline"
          href="https://github.com/StevenMorlet/tournoi-des-peches-dev"
          target="_blank"
        >
          Projet GitHub
        </a>
        <a className="hover:underline" href="#" target="_blank">
          Conditions générales
        </a>
      </footer>
    </div>
  );
}
