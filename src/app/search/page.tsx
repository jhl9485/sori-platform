"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { COMMUNITY_POSTS } from "@/data/communityPosts";
import { BUSINESSES } from "@/data/businesses";
import { JOBS } from "@/data/jobs";
import { NEWS_ITEMS } from "@/data/newsItems";
import { REALTY_ITEMS } from "@/data/realtyItems";
import { useUserPosts, useUserFlea, useUserJobs, useUserRealty } from "@/lib/userContent";
import SearchField from "@/components/shared/SearchField";

const TABS = ["전체", "커뮤니티", "업소", "채용", "뉴스", "부동산"];
const RECENT_KEY = "sori_recent_searches";
const MAX_RECENT = 6;

const HOT_SEARCHES = ["OCBC 계좌", "EP 비자", "Tanjong Pagar 맛집", "감자탕", "한국어 강사", "콘도 렌트"];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [activeTab, setActiveTab] = useState("전체");
  const [recent, setRecent] = useState<string[]>([]);

  // 입력 디바운스 (150ms) — 빠른 타이핑 시 매 키마다 필터링 안 함
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 150);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      if (raw) setRecent(JSON.parse(raw));
    } catch {}
  }, []);

  const pushRecent = (term: string) => {
    const t = term.trim();
    if (!t) return;
    const next = [t, ...recent.filter((r) => r !== t)].slice(0, MAX_RECENT);
    setRecent(next);
    try { localStorage.setItem(RECENT_KEY, JSON.stringify(next)); } catch {}
  };

  const removeRecent = (term: string) => {
    const next = recent.filter((r) => r !== term);
    setRecent(next);
    try { localStorage.setItem(RECENT_KEY, JSON.stringify(next)); } catch {}
  };

  const clearRecent = () => {
    setRecent([]);
    try { localStorage.removeItem(RECENT_KEY); } catch {}
  };

  // 검색어가 바뀌면(빈→유효) 최근 검색에 기록 — 디바운스
  useEffect(() => {
    if (!query.trim()) return;
    const timer = setTimeout(() => pushRecent(query), 1500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const q = debouncedQuery.toLowerCase().trim();
  const userPosts = useUserPosts();
  const userFlea = useUserFlea();
  const userJobs = useUserJobs();
  const userRealty = useUserRealty();

  const allPosts = useMemo(() => [...userPosts, ...COMMUNITY_POSTS], [userPosts]);
  const allJobs = useMemo(() => [...userJobs, ...JOBS], [userJobs]);
  const allRealty = useMemo(() => [...userRealty, ...REALTY_ITEMS], [userRealty]);

  const postResults = useMemo(() =>
    q ? allPosts.filter(
      (p) => p.title.toLowerCase().includes(q) || p.preview.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q))
    ) : [], [q, allPosts]);
  const bizResults = useMemo(() =>
    q ? BUSINESSES.filter(
      (b) => b.name.toLowerCase().includes(q) || b.category.toLowerCase().includes(q) || b.tags.some((t) => t.toLowerCase().includes(q)) || b.area.toLowerCase().includes(q)
    ) : [], [q]);
  const jobResults = useMemo(() =>
    q ? allJobs.filter(
      (j) => j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.tags.some((t) => t.toLowerCase().includes(q))
    ) : [], [q, allJobs]);
  const newsResults = useMemo(() =>
    q ? NEWS_ITEMS.filter(
      (n) => n.title.toLowerCase().includes(q) || n.summary.toLowerCase().includes(q) || n.category.toLowerCase().includes(q)
    ) : [], [q]);
  const realtyResults = useMemo(() =>
    q ? allRealty.filter(
      (r) => r.title.toLowerCase().includes(q) || r.area.toLowerCase().includes(q) || r.mrt.toLowerCase().includes(q) || r.type.toLowerCase().includes(q)
    ) : [], [q, allRealty]);
  const fleaResults = useMemo(() =>
    q ? userFlea.filter(
      (f) => f.title.toLowerCase().includes(q) || f.category.toLowerCase().includes(q)
    ) : [], [q, userFlea]);

  const totalCount = postResults.length + bizResults.length + jobResults.length + newsResults.length + realtyResults.length + fleaResults.length;
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
          <div className="flex-1">
            <SearchField value={query} onChange={setQuery} onClear={() => setQuery("")} placeholder="검색어를 입력하세요..." autoFocus />
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

      {/* 검색 전: 최근 + 인기 검색어 */}
      {!q && (
        <div className="px-4 md:px-6 py-5 space-y-5">
          {recent.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-[0.85rem] font-bold text-[#888070]">최근 검색</h2>
                <button onClick={clearRecent} className="text-[0.72rem] text-[#888070] hover:text-[#D04020]">
                  전체 삭제
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recent.map((term) => (
                  <div
                    key={term}
                    className="flex items-center gap-1 bg-[#F5F3EE] border border-black/[0.06] rounded-full pl-3 pr-1 py-[4px] text-[0.78rem]"
                  >
                    <button
                      onClick={() => setQuery(term)}
                      className="text-[#181614] hover:text-[#D04020] transition-colors"
                    >
                      🕐 {term}
                    </button>
                    <button
                      onClick={() => removeRecent(term)}
                      className="w-5 h-5 flex items-center justify-center text-[#888070] hover:text-[#D04020] text-[0.7rem]"
                      aria-label={`${term} 삭제`}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-[0.85rem] font-bold text-[#888070] mb-3">🔥 인기 검색어</h2>
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
        </div>
      )}

      {/* 결과 없음 */}
      {noResults && (
        <div className="flex flex-col items-center justify-center py-16 text-[#888070] px-4">
          <div className="text-5xl mb-4">🔍</div>
          <div className="text-[0.9rem] font-medium mb-1">&ldquo;{query}&rdquo; 검색 결과 없음</div>
          <div className="text-[0.78rem] mb-6">다른 키워드로 검색해보세요</div>
          <div className="w-full max-w-[400px]">
            <div className="text-[0.78rem] font-bold text-[#888070] mb-2 text-center">이런 검색어는 어때요?</div>
            <div className="flex flex-wrap gap-2 justify-center">
              {HOT_SEARCHES.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="bg-white border border-black/[0.08] rounded-full px-3 py-[6px] text-[0.78rem] hover:border-[#D04020] hover:text-[#D04020] transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
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

          {/* 부동산 */}
          {(activeTab === "전체" || activeTab === "부동산") && realtyResults.length > 0 && (
            <section className="mt-3">
              <div className="px-4 md:px-6 py-2 bg-[#F5F3EE]">
                <span className="text-[0.75rem] font-bold text-[#888070]">부동산 {realtyResults.length}개</span>
              </div>
              {realtyResults.map((r) => (
                <Link key={r.id} href={`/realty/${r.id}`} className="flex items-center gap-3 bg-white px-4 md:px-6 py-3 border-b border-black/[0.04] hover:bg-[#F5F3EE] transition-colors">
                  <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center text-xl flex-shrink-0 overflow-hidden ${r.bg}`}>
                    {r.photos && r.photos.length > 0 ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={r.photos[0]} alt={r.title} loading="lazy" className="w-full h-full object-cover" />
                    ) : r.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[0.85rem] font-medium line-clamp-1">{r.title}</div>
                    <div className="text-[0.72rem] text-[#888070]">{r.area} · <span className="text-[#D04020] font-bold">{r.price}</span></div>
                  </div>
                </Link>
              ))}
            </section>
          )}

          {/* 벼룩시장 (사용자 글만 검색) */}
          {(activeTab === "전체") && fleaResults.length > 0 && (
            <section className="mt-3">
              <div className="px-4 md:px-6 py-2 bg-[#F5F3EE]">
                <span className="text-[0.75rem] font-bold text-[#888070]">벼룩시장 {fleaResults.length}개</span>
              </div>
              {fleaResults.map((f) => (
                <Link key={f.id} href={`/flea/${f.id}`} className="flex items-center gap-3 bg-white px-4 md:px-6 py-3 border-b border-black/[0.04] hover:bg-[#F5F3EE] transition-colors">
                  <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center text-xl flex-shrink-0 overflow-hidden ${f.bg}`}>
                    {f.photos && f.photos.length > 0 ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={f.photos[0]} alt={f.title} loading="lazy" className="w-full h-full object-cover" />
                    ) : f.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[0.85rem] font-medium line-clamp-1">{f.title}</div>
                    <div className="text-[0.72rem] text-[#888070]">{f.category} · <span className="text-[#D04020] font-bold">{f.price}</span></div>
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
