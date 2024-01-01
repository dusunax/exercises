import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import ContentsArea from "@/layout/ContentsArea";
import Header from "@/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "🐉 2024 신년 카드 만들기",
  description: "hello, 2024!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css"
        />
      </head>
      <body
        className={`${
          (inter.className, "justify-center")
        } min-h-screen flex flex-col`}
      >
        <Header />
        <div className="flex-1 flex flex-col items-center gap-8 bg-primary-100">
          <ContentsArea>{children}</ContentsArea>
        </div>
      </body>
      <div id="portal" />
    </html>
  );
}
