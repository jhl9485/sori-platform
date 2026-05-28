"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NOTIFICATIONS } from "@/data/notifications";
import { useUnreadCount } from "@/lib/notifications";
import { useFavorites } from "@/lib/favorites";

export default function BottomNav() {
  const pathname = usePathname();
  const unread = useUnreadCount(NOTIFICATIONS.map((n) => n.id));
  const { favItems } = useFavorites();

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname?.startsWith(href));

  // 가로 슬라이드 항목: 홈 + 즐겨찾기(중복 제거)
  const scrollItems = [
    { id: "home", icon: "🏠", label: "홈", href: "/" },
    ...favItems.filter((f) => f.href !== "/"),
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/97 backdrop-blur-md border-t border-black/[0.07] z-50 flex items-stretch h-[64px] pb-[env(safe-area-inset-bottom)]">
      {/* 가로 스크롤 즐겨찾기 영역 */}
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

      {/* 글쓰기 고정 버튼 (항상 우측) */}
      <Link
        href="/write"
        className="flex-shrink-0 w-[64px] flex flex-col items-center justify-center gap-[3px] border-l border-black/[0.05] bg-[#D04020] text-white active:bg-[#B83515] transition-colors"
        aria-label="글쓰기"
      >
        <span className="text-[1.2rem] leading-none">✏️</span>
        <span className="text-[0.6rem] font-bold">글쓰기</span>
      </Link>
    </div>
  );
}
