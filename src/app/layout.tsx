import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import {NextIntlClientProvider} from "next-intl";
import {getLocale, getMessages} from "next-intl/server";

const inter = Prompt({ subsets: ["latin"], weight: ["100", "200", '300', '400', '500', '600', '700'], variable: '--font-prompt' });

export const metadata: Metadata = {
  title: "SANS Nicolas - Portfolio",
  description: "",
    icons: {
      icon: '/favicon.ico'
    }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
      <html lang={await getLocale()}>
          <body className={`${inter.className} bg-white-pastel dark:bg-dark`}>
              <NextIntlClientProvider messages={await getMessages()}>
                  {children}
              </NextIntlClientProvider>
          </body>
      </html>
  );
}
