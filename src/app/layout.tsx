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
      <AptabaseProvider appKey="A-SH-2055091501">
        <NextIntlClientProvider messages={await getMessages()}>
            {children}
        </NextIntlClientProvider>
      </AptabaseProvider>
      </body>
      </html>
  );
}
