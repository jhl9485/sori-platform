"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import OwnerActions from "@/components/shared/OwnerActions";
import DetailSkeleton from "@/components/shared/DetailSkeleton";
import VerifiedBadge from "@/components/shared/VerifiedBadge";
import { BUSINESSES } from "@/data/businesses";
import { useToggleSet } from "@/lib/storage";
import { useAuthGate } from "@/lib/auth";
import { toast } from "@/components/shared/Feedback";
import { useUserBiz } from "@/lib/userContent";
import { useHydrated } from "@/lib/hooks";
import MetricRow from "@/components/shared/MetricRow";
import { LIKE_KEY, VIEW_KEY, useMarkViewed } from "@/lib/metrics";

export default function BusinessDetailPage({ params }: { params: { id: string } }) {
  const hydrated = useHydrated();
  const userBiz = useUserBiz();
  const biz = userBiz.find((b) => b.id === params.id) || BUSINESSES.find((b) => b.id === params.id);
  const { has: isSaved, toggle: toggleSave } = useToggleSet("sori_saved_biz");
  const gate = useAuthGate();
  const [activeTab, setActiveTab] = useState<"info" | "review">("info");
  useMarkViewed(VIEW_KEY.biz, biz?.id);

  if (!biz) {
    if (!hydrated) return <DetailSkeleton />;
    return notFound();
  }

  const saved = isSaved(biz.id);
  const isMine = userBiz.some((b) => b.id === params.id);

  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(biz.rating));

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

      {/* 기본 정보 */}
      <div className="bg-white px-4 md:px-6 py-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-[1.2rem] font-bold">{biz.name}</h1>
              {biz.verified && <VerifiedBadge size="md" />}
            </div>
            <div className="text-[0.78rem] text-[#888070] mt-[2px]">
              {biz.category} · {biz.area} · {biz.priceRange}
            </div>
          </div>
        </div>

        {/* 별점 */}
        <div className="flex items-center gap-2 mb-4">
          {biz.reviewCount > 0 ? (
            <>
              <div className="flex">
                {stars.map((filled, i) => (
                  <span key={i} className={`text-lg ${filled ? "text-[#B07010]" : "text-[#E0DDD8]"}`}>★</span>
                ))}
              </div>
              <span className="text-[0.9rem] font-bold text-[#B07010]">{biz.rating}</span>
              <span className="text-[0.78rem] text-[#888070]">({biz.reviewCount}개 리뷰)</span>
            </>
          ) : (
            <span className="text-[0.8rem] text-[#888070]">🆕 신규 등록 · 아직 리뷰가 없어요</span>
          )}
        </div>

        {/* 액션 바 — 좋아요·조회수와 저장을 한 줄에 (커뮤니티 상세와 동일한 배치) */}
        <div className="flex items-center gap-4 mb-4">
          <MetricRow
            likeKey={LIKE_KEY.biz}
            viewKey={VIEW_KEY.biz}
            id={biz.id}
            seedLikes={biz.likes ?? 0}
            seedViews={biz.views ?? 0}
            variant="detail"
          />
          <button
            onClick={() => { if (gate("저장은 로그인 후 이용할 수 있어요.")) { toggleSave(biz.id); toast(saved ? "저장을 해제했어요." : "🔖 저장했어요."); } }}
            className={`flex items-center gap-[3px] text-[0.82rem] ml-auto transition-colors ${saved ? "text-[#2050A0]" : "text-[#888070] hover:text-[#2050A0]"}`}
          >
            <span className="text-[1.1em] leading-none -translate-y-[0.5px]">{saved ? "🔖" : "🏷️"}</span>
            <span className="leading-none">{saved ? "저장됨" : "저장"}</span>
          </button>
        </div>

        {/* 빠른 액션 */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${biz.address} Singapore`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 py-3 bg-[#F5F3EE] rounded-[12px] hover:bg-[#F0EDE8] transition-colors active:scale-95"
          >
            <span className="text-xl leading-none">🗺️</span>
            <span className="text-[0.72rem] font-medium text-[#181614]">지도보기</span>
          </a>
          <button
            onClick={() => {
              if (navigator.share) navigator.share({ title: biz.name, url: window.location.href });
              else { navigator.clipboard.writeText(window.location.href); toast("링크가 복사되었어요."); }
            }}
            className="flex flex-col items-center gap-1 py-3 bg-[#F5F3EE] rounded-[12px] hover:bg-[#F0EDE8] transition-colors active:scale-95"
          >
            <span className="text-xl leading-none">↗</span>
            <span className="text-[0.72rem] font-medium text-[#181614]">공유하기</span>
          </button>
        </div>

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
            {tab === "info" ? "상세정보" : `리뷰 ${biz.reviewCount}`}
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
        <div className="bg-white">
          {/* 리뷰 작성 버튼 */}
          <div className="px-4 md:px-6 py-4 border-b border-black/[0.06]">
            <button className="w-full py-3 border-2 border-dashed border-black/[0.12] rounded-[12px] text-[0.82rem] text-[#888070] hover:border-[#D04020] hover:text-[#D04020] transition-colors">
              ✍️ 리뷰 작성하기
            </button>
          </div>

          {/* 리뷰 목록 */}
          <div className="divide-y divide-black/[0.05]">
            {biz.reviews.map((review) => (
              <div key={review.id} className="px-4 md:px-6 py-4">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[0.85rem] font-bold"
                    style={{ background: review.avatarBg, color: review.avatarColor }}
                  >
                    {review.avatarChar}
                  </div>
                  <div>
                    <div className="text-[0.8rem] font-semibold">{review.author}</div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span key={i} className={`text-sm ${i < review.rating ? "text-[#B07010]" : "text-[#E0DDD8]"}`}>★</span>
                      ))}
                      <span className="text-[0.68rem] text-[#888070] ml-1">{review.time}</span>
                    </div>
                  </div>
                </div>
                <p className="text-[0.82rem] text-[#181614] leading-relaxed">{review.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="h-4" />
    </div>
  );
}
