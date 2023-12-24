import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-10">
      <Image
        className={`dark:bg-black md:justify-normal relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert grid-cols-4 md:grid-cols-3 lg:grid-cols-1`}
        src="/next.svg"
        alt="Next.js Logo"
        width={180}
        height={37}
        priority
      />
      <Link href={"/card"} className="mx-4 my-2 border">
        카드 만들기
      </Link>
    </div>
  );
}
