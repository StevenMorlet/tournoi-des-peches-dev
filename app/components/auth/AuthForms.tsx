'use client';

import { fontDisplay } from '@/app/lib/fonts';
import { useAuthForm } from '@/app/contexts/AuthFormContext';
import SignupForm from '@/app/components/auth/SignUpForm';
import LoginForm from '@/app/components/auth/LogInForm';
import ForgotPasswordForm from '@/app/components/auth/ForgotPasswordForm';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthForms() {
  const searchParams = useSearchParams();
  const initialForm = searchParams.get('form') as 'login' | 'signup' | 'forgot' | null;
  const { form, setForm } = useAuthForm();
  const router = useRouter();

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
    <div className="w-full p-6 shadow-lg flex flex-col gap-6">
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
              Mot de passe oublié ?
            </button>
          </div>
        )}

        {form === 'forgot' && (
          <div className={`flex w-full items-center justify-end`}>
            <button
              onClick={() => setForm('login')}
              className={`text-primary hover:text-secondary ${fontDisplay.className}`}
            >
              Retour à la connexion
            </button>
          </div>
        )}

        {form === 'login' ? (
          <div className={`flex w-2/3 justify-end ${fontDisplay.className}`}>
            <span className={`flex flex-row items-center justify-end`}>
              Pas encore de compte ?{' '}
              <button
                onClick={() => setForm('signup')}
                className="text-primary hover:text-secondary cursor-pointer"
              >
                S’inscrire
              </button>
            </span>
          </div>
        ) : form === 'signup' ? (
          <div className={`flex w-full justify-end ${fontDisplay.className}`}>
            <span>
              Déjà un compte ?{' '}
              <button
                onClick={() => setForm('login')}
                className="text-primary hover:text-secondary cursor-pointer"
              >
                Se connecter
              </button>
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
