import { NextResponse } from 'next/server';
import prisma from '@/app/lib/db/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/auth?verified=0', req.url)); // Token manquant dans URL
  }

  const record = await prisma.emailVerificationToken.findUnique({ where: { token } });

  if (!record || record.expiresAt < new Date()) {
    return NextResponse.redirect(new URL('/auth?verified=2', req.url)); // Invalide ou expiré
  }

  const user = await prisma.user.findUnique({ where: { email: record.email } });

  if (!user || user.username !== null) {
    return NextResponse.redirect(new URL('/auth?verified=3', req.url)); // Utilisateur introuvable ou déjà confirmé
  }

  await prisma.user.update({
    where: { email: record.email },
    data: {
      username: record.username,
      password: record.hashedPassword,
    },
  });

  await prisma.emailVerificationToken.delete({ where: { token } });

  return NextResponse.redirect(new URL('/auth?verified=1', req.url)); // Succès
}
