'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { fontGameCompact } from '@/app/lib/fonts';
import { useSession } from '@/app/contexts/SessionContext';
import { useNotify } from '@/app/contexts/NotificationContext';
import { useRouter } from 'next/navigation';

interface ProfileNavBarProps {
  username: string;
  email: string;
}

export default function ProfileNavBar({ username, email }: ProfileNavBarProps) {
  const { logout } = useSession();
  const notify = useNotify();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const initials = username
    .split(' ')
    .map((n) => n[0]?.toUpperCase())
    .join('')
    .slice(0, 2);

  const handleLogout = async () => {
    await logout();
    notify('Déconnecté.', 'success');
    router.refresh();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={`relative flex items-center gap-4 text-white`}>
      <Link className="flex items-center gap-1 hover:opacity-80" href="/profile">
        <span className="text-sm font-medium">{username}</span>
      </Link>

      <div
        className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-700 border-2 border-white text-sm font-semibold cursor-pointer hover:opacity-80"
        onClick={() => setOpen(!open)}
      >
        {initials}
      </div>

      {open && (
        <div
          className={`absolute right-0 top-12 z-20 w-44 bg-neutral-900 border-2 border-neutral-700 rounded-lg shadow-lg text-sm ${fontGameCompact.className}`}
        >
          <div className="px-4 py-3 border-b border-neutral-700 bg-ternary/70">
            <div className="font-semibold truncate">{username}</div>
            {email && <div className="text-xs text-white/80 truncate">{email}</div>}
          </div>
          <ul className="py-1">
            <li>
              <Link href="/profile" className="block px-4 py-2 hover:bg-neutral-700 transition">
                Profil
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left block px-4 py-2 hover:bg-neutral-700 text-red-400 transition"
              >
                Déconnexion
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
