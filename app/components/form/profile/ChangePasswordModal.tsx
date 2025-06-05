'use client';

import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { fontDisplay, fontGameCompact } from '@/app/lib/fonts';
import { useNotify } from '@/app/contexts/NotificationContext';

interface Props {
  open: boolean;
  onCloseAction: () => void;
}

export default function ChangePasswordModal({ open, onCloseAction }: Props) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const notify = useNotify();

  const handleSubmit = async () => {
    if (newPassword !== confirm) {
      notify('Les mots de passe ne correspondent pas.', 'error');
      return;
    }

    setLoading(true);
    const res = await fetch('/api/profile/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ oldPassword, newPassword }),
    });
    setLoading(false);

    if (res.ok) {
      notify('Mot de passe mis à jour.', 'success');
      onCloseAction();
    } else {
      const data = await res.json();
      notify(data.error || 'Erreur inconnue.', 'error');
    }
  };

  return (
    <Dialog open={open} onClose={onCloseAction} className="relative z-50">
      <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel
          as="div"
          className="bg-zinc-900 text-white border-4 border-white/10 rounded-xl px-14 py-8 w-full max-w-xl shadow-xl space-y-4"
        >
          <Dialog.Title className={`text-xl ${fontDisplay.className}`}>
            Changer de mot de passe
          </Dialog.Title>

          <div className={`${fontGameCompact.className} space-y-4`}>
            <input
              type="password"
              placeholder="Ancien mot de passe"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full p-2 rounded bg-zinc-800 border-4 border-border placeholder:opacity-50"
            />
            <input
              type="password"
              placeholder="Nouveau mot de passe"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 rounded bg-zinc-800 border-4 border-border placeholder:opacity-50"
            />
            <input
              type="password"
              placeholder="Confirmer le nouveau mot de passe"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full p-2 rounded bg-zinc-800 border-4 border-border placeholder:opacity-50"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={onCloseAction}
              className={`px-4 py-2 bg-black text-white text-center rounded-md border-2 border-border hover:bg-ternary ${fontDisplay.className} cursor-pointer`}
            >
              Annuler
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`px-4 py-2 bg-primary text-white text-center rounded-md hover:bg-ternary ${fontDisplay.className} transition cursor-pointer`}
            >
              {loading ? 'Envoi...' : 'Valider'}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
