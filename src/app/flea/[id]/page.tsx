"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import PhotoCarousel from "@/components/shared/PhotoCarousel";
import { FLEA_ITEMS } from "@/data/fleaItems";
import { useUserFlea } from "@/lib/userContent";

const conditionColor: Record<string, string> = {
  "새상품": "text-[#2B7A50] bg-[#EBF5F0]",
  "최상": "text-[#2050A0] bg-[#EBF0FB]",
  "상태좋음": "text-[#B07010] bg-[#FBF5E8]",
  "좋음": "text-[#888070] bg-[#F0EDE8]",
  "보통": "text-[#888070] bg-[#F0EDE8]",
};

export default function FleaDetailPage({ params }: { params: { id: string } }) {
  const userFlea = useUserFlea();
  const item = userFlea.find((i) => i.id === params.id) || FLEA_ITEMS.find((i) => i.id === params.id);
  const [liked, setLiked] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  if (!item) return notFound();

  const lines = item.description.split("\n").map((line, i) => {
    if (line.startsWith("**") && line.endsWith("**")) {
      return <p key={i} className="font-bold text-[0.88rem] mt-3 mb-1">{line.replace(/\*\*/g, "")}</p>;
    }
    if (line.startsWith("- ")) {
      return <li key={i} className="text-[0.82rem] text-[#181614] ml-4 list-disc leading-relaxed">{line.slice(2)}</li>;
    }
    if (line.trim() === "") return <br key={i} />;
    return <p key={i} className="text-[0.82rem] text-[#181614] leading-relaxed">{line}</p>;
  });

  return (
    <div className="max-w-[680px] mx-auto">
      <PageHeader
        right={
          <button onClick={() => setLiked(!liked)} className={`text-xl ${liked ? "text-[#D04020]" : "text-[#C0BBB0]"}`}>
            {liked ? "❤️" : "🤍"}
          </button>
        }
      />

      {/* 이미지 영역 */}
      <div className="relative">
        <PhotoCarousel
          photos={item.photos || []}
          fallbackEmoji={item.emoji}
          fallbackBg={item.bg}
          heightClass="h-[280px]"
          alt={item.title}
        />
        {item.isUrgent && (
          <div className="absolute top-3 left-3 bg-[#D04020] text-white text-[0.72rem] font-bold px-3 py-1 rounded-full z-10">
            급처
          </div>
        )}
      </div>

      {/* 가격 + 제목 */}
      <div className="bg-white px-4 md:px-6 py-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[1.3rem] font-bold">{item.price}</span>
              {item.originalPrice && (
                <span className="text-[0.88rem] text-[#888070] line-through">{item.originalPrice}</span>
              )}
            </div>
            <h1 className="text-[0.95rem] font-bold text-[#181614]">{item.title}</h1>
          </div>
          <span className={`text-[0.72rem] px-2 py-[4px] rounded-lg font-medium flex-shrink-0 ${conditionColor[item.condition]}`}>
            {item.condition}
          </span>
        </div>

        {/* 메타 */}
        <div className="flex items-center gap-3 text-[0.72rem] text-[#888070] mt-3">
          <span>📍 {item.location}</span>
          <span>{item.time}</span>
          <span>❤️ {item.likes + (liked ? 1 : 0)}</span>
          <span>👁 {item.views}</span>
        </div>

        {/* 거래 방법 */}
        <div className="flex gap-2 mt-3">
          {item.canMeet && (
            <span className="text-[0.72rem] bg-[#EBF0FB] text-[#2050A0] px-2 py-[3px] rounded-full">직거래</span>
          )}
          {item.canDeliver && (
            <span className="text-[0.72rem] bg-[#EBF5F0] text-[#2B7A50] px-2 py-[3px] rounded-full">택배거래</span>
          )}
        </div>
      </div>

      {/* 판매자 */}
      <div className="bg-white mt-2 px-4 md:px-6 py-4">
        <h2 className="text-[0.85rem] font-bold mb-3">판매자 정보</h2>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#F5F3EE] flex items-center justify-center text-xl">
            👤
          </div>
          <div className="flex-1">
            <div className="text-[0.85rem] font-semibold">{item.seller}</div>
            <div className="text-[0.7rem] text-[#888070]">
              {item.sellerSince}년부터 · 거래 {item.sellerDeals}건
            </div>
          </div>
          <div className="text-[0.72rem] text-[#2B7A50] font-medium bg-[#EBF5F0] px-2 py-1 rounded-full">
            인증회원
          </div>
        </div>
      </div>

      {/* 상품 설명 */}
      <div className="bg-white mt-2 px-4 md:px-6 py-5">
        <h2 className="text-[0.85rem] font-bold mb-3">상품 설명</h2>
        <div className="space-y-[2px]">{lines}</div>
      </div>

      {/* 안전거래 안내 */}
      <div className="bg-[#FBF5E8] mt-2 px-4 md:px-6 py-4 flex items-start gap-3">
        <span className="text-lg flex-shrink-0">⚠️</span>
        <p className="text-[0.75rem] text-[#B07010] leading-relaxed">
          직거래 시 안전한 공공장소에서 만나세요. 선입금 요구 시 사기 위험이 있습니다.
          SORI는 거래에 관여하지 않습니다.
        </p>
      </div>

      {/* 하단 버튼 */}
      <div className="sticky bottom-[80px] md:bottom-0 bg-white border-t border-black/[0.07] px-4 md:px-6 py-3 flex gap-2">
        <button
          onClick={() => setLiked(!liked)}
          className={`w-12 h-12 flex items-center justify-center border rounded-[10px] text-xl transition-colors ${
            liked ? "border-[#D04020] bg-[#FBF0EC]" : "border-black/[0.1]"
          }`}
        >
          {liked ? "❤️" : "🤍"}
        </button>
        <button
          onClick={() => setChatOpen(true)}
          className="flex-1 py-3 bg-[#D04020] text-white rounded-[12px] font-bold text-[0.9rem] hover:bg-[#B83515] transition-colors"
        >
          💬 채팅으로 문의하기
        </button>
      </div>

      {chatOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center" onClick={() => setChatOpen(false)}>
          <div className="bg-white w-full max-w-[390px] rounded-t-[20px] p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[1rem] font-bold mb-2">채팅 기능 준비 중</h3>
            <p className="text-[0.82rem] text-[#888070]">곧 실시간 채팅 기능이 추가됩니다. 현재는 게시글 댓글로 문의해주세요.</p>
            <button onClick={() => setChatOpen(false)} className="mt-4 w-full py-3 bg-[#181614] text-white rounded-[12px] font-bold">
              확인
            </button>
          </div>
        </div>
      )}

      <div className="h-4" />
    </div>
  );
}
