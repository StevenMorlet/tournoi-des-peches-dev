'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fontDisplay, fontGameCompact } from '@/lib/fonts';
import Input from '@/components/form/input/Input';
import { useNotify } from '@/contexts/NotificationContext';
import { useTranslations } from 'next-intl';

export default function ResetPasswordForm({ token }: { token: string }) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({});
  const notify = useNotify();
  const router = useRouter();
  const g = useTranslations('General');
  const t = useTranslations('ResetPassword');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!password) newErrors.password = t('enterAPassword');

    if (!confirm) newErrors.confirm = t('confirmThePassword');
    else if (password !== confirm) newErrors.confirm = g('passwordsDontMatch');

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
      setErrors({ password: data.error || g('unknownError') });
    } else {
      notify(t('passwordReinitialized'), 'success');
      router.push('/auth');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-lg">
      <h1 className={`text-xl text-white ${fontDisplay.className}`}>{t('reinitializePassword')}</h1>

      <div>
        <Input
          type="password"
          name="password"
          placeholder={g('newPassword')}
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
          placeholder={g('confirmPassword')}
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
        {g('reinitialize')}
      </button>
    </form>
  );
}
