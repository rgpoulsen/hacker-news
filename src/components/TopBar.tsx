import Image from "next/image";
import Link from "next/link";

export const TopBar = () => {
  return (
    <div className="bg-orange-500 text-white p-4 flex justify-between items-center">
      <div className="max-w-3xl mx-auto w-full">
        {" "}
        <Link href="/" className="flex items-center">
          <Image
            src="https://news.ycombinator.com/y18.svg"
            alt="Hacker News Logo"
            width={32}
            height={32}
            className="inline-block mr-4 border-white border-2"
          />
          <h1 className="text-2xl font-bold">Hacker News</h1>
        </Link>
      </div>
    </div>
  );
};
