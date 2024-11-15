import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import {NextIntlClientProvider} from "next-intl";
import {getLocale, getMessages} from "next-intl/server";
import { AptabaseProvider } from '@aptabase/react';

const inter = Prompt({ subsets: ["latin"], weight: ["100", "200", '300', '400', '500', '600', '700'], variable: '--font-prompt' });

export const metadata: Metadata = {
    title: "SANS Nicolas - Portfolio",
    description: "Développeur fullstack, mobile et Salesforce et DevOps spécialisé en React, Rust et NestJS",
    icons: {
      icon: '/favicon.ico'
    },
    metadataBase: new URL('https://nikho.dev'),
    keywords: ['Nikho', 'Portfolio SANS Nicolas', 'Nantes', 'Développeur fullstack', 'mobile', 'Salesforce', 'React', 'Rust', 'DevOps'],
    openGraph: {
        title: "SANS Nicolas - Portfolio",
        description: "Développeur fullstack, mobile et Salesforce spécialisé en React, Rust et DevOps",
        type: 'website',
        images: ['/pp.jpg'],
        siteName: 'SANS Nicolas - Portfolio',
    },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
      <html lang={await getLocale()}>
      <body className={`${inter.className} bg-white-pastel dark:bg-dark`}>
        <div className={"absolute w-full h-full -z-50"}>
          <div className={"relative rounded-lg bg-[#ececec] dark:bg-[#202020] dark:-bg m-auto rotate-45 w-20 h-20 left-[35%] mt-20 animate-rotate-infinite"}></div>
          <div className={"relative rounded-md bg-[#ececec] dark:bg-[#202020] m-auto mt-20 rotate-45 w-44 h-44 right-[40%] animate-rotate-infinite"}></div>
          <div className={"relative rounded-full bg-[#ececec] dark:bg-[#202020] m-auto mt-8 rotate-45 w-60 h-28 left-[40%] animate-rotate-infinite-slow"}></div>
          <div className={"relative rounded-md bg-[#ececec] dark:bg-[#202020] m-auto rotate-45 w-32 h-12 right-[40%] mt-40 animate-rotate-infinite-quick"}></div>
        </div>
        <AptabaseProvider appKey="A-SH-2910616357" options={{host: 'https://analytics.nikho.dev', isDebug: false, appVersion: 'v0.2.5'}}>
          <NextIntlClientProvider messages={await getMessages()}>
              {children}
          </NextIntlClientProvider>
        </AptabaseProvider>
      </body>
      </html>
  );
}
