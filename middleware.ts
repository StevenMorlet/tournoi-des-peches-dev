import { NextRequest, NextResponse } from 'next/server';
import { verifyJwtEdge } from '@/app/lib/auth/jwtEdge';

const PUBLIC_ROUTES = ['/', '/auth', '/auth/login', '/auth/signup'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/public') ||
    pathname.startsWith('/assets') ||
    pathname === '/background.jpg'
  ) {
    return NextResponse.next();
  }

  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  const token = req.cookies.get('session')?.value;
  const session = token ? await verifyJwtEdge(token) : null;

  if (!session?.userId) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/auth';
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico).*)'],
};
