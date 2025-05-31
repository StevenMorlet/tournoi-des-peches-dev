'use client';

import React, { useState, useEffect } from 'react';
import { useNotify } from '@/app/contexts/NotificationContext';
import { fontDisplay, fontGameCompact } from '@/app/lib/fonts';
import Input from '@/app/components/form/input/input';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState('');
  const notify = useNotify();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSending(true);

    const res = await fetch('/api/auth/password/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Erreur lors de l'envoi");
    } else {
      notify('Email envoyé avec un lien de réinitialisation.', 'success');
      setCooldown(10);
    }

    setIsSending(false);
  };

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const isDisabled = isSending || cooldown > 0;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-lg">
      <h1 className={`text-xl text-white ${fontDisplay.className}`}>Mot de passe oublié</h1>

      <Input
        type="email"
        name="email"
        placeholder="Entrez votre email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={error && 'border-primary'}
      />
      {error && <p className={`text-sm text-primary mt-1 ${fontGameCompact.className}`}>{error}</p>}

      <button
        type="submit"
        disabled={isDisabled}
        className={`bg-black text-white px-4 py-2 rounded-md border-2 border-gray-300 ${
          isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-ternary cursor-pointer'
        } ${fontDisplay.className}`}
      >
        {isSending ? 'Envoi...' : cooldown > 0 ? `Envoyer dans ${cooldown}s` : 'Envoyer le lien'}
      </button>
    </form>
  );
}
