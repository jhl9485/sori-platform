"use client";

import { useState } from "react";
import Link from "next/link";

// ─── 샘플 데이터 ───────────────────────────────────────────
const NAV_ITEMS = [
  { icon: "🏠", label: "홈",        href: "/" },
  { icon: "🏪", label: "한인업소록", href: "/business" },
  { icon: "💼", label: "구인구직",   href: "/jobs" },
  { icon: "💬", label: "커뮤니티",   href: "/community" },
  { icon: "📰", label: "뉴스",       href: "/news" },
  { icon: "🛍️", label: "벼룩시장",  href: "/flea" },
  { icon: "🤍", label: "MY",         href: "/my" },
];

const FEED = [
  {
    id: "1", cat: "생활정보", catStyle: "bg-[#EBF0FB] text-[#2050A0]",
    avatar: "김", avatarBg: "#EBF0FB", avatarColor: "#2050A0",
    author: "김싱가해 · EP 3년차", time: "방금 전",
    title: "OCBC 은행 계좌 개설 2025 최신 후기 (EP 기준)",
    preview: "드디어 계좌 개설 성공했습니다. 필요 서류: 사원증 + EP카드 + 재직증명 영문본...",
    tags: ["은행", "OCBC", "EP비자"], views: "1,234", comments: "28", likes: "156",
  },
  {
    id: "2", cat: "맛집", catStyle: "bg-[#FBF0EC] text-[#D04020]",
    avatar: "이", avatarBg: "#FBF0EC", avatarColor: "#D04020",
    author: "이만지햄버 · 싱가포르 5년", time: "23분 전",
    title: "Tanjong Pagar 새로 생긴 감자탕집 진짜 후기",
    preview: "진짜 한국에서 먹던 그 맛이에요. 가격은 좀 있는데 양이 많아서 이득...",
    tags: ["감자탕", "한식", "TanjongPagar"], views: "892", comments: "41", likes: "98",
  },
  {
    id: "3", cat: "취업정보", catStyle: "bg-[#EBF5F0] text-[#2B7A50]",
    avatar: "박", avatarBg: "#EBF5F0", avatarColor: "#2B7A50",
    author: "박취업중 · 구직중", time: "1시간 전",
    title: "한국계 IT 기업 싱가포르 현지 취업 성공기 + 팁",
    preview: "6개월간의 준비 끝에 오퍼 받았습니다. EP 스폰서 조건은...",
    tags: ["취업", "EP비자", "IT"], views: "3,401", comments: "87", likes: "342",
  },
  {
    id: "4", cat: "금융/투자", catStyle: "bg-[#EBF0FB] text-[#2050A0]",
    avatar: "최", avatarBg: "#EBF0FB", avatarColor: "#2050A0",
    author: "최절세 · 싱가포르 7년", time: "3시간 전",
    title: "싱가포르 거주자 한국 주식 양도소득세 정리 2025",
    preview: "183일 거주 기준으로 싱가포르 세법 적용 여부가 달라지는데...",
    tags: ["세금", "주식", "절세"], views: "4,521", comments: "112", likes: "389",
  },
  {
    id: "5", cat: "부동산", catStyle: "bg-[#FBF5E8] text-[#B07010]",
    avatar: "한", avatarBg: "#FBF5E8", avatarColor: "#B07010",
    author: "한부동산 · EP 5년차", time: "8시간 전",
    title: "Buona Vista vs Tanjong Pagar 렌트 비교 2025",
    preview: "두 지역 모두 살아본 경험으로 비교. 가격대·교통·편의시설 기준...",
    tags: ["렌트", "부동산"], views: "2,890", comments: "73", likes: "234",
  },
];

const JOBS_PREVIEW = [
  { icon: "📱", bg: "bg-[#EBF0FB]", title: "Senior Software Engineer", company: "Samsung SG", salary: "$8K~12K", visa: "EP 스폰서" },
  { icon: "🍱", bg: "bg-[#EBF5F0]", title: "한식 조리사", company: "강남부식 Pte Ltd", salary: "$3.5K~4K", visa: "S-Pass" },
  { icon: "📊", bg: "bg-[#FBF5E8]", title: "마케팅 매니저", company: "CJ Korea Express", salary: "$5.5K~7.5K", visa: "EP 스폰서" },
];

// ─── 컴포넌트 ───────────────────────────────────────────────

function FeedCard({ post }: { post: (typeof FEED)[0] }) {
  const [helped, setHelped] = useState(false);
  return (
    <div className="bg-white rounded-[14px] border border-black/[0.08] p-4 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-shadow cursor-pointer">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-[0.9rem] font-bold flex-shrink-0" style={{ background: post.avatarBg, color: post.avatarColor }}>
          {post.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[0.8rem] font-semibold truncate">{post.author}</div>
          <div className="text-[0.72rem] text-[#888070]">{post.time}</div>
        </div>
        <span className={`text-[0.68rem] px-2 py-[3px] rounded-full font-semibold whitespace-nowrap ${post.catStyle}`}>{post.cat}</span>
      </div>
      <div className="text-[0.92rem] font-bold mb-1">{post.title}</div>
      <div className="text-[0.8rem] text-[#888070] mb-3 line-clamp-2">{post.preview}</div>
      <div className="flex flex-wrap gap-1 mb-3">
        {post.tags.map(t => (
          <span key={t} className="text-[0.68rem] bg-[#F5F3EE] border border-black/[0.08] rounded-full px-2 py-[2px] text-[#888070]">#{t}</span>
        ))}
      </div>
      <div className="flex gap-3 items-center pt-2 border-t border-black/[0.08]">
        <span className="text-[0.75rem] text-[#888070]">👁 {post.views}</span>
        <span className="text-[0.75rem] text-[#888070]">💬 {post.comments}</span>
        <span className="text-[0.75rem] text-[#888070]">❤️ {post.likes}</span>
        <button onClick={() => setHelped(true)} className={`ml-auto text-[0.75rem] font-semibold bg-[#F5F3EE] border border-black/[0.08] rounded-lg px-3 py-1 ${helped ? "text-[#2B7A50]" : "text-[#181614]"}`}>
          {helped ? "✓ 도움됨" : "👍 도움돼요"}
        </button>
      </div>
    </div>
  );
}

// ─── 메인 페이지 ───────────────────────────────────────────
export default function DemoPage() {
  const [activeNav, setActiveNav] = useState("홈");
  const [activeTab, setActiveTab] = useState("전체");

  return (
    <div className="min-h-screen bg-[#F5F3EE]">

      {/* ── 데모 안내 배너 ── */}
      <div className="fixed top-0 left-0 right-0 z-[999] bg-[#2050A0] text-white text-center py-[7px] text-[0.72rem]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        <strong>반응형 웹 프로토타입</strong> · 창 크기를 줄이면 모바일 레이아웃으로 전환됩니다
        <Link href="/" className="ml-4 underline opacity-70 hover:opacity-100">← 기존 모바일 뷰</Link>
      </div>

      <div className="pt-[34px] flex min-h-screen">

        {/* ══════════════════════════════════
            LEFT SIDEBAR — 데스크탑에서만 표시
        ══════════════════════════════════ */}
        <aside className="hidden md:flex flex-col fixed left-0 top-[34px] h-[calc(100vh-34px)] w-[220px] lg:w-[240px] bg-[#181614] z-50 overflow-y-auto">
          {/* 로고 */}
          <div className="px-5 py-5 border-b border-white/[0.06]">
            <div className="text-2xl font-bold tracking-tight text-white" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>
              SO<span className="text-[#D04020]">RI</span>
            </div>
            <div className="text-[0.65rem] text-white/30 mt-[2px]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              싱가포르 🇸🇬
            </div>
          </div>

          {/* 내비게이션 */}
          <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveNav(item.label)}
                className={`flex items-center gap-3 px-3 py-[10px] rounded-[10px] text-left transition-colors w-full ${
                  activeNav === item.label
                    ? "bg-white/10 text-white"
                    : "text-white/50 hover:bg-white/[0.06] hover:text-white/80"
                }`}
              >
                <span className="text-[1.1rem]">{item.icon}</span>
                <span className="text-[0.85rem] font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* 글쓰기 버튼 */}
          <div className="px-3 pb-5">
            <button className="w-full bg-[#D04020] text-white rounded-[10px] py-[10px] text-[0.85rem] font-bold hover:bg-[#B83515] transition-colors">
              ✏️ 글쓰기
            </button>
          </div>

          {/* 실시간 정보 (사이드바 하단) */}
          <div className="px-4 pb-5 border-t border-white/[0.06] pt-4">
            <div className="text-[0.62rem] text-white/30 mb-2 uppercase tracking-widest" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>실시간</div>
            {[
              { label: "SGD → KRW", value: "₩1,048" },
              { label: "날씨", value: "34°C 🌤" },
              { label: "MRT", value: "정상운행 ✓" },
            ].map((info) => (
              <div key={info.label} className="flex justify-between items-center py-[5px]">
                <span className="text-[0.72rem] text-white/40">{info.label}</span>
                <span className="text-[0.72rem] text-white/70 font-medium">{info.value}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* ══════════════════════════════════
            MAIN CONTENT
        ══════════════════════════════════ */}
        <main className="flex-1 md:ml-[220px] lg:ml-[240px] lg:mr-[300px] min-h-screen">

          {/* 모바일 TopNav — md 이상에서는 숨김 */}
          <div className="md:hidden sticky top-[34px] z-40 bg-[rgba(245,243,238,0.92)] backdrop-blur-md border-b border-black/[0.08] px-4 h-[56px] flex items-center justify-between">
            <div className="text-xl font-bold tracking-tight" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>
              SO<span className="text-[#D04020]">RI</span>
            </div>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-[8px] border border-black/[0.08] bg-white flex items-center justify-center text-sm">🔔</button>
              <button className="w-8 h-8 rounded-[8px] border border-black/[0.08] bg-white flex items-center justify-center text-sm">🤍</button>
            </div>
          </div>

          {/* 데스크탑 페이지 헤더 */}
          <div className="hidden md:block sticky top-[34px] z-40 bg-[rgba(245,243,238,0.95)] backdrop-blur-md border-b border-black/[0.08] px-6 h-[56px] flex items-center justify-between">
            <div className="flex items-center justify-between w-full h-full">
              <h1 className="text-[1rem] font-bold tracking-tight">홈 피드</h1>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[0.85rem] text-[#888070]">🔍</span>
                <input type="text" placeholder="검색..." className="bg-white border border-black/[0.08] rounded-full py-[6px] pl-9 pr-4 text-[0.82rem] outline-none w-[200px] placeholder:text-[#C0BBB0]" />
              </div>
            </div>
          </div>

          <div className="p-4 md:px-6 md:py-5">

            {/* 라이브 바 (모바일) */}
            <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide md:hidden">
              {["💱 SGD $1 = ₩1,048", "🌤 34°C 습도 78%", "🚇 MRT 정상운행", "📢 한인회 6월 행사"].map((chip) => (
                <div key={chip} className="flex-shrink-0 bg-white border border-black/[0.08] rounded-full px-3 py-[5px] text-[0.75rem] whitespace-nowrap">{chip}</div>
              ))}
            </div>

            {/* 카테고리 탭 */}
            <div className="flex gap-1 mb-5 overflow-x-auto scrollbar-hide">
              {["전체", "생활정보", "맛집", "취업정보", "금융/투자", "부동산", "익명", "벼룩시장"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-shrink-0 px-3 py-[6px] rounded-full text-[0.8rem] font-medium transition-all ${
                    activeTab === tab ? "bg-[#181614] text-white" : "text-[#888070] hover:text-[#181614]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* 핫딜 배너 */}
            <div className="bg-gradient-to-r from-[#1A1614] to-[#2A2010] rounded-[14px] p-4 flex items-center justify-between gap-3 mb-5">
              <div>
                <div className="text-[0.65rem] text-[#D04020] font-bold mb-1" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>🔥 TODAY&apos;S DEAL</div>
                <div className="text-white font-bold text-[0.9rem] leading-tight">FairPrice 주간 특가 · 항공권 최저가</div>
                <div className="text-white/50 text-[0.72rem] mt-1">매일 업데이트</div>
              </div>
              <button className="flex-shrink-0 bg-[#D04020] text-white rounded-[10px] px-4 py-2 text-[0.8rem] font-bold">보러가기</button>
            </div>

            {/* 피드 */}
            <div className="flex flex-col gap-3">
              {FEED.map((post) => <FeedCard key={post.id} post={post} />)}
            </div>
          </div>
        </main>

        {/* ══════════════════════════════════
            RIGHT PANEL — lg 이상에서만 표시
        ══════════════════════════════════ */}
        <aside className="hidden lg:flex flex-col fixed right-0 top-[34px] h-[calc(100vh-34px)] w-[300px] border-l border-black/[0.06] bg-[#F5F3EE] overflow-y-auto p-5 gap-5">

          {/* 검색 */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[0.9rem] text-[#888070]">🔍</span>
            <input type="text" placeholder="검색..." className="w-full bg-white border border-black/[0.08] rounded-full py-[9px] pl-9 pr-4 text-[0.82rem] outline-none placeholder:text-[#C0BBB0]" />
          </div>

          {/* 실시간 정보 위젯 */}
          <div className="bg-white rounded-[14px] border border-black/[0.08] p-4">
            <div className="text-[0.78rem] font-bold mb-3 flex items-center gap-2">
              실시간 정보
              <span className="w-[6px] h-[6px] rounded-full bg-[#2B7A50] animate-pulse-dot" />
            </div>
            {[
              { icon: "💱", label: "SGD → KRW", value: "₩1,048", sub: "전일比 +2원" },
              { icon: "🌤", label: "싱가포르 날씨", value: "34°C", sub: "습도 78%" },
              { icon: "🚇", label: "MRT 상태", value: "정상운행", sub: "전 노선" },
            ].map((info) => (
              <div key={info.label} className="flex items-center gap-3 py-2 border-b border-black/[0.04] last:border-0">
                <span className="text-lg">{info.icon}</span>
                <div className="flex-1">
                  <div className="text-[0.72rem] text-[#888070]">{info.label}</div>
                  <div className="text-[0.85rem] font-bold">{info.value} <span className="text-[0.7rem] text-[#888070] font-normal">{info.sub}</span></div>
                </div>
              </div>
            ))}
          </div>

          {/* 최신 채용 */}
          <div className="bg-white rounded-[14px] border border-black/[0.08] p-4">
            <div className="flex justify-between items-center mb-3">
              <div className="text-[0.78rem] font-bold">최신 채용공고</div>
              <Link href="/jobs" className="text-[0.72rem] text-[#D04020]">전체보기</Link>
            </div>
            <div className="flex flex-col gap-2">
              {JOBS_PREVIEW.map((job) => (
                <div key={job.title} className={`rounded-[10px] p-3 ${job.bg}`}>
                  <div className="text-[0.82rem] font-bold">{job.title}</div>
                  <div className="text-[0.72rem] text-[#888070] mt-[2px]">{job.company}</div>
                  <div className="flex gap-2 mt-2">
                    <span className="text-[0.68rem] bg-white/70 px-2 py-[2px] rounded-full text-[#2050A0] font-medium">{job.visa}</span>
                    <span className="text-[0.68rem] bg-white/70 px-2 py-[2px] rounded-full text-[#2B7A50] font-medium">{job.salary}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 인기 업소 */}
          <div className="bg-white rounded-[14px] border border-black/[0.08] p-4">
            <div className="flex justify-between items-center mb-3">
              <div className="text-[0.78rem] font-bold">인기 한인 업소</div>
              <Link href="/business" className="text-[0.72rem] text-[#D04020]">전체보기</Link>
            </div>
            {[
              { emoji: "🍱", name: "강남부식", cat: "한식 · Tanjong Pagar", rating: "4.8" },
              { emoji: "💅", name: "서울뷰티", cat: "뷰티 · Orchard", rating: "4.6" },
              { emoji: "🛒", name: "K-마트", cat: "마트 · Buona Vista", rating: "4.5" },
            ].map((biz) => (
              <div key={biz.name} className="flex items-center gap-3 py-2 border-b border-black/[0.04] last:border-0">
                <div className="w-9 h-9 bg-[#F5F3EE] rounded-[8px] flex items-center justify-center text-lg">{biz.emoji}</div>
                <div className="flex-1">
                  <div className="text-[0.82rem] font-bold">{biz.name}</div>
                  <div className="text-[0.7rem] text-[#888070]">{biz.cat}</div>
                </div>
                <div className="text-[0.75rem] font-bold text-[#B07010]">★ {biz.rating}</div>
              </div>
            ))}
          </div>

          {/* 푸터 */}
          <div className="text-[0.65rem] text-[#C0BBB0] leading-relaxed" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            SORI · 싱가포르 한인 커뮤니티<br/>
            © 2025 · 반응형 웹 프로토타입
          </div>
        </aside>
      </div>

      {/* ── 모바일 하단 네비 (md 미만에서만) ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-[70px] bg-[rgba(255,255,255,0.94)] backdrop-blur-md border-t border-black/[0.08] flex items-center px-2 pb-1 z-50">
        {NAV_ITEMS.slice(0, 5).map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveNav(tab.label)}
            className="flex-1 flex flex-col items-center gap-[3px] py-2 rounded-[10px] hover:bg-[#F5F3EE] transition-colors"
          >
            <span className={`text-[1.2rem] transition-transform ${activeNav === tab.label ? "scale-[1.15]" : ""}`}>{tab.icon}</span>
            <span className={`text-[0.6rem] font-medium ${activeNav === tab.label ? "text-[#D04020] font-bold" : "text-[#888070]"}`}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      {/* 모바일 하단 여백 */}
      <div className="md:hidden h-[70px]" />
    </div>
  );
}
