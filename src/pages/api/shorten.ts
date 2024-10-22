import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import '@/types/cloudflare';

// This makes the handler use the edge runtime, where Cloudflare KV can be accessed
export const runtime = 'edge';

export default async function handler(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }

  try {
    const { longUrl } = await req.json() as { longUrl: string };
    const slug = Math.random().toString(36).substring(2, 8);

    // get the environment from Cloudflare and access the KV binding
    const requestContext = getRequestContext();
    const myKv = requestContext.env.URLS;
    if (!myKv) {
      throw new Error('KV Namespace URLS is not bound');
    }

    // Store the slug and the URL in Cloudflare KV
    await myKv.put(slug, longUrl);

    // Build the short URL
    const baseUrl = process.env.BASE_URL || `https://${req.headers.get('host')}`;
    const shortUrl = `${baseUrl}/${slug}`;

    return NextResponse.json({ shortUrl }, { status: 200 });
  } catch (error) {
    console.error('Error shortening URL:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
