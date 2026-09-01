"use client";

import { useMemo } from "react";
import Link from "next/link";
import { BUSINESSES, type Business } from "@/data/businesses";
import { useUserBiz } from "@/lib/userContent";
import BizReviewCount from "@/components/business/BizReviewCount";

// 홈 노출 정책: 지금은 '최근 등록순'. 업소가 충분히 쌓이면(약 50개↑) 조회수순으로 바꾼다.
// (아직 리뷰·조회 데이터가 거의 없어 '인기순'이 무의미하므로 최근 등록을 먼저 보여준다.)
export default function BizSection() {
  const userBiz = useUserBiz();

  const featured = useMemo(() => {
    // [...userBiz, ...BUSINESSES]는 이미 '최근 등록 사용자 업소 → 시드' 순서라
    // 별도 정렬 없이 상위 4개가 곧 최근 등록순이다.
    return [...userBiz, ...BUSINESSES].slice(0, 4);
  }, [userBiz]);

  return (
    <section className="mb-6">
      <div className="flex justify-between items-center px-4 md:px-6 pb-3">
        {/* 홈 섹션 제목은 전부 text-base로 쓴다. text-[1rem]도 글자 크기는 같은 16px이지만
            줄 높이를 정해주지 않아 본문값 1.6(=25.6px)을 물려받는다. text-base는 24px로 정해져 있어
            제목 줄 높이가 1.6px 더 낮았고, 그만큼 다른 홈 섹션 제목과 줄이 어긋나 있었다. */}
        <h2 className="text-base font-bold tracking-tight">새로 등록된 한인 업소</h2>
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
  // 마우스를 올렸을 때 뜨는 그림자는 바로 위 채용 섹션 카드와 같은 값으로 맞춘다.
  // 원래 0 8px 20px이라 그림자가 카드 아래 18px까지 퍼졌는데, 다른 카드들은 10~12px이었다.
  // 홈 한 화면 안에 뉴스 줄·업소 카드·인기 글 카드가 같이 보여서 마우스를 몇 초 안에 옮겨 다니는데,
  // 업소 카드만 유독 높이 떠올라 같은 종류의 카드가 아닌 것처럼 보였다.
  return (
    <Link href={`/business/${biz.id}`} className="block bg-white rounded-[14px] border border-black/[0.08] overflow-hidden cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all">
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
