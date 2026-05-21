"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import CommentSection from "@/components/shared/CommentSection";
import { COMMUNITY_POSTS, SAMPLE_COMMENTS, type VisaBadge } from "@/data/communityPosts";

const VISA_BADGE_STYLE: Record<NonNullable<VisaBadge>, string> = {
  "EP":    "bg-[#EBF0FB] text-[#2050A0]",
  "S-Pass":"bg-[#EBF5F0] text-[#2B7A50]",
  "DP":    "bg-[#FBF5E8] text-[#B07010]",
  "PR":    "bg-[#F0EDE8] text-[#555]",
  "시민권": "bg-[#181614] text-white",
  "WH":   "bg-[#F5F0FF] text-[#7040C0]",
};

function renderContent(fullContent: string) {
  return fullContent.split("\n").map((line, i) => {
    if (line.startsWith("**") && line.endsWith("**") && line.length > 4) {
      return <p key={i} className="font-bold text-[0.9rem] mt-5 mb-2 text-[#181614]">{line.replace(/\*\*/g, "")}</p>;
    }
    if (line.startsWith("- ")) {
      return <li key={i} className="text-[0.85rem] text-[#181614] leading-relaxed ml-4 list-disc">{line.slice(2)}</li>;
    }
    if (line.startsWith("|") && line.endsWith("|")) {
      if (line.includes("---")) return null;
      const cells = line.split("|").filter((c) => c.trim());
      const isHeader = fullContent.split("\n")[i + 1]?.includes("---");
      return (
        <div key={i} className={`flex gap-2 text-[0.82rem] py-1 border-b border-black/[0.05] ${isHeader ? "font-bold bg-[#F5F3EE] px-2 rounded-t" : "px-2"}`}>
          {cells.map((c, j) => <span key={j} className="flex-1">{c.trim()}</span>)}
        </div>
      );
    }
    if (line.trim() === "") return <br key={i} />;
    return <p key={i} className="text-[0.85rem] text-[#181614] leading-relaxed">{line}</p>;
  });
}

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const post = COMMUNITY_POSTS.find((p) => p.id === params.id);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!post) return notFound();

  const comments = SAMPLE_COMMENTS[post.id] || [];

  // relatedIds 기반 연관글, 없으면 같은 카테고리에서 표시
  const relatedPosts = post.relatedIds && post.relatedIds.length > 0
    ? post.relatedIds.map((rid) => COMMUNITY_POSTS.find((p) => p.id === rid)).filter(Boolean)
    : COMMUNITY_POSTS.filter((p) => p.categoryId === post.categoryId && p.id !== post.id).slice(0, 2);

  const likeCount = parseInt(post.likes.replace(",", "")) + (liked ? 1 : 0);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("링크가 복사되었습니다.");
    }
  };

  return (
    <div className="max-w-[680px] mx-auto">
      <PageHeader
        right={
          <div className="flex gap-3 items-center">
            <button onClick={handleShare} className="text-[0.75rem] text-[#888070] hover:text-[#181614]">↗ 공유</button>
            <button className="text-[0.75rem] text-[#888070] hover:text-[#D04020]">신고</button>
          </div>
        }
      />

      <article className="bg-white">
        {/* 포스트 헤더 */}
        <div className="px-4 md:px-6 pt-5 pb-4">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className={`text-[0.7rem] px-2 py-[3px] rounded-full font-semibold ${post.categoryStyle}`}>
              {post.categoryLabel}
            </span>
            {post.isPinned && (
              <span className="text-[0.65rem] bg-[#FBF5E8] text-[#B07010] px-2 py-[2px] rounded-full font-semibold">
                📌 공지
              </span>
            )}
          </div>
          <h1 className="text-[1.1rem] font-bold leading-snug mb-4">{post.title}</h1>

          {/* 작성자 */}
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-[0.9rem] flex-shrink-0"
              style={{ background: post.avatarBg, color: post.avatarColor }}
            >
              {post.avatarChar}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[0.82rem] font-semibold">{post.author}</span>
                {post.visaBadge && (
                  <span className={`text-[0.62rem] px-[6px] py-[1px] rounded font-bold ${VISA_BADGE_STYLE[post.visaBadge]}`}>
                    {post.visaBadge}
                  </span>
                )}
              </div>
              <div className="text-[0.7rem] text-[#888070] mt-[1px]">
                {post.time} · 조회 {post.views} · 댓글 {post.comments}
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-black/[0.06] mx-4 md:mx-6" />

        {/* 본문 */}
        <div className="px-4 md:px-6 py-5 space-y-[2px]">
          {renderContent(post.fullContent)}
        </div>

        {/* 태그 */}
        <div className="px-4 md:px-6 pb-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-[0.72rem] bg-[#F5F3EE] border border-black/[0.08] rounded-full px-3 py-[4px] text-[#888070] hover:border-[#D04020] hover:text-[#D04020] cursor-pointer transition-colors"
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
            className={`flex items-center gap-[5px] text-[0.82rem] font-medium transition-colors ${liked ? "text-[#D04020]" : "text-[#888070] hover:text-[#D04020]"}`}
          >
            {liked ? "❤️" : "🤍"} <span>{likeCount.toLocaleString()}</span>
          </button>
          <button className="flex items-center gap-[5px] text-[0.82rem] text-[#888070]">
            💬 <span>{post.comments}</span>
          </button>
          <button
            onClick={() => setSaved(!saved)}
            className={`flex items-center gap-[5px] text-[0.82rem] ml-auto transition-colors ${saved ? "text-[#2050A0]" : "text-[#888070] hover:text-[#2050A0]"}`}
          >
            {saved ? "🔖 저장됨" : "🏷️ 저장"}
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-[5px] text-[0.82rem] text-[#888070] hover:text-[#181614]"
          >
            ↗ 공유
          </button>
        </div>
      </article>

      {/* 댓글 */}
      <CommentSection comments={comments} />

      {/* 연관 게시글 */}
      {relatedPosts.length > 0 && (
        <div className="bg-white mt-2 px-4 md:px-6 py-4">
          <h3 className="text-[0.85rem] font-bold mb-3 text-[#888070]">연관 게시글</h3>
          {relatedPosts.map((related) => related && (
            <Link key={related.id} href={`/community/${related.id}`} className="block py-[10px] border-b border-black/[0.04] last:border-0 group">
              <div className="flex items-center gap-2 mb-[2px]">
                <span className={`text-[0.62rem] px-[6px] py-[1px] rounded-full font-semibold ${related.categoryStyle}`}>
                  {related.categoryLabel}
                </span>
                {related.visaBadge && (
                  <span className={`text-[0.58rem] px-[5px] py-[1px] rounded font-bold ${VISA_BADGE_STYLE[related.visaBadge]}`}>
                    {related.visaBadge}
                  </span>
                )}
              </div>
              <div className="text-[0.82rem] font-medium text-[#181614] group-hover:text-[#D04020] transition-colors line-clamp-1">
                {related.title}
              </div>
              <div className="text-[0.7rem] text-[#888070] mt-[2px]">
                ❤️ {related.likes} · 💬 {related.comments} · 👁 {related.views}
              </div>
            </Link>
          ))}
          <Link href="/community" className="block text-center text-[0.78rem] text-[#D04020] font-medium pt-3 hover:underline">
            커뮤니티 전체 보기 →
          </Link>
        </div>
      )}

      <div className="h-4" />
    </div>
  );
}
