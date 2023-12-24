import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import ContentsArea from "@/layout/ContentsArea";
import Header from "@/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "2024 💌",
  description: "카드 만들기!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <div id="portal" />
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
    </html>
  );
}
