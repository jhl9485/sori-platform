"use client";

import { useLiveData } from "@/lib/useLiveData";

/**
 * 데스크탑 우측 패널 안에 들어가는 "실시간 정보" 박스.
 * 환율/날씨를 실제 API에서 가져와 LiveBar와 동기화.
 */
export default function DesktopLiveInfo() {
  const data = useLiveData();

  const items = [
    {
      icon: "💱",
      label: "SGD → KRW",
      value: data.fx ? `₩${data.fx.toLocaleString()}` : data.fxLoaded ? "—" : "···",
      sub: data.fx ? "실시간" : "불러오는 중",
    },
    {
      icon: "🌤",
      label: "싱가포르",
      value: data.temp !== undefined ? `${data.temp}°C` : data.weatherLoaded ? "—" : "···",
      sub: data.humidity !== undefined ? `습도 ${data.humidity}%` : "불러오는 중",
    },
    {
      icon: "🚇",
      label: "MRT",
      value: "정상운행",
      sub: "전 노선",
    },
  ];

  return (
    <div className="bg-white rounded-[14px] border border-black/[0.08] p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[0.78rem] font-bold">실시간 정보</span>
        <span className="w-[6px] h-[6px] rounded-full bg-[#2B7A50] animate-pulse-dot flex-shrink-0" />
      </div>
      <div className="flex flex-col divide-y divide-black/[0.04]">
        {items.map((info) => (
          <div key={info.label} className="flex items-center gap-3 py-[9px] first:pt-0 last:pb-0">
            <span className="text-lg flex-shrink-0 w-6 text-center">{info.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="text-[0.7rem] text-[#888070]">{info.label}</div>
              <div className="text-[0.85rem] font-bold text-[#181614]">
                {info.value}
                <span className="text-[0.7rem] text-[#888070] font-normal ml-1">{info.sub}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
