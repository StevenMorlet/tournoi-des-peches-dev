import { NextResponse } from 'next/server';
import prisma from '@/app/lib/db/prisma';

export async function POST() {
  const expiryThreshold = new Date(Date.now() - 1000 * 60 * 10);

  const result = await prisma.user.deleteMany({
    where: {
      username: null,
      lastVerificationEmailSentAt: { lt: expiryThreshold },
    },
  });

  console.log(`${result.count} comptes pending supprimés`);

  return NextResponse.json({ deleted: result.count });
}
