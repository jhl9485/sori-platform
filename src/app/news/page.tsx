"use client";

import { useState } from "react";
import Link from "next/link";
import { NEWS_ITEMS } from "@/data/newsItems";

// 실제 데이터에 존재하는 카테고리만 동적으로 노출 (빈 결과 방지)
const NEWS_CATEGORIES = ["전체", ...Array.from(new Set(NEWS_ITEMS.map((n) => n.category)))];

// "2026년 5월 28일" 형식 파싱 → 3일 이내면 NEW
function isRecentNews(time: string): boolean {
  const m = time.match(/(\d+)년\s*(\d+)월\s*(\d+)일/);
  if (!m) return false;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  const diff = (Date.now() - d.getTime()) / 86_400_000;
  return diff >= 0 && diff <= 3;
}

export default function NewsPage() {
  const [selectedCat, setSelectedCat] = useState("전체");
  const filtered = selectedCat === "전체" ? NEWS_ITEMS : NEWS_ITEMS.filter((n) => n.category === selectedCat);
  const today = new Date().toLocaleDateString("ko-KR", { month: "long", day: "numeric", weekday: "short" });
  const breaking = NEWS_ITEMS.find((n) => n.isBreaking);

  return (
    <div className="max-w-[680px] mx-auto px-4 md:px-6">
      {/* 헤더 */}
      <div className="pt-4 md:pt-7 pb-4 flex items-start justify-between">
        <div>
          <h1 className="text-[1.2rem] md:text-[1.4rem] font-bold tracking-tight">Daily SG 뉴스</h1>
          <p className="text-[0.72rem] text-[#888070] mt-[2px]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            {today} · AI 번역 · 매일 오전 8시
          </p>
        </div>
        <div className="bg-[#FBF0EC] text-[#D04020] text-[0.68rem] font-bold px-2 py-1 rounded-lg mt-1" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>LIVE</div>
      </div>

      {/* 속보 배너 */}
      {breaking && (
        <Link href={`/news/${breaking.id}`} className="block mb-4 bg-[#D04020] text-white rounded-[12px] p-3 flex items-start gap-2 hover:bg-[#B83515] transition-colors">
          <span className="text-sm flex-shrink-0">⚡</span>
          <div>
            <div className="text-[0.62rem] font-bold opacity-70 mb-[2px]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>속보</div>
            <div className="text-[0.85rem] font-bold leading-tight">{breaking.title}</div>
          </div>
        </Link>
      )}

      {/* 카테고리 탭 */}
      <div className="flex gap-0 pb-4 overflow-x-auto scrollbar-hide">
        {NEWS_CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setSelectedCat(cat)}
            className={`flex-shrink-0 px-3 py-[5px] rounded-full text-[0.78rem] font-medium whitespace-nowrap transition-all ${selectedCat === cat ? "bg-[#181614] text-white" : "text-[#888070] hover:text-[#181614]"}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* 뉴스 목록 */}
      <div className="flex flex-col gap-3 pb-6">
        {filtered.map((news) => (
          <Link key={news.id} href={`/news/${news.id}`} className="block bg-white rounded-[14px] border border-black/[0.08] p-4 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:-translate-y-[1px] transition-all">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-[10px] bg-[#F5F3EE] flex items-center justify-center text-xl flex-shrink-0">{news.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className={`text-[0.65rem] px-2 py-[2px] rounded-full font-semibold ${news.catStyle}`}>{news.category}</span>
                  {news.isBreaking && <span className="text-[0.62rem] bg-[#D04020] text-white px-[5px] py-[1px] rounded font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>속보</span>}
                  {!news.isBreaking && isRecentNews(news.time) && <span className="text-[0.62rem] bg-[#2B7A50] text-white px-[5px] py-[1px] rounded font-bold">NEW</span>}
                  <span className="text-[0.65rem] text-[#888070]">📖 {news.readTime}</span>
                </div>
                <div className="text-[0.9rem] font-bold leading-tight mb-1">{news.title}</div>
                <div className="text-[0.78rem] text-[#888070] line-clamp-2 leading-relaxed mb-2">{news.summary}</div>
                <div className="flex items-center justify-between">
                  <span className="text-[0.68rem] text-[#888070]">{news.source}</span>
                  <span className="text-[0.68rem] text-[#888070]">{news.time}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
