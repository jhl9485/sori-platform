"use client";

import { useMemo } from "react";
import Link from "next/link";
import { BUSINESSES, type Business } from "@/data/businesses";
import { useUserBiz } from "@/lib/userContent";
import BizReviewCount from "@/components/business/BizReviewCount";

// 사용자 등록 업소 + 정적 데이터 통합 후 리뷰 수 기준 상위 4개 노출
export default function BizSection() {
  const userBiz = useUserBiz();

  const featured = useMemo(() => {
    const merged = [...userBiz, ...BUSINESSES];
    // 별점은 쓰지 않으므로 리뷰 수로만 정렬한다
    return [...merged].sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0)).slice(0, 4);
  }, [userBiz]);

  return (
    <section className="mb-6">
      <div className="flex justify-between items-center px-4 md:px-6 pb-3">
        <h2 className="text-[1rem] font-bold tracking-tight">인기 한인 업소</h2>
        <Link href="/business" className="text-[0.78rem] text-[#D04020] font-medium hover:underline">전체보기</Link>
      </div>

      {/* 모바일: 가로 스크롤 / 데스크탑: 4열 그리드 */}
      <div className="hidden md:grid md:grid-cols-4 gap-3 px-6">
        {featured.map((b) => (
          <BizCard key={b.id} biz={b} />
        ))}
      </div>
      <div className="flex md:hidden gap-3 px-4 overflow-x-auto scrollbar-hide pb-1">
        {featured.map((b) => (
          <div key={b.id} className="flex-shrink-0 w-40">
            <BizCard biz={b} />
          </div>
        ))}
      </div>
    </section>
  );
}

function BizCard({ biz }: { biz: Business }) {
  const isUser = biz.id.startsWith("user-");
  return (
    <Link href={`/business/${biz.id}`} className="block bg-white rounded-[14px] border border-black/[0.08] overflow-hidden cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all">
      <div className={`relative w-full h-[80px] flex items-center justify-center text-[2.2rem] overflow-hidden ${biz.bg}`}>
        {biz.photos && biz.photos.length > 0 ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={biz.photos[0]} alt={biz.name} loading="lazy" className="w-full h-full object-cover" />
        ) : biz.emoji}
        {isUser && (
          <span className="absolute top-2 left-2 bg-[#2B7A50] text-white text-[0.55rem] font-bold px-[5px] py-[1px] rounded">내 업소</span>
        )}
      </div>
      <div className="px-3 py-2">
        <div className="text-[0.82rem] font-bold mb-[2px] line-clamp-1">{biz.name}</div>
        <div className="text-[0.7rem] text-[#888070] mb-[5px] line-clamp-1">{biz.category} · {biz.area}</div>
        <div className="flex items-center gap-1">
          <BizReviewCount bizId={biz.id} seed={biz.reviewCount} />
        </div>
      </div>
    </Link>
  );
}
