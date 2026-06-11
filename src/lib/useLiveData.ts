"use client";

import { useEffect, useState } from "react";

export interface LiveData {
  fx?: number;        // SGD → KRW
  fxLoaded: boolean;
  temp?: number;      // 싱가포르 °C
  humidity?: number;  // %
  weatherLoaded: boolean;
  updatedAt?: Date;
}

/**
 * 실시간 환율(SGD→KRW)과 싱가포르 날씨를 불러오는 공용 훅.
 * - 환율: open.er-api.com (메인) → frankfurter.dev (폴백). CORS OK, 무료, 키 불필요.
 * - 날씨: open-meteo.com. CORS OK, 무료, 키 불필요.
 * - 10분마다 자동 갱신.
 *
 * 모바일 LiveBar와 데스크탑 우측 패널이 동일한 값을 표시하도록 단일 진실원천으로 사용.
 */
export function useLiveData(): LiveData {
  const [data, setData] = useState<LiveData>({ fxLoaded: false, weatherLoaded: false });

  useEffect(() => {
    let cancelled = false;

    const loadFx = async () => {
      const apply = (krw: number) => {
        if (cancelled) return;
        setData((d) => ({ ...d, fx: Math.round(krw), fxLoaded: true, updatedAt: new Date() }));
      };
      try {
        const r = await fetch("https://open.er-api.com/v6/latest/SGD", { cache: "no-store" });
        if (r.ok) {
          const j = await r.json();
          if (j?.rates?.KRW) { apply(j.rates.KRW); return; }
        }
      } catch {}
      try {
        const r = await fetch("https://api.frankfurter.dev/v1/latest?from=SGD&to=KRW", { cache: "no-store" });
        if (r.ok) {
          const j = await r.json();
          if (j?.rates?.KRW) { apply(j.rates.KRW); return; }
        }
      } catch {}
      if (!cancelled) setData((d) => ({ ...d, fxLoaded: true }));
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

    const id = setInterval(() => { loadFx(); loadWeather(); }, 10 * 60 * 1000);

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return data;
}
