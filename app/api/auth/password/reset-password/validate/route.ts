import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { getLocaleFromRequest, getT } from '@/lib/i18n/apiTranslations';

export async function GET(req: Request) {
  const locale = getLocaleFromRequest(req);
  const g = getT(locale, 'General');
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: g('missingToken') }, { status: 400 });
  }

  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { token },
  });

  if (!resetToken || resetToken.expiresAt < new Date()) {
    return NextResponse.json({ valid: false });
  }

  return NextResponse.json({ valid: true });
}
