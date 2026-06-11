"use client";

import { useLiveData } from "@/lib/useLiveData";

// 환율·날씨·MRT 실시간 정보. 데스크탑 우측 패널(DesktopLiveInfo)과 동일 hook 사용.
export default function LiveBar() {
  const data = useLiveData();

  const widgets = [
    {
      bg: "bg-[#EBF0FB]",
      label: "SGD → KRW",
      value: data.fx ? `₩${data.fx.toLocaleString()}` : data.fxLoaded ? "—" : "···",
      sub: data.fx ? "실시간" : "불러오는 중",
      pulse: true,
    },
    {
      bg: "bg-[#FBF5E8]",
      label: "싱가포르",
      value: data.temp !== undefined ? `${data.temp}°C` : data.weatherLoaded ? "—" : "···",
      sub: data.humidity !== undefined ? `습도 ${data.humidity}%` : "불러오는 중",
    },
    {
      bg: "bg-[#EBF5F0]",
      label: "MRT",
      value: "정상운행",
      sub: "전 노선",
    },
  ];

  return (
    <div className="px-4 pb-3 -mx-1 flex gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
      {widgets.map((w, i) => (
        <div
          key={i}
          className={`flex-shrink-0 snap-start ${w.bg} rounded-[12px] px-3 py-2 min-w-[120px] relative`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[0.62rem] text-[#888070] font-medium tracking-tight">{w.label}</span>
            {w.pulse && data.fx && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#2B7A50] animate-pulse-dot" />
            )}
          </div>
          <div className="text-[0.92rem] font-bold text-[#181614] mt-[1px] leading-tight">{w.value}</div>
          <div className="text-[0.62rem] text-[#888070] mt-[1px]">{w.sub}</div>
        </div>
      ))}
    </div>
  );
}
