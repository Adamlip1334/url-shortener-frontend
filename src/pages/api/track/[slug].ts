import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export default async function handler(req: NextRequest) {
  const slug = req.nextUrl.pathname.split('/').pop() || '';
  console.log(`Track API called for slug: ${slug}`);

  try {
    const requestContext = getRequestContext();
    const urlsKv = requestContext.env.URLS;
    const clicksKv = requestContext.env.URLS;

    if (!urlsKv || !clicksKv) {
      console.error('KV Namespaces are not bound correctly');
      return NextResponse.redirect(new URL('/', req.url));
    }

    const longUrl = await urlsKv.get(slug);
    if (!longUrl) {
      console.log(`No URL found for slug: ${slug}`);
      return NextResponse.redirect(new URL('/', req.url));
    }

    // Log click data
    const clickData = {
      timestamp: new Date().toISOString(),
      ip: req.ip,
      userAgent: req.headers.get('user-agent') || 'Unknown',
      referer: req.headers.get('referer') || 'Unknown',
    };

    await clicksKv.put(`${slug}:${Date.now()}`, JSON.stringify(clickData));

    console.log(`Click tracked for slug: ${slug}`);
    console.log(`Redirecting to: ${longUrl}`);

    return NextResponse.redirect(longUrl);
  } catch (error) {
    console.error('Error tracking click:', error);
    return NextResponse.redirect(new URL('/', req.url));
  }
}
