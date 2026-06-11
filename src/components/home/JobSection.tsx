"use client";

import { useMemo } from "react";
import Link from "next/link";
import { JOBS, type Job } from "@/data/jobs";
import { useUserJobs } from "@/lib/userContent";

// 사용자 등록 공고 + 정적 공고 통합, 최신 3개 노출
export default function JobSection() {
  const userJobs = useUserJobs();

  const featured = useMemo(() => {
    // 사용자 공고가 먼저(가장 최신), 그 다음 정적 데이터
    return [...userJobs, ...JOBS].slice(0, 3);
  }, [userJobs]);

  return (
    <section className="mt-1">
      <div className="h-px bg-black/[0.08] mx-4 mb-5" />
      <div className="flex justify-between items-center px-4 pb-[10px]">
        <h2 className="text-base font-bold tracking-tight">최신 채용공고</h2>
        <Link href="/jobs" className="text-[0.78rem] text-[#D04020] font-medium hover:underline">전체보기</Link>
      </div>
      <div className="flex gap-[10px] px-4 pb-[10px] overflow-x-auto scrollbar-hide">
        {featured.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
}

function JobCard({ job }: { job: Job }) {
  const isUser = job.id.startsWith("user-");

  return (
    <Link
      href={`/jobs/${job.id}`}
      className="flex-shrink-0 w-[220px] block bg-white rounded-[14px] border border-black/[0.08] p-[14px] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all"
    >
      <div className="flex items-start justify-between mb-2">
        <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center text-[1.1rem] ${job.companyBg}`}>
          {job.companyIcon}
        </div>
        {isUser && (
          <span className="text-[0.55rem] bg-[#2B7A50] text-white px-[5px] py-[1px] rounded font-bold">내 공고</span>
        )}
      </div>
      <div className="text-[0.85rem] font-bold mb-[2px] line-clamp-1">{job.title}</div>
      <div className="text-[0.75rem] text-[#888070] mb-2 line-clamp-1">{job.company}</div>
      <div className="flex flex-wrap gap-1">
        <span className="text-[0.68rem] border rounded-[6px] px-[7px] py-[2px] bg-[#EBF0FB] text-[#2050A0] border-[rgba(32,80,160,0.15)]">
          {job.visaSponsored ? `${job.visaType} 스폰서` : job.visaType}
        </span>
        {job.koreanRequired && (
          <span className="text-[0.68rem] border rounded-[6px] px-[7px] py-[2px] bg-[#FBF0EC] text-[#D04020] border-[rgba(208,64,32,0.15)]">
            한국어 必
          </span>
        )}
        <span className="text-[0.68rem] border rounded-[6px] px-[7px] py-[2px] bg-[#F5F3EE] text-[#888070] border-black/[0.08]">
          {job.salary}
        </span>
      </div>
    </Link>
  );
}
