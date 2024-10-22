import { KVNamespace } from '@cloudflare/workers-types';

declare global {
  interface CloudflareEnv {
    URLS: KVNamespace;
  }
}
