'use client';

import { ReactNode, Suspense } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`flex flex-1`}>
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
}
