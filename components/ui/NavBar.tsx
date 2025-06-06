'use client';

import Link from 'next/link';
import Image from 'next/image';
import VNoirCBlanc from '@/assets/logos/VNoirCBlanc.png';
import { fontDisplay, fontDisplayOutlined } from '@/lib/fonts';
import ProfileNavBar from '@/components/ui/ProfileNavBar';
import { useSession } from '@/contexts/SessionContext';

export default function Navbar() {
  const { user, isLoggedIn } = useSession();

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

          <div className="flex items-center justify-end w-1/4">
            {isLoggedIn && user ? (
              <ProfileNavBar username={user.username} email={user.email} />
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
