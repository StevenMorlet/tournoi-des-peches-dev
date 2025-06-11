'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useNotify } from '@/contexts/NotificationContext';
import { fontDisplay, fontGameCompact } from '@/lib/fonts';
import { useSession } from '@/contexts/SessionContext';
import Link from 'next/link';
import Input from '@/components/form/input/Input';
import { useTranslations } from 'next-intl';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const notify = useNotify();
  const router = useRouter();
  const { refresh } = useSession();
  const g = useTranslations('General');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setErrors(data.fields || {});
      notify(data.error || g('unknownError'), 'error');
    } else {
      notify(g('connectionEstablished'), 'success');
      router.push('/');
    }

    void refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-xl">
      <div>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={errors.email && 'border-primary'}
        />
        {errors.email && (
          <p className={`text-sm text-primary mt-1 ${fontGameCompact.className}`}>{errors.email}</p>
        )}
      </div>

      <div>
        <Input
          type="password"
          name="password"
          placeholder={g('password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={errors.password && 'border-primary'}
        />
        {errors.password && (
          <p className={`text-sm text-primary mt-1 ${fontGameCompact.className}`}>
            {errors.password}
          </p>
        )}
      </div>

      <div className={`flex flex-row justify-between gap-6 text-center ${fontDisplay.className}`}>
        <button
          type="submit"
          className={`bg-black px-4 py-2 w-full rounded-md border-2 border-gray-300 hover:bg-ternary cursor-pointer`}
        >
          {g('toLogin')}
        </button>

        <Link
          href="/"
          passHref
          className={`bg-black px-4 py-2 w-fit rounded-md border-2 border-gray-300 hover:bg-ternary cursor-pointer`}
        >
          {g('cancel')}
        </Link>
      </div>
    </form>
  );
}
