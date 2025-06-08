import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import prisma from '@/lib/db/prisma';
import { getLocaleFromRequest, getT } from '@/lib/i18n/apiTranslations';

export async function POST(req: NextRequest) {
  const locale = getLocaleFromRequest(req);
  const g = getT(locale, 'General');
  const t = getT(locale, 'ProfilePage');
  const token = req.cookies.get('session')?.value;
  if (!token) return NextResponse.json({ error: g('unauthorized') }, { status: 401 });

  const payload = verifyToken(token);
  if (!payload) return NextResponse.json({ error: g('invalidToken') }, { status: 401 });

  const { userId } = payload;

  const { email, username } = await req.json();
  const errors: Partial<{ email: string; username: string }> = {};

  if (!email) errors.email = g('thisFieldIsRequired');
  if (!username) errors.username = g('thisFieldIsRequired');

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: g('missingFields'), fields: errors }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return NextResponse.json({ error: g('userNotFound') }, { status: 404 });

  if (email !== user.email) {
    const emailExists = await prisma.user.findUnique({
      where: { email },
    });

    if (emailExists) {
      errors.email = g('alreadyUsed');
      return NextResponse.json({ error: g('emailConflict'), fields: errors }, { status: 400 });
    }
  }

  if (username !== user.username) {
    const usernameExists = await prisma.user.findFirst({
      where: {
        username,
        NOT: { id: userId },
      },
    });

    if (usernameExists) {
      errors.username = g('alreadyUsed');
      return NextResponse.json({ error: g('usernameConflict'), fields: errors }, { status: 400 });
    }
  }

  await prisma.user.update({
    where: { id: userId },
    data: { email, username },
  });

  return NextResponse.json({ message: t('profileUpdated') });
}
