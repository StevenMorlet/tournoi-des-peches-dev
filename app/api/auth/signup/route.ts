import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { sendEmailVerification } from '@/lib/mailing/mailSender';
import { getLocaleFromRequest, getT } from '@/lib/i18n/apiTranslations';

export async function POST(req: Request) {
  const { email, username, password } = await req.json();
  const locale = getLocaleFromRequest(req);
  const g = getT(locale, 'General');

  const errors: Record<string, string> = {};
  if (!email) errors.email = g('thisFieldIsRequired');
  if (!username) errors.username = g('thisFieldIsRequired');
  if (!password) errors.password = g('thisFieldIsRequired');

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: g('missingFields'), fields: errors }, { status: 400 });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser && existingUser.username !== null) {
    errors.email = g('alreadyUsed');
  }

  const usernameTaken = await prisma.user.findFirst({
    where: {
      username,
      email: { not: email },
      NOT: { username: null },
    },
  });
  const pendingUsernameTaken = await prisma.emailVerificationToken.findFirst({
    where: {
      username,
      email: { not: email },
    },
  });

  if (usernameTaken || pendingUsernameTaken) {
    errors.username = g('alreadyUsed');
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: g('userAlreadyExists'), fields: errors }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const now = new Date();

  await prisma.emailVerificationToken.deleteMany({ where: { email } });

  await prisma.user.upsert({
    where: { email },
    update: {
      username: null,
      password: null,
      lastVerificationEmailSentAt: now,
    },
    create: {
      email,
      username: null,
      password: null,
      lastVerificationEmailSentAt: now,
    },
  });

  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(now.getTime() + 1000 * 60 * 10); // 10 minutes

  await prisma.emailVerificationToken.create({
    data: {
      email,
      token,
      username,
      hashedPassword,
      expiresAt,
    },
  });

  sendEmailVerification(email, token, g).catch(console.error);

  return NextResponse.json({ message: g('emailSent') });
}
