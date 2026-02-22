// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google Fonts Montserrat */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
         <link rel="icon" href="/icon.png" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <title>Mon App</title>
      </Head>
      <body className="antialiased font-montserrat">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
