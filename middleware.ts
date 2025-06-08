import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { verifyJwtEdge } from '@/lib/auth/jwtEdge';

const locales = routing.locales;
const defaultLocale = routing.defaultLocale;

const PROTECTED_ROUTES = ['/profile', '/game', '/stats'];

export type SupportedLocale = (typeof locales)[number];

const intlMiddleware = createMiddleware(routing) as (
  req: NextRequest,
) => NextResponse | Promise<NextResponse>;

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const { pathname } = url;

  if (pathname.startsWith('/_next') || pathname.includes('.') || pathname === '/background.jpg') {
    return NextResponse.next();
  }

  const hasLocale = locales.some((locale) => pathname.startsWith(`/${locale}`));

  if (!hasLocale) {
    const localeFromCookie = req.cookies.get('NEXT_LOCALE')?.value;
    const locale: SupportedLocale = locales.includes(localeFromCookie as SupportedLocale)
      ? (localeFromCookie as SupportedLocale)
      : defaultLocale;

    const newUrl = url.clone();
    newUrl.pathname = `/${locale}${pathname}`;
    const response = NextResponse.redirect(newUrl);
    response.cookies.set('NEXT_LOCALE', locale);
    return response;
  }

  const pathnameWithoutLocale = `/${pathname.split('/').slice(2).join('/')}`;
  const isProtected = PROTECTED_ROUTES.includes(pathnameWithoutLocale);

  const token = req.cookies.get('session')?.value;
  const session = token ? await verifyJwtEdge(token) : null;

  if (!session?.userId && isProtected) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = `/${defaultLocale}/auth`;
    return NextResponse.redirect(loginUrl);
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|.*\\..*).*)'],
};
