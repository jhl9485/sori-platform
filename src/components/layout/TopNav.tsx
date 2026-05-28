"use client";

import { useState } from "react";
import Link from "next/link";
import { NOTIFICATIONS } from "@/data/notifications";
import { useUnreadCount } from "@/lib/notifications";
import MobileDrawer from "./MobileDrawer";

export default function TopNav() {
  const unread = useUnreadCount(NOTIFICATIONS.map((n) => n.id));
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <div className="bg-[rgba(245,243,238,0.95)] backdrop-blur-md border-b border-black/[0.07] px-3 h-[56px] flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="전체 메뉴 열기"
            className="w-9 h-9 rounded-[8px] flex items-center justify-center hover:bg-black/[0.06] active:scale-90 transition-all"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#181614" strokeWidth="2.2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <Link
            href="/"
            className="font-extrabold text-[1.3rem] tracking-tight text-[#181614] leading-none px-1"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            SO<span className="text-[#D04020]">RI</span>
          </Link>
        </div>

        <div className="flex gap-2">
          <Link
            href="/search"
            aria-label="검색"
            className="w-8 h-8 rounded-[8px] border border-black/[0.08] bg-white flex items-center justify-center text-sm leading-none hover:bg-[#F5F3EE] transition-colors"
          >
            🔍
          </Link>
          <Link
            href="/notifications"
            aria-label={`알림 ${unread > 0 ? `${unread}개` : ""}`}
            className="w-8 h-8 rounded-[8px] border border-black/[0.08] bg-white flex items-center justify-center text-sm leading-none hover:bg-[#F5F3EE] transition-colors relative"
          >
            🔔
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] bg-[#D04020] text-white text-[0.6rem] font-bold rounded-full px-1 flex items-center justify-center leading-none">
                {unread > 99 ? "99+" : unread}
              </span>
            )}
          </Link>
          <Link
            href="/my"
            aria-label="마이페이지"
            className="w-8 h-8 rounded-[8px] border border-black/[0.08] bg-white flex items-center justify-center text-sm leading-none hover:bg-[#F5F3EE] transition-colors"
          >
            🤍
          </Link>
        </div>
      </div>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
