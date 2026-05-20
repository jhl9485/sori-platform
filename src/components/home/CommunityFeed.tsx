"use client";

import { useState } from "react";
import Link from "next/link";
import FeedCard from "./FeedCard";
import NativeFeedAd from "@/components/ads/NativeFeedAd";
import type { FeedItem } from "@/types/feed";

const tabs = ["전체", "생활정보", "Q&A", "맛집", "취업", "벼룩시장"];

const feedData: FeedItem[] = [
  {
    id: "1",
    avatarChar: "김",
    avatarBg: "#EBF0FB",
    avatarColor: "#2050A0",
    author: "김싱가해 · EP 3년차",
    time: "방금 전",
    category: "생활정보",
    title: "OCBC 은행 계좌 개설 2025 최신 후기 (EP 기준)",
    preview:
      "드디어 계좌 개설 성공했습니다. 예전이랑 달라진 게 있어서 정리해요. 필요 서류: 사원증 + EP카드 + 재직증명 영문본...",
    tags: ["은행", "OCBC", "EP비자", "금융"],
    views: "1,234",
    comments: "28",
    likes: "156",
  },
  {
    id: "2",
    avatarChar: "이",
    avatarBg: "#FBF0EC",
    avatarColor: "#D04020",
    author: "이만지햄버 · 싱가포르 5년",
    time: "23분 전",
    category: "맛집",
    title: "Tanjong Pagar 새로 생긴 감자탕집 진짜 후기",
    preview:
      "지난주에 오픈한 곳인데 진짜 실망이 없어요. 한국에서 먹던 그 맛이에요. 가격은 좀 있는데 양이 많아서...",
    tags: ["감자탕", "Tanjong-Pagar", "한식"],
    views: "892",
    comments: "41",
    likes: "98",
  },
  {
    id: "3",
    avatarChar: "박",
    avatarBg: "#EBF5F0",
    avatarColor: "#2B7A50",
    author: "박취업중 · 구직중",
    time: "1시간 전",
    category: "취업",
    title: "한국계 IT 기업 싱가포르 현지 취업 성공기 + 팁",
    preview:
      "6개월간의 긴 준비 끝에 드디어 오퍼 받았습니다. 서류부터 최종 면접까지 제 과정을 공유할게요. EP 스폰서 조건은...",
    tags: ["취업", "EP비자", "IT", "이직"],
    views: "3,401",
    comments: "87",
    likes: "342",
  },
  {
    id: "4",
    avatarChar: "최",
    avatarBg: "#FBF5E8",
    avatarColor: "#B07010",
    author: "최이민맘 · DP 비자",
    time: "2시간 전",
    category: "생활",
    title: "싱가포르 국제 학교 입학 신청 2025-2026 타임라인 정리",
    preview:
      "매년 이맘때가 되면 똑같은 질문이 반복되는 것 같아서 제가 정리해봤어요. SAS, UWC, GESS 등 주요 학교별...",
    tags: ["국제학교", "교육", "자녀교육"],
    views: "2,109",
    comments: "63",
    likes: "187",
  },
];

export default function CommunityFeed() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section>
      {/* 섹션 헤더 */}
      <div className="flex justify-between items-center px-4 pb-[10px]">
        <h2 className="text-base font-bold tracking-tight">커뮤니티</h2>
        <Link href="/community" className="text-[0.78rem] text-[#D04020] font-medium hover:underline">전체보기</Link>
      </div>

      {/* 탭 */}
      <div className="flex gap-0 px-4 pb-4 overflow-x-auto scrollbar-hide">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`flex-shrink-0 px-[14px] py-[6px] rounded-full text-[0.8rem] font-medium cursor-pointer transition-all whitespace-nowrap ${
              activeTab === i
                ? "bg-[#181614] text-white"
                : "text-[#888070] hover:text-[#181614]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 피드 카드 — 3번째 위치에 인피드 광고 삽입 */}
      <div className="px-4 md:px-6 flex flex-col gap-[10px]">
        {feedData.map((item, i) => (
          <div key={item.id} style={{ animationDelay: `${i * 0.05}s` }}>
            <FeedCard item={item} />
            {i === 1 && <div className="mt-[10px]"><NativeFeedAd index={0} /></div>}
          </div>
        ))}
      </div>
    </section>
  );
}
