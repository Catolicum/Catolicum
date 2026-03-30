import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1F3A5F" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Católicum" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        {/* Iconos */}
        <link rel="icon" type="image/png" sizes="512x512" href="/icons/icon-512.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}