"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { JOBS, type VisaType, type JobType } from "@/data/jobs";
import SponsoredJobCard from "@/components/ads/SponsoredJobCard";
import { useUserJobs } from "@/lib/userContent";

const VISA_FILTERS: { label: string; value: VisaType | "전체" }[] = [
  { label: "전체", value: "전체" },
  { label: "EP 스폰서", value: "EP" },
  { label: "S-Pass", value: "S-Pass" },
  { label: "WP", value: "WP" },
  { label: "비자무관", value: "무관" },
];

const TYPE_FILTERS: { label: string; value: JobType | "전체" }[] = [
  { label: "전체", value: "전체" },
  { label: "정규직", value: "정규직" },
  { label: "계약직", value: "계약직" },
  { label: "파트타임", value: "파트타임" },
  { label: "인턴", value: "인턴" },
];

export default function JobsPage() {
  const [visaFilter, setVisaFilter] = useState<VisaType | "전체">("전체");
  const [typeFilter, setTypeFilter] = useState<JobType | "전체">("전체");
  const [koreanOnly, setKoreanOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const userJobs = useUserJobs();
  const allJobs = useMemo(() => [...userJobs, ...JOBS], [userJobs]);
  const userIds = useMemo(() => new Set(userJobs.map((u) => u.id)), [userJobs]);

  const filtered = allJobs.filter((job) => {
    if (visaFilter !== "전체" && job.visaType !== visaFilter) return false;
    if (typeFilter !== "전체" && job.jobType !== typeFilter) return false;
    if (koreanOnly && !job.koreanRequired) return false;
    if (searchQuery && !job.title.includes(searchQuery) && !job.company.includes(searchQuery) && !job.tags.some(t => t.includes(searchQuery))) return false;
    return true;
  });

  return (
    <div className="max-w-[900px] mx-auto px-4 md:px-6">
      {/* 헤더 */}
      <div className="pt-4 md:pt-7 pb-4">
        <h1 className="text-[1.2rem] md:text-[1.4rem] font-bold tracking-tight">구인구직</h1>
        <p className="text-[0.75rem] text-[#888070] mt-[2px]">싱가포르 한인 채용 · EP/S-Pass 스폰서 포함</p>
      </div>

      {/* 검색 */}
      <div className="pb-3 relative">
        <span className="absolute left-3 inset-y-0 flex items-center text-[0.9rem] text-[#888070] pointer-events-none leading-none">🔍</span>
        <input type="text" placeholder="직종, 회사, 기술스택 검색..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-black/[0.08] rounded-full py-[10px] pl-10 pr-4 text-[0.85rem] outline-none placeholder:text-[#888070] font-[inherit] focus:border-black/[0.15] transition-colors" />
      </div>

      {/* 필터 바 */}
      <div className="flex flex-wrap gap-2 pb-4">
        {VISA_FILTERS.map((f) => (
          <button key={f.value} onClick={() => setVisaFilter(f.value)}
            className={`px-3 py-[5px] rounded-full text-[0.75rem] font-medium border transition-all ${visaFilter === f.value ? "bg-[#181614] text-white border-[#181614]" : "bg-white text-[#888070] border-black/[0.08] hover:border-black/[0.15]"}`}>
            {f.label}
          </button>
        ))}
        <div className="w-full h-px bg-black/[0.05] my-1" />
        {TYPE_FILTERS.map((f) => (
          <button key={f.value} onClick={() => setTypeFilter(f.value)}
            className={`px-3 py-[5px] rounded-full text-[0.75rem] font-medium border transition-all ${typeFilter === f.value ? "bg-[#2B7A50] text-white border-[#2B7A50]" : "bg-white text-[#888070] border-black/[0.08] hover:border-black/[0.15]"}`}>
            {f.label}
          </button>
        ))}
        <button onClick={() => setKoreanOnly(!koreanOnly)}
          className={`px-3 py-[5px] rounded-full text-[0.75rem] font-medium border transition-all ${koreanOnly ? "bg-[#D04020] text-white border-[#D04020]" : "bg-white text-[#888070] border-black/[0.08]"}`}>
          🇰🇷 한국어 필수
        </button>
      </div>

      {/* 결과 수 + 등록 */}
      <div className="flex items-center justify-between pb-3 gap-2">
        <span className="text-[0.75rem] text-[#888070]">
          <span className="font-bold text-[#181614]">{filtered.length}개</span> 공고
        </span>
        <div className="flex items-center gap-2">
          <button className="text-[0.75rem] text-[#888070]">최신순 ▾</button>
          <Link
            href="/jobs/write"
            className="bg-[#2B7A50] text-white text-[0.75rem] font-bold px-3 py-[6px] rounded-[10px] hover:bg-[#246642] transition-colors flex items-center gap-1"
          >
            📋 공고 등록
          </Link>
        </div>
      </div>

      {/* 공고 목록 — 데스크탑 2열 그리드 */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-[#888070]">
          <div className="text-4xl mb-3">🔍</div>
          <div className="text-[0.85rem] font-medium">검색 결과가 없어요</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-6">
          {/* ⑤ 스폰서 채용공고 — 상단 고정 노출 ($80~150/월) */}
          <SponsoredJobCard />
          {filtered.map((job) => (
            <Link key={job.id} href={`/jobs/${job.id}`} className="block bg-white rounded-[14px] border border-black/[0.08] p-4 cursor-pointer hover:shadow-[0_4px_16px_rgba(0,0,0,0.07)] hover:-translate-y-[1px] transition-all">
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center text-xl flex-shrink-0 ${job.companyBg}`}>
                  {job.companyIcon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 flex-wrap">
                    {userIds.has(job.id) && <span className="text-[0.6rem] bg-[#2B7A50] text-white px-[5px] py-[1px] rounded font-bold">내 공고</span>}
                    {!userIds.has(job.id) && job.isNew && <span className="text-[0.6rem] bg-[#D04020] text-white px-[5px] py-[1px] rounded font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>NEW</span>}
                    {!userIds.has(job.id) && job.isUrgent && <span className="text-[0.6rem] bg-[#B07010] text-white px-[5px] py-[1px] rounded font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>급구</span>}
                  </div>
                  <div className="text-[0.88rem] font-bold mt-[2px] leading-tight">{job.title}</div>
                  <div className="text-[0.75rem] text-[#888070]">{job.company}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-[6px] mb-3">
                <span className="text-[0.72rem] bg-[#EBF0FB] text-[#2050A0] px-2 py-[3px] rounded-full font-medium">{job.visaSponsored ? `${job.visaType} 스폰서` : job.visaType}</span>
                <span className="text-[0.72rem] bg-[#F0EDE8] text-[#888070] px-2 py-[3px] rounded-full">{job.jobType}</span>
                {job.koreanRequired && <span className="text-[0.72rem] bg-[#FBF0EC] text-[#D04020] px-2 py-[3px] rounded-full font-medium">🇰🇷 한국어 필수</span>}
                <span className="text-[0.72rem] bg-[#EBF5F0] text-[#2B7A50] px-2 py-[3px] rounded-full font-medium">💰 {job.salary}</span>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {job.tags.map((tag) => <span key={tag} className="text-[0.68rem] bg-[#F5F3EE] border border-black/[0.08] rounded-full px-2 py-[2px] text-[#888070]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{tag}</span>)}
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-black/[0.06]">
                <div className="flex items-center gap-3 text-[0.72rem] text-[#888070]">
                  <span>📍 {job.location}</span>
                  <span>👤 {job.applicants}명</span>
                </div>
                <span className="text-[0.7rem] text-[#888070]">{job.postedAt}</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      <Link
        href="/jobs/write"
        className="fixed bottom-[76px] md:bottom-8 right-4 md:right-8 xl:right-[312px] w-12 h-12 bg-[#2B7A50] text-white rounded-full shadow-[0_4px_16px_rgba(43,122,80,0.35)] flex items-center justify-center text-xl leading-none z-40 hover:bg-[#246642] hover:scale-105 transition-all"
        aria-label="공고 등록"
      >
        📋
      </Link>
    </div>
  );
}
