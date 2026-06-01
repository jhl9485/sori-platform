"use client";

import { useEffect, useState } from "react";

interface LiveData {
  fx?: number;       // SGD → KRW
  fxLoaded: boolean;
  temp?: number;     // 싱가포르 °C
  humidity?: number; // %
  weatherLoaded: boolean;
  updatedAt?: Date;
}

// 외부 API:
// - 환율: Frankfurter (ECB 기반, CORS OK, 무료, API 키 불필요)
// - 날씨: Open-Meteo (CORS OK, 무료, API 키 불필요)
// MRT는 실시간 공개 API 없어 "정상 운행" 기본값 (LTA DataMall은 인증 키 필요)
export default function LiveBar() {
  const [data, setData] = useState<LiveData>({ fxLoaded: false, weatherLoaded: false });

  useEffect(() => {
    let cancelled = false;

    const loadFx = async () => {
      try {
        const r = await fetch("https://api.frankfurter.app/latest?from=SGD&to=KRW", { cache: "no-store" });
        if (!r.ok) return;
        const j = await r.json();
        if (cancelled || !j?.rates?.KRW) return;
        setData((d) => ({ ...d, fx: Math.round(j.rates.KRW), fxLoaded: true, updatedAt: new Date() }));
      } catch {
        if (!cancelled) setData((d) => ({ ...d, fxLoaded: true }));
      }
    };

    const loadWeather = async () => {
      try {
        const r = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=1.3521&longitude=103.8198&current=temperature_2m,relative_humidity_2m&timezone=Asia%2FSingapore",
          { cache: "no-store" }
        );
        if (!r.ok) return;
        const j = await r.json();
        if (cancelled || !j?.current) return;
        setData((d) => ({
          ...d,
          temp: Math.round(j.current.temperature_2m),
          humidity: Math.round(j.current.relative_humidity_2m),
          weatherLoaded: true,
          updatedAt: new Date(),
        }));
      } catch {
        if (!cancelled) setData((d) => ({ ...d, weatherLoaded: true }));
      }
    };

    loadFx();
    loadWeather();

    // 10분마다 갱신
    const id = setInterval(() => {
      loadFx();
      loadWeather();
    }, 10 * 60 * 1000);

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

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
