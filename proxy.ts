import {NextRequest, NextResponse} from 'next/server';

const SUPPORTED_LOCALES = ['ru', 'en'] as const;
const DEFAULT_LOCALE = 'ru';

function getLocale(request: NextRequest) {
  const cookieLocale = request.cookies.get('locale')?.value;

  if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale as 'ru' | 'en')) {
    return cookieLocale;
  }

  const acceptLanguage = request.headers.get('accept-language') ?? '';
  if (acceptLanguage.toLowerCase().startsWith('en')) {
    return 'en';
  }

  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const {pathname} = request.nextUrl;

  const pathnameHasLocale = SUPPORTED_LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    const locale = pathname.split('/')[1] as 'ru' | 'en';

    if (locale !== DEFAULT_LOCALE) {
      const response = NextResponse.next();
      response.cookies.set('locale', locale, { path: '/' });
      return response;
    }

    const prefix = `/${DEFAULT_LOCALE}`;
    const rest = pathname.slice(prefix.length);
    const pathWithoutLocale = rest === '' ? '/' : rest;
    const response = NextResponse.redirect(new URL(pathWithoutLocale, request.url));
    response.cookies.set('locale', DEFAULT_LOCALE, { path: '/' });
    return response;
  }

  const locale = getLocale(request);

  if (locale !== DEFAULT_LOCALE) {
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  const rewritePath =
    pathname === '/' ? `/${DEFAULT_LOCALE}` : `/${DEFAULT_LOCALE}${pathname}`;
  const response = NextResponse.rewrite(new URL(rewritePath, request.url));
  response.cookies.set('locale', DEFAULT_LOCALE, { path: '/' });
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)']
};
