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
    <div className="w-full max-w-xl p-6 shadow-lg flex flex-col gap-6">
      <div>
        {form === 'signup' && <SignupForm />}
        {form === 'login' && <LoginForm />}
        {form === 'forgot' && <ForgotPasswordForm />}
      </div>

      <div className="flex w-full text-sm mt-2">
        {form === 'login' && (
          <div className={`flex w-1/2 items-center justify-start`}>
            <button
              onClick={() => setForm('forgot')}
              className={`text-primary hover:text-secondary ${fontDisplay.className}`}
            >
              {g('forgottenPassword')} ?
            </button>
          </div>
        )}

        {form === 'forgot' && (
          <div className={`flex w-full items-center justify-end`}>
            <button
              onClick={() => setForm('login')}
              className={`text-primary hover:text-secondary ${fontDisplay.className}`}
            >
              {t('backToConnection')}
            </button>
          </div>
        )}

        {form === 'login' ? (
          <div className={`flex w-2/3 justify-end ${fontDisplay.className}`}>
            <span className={`flex flex-row items-center justify-end`}>
              {t('noAccountYet')}{' '}
              <button
                onClick={() => setForm('signup')}
                className="text-primary hover:text-secondary cursor-pointer"
              >
                {g('toSignUp')}
              </button>
            </span>
          </div>
        ) : form === 'signup' ? (
          <div className={`flex w-full justify-end ${fontDisplay.className}`}>
            <span>
              {t('alreadyHaveAnAccount')}{' '}
              <button
                onClick={() => setForm('login')}
                className="text-primary hover:text-secondary cursor-pointer"
              >
                {g('toLogin')}
              </button>
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
