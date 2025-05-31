'use client';

import { fontDisplay } from '@/app/lib/fonts';
import { useAuthForm } from '@/app/contexts/AuthFormContext';
import SignupForm from '@/app/components/auth/SignUpForm';
import LoginForm from '@/app/components/auth/LogInForm';
import ForgotPasswordForm from '@/app/components/auth/ForgotPasswordForm';

export default function AuthForms() {
  const { form, setForm } = useAuthForm();

  return (
    <div className="w-full p-6 shadow-lg flex flex-col gap-6">
      <div>
        {form === 'signup' && <SignupForm />}
        {form === 'login' && <LoginForm />}
        {form === 'forgot' && <ForgotPasswordForm />}
      </div>

      <div className="flex justify-between items-center text-sm mt-2">
        {form === 'login' && (
          <button
            onClick={() => setForm('forgot')}
            className={`text-primary hover:text-secondary ${fontDisplay.className}`}
          >
            Mot de passe oublié ?
          </button>
        )}

        {form === 'forgot' && (
          <button
            onClick={() => setForm('login')}
            className={`text-primary hover:text-secondary ${fontDisplay.className}`}
          >
            Retour à la connexion
          </button>
        )}

        <div className={`text-right ${fontDisplay.className}`}>
          {form === 'login' ? (
            <span>
              Pas encore de compte ?{' '}
              <button
                onClick={() => setForm('signup')}
                className="text-primary hover:text-secondary cursor-pointer"
              >
                S’inscrire
              </button>
            </span>
          ) : form === 'signup' ? (
            <span>
              Déjà un compte ?{' '}
              <button
                onClick={() => setForm('login')}
                className="text-primary hover:text-secondary cursor-pointer"
              >
                Se connecter
              </button>
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
