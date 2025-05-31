import { NextResponse } from 'next/server';
import prisma from '@/app/lib/db/prisma';
import crypto from 'crypto';
import { sendEmailVerification } from '@/app/lib/mailing/mailSender';

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: 'Email requis' }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.username !== null) {
    return NextResponse.json({ error: 'Aucun compte en attente pour cet email.' }, { status: 400 });
  }

  const lastToken = await prisma.emailVerificationToken.findFirst({
    where: { email },
    orderBy: { createdAt: 'desc' },
  });
  if (!lastToken) {
    return NextResponse.json({ error: 'Aucun token existant à revalider.' }, { status: 400 });
  }

  await prisma.emailVerificationToken.deleteMany({ where: { email } });

  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 1000 * 60 * 10); // 10 minutes

  await prisma.emailVerificationToken.create({
    data: {
      email,
      token,
      username: lastToken.username,
      hashedPassword: lastToken.hashedPassword,
      expiresAt,
    },
  });

  await prisma.user.update({
    where: { email },
    data: {
      lastVerificationEmailSentAt: new Date(),
    },
  });

  sendEmailVerification(email, token).catch((err) => {
    console.error('Erreur envoi email confirmation :', err);
  });

  return NextResponse.json({ message: 'Lien de confirmation renvoyé.' });
}
