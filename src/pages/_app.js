import Header from "@/components/header";
import "@/styles/globals.css";
import { SessionProvider, signIn, signOut } from "next-auth/react"
import Link from "next/link";


export default function App({ 
  Component,
   pageProps: { session, ...pageProps}
   }) {
  return (
    <SessionProvider session={session}>
      <Header />
      <Component {...pageProps} />
      </SessionProvider>
  );
}
