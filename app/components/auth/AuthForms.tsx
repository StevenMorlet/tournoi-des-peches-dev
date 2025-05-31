'use client';

import { useEffect, useRef } from 'react';
import { useNotify } from '@/app/contexts/NotificationContext';
import { fontDisplay } from '@/app/lib/fonts';
import { useAuthForm } from '@/app/contexts/AuthFormContext';
import SignupForm from '@/app/components/auth/SignUpForm';
import LoginForm from '@/app/components/auth/LogInForm';
import { useSearchParams } from 'next/navigation';

export default function AuthForms() {
  const { form, setForm } = useAuthForm();
  const notify = useNotify();
  const hasHandled = useRef(false);
  const params = useSearchParams();
  const verified = params.get('verified');

  useEffect(() => {
    setForm('login');
    if (hasHandled.current || verified !== '1') return;
    hasHandled.current = true;
  }, [notify, setForm]);

  return (
    <div className="w-full p-6 shadow-lg flex flex-col gap-6">
      <div>{form === 'signup' ? <SignupForm /> : <LoginForm />}</div>

      <div className="flex justify-between items-center text-sm mt-2">
        {form === 'login' ? (
          <button className="text-blue-600 hover:underline">Mot de passe oublié ?</button>
        ) : (
          <div />
        )}

        <div className={`text-right ${fontDisplay.className}`}>
          {form === 'login' ? (
            <span>
              Pas encore de compte ?{' '}
              <button
                onClick={() => setForm('signup')}
                className="text-red-500 hover:text-red-700 cursor-pointer"
              >
                S’inscrire
              </button>
            </span>
          ) : (
            <span>
              Déjà un compte ?{' '}
              <button
                onClick={() => setForm('login')}
                className="text-red-500 hover:text-red-700 cursor-pointer"
              >
                Se connecter
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
