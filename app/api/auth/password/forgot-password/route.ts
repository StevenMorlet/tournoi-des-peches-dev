import { NextResponse } from 'next/server';
import prisma from '@/app/lib/db/prisma';
import { sendPasswordResetEmail } from '@/app/lib/mailing/mailSender';
import crypto from 'crypto';

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Email invalide' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ error: 'Aucun compte ne correspond à cet email.' }, { status: 404 });
  }

  const existingToken = await prisma.passwordResetToken.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  });

  if (existingToken && Date.now() - existingToken.createdAt.getTime() < 1000 * 10) {
    return NextResponse.json(
      { error: 'Veuillez attendre 10s avant une nouvelle demande.' },
      { status: 429 },
    );
  }

  await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });

  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 10); // 10 minutes

  await prisma.passwordResetToken.create({
    data: {
      token,
      userId: user.id,
      expiresAt,
    },
  });

  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password?token=${token}`;
  await sendPasswordResetEmail(user.email, resetUrl);

  return NextResponse.json({ success: true });
}
