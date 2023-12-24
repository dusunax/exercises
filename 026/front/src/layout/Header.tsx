"use client";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import ContentsArea from "./ContentsArea";

export default function Header({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header>
      <ContentsArea className="flex gap-8 h-10">
        {pathname !== "/" && (
          <button onClick={() => router.back()}>뒤로가기</button>
        )}
        {children}
      </ContentsArea>
    </header>
  );
}
