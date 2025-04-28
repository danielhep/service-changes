"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="w-full items-center justify-between bg-purple-900 px-4 shadow-sm md:flex md:h-16">
      <Link href="/" className="text-xl font-bold text-white md:text-4xl flex gap-3 items-center">
        {pathname !== "/" && <ArrowLeft size={24} strokeWidth={3}/>}
        <h1>Service Change Analyzer</h1>
      </Link>
    </header>
  );
}
