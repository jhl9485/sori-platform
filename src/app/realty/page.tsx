"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { REALTY_ITEMS, REALTY_CATEGORIES, REALTY_DEALS } from "@/data/realtyItems";
import { useUserRealty } from "@/lib/userContent";

export default function RealtyPage() {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDeal, setSelectedDeal] = useState<(typeof REALTY_DEALS)[number]>("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const userRealty = useUserRealty();
  const allItems = useMemo(() => [...userRealty, ...REALTY_ITEMS], [userRealty]);
  const userIds = useMemo(() => new Set(userRealty.map((u) => u.id)), [userRealty]);

  const filtered = allItems.filter((r) => {
    if (selectedType !== "all" && r.type !== selectedType) return false;
    if (selectedDeal !== "전체" && r.deal !== selectedDeal) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const hay = `${r.title} ${r.area} ${r.address} ${r.mrt}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="max-w-[900px] mx-auto px-4 md:px-6">
      <div className="pt-4 md:pt-7 pb-4">
        <h1 className="text-[1.2rem] md:text-[1.4rem] font-bold tracking-tight">부동산</h1>
        <p className="text-[0.75rem] text-[#888070] mt-[2px]">싱가포르 한인 부동산 · 임대/매매 · 한국어 상담 가능</p>
      </div>

      {/* 검색 */}
      <div className="pb-3 relative">
        <span className="absolute left-3 inset-y-0 flex items-center text-[0.9rem] text-[#888070] pointer-events-none leading-none">🔍</span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="지역, 단지명, MRT 검색..."
          className="w-full bg-white border border-black/[0.08] rounded-full py-[10px] pl-10 pr-4 text-[0.85rem] outline-none placeholder:text-[#888070] focus:border-black/[0.15] transition-colors"
        />
      </div>

      {/* 거래 유형 */}
      <div className="flex gap-2 pb-2 overflow-x-auto scrollbar-hide">
        {REALTY_DEALS.map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDeal(d)}
            className={`flex-shrink-0 px-3 py-[5px] rounded-full text-[0.75rem] font-medium border transition-all ${
              selectedDeal === d
                ? "bg-[#181614] text-white border-[#181614]"
                : "bg-white text-[#888070] border-black/[0.08]"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* 주거 타입 */}
      <div className="flex gap-2 pb-3 overflow-x-auto scrollbar-hide">
        {REALTY_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedType(cat.id)}
            className={`flex-shrink-0 flex items-center gap-1 px-3 py-[5px] rounded-full text-[0.75rem] font-medium border transition-all ${
              selectedType === cat.id
                ? "bg-[#D04020] text-white border-[#D04020]"
                : "bg-white text-[#888070] border-black/[0.08]"
            }`}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      <div className="pb-3 flex items-center justify-between gap-2">
        <span className="text-[0.75rem] text-[#888070]">
          <span className="font-bold text-[#181614]">{filtered.length}개</span> 매물
        </span>
        <Link
          href="/realty/write"
          className="bg-[#D04020] text-white text-[0.75rem] font-bold px-3 py-[6px] rounded-[10px] hover:bg-[#B83515] transition-colors flex items-center gap-1"
        >
          ✏️ 매물 등록
        </Link>
      </div>

      {/* 매물 목록 */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-[#888070]">
          <div className="text-4xl mb-3">🏘️</div>
          <div className="text-[0.85rem] font-medium">조건에 맞는 매물이 없어요</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3 pb-8">
          {filtered.map((r) => (
            <Link
              key={r.id}
              href={`/realty/${r.id}`}
              className="block bg-white rounded-[14px] border border-black/[0.08] overflow-hidden hover:shadow-[0_4px_16px_rgba(0,0,0,0.07)] hover:-translate-y-[1px] transition-all"
            >
              <div className={`w-full h-[220px] sm:h-[140px] flex items-center justify-center text-[4rem] sm:text-[3rem] relative overflow-hidden ${r.bg}`}>
                {r.photos && r.photos.length > 0 ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={r.photos[0]} alt={r.title} className="w-full h-full object-cover" />
                ) : (
                  r.emoji
                )}
                {userIds.has(r.id) && (
                  <span className="absolute top-2 left-2 bg-[#2B7A50] text-white text-[0.62rem] font-bold px-2 py-[2px] rounded-full">
                    내 매물
                  </span>
                )}
                <span className="absolute top-2 right-2 bg-white/90 text-[#181614] text-[0.62rem] font-bold px-2 py-[2px] rounded-full">
                  {r.deal}
                </span>
                {r.photos && r.photos.length > 1 && (
                  <span className="absolute bottom-2 right-2 text-[0.62rem] bg-black/60 text-white px-[6px] py-[2px] rounded-full font-medium">
                    📷 {r.photos.length}
                  </span>
                )}
              </div>
              <div className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[0.65rem] bg-[#F5F3EE] text-[#888070] px-2 py-[1px] rounded-full">
                    {r.type}
                  </span>
                  <span className="text-[0.65rem] text-[#888070]">
                    🛏 {r.bedrooms} · 🚽 {r.bathrooms}
                  </span>
                </div>
                <div className="text-[0.88rem] font-bold leading-tight line-clamp-2 mb-1">
                  {r.title}
                </div>
                <div className="text-[1rem] font-extrabold text-[#D04020] mb-1">{r.price}</div>
                <div className="text-[0.72rem] text-[#888070] mb-2">
                  📍 {r.area} · {r.size}
                </div>
                <div className="text-[0.7rem] text-[#888070] mb-2">🚇 {r.mrt}</div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {r.highlights.slice(0, 3).map((h) => (
                    <span
                      key={h}
                      className="text-[0.62rem] bg-[#FBF5E8] text-[#B07010] rounded-full px-2 py-[1px]"
                    >
                      {h}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-black/[0.06]">
                  <span className="text-[0.65rem] text-[#888070]">
                    {r.agentBadge === "집주인 직거래" ? "👤 " : "🏢 "}
                    {r.agent}
                  </span>
                  <span className="text-[0.65rem] text-[#888070]">
                    👁 {r.views} · ❤ {r.likes}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <Link
        href="/realty/write"
        className="fixed bottom-[76px] md:bottom-8 right-4 md:right-8 xl:right-[312px] w-12 h-12 bg-[#D04020] text-white rounded-full shadow-[0_4px_16px_rgba(208,64,32,0.35)] flex items-center justify-center text-xl leading-none z-40 hover:bg-[#B83515] hover:scale-105 transition-all"
        aria-label="매물 등록"
      >
        🏘️
      </Link>
    </div>
  );
}
