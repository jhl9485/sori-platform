"use client";

import { useState } from "react";

export interface NativeAdProps {
  advertiserIcon: string;
  advertiserBg: string;
  advertiserName: string;
  headline: string;
  description: string;
  cta: string;
  tags: string[];
  type?: "feed" | "community";
}

const ADS: NativeAdProps[] = [
  {
    advertiserIcon: "⚖️",
    advertiserBg: "bg-[#EBF0FB]",
    advertiserName: "박앤리 이민법무법인",
    headline: "EP 비자 갱신, 혼자 하다 실수하셨나요?",
    description: "한국인 변호사 직접 상담. EP·S Pass·취업비자 전문. 첫 상담 무료. 싱가포르 거주 7년+ 한인 1,200명 성공 사례.",
    cta: "무료 상담 신청",
    tags: ["비자상담", "EP갱신", "이민법"],
  },
  {
    advertiserIcon: "📦",
    advertiserBg: "bg-[#FBF5E8]",
    advertiserName: "K-무빙 싱가포르",
    headline: "싱가포르 ↔ 한국 이사, 믿을 수 있는 곳",
    description: "한인 전문 국제이사 서비스. 포장부터 통관까지 원스톱. 15년 경력 · 한국어 상담 · 합리적 견적. 이번 달 예약 시 10% 할인.",
    cta: "견적 받기",
    tags: ["국제이사", "한국이사", "싱가포르이사"],
  },
  {
    advertiserIcon: "🏦",
    advertiserBg: "bg-[#EBF5F0]",
    advertiserName: "KEB 하나은행 싱가포르",
    headline: "한국으로 송금, 수수료 제로로 보내세요",
    description: "하나은행 싱가포르 지점 한국어 송금 서비스. 수수료 면제 + 우대 환율 적용. 비대면 개설 가능. EP 소지자 우대.",
    cta: "계좌 개설하기",
    tags: ["송금", "은행", "하나은행"],
  },
];

export default function NativeFeedAd({ index = 0 }: { index?: number }) {
  const ad = ADS[index % ADS.length];
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-white rounded-[14px] border border-black/[0.08] p-[14px] relative hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-shadow">
      {/* 광고 라벨 */}
      <div className="absolute top-3 right-3 flex items-center gap-2">
        <span
          className="text-[0.58rem] text-[#888070] border border-black/[0.1] px-[5px] py-[1px] rounded"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          광고
        </span>
        <button
          onClick={() => setDismissed(true)}
          className="text-[#C0BBB0] hover:text-[#888070] transition-colors text-xs leading-none"
          title="광고 닫기"
        >
          ✕
        </button>
      </div>

      {/* 광고주 정보 */}
      <div className="flex items-center gap-2 mb-3 pr-14">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-base flex-shrink-0 ${ad.advertiserBg}`}>
          {ad.advertiserIcon}
        </div>
        <div>
          <div className="text-[0.78rem] font-semibold">{ad.advertiserName}</div>
          <div className="text-[0.65rem] text-[#888070]">스폰서</div>
        </div>
      </div>

      {/* 광고 카피 */}
      <div className="text-[0.92rem] font-bold mb-1 leading-snug">{ad.headline}</div>
      <div className="text-[0.8rem] text-[#888070] leading-relaxed mb-3">{ad.description}</div>

      {/* 태그 */}
      <div className="flex flex-wrap gap-[5px] mb-3">
        {ad.tags.map((tag) => (
          <span
            key={tag}
            className="text-[0.65rem] bg-[#F5F3EE] border border-black/[0.08] rounded-full px-2 py-[2px] text-[#888070]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      <button className="w-full py-[9px] bg-[#181614] text-white rounded-[10px] text-[0.82rem] font-bold hover:bg-[#2a2520] transition-colors">
        {ad.cta} →
      </button>
    </div>
  );
}
