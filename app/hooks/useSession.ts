'use client';

import { useEffect, useState } from 'react';

type User = {
  id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  admin: boolean;
} | null;

export function useSession() {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data) => setUser(data.user ?? null))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading, isLoggedIn: !!user };
}
