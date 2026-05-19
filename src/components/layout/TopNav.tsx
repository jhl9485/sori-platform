"use client";

import Link from "next/link";

export default function TopNav() {
  return (
    <div className="bg-[rgba(245,243,238,0.95)] backdrop-blur-md border-b border-black/[0.07] px-4 h-[56px] flex items-center justify-between">
      <Link href="/" className="font-extrabold text-[1.4rem] tracking-tight text-[#181614]" style={{ fontFamily: "'Syne', sans-serif" }}>
        SO<span className="text-[#D04020]">RI</span>
      </Link>
      <div className="text-[0.72rem] text-[#888070]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>싱가포르 🇸🇬</div>
      <div className="flex gap-2">
        <button className="w-8 h-8 rounded-[8px] border border-black/[0.08] bg-white flex items-center justify-center text-sm hover:bg-[#F5F3EE] transition-colors relative">
          🔔
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#D04020] rounded-full" />
        </button>
        <Link href="/my" className="w-8 h-8 rounded-[8px] border border-black/[0.08] bg-white flex items-center justify-center text-sm hover:bg-[#F5F3EE] transition-colors">
          🤍
        </Link>
      </div>
    </div>
  );
}
