'use client';

import { createContext, useContext, ReactNode } from 'react';
import { toast, Toaster } from 'react-hot-toast';

type NotificationType = 'success' | 'error' | 'loading' | 'info';

interface NotificationContextType {
  notify: (msg: string, type?: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const notify = (msg: string, type: NotificationType = 'info') => {
    switch (type) {
      case 'success':
        toast.success(msg);
        break;
      case 'error':
        toast.error(msg);
        break;
      case 'loading':
        toast.loading(msg);
        break;
      case 'info':
      default:
        toast(msg);
    }
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          className: 'text-sm text-white bg-neutral-800',
        }}
      />
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotify = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotify must be used within NotificationProvider');
  return ctx.notify;
};
