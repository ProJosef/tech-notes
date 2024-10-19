import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // Check if user is logged in
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // role-based permission checks
  const permission = token?.role === 'Admin' || token?.role === 'Manager';
  if (pathname.startsWith('/dash/users') && !permission) {
    return new NextResponse('Access denied: Only Admins or Managers can access this page.', { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dash/:path*'],
};
