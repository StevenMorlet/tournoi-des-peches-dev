'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useNotify } from '@/app/contexts/NotificationContext';
import { fontGameCompact, fontDisplay } from '@/app/lib/fonts';
import { useSession } from '@/app/contexts/SessionContext';

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
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`p-2 border-4 rounded-md w-full ${errors.email ? 'border-red-500' : 'border-gray-300'} ${fontGameCompact.className}`}
        />
        {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email}</p>}
      </div>

      <div>
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`p-2 border-4 rounded-md w-full ${errors.password ? 'border-red-500' : 'border-gray-300'} ${fontGameCompact.className}`}
        />
        {errors.password && <p className="text-sm text-red-400 mt-1">{errors.password}</p>}
      </div>

      <button
        type="submit"
        className={`bg-black text-white px-4 py-2 rounded-md border-2 border-gray-300 hover:bg-red-900 ${fontDisplay.className} cursor-pointer`}
      >
        Se connecter
      </button>
    </form>
  );
}
