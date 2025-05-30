import { ReactNode } from 'react';
import { AuthFormProvider } from '@/app/components/auth/AuthFormsContext';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <AuthFormProvider>{children}</AuthFormProvider>;
}
