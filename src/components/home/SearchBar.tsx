"use client";

import Link from "next/link";

export default function SearchBar() {
  return (
    <div className="px-4 py-3 relative">
      <span className="absolute left-7 top-1/2 -translate-y-1/2 text-[0.9rem] text-[#888070] pointer-events-none">🔍</span>
      <Link href="/search" className="block w-full bg-white border border-black/[0.08] rounded-full py-[10px] pl-10 pr-4 text-[0.85rem] text-[#888070] font-[inherit] hover:border-black/[0.15] transition-colors cursor-text">
        맛집, 마사지, 부동산, 구인구직 검색...
      </Link>
    </div>
  );
}
