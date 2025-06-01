'use client';

import React, { useState } from 'react';
import { fontDisplay, fontGameCompact } from '@/app/lib/fonts';
import { useDebouncedValue } from '@/app/lib/hooks/useDebouncedValue';
import ResendConfirmationButton from '@/app/components/auth/ResendConfirmationEmailButton';
import Link from 'next/link';
import Input from '@/app/components/form/input/Input';

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
  const [confirmationSent, setConfirmationSent] = useState(false);

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

    const res = await fetch('/api/auth/signup', {
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
      setConfirmationSent(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-lg">
      <div>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={rawFields.email}
          onChange={handleChange}
          disabled={confirmationSent}
          className={
            (confirmationSent && `opacity-50 cursor-not-allowed`) ||
            (errors.email && `border-primary`)
          }
        />
        {errors.email && (
          <p className={`text-sm text-primary mt-1 ${fontGameCompact.className}`}>{errors.email}</p>
        )}
      </div>

      <div>
        <Input
          type="text"
          name="username"
          placeholder="Nom d’utilisateur"
          value={rawFields.username}
          onChange={handleChange}
          disabled={confirmationSent}
          className={
            (confirmationSent && `opacity-50 cursor-not-allowed`) ||
            (errors.username && `border-primary`)
          }
        />
        {errors.username && (
          <p className={`text-sm text-primary mt-1 ${fontGameCompact.className}`}>
            {errors.username}
          </p>
        )}
      </div>

      <div>
        <Input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={rawFields.password}
          onChange={handleChange}
          disabled={confirmationSent}
          className={
            (confirmationSent && `opacity-50 cursor-not-allowed`) ||
            (errors.password && `border-primary`)
          }
        />
        {errors.password && (
          <p className={`text-sm text-primary mt-1 ${fontGameCompact.className}`}>
            {errors.password}
          </p>
        )}
      </div>

      <div className={`flex flex-row justify-between`}>
        {(confirmationSent && (
          <button
            type="submit"
            className={`bg-black text-white px-4 py-2 w-3/4 rounded-md border-2 border-gray-300 ${fontDisplay.className} opacity-50 cursor-not-allowed`}
            disabled
          >
            S’inscrire
          </button>
        )) || (
          <button
            type="submit"
            className={`bg-black text-white px-4 py-2 w-3/4 rounded-md border-2 border-gray-300 hover:bg-ternary ${fontDisplay.className} cursor-pointer`}
          >
            S’inscrire
          </button>
        )}

        <Link
          href="/"
          passHref
          className={`bg-black text-white px-4 py-2 rounded-md border-2 border-gray-300 hover:bg-ternary ${fontDisplay.className} cursor-pointer w-fit`}
        >
          Annuler
        </Link>
      </div>

      {msg && (
        <div className={`flex flex-row gap-2 justify-between`}>
          <p
            className={`text-sm mt-2 ${isError ? 'text-primary' : 'text-green-400'} ${fontGameCompact.className}`}
          >
            {msg}
          </p>
          {confirmationSent && <ResendConfirmationButton email={rawFields.email} />}
        </div>
      )}
    </form>
  );
}
