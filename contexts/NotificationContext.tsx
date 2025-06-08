'use client';

import { createContext, useContext, ReactNode } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import CustomToast from '@/components/notifications/CustomToast';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationContextType {
  notify: (msg: string, type?: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const notify = (msg: string, type: NotificationType = 'info') => {
    toast.custom((t) =>
      t.visible ? (
        <CustomToast message={msg} type={type} onDismiss={() => toast.dismiss(t.id)} />
      ) : null,
    );
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'none',
            boxShadow: 'none',
            padding: 0,
          },
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
