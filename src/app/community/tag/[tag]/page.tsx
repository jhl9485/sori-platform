"use client";

import { useMemo } from "react";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import CommunityPostCard from "@/components/community/CommunityPostCard";
import { COMMUNITY_POSTS } from "@/data/communityPosts";
import { useUserPosts } from "@/lib/userContent";

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag);
  const userPosts = useUserPosts();
  const allPosts = useMemo(() => [...userPosts, ...COMMUNITY_POSTS], [userPosts]);

  const matched = useMemo(
    () => allPosts.filter((p) => p.tags.includes(tag)),
    [allPosts, tag]
  );

  // 관련 태그: 같이 등장하는 태그들
  const relatedTags = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of matched) {
      for (const t of p.tags) {
        if (t !== tag) counts[t] = (counts[t] || 0) + 1;
      }
    }
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([t]) => t);
  }, [matched, tag]);

  return (
    <div className="max-w-[680px] mx-auto">
      <PageHeader title={`#${tag}`} />

      <div className="px-4 md:px-6 py-4">
        <div className="bg-white rounded-[14px] border border-black/[0.08] p-4 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[0.72rem] font-bold text-[#888070]">태그</span>
          </div>
          <h1 className="text-[1.2rem] font-bold mb-1" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            #{tag}
          </h1>
          <p className="text-[0.78rem] text-[#888070]">
            이 태그가 포함된 게시글 <span className="font-bold text-[#D04020]">{matched.length}개</span>
          </p>
        </div>

        {relatedTags.length > 0 && (
          <div className="mb-4">
            <div className="text-[0.7rem] font-bold text-[#888070] mb-2">🔗 관련 태그</div>
            <div className="flex flex-wrap gap-[5px]">
              {relatedTags.map((t) => (
                <Link
                  key={t}
                  href={`/community/tag/${encodeURIComponent(t)}`}
                  className="text-[0.72rem] bg-white text-[#888070] border border-black/[0.08] rounded-full px-3 py-[4px] hover:border-[#D04020] hover:text-[#D04020] transition-colors"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  #{t}
                </Link>
              ))}
            </div>
          </div>
        )}

        {matched.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-[#888070]">
            <div className="text-4xl mb-3">🏷️</div>
            <div className="text-[0.85rem] font-medium mb-2">이 태그가 붙은 글이 없어요</div>
            <Link href="/community" className="text-[0.78rem] text-[#D04020] font-bold hover:underline">
              커뮤니티 둘러보기 →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {matched.map((post) => (
              <CommunityPostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
