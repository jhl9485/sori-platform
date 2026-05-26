import Link from "next/link";

const widgets = [
  {
    href: "/community",
    bg: "bg-[#EBF0FB]",
    label: "SGD → KRW",
    value: "₩1,048",
    sub: "+2원",
    pulse: true,
  },
  {
    href: "/news",
    bg: "bg-[#FBF5E8]",
    label: "싱가포르",
    value: "34°C",
    sub: "습도 78%",
  },
  {
    href: "/news",
    bg: "bg-[#EBF5F0]",
    label: "MRT",
    value: "정상운행",
    sub: "전 노선",
  },
  {
    href: "/community",
    bg: "bg-[#FBF0EC]",
    label: "한인회",
    value: "6월 행사",
    sub: "D-12",
  },
  {
    href: "/jobs",
    bg: "bg-[#F5F0FF]",
    label: "EP 최저",
    value: "$6,000",
    sub: "2026 기준",
  },
];

export default function LiveBar() {
  return (
    <div className="px-4 pb-3 -mx-1 flex gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
      {widgets.map((w, i) => (
        <Link
          key={i}
          href={w.href}
          className={`flex-shrink-0 snap-start ${w.bg} rounded-[12px] px-3 py-2 min-w-[120px] hover:scale-[1.02] active:scale-95 transition-transform relative`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[0.62rem] text-[#888070] font-medium tracking-tight">{w.label}</span>
            {w.pulse && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#2B7A50] animate-pulse-dot" />
            )}
          </div>
          <div className="text-[0.92rem] font-bold text-[#181614] mt-[1px] leading-tight">{w.value}</div>
          <div className="text-[0.62rem] text-[#888070] mt-[1px]">{w.sub}</div>
        </Link>
      ))}
    </div>
  );
}
