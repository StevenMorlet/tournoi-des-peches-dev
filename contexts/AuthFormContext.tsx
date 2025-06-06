'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type AuthFormType = 'login' | 'signup' | 'forgot';

interface AuthFormContextType {
  form: AuthFormType;
  setForm: (form: AuthFormType) => void;
}

const AuthFormContext = createContext<AuthFormContextType | null>(null);

export const AuthFormProvider = ({ children }: { children: ReactNode }) => {
  const [form, setForm] = useState<AuthFormType>('login');
  return <AuthFormContext.Provider value={{ form, setForm }}>{children}</AuthFormContext.Provider>;
};

export const useAuthForm = () => {
  const ctx = useContext(AuthFormContext);
  if (!ctx) throw new Error('useAuthForm must be used within AuthFormProvider');
  return ctx;
};
