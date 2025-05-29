'use client';

import { useState } from 'react';
import SignupForm from './SignUpForm';
import LoginForm from './LogInForm';
import { fontDisplay } from '@/app/fonts';

export default function AuthForms() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  return (
    <div className="w-full p-6 shadow-lg flex flex-col gap-6">
      <div>{mode === 'login' ? <LoginForm /> : <SignupForm />}</div>

      <div className="flex justify-between items-center text-sm mt-2">
        {/* Placeholder pour mot de passe oublié */}
        {mode === 'login' ? (
          <button className="text-blue-600 hover:underline">Mot de passe oublié ?</button>
        ) : (
          <div />
        )}

        <div className={`text-right ${fontDisplay.className}`}>
          {mode === 'login' ? (
            <span>
              Pas encore de compte ?{' '}
              <button
                onClick={() => setMode('signup')}
                className="text-red-500 hover:text-red-700 cursor-pointer"
              >
                S’inscrire
              </button>
            </span>
          ) : (
            <span>
              Déjà un compte ?{' '}
              <button
                onClick={() => setMode('login')}
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
