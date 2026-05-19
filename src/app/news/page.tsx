"use client";

import { useState } from "react";

const NEWS_CATEGORIES = ["전체", "사회", "경제", "부동산", "날씨/환경", "한인소식", "엔터"];

const NEWS = [
  { id: "1", category: "경제", catStyle: "bg-[#EBF0FB] text-[#2050A0]", title: "싱가포르 2025년 4월 소비자물가 전년比 2.3% 상승", summary: "식품·주거비 상승이 주된 원인. 한인 가정에서 체감하는 물가는 더 높다는 의견 多. MAS는 기준금리 동결 기조 유지.", source: "CNA · AI 번역", time: "오늘 오전 8:12", isBreaking: false, readTime: "2분", emoji: "📊" },
  { id: "2", category: "한인소식", catStyle: "bg-[#FBF0EC] text-[#D04020]", title: "[한인회] 6월 한인의 밤 행사 참가 신청 시작", summary: "2025년 한인의 밤이 6월 28일 Marina Bay Sands에서 개최됩니다. 사전 신청 시 할인 혜택 제공. 5월 31일까지 신청 마감.", source: "싱가포르 한인회", time: "오늘 오전 9:30", isBreaking: false, readTime: "1분", emoji: "🎉" },
  { id: "3", category: "부동산", catStyle: "bg-[#FBF5E8] text-[#B07010]", title: "싱가포르 콘도 임대료, 3개월 연속 하락세", summary: "CBD 인근 콘도 임대료가 3개월 연속 하락. 전문가들은 하반기 추가 조정 가능성 언급.", source: "Straits Times · AI 번역", time: "어제 오후 6:00", isBreaking: false, readTime: "3분", emoji: "🏘️" },
  { id: "4", category: "사회", catStyle: "bg-[#EBF5F0] text-[#2B7A50]", title: "MRT 서클라인 연장 구간 2026년 개통 확정", summary: "Singapore MRT 서클라인 3단계 연장 구간이 2026년 상반기 개통 예정. Keppel·Cantonment 역 추가.", source: "LTA 공식 발표", time: "어제 오후 2:15", isBreaking: false, readTime: "2분", emoji: "🚇" },
  { id: "5", category: "날씨/환경", catStyle: "bg-[#F5F0FF] text-[#7040C0]", title: "이번 주말 강한 스콜 예보, 외출 시 우산 필수", summary: "NEA에 따르면 이번 주말 오후 늦게부터 강한 스콜이 예상됩니다. 기온은 32-35°C, 습도 85% 이상.", source: "NEA · AI 번역", time: "오늘 오전 7:00", isBreaking: true, readTime: "1분", emoji: "🌧️" },
  { id: "6", category: "엔터", catStyle: "bg-[#FFF0F5] text-[#C04070]", title: "K-POP 아이돌 싱가포르 콘서트 5월 추가 공연 확정", summary: "압도적인 수요로 인해 5월 3일 추가 공연이 확정되었습니다.", source: "공식 SNS", time: "2일 전", isBreaking: false, readTime: "2분", emoji: "🎤" },
  { id: "7", category: "경제", catStyle: "bg-[#EBF0FB] text-[#2050A0]", title: "한국 원화, 대미 달러 대비 1,340원대 안정세", summary: "SGD-KRW 환율 현재 1SGD = 1,048원 수준. 전문가들은 하반기 원화 강세 전환 가능성 언급.", source: "Bloomberg · AI 번역", time: "3일 전", isBreaking: false, readTime: "2분", emoji: "💱" },
];

export default function NewsPage() {
  const [selectedCat, setSelectedCat] = useState("전체");
  const filtered = selectedCat === "전체" ? NEWS : NEWS.filter((n) => n.category === selectedCat);
  const today = new Date().toLocaleDateString("ko-KR", { month: "long", day: "numeric", weekday: "short" });

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
      {NEWS.some(n => n.isBreaking) && (
        <div className="mb-4 bg-[#D04020] text-white rounded-[12px] p-3 flex items-start gap-2">
          <span className="text-sm flex-shrink-0">⚡</span>
          <div>
            <div className="text-[0.62rem] font-bold opacity-70 mb-[2px]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>속보</div>
            <div className="text-[0.85rem] font-bold leading-tight">{NEWS.find(n => n.isBreaking)?.title}</div>
          </div>
        </div>
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
          <div key={news.id} className="bg-white rounded-[14px] border border-black/[0.08] p-4 cursor-pointer hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:-translate-y-[1px] transition-all">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-[10px] bg-[#F5F3EE] flex items-center justify-center text-xl flex-shrink-0">{news.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className={`text-[0.65rem] px-2 py-[2px] rounded-full font-semibold ${news.catStyle}`}>{news.category}</span>
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
          </div>
        ))}
      </div>
    </div>
  );
}
