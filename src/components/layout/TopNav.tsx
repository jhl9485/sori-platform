"use client";

import { useState } from "react";
import Link from "next/link";
import { useUnreadCount } from "@/lib/notifications";
import { useLiveNotifications } from "@/lib/liveNotifications";
import MobileDrawer from "./MobileDrawer";

export default function TopNav() {
  const unread = useUnreadCount(useLiveNotifications().map((n) => n.id));
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

        {/* 아이콘 3개는 보이는 상자를 32×32 그대로 두고 before: 투명 덧판으로 누를 범위만 40×44로 넓힌다.
            상자 자체를 키우면 흰 테두리 상자가 눈에 띄게 커져 상단바 모양이 바뀐다.
            가로를 44가 아니라 40으로 잡은 이유: 상자 32 + 간격 8이라 중심 간 거리가 40이다.
            44로 잡으면 옆 아이콘의 범위와 4px씩 겹쳐 🔔을 누르려다 🤍이 눌릴 수 있다. */}
        <div className="flex gap-2">
          <Link
            href="/search"
            aria-label="검색"
            className="relative w-8 h-8 rounded-[8px] border border-black/[0.08] bg-white flex items-center justify-center text-sm leading-none hover:bg-[#F5F3EE] transition-colors before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-10 before:h-11 before:content-['']"
          >
            🔍
          </Link>
          <Link
            href="/notifications"
            aria-label={`알림 ${unread > 0 ? `${unread}개` : ""}`}
            className="w-8 h-8 rounded-[8px] border border-black/[0.08] bg-white flex items-center justify-center text-sm leading-none hover:bg-[#F5F3EE] transition-colors relative before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-10 before:h-11 before:content-['']"
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
            className="relative w-8 h-8 rounded-[8px] border border-black/[0.08] bg-white flex items-center justify-center text-sm leading-none hover:bg-[#F5F3EE] transition-colors before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-10 before:h-11 before:content-['']"
          >
            🤍
          </Link>
        </div>
      </div>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
