import Link from "next/link";
import { FeedAndDate } from "~/data/feeds";

export default function Header({
  firstFeed,
  secondFeed,
}: {
  firstFeed?: FeedAndDate;
  secondFeed?: FeedAndDate;
}) {
  return (
    <header className="w-full items-center justify-between bg-purple-900 px-4 shadow-sm md:flex md:h-16">
      <Link href="/" className="text-xl font-bold text-white md:text-4xl">
        <h1>What the Bus?</h1>
      </Link>
    </header>
  );
}
