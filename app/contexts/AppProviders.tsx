'use client';

import { ReactNode } from 'react';
import { NotificationProvider } from './NotificationContext';
import { AuthFormProvider } from './AuthFormsContext';
import SessionDebug from '@/app/components/debug/SessionDebug';
import { SessionProvider } from '@/app/contexts/SessionContext';

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <NotificationProvider>
        <SessionDebug />
        <AuthFormProvider>{children}</AuthFormProvider>
      </NotificationProvider>
    </SessionProvider>
  );
}
