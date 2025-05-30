import { ReactNode } from 'react';
import { AuthFormProvider } from '@/app/contexts/AuthFormsContext';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <AuthFormProvider>{children}</AuthFormProvider>;
}
