'use client';

import React, { useState } from 'react';
import { fontDisplay, fontGameCompact } from '@/lib/fonts';
import { useNotify } from '@/contexts/NotificationContext';
import { useSession } from '@/contexts/SessionContext';
import Input from '@/components/form/input/Input';
import { useDebouncedValue } from '@/lib/hooks/useDebouncedValue';
import { useTranslations } from 'next-intl';

export default function ProfileEditable() {
  const { user, updateUser } = useSession();
  const notify = useNotify();
  const g = useTranslations('General');
  const t = useTranslations('ProfilePage');

  const initialValues = {
    email: user?.email || '',
    username: user?.username || '',
  };

  const [rawFields, setRawFields] = useState(initialValues);
  const fields = useDebouncedValue(rawFields, 300);

  const [errors, setErrors] = useState<Partial<typeof rawFields>>({});
  const [saving, setSaving] = useState(false);
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
      if (!value) newErrors[key as keyof typeof rawFields] = g('thisFieldIsRequired');
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setMsg(g('missingFields'));
      setIsError(true);
      return;
    }

    setSaving(true);
    const res = await fetch('/api/profile/update-profile', {
      method: 'POST',
      body: JSON.stringify(fields),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    setSaving(false);

    const data = await res.json();

    if (res.ok) {
      updateUser(fields);
      setMsg(t('profileUpdated'));
      notify(t('profileUpdated'), 'success');
    } else {
      setErrors(data?.fields || {});
      setMsg(data.error || g('unknownError'));
      setIsError(true);
      notify(data.error || g('unknownError'), 'error');
    }
  };

  const handleReset = () => {
    setRawFields(initialValues);
    setErrors({});
    setMsg('');
    setIsError(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <Input
          name="email"
          type="email"
          placeholder={g('email')}
          value={rawFields.email}
          onChange={handleChange}
          className={errors.email ? 'border-primary' : ''}
        />
        {errors.email && (
          <p className={`text-sm text-primary mt-1 ${fontGameCompact.className}`}>{errors.email}</p>
        )}
      </div>

      <div>
        <Input
          name="username"
          type="text"
          placeholder={g('username')}
          value={rawFields.username}
          onChange={handleChange}
          className={errors.username ? 'border-primary' : ''}
        />
        {errors.username && (
          <p className={`text-sm text-primary mt-1 ${fontGameCompact.className}`}>
            {errors.username}
          </p>
        )}
      </div>

      <div className="flex flex-row justify-between gap-6">
        <button
          type="submit"
          disabled={saving || (fields.email === user?.email && fields.username === user?.username)}
          className={`mt-2 px-4 py-2 w-full rounded bg-primary hover:bg-secondary transition text-white disabled:cursor-not-allowed disabled:opacity-40 ${fontDisplay.className}`}
        >
          {saving ? g('saving') : g('save')}
        </button>

        <button
          type="button"
          onClick={handleReset}
          className={`mt-2 px-4 py-2 w-full bg-black text-white text-center rounded-md border-2 border-border hover:bg-ternary ${fontDisplay.className} cursor-pointer`}
        >
          {g('cancel')}
        </button>
      </div>

      {msg && (
        <p
          className={`text-sm mt-2 ${isError ? 'text-primary' : 'text-green-400'} ${fontGameCompact.className}`}
        >
          {msg}
        </p>
      )}
    </form>
  );
}
