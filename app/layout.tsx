import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const dm_sans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
      <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
      </Head>
      <body className={`${dm_sans.className}`}>{children}</body>
    </html>
  );
}
