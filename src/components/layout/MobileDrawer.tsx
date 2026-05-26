"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NOTIFICATIONS } from "@/data/notifications";
import { useUnreadCount } from "@/lib/notifications";
import { useProfile } from "@/lib/profile";

const NAV = [
  { icon: "🏠", label: "홈",         href: "/" },
  { icon: "📰", label: "Daily 뉴스", href: "/news" },
  { icon: "🏪", label: "한인업소록",  href: "/business" },
  { icon: "🏘️", label: "부동산",     href: "/realty" },
  { icon: "🛍️", label: "벼룩시장",   href: "/flea" },
  { icon: "💼", label: "구인구직",   href: "/jobs" },
  { icon: "💬", label: "커뮤니티",   href: "/community" },
];

const MY_ACTIONS = [
  { icon: "📝", label: "내가 쓴 글", href: "/my?tab=posts" },
  { icon: "💬", label: "내 댓글",    href: "/my?tab=overview" },
  { icon: "🔖", label: "저장한 글",  href: "/my?tab=saved" },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ open, onClose }: Props) {
  const pathname = usePathname();
  const unread = useUnreadCount(NOTIFICATIONS.map((n) => n.id));
  const { profile } = useProfile();

  // 라우트가 바뀌면 자동으로 닫힘
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // ESC 키로 닫기
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <>
      {/* 백드롭 */}
      <div
        onClick={onClose}
        className={`md:hidden fixed inset-0 bg-black/60 z-[90] transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-hidden="true"
      />

      {/* 드로어 */}
      <aside
        className={`md:hidden fixed top-0 left-0 h-full w-[280px] bg-[#131211] z-[95] flex flex-col transition-transform duration-200 ease-out ${open ? "translate-x-0" : "-translate-x-full"}`}
        role="dialog"
        aria-modal="true"
        aria-label="전체 메뉴"
      >
        {/* 로고 + 닫기 */}
        <div className="flex items-center justify-between px-5 pt-6 pb-4">
          <Link href="/" className="flex items-center gap-2" onClick={onClose}>
            <div
              className="text-[1.5rem] font-extrabold text-white leading-none"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              SO<span className="text-[#D04020]">RI</span>
            </div>
            <span className="text-[0.6rem] text-white/30" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              SG
            </span>
          </Link>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 text-white text-base flex items-center justify-center hover:bg-white/15 transition-colors leading-none"
            aria-label="메뉴 닫기"
          >
            ✕
          </button>
        </div>

        <div className="h-px bg-white/[0.06] mx-4 mb-3" />

        {/* 네비게이션 */}
        <nav className="flex-1 overflow-y-auto px-3">
          <div className="flex flex-col gap-[2px]">
            {NAV.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-[10px] rounded-[10px] transition-all duration-150 ${
                    isActive ? "bg-white/10 text-white" : "text-white/55 hover:text-white/85 hover:bg-white/[0.05]"
                  }`}
                >
                  <span className="text-[1.1rem] flex-shrink-0 leading-none">{item.icon}</span>
                  <span className="text-[0.9rem] font-medium tracking-tight flex-1">{item.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#D04020]" />}
                </Link>
              );
            })}
          </div>

          <div className="h-px bg-white/[0.06] my-4" />

          {/* 알림 */}
          <Link
            href="/notifications"
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-[10px] rounded-[10px] transition-colors ${
              pathname === "/notifications" ? "bg-white/10 text-white" : "text-white/55 hover:text-white/85 hover:bg-white/[0.05]"
            }`}
          >
            <span className="text-[1.1rem] flex-shrink-0 leading-none relative">
              🔔
              {unread > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[14px] h-[14px] bg-[#D04020] text-white text-[0.55rem] font-bold rounded-full px-1 flex items-center justify-center leading-none">
                  {unread > 99 ? "99+" : unread}
                </span>
              )}
            </span>
            <span className="text-[0.9rem] font-medium tracking-tight flex-1">알림</span>
            {unread > 0 && (
              <span className="text-[0.7rem] text-[#D04020] font-bold">{unread > 99 ? "99+" : unread}</span>
            )}
          </Link>

          <Link
            href="/search"
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-[10px] rounded-[10px] transition-colors ${
              pathname === "/search" ? "bg-white/10 text-white" : "text-white/55 hover:text-white/85 hover:bg-white/[0.05]"
            }`}
          >
            <span className="text-[1.1rem] flex-shrink-0 leading-none">🔍</span>
            <span className="text-[0.9rem] font-medium tracking-tight">통합 검색</span>
          </Link>
        </nav>

        {/* 글쓰기 CTA */}
        <div className="px-4 pb-3">
          <Link
            href="/write"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-[10px] rounded-[10px] bg-[#D04020] text-white text-[0.88rem] font-bold hover:bg-[#B83515] transition-colors"
          >
            <span className="leading-none">✏️</span>
            <span>글쓰기</span>
          </Link>
        </div>

        <div className="h-px bg-white/[0.06] mx-4 mb-3" />

        {/* 프로필 */}
        <Link
          href="/my"
          onClick={onClose}
          className="flex items-center gap-3 mx-3 mb-2 px-3 py-[10px] rounded-[10px] hover:bg-white/[0.05] transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-[#EBF0FB] flex items-center justify-center text-[0.85rem] font-bold text-[#2050A0] flex-shrink-0">
            {profile.avatarChar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[0.85rem] font-medium text-white/85 truncate">{profile.name}</div>
            <div className="text-[0.65rem] text-white/35">{profile.visa} {profile.yearsInSG}</div>
          </div>
          <span className="text-white/30 text-sm">›</span>
        </Link>

        <div className="px-3 pb-5 grid grid-cols-3 gap-1">
          {MY_ACTIONS.map((act) => (
            <Link
              key={act.label}
              href={act.href}
              onClick={onClose}
              className="flex flex-col items-center gap-1 py-2 rounded-[8px] hover:bg-white/[0.05] transition-colors"
            >
              <span className="text-base leading-none">{act.icon}</span>
              <span className="text-[0.62rem] text-white/45 text-center">{act.label}</span>
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
}
