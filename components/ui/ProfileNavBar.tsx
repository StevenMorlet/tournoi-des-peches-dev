'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { fontGameCompact } from '@/lib/fonts';
import { useSession } from '@/contexts/SessionContext';
import { useNotify } from '@/contexts/NotificationContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface ProfileNavBarProps {
  username: string;
  email: string;
}

export default function ProfileNavBar({ username, email }: ProfileNavBarProps) {
  const { logout, user } = useSession();
  const notify = useNotify();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const g = useTranslations('General');

  const initials = username
    .split(' ')
    .map((n) => n[0]?.toUpperCase())
    .join('')
    .slice(0, 2);

  const handleLogout = async () => {
    await logout();
    notify(g('disconnectionEstablished'), 'success');
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

      <div onClick={() => setOpen(!open)} className="cursor-pointer">
        {user?.avatarUrl ? (
          <Image
            src={user.avatarUrl}
            alt="Avatar"
            width={40}
            height={40}
            className="rounded-full border-2 border-white hover:opacity-80 object-cover w-10 h-10"
          />
        ) : (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-700 border-2 border-white text-sm font-semibold hover:opacity-80">
            {initials}
          </div>
        )}
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
                {g('profile')}
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left block px-4 py-2 hover:bg-neutral-700 text-red-400 transition"
              >
                {g('disconnection')}
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
