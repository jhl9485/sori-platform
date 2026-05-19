import Link from "next/link";
import RightPanelAd from "@/components/ads/RightPanelAd";

const LIVE_INFO = [
  { icon: "💱", label: "SGD → KRW", value: "₩1,048", sub: "+2원" },
  { icon: "🌤", label: "싱가포르", value: "34°C", sub: "습도 78%" },
  { icon: "🚇", label: "MRT", value: "정상운행", sub: "전 노선" },
];

const JOBS_PREVIEW = [
  { icon: "📱", bg: "bg-[#EBF0FB]", title: "Senior Software Engineer", company: "Samsung SG", salary: "$8K~12K", visa: "EP" },
  { icon: "🍱", bg: "bg-[#EBF5F0]", title: "한식 조리사", company: "강남부식", salary: "$3.5K~4.5K", visa: "S-Pass" },
  { icon: "✈️", bg: "bg-[#FBF5E8]", title: "항공사 지상직", company: "Korean Air SG", salary: "$3.2K~4K", visa: "무관" },
];

const BIZ_PREVIEW = [
  { emoji: "🍱", name: "강남부식", cat: "한식 · Tanjong Pagar", rating: "4.8", open: true },
  { emoji: "💅", name: "서울뷰티", cat: "뷰티 · Orchard", rating: "4.6", open: true },
  { emoji: "🛒", name: "K-마트", cat: "마트 · Buona Vista", rating: "4.5", open: true },
];

const HOT_POSTS = [
  { cat: "취업", title: "IT 기업 싱가포르 취업 성공기", views: "3,401" },
  { cat: "금융", title: "한국 주식 양도소득세 2025 정리", views: "4,521" },
  { cat: "생활", title: "OCBC 계좌 개설 최신 후기", views: "1,234" },
];

export default function DesktopRightPanel() {
  return (
    <aside className="fixed top-0 right-0 h-screen w-[288px] border-l border-black/[0.06] bg-[#F5F3EE] overflow-y-auto flex flex-col gap-4 p-5 scrollbar-hide">

      {/* 검색 */}
      <div className="relative mt-1">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[0.88rem] text-[#888070] pointer-events-none">🔍</span>
        <input
          type="text"
          placeholder="검색..."
          className="w-full bg-white border border-black/[0.08] rounded-full py-[8px] pl-9 pr-4 text-[0.82rem] outline-none placeholder:text-[#C0BBB0] focus:border-black/[0.15] transition-colors"
        />
      </div>

      {/* 실시간 정보 */}
      <div className="bg-white rounded-[14px] border border-black/[0.08] p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[0.78rem] font-bold">실시간 정보</span>
          <span className="w-[6px] h-[6px] rounded-full bg-[#2B7A50] animate-pulse-dot flex-shrink-0" />
        </div>
        <div className="flex flex-col divide-y divide-black/[0.04]">
          {LIVE_INFO.map((info) => (
            <div key={info.label} className="flex items-center gap-3 py-[9px] first:pt-0 last:pb-0">
              <span className="text-lg flex-shrink-0 w-6 text-center">{info.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-[0.7rem] text-[#888070]">{info.label}</div>
                <div className="text-[0.85rem] font-bold text-[#181614]">
                  {info.value}
                  <span className="text-[0.7rem] text-[#888070] font-normal ml-1">{info.sub}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ⑥ 우측 패널 광고 — 데스크탑 사이드바 노출 ($200~400/월) */}
      <RightPanelAd />

      {/* 🔥 인기 게시글 */}
      <div className="bg-white rounded-[14px] border border-black/[0.08] p-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[0.78rem] font-bold">🔥 이번 주 인기글</span>
        </div>
        <div className="flex flex-col gap-2">
          {HOT_POSTS.map((post, i) => (
            <Link href="/community" key={i} className="flex items-start gap-2 group">
              <span className="text-[0.65rem] font-bold text-[#D04020] w-4 flex-shrink-0 mt-[2px]"style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[0.78rem] font-medium group-hover:text-[#D04020] transition-colors line-clamp-1">{post.title}</div>
                <div className="text-[0.68rem] text-[#888070] mt-[2px]">{post.cat} · 👁 {post.views}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 최신 채용 */}
      <div className="bg-white rounded-[14px] border border-black/[0.08] p-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[0.78rem] font-bold">최신 채용공고</span>
          <Link href="/jobs" className="text-[0.7rem] text-[#D04020] hover:underline">전체보기</Link>
        </div>
        <div className="flex flex-col gap-2">
          {JOBS_PREVIEW.map((job) => (
            <Link href="/jobs" key={job.title} className="flex items-center gap-2 group py-1">
              <div className={`w-8 h-8 rounded-[8px] flex items-center justify-center text-base flex-shrink-0 ${job.bg}`}>
                {job.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[0.78rem] font-medium truncate group-hover:text-[#D04020] transition-colors">{job.title}</div>
                <div className="text-[0.68rem] text-[#888070]">{job.company} · {job.salary}</div>
              </div>
              <span className="text-[0.62rem] bg-[#EBF0FB] text-[#2050A0] px-[5px] py-[2px] rounded-full font-medium flex-shrink-0">
                {job.visa}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* 인기 업소 */}
      <div className="bg-white rounded-[14px] border border-black/[0.08] p-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[0.78rem] font-bold">인기 한인 업소</span>
          <Link href="/business" className="text-[0.7rem] text-[#D04020] hover:underline">전체보기</Link>
        </div>
        <div className="flex flex-col divide-y divide-black/[0.04]">
          {BIZ_PREVIEW.map((biz) => (
            <Link href="/business" key={biz.name} className="flex items-center gap-3 py-[9px] first:pt-0 last:pb-0 group">
              <div className="w-9 h-9 rounded-[10px] bg-[#F5F3EE] flex items-center justify-center text-xl flex-shrink-0">{biz.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="text-[0.8rem] font-bold group-hover:text-[#D04020] transition-colors">{biz.name}</div>
                <div className="text-[0.68rem] text-[#888070] truncate">{biz.cat}</div>
              </div>
              <div className="flex flex-col items-end flex-shrink-0">
                <span className="text-[0.75rem] font-bold text-[#B07010]">★ {biz.rating}</span>
                <span className="text-[0.62rem] text-[#2B7A50] font-medium">{biz.open ? "영업중" : "영업종료"}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 푸터 */}
      <div className="text-[0.63rem] text-[#C0BBB0] leading-relaxed pb-2" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        SORI · 싱가포르 한인 커뮤니티<br/>
        © 2025 · All rights reserved
      </div>
    </aside>
  );
}
