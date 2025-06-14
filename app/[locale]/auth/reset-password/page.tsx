'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import { useNotify } from '@/contexts/NotificationContext';
import { useTranslations } from 'next-intl';

export default function ResetPasswordPage() {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const notify = useNotify();
  const router = useRouter();
  const g = useTranslations('General');

  useEffect(() => {
    if (!token) {
      notify(g('invalidLink'), 'error');
      router.replace('/auth');
      return;
    }

    const validateToken = async () => {
      try {
        const res = await fetch(`/api/auth/password/reset-password/validate?token=${token}`);
        const data = await res.json();

        if (!res.ok || !data.valid) {
          setIsValid(false);
          notify(g('expiredLink'), 'error');
          router.replace('/auth');
        } else {
          setIsValid(true);
        }
      } catch {
        setIsValid(false);
        notify(g('anErrorOccurred'), 'error');
        router.replace('/auth');
      }
    };

    void validateToken();
  }, [token, notify, router, g]);

  if (isValid !== true) {
    return null;
  }

  return (
    <div className="flex flex-1 justify-center items-center">
      <ResetPasswordForm token={token!} />
    </div>
  );
}
