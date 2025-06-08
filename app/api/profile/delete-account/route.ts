import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth/jwt';
import prisma from '@/lib/db/prisma';
import { deleteObject } from '@/lib/minio/minio';
import { NextResponse } from 'next/server';
import { getLocaleFromRequest, getT } from '@/lib/i18n/apiTranslations';

export async function POST(req: Request) {
  const locale = getLocaleFromRequest(req);
  const g = getT(locale, 'General');
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;
  const payload = token ? verifyToken(token) : null;

  if (!payload?.userId) {
    return NextResponse.json({ error: g('unauthorized') }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { avatarUrl: true },
    });

    if (user?.avatarUrl) {
      const parts = user.avatarUrl.split('/');
      const objectKey = parts.at(-1);
      if (objectKey) {
        await deleteObject(objectKey);
      }
    }

    await prisma.user.delete({ where: { id: payload.userId } });

    const res = NextResponse.json({ success: true });
    res.cookies.set('session', '', { maxAge: 0 });

    return res;
  } catch (err) {
    console.error('Account deleting error : ', err);
    return NextResponse.json({ error: g('serverError') }, { status: 500 });
  }
}
