"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import CommentSection from "@/components/shared/CommentSection";
import { COMMUNITY_POSTS, SAMPLE_COMMENTS } from "@/data/communityPosts";

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const post = COMMUNITY_POSTS.find((p) => p.id === params.id);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!post) return notFound();

  const comments = SAMPLE_COMMENTS[post.id] || [];

  const lines = post.fullContent.split("\n").map((line, i) => {
    if (line.startsWith("**") && line.endsWith("**")) {
      return <p key={i} className="font-bold text-[0.9rem] mt-4 mb-1">{line.replace(/\*\*/g, "")}</p>;
    }
    if (line.startsWith("- ")) {
      return <li key={i} className="text-[0.85rem] text-[#181614] leading-relaxed ml-4 list-disc">{line.slice(2)}</li>;
    }
    if (line.trim() === "") return <br key={i} />;
    return <p key={i} className="text-[0.85rem] text-[#181614] leading-relaxed">{line}</p>;
  });

  return (
    <div className="max-w-[680px] mx-auto">
      <PageHeader
        right={
          <div className="flex gap-2">
            <button className="text-[0.75rem] text-[#888070]">공유</button>
            <button className="text-[0.75rem] text-[#888070]">신고</button>
          </div>
        }
      />

      <article className="bg-white">
        {/* 포스트 헤더 */}
        <div className="px-4 md:px-6 pt-5 pb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-[0.7rem] px-2 py-[3px] rounded-full font-semibold ${post.categoryStyle}`}>
              {post.categoryLabel}
            </span>
          </div>
          <h1 className="text-[1.1rem] font-bold leading-snug mb-3">{post.title}</h1>
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold flex-shrink-0"
              style={{ background: post.avatarBg, color: post.avatarColor }}
            >
              {post.avatarChar}
            </div>
            <div>
              <div className="text-[0.82rem] font-semibold">{post.author}</div>
              <div className="text-[0.7rem] text-[#888070]">
                {post.time} · 조회 {post.views}
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-black/[0.06] mx-4 md:mx-6" />

        {/* 본문 */}
        <div className="px-4 md:px-6 py-5 space-y-1">
          {lines}
        </div>

        {/* 태그 */}
        <div className="px-4 md:px-6 pb-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-[0.72rem] bg-[#F5F3EE] border border-black/[0.08] rounded-full px-3 py-[4px] text-[#888070]"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* 액션 바 */}
        <div className="px-4 md:px-6 py-3 border-t border-black/[0.06] flex items-center gap-4">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-1 text-[0.82rem] font-medium transition-colors ${
              liked ? "text-[#D04020]" : "text-[#888070]"
            }`}
          >
            {liked ? "❤️" : "🤍"}
            <span>{parseInt(post.likes.replace(",", "")) + (liked ? 1 : 0)}</span>
          </button>
          <button className="flex items-center gap-1 text-[0.82rem] text-[#888070]">
            💬 <span>{post.comments}</span>
          </button>
          <button
            onClick={() => setSaved(!saved)}
            className={`flex items-center gap-1 text-[0.82rem] ml-auto transition-colors ${
              saved ? "text-[#2050A0]" : "text-[#888070]"
            }`}
          >
            {saved ? "🔖" : "🏷️"} {saved ? "저장됨" : "저장"}
          </button>
          <button className="text-[0.82rem] text-[#888070]">↗ 공유</button>
        </div>
      </article>

      {/* 댓글 */}
      <CommentSection comments={comments} postId={post.id} />

      {/* 연관 게시글 */}
      <div className="bg-white mt-2 px-4 md:px-6 py-4">
        <h3 className="text-[0.85rem] font-bold mb-3 text-[#888070]">같은 카테고리 인기글</h3>
        {COMMUNITY_POSTS.filter((p) => p.categoryId === post.categoryId && p.id !== post.id)
          .slice(0, 2)
          .map((related) => (
            <a key={related.id} href={`/community/${related.id}`} className="block py-2 border-b border-black/[0.04] last:border-0">
              <div className="text-[0.82rem] font-medium text-[#181614] hover:text-[#D04020] transition-colors line-clamp-1">
                {related.title}
              </div>
              <div className="text-[0.7rem] text-[#888070] mt-[2px]">
                조회 {related.views} · 댓글 {related.comments}
              </div>
            </a>
          ))}
      </div>
    </div>
  );
}
