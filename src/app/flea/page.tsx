"use client";

import { useState } from "react";
import Link from "next/link";
import { FLEA_ITEMS, FLEA_CATEGORIES } from "@/data/fleaItems";

const conditionColor: Record<string, string> = {
  "새상품": "text-[#2B7A50] bg-[#EBF5F0]",
  "최상": "text-[#2050A0] bg-[#EBF0FB]",
  "상태좋음": "text-[#B07010] bg-[#FBF5E8]",
  "좋음": "text-[#888070] bg-[#F0EDE8]",
  "보통": "text-[#888070] bg-[#F0EDE8]",
};

export default function FleaPage() {
  const [selectedCat, setSelectedCat] = useState("전체");
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const filtered = selectedCat === "전체" ? FLEA_ITEMS : FLEA_ITEMS.filter((i) => i.category === selectedCat);

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedItems((prev) => {
      const n = new Set(prev);
      if (n.has(id)) { n.delete(id); } else { n.add(id); }
      return n;
    });
  };

  return (
    <div className="max-w-[900px] mx-auto px-4 md:px-6">
      <div className="pt-4 md:pt-7 pb-4">
        <h1 className="text-[1.2rem] md:text-[1.4rem] font-bold tracking-tight">벼룩시장</h1>
        <p className="text-[0.75rem] text-[#888070] mt-[2px]">싱가포르 한인 중고거래 · 당근보다 가깝게</p>
      </div>

      {/* 검색 */}
      <div className="pb-3 relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[0.9rem] text-[#888070] pointer-events-none">🔍</span>
        <input type="text" placeholder="물건 이름 검색..." className="w-full bg-white border border-black/[0.08] rounded-full py-[10px] pl-10 pr-4 text-[0.85rem] outline-none placeholder:text-[#888070] font-[inherit] focus:border-black/[0.15] transition-colors" />
      </div>

      {/* 카테고리 */}
      <div className="flex gap-2 pb-4 overflow-x-auto scrollbar-hide">
        {FLEA_CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setSelectedCat(cat)}
            className={`flex-shrink-0 px-3 py-[5px] rounded-full text-[0.75rem] font-medium border transition-all ${selectedCat === cat ? "bg-[#181614] text-white border-[#181614]" : "bg-white text-[#888070] border-black/[0.08] hover:border-black/[0.15]"}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* 그리드 — 모바일 2열, 태블릿 3열, 데스크탑 4열 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pb-6">
        {filtered.map((item) => (
          <Link key={item.id} href={`/flea/${item.id}`} className="block bg-white rounded-[14px] border border-black/[0.08] overflow-hidden hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:-translate-y-[1px] transition-all">
            <div className={`w-full h-[110px] flex items-center justify-center text-[3rem] relative ${item.bg}`}>
              {item.emoji}
              {item.isUrgent && <span className="absolute top-2 left-2 text-[0.6rem] bg-[#D04020] text-white px-[5px] py-[1px] rounded font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>급처</span>}
              <button onClick={(e) => toggleLike(item.id, e)} className="absolute bottom-2 right-2 w-6 h-6 bg-white/80 rounded-full flex items-center justify-center text-sm hover:bg-white transition-colors">
                {likedItems.has(item.id) ? "❤️" : "🤍"}
              </button>
            </div>
            <div className="p-2">
              <div className="text-[0.82rem] font-bold mb-[3px] line-clamp-2 leading-tight">{item.title}</div>
              <div className="flex items-center gap-1 mb-1">
                <span className="font-bold text-[0.88rem]">{item.price}</span>
                {item.originalPrice && <span className="text-[0.7rem] text-[#888070] line-through">{item.originalPrice}</span>}
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-[0.63rem] px-[5px] py-[1px] rounded font-medium ${conditionColor[item.condition] || "text-[#888070] bg-[#F0EDE8]"}`}>{item.condition}</span>
                <span className="text-[0.63rem] text-[#888070]">📍{item.area}</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[0.63rem] text-[#888070]">{item.time}</span>
                <span className="text-[0.63rem] text-[#888070]">❤️ {item.likes + (likedItems.has(item.id) ? 1 : 0)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <button className="fixed bottom-[76px] md:bottom-8 right-4 md:right-8 xl:right-[312px] w-12 h-12 bg-[#D04020] text-white rounded-full shadow-[0_4px_16px_rgba(208,64,32,0.35)] flex items-center justify-center text-xl z-40 hover:bg-[#B83515] hover:scale-105 transition-all">
        📸
      </button>
    </div>
  );
}
