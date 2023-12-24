import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-20 flex flex-col gap-8 items-center">
      <Image
        className={`dark:bg-black md:justify-normal relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert grid-cols-4 md:grid-cols-3 lg:grid-cols-1`}
        src="/next.svg"
        alt="Next.js Logo"
        width={180}
        height={37}
        priority
      />
      <Link href={"/card"}>
        <Button type="primary">카드 만들기</Button>
      </Link>
    </div>
  );
}
