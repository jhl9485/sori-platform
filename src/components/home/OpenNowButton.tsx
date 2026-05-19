"use client";

import Link from "next/link";

export default function OpenNowButton() {
  return (
    <Link
      href="/business"
      className="mx-4 md:mx-6 mb-5 bg-[#D04020] text-white rounded-[14px] px-5 py-4 flex items-center justify-between hover:bg-[#B83515] transition-colors group"
    >
      <div className="flex flex-col gap-[2px]">
        <span className="text-[0.7rem] opacity-70 font-normal">📍 내 주변에서</span>
        <span className="text-[0.95rem] font-bold tracking-tight">지금 열려있는 한인 업소</span>
      </div>
      <span className="bg-white/20 rounded-lg px-3 py-1 text-[0.82rem] font-semibold group-hover:bg-white/30 transition-colors">
        47곳 →
      </span>
    </Link>
  );
}
