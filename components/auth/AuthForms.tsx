'use client';

import { fontDisplay } from '@/lib/fonts';
import { useAuthForm } from '@/contexts/AuthFormContext';
import SignupForm from '@/components/auth/SignUpForm';
import LoginForm from '@/components/auth/LogInForm';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function AuthForms() {
  const searchParams = useSearchParams();
  const initialForm = searchParams.get('form') as 'login' | 'signup' | 'forgot' | null;
  const { form, setForm } = useAuthForm();
  const router = useRouter();
  const g = useTranslations('General');
  const t = useTranslations('AuthForms');

  useEffect(() => {
    if (initialForm) setForm(initialForm);
  }, [initialForm, setForm]);

  useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('form', form);
    const query = current.toString();
    router.replace(`?${query}`);
  }, [form, router, searchParams]);

  return (
    <div className="flex flex-col w-full gap-6 shadow-lg">
      <div>
        {form === 'signup' && <SignupForm />}
        {form === 'login' && <LoginForm />}
        {form === 'forgot' && <ForgotPasswordForm />}
      </div>

      <div
        className={`flex flex-row w-full text-sm gap-4 justify-between ${fontDisplay.className}`}
      >
        {form === 'login' && (
          <div className={`text-left`}>
            <button
              onClick={() => setForm('forgot')}
              className={`text-primary hover:text-secondary cursor-pointer`}
            >
              {g('forgottenPassword')} ?
            </button>
          </div>
        )}

        {form === 'forgot' && (
          <div className={``}>
            <button
              onClick={() => setForm('login')}
              className={`text-primary hover:text-secondary cursor-pointer`}
            >
              {t('backToConnection')}
            </button>
          </div>
        )}

        {form === 'login' ? (
          <div className={`text-right`}>
            {t('noAccountYet')}{' '}
            <button
              onClick={() => setForm('signup')}
              className="text-primary hover:text-secondary cursor-pointer"
            >
              {g('toSignUp')}
            </button>
          </div>
        ) : form === 'signup' ? (
          <div className={`flex flex-row w-full justify-end gap-2`}>
            {t('alreadyHaveAnAccount')}{' '}
            <button
              onClick={() => setForm('login')}
              className="text-primary hover:text-secondary cursor-pointer"
            >
              {g('toLogin')}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
