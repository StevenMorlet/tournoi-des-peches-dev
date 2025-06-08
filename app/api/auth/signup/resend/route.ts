import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import crypto from 'crypto';
import { sendEmailVerification } from '@/lib/mailing/mailSender';
import { getLocaleFromRequest, getT } from '@/lib/i18n/apiTranslations';

export async function POST(req: Request) {
  const locale = getLocaleFromRequest(req);
  const g = getT(locale, 'General');
  const { email } = await req.json();

  if (!email) return NextResponse.json({ error: g('emailRequired') }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.username !== null) {
    return NextResponse.json({ error: g('noPendingAccountForEmail') }, { status: 400 });
  }

  const lastToken = await prisma.emailVerificationToken.findFirst({
    where: { email },
    orderBy: { createdAt: 'desc' },
  });
  if (!lastToken) {
    return NextResponse.json({ error: g('noTokenToValidate') }, { status: 400 });
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

  sendEmailVerification(email, token, g).catch((err) => {
    console.error('Error during email sending : ', err);
  });

  return NextResponse.json({ message: g('emailSent') });
}
