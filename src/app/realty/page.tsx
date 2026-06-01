"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { REALTY_ITEMS, REALTY_CATEGORIES, REALTY_DEALS } from "@/data/realtyItems";
import { useUserRealty } from "@/lib/userContent";
import SearchField from "@/components/shared/SearchField";

// 한인 밀집 지역 (부동산 필터용)
const REALTY_AREAS = [
  "전체", "Tanjong Pagar", "Buona Vista", "Orchard", "River Valley",
  "Clementi", "Bishan", "Marine Parade", "East Coast",
  "Woodlands", "Jurong East", "Bedok", "기타",
];
const REALTY_BEDROOMS = ["전체", "1", "2", "3", "4+"] as const;
const REALTY_PRICE_RANGES = [
  { id: "all",  label: "전체" },
  { id: "0-3000",     label: "~ $3K/월" },
  { id: "3000-5000",  label: "$3~5K/월" },
  { id: "5000-7000",  label: "$5~7K/월" },
  { id: "7000-9999999", label: "$7K+/월" },
] as const;
const REALTY_PERIODS = [
  { id: "all", label: "전체" },
  { id: "1w",  label: "1주" },
  { id: "1m",  label: "1개월" },
  { id: "6m",  label: "6개월" },
] as const;

function parsePriceNum(s: string): number {
  // "$4,700/월" → 4700, "$1,850,000" → 1850000 (매매)
  const m = s.match(/\$?\s*([\d,]+)/);
  if (!m) return 0;
  return parseInt(m[1].replace(/,/g, ""), 10) || 0;
}

function withinPeriod(time: string, period: string): boolean {
  if (period === "all") return true;
  // time 형식: "2시간 전" / "어제" / "5일 전" / "2026년 5월 25일"
  if (/방금|분 전|시간 전|어제/.test(time)) return true;
  const dayMatch = time.match(/(\d+)일 전/);
  const days = dayMatch ? parseInt(dayMatch[1], 10) : 0;
  // 절대 날짜 형식이면 파싱
  let computedDays = days;
  if (computedDays === 0) {
    const abs = time.match(/(\d{4})년\s*(\d+)월\s*(\d+)일/);
    if (abs) {
      const t = new Date(parseInt(abs[1]), parseInt(abs[2]) - 1, parseInt(abs[3])).getTime();
      computedDays = Math.floor((Date.now() - t) / (1000 * 60 * 60 * 24));
    }
  }
  if (period === "1w") return computedDays <= 7;
  if (period === "1m") return computedDays <= 30;
  if (period === "6m") return computedDays <= 180;
  return true;
}

export default function RealtyPage() {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDeal, setSelectedDeal] = useState<(typeof REALTY_DEALS)[number]>("전체");
  const [selectedArea, setSelectedArea] = useState("전체");
  const [selectedBedrooms, setSelectedBedrooms] = useState<string>("전체");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const userRealty = useUserRealty();
  const allItems = useMemo(() => [...userRealty, ...REALTY_ITEMS], [userRealty]);
  const userIds = useMemo(() => new Set(userRealty.map((u) => u.id)), [userRealty]);

  const filtered = allItems.filter((r) => {
    if (selectedType !== "all" && r.type !== selectedType) return false;
    if (selectedDeal !== "전체" && r.deal !== selectedDeal) return false;
    if (selectedArea !== "전체" && r.area !== selectedArea) return false;
    if (selectedBedrooms !== "전체") {
      const want = selectedBedrooms === "4+" ? 4 : parseInt(selectedBedrooms, 10);
      if (selectedBedrooms === "4+") {
        if (r.bedrooms < 4) return false;
      } else if (r.bedrooms !== want) return false;
    }
    if (selectedPriceRange !== "all" && r.deal !== "매매") {
      const [lo, hi] = selectedPriceRange.split("-").map(Number);
      const p = parsePriceNum(r.price);
      if (p < lo || p > hi) return false;
    }
    if (selectedPeriod !== "all" && !withinPeriod(r.time, selectedPeriod)) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const hay = `${r.title} ${r.area} ${r.address} ${r.mrt}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const resetFilters = () => {
    setSelectedType("all"); setSelectedDeal("전체"); setSelectedArea("전체");
    setSelectedBedrooms("전체"); setSelectedPriceRange("all");
    setSelectedPeriod("all"); setSearchQuery("");
  };
  const activeFilterCount =
    (selectedType !== "all" ? 1 : 0) + (selectedDeal !== "전체" ? 1 : 0) +
    (selectedArea !== "전체" ? 1 : 0) + (selectedBedrooms !== "전체" ? 1 : 0) +
    (selectedPriceRange !== "all" ? 1 : 0) + (selectedPeriod !== "all" ? 1 : 0);

  return (
    <div className="max-w-[900px] mx-auto px-4 md:px-6">
      <div className="pt-4 md:pt-7 pb-4">
        <h1 className="text-[1.2rem] md:text-[1.4rem] font-bold tracking-tight">부동산</h1>
        <p className="text-[0.75rem] text-[#888070] mt-[2px]">싱가포르 한인 부동산 · 임대/매매 · 한국어 상담 가능</p>
      </div>

      {/* 검색 */}
      <div className="pb-3">
        <SearchField value={searchQuery} onChange={setSearchQuery} onClear={() => setSearchQuery("")} placeholder="지역, 단지명, MRT 검색..." />
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

      {/* 상세 필터 토글 */}
      <div className="flex items-center justify-between pb-2">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-1 text-[0.78rem] text-[#181614] hover:text-[#D04020] transition-colors"
        >
          <span className="leading-none">⚙️</span>
          <span>상세 필터</span>
          {activeFilterCount > 0 && (
            <span className="bg-[#D04020] text-white text-[0.6rem] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none ml-1">
              {activeFilterCount}
            </span>
          )}
          <span className="text-[#888070] text-xs ml-1">{showAdvanced ? "▲" : "▼"}</span>
        </button>
        {activeFilterCount > 0 && (
          <button onClick={resetFilters} className="text-[0.72rem] text-[#888070] hover:text-[#D04020]">
            초기화
          </button>
        )}
      </div>

      {/* 상세 필터 패널 */}
      {showAdvanced && (
        <div className="bg-white border border-black/[0.08] rounded-[12px] p-3 mb-3 space-y-3">
          {/* 지역구분 */}
          <div>
            <div className="text-[0.7rem] font-bold text-[#888070] mb-[5px]">📍 지역구분</div>
            <div className="flex flex-wrap gap-[5px]">
              {REALTY_AREAS.map((a) => (
                <button
                  key={a}
                  onClick={() => setSelectedArea(a)}
                  className={`text-[0.7rem] rounded-full px-[10px] py-[3px] border transition-colors ${
                    selectedArea === a
                      ? "bg-[#181614] text-white border-[#181614]"
                      : "bg-white text-[#888070] border-black/[0.08] hover:border-black/[0.15]"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* 침실 수 */}
          <div>
            <div className="text-[0.7rem] font-bold text-[#888070] mb-[5px]">🛏 침실 수</div>
            <div className="flex flex-wrap gap-[5px]">
              {REALTY_BEDROOMS.map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBedrooms(b)}
                  className={`text-[0.72rem] rounded-full px-[12px] py-[4px] border transition-colors ${
                    selectedBedrooms === b
                      ? "bg-[#2050A0] text-white border-[#2050A0]"
                      : "bg-white text-[#888070] border-black/[0.08]"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* 가격대 (임대 한정) */}
          <div>
            <div className="text-[0.7rem] font-bold text-[#888070] mb-[5px]">💰 임대료 (월세)</div>
            <div className="flex flex-wrap gap-[5px]">
              {REALTY_PRICE_RANGES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPriceRange(p.id)}
                  className={`text-[0.7rem] rounded-full px-[10px] py-[3px] border transition-colors ${
                    selectedPriceRange === p.id
                      ? "bg-[#2B7A50] text-white border-[#2B7A50]"
                      : "bg-white text-[#888070] border-black/[0.08]"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* 등록 기간 */}
          <div>
            <div className="text-[0.7rem] font-bold text-[#888070] mb-[5px]">🕐 등록 기간</div>
            <div className="flex flex-wrap gap-[5px]">
              {REALTY_PERIODS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPeriod(p.id)}
                  className={`text-[0.7rem] rounded-full px-[10px] py-[3px] border transition-colors ${
                    selectedPeriod === p.id
                      ? "bg-[#B07010] text-white border-[#B07010]"
                      : "bg-white text-[#888070] border-black/[0.08]"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

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
                  <img src={r.photos[0]} alt={r.title} loading="lazy" className="w-full h-full object-cover" />
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
        className="fixed bottom-[calc(80px+env(safe-area-inset-bottom))] md:bottom-8 right-4 md:right-8 xl:right-[312px] w-12 h-12 bg-[#D04020] text-white rounded-full shadow-[0_4px_16px_rgba(208,64,32,0.35)] inline-flex items-center justify-center text-xl leading-none z-40 hover:bg-[#B83515] hover:scale-105 transition-all"
        aria-label="매물 등록"
      >
        <span className="block leading-none translate-y-[-1px]">🏘️</span>
      </Link>
    </div>
  );
}
