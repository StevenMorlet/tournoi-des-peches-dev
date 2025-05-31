'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fontDisplay, fontGameCompact } from '@/app/lib/fonts';
import Input from '@/app/components/form/input/input';
import { useNotify } from '@/app/contexts/NotificationContext';

export default function ResetPasswordForm({ token }: { token: string }) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({});
  const notify = useNotify();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!password) newErrors.password = 'Veuillez saisir un mot de passe.';

    if (!confirm) newErrors.confirm = 'Veuillez confirmer le mot de passe.';
    else if (password !== confirm) newErrors.confirm = 'Les mots de passe ne correspondent pas.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const res = await fetch('/api/auth/password/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setErrors({ password: data.error || 'Erreur inconnue' });
    } else {
      notify('Mot de passe réinitialisé. Vous pouvez vous connecter.', 'success');
      router.push('/auth');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-lg">
      <h1 className={`text-xl text-white ${fontDisplay.className}`}>
        Réinitialiser le mot de passe
      </h1>

      <div>
        <Input
          type="password"
          name="password"
          placeholder="Nouveau mot de passe"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prev) => ({ ...prev, password: undefined }));
          }}
          className={errors.password ? 'border-primary' : ''}
        />
        {errors.password && (
          <p className={`text-sm text-primary ${fontGameCompact.className}`}>{errors.password}</p>
        )}
      </div>

      <div>
        <Input
          type="password"
          name="confirm"
          placeholder="Confirmer le mot de passe"
          value={confirm}
          onChange={(e) => {
            setConfirm(e.target.value);
            setErrors((prev) => ({ ...prev, confirm: undefined }));
          }}
          className={errors.confirm ? 'border-primary' : ''}
        />
        {errors.confirm && (
          <p className={`text-sm text-primary ${fontGameCompact.className}`}>{errors.confirm}</p>
        )}
      </div>

      <button
        type="submit"
        className={`bg-black text-white px-4 py-2 rounded-md border-2 border-gray-300 hover:bg-ternary ${fontDisplay.className} cursor-pointer`}
      >
        Réinitialiser
      </button>
    </form>
  );
}
