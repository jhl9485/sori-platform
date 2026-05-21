"use client";

import { useState } from "react";
import Link from "next/link";
import FavoritesSection from "@/components/community/FavoritesSection";
import CategoryTabs from "@/components/community/CategoryTabs";
import CommunityPostCard from "@/components/community/CommunityPostCard";
import { COMMUNITY_POSTS } from "@/data/communityPosts";

const FEED_TABS = ["최신순", "인기순", "댓글순"] as const;
type FeedTab = typeof FEED_TABS[number];

// 공지사항 배너 (실제 서비스 시 관리자 설정)
const NOTICES = [
  { id: "n1", emoji: "⚠️", text: "P1 국제학생 신청 마감 D-4 (5월 25일)", link: "/news/1" },
];

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [feedTab, setFeedTab] = useState<FeedTab>("최신순");
  const [searchQuery, setSearchQuery] = useState("");

  const base = selectedCategory === "all"
    ? COMMUNITY_POSTS
    : COMMUNITY_POSTS.filter((p) => p.categoryId === selectedCategory);

  const searched = searchQuery
    ? base.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : base;

  const sorted = [...searched].sort((a, b) => {
    if (feedTab === "인기순") {
      return parseInt(b.likes.replace(",", "")) - parseInt(a.likes.replace(",", ""));
    }
    if (feedTab === "댓글순") {
      return parseInt(b.comments.replace(",", "")) - parseInt(a.comments.replace(",", ""));
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
              싱가포르 한인 자유 게시판 · <span className="font-medium text-[#181614]">{COMMUNITY_POSTS.length}개</span> 게시글
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
      <div className="px-4 md:px-6 pb-3 relative">
        <span className="absolute left-7 md:left-9 top-1/2 -translate-y-1/2 text-[0.9rem] text-[#888070] pointer-events-none">🔍</span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="커뮤니티 검색..."
          className="w-full bg-white border border-black/[0.08] rounded-full py-[10px] pl-10 pr-4 text-[0.85rem] outline-none placeholder:text-[#888070] font-[inherit] focus:border-black/[0.15] transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-7 md:right-9 top-1/2 -translate-y-1/2 text-[#888070] text-sm"
          >
            ✕
          </button>
        )}
      </div>

      {/* 내 커뮤니티 즐겨찾기 */}
      <div className="px-4 md:px-6">
        <FavoritesSection onSelect={setSelectedCategory} selectedId={selectedCategory} />
      </div>

      <div className="h-px bg-black/[0.06] mx-4 md:mx-6 mb-3" />

      {/* 전체 카테고리 탭 */}
      <div className="px-4 md:px-6">
        <CategoryTabs selected={selectedCategory} onSelect={setSelectedCategory} />
      </div>

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
        className="fixed bottom-[76px] md:bottom-8 right-4 md:right-8 xl:right-[312px] w-12 h-12 bg-[#D04020] text-white rounded-full shadow-[0_4px_16px_rgba(208,64,32,0.35)] flex items-center justify-center text-xl z-40 hover:bg-[#B83515] hover:scale-105 transition-all"
      >
        ✏️
      </Link>
    </div>
  );
}
