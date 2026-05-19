"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { icon: "🏠", label: "홈",        href: "/" },
  { icon: "🏪", label: "업소록",    href: "/business" },
  { icon: "✏️", label: "글쓰기",    href: "/write" },
  { icon: "💬", label: "커뮤니티",  href: "/community" },
  { icon: "🤍", label: "MY",        href: "/my" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[64px] bg-white/95 backdrop-blur-md border-t border-black/[0.07] flex items-center z-50 px-2 pb-1">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.label}
            href={tab.href}
            className="flex-1 flex flex-col items-center gap-[3px] py-2 rounded-[10px] transition-colors relative hover:bg-[#F5F3EE]"
          >
            <span className={`text-[1.25rem] transition-transform ${isActive ? "scale-110" : ""}`}>
              {tab.icon}
            </span>
            <span className={`text-[0.62rem] font-medium transition-colors ${isActive ? "text-[#D04020] font-bold" : "text-[#888070]"}`}>
              {tab.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
