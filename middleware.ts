import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { verifyJwtEdge } from '@/lib/auth/jwtEdge';

const locales = routing.locales;
const defaultLocale = routing.defaultLocale;

const PUBLIC_ROUTES = ['/', '/auth', '/auth/login', '/auth/signup'];
const KNOWN_ROUTES = [...PUBLIC_ROUTES, '/profile', '/game', '/stats'];

const intlMiddleware = createMiddleware(routing) as (
  req: NextRequest,
) => NextResponse | Promise<NextResponse>;

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const { pathname } = url;

  if (
    pathname.startsWith('/_next') ||
    pathname.includes('.') ||
    pathname.startsWith('/assets') ||
    pathname === '/background.jpg'
  ) {
    return NextResponse.next();
  }

  const hasLocale = locales.some((locale) => pathname.startsWith(`/${locale}`));

  if (!hasLocale) {
    const locale = req.cookies.get('NEXT_LOCALE')?.value || defaultLocale;
    const newUrl = url.clone();
    newUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(newUrl);
  }

  const intlResponse = await intlMiddleware(req);

  const pathnameWithoutLocale = `/${pathname.split('/').slice(2).join('/')}`;

  const isPublic = PUBLIC_ROUTES.includes(pathnameWithoutLocale);
  const isKnown = KNOWN_ROUTES.includes(pathnameWithoutLocale);

  const token = req.cookies.get('session')?.value;
  const session = token ? await verifyJwtEdge(token) : null;

  if (!session?.userId && !isKnown) {
    return intlResponse;
  }

  if (!session?.userId && !isPublic) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = `/${defaultLocale}/auth`;
    return NextResponse.redirect(loginUrl);
  }

  return intlResponse;
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|.*\\..*).*)'],
};
