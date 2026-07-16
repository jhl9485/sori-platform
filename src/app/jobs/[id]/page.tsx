"use client";

import { notFound } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import OwnerActions from "@/components/shared/OwnerActions";
import DetailSkeleton from "@/components/shared/DetailSkeleton";
import { JOBS } from "@/data/jobs";
import { useUserJobs } from "@/lib/userContent";
import { useHydrated } from "@/lib/hooks";
import DetailActions from "@/components/shared/DetailActions";
import JobContact from "@/components/jobs/JobContact";
import JobQuestions from "@/components/jobs/JobQuestions";
import { LIKE_KEY, VIEW_KEY, SAVE_KEY, useMarkViewed } from "@/lib/metrics";
import { exactTime, resolveISO } from "@/lib/format";
import { isJobClosed, salaryText } from "@/lib/jobStatus";

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const hydrated = useHydrated();
  const userJobs = useUserJobs();
  const job = userJobs.find((j) => j.id === params.id) || JOBS.find((j) => j.id === params.id);
  useMarkViewed(VIEW_KEY.jobs, job?.id);

  if (!job) {
    if (!hydrated) return <DetailSkeleton />;
    return notFound();
  }

  // 사용자가 직접 올린 공고인지 = 답변할 작성자가 존재하는지
  const isUserJob = userJobs.some((j) => j.id === params.id);
  const isMine = isUserJob;
  const closed = isJobClosed(job.deadline);

  return (
    <div className="max-w-[680px] mx-auto">
      {/* 저장·공유는 아래 액션 바에 있으므로 헤더에는 두지 않는다 */}
      <PageHeader />

      {isMine && (
        <OwnerActions
          storageKey="sori_user_jobs"
          itemId={job.id}
          editHref={`/jobs/write?edit=${job.id}`}
          backHref="/jobs"
          label="내 공고"
        />
      )}

      {/* 마감된 공고 안내 배너 */}
      {closed && (
        <div className="bg-[#F0EDE8] border-y border-[#888070]/25 px-4 md:px-6 py-3 flex items-center gap-2">
          <span className="text-base">🔒</span>
          <span className="text-[0.82rem] font-bold text-[#888070]">마감된 공고예요 · 지원을 받지 않아요</span>
        </div>
      )}

      {/* 상단 회사 정보 */}
      <div className="bg-white px-4 md:px-6 pt-5 pb-4">
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-14 h-14 rounded-[14px] flex items-center justify-center text-2xl flex-shrink-0 ${job.companyBg}`}>
            {job.companyIcon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              {job.isNew && (
                <span className="text-[0.6rem] bg-[#D04020] text-white px-[5px] py-[1px] rounded font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>NEW</span>
              )}
              {job.isUrgent && (
                <span className="text-[0.6rem] bg-[#B07010] text-white px-[5px] py-[1px] rounded font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>급구</span>
              )}
            </div>
            <h1 className="text-[1rem] font-bold leading-tight mb-1">{job.title}</h1>
            <div className="text-[0.8rem] text-[#888070]">{job.company}</div>
          </div>
        </div>

        {/* 핵심 정보 칩 */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-[0.75rem] bg-[#EBF0FB] text-[#2050A0] px-3 py-[5px] rounded-full font-medium">
            {job.visaSponsored ? `${job.visaType} 스폰서` : job.visaType}
          </span>
          <span className="text-[0.75rem] bg-[#EBF5F0] text-[#2B7A50] px-3 py-[5px] rounded-full font-medium">
            💰 {salaryText(job.salary)}
          </span>
          <span className="text-[0.75rem] bg-[#F0EDE8] text-[#888070] px-3 py-[5px] rounded-full">
            {job.jobType}
          </span>
        </div>

        {/* 메타 정보 — 조회수는 아래 액션 바에 있으므로 여기서는 뺀다 */}
        <div className="flex items-center gap-4 text-[0.72rem] text-[#888070]">
          <span>📍 {job.location}</span>
        </div>

        {/* 액션 바 — 모든 카테고리 공통 배치 */}
        <DetailActions
          id={job.id}
          likeKey={LIKE_KEY.jobs}
          viewKey={VIEW_KEY.jobs}
          saveKey={SAVE_KEY.jobs}
          seedViews={job.views}
          shareTitle={job.title}
          shareText={`${job.company} · ${job.salary}`}
          className="mt-4"
        />
      </div>

      {/* 회사 소개 */}
      <div className="bg-white mt-2 px-4 md:px-6 py-5">
        <h2 className="text-[0.9rem] font-bold mb-2">회사 소개</h2>
        <p className="text-[0.82rem] text-[#888070] leading-relaxed">{job.companyDesc}</p>
      </div>

      {/* 직무 설명 */}
      <div className="bg-white mt-2 px-4 md:px-6 py-5">
        <h2 className="text-[0.9rem] font-bold mb-2">포지션 설명</h2>
        <p className="text-[0.82rem] text-[#181614] leading-relaxed">{job.description}</p>
      </div>

      {/* 자격요건 */}
      <div className="bg-white mt-2 px-4 md:px-6 py-5">
        <h2 className="text-[0.9rem] font-bold mb-3">자격 요건</h2>
        <ul className="space-y-2">
          {job.requirements.map((req, i) => (
            <li key={i} className="flex items-start gap-2 text-[0.82rem] text-[#181614]">
              <span className="text-[#D04020] flex-shrink-0 mt-[2px]">✓</span>
              {req}
            </li>
          ))}
        </ul>
      </div>

      {/* 우대사항 */}
      <div className="bg-white mt-2 px-4 md:px-6 py-5">
        <h2 className="text-[0.9rem] font-bold mb-3">우대 사항</h2>
        <ul className="space-y-2">
          {job.preferred.map((pref, i) => (
            <li key={i} className="flex items-start gap-2 text-[0.82rem] text-[#888070]">
              <span className="text-[#2B7A50] flex-shrink-0 mt-[2px]">+</span>
              {pref}
            </li>
          ))}
        </ul>
      </div>

      {/* 혜택 */}
      <div className="bg-white mt-2 px-4 md:px-6 py-5">
        <h2 className="text-[0.9rem] font-bold mb-3">혜택 및 복지</h2>
        <div className="flex flex-wrap gap-2">
          {job.benefits.map((benefit, i) => (
            <span key={i} className="text-[0.78rem] bg-[#EBF5F0] text-[#2B7A50] px-3 py-[5px] rounded-full">
              ✦ {benefit}
            </span>
          ))}
        </div>
      </div>

      {/* 마감일 */}
      <div className="bg-[#FBF0EC] mt-2 px-4 md:px-6 py-4 flex items-center justify-between">
        <div>
          <div className="text-[0.7rem] text-[#888070]">지원 마감일</div>
          <div className="text-[0.85rem] font-bold text-[#D04020]">{job.deadline}</div>
        </div>
        <div className="text-[0.7rem] text-[#888070]" suppressHydrationWarning>게시: {exactTime(resolveISO(job.createdAt, job.postedAt)) || job.postedAt}</div>
      </div>

      {/* 질문하기 — 사용자가 직접 올린 공고만 (시드 공고는 답변할 작성자가 없음) */}
      {isMine || isUserJob ? <JobQuestions jobId={job.id} isOwner={isMine} /> : null}

      {/* 담당자 연락처 — 맨 아래 */}
      <JobContact contact={job.contact} />

      <div className="h-4" />
    </div>
  );
}
