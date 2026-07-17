"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import OwnerActions from "@/components/shared/OwnerActions";
import DetailSkeleton from "@/components/shared/DetailSkeleton";
import VerifiedBadge from "@/components/shared/VerifiedBadge";
import { BUSINESSES } from "@/data/businesses";
import { useUserBiz } from "@/lib/userContent";
import { useHydrated } from "@/lib/hooks";
import DetailActions from "@/components/shared/DetailActions";
import BizReviewCount from "@/components/business/BizReviewCount";
import BizReviewSection from "@/components/business/BizReviewSection";
import { useBizReviewCount } from "@/lib/reviews";
import { LIKE_KEY, VIEW_KEY, SAVE_KEY, useMarkViewed } from "@/lib/metrics";

export default function BusinessDetailPage({ params }: { params: { id: string } }) {
  const hydrated = useHydrated();
  const userBiz = useUserBiz();
  const biz = userBiz.find((b) => b.id === params.id) || BUSINESSES.find((b) => b.id === params.id);
  const [activeTab, setActiveTab] = useState<"info" | "review">("info");
  useMarkViewed(VIEW_KEY.biz, biz?.id);
  // 탭 라벨도 내가 쓴 리뷰를 포함한 실제 개수로 (카드·상세와 숫자 일치)
  const reviewCount = useBizReviewCount(params.id, biz?.reviewCount ?? 0);

  if (!biz) {
    if (!hydrated) return <DetailSkeleton />;
    return notFound();
  }

  const isMine = userBiz.some((b) => b.id === params.id);

  return (
    <div className="max-w-[680px] mx-auto">
      <PageHeader />

      {/* 본인 등록 업소면 수정/삭제 진입점 */}
      {isMine && (
        <OwnerActions
          storageKey="sori_user_biz"
          itemId={biz.id}
          editHref={`/business/write?edit=${biz.id}`}
          backHref="/business"
          label="내 업소"
        />
      )}

      {/* 히어로 */}
      <div className={`w-full h-[160px] flex items-center justify-center text-[5rem] ${biz.bg}`}>
        {biz.emoji}
      </div>

      {/* 미인증 업소 안내 */}
      {!biz.verified && (
        <div className="bg-[#FBF5E8] border-y border-[#E8D090] px-4 md:px-6 py-3 flex items-start gap-2">
          <span className="text-base flex-shrink-0">ℹ️</span>
          <p className="text-[0.76rem] text-[#B07010] leading-relaxed">
            아직 SORI가 확인하지 않은 <b>미인증 업소</b>예요. 정보가 정확하지 않을 수 있으니 방문·이용 전 직접 확인해 주세요.
          </p>
        </div>
      )}

      {/* 기본 정보 */}
      <div className="bg-white px-4 md:px-6 py-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-[1.2rem] font-bold">{biz.name}</h1>
              {biz.verified
                ? <VerifiedBadge size="md" />
                : <span className="text-[0.62rem] bg-[#F0EDE8] text-[#888070] px-[6px] py-[2px] rounded font-medium">미인증</span>}
            </div>
            <div className="text-[0.78rem] text-[#888070] mt-[2px]">
              {biz.category}{biz.cuisine ? ` · ${biz.cuisine}` : ""} · {biz.area} · {biz.priceRange}
            </div>
          </div>
        </div>

        {/* 리뷰 수 (별점은 받지 않으므로 ★ 표시 없음) */}
        <div className="flex items-center gap-2 mb-4">
          <BizReviewCount bizId={biz.id} seed={biz.reviewCount} size="detail" />
        </div>

        {/* 액션 바 — 모든 카테고리 공통 배치 */}
        <DetailActions
          id={biz.id}
          likeKey={LIKE_KEY.biz}
          viewKey={VIEW_KEY.biz}
          saveKey={SAVE_KEY.biz}
          seedLikes={biz.likes ?? 0}
          seedViews={biz.views ?? 0}
          shareTitle={biz.name}
          shareText={biz.description}
          className="mb-4"
        />

        {/* 빠른 액션 — 공유는 액션 바로 옮겼으므로 지도만 남긴다 */}
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${biz.address} Singapore`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 mb-5 bg-[#F5F3EE] rounded-[12px] hover:bg-[#F0EDE8] transition-colors active:scale-95"
        >
          <span className="text-base leading-none">🗺️</span>
          <span className="text-[0.78rem] font-medium text-[#181614]">지도보기</span>
        </a>

        {/* 태그 */}
        <div className="flex flex-wrap gap-2">
          {biz.tags.map((tag) => (
            <span key={tag} className="text-[0.72rem] bg-[#F5F3EE] border border-black/[0.08] rounded-full px-3 py-[4px] text-[#888070]">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 탭 */}
      <div className="flex bg-white border-b border-black/[0.07] sticky top-[52px] z-30">
        {(["info", "review"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-[0.85rem] font-medium transition-colors ${
              activeTab === tab ? "text-[#D04020] border-b-2 border-[#D04020]" : "text-[#888070]"
            }`}
          >
            {tab === "info" ? "상세정보" : `리뷰 ${reviewCount}`}
          </button>
        ))}
      </div>

      {activeTab === "info" ? (
        <div className="bg-white px-4 md:px-6 py-5">
          {/* 설명 */}
          <h3 className="text-[0.88rem] font-bold mb-2">업소 소개</h3>
          <p className="text-[0.82rem] text-[#181614] leading-relaxed whitespace-pre-line mb-5">
            {biz.fullDescription}
          </p>

          {/* 기본 정보 테이블 */}
          <h3 className="text-[0.88rem] font-bold mb-3">기본 정보</h3>
          <div className="divide-y divide-black/[0.05]">
            {[
              { icon: "📍", label: "주소", value: biz.address },
              { icon: "🕐", label: "영업시간", value: biz.openHours },
              { icon: "📞", label: "전화번호", value: biz.phone },
            ].map((item) => (
              <div key={item.label} className="flex gap-3 py-3">
                <span className="text-base flex-shrink-0 w-6 text-center">{item.icon}</span>
                <div className="flex-1">
                  <div className="text-[0.72rem] text-[#888070] mb-[2px]">{item.label}</div>
                  <div className="text-[0.82rem] text-[#181614]">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <BizReviewSection bizId={biz.id} seedReviews={biz.reviews} />
      )}

      <div className="h-4" />
    </div>
  );
}
