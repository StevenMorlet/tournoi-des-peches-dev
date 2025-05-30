'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function IntermediateAuthPage() {
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem('emailVerified', '1');
    router.replace('/auth');
  }, [router]);

  return null;
}
