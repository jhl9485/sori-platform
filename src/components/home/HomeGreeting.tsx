"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { useProfile } from "@/lib/profile";

export default function HomeGreeting() {
  const { isAuthed, hydrated } = useAuth();
  const { profile } = useProfile();
  const authed = hydrated && isAuthed;

  return (
    <div className="px-4 md:px-6 pt-3 md:pt-1">
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="text-[1.05rem] font-bold truncate" suppressHydrationWarning>
            {authed ? `안녕하세요, ${profile.name}님 👋` : "SORI에 오신 걸 환영해요 👋"}
          </div>
          <div className="text-[0.75rem] text-[#888070] mt-[1px]" suppressHydrationWarning>
            {authed ? "오늘도 좋은 하루 보내세요" : "싱가포르 한인 생활, 여기서 시작해요"}
          </div>
        </div>
        {hydrated && !isAuthed && (
          <Link
            href="/login"
            className="flex-shrink-0 bg-[#D04020] text-white text-[0.78rem] font-semibold px-3.5 py-2 rounded-[10px] hover:bg-[#B83818] transition-colors"
          >
            로그인
          </Link>
        )}
      </div>
    </div>
  );
}
