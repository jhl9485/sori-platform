"use client";

import { useMemo } from "react";
import Link from "next/link";
import { COMMUNITY_POSTS } from "@/data/communityPosts";
import { JOBS } from "@/data/jobs";
import { BUSINESSES } from "@/data/businesses";
import { useUserPosts, useUserJobs, useUserBiz } from "@/lib/userContent";

/**
 * 데스크탑 우측 패널의 인기 게시글 / 채용 / 업소 리스트.
 * 사용자가 등록한 글까지 포함해서 표시한다. (이전엔 정적 데이터만 보고 사용자 글 무시)
 */
export default function DesktopRightLists() {
  const userPosts = useUserPosts();
  const userJobs = useUserJobs();
  const userBiz = useUserBiz();

  const hotPosts = useMemo(() => {
    const merged = [...userPosts, ...COMMUNITY_POSTS];
    return [...merged]
      .sort((a, b) => parseInt(b.views.replace(/,/g, "")) - parseInt(a.views.replace(/,/g, "")))
      .slice(0, 3);
  }, [userPosts]);

  const jobsPreview = useMemo(() => [...userJobs, ...JOBS].slice(0, 3), [userJobs]);

  const bizPreview = useMemo(() => {
    const merged = [...userBiz, ...BUSINESSES];
    // 평점·리뷰 기준 상위 노출 (사용자 업소는 평점 0이라 뒤로 가지만 "내 업소" 배지로 노출)
    return [...merged]
      .sort((a, b) => (b.rating || 0) * 100 + (b.reviewCount || 0) - ((a.rating || 0) * 100 + (a.reviewCount || 0)))
      .slice(0, 3);
  }, [userBiz]);

  return (
    <>
      {/* 🔥 인기 게시글 */}
      <div className="bg-white rounded-[14px] border border-black/[0.08] p-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[0.78rem] font-bold">🔥 이번 주 인기글</span>
          <Link href="/community" className="text-[0.7rem] text-[#D04020] hover:underline">전체보기</Link>
        </div>
        <div className="flex flex-col gap-2">
          {hotPosts.map((post, i) => (
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
          {jobsPreview.map((job) => (
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
          {bizPreview.map((biz) => (
            <Link href={`/business/${biz.id}`} key={biz.id} className="flex items-center gap-3 py-[9px] first:pt-0 last:pb-0 group">
              <div className="w-9 h-9 rounded-[10px] bg-[#F5F3EE] flex items-center justify-center text-xl flex-shrink-0 overflow-hidden">
                {biz.photos && biz.photos.length > 0 ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={biz.photos[0]} alt={biz.name} loading="lazy" className="w-full h-full object-cover" />
                ) : biz.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[0.8rem] font-bold group-hover:text-[#D04020] transition-colors line-clamp-1">{biz.name}</div>
                <div className="text-[0.68rem] text-[#888070] truncate">{biz.category} · {biz.area}</div>
              </div>
              <div className="flex flex-col items-end flex-shrink-0">
                {biz.rating > 0 && <span className="text-[0.75rem] font-bold text-[#B07010]">★ {biz.rating}</span>}
                <span className={`text-[0.62rem] font-medium ${biz.isOpen ? "text-[#2B7A50]" : "text-[#888070]"}`}>{biz.isOpen ? "영업중" : "영업종료"}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
