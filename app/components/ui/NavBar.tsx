'use client';

import Link from 'next/link';
import Image from 'next/image';
import VNoirCBlanc from '@/app/assets/logos/VNoirCBlanc.png';
import { fontDisplay, fontDisplayOutlined } from '@/app/lib/fonts';

export default function Navbar() {
  return (
    <div className="fixed top-0 w-full z-50 backdrop-blur-sm bg-black/40 rounded-md">
      <nav className={`px-4 lg:px-6 py-2.5 ${fontDisplay.className}`}>
        <div className="flex flex-row justify-between items-center">
          <div className={`flex flex-row items-center justify-items-start gap-3 w-1/4`}>
            <Link href="/">
              <span
                className={`self-center text-xl font-semibold whitespace-nowrap text-white ${fontDisplayOutlined.className}`}
              >
                Le Tournoi
              </span>
            </Link>
            <Link href="/">
              <Image
                src={VNoirCBlanc}
                alt="Logo"
                quality={50}
                width={24}
                height={24}
                className="rounded-full border-2 p-1 border-white w-11 h-11 object-contain"
              />
            </Link>
          </div>

          <div className="justify-center items-center w-2/4">
            <ul className="flex flex-row justify-center gap-3 text-white">
              <li>
                <Link href="/" className="block py-2 pr-4 pl-3 hover:text-primary transition">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="#" className="block py-2 pr-4 pl-3 hover:text-primary transition">
                  Solo
                </Link>
              </li>
              <li>
                <Link href="#" className="block py-2 pr-4 pl-3 hover:text-primary transition">
                  Multijoueur
                </Link>
              </li>
              <li>
                <Link href="#" className="block py-2 pr-4 pl-3 hover:text-primary transition">
                  Statistiques
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-end  w-1/4">
            <Link
              href="/auth?form=login"
              className="text-white hover:text-primary font-medium rounded-lg text-sm px-4 py-2 transition-colors duration-200"
            >
              Connexion
            </Link>
            <Link
              href="/auth?form=signup"
              className="bg-primary hover:bg-ternary focus:ring-4 focus:ring-secondary text-white font-medium rounded-lg text-sm px-4 py-2 ml-2 transition-colors duration-200"
            >
              Inscription
            </Link>
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-2 text-sm text-gray-300 rounded-lg lg:hidden hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Ouvrir le menu principal</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
