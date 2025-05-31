export const runtime = 'nodejs';

import { cookies } from 'next/headers';
import { verifyToken } from '@/app/lib/auth/jwt';
import prisma from '@/app/lib/db/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;

  if (!session) return NextResponse.json({ user: null });

  const payload = verifyToken(session);
  if (!payload?.userId) return NextResponse.json({ user: null });

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      username: true,
      email: true,
      admin: true,
    },
  });

  return NextResponse.json({ user });
}
