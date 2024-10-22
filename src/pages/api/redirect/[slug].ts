import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export default async function handler(req: NextRequest) {
  const slug = req.nextUrl.pathname.split('/').pop() || '';
  console.log(`Redirect API called for slug: ${slug}`);

  try {
    const requestContext = getRequestContext();
    const myKv = requestContext.env.URLS;
    if (!myKv) {
      console.error('KV Namespace URLS is not bound');
      return NextResponse.redirect(new URL('/', req.url));
    }

    const longUrl = await myKv.get(slug);
    console.log(`Slug: ${slug}, LongURL: ${longUrl}`);

    if (longUrl) {
      console.log(`Redirecting to: ${longUrl}`);
      return NextResponse.redirect(longUrl);
    } else {
      console.log(`No URL found for slug: ${slug}`);
      return NextResponse.redirect(new URL('/', req.url));
    }
  } catch (error) {
    console.error('Error redirecting:', error);
    return NextResponse.redirect(new URL('/', req.url));
  }
}
