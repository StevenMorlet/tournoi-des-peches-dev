import { NextResponse } from 'next/server';
import prisma from '@/app/lib/db/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  const record = await prisma.emailVerificationToken.findUnique({ where: { token } });

  if (!record || record.expiresAt < new Date()) {
    return NextResponse.redirect(new URL('/auth?verified=0', req.url));
  }

  await prisma.user.update({
    where: { email: record.email },
    data: { emailVerified: true },
  });

  await prisma.emailVerificationToken.delete({ where: { token } });

  return NextResponse.redirect(new URL('/auth/verified', req.url));
}
