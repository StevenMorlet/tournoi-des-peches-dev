import { NextResponse } from 'next/server';
import prisma from '@/app/lib/db/prisma';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Champs requis manquants.' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.password) {
      return NextResponse.json({ error: 'Identifiants invalides.' }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Mot de passe incorrect.' }, { status: 401 });
    }

    if (!user.emailVerified) {
      return NextResponse.json({ error: 'Email non vérifié.' }, { status: 403 });
    }

    // À ce stade, l'utilisateur est authentifié avec succès
    return NextResponse.json({ message: 'Connexion réussie !' });
  } catch (error) {
    console.error('Erreur login:', error);
    return NextResponse.json({ error: 'Erreur interne.' }, { status: 500 });
  }
}
