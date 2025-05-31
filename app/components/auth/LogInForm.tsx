'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useNotify } from '@/app/contexts/NotificationContext';
import { fontDisplay } from '@/app/lib/fonts';
import { useSession } from '@/app/contexts/SessionContext';
import Link from 'next/link';
import Input from '@/app/components/form/input/input';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const notify = useNotify();
  const router = useRouter();
  const { refresh } = useSession();

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
      notify(data.error || 'Erreur inconnue', 'error');
    } else {
      notify('Connexion réussie !', 'success');
      router.push('/');
    }

    void refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-lg">
      <div>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={errors.email && 'border-primary'}
        />
        {errors.email && <p className="text-sm text-primary mt-1">{errors.email}</p>}
      </div>

      <div>
        <Input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={errors.password && 'border-primary'}
        />
        {errors.password && <p className="text-sm text-primary mt-1">{errors.password}</p>}
      </div>

      <div className={`flex flex-row justify-between`}>
        <button
          type="submit"
          className={`bg-black text-white px-4 py-2 w-3/4 rounded-md border-2 border-gray-300 hover:bg-ternary ${fontDisplay.className} cursor-pointer`}
        >
          Se connecter
        </button>

        <Link
          href="/"
          passHref
          className={`bg-black text-white px-4 py-2 w-fit rounded-md border-2 border-gray-300 hover:bg-ternary ${fontDisplay.className} cursor-pointer`}
        >
          Annuler
        </Link>
      </div>
    </form>
  );
}
