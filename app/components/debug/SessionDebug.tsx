'use client';

import { useNotify } from '@/app/contexts/NotificationContext';
import { useSession } from '@/app/contexts/SessionContext';

export default function SessionDebug() {
  const { user, isLoggedIn, refresh } = useSession();
  const notify = useNotify();

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.reload();
    notify('Déconnecté.', 'success');
  };

  const cleanPending = async () => {
    try {
      const res = await fetch('/api/admin/cleanup-pending-accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const text = await res.text();
        notify(`Erreur ${res.status} : ${text}`, 'error');
        return;
      }

      const data = await res.json();
      notify(`Comptes supprimés : ${data.deleted}`, 'success');
    } catch (err) {
      notify('Erreur lors de la requête.', 'error');
      console.error(err);
    }
  };

  return (
    <div className="fixed top-2 left-2 z-50 backdrop-blur-md shadow-md px-4 py-2 text-sm text-white bg-black/40 rounded-md">
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
            onClick={logout}
            className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition cursor-pointer"
          >
            Logout
          </button>
        )}
        <button
          onClick={() => notify('Notification de test', 'info')}
          className="bg-gray-600 px-3 py-1 rounded hover:bg-gray-700 transition cursor-pointer"
        >
          Test alert
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
