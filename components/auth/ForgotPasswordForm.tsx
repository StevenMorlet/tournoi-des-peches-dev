'use client';

import React, { useState, useEffect } from 'react';
import { useNotify } from '@/contexts/NotificationContext';
import { fontDisplay, fontGameCompact } from '@/lib/fonts';
import Input from '@/components/form/input/Input';
import { useTranslations } from 'next-intl';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState('');
  const notify = useNotify();
  const g = useTranslations('General');

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
      setError(data.error || g('sendingError'));
    } else {
      notify(g('emailSent'), 'success');
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <h1 className={`text-xl text-white ${fontDisplay.className}`}>{g('forgottenPassword')}</h1>

      <Input
        type="email"
        name="email"
        placeholder="Email"
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
        {isSending ? g('sending') : cooldown > 0 ? `${g('sendIn')} ${cooldown}s` : g('sendEmail')}
      </button>
    </form>
  );
}
