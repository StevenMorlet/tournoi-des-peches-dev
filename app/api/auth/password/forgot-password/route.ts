import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { sendPasswordResetEmail } from '@/lib/mailing/mailSender';
import crypto from 'crypto';
import { getLocaleFromRequest, getT } from '@/lib/i18n/apiTranslations';

export async function POST(req: Request) {
  const locale = getLocaleFromRequest(req);
  const g = getT(locale, 'General');
  const { email } = await req.json();

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: g('invalidEmail') }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ error: g('noAccountCorrespondingToEmail') }, { status: 404 });
  }

  const existingToken = await prisma.passwordResetToken.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  });

  if (existingToken && Date.now() - existingToken.createdAt.getTime() < 1000 * 10) {
    return NextResponse.json({ error: g('wait10sBeforeNewRequest') }, { status: 429 });
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
  await sendPasswordResetEmail(user.email, resetUrl, g);

  return NextResponse.json({ success: true });
}
