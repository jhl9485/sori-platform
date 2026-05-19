import Link from "next/link";

const items = [
  { icon: "🏪", label: "업소록",   href: "/business", color: "bg-[#FBF0EC]" },
  { icon: "💼", label: "구인구직", href: "/jobs",     color: "bg-[#EBF5F0]" },
  { icon: "📰", label: "뉴스",     href: "/news",     color: "bg-[#EBF0FB]" },
  { icon: "🛍️", label: "벼룩시장", href: "/flea",     color: "bg-[#FBF5E8]" },
  { icon: "❓", label: "Q&A",      href: "/community",color: "bg-[#FBF0EC]" },
  { icon: "💬", label: "커뮤니티", href: "/community",color: "bg-[#F0EDE8]" },
  { icon: "📋", label: "비자정보", href: "/community",color: "bg-[#EBF0FB]" },
  { icon: "🤍", label: "MY",       href: "/my",       color: "bg-[#F5F0FF]" },
];

export default function QuickGrid() {
  return (
    <div className="grid grid-cols-4 gap-2 px-4 pb-5">
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="flex flex-col items-center gap-[6px] cursor-pointer group"
        >
          <div className={`w-[52px] h-[52px] rounded-2xl flex items-center justify-center text-[1.4rem] transition-transform group-hover:scale-105 border border-transparent ${item.color}`}>
            {item.icon}
          </div>
          <span className="text-[0.72rem] text-[#181614] font-medium text-center leading-tight">
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
