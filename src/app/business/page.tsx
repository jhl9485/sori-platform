"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { BUSINESSES, BIZ_CATEGORIES } from "@/data/businesses";
import { useUserBiz } from "@/lib/userContent";
import SearchField from "@/components/shared/SearchField";

export default function BusinessPage() {
  const [selected, setSelected] = useState("all");
  const [openOnly, setOpenOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const userBiz = useUserBiz();
  const allBiz = useMemo(() => [...userBiz, ...BUSINESSES], [userBiz]);
  const userIds = useMemo(() => new Set(userBiz.map((u) => u.id)), [userBiz]);

  const filtered = useMemo(() => allBiz.filter((b) => {
    if (selected !== "all" && b.category !== selected) return false;
    if (openOnly && !b.isOpen) return false;
    if (searchQuery && !b.name.includes(searchQuery) && !b.tags.some(t => t.includes(searchQuery))) return false;
    return true;
  }), [allBiz, selected, openOnly, searchQuery]);

  return (
    <div className="max-w-[900px] mx-auto px-4 md:px-6">
      <div className="pt-4 md:pt-7 pb-4">
        <h1 className="text-[1.2rem] md:text-[1.4rem] font-bold tracking-tight">한인 업소록</h1>
        <p className="text-[0.75rem] text-[#888070] mt-[2px]">싱가포르 한인 추천 업소 · 한국어 상담 가능</p>
      </div>

      {/* 검색 */}
      <div className="pb-3">
        <SearchField value={searchQuery} onChange={setSearchQuery} onClear={() => setSearchQuery("")} placeholder="업소명, 카테고리, 지역 검색..." />
      </div>

      {/* 카테고리 탭 */}
      <div className="flex gap-2 pb-3 overflow-x-auto scrollbar-hide">
        {BIZ_CATEGORIES.map((cat) => (
          <button key={cat.id} onClick={() => setSelected(cat.id)}
            className={`flex-shrink-0 flex items-center gap-1 px-3 py-[5px] rounded-full text-[0.75rem] font-medium border transition-all ${selected === cat.id ? "bg-[#181614] text-white border-[#181614]" : "bg-white text-[#888070] border-black/[0.08] hover:border-black/[0.15]"}`}>
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* 영업중 필터 + 등록 */}
      <div className="flex items-center justify-between pb-4 gap-2">
        <button onClick={() => setOpenOnly(!openOnly)}
          className={`flex items-center gap-1 px-3 py-[5px] rounded-full text-[0.75rem] font-medium border transition-all ${openOnly ? "bg-[#2B7A50] text-white border-[#2B7A50]" : "bg-white text-[#888070] border-black/[0.08]"}`}>
          <span className={`w-[6px] h-[6px] rounded-full ${openOnly ? "bg-white animate-pulse-dot" : "bg-[#2B7A50]"}`} />
          지금 영업중
        </button>
        <div className="flex items-center gap-2">
          <span className="text-[0.75rem] text-[#888070]"><span className="font-bold text-[#181614]">{filtered.length}개</span> 업소</span>
          <Link
            href="/business/write"
            className="bg-[#D04020] text-white text-[0.75rem] font-bold px-3 py-[6px] rounded-[10px] hover:bg-[#B83515] transition-colors flex items-center gap-1"
          >
            🏪 업소 등록
          </Link>
        </div>
      </div>

      {/* 업소 목록 — 데스크탑 2~3열 */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-[#888070]">
          <div className="text-4xl mb-3">🏪</div>
          <div className="text-[0.85rem] font-medium">검색 결과가 없어요</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pb-6">
          {filtered.map((biz) => (
            <Link key={biz.id} href={`/business/${biz.id}`} className="block bg-white rounded-[14px] border border-black/[0.08] overflow-hidden cursor-pointer hover:shadow-[0_4px_16px_rgba(0,0,0,0.07)] hover:-translate-y-[1px] transition-all">
              <div className={`w-full h-[80px] flex items-center justify-center text-[2.5rem] relative overflow-hidden ${biz.bg}`}>
                {biz.photos && biz.photos.length > 0 ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={biz.photos[0]} alt={biz.name} loading="lazy" className="w-full h-full object-cover" />
                ) : biz.emoji}
                {userIds.has(biz.id) && (
                  <span className="absolute top-2 left-2 bg-[#2B7A50] text-white text-[0.6rem] font-bold px-[5px] py-[1px] rounded">내 업소</span>
                )}
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-bold text-[0.9rem]">{biz.name}</div>
                  <span className={`text-[0.7rem] font-semibold ${biz.isOpen ? "text-[#2B7A50]" : "text-[#888070]"}`}>{biz.isOpen ? "● 영업중" : "○ 종료"}</span>
                </div>
                <div className="text-[0.72rem] text-[#888070] mb-2">{biz.category} · {biz.area} · {biz.priceRange}</div>
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-[#B07010] text-[0.75rem]">{"★".repeat(Math.round(biz.rating))}</span>
                  <span className="text-[0.75rem] font-bold text-[#B07010]">{biz.rating}</span>
                  <span className="text-[0.7rem] text-[#888070]">({biz.reviewCount})</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {biz.tags.slice(0, 3).map((tag) => <span key={tag} className="text-[0.65rem] bg-[#F5F3EE] border border-black/[0.08] rounded-full px-2 py-[1px] text-[#888070]">{tag}</span>)}
                </div>
                <div className="bg-[#F5F3EE] rounded-lg p-2 text-[0.72rem] text-[#888070] line-clamp-1">💬 &ldquo;{biz.description}&rdquo;</div>
                <div className="mt-2 text-[0.7rem] text-[#888070]">🕐 {biz.openHours}</div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <Link
        href="/business/write"
        className="fixed bottom-[calc(80px+env(safe-area-inset-bottom))] md:bottom-8 right-4 md:right-8 xl:right-[312px] w-12 h-12 bg-[#D04020] text-white rounded-full shadow-[0_4px_16px_rgba(208,64,32,0.35)] inline-flex items-center justify-center text-xl leading-none z-40 hover:bg-[#B83515] hover:scale-105 transition-all"
        aria-label="업소 등록"
      >
        <span className="block leading-none translate-y-[-1px]">🏪</span>
      </Link>
    </div>
  );
}
