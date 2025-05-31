import { NextResponse } from 'next/server';
import prisma from '@/app/lib/db/prisma';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { sendEmailVerification } from '@/app/lib/mailing/mailSender';

export async function POST(req: Request) {
  const { email, username, password } = await req.json();

  const errors: Record<string, string> = {};
  if (!email) errors.email = 'Email requis';
  if (!username) errors.username = "Nom d'utilisateur requis";
  if (!password) errors.password = 'Mot de passe requis';

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { error: 'Champs requis manquants.', fields: errors },
      { status: 400 },
    );
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser && existingUser.username !== null) {
    errors.email = 'Email déjà utilisé.';
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
    errors.username = 'Nom déjà utilisé.';
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { error: 'Utilisateur déjà existant.', fields: errors },
      { status: 400 },
    );
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

  sendEmailVerification(email, token).catch(console.error);

  return NextResponse.json({ message: 'Email de confirmation envoyé.' });
}
