"use client";

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
  { icon: "💬", label: "내 댓글",    href: "/my?tab=comments" },
  { icon: "🔖", label: "저장한 글",  href: "/my?tab=saved" },
];

export default function DesktopSidebar() {
  const pathname = usePathname();
  const unread = useUnreadCount(NOTIFICATIONS.map((n) => n.id));
  const { profile } = useProfile();

  return (
    <aside className="fixed top-0 left-0 h-screen w-[240px] bg-[#131211] flex flex-col z-50 select-none">
      {/* 로고 */}
      <Link href="/" className="flex items-center gap-3 px-6 pt-7 pb-6 group">
        <div
          className="text-[1.6rem] font-extrabold tracking-tight text-white leading-none"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          SO<span className="text-[#D04020]">RI</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[0.6rem] text-white/25 leading-none" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            싱가포르 🇸🇬
          </span>
          <span className="text-[0.58rem] text-white/20 mt-[3px]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            한인 커뮤니티
          </span>
        </div>
      </Link>

      {/* 구분선 */}
      <div className="h-px bg-white/[0.06] mx-4 mb-3" />

      {/* 메인 네비게이션 */}
      <nav className="flex-1 px-3 py-1 flex flex-col gap-[2px]">
        {NAV.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-[9px] rounded-[10px] transition-all duration-150 group ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/45 hover:text-white/80 hover:bg-white/[0.05]"
              }`}
            >
              <span className={`text-[1.05rem] flex-shrink-0 transition-transform duration-150 ${isActive ? "" : "group-hover:scale-110"}`}>
                {item.icon}
              </span>
              <span className={`text-[0.85rem] font-medium tracking-tight ${isActive ? "text-white" : ""}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#D04020] flex-shrink-0" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* 알림 + 글쓰기 CTA */}
      <div className="px-3 pb-3 flex flex-col gap-2">
        <Link
          href="/notifications"
          className={`flex items-center gap-3 px-3 py-[9px] rounded-[10px] transition-all duration-150 group relative ${
            pathname === "/notifications"
              ? "bg-white/10 text-white"
              : "text-white/45 hover:text-white/80 hover:bg-white/[0.05]"
          }`}
        >
          <span className="text-[1.05rem] flex-shrink-0 relative">
            🔔
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[14px] h-[14px] bg-[#D04020] text-white text-[0.55rem] font-bold rounded-full px-1 flex items-center justify-center leading-none">
                {unread > 99 ? "99+" : unread}
              </span>
            )}
          </span>
          <span className="text-[0.85rem] font-medium tracking-tight flex-1">알림</span>
          {unread > 0 && (
            <span className="text-[0.65rem] text-[#D04020] font-bold">
              {unread > 99 ? "99+" : unread}
            </span>
          )}
        </Link>
        <Link
          href="/write"
          className="flex items-center justify-center gap-2 w-full py-[10px] rounded-[10px] bg-[#D04020] text-white text-[0.85rem] font-bold hover:bg-[#B83515] transition-colors"
        >
          <span>✏️</span>
          <span>글쓰기</span>
        </Link>
      </div>

      {/* 구분선 */}
      <div className="h-px bg-white/[0.06] mx-4" />

      {/* MY 프로필 */}
      <div className="px-3 pt-3">
        <Link
          href="/my"
          className={`flex items-center gap-3 px-3 py-[9px] rounded-[10px] transition-all duration-150 ${
            pathname === "/my"
              ? "bg-white/10 text-white"
              : "text-white/45 hover:text-white/80 hover:bg-white/[0.05]"
          }`}
        >
          <div className="w-7 h-7 rounded-full bg-[#EBF0FB] flex items-center justify-center text-[0.8rem] font-bold text-[#2050A0] flex-shrink-0">
            {profile.avatarChar}
          </div>
          <div className="flex flex-col">
            <span className="text-[0.82rem] font-medium text-white/70">{profile.name}</span>
            <span className="text-[0.65rem] text-white/30">{profile.visa} {profile.yearsInSG}</span>
          </div>
        </Link>
      </div>

      {/* MY 빠른 액션 */}
      <div className="px-4 pb-4 pt-2 grid grid-cols-3 gap-1">
        {MY_ACTIONS.map((act) => (
          <Link
            key={act.label}
            href={act.href}
            className="flex flex-col items-center gap-[3px] py-2 rounded-[8px] hover:bg-white/[0.05] transition-colors group"
          >
            <span className="text-[0.95rem]">{act.icon}</span>
            <span className="text-[0.6rem] text-white/45 group-hover:text-white/80 text-center leading-tight">
              {act.label}
            </span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
