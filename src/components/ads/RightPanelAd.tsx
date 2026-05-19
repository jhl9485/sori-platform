"use client";

import { useState } from "react";

export default function RightPanelAd() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-br from-[#0A2240] to-[#1A4A8A] rounded-[14px] p-4 relative overflow-hidden">
      {/* 광고 라벨 */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-white/40 text-[0.58rem]"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          SPONSORED
        </span>
        <button
          onClick={() => setDismissed(true)}
          className="text-white/30 hover:text-white/60 transition-colors text-xs"
        >
          ✕
        </button>
      </div>

      {/* 배경 장식 */}
      <div className="absolute right-2 top-4 text-[3.5rem] opacity-10">✈️</div>

      {/* 광고 내용 */}
      <div className="relative">
        <div className="text-white font-bold text-[0.9rem] leading-tight mb-1">
          서울 직항<br/>지금 최저가로
        </div>
        <div className="text-white/60 text-[0.72rem] mb-3">
          대한항공 · 주 14회 운항<br/>마일리지 2배 적립 이벤트
        </div>
        <button className="w-full py-[8px] bg-white text-[#0A2240] rounded-[8px] text-[0.78rem] font-bold hover:bg-white/90 transition-colors">
          항공권 조회 →
        </button>
      </div>
    </div>
  );
}
