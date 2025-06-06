import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth/jwt';
import { putObject, deleteObject } from '@/lib/minio/minio';
import { randomUUID } from 'crypto';
import prisma from '@/lib/db/prisma';

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  const payload = session ? verifyToken(session) : null;

  if (!payload?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file || !file.type.startsWith('image/')) {
    return NextResponse.json({ error: 'Invalid file' }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const extension = file.name.split('.').pop();
  const key = `${randomUUID()}.${extension}`;
  const avatarUrl = `${process.env.MINIO_PUBLIC_URL}/avatars/${key}`;

  try {
    const user = await prisma.user.findUnique({
      where: { email: payload.email },
      select: { avatarUrl: true },
    });

    if (user?.avatarUrl?.includes('/avatars/')) {
      const oldKey = user.avatarUrl.split('/avatars/')[1];

      try {
        await deleteObject(oldKey);
      } catch (err) {
        console.warn(`[Minio] Impossible de supprimer l'ancien avatar (${oldKey}):`, err);
      }
    }

    await putObject(key, buffer, file.type);

    await prisma.user.update({
      where: { email: payload.email },
      data: { avatarUrl },
    });

    return NextResponse.json({ avatarUrl }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
