export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import bcrypt from 'bcrypt';
import { signToken } from '@/lib/auth/jwt';
import { getLocaleFromRequest, getT } from '@/lib/i18n/apiTranslations';

export async function POST(req: Request) {
  const locale = getLocaleFromRequest(req);
  const g = getT(locale, 'General');
  const { email, password } = await req.json();
  const errors: Record<string, string> = {};

  if (!email) errors.email = g('thisFieldIsRequired');
  if (!password) errors.password = g('thisFieldIsRequired');

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: g('missingFields'), fields: errors }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ error: g('invalidCredentials') }, { status: 401 });
  }

  if (!user.username || !user.password) {
    return NextResponse.json(
      { error: g('nonVerifiedAccount'), code: 'UNVERIFIED' },
      { status: 403 },
    );
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return NextResponse.json({ error: g('invalidPassword') }, { status: 401 });
  }

  const token = signToken({
    userId: user.id,
    email: user.email,
  });

  const res = NextResponse.json({ message: g('connectionEstablished') });

  res.cookies.set('session', token, {
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: 60 * 60 * 24,
  });

  return res;
}
