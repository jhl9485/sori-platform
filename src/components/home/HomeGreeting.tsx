"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { useProfile } from "@/lib/profile";

const ONBOARD_KEY = "sori_onboarded";

const QUICK_LINKS = [
  { href: "/news", label: "📰 뉴스" },
  { href: "/community", label: "💬 커뮤니티" },
  { href: "/business", label: "🏪 업소록" },
  { href: "/jobs", label: "💼 구인구직" },
];

export default function HomeGreeting() {
  const { isAuthed, hydrated } = useAuth();
  const { profile } = useProfile();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(ONBOARD_KEY)) setShowWelcome(true);
    } catch {
      /* ignore */
    }
  }, []);

  const dismissWelcome = () => {
    setShowWelcome(false);
    try {
      localStorage.setItem(ONBOARD_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  const authed = hydrated && isAuthed;

  return (
    <div className="px-4 md:px-6 pt-3 md:pt-1">
      {/* 인사 */}
      <div className="flex items-center justify-between gap-2 mb-3">
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

      {/* 첫 방문 온보딩 */}
      {showWelcome && (
        <div className="relative mb-3 bg-[#131211] text-white rounded-[16px] p-4 overflow-hidden">
          <button
            onClick={dismissWelcome}
            aria-label="온보딩 닫기"
            className="absolute top-2.5 right-3 text-white/50 hover:text-white text-base leading-none"
          >
            ✕
          </button>
          <div className="text-[0.95rem] font-bold mb-1">SORI가 처음이신가요? 👋</div>
          <p className="text-[0.78rem] text-white/70 leading-relaxed mb-3 pr-4">
            싱가포르 한인을 위한 <b className="text-white">뉴스·커뮤니티·업소·부동산·벼룩·구인구직</b>을 한 곳에 모았어요.
            아래로 둘러보거나, 관심 주제부터 골라보세요.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_LINKS.map((x) => (
              <Link
                key={x.href}
                href={x.href}
                onClick={dismissWelcome}
                className="text-[0.75rem] bg-white/10 hover:bg-white/15 rounded-full px-3 py-1.5 transition-colors"
              >
                {x.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
