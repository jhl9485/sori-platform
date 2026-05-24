"use client";

import Link from "next/link";
import { NOTIFICATIONS } from "@/data/notifications";
import { useUnreadCount } from "@/lib/notifications";

export default function TopNav() {
  const unread = useUnreadCount(NOTIFICATIONS.map((n) => n.id));

  return (
    <div className="bg-[rgba(245,243,238,0.95)] backdrop-blur-md border-b border-black/[0.07] px-4 h-[56px] flex items-center justify-between">
      <Link href="/" className="font-extrabold text-[1.4rem] tracking-tight text-[#181614]" style={{ fontFamily: "'Syne', sans-serif" }}>
        SO<span className="text-[#D04020]">RI</span>
      </Link>
      <div className="text-[0.72rem] text-[#888070]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>싱가포르 🇸🇬</div>
      <div className="flex gap-2">
        <Link href="/search" aria-label="검색" className="w-8 h-8 rounded-[8px] border border-black/[0.08] bg-white flex items-center justify-center text-sm hover:bg-[#F5F3EE] transition-colors">
          🔍
        </Link>
        <Link href="/notifications" aria-label={`알림 ${unread > 0 ? `${unread}개` : ""}`} className="w-8 h-8 rounded-[8px] border border-black/[0.08] bg-white flex items-center justify-center text-sm hover:bg-[#F5F3EE] transition-colors relative">
          🔔
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] bg-[#D04020] text-white text-[0.6rem] font-bold rounded-full px-1 flex items-center justify-center leading-none">
              {unread > 99 ? "99+" : unread}
            </span>
          )}
        </Link>
        <Link href="/my" aria-label="마이페이지" className="w-8 h-8 rounded-[8px] border border-black/[0.08] bg-white flex items-center justify-center text-sm hover:bg-[#F5F3EE] transition-colors">
          🤍
        </Link>
      </div>
    </div>
  );
}
