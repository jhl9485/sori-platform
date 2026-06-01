"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import FavoritesSection from "@/components/community/FavoritesSection";
import CategoryTabs from "@/components/community/CategoryTabs";
import CommunityPostCard from "@/components/community/CommunityPostCard";
import { COMMUNITY_POSTS } from "@/data/communityPosts";
import { useUserPosts } from "@/lib/userContent";
import SearchField from "@/components/shared/SearchField";

const FEED_TABS = ["최신순", "인기순", "댓글순"] as const;
type FeedTab = typeof FEED_TABS[number];

// 공지사항 배너 (실제 서비스 시 관리자 설정)
const NOTICES = [
  { id: "n1", emoji: "⚠️", text: "P1 국제학생 신청 마감 D-4 (5월 25일)", link: "/news/1" },
];

// 인기 태그 (등장 빈도 상위 8개)
const TOP_TAGS = (() => {
  const counts: Record<string, number> = {};
  for (const p of COMMUNITY_POSTS) {
    for (const t of p.tags) counts[t] = (counts[t] || 0) + 1;
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([t]) => t);
})();

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [feedTab, setFeedTab] = useState<FeedTab>("최신순");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const userPosts = useUserPosts();

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchQuery), 150);
    return () => clearTimeout(t);
  }, [searchQuery]);

  // 사용자 글 + 정적 글 합치기 (사용자 글이 최상단)
  const allPosts = useMemo(() => [...userPosts, ...COMMUNITY_POSTS], [userPosts]);

  const categoryCounts = useMemo(() => {
    return allPosts.reduce<Record<string, number>>((acc, p) => {
      acc[p.categoryId] = (acc[p.categoryId] || 0) + 1;
      return acc;
    }, {});
  }, [allPosts]);

  const base = selectedCategory === "all"
    ? allPosts
    : allPosts.filter((p) => p.categoryId === selectedCategory);

  const q = debouncedSearch.toLowerCase().trim();
  const searched = useMemo(() => (
    q
      ? base.filter((p) =>
          p.title.toLowerCase().includes(q) ||
          p.preview.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        )
      : base
  ), [q, base]);

  const sorted = [...searched].sort((a, b) => {
    if (feedTab === "인기순") {
      return parseInt(b.likes.replace(/,/g, "")) - parseInt(a.likes.replace(/,/g, ""));
    }
    if (feedTab === "댓글순") {
      return parseInt(b.comments.replace(/,/g, "")) - parseInt(a.comments.replace(/,/g, ""));
    }
    return 0; // 최신순 = 데이터 순서 유지
  });

  return (
    <div className="max-w-[680px] mx-auto">
      {/* 페이지 헤더 */}
      <div className="px-4 md:px-6 pt-4 md:pt-7 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[1.2rem] md:text-[1.4rem] font-bold tracking-tight">커뮤니티</h1>
            <p className="text-[0.75rem] text-[#888070] mt-[2px]">
              싱가포르 한인 자유 게시판 · <span className="font-medium text-[#181614]">{allPosts.length}개</span> 게시글
            </p>
          </div>
          <Link
            href="/write"
            className="bg-[#D04020] text-white text-[0.78rem] font-bold px-3 py-[7px] rounded-[10px] hover:bg-[#B83515] transition-colors"
          >
            ✏️ 글쓰기
          </Link>
        </div>
      </div>

      {/* 공지사항 배너 */}
      {NOTICES.map((notice) => (
        <Link
          key={notice.id}
          href={notice.link}
          className="mx-4 md:mx-6 mb-3 flex items-center gap-2 bg-[#FBF5E8] border border-[#E8D090] rounded-[10px] px-3 py-[9px] hover:bg-[#F5EDD0] transition-colors"
        >
          <span className="text-sm flex-shrink-0">{notice.emoji}</span>
          <span className="text-[0.78rem] font-medium text-[#B07010] flex-1 line-clamp-1">{notice.text}</span>
          <span className="text-[#B07010] text-sm flex-shrink-0">›</span>
        </Link>
      ))}

      {/* 검색 */}
      <div className="px-4 md:px-6 pb-3">
        <SearchField value={searchQuery} onChange={setSearchQuery} onClear={() => setSearchQuery("")} placeholder="커뮤니티 검색..." />
      </div>

      {/* 내 커뮤니티 즐겨찾기 */}
      <div className="px-4 md:px-6">
        <FavoritesSection onSelect={setSelectedCategory} selectedId={selectedCategory} />
      </div>

      <div className="h-px bg-black/[0.06] mx-4 md:mx-6 mb-3" />

      {/* 전체 카테고리 탭 */}
      <div className="px-4 md:px-6">
        <CategoryTabs
          selected={selectedCategory}
          onSelect={setSelectedCategory}
          counts={categoryCounts}
          totalCount={allPosts.length}
        />
      </div>

      {/* 인기 태그 */}
      {TOP_TAGS.length > 0 && (
        <div className="px-4 md:px-6 pb-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[0.7rem] font-bold text-[#888070]">🏷️ 인기 태그</span>
          </div>
          <div className="flex flex-wrap gap-[5px]">
            {TOP_TAGS.map((tag) => (
              <Link
                key={tag}
                href={`/community/tag/${encodeURIComponent(tag)}`}
                className="text-[0.7rem] rounded-full px-[10px] py-[3px] border bg-white text-[#888070] border-black/[0.08] hover:border-[#D04020] hover:text-[#D04020] transition-colors"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 피드 정렬 탭 */}
      <div className="px-4 md:px-6 mb-3 flex items-center justify-between">
        <div className="flex gap-1">
          {FEED_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setFeedTab(tab)}
              className={`px-3 py-[5px] rounded-full text-[0.75rem] font-medium transition-all ${
                feedTab === tab ? "bg-[#181614] text-white" : "text-[#888070] hover:text-[#181614]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <span className="text-[0.72rem] text-[#888070]">
          {sorted.length}개 게시글
        </span>
      </div>

      {/* 피드 */}
      <div className="px-4 md:px-6 pb-6 flex flex-col gap-3">
        {sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-[#888070]">
            <div className="text-4xl mb-3">📭</div>
            <div className="text-[0.85rem] font-medium">
              {searchQuery ? `"${searchQuery}" 검색 결과가 없어요` : "아직 게시글이 없어요"}
            </div>
          </div>
        ) : (
          sorted.map((post, i) => (
            <div key={post.id} style={{ animationDelay: `${i * 0.04}s` }}>
              <CommunityPostCard post={post} />
            </div>
          ))
        )}
      </div>

      {/* 글쓰기 플로팅 버튼 */}
      <Link
        href="/write"
        aria-label="글쓰기"
        className="fixed bottom-[calc(80px+env(safe-area-inset-bottom))] md:bottom-8 right-4 md:right-8 xl:right-[312px] w-12 h-12 bg-[#D04020] text-white rounded-full shadow-[0_4px_16px_rgba(208,64,32,0.35)] inline-flex items-center justify-center text-xl leading-none z-40 hover:bg-[#B83515] hover:scale-105 transition-all"
      >
        <span className="block leading-none translate-y-[-1px]">✏️</span>
      </Link>
    </div>
  );
}
