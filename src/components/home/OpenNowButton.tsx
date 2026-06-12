"use client";

import { useMemo } from "react";
import Link from "next/link";
import { BUSINESSES } from "@/data/businesses";
import { useUserBiz } from "@/lib/userContent";

export default function OpenNowButton() {
  const userBiz = useUserBiz();

  // 사용자 등록 업소 + 정적 데이터 합쳐서 영업중 개수 계산
  const openCount = useMemo(() => {
    const merged = [...userBiz, ...BUSINESSES];
    return merged.filter((b) => b.isOpen).length;
  }, [userBiz]);

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
        {openCount}곳 →
      </span>
    </Link>
  );
}
