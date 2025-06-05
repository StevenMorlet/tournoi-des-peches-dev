import { cookies } from 'next/headers';
import { verifyToken } from '@/app/lib/auth/jwt';
import prisma from '@/app/lib/db/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;
  const payload = token ? verifyToken(token) : null;

  if (!payload?.userId) {
    return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 });
  }

  const { username, email } = await req.json();
  const updates: Record<string, string> = {};

  if (username) {
    if (username.trim().length < 3) {
      return NextResponse.json({ error: 'Nom d’utilisateur trop court.' }, { status: 400 });
    }
    updates.username = username.trim();
  }

  if (email) {
    const isUsed = await prisma.user.findFirst({
      where: { email, NOT: { id: payload.userId } },
    });

    if (isUsed) {
      return NextResponse.json({ error: 'Email déjà utilisé.' }, { status: 409 });
    }

    updates.email = email.toLowerCase();
  }

  try {
    const updated = await prisma.user.update({
      where: { id: payload.userId },
      data: updates,
    });

    return NextResponse.json({ success: true, user: updated });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
