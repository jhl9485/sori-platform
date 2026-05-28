"use client";

import Link from "next/link";

export default function SearchBar() {
  return (
    <div className="px-4 py-3">
      <Link href="/search" className="flex items-center bg-white border border-black/[0.08] rounded-full px-4 py-[10px] hover:border-black/[0.15] transition-colors cursor-text">
        <span className="text-[0.9rem] text-[#888070] mr-2 leading-none flex-shrink-0">🔍</span>
        <span className="text-[0.85rem] text-[#888070]">맛집, 마사지, 부동산, 구인구직 검색...</span>
      </Link>
    </div>
  );
}
