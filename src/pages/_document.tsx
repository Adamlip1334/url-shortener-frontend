import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:title" content="URL Shortener" />
        <meta property="og:description" content="Shorten your long URLs quickly and easily with our URL shortener service." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://adamlipson.xyz" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="URL Shortener" />
        <meta name="twitter:description" content="Shorten your long URLs quickly and easily with our URL shortener service." />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
