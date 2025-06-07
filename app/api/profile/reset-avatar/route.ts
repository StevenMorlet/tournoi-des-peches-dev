import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth/jwt';
import prisma from '@/lib/db/prisma';
import { deleteObject } from '@/lib/minio/minio';
import { getLocaleFromRequest, getT } from '@/lib/i18n/apiTranslations';

export async function POST(req: Request) {
  const locale = getLocaleFromRequest(req);
  const g = getT(locale, 'General');
  const t = getT(locale, 'ProfilePage');
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  const payload = session ? verifyToken(session) : null;

  if (!payload?.email) {
    return NextResponse.json({ error: g('unauthorized') }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: payload.email },
      select: { avatarUrl: true },
    });

    if (user?.avatarUrl) {
      const key = user.avatarUrl.split('/').pop();
      if (key) await deleteObject(key);
    }

    await prisma.user.update({
      where: { email: payload.email },
      data: { avatarUrl: null },
    });

    return NextResponse.json({ message: t('avatarReinitialized') }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: g('serverError') }, { status: 500 });
  }
}
