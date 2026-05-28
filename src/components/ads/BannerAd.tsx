"use client";

import { useState } from "react";

const BANNER_ADS = [
  {
    bg: "from-[#0A2240] to-[#1A4A8A]",
    icon: "✈️",
    tag: "대한항공 공식 광고",
    title: "서울 직항, 지금 최저가로",
    sub: "싱가포르 → 인천 · 주 14회 운항 · 마일리지 적립",
    cta: "항공권 조회",
    ctaStyle: "bg-white text-[#0A2240]",
  },
  {
    bg: "from-[#6B2FA0] to-[#9B4DCA]",
    icon: "📱",
    tag: "SK텔레콤 국제로밍",
    title: "한국 방문 시 로밍 걱정 없이",
    sub: "T로밍 무제한 데이터 · 하루 $5.9부터",
    cta: "로밍 신청",
    ctaStyle: "bg-white text-[#6B2FA0]",
  },
  {
    bg: "from-[#7A3000] to-[#D04020]",
    icon: "🏠",
    tag: "코리아 부동산 공식 파트너",
    title: "싱가포르 내 집 마련, 지금이 기회",
    sub: "콘도 임대료 하락세 · 한국어 무료 상담",
    cta: "무료 상담",
    ctaStyle: "bg-white text-[#D04020]",
  },
];

export default function BannerAd({ index = 0 }: { index?: number }) {
  const [dismissed, setDismissed] = useState(false);
  const ad = BANNER_ADS[index % BANNER_ADS.length];

  if (dismissed) return null;

  return (
    <div className={`mx-4 md:mx-6 mb-5 bg-gradient-to-r ${ad.bg} rounded-[16px] p-5 relative overflow-hidden`}>
      {/* 광고 라벨 */}
      <div className="absolute top-3 right-10 text-white/40 text-[0.58rem]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        AD
      </div>
      <button
        onClick={() => setDismissed(true)}
        aria-label="광고 닫기"
        className="absolute top-1 right-1 w-8 h-8 flex items-center justify-center text-white/40 hover:text-white/80 active:scale-90 transition-all text-sm leading-none"
      >
        ✕
      </button>

      {/* 배경 장식 */}
      <div className="absolute right-0 top-0 bottom-0 w-24 opacity-10 flex items-center justify-center text-[5rem]">
        {ad.icon}
      </div>

      <div className="relative">
        <div
          className="text-white/50 text-[0.62rem] mb-1 tracking-widest uppercase"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          {ad.tag}
        </div>
        <div className="text-white font-bold text-[1rem] leading-tight mb-1">{ad.title}</div>
        <div className="text-white/60 text-[0.75rem] mb-4">{ad.sub}</div>
        <button className={`${ad.ctaStyle} rounded-[8px] px-4 py-[8px] text-[0.8rem] font-bold hover:opacity-90 transition-opacity`}>
          {ad.cta} →
        </button>
      </div>
    </div>
  );
}
