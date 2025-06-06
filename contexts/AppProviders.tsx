'use client';

import { ReactNode } from 'react';
import { NotificationProvider } from './NotificationContext';
import { AuthFormProvider } from './AuthFormContext';
import { SessionProvider } from '@/contexts/SessionContext';

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <div className={`flex flex-1 flex-col`}>
      <SessionProvider>
        <NotificationProvider>
          <AuthFormProvider>{children}</AuthFormProvider>
        </NotificationProvider>
      </SessionProvider>
    </div>
  );
}
