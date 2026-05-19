"use client";

import { useState } from "react";
import FavoritesSection from "@/components/community/FavoritesSection";
import CategoryTabs from "@/components/community/CategoryTabs";
import CommunityPostCard from "@/components/community/CommunityPostCard";
import { COMMUNITY_POSTS } from "@/data/communityPosts";

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filtered =
    selectedCategory === "all"
      ? COMMUNITY_POSTS
      : COMMUNITY_POSTS.filter((p) => p.categoryId === selectedCategory);

  return (
    <div className="max-w-[680px] mx-auto">
      {/* 페이지 헤더 */}
      <div className="px-4 md:px-6 pt-4 md:pt-7 pb-4">
        <h1 className="text-[1.2rem] md:text-[1.4rem] font-bold tracking-tight">커뮤니티</h1>
        <p className="text-[0.75rem] text-[#888070] mt-[2px]">싱가포르 한인 자유 게시판 · 12개 카테고리</p>
      </div>

      {/* 검색 */}
      <div className="px-4 md:px-6 pb-3 relative">
        <span className="absolute left-7 md:left-9 top-1/2 -translate-y-1/2 text-[0.9rem] text-[#888070] pointer-events-none">🔍</span>
        <input type="text" placeholder="커뮤니티 검색..." className="w-full bg-white border border-black/[0.08] rounded-full py-[10px] pl-10 pr-4 text-[0.85rem] outline-none placeholder:text-[#888070] font-[inherit] focus:border-black/[0.15] transition-colors" />
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

      {/* 피드 */}
      <div className="px-4 md:px-6 pb-6 flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-[#888070]">
            <div className="text-4xl mb-3">📭</div>
            <div className="text-[0.85rem] font-medium">아직 게시글이 없어요</div>
          </div>
        ) : (
          filtered.map((post, i) => (
            <div key={post.id} style={{ animationDelay: `${i * 0.04}s` }}>
              <CommunityPostCard post={post} />
            </div>
          ))
        )}
      </div>

      {/* 글쓰기 플로팅 버튼 */}
      <button className="fixed bottom-[76px] md:bottom-8 right-4 md:right-8 xl:right-[312px] w-12 h-12 bg-[#D04020] text-white rounded-full shadow-[0_4px_16px_rgba(208,64,32,0.35)] flex items-center justify-center text-xl z-40 hover:bg-[#B83515] hover:scale-105 transition-all">
        ✏️
      </button>
    </div>
  );
}
