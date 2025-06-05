import { cookies } from 'next/headers';
import { verifyToken } from '@/app/lib/auth/jwt';
import prisma from '@/app/lib/db/prisma';
import { deleteObject } from '@/app/lib/minio/minio';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;
  const payload = token ? verifyToken(token) : null;

  if (!payload?.userId) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { avatarUrl: true },
    });

    if (user?.avatarUrl) {
      const parts = user.avatarUrl.split('/');
      const objectKey = parts.at(-1); // ex: avatar_abc123.png
      if (objectKey) {
        await deleteObject(objectKey);
      }
    }

    await prisma.user.delete({ where: { id: payload.userId } });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Erreur suppression compte:', err);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
