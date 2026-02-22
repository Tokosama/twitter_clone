import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import TimeAgo from "javascript-time-ago";
import "@/lib/init";
import en from "javascript-time-ago/locale/en";
import Head from "next/head";

TimeAgo.addDefaultLocale(en);

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <Head>
       
      </Head>

      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}