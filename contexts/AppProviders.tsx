'use client';

import { ReactNode } from 'react';
import { NotificationProvider } from './NotificationContext';
import { AuthFormProvider } from './AuthFormContext';
import { SessionProvider } from '@/contexts/SessionContext';

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <NotificationProvider>
        <AuthFormProvider>{children}</AuthFormProvider>
      </NotificationProvider>
    </SessionProvider>
  );
}
