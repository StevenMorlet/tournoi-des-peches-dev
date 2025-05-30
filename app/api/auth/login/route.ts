import { useNotify } from '@/app/components/notifications/NotificationContext';

export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import prisma from '@/app/lib/db/prisma';
import bcrypt from 'bcrypt';
import { signToken } from '@/app/lib/auth/jwt';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const errors: Record<string, string> = {};

  if (!email) errors.email = 'Email requis';
  if (!password) errors.password = 'Mot de passe requis';

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: 'Champs manquants.', fields: errors }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.password) {
    return NextResponse.json({ error: 'Identifiants invalides.' }, { status: 401 });
  }

  if (!user.emailVerified) {
    return NextResponse.json({ error: 'Email non vérifié.' }, { status: 403 });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return NextResponse.json({ error: 'Mot de passe incorrect.' }, { status: 401 });
  }

  const token = signToken({
    userId: user.id,
    email: user.email,
  });

  const res = NextResponse.json({ message: 'Connexion réussie !' });

  res.cookies.set('session', token, {
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
