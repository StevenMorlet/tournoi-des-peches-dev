'use client';

import Link from 'next/link';
import Image from 'next/image';
import VNoirCBlanc from '@/public/assets/logos/VNoirCBlanc.png';
import { fontDisplay, fontDisplayOutlined } from '@/lib/fonts';
import ProfileNavBar from '@/components/ui/ProfileNavBar';
import { useSession } from '@/contexts/SessionContext';
import { useTranslations } from 'next-intl';

export default function Navbar() {
  const { user, isLoggedIn } = useSession();
  const g = useTranslations('General');

  return (
    <div className="fixed top-0 w-full z-50 backdrop-blur-sm bg-black/40">
      <nav className={`px-6 sm:px-8 py-2.5 ${fontDisplay.className}`}>
        <div className="flex flex-row justify-between items-center">
          <div className={`flex flex-row items-center justify-items-start gap-3`}>
            <div
              className={`hidden sm:flex self-center text-xl font-semibold ${fontDisplayOutlined.className}`}
            >
              <Link href="/">
                <span>{g('theTournament')}</span>
              </Link>
            </div>
            <Link href="/">
              <Image
                src={VNoirCBlanc}
                alt={g('tournamentLogo')}
                quality={50}
                width={24}
                height={24}
                className="rounded-full border-2 p-1 border-white w-11 h-11 object-contain"
              />
            </Link>
          </div>

          <div className="hidden lg:flex justify-center items-center">
            <ul className="flex flex-row justify-center gap-3 text-white">
              <li>
                <Link href="/" className="block py-2 pr-4 pl-3 hover:text-primary transition">
                  {g('home')}
                </Link>
              </li>
              <li>
                <Link href="#" className="block py-2 pr-4 pl-3 hover:text-primary transition">
                  {g('solo')}
                </Link>
              </li>
              <li>
                <Link href="#" className="block py-2 pr-4 pl-3 hover:text-primary transition">
                  {g('multiplayer')}
                </Link>
              </li>
              <li>
                <Link href="#" className="block py-2 pr-4 pl-3 hover:text-primary transition">
                  {g('statistics')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-end">
            {isLoggedIn && user ? (
              <ProfileNavBar username={user.username} email={user.email} />
            ) : (
              <>
                <Link
                  href="/auth?form=login"
                  className="text-white hover:text-primary font-medium rounded-lg text-sm px-4 py-2 transition-colors duration-200"
                >
                  {g('connection')}
                </Link>
                <Link
                  href="/auth?form=signup"
                  className="bg-primary hover:bg-ternary focus:ring-4 focus:ring-secondary text-white font-medium rounded-lg text-sm px-4 py-2 ml-2 transition-colors duration-200"
                >
                  {g('signup')}
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
