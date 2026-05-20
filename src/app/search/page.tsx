"use client";

import { useState } from "react";
import Link from "next/link";
import { COMMUNITY_POSTS } from "@/data/communityPosts";
import { BUSINESSES } from "@/data/businesses";
import { JOBS } from "@/data/jobs";
import { NEWS_ITEMS } from "@/data/newsItems";

const TABS = ["전체", "커뮤니티", "업소", "채용", "뉴스"];

const HOT_SEARCHES = ["OCBC 계좌", "EP 비자", "Tanjong Pagar 맛집", "감자탕", "한국어 강사", "콘도 렌트"];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("전체");

  const q = query.toLowerCase().trim();

  const postResults = COMMUNITY_POSTS.filter(
    (p) => p.title.includes(q) || p.preview.includes(q) || p.tags.some((t) => t.toLowerCase().includes(q))
  );
  const bizResults = BUSINESSES.filter(
    (b) => b.name.includes(q) || b.category.includes(q) || b.tags.some((t) => t.includes(q))
  );
  const jobResults = JOBS.filter(
    (j) => j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.tags.some((t) => t.toLowerCase().includes(q))
  );
  const newsResults = NEWS_ITEMS.filter(
    (n) => n.title.includes(q) || n.summary.includes(q) || n.category.includes(q)
  );

  const totalCount = postResults.length + bizResults.length + jobResults.length + newsResults.length;
  const hasResults = q.length > 0 && totalCount > 0;
  const noResults = q.length > 0 && totalCount === 0;

  return (
    <div className="max-w-[680px] mx-auto">
      {/* 검색 헤더 */}
      <div className="sticky top-0 z-40 bg-[rgba(245,243,238,0.95)] backdrop-blur-md border-b border-black/[0.07] px-4 md:px-6 py-3">
        <div className="flex items-center gap-2">
          <Link href="/" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/[0.06] transition-colors text-[#181614] flex-shrink-0">
            ←
          </Link>
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[0.9rem] text-[#888070] pointer-events-none">🔍</span>
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="검색어를 입력하세요..."
              className="w-full bg-white border border-black/[0.08] rounded-full py-[9px] pl-10 pr-4 text-[0.85rem] outline-none focus:border-black/[0.15] transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888070] text-sm"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* 탭 */}
        {hasResults && (
          <div className="flex gap-0 mt-2 overflow-x-auto scrollbar-hide">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-3 py-[5px] rounded-full text-[0.78rem] font-medium whitespace-nowrap transition-all ${
                  activeTab === tab ? "bg-[#181614] text-white" : "text-[#888070]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 검색 전: 인기 검색어 */}
      {!q && (
        <div className="px-4 md:px-6 py-5">
          <h2 className="text-[0.85rem] font-bold text-[#888070] mb-3">인기 검색어</h2>
          <div className="flex flex-wrap gap-2">
            {HOT_SEARCHES.map((term, i) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="flex items-center gap-1 bg-white border border-black/[0.08] rounded-full px-3 py-[6px] text-[0.78rem] hover:border-[#D04020] hover:text-[#D04020] transition-colors"
              >
                <span className="text-[#D04020] font-bold text-[0.65rem]">{i + 1}</span>
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 결과 없음 */}
      {noResults && (
        <div className="flex flex-col items-center justify-center py-20 text-[#888070]">
          <div className="text-5xl mb-4">🔍</div>
          <div className="text-[0.9rem] font-medium mb-1">&ldquo;{query}&rdquo; 검색 결과 없음</div>
          <div className="text-[0.78rem]">다른 키워드로 검색해보세요</div>
        </div>
      )}

      {/* 검색 결과 */}
      {hasResults && (
        <div className="pb-6">
          {/* 커뮤니티 */}
          {(activeTab === "전체" || activeTab === "커뮤니티") && postResults.length > 0 && (
            <section className="mt-3">
              <div className="px-4 md:px-6 py-2 bg-[#F5F3EE]">
                <span className="text-[0.75rem] font-bold text-[#888070]">커뮤니티 게시글 {postResults.length}개</span>
              </div>
              {postResults.map((post) => (
                <Link key={post.id} href={`/community/${post.id}`} className="block bg-white px-4 md:px-6 py-3 border-b border-black/[0.04] hover:bg-[#F5F3EE] transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[0.65rem] px-2 py-[2px] rounded-full font-semibold ${post.categoryStyle}`}>{post.categoryLabel}</span>
                    <span className="text-[0.65rem] text-[#888070]">{post.time}</span>
                  </div>
                  <div className="text-[0.85rem] font-medium text-[#181614] line-clamp-1">{post.title}</div>
                  <div className="text-[0.75rem] text-[#888070] mt-[2px] line-clamp-1">{post.preview}</div>
                </Link>
              ))}
            </section>
          )}

          {/* 업소 */}
          {(activeTab === "전체" || activeTab === "업소") && bizResults.length > 0 && (
            <section className="mt-3">
              <div className="px-4 md:px-6 py-2 bg-[#F5F3EE]">
                <span className="text-[0.75rem] font-bold text-[#888070]">한인 업소 {bizResults.length}개</span>
              </div>
              {bizResults.map((biz) => (
                <Link key={biz.id} href={`/business/${biz.id}`} className="flex items-center gap-3 bg-white px-4 md:px-6 py-3 border-b border-black/[0.04] hover:bg-[#F5F3EE] transition-colors">
                  <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center text-xl flex-shrink-0 ${biz.bg}`}>{biz.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[0.85rem] font-medium">{biz.name}</div>
                    <div className="text-[0.72rem] text-[#888070]">{biz.category} · {biz.area} · ★ {biz.rating}</div>
                  </div>
                  <span className={`text-[0.7rem] font-semibold flex-shrink-0 ${biz.isOpen ? "text-[#2B7A50]" : "text-[#888070]"}`}>
                    {biz.isOpen ? "영업중" : "영업종료"}
                  </span>
                </Link>
              ))}
            </section>
          )}

          {/* 채용 */}
          {(activeTab === "전체" || activeTab === "채용") && jobResults.length > 0 && (
            <section className="mt-3">
              <div className="px-4 md:px-6 py-2 bg-[#F5F3EE]">
                <span className="text-[0.75rem] font-bold text-[#888070]">채용공고 {jobResults.length}개</span>
              </div>
              {jobResults.map((job) => (
                <Link key={job.id} href={`/jobs/${job.id}`} className="flex items-center gap-3 bg-white px-4 md:px-6 py-3 border-b border-black/[0.04] hover:bg-[#F5F3EE] transition-colors">
                  <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center text-xl flex-shrink-0 ${job.companyBg}`}>{job.companyIcon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[0.85rem] font-medium">{job.title}</div>
                    <div className="text-[0.72rem] text-[#888070]">{job.company} · {job.salary}</div>
                  </div>
                </Link>
              ))}
            </section>
          )}

          {/* 뉴스 */}
          {(activeTab === "전체" || activeTab === "뉴스") && newsResults.length > 0 && (
            <section className="mt-3">
              <div className="px-4 md:px-6 py-2 bg-[#F5F3EE]">
                <span className="text-[0.75rem] font-bold text-[#888070]">뉴스 {newsResults.length}개</span>
              </div>
              {newsResults.map((news) => (
                <Link key={news.id} href={`/news/${news.id}`} className="flex items-center gap-3 bg-white px-4 md:px-6 py-3 border-b border-black/[0.04] hover:bg-[#F5F3EE] transition-colors">
                  <div className="w-10 h-10 rounded-[10px] bg-[#F5F3EE] flex items-center justify-center text-xl flex-shrink-0">{news.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[0.85rem] font-medium line-clamp-1">{news.title}</div>
                    <div className="text-[0.72rem] text-[#888070]">{news.category} · {news.time}</div>
                  </div>
                </Link>
              ))}
            </section>
          )}
        </div>
      )}
    </div>
  );
}
