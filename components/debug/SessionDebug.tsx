'use client';

import { useNotify } from '@/contexts/NotificationContext';
import { useSession } from '@/contexts/SessionContext';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function SessionDebug() {
  const { user, isLoggedIn, refresh, logout } = useSession();
  const notify = useNotify();
  const router = useRouter();
  const t = useTranslations('Debug');

  if (process.env.NODE_ENV === 'production') return null;

  const handleLogout = async () => {
    await logout();
    notify(t('deconnected'), 'success');
    router.refresh();
  };

  const cleanPending = async () => {
    try {
      const res = await fetch('/api/admin/cleanup-pending-accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const text = await res.text();
        notify(`${t('error')} ${res.status} : ${text}`, 'error');
        return;
      }

      const data = await res.json();
      notify(`${t('removedAccounts')} : ${data.deleted}`, 'success');
    } catch (err) {
      notify(t('requestError'), 'error');
      console.error(err);
    }
  };

  return (
    <div className="fixed mt-40 w-fit h-fit backdrop-blur-sm shadow-md px-4 py-2 text-sm text-white bg-black/40 rounded-md left-5 top-24 z-50 ">
      <div className={`font-bold ${isLoggedIn ? 'text-green-400' : 'text-red-400'}`}>
        {isLoggedIn ? 'Connected' : 'Disconnected'}
      </div>

      {user && (
        <ul className="mt-1 text-xs leading-5 space-y-1">
          <li>
            <strong>Email :</strong> {user.email}
          </li>
          <li>
            <strong>Username :</strong> {user.username}
          </li>
          <li>
            <strong>Admin :</strong> {user.admin ? 'oui' : 'non'}
          </li>
        </ul>
      )}

      <div className="flex flex-col gap-2 mt-3 text-xs">
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="bg-primary px-3 py-1 rounded hover:bg-secondary transition cursor-pointer"
          >
            Logout
          </button>
        )}
        <button
          onClick={() => notify(t('testNotification'), 'info')}
          className="bg-gray-600 px-3 py-1 rounded hover:bg-gray-700 transition cursor-pointer"
        >
          Alert [info]
        </button>
        <button
          onClick={() => notify(t('testNotification'), 'success')}
          className="bg-gray-600 px-3 py-1 rounded hover:bg-gray-700 transition cursor-pointer"
        >
          Alert [success]
        </button>
        <button
          onClick={() => notify(t('testNotification'), 'error')}
          className="bg-gray-600 px-3 py-1 rounded hover:bg-gray-700 transition cursor-pointer"
        >
          Alert [error]
        </button>
        <button
          onClick={() => notify(t('testNotification'), 'warning')}
          className="bg-gray-600 px-3 py-1 rounded hover:bg-gray-700 transition cursor-pointer"
        >
          Alert [warning]
        </button>
        <button
          onClick={refresh}
          className="bg-gray-600 px-3 py-1 rounded hover:bg-gray-700 transition cursor-pointer"
        >
          Refresh
        </button>
        <button
          onClick={cleanPending}
          className="bg-gray-600 px-3 py-1 rounded hover:bg-gray-700 transition cursor-pointer"
        >
          Clean Pending
        </button>
      </div>
    </div>
  );
}
