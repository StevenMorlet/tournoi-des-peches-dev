import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth/jwt';
import prisma from '@/lib/db/prisma';
import { hashPassword, verifyPassword } from '@/lib/auth/password';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  const payload = session ? verifyToken(session) : null;

  if (!payload?.userId) {
    return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 });
  }

  const { oldPassword, newPassword } = await req.json();

  if (!oldPassword || !newPassword) {
    return NextResponse.json({ error: 'Champs manquants.' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { password: true },
  });

  if (!user || !user.password) {
    return NextResponse.json({ error: 'Utilisateur non trouvé.' }, { status: 404 });
  }

  const isValid = await verifyPassword(oldPassword, user.password);
  if (!isValid) {
    return NextResponse.json({ error: 'Ancien mot de passe incorrect.' }, { status: 403 });
  }

  const hashedNew = await hashPassword(newPassword);

  await prisma.user.update({
    where: { id: payload.userId },
    data: { password: hashedNew },
  });

  return NextResponse.json({ success: true });
}
