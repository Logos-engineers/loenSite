"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { site, nav } from "@/lib/site";

export default function SiteNav() {
  const pathname = usePathname();
  const [overHero, setOverHero] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // 홈에서는 Hero 스크롤 스토리(약 300vh, 끝 ≈ 200vh) 동안 투명 유지
      if (pathname === "/") {
        setOverHero(window.scrollY < window.innerHeight * 2);
      } else {
        setOverHero(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 z-30 w-full transition-colors duration-300 ${
        overHero
          ? "bg-transparent"
          : "border-b border-zinc-200 bg-white/80 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className={`font-semibold tracking-tight ${
            overHero ? "text-white" : "text-zinc-900"
          }`}
        >
          {site.name}
        </Link>
        <nav
          className={`flex items-center gap-6 text-sm ${
            overHero ? "text-zinc-200" : "text-zinc-600"
          }`}
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={overHero ? "hover:text-white" : "hover:text-zinc-900"}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
