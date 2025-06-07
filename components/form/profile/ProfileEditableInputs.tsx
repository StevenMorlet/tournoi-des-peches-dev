'use client';

import React, { useState } from 'react';
import { fontDisplay, fontGameCompact } from '@/lib/fonts';
import { useNotify } from '@/contexts/NotificationContext';
import { useSession } from '@/contexts/SessionContext';
import Link from 'next/link';

export default function ProfileEditable() {
  const { user, updateUser } = useSession();
  const notify = useNotify();
  const g = useTranslations('General');
  const t = useTranslations('ProfilePage');

  const [fields, setFields] = useState({
    email: user?.email || '',
    username: user?.username || '',
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    const res = await fetch('/api/profile/update-profile', {
      method: 'POST',
      body: JSON.stringify(fields),
      headers: { 'Content-Type': 'application/json' },
    });
    setSaving(false);

    if (res.ok) {
      updateUser(fields);
      notify('Profil mis à jour.', 'success');
    } else {
      const data = await res.json();
      notify(data.error || 'Erreur inconnue', 'error');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <label className={fontDisplay.className}>Adresse email</label>
      <input
        name="email"
        type="email"
        value={fields.email}
        placeholder={fields.email}
        onChange={handleChange}
        className={`bg-transparent text-white border-4 border-border rounded px-3 py-2 ${fontGameCompact.className}`}
      />

      <label className={fontDisplay.className}>Nom d’utilisateur</label>
      <input
        name="username"
        type="text"
        value={fields.username}
        placeholder={fields.username}
        onChange={handleChange}
        className={`bg-transparent text-white border-4 border-border rounded px-3 py-2 placeholder:opacity-50 ${fontGameCompact.className}`}
      />

      <div className={`flex flex-row justify-between gap-6`}>
        <button
          onClick={handleSubmit}
          disabled={saving || (fields.email === user?.email && fields.username === user?.username)}
          className={`mt-2 px-4 py-2 w-full rounded bg-primary hover:bg-secondary transition text-white disabled:cursor-not-allowed disabled:opacity-40 ${fontDisplay.className}`}
        >
          {saving ? g('saving') : g('save')}
        </button>
        <Link
          href="/"
          passHref
          className={`mt-2 px-4 py-2 w-full  bg-black text-white text-center rounded-md border-2 border-border hover:bg-ternary ${fontDisplay.className} cursor-pointer`}
        >
          {g('cancel')}
        </button>
      </div>
    </div>
  );
}
