import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@/app/lib/db/prisma';

export async function POST(req: Request) {
  const { email, username, password } = await req.json();

  const missing = {
    email: !email,
    username: !username,
    password: !password,
  };

  if (missing.email || missing.username || missing.password) {
    return NextResponse.json(
      {
        error: 'Champs requis manquants.',
        fields: missing,
      },
      { status: 400 },
    );
  }

  // Vérifie si l'email ou le nom d'utilisateur existe déjà
  const existing = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (existing) {
    const fields: { email?: boolean; username?: boolean } = {};
    if (existing.email === email) fields.email = true;
    if (existing.username === username) fields.username = true;

    return NextResponse.json({ error: 'Utilisateur déjà existant.', fields }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ message: 'Compte créé avec succès.' });
}
