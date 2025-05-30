import { NextResponse } from 'next/server';
import prisma from '@/app/lib/db/prisma';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { sendEmailVerification } from '@/app/lib/mailing/mail';

export async function POST(req: Request) {
  const { email, username, password } = await req.json();

  const errors: Record<string, string> = {};
  if (!email) errors.email = 'Email requis';
  if (!username) errors.username = 'Nom requis';
  if (!password) errors.password = 'Mot de passe requis';

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: 'Champs manquants', fields: errors }, { status: 400 });
  }

  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] },
  });

  if (existingUser) {
    if (existingUser.email === email) errors.email = 'Email déjà utilisé';
    if (existingUser.username === username) errors.username = 'Nom déjà utilisé';
    return NextResponse.json({ error: 'Utilisateur existant', fields: errors }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, username, password: hashedPassword },
  });

  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 1000 * 60 * 10);

  await prisma.emailVerificationToken.create({
    data: { email: user.email, token, expiresAt },
  });

  await sendEmailVerification(user.email, token);

  return NextResponse.json({ message: 'Inscription enregistrée. Email de confirmation envoyé.' });
}
