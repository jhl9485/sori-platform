"use client";

import { useMemo } from "react";
import Link from "next/link";
import { COMMUNITY_POSTS } from "@/data/communityPosts";
import { JOBS } from "@/data/jobs";
import { BUSINESSES } from "@/data/businesses";
import { useUserPosts, useUserJobs, useUserBiz } from "@/lib/userContent";
import { salaryText, isJobExpired } from "@/lib/jobStatus";
import BizReviewCount from "@/components/business/BizReviewCount";
import { useToggleSet } from "@/lib/storage";
import { VIEW_KEY } from "@/lib/metrics";
import { formatCount } from "@/lib/format";
import { toNum } from "@/components/shared/MetricRow";

/**
 * 데스크탑 우측 패널의 인기 게시글 / 채용 / 업소 리스트.
 * 사용자가 등록한 글까지 포함해서 표시한다. (이전엔 정적 데이터만 보고 사용자 글 무시)
 */
export default function DesktopRightLists() {
  const userPosts = useUserPosts();
  const userJobs = useUserJobs();
  const userBiz = useUserBiz();
  // 조회수는 카드·상세(MetricRow)와 똑같이 "시드 숫자 + (내가 봤으면 1)"로 계산해야 한다.
  // 넓은 화면에서는 같은 글이 가운데 카드와 이 목록에 동시에 보이므로, 여기서만 원본 숫자를
  // 쓰면 방금 읽은 글이 카드 48 / 우측 47처럼 어긋난다.
  const { has: isViewed } = useToggleSet(VIEW_KEY.community);

  const hotPosts = useMemo(() => {
    const merged = [...userPosts, ...COMMUNITY_POSTS];
    return [...merged]
      .sort((a, b) => parseInt(b.views.replace(/,/g, "")) - parseInt(a.views.replace(/,/g, "")))
      .slice(0, 3);
  }, [userPosts]);

  // 목록(jobs/page.tsx)·검색과 똑같은 규칙으로 만료 공고를 거른다. 1280px 이상에서는 목록과 이
  // 패널이 한 화면에 같이 보이는데, 여기만 필터가 없어서 목록에서 사라진 공고가 우측에 남았다.
  // 마감(closed)은 목록도 숨기지 않고 '마감' 표시로 남기므로 여기서도 같이 남긴다.
  const jobsPreview = useMemo(
    () => [...userJobs, ...JOBS].filter((job) => !isJobExpired(job.deadline)).slice(0, 3),
    [userJobs],
  );

  const bizPreview = useMemo(() => {
    // 최근 등록순(사용자 업소 → 시드). 업소가 쌓이면(약 50개↑) 조회수순으로 변경 예정.
    return [...userBiz, ...BUSINESSES].slice(0, 3);
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
                {/* 표기도 카드·상세와 같은 formatCount(4,123 → 4.1K)를 쓴다. 한 화면에 두 형식이 보이면 안 된다. */}
                <div className="text-[0.68rem] text-[#888070] mt-[2px]">
                  {post.categoryLabel} · 👁 {formatCount(toNum(post.views) + (isViewed(post.id) ? 1 : 0))}
                </div>
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
                <div className="text-[0.68rem] text-[#888070]">{job.company} · {salaryText(job.salary)}</div>
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
          <span className="text-[0.78rem] font-bold">새로 등록된 한인 업소</span>
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
                <BizReviewCount bizId={biz.id} seed={biz.reviewCount} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
