import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: '/:slug*',
};

export async function middleware(request: NextRequest) {
  const slug = request.nextUrl.pathname.slice(1);

  console.log(`Middleware called for slug: ${slug}`);

  // Skip middleware for API routes, static files, and the homepage
  if (slug.startsWith('api/') || slug.includes('.') || slug === '') {
    console.log('Skipping middleware');
    return NextResponse.next();
  }

  console.log('Proceeding with middleware');

  // We'll let the API handle the redirection
  return NextResponse.next();
}
