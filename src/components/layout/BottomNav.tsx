"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { NOTIFICATIONS } from "@/data/notifications";
import { useUnreadCount } from "@/lib/notifications";
import { useFavorites } from "@/lib/favorites";

function BottomNavInner() {
  const pathname = usePathname();
  const sp = useSearchParams();
  const currentCat = sp.get("cat");
  const unread = useUnreadCount(NOTIFICATIONS.map((n) => n.id));
  const { favItems } = useFavorites();

  // active 판단: pathname + ?cat= 쿼리까지 정확히 매칭
  const isActive = (href: string) => {
    // href 예: "/community?cat=love", "/community", "/realty"
    const [hPath, hQuery] = href.split("?");
    if (pathname !== hPath && !(hPath !== "/" && pathname?.startsWith(hPath))) return false;
    if (hQuery) {
      // 카테고리 항목은 정확히 그 cat일 때만 활성
      const wantCat = new URLSearchParams(hQuery).get("cat");
      return currentCat === wantCat;
    }
    // 쿼리 없는 메인 항목 (커뮤니티 메인)은 cat 쿼리가 없을 때만 활성
    if (hPath === "/community" && currentCat) return false;
    return true;
  };

  // 가로 슬라이드 항목: 홈 + 즐겨찾기(중복 제거)
  const scrollItems = [
    { id: "home", icon: "🏠", label: "홈", href: "/" },
    ...favItems.filter((f) => f.href !== "/"),
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/97 backdrop-blur-md border-t border-black/[0.07] z-50 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-stretch h-[64px]">
      {/* 가로 스크롤 즐겨찾기 영역 (글쓰기 버튼 제거됨) */}
      <div className="flex-1 flex items-center overflow-x-auto scrollbar-hide px-1">
        {scrollItems.map((tab) => {
          const active = isActive(tab.href);
          const showBadge = tab.id === "my" && unread > 0;
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className="flex-shrink-0 min-w-[60px] flex flex-col items-center gap-[3px] py-2 px-1 rounded-[10px] transition-colors relative hover:bg-[#F5F3EE]"
            >
              <span className="relative">
                <span className={`text-[1.2rem] leading-none inline-block transition-transform ${active ? "scale-110" : ""}`}>
                  {tab.icon}
                </span>
                {showBadge && (
                  <span className="absolute -top-1 -right-2 min-w-[14px] h-[14px] bg-[#D04020] text-white text-[0.55rem] font-bold rounded-full px-1 flex items-center justify-center leading-none">
                    {unread > 99 ? "99+" : unread}
                  </span>
                )}
              </span>
              <span className={`text-[0.6rem] font-medium whitespace-nowrap transition-colors ${active ? "text-[#D04020] font-bold" : "text-[#888070]"}`}>
                {tab.label}
              </span>
              {active && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#D04020]" />
              )}
            </Link>
          );
        })}
      </div>

      </div>
    </div>
  );
}

export default function BottomNav() {
  return (
    <Suspense fallback={null}>
      <BottomNavInner />
    </Suspense>
  );
}
