import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret-change-in-production'
);

const publicPaths = [
  '/auth',
  '/api/auth',
  '/login',
  '/signup',
  '/about',
  '/privacy-policy',
  '/terms-of-service'
];

function isPublicPath(pathname: string) {
  return publicPaths.some(
    (path) => pathname === path || pathname.startsWith(path + '/')
  );
}

async function getTokenPayload(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { userId: string; username: string; role: string };
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths and static assets
  if (
    isPublicPath(pathname) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/monitoring')
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get('auth-token')?.value;

  // Authenticated frontend pages (/, /challenges, /leaderboard, etc.)
  // require login but not admin role
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Dashboard routes require admin role
  if (pathname.startsWith('/dashboard')) {
    const payload = await getTokenPayload(token);
    if (!payload || payload.role !== 'admin') {
      const homeUrl = new URL('/', request.url);
      return NextResponse.redirect(homeUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};
