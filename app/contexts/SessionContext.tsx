'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type SessionUser = {
  id: string;
  email: string;
  username: string;
  admin: boolean;
  avatarUrl: string | null;
};

interface SessionContextType {
  user: SessionUser | null;
  isLoggedIn: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<SessionUser>) => void;
}

const SessionContext = createContext<SessionContextType | null>(null);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<SessionUser | null>(null);

  const fetchSession = async () => {
    const res = await fetch('/api/auth/session');
    const data = await res.json();
    setUser(data.user ?? null);
  };

  const logout = async () => {
    const res = await fetch('/api/auth/logout', { method: 'POST' });
    if (res.ok) {
      setUser(null);
    }
  };

  const updateUser = (updates: Partial<SessionUser>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : prev));
  };

  useEffect(() => {
    void fetchSession();
  }, []);

  return (
    <SessionContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        refresh: fetchSession,
        logout,
        updateUser,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used within SessionProvider');
  return ctx;
};
