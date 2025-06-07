'use client';

import { useEffect, useState } from 'react';
import { useNotify } from '@/contexts/NotificationContext';
import { fontDisplay } from '@/lib/fonts';
import { useTranslations } from 'next-intl';

type Props = {
  email: string;
};

export default function ResendConfirmationButton({ email }: Props) {
  const notify = useNotify();
  const [isSending, setIsSending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const g = useTranslations('General');

  const handleClick = async () => {
    setIsSending(true);
    try {
      const res = await fetch('/api/auth/signup/resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        notify(data?.error || g('sendingError'), 'error');
      } else {
        notify(data.message || g('emailSent'), 'success');
        setCooldown(10);
      }
    } catch {
      notify(g('unknownError'), 'error');
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const isDisabled = isSending || cooldown > 0;

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={`bg-black text-white px-4 py-2 rounded-md border-2 border-gray-300 ${fontDisplay.className} ${isDisabled ? 'opacity-50 cursor-not-allowed' : ' hover:bg-red-900 cursor-pointer'}`}
    >
      {isSending ? g('sending') : cooldown > 0 ? `${g('sendIn')} ${cooldown}s` : g('sendEmail')}
    </button>
  );
}
