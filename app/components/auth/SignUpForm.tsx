'use client';

import React, { useState } from 'react';
import { fontDisplay, fontGameCompact } from '@/app/fonts';
import { useDebouncedValue } from '@/app/lib/hooks/useDebouncedValue';

export default function SignUpForm() {
  const [rawFields, setRawFields] = useState({
    email: '',
    username: '',
    password: '',
  });

  const fields = useDebouncedValue(rawFields, 400);
  const [errors, setErrors] = useState<Partial<typeof rawFields>>({});
  const [msg, setMsg] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRawFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setMsg('');
    setIsError(false);

    const newErrors: Partial<typeof rawFields> = {};
    Object.entries(fields).forEach(([key, value]) => {
      if (!value) newErrors[key as keyof typeof rawFields] = 'Ce champ est requis';
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setMsg('Champs requis manquants.');
      setIsError(true);
      return;
    }

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
    });

    const data = await res.json();

    if (!res.ok) {
      const serverErrors: Partial<typeof rawFields> = {};
      if (data?.fields?.email) serverErrors.email = 'Email déjà utilisé.';
      if (data?.fields?.username) serverErrors.username = 'Nom déjà utilisé.';
      if (data?.fields?.password) serverErrors.password = 'Mot de passe invalide.';
      setErrors(serverErrors);
      setMsg(data.error || 'Erreur inconnue.');
      setIsError(true);
    } else {
      setMsg(data.message);
      setRawFields({ email: '', username: '', password: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-lg">
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={rawFields.email}
          onChange={handleChange}
          className={`p-2 border-4 rounded-md w-full ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          } ${fontGameCompact.className}`}
        />
        {errors.email && (
          <p className={`text-sm text-red-400 mt-1 ${fontGameCompact.className}`}>{errors.email}</p>
        )}
      </div>

      <div>
        <input
          type="text"
          name="username"
          placeholder="Nom d’utilisateur"
          value={rawFields.username}
          onChange={handleChange}
          className={`p-2 border-4 rounded-md w-full ${
            errors.username ? 'border-red-500' : 'border-gray-300'
          } ${fontGameCompact.className}`}
        />
        {errors.username && (
          <p className={`text-sm text-red-400 mt-1 ${fontGameCompact.className}`}>
            {errors.username}
          </p>
        )}
      </div>

      <div>
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={rawFields.password}
          onChange={handleChange}
          className={`p-2 border-4 rounded-md w-full ${
            errors.password ? 'border-red-500' : 'border-gray-300'
          } ${fontGameCompact.className}`}
        />
        {errors.password && (
          <p className={`text-sm text-red-400 mt-1 ${fontGameCompact.className}`}>
            {errors.password}
          </p>
        )}
      </div>

      <button
        type="submit"
        className={`bg-black text-white px-4 py-2 rounded-md border-2 border-gray-300 hover:bg-red-900 ${fontDisplay.className} cursor-pointer`}
      >
        S’inscrire
      </button>

      {msg && (
        <p
          className={`text-sm mt-2 ${isError ? 'text-red-400' : 'text-green-400'} ${fontGameCompact.className}`}
        >
          {msg}
        </p>
      )}
    </form>
  );
}
