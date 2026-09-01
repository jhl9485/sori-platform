"use client";

import { useState } from "react";
import { useListRestore } from "@/lib/listRestore";
import Link from "next/link";
import { NEWS_ITEMS } from "@/data/newsItems";
import SearchField from "@/components/shared/SearchField";
import ScrollRow from "@/components/shared/ScrollRow";
import { useToggleSet } from "@/lib/storage";
import { VIEW_KEY } from "@/lib/metrics";

// 실제 데이터에 존재하는 카테고리만 동적으로 노출 (빈 결과 방지)
const NEWS_CATEGORIES = ["전체", ...Array.from(new Set(NEWS_ITEMS.map((n) => n.category)))];

// 게시 3일 이내면 NEW.
// 예전에는 표시용 `time` 문자열을 정규식으로 파싱했다. 그러나 time은 사람이 읽으라고 쓴 자유 문구라
// 형식이 제각각이고(예: "2026년 7월", "2026년 1분기", "2026년") 본문 속 다른 날짜가 먼저 걸리기도 해서
// (예: "2026년 6월 2일·10일" → 6월 2일로 읽힘) 57건 중 22건이 실제 게시일을 얻지 못했다.
// publishedAt은 목록 정렬에도 쓰는 정확한 ISO 게시일이므로 표시 문구 대신 이걸 기준으로 삼는다.
function isRecentNews(publishedAt: string): boolean {
  // "2026-07-25T00:00:00"(로컬 자정)으로 읽는다. 날짜만 주면 UTC로 해석돼 하루 밀릴 수 있다.
  const d = new Date(`${publishedAt}T00:00:00`);
  if (Number.isNaN(d.getTime())) return false;
  const diff = (Date.now() - d.getTime()) / 86_400_000;
  return diff >= 0 && diff <= 3;
}

export default function NewsPage() {
  const [selectedCat, setSelectedCat] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");
  useListRestore("sori_list_news", { selectedCat, searchQuery }, (s) => {
    setSelectedCat(s.selectedCat);
    setSearchQuery(s.searchQuery);
  });
  // 뉴스 상세를 열면 useMarkViewed가 sori_viewed_news에 기록 → 목록에서 '읽음'으로 흐림
  const { has: isRead } = useToggleSet(VIEW_KEY.news);
  const q = searchQuery.toLowerCase().trim();
  const filtered = NEWS_ITEMS.filter((n) => {
    if (selectedCat !== "전체" && n.category !== selectedCat) return false;
    if (q && !`${n.title} ${n.summary} ${n.category} ${n.source}`.toLowerCase().includes(q)) return false;
    return true;
  });
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

      {/* 검색 */}
      <div className="pb-3">
        <SearchField value={searchQuery} onChange={setSearchQuery} onClear={() => setSearchQuery("")} placeholder="뉴스 검색 (제목·내용·카테고리)..." />
      </div>

      {/* 카테고리 탭 — 업소·벼룩·채용·부동산의 주 필터와 같은 모양(흰 알약 + 옅은 테두리)으로 맞춘다.
          예전에는 테두리도 배경도 없는 맨 글자였다. 고르는 일은 똑같은데 뉴스에서만 눌리는 것처럼
          보이지 않아, 게시판을 옮겨 다니면 같은 조작을 두 가지로 배우게 된다.
          테두리를 넣으면 칩끼리 선이 붙으므로 gap-0 → gap-2도 함께 준다. */}
      <ScrollRow className="gap-2 pb-4">
        {NEWS_CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setSelectedCat(cat)}
            className={`flex-shrink-0 px-3 py-[5px] rounded-full text-[0.75rem] font-medium whitespace-nowrap border transition-all ${selectedCat === cat ? "bg-[#181614] text-white border-[#181614]" : "bg-white text-[#888070] border-black/[0.08] hover:border-black/[0.15]"}`}>
            {cat}
          </button>
        ))}
      </ScrollRow>

      {/* 뉴스 목록 */}
      <div className="flex flex-col gap-3 pb-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-[#888070]">
            <div className="text-4xl mb-3">🔍</div>
            <div className="text-[0.85rem] font-medium">{searchQuery ? `"${searchQuery}" 검색 결과가 없어요` : "뉴스가 없어요"}</div>
          </div>
        ) : filtered.map((news) => {
          const read = isRead(news.id);
          return (
          <Link key={news.id} href={`/news/${news.id}`} className={`block rounded-[14px] border p-4 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:-translate-y-[1px] transition-all ${read ? "bg-[#FAF8F3] border-black/[0.05]" : "bg-white border-black/[0.08]"}`}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-[10px] bg-[#F5F3EE] flex items-center justify-center text-xl flex-shrink-0">{news.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className={`text-[0.65rem] px-2 py-[2px] rounded-full font-semibold ${news.catStyle}`}>{news.category}</span>
                  {news.isBreaking && <span className="text-[0.62rem] bg-[#D04020] text-white px-[5px] py-[1px] rounded font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>속보</span>}
                  {!news.isBreaking && isRecentNews(news.publishedAt) && <span className="text-[0.62rem] bg-[#2B7A50] text-white px-[5px] py-[1px] rounded font-bold">NEW</span>}
                  {read && <span className="text-[0.62rem] text-[#888070]">읽음</span>}
                  <span className="text-[0.65rem] text-[#888070]">📖 {news.readTime}</span>
                </div>
                <div className={`text-[0.9rem] font-bold leading-tight mb-1 ${read ? "text-[#888070]" : ""}`}>{news.title}</div>
                <div className="text-[0.78rem] text-[#888070] line-clamp-2 leading-relaxed mb-2">{news.summary}</div>
                <div className="flex items-center justify-between">
                  <span className="text-[0.68rem] text-[#888070]">{news.source}</span>
                  <span className="text-[0.68rem] text-[#888070]">{news.time}</span>
                </div>
              </div>
            </div>
          </Link>
          );
        })}
      </div>
    </div>
  );
}
