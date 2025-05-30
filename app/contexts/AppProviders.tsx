'use client';

import { ReactNode } from 'react';
import { NotificationProvider } from './NotificationContext';
import { AuthFormProvider } from './AuthFormsContext';
import SessionDebug from '@/app/components/debug/SessionDebug';

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <NotificationProvider>
      <SessionDebug />
      <AuthFormProvider>{children}</AuthFormProvider>
    </NotificationProvider>
  );
}
