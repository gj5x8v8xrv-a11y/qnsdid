import "./globals.css";

import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import type { ReactNode } from "react";

import { buildRootMetadata } from "@/lib/seo";

const bodyFont = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "700", "800"]
});

export const metadata: Metadata = buildRootMetadata();

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={bodyFont.variable}>
        {children}
      </body>
    </html>
  );
}
