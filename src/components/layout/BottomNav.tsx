"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NOTIFICATIONS } from "@/data/notifications";
import { useUnreadCount } from "@/lib/notifications";

const tabs = [
  { icon: "🏠", label: "홈",        href: "/" },
  { icon: "🏪", label: "업소록",    href: "/business" },
  { icon: "✏️", label: "글쓰기",    href: "/write" },
  { icon: "💬", label: "커뮤니티",  href: "/community" },
  { icon: "🤍", label: "MY",        href: "/my", isMy: true },
];

export default function BottomNav() {
  const pathname = usePathname();
  const unread = useUnreadCount(NOTIFICATIONS.map((n) => n.id));

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[64px] bg-white/95 backdrop-blur-md border-t border-black/[0.07] flex items-center z-50 px-2 pb-1">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href || (tab.href !== "/" && pathname?.startsWith(tab.href));
        const showBadge = tab.isMy && unread > 0;
        return (
          <Link
            key={tab.label}
            href={tab.href}
            className="flex-1 flex flex-col items-center gap-[3px] py-2 rounded-[10px] transition-colors relative hover:bg-[#F5F3EE]"
          >
            <span className="relative">
              <span className={`text-[1.25rem] leading-none transition-transform inline-block ${isActive ? "scale-110" : ""}`}>
                {tab.icon}
              </span>
              {showBadge && (
                <span className="absolute -top-1 -right-2 min-w-[14px] h-[14px] bg-[#D04020] text-white text-[0.55rem] font-bold rounded-full px-1 flex items-center justify-center leading-none">
                  {unread > 99 ? "99+" : unread}
                </span>
              )}
            </span>
            <span
              className={`text-[0.62rem] font-medium transition-colors ${
                isActive ? "text-[#D04020] font-bold" : "text-[#888070]"
              }`}
            >
              {tab.label}
            </span>
            {isActive && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#D04020]" />
            )}
          </Link>
        );
      })}
    </div>
  );
}
