"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { icon: "🏠", label: "홈",        href: "/" },
  { icon: "🏪", label: "한인업소록", href: "/business" },
  { icon: "💼", label: "구인구직",   href: "/jobs" },
  { icon: "💬", label: "커뮤니티",   href: "/community" },
  { icon: "📰", label: "Daily 뉴스", href: "/news" },
  { icon: "🛍️", label: "벼룩시장",  href: "/flea" },
];

export default function DesktopSidebar() {
  const pathname = usePathname();

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

      {/* 글쓰기 CTA */}
      <div className="px-4 pb-4">
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

      {/* MY */}
      <div className="px-3 py-3">
        <Link
          href="/my"
          className={`flex items-center gap-3 px-3 py-[9px] rounded-[10px] transition-all duration-150 ${
            pathname === "/my"
              ? "bg-white/10 text-white"
              : "text-white/45 hover:text-white/80 hover:bg-white/[0.05]"
          }`}
        >
          <div className="w-7 h-7 rounded-full bg-[#EBF0FB] flex items-center justify-center text-[0.8rem] font-bold text-[#2050A0] flex-shrink-0">
            김
          </div>
          <div className="flex flex-col">
            <span className="text-[0.82rem] font-medium text-white/70">김싱가해</span>
            <span className="text-[0.65rem] text-white/30">EP 3년차</span>
          </div>
        </Link>
      </div>
    </aside>
  );
}
