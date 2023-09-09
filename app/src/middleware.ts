import { NextRequest, NextResponse } from 'next/server';

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('SinalizaAi.token')?.value;

  const signinURL = new URL('/signin', request.url);
  const dashboardURL = new URL('/user/dashboard', request.url);

  if (!token) {
    if (request.nextUrl.pathname === '/signin') {
      return NextResponse.next();
    }
    return NextResponse.redirect(signinURL);
  }

  if (request.nextUrl.pathname === '/signin') {
    return NextResponse.redirect(dashboardURL);
  }
}

export const config = {
  matcher: ['/signin', '/user/:path*']
};
