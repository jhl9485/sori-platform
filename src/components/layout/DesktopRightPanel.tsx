import Link from "next/link";
import { COMMUNITY_POSTS } from "@/data/communityPosts";
import { JOBS } from "@/data/jobs";
import { BUSINESSES } from "@/data/businesses";
import DesktopLiveInfo from "./DesktopLiveInfo";

// 실제 데이터에서 인기/최신 추출 (좋아요·조회수 기준)
const HOT_POSTS = [...COMMUNITY_POSTS]
  .sort((a, b) => parseInt(b.views.replace(/,/g, "")) - parseInt(a.views.replace(/,/g, "")))
  .slice(0, 3);

const JOBS_PREVIEW = JOBS.slice(0, 3);
const BIZ_PREVIEW = BUSINESSES.slice(0, 3);

export default function DesktopRightPanel() {
  return (
    <aside className="fixed top-0 right-0 h-screen w-[288px] border-l border-black/[0.06] bg-[#F5F3EE] overflow-y-auto flex flex-col gap-4 p-5 scrollbar-hide">

      {/* 검색 */}
      <Link
        href="/search"
        className="flex items-center bg-white border border-black/[0.08] rounded-full px-4 py-[8px] mt-1 hover:border-black/[0.15] transition-colors"
      >
        <span className="text-[0.88rem] text-[#888070] mr-2 leading-none flex-shrink-0">🔍</span>
        <span className="text-[0.82rem] text-[#C0BBB0]">검색...</span>
      </Link>

      {/* 실시간 정보 */}
      <DesktopLiveInfo />

      {/* 🔥 인기 게시글 */}
      <div className="bg-white rounded-[14px] border border-black/[0.08] p-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[0.78rem] font-bold">🔥 이번 주 인기글</span>
          <Link href="/community" className="text-[0.7rem] text-[#D04020] hover:underline">전체보기</Link>
        </div>
        <div className="flex flex-col gap-2">
          {HOT_POSTS.map((post, i) => (
            <Link href={`/community/${post.id}`} key={post.id} className="flex items-start gap-2 group">
              <span className="text-[0.65rem] font-bold text-[#D04020] w-4 flex-shrink-0 mt-[2px]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[0.78rem] font-medium group-hover:text-[#D04020] transition-colors line-clamp-1">{post.title}</div>
                <div className="text-[0.68rem] text-[#888070] mt-[2px]">{post.categoryLabel} · 👁 {post.views}</div>
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
            <Link href={`/jobs/${job.id}`} key={job.id} className="flex items-center gap-2 group py-1">
              <div className={`w-8 h-8 rounded-[8px] flex items-center justify-center text-base flex-shrink-0 ${job.companyBg}`}>
                {job.companyIcon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[0.78rem] font-medium truncate group-hover:text-[#D04020] transition-colors">{job.title}</div>
                <div className="text-[0.68rem] text-[#888070]">{job.company} · {job.salary}</div>
              </div>
              <span className="text-[0.62rem] bg-[#EBF0FB] text-[#2050A0] px-[5px] py-[2px] rounded-full font-medium flex-shrink-0">
                {job.visaType}
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
            <Link href={`/business/${biz.id}`} key={biz.id} className="flex items-center gap-3 py-[9px] first:pt-0 last:pb-0 group">
              <div className="w-9 h-9 rounded-[10px] bg-[#F5F3EE] flex items-center justify-center text-xl flex-shrink-0">{biz.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="text-[0.8rem] font-bold group-hover:text-[#D04020] transition-colors">{biz.name}</div>
                <div className="text-[0.68rem] text-[#888070] truncate">{biz.category} · {biz.area}</div>
              </div>
              <div className="flex flex-col items-end flex-shrink-0">
                <span className="text-[0.75rem] font-bold text-[#B07010]">★ {biz.rating}</span>
                <span className={`text-[0.62rem] font-medium ${biz.isOpen ? "text-[#2B7A50]" : "text-[#888070]"}`}>{biz.isOpen ? "영업중" : "영업종료"}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 푸터 */}
      <div className="text-[0.63rem] text-[#C0BBB0] leading-relaxed pb-2" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        SORI · 싱가포르 한인 커뮤니티<br/>
        © 2026 · All rights reserved
      </div>
    </aside>
  );
}
