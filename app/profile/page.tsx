'use client';

import { useSession } from '@/app/contexts/SessionContext';
import { useNotify } from '@/app/contexts/NotificationContext';
import { fontDisplay, fontDisplayOutlined, fontGameCompact } from '@/app/lib/fonts';
import AvatarUploader from '@/app/components/form/profile/AvatarUploader';
import { useState } from 'react';

export default function ProfilePage() {
  const { user, updateUser, logout } = useSession();
  const notify = useNotify();
  const [username, setUsername] = useState(user?.username ?? '');
  const [saving, setSaving] = useState(false);

  const handleResetAvatar = async () => {
    const res = await fetch('/api/profile/reset-avatar', { method: 'POST' });
    if (res.ok) {
      updateUser({ avatarUrl: null });
      notify('Avatar réinitialisé.', 'success');
    } else {
      notify('Erreur lors de la suppression.', 'error');
    }
  };

  const handleUpdateUsername = async () => {
    setSaving(true);
    const res = await fetch('/api/profile/update-username', {
      method: 'POST',
      body: JSON.stringify({ username }),
      headers: { 'Content-Type': 'application/json' },
    });
    setSaving(false);
    if (res.ok) {
      updateUser({ username });
      notify('Nom d’utilisateur mis à jour.', 'success');
    } else {
      notify('Erreur lors de la mise à jour.', 'error');
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = confirm('Êtes-vous sûr de vouloir supprimer votre compte ?');
    if (!confirmed) return;
    const res = await fetch('/api/profile/delete-account', { method: 'POST' });
    if (res.ok) {
      notify('Compte supprimé.', 'success');
      await logout();
    } else {
      notify('Erreur lors de la suppression.', 'error');
    }
  };

  if (!user) return <p>Chargement...</p>;

  return (
    <div className="flex flex-1 items-center justify-center text-white">
      <div className="flex flex-col p-8 max-w-md w-full border border-white/20 rounded-xl bg-white/5 shadow-xl gap-6">
        <h1 className={`text-3xl ${fontDisplayOutlined.className}`}>Profil</h1>

        <div className="flex justify-center">
          <AvatarUploader
            avatarUrl={user.avatarUrl}
            onUploadAction={(url) => {
              updateUser({ avatarUrl: url });
              notify('Avatar mis à jour.', 'success');
            }}
            onReset={handleResetAvatar}
          />
        </div>

        <div className="flex flex-col gap-4">
          <label className={`${fontDisplay.className}`}>Adresse email</label>
          <input
            type="email"
            disabled
            value={user.email}
            className={`bg-neutral-800 text-white border border-white/20 rounded px-3 py-2 disabled:cursor-not-allowed disabled:opacity-40 ${fontGameCompact.className}`}
          />

          <label className={`${fontDisplay.className}`}>Nom d’utilisateur</label>
          <input
            type="text"
            value={username}
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
            className={`bg-neutral-800 text-white border border-white/20 rounded px-3 py-2 ${fontGameCompact.className}`}
          />

          <button
            onClick={handleUpdateUsername}
            disabled={saving || username.trim() === user.username}
            className={`mt-2 px-4 py-2 rounded bg-primary hover:bg-secondary transition text-white disabled:cursor-not-allowed disabled:opacity-40 ${fontDisplay.className}`}
          >
            Enregistrer
          </button>
        </div>

        <hr className="border-white/20 my-4" />

        <div className="flex flex-col gap-2 text-sm">
          <button
            onClick={logout}
            className={`px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded ${fontDisplay.className}`}
          >
            Déconnexion
          </button>

          <button
            onClick={handleDeleteAccount}
            className={`px-4 py-2 bg-secondary hover:bg-ternary text-white rounded ${fontDisplay.className}`}
          >
            Supprimer le compte
          </button>
        </div>
      </div>
    </div>
  );
}
