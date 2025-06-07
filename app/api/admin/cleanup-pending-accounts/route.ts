import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export async function POST() {
  const expiryThreshold = new Date(Date.now() - 1000 * 60 * 10);

  const result = await prisma.user.deleteMany({
    where: {
      username: null,
      lastVerificationEmailSentAt: { lt: expiryThreshold },
    },
  });

  console.log(`${result.count} pending accounts deleted`);

  return NextResponse.json({ deleted: result.count });
}
