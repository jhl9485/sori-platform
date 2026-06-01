"use client";

import { useMemo } from "react";
import Link from "next/link";
import CommunityPostCard from "@/components/community/CommunityPostCard";
import { COMMUNITY_POSTS } from "@/data/communityPosts";
import { useUserPosts } from "@/lib/userContent";

// 토픽 무관 — 조회수 기준 상위 5개만 노출
export default function CommunityFeed() {
  const userPosts = useUserPosts();

  const top5 = useMemo(() => {
    const all = [...userPosts, ...COMMUNITY_POSTS];
    return [...all]
      .sort((a, b) => parseInt(b.views.replace(/,/g, ""), 10) - parseInt(a.views.replace(/,/g, ""), 10))
      .slice(0, 5);
  }, [userPosts]);

  return (
    <section>
      {/* 섹션 헤더 */}
      <div className="flex justify-between items-center px-4 pb-3">
        <h2 className="text-base font-bold tracking-tight">🔥 오늘의 인기 글</h2>
        <Link href="/community" className="text-[0.78rem] text-[#D04020] font-medium hover:underline">
          전체보기
        </Link>
      </div>

      {/* 인기글 카드 5개 */}
      <div className="px-4 md:px-6 flex flex-col gap-3">
        {top5.map((post, i) => (
          <div key={post.id} style={{ animationDelay: `${i * 0.05}s` }}>
            <CommunityPostCard post={post} />
          </div>
        ))}
      </div>
    </section>
  );
}
