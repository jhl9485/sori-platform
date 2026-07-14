"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import CommentSection from "@/components/shared/CommentSection";
import OwnerActions from "@/components/shared/OwnerActions";
import DetailSkeleton from "@/components/shared/DetailSkeleton";
import { COMMUNITY_POSTS, SAMPLE_COMMENTS } from "@/data/communityPosts";
import { VISA_BADGE_STYLE } from "@/lib/visaBadge";
import { renderMarkdown } from "@/lib/renderMarkdown";
import { timeAgo, formatCount } from "@/lib/format";
import { useToggleSet } from "@/lib/storage";
import { useAuthGate } from "@/lib/auth";
import { useHydrated } from "@/lib/hooks";
import { useUserPosts } from "@/lib/userContent";
import { realCommentCount, useUserCommentCounts } from "@/lib/comments";
import { toast, reportDialog } from "@/components/shared/Feedback";

export default function CommunityDetailClient({ params }: { params: { id: string } }) {
  const hydrated = useHydrated();
  const userPosts = useUserPosts();
  const post = userPosts.find((p) => p.id === params.id) || COMMUNITY_POSTS.find((p) => p.id === params.id);
  const { has: isLiked, toggle: toggleLike } = useToggleSet("sori_liked_posts");
  const { has: isSaved, toggle: toggleSave } = useToggleSet("sori_saved_posts");
  const { toggle: markRead } = useToggleSet("sori_read_posts");
  const gate = useAuthGate();
  const userCommentCounts = useUserCommentCounts();
  const [likePop, setLikePop] = useState(false);
  const [savePop, setSavePop] = useState(false);

  useEffect(() => {
    if (post) markRead(post.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post?.id]);

  if (!post) {
    if (!hydrated) return <DetailSkeleton />;
    return notFound();
  }

  const liked = isLiked(post.id);
  const saved = isSaved(post.id);
  const isMine = userPosts.some((p) => p.id === post.id);
  const comments = SAMPLE_COMMENTS[post.id] || [];

  const likeCount = parseInt(post.likes.replace(/,/g, "")) + (liked ? 1 : 0);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, text: post.preview, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast("링크가 복사되었어요.");
    }
  };

  return (
    <div className="max-w-[680px] mx-auto">
      <PageHeader
        right={
          <div className="flex gap-3 items-center">
            <button onClick={handleShare} className="text-[0.75rem] text-[#888070] hover:text-[#181614]">↗ 공유</button>
            <button
              onClick={async () => { const reason = await reportDialog(); if (reason) toast(`신고가 접수되었어요 (${reason}). 검토 후 조치할게요.`); }}
              className="text-[0.75rem] text-[#888070] hover:text-[#D04020]"
            >
              신고
            </button>
          </div>
        }
      />

      {isMine && (
        <OwnerActions
          storageKey="sori_user_posts"
          itemId={post.id}
          editHref={`/write?edit=${post.id}`}
          backHref="/community"
          label="내 글"
        />
      )}

      <article className="bg-white">
        {/* 포스트 헤더 */}
        <div className="px-4 md:px-6 pt-5 pb-4">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <Link
              href={`/community?cat=${post.categoryId}`}
              className={`text-[0.7rem] px-2 py-[3px] rounded-full font-semibold transition-transform active:scale-95 ${post.categoryStyle}`}
            >
              {post.categoryLabel}
            </Link>
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
                {post.isAnon ? (
                  <span className="text-[0.82rem] font-semibold">{post.author}</span>
                ) : (
                  <Link
                    href={`/community/author/${encodeURIComponent(post.author)}`}
                    className="text-[0.82rem] font-semibold hover:text-[#D04020] hover:underline transition-colors"
                  >
                    {post.author}
                  </Link>
                )}
                {post.visaBadge && (
                  <span className={`text-[0.62rem] px-[6px] py-[1px] rounded font-bold ${VISA_BADGE_STYLE[post.visaBadge]}`}>
                    {post.visaBadge}
                  </span>
                )}
              </div>
              <div className="text-[0.7rem] text-[#888070] mt-[1px]" suppressHydrationWarning>
                {post.createdAt ? timeAgo(post.createdAt) : post.time} · 조회 {formatCount(post.views)} · 댓글 {realCommentCount(post.id, userCommentCounts)}
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-black/[0.06] mx-4 md:mx-6" />

        {/* 본문 */}
        <div className="px-4 md:px-6 py-5 space-y-[2px]">
          {renderMarkdown(post.fullContent)}
        </div>

        {/* 첨부 사진 */}
        {post.images && post.images.length > 0 && (
          <div className="px-4 md:px-6 pb-2 flex flex-col gap-2">
            {post.images.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={src}
                alt={`사진 ${i + 1}`}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                className="w-full rounded-[12px] border border-black/[0.06]"
              />
            ))}
          </div>
        )}

        {/* 태그 */}
        <div className="px-4 md:px-6 pb-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/community/tag/${encodeURIComponent(tag)}`}
              className="text-[0.72rem] bg-[#F5F3EE] border border-black/[0.08] rounded-full px-3 py-[4px] text-[#888070] hover:border-[#D04020] hover:text-[#D04020] transition-colors"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              #{tag}
            </Link>
          ))}
        </div>

        {/* 액션 바 */}
        <div className="px-4 md:px-6 py-3 border-t border-black/[0.06] flex items-center gap-4">
          <button
            onClick={() => { toggleLike(post.id); setLikePop(true); setTimeout(() => setLikePop(false), 260); }}
            className={`flex items-center gap-[5px] text-[0.82rem] font-medium transition-colors ${liked ? "text-[#D04020]" : "text-[#888070] hover:text-[#D04020]"}`}
          >
            <span className={`text-[1rem] leading-none transition-transform duration-200 ${likePop ? "scale-[1.35]" : "scale-100"}`}>{liked ? "❤️" : "🤍"}</span>
            <span className="leading-none">{likeCount.toLocaleString()}</span>
          </button>
          <span className="flex items-center gap-[5px] text-[0.82rem] text-[#888070]">
            <span className="text-[1rem] leading-none">👁</span>
            <span className="leading-none">{formatCount(post.views)}</span>
          </span>
          <span className="flex items-center gap-[5px] text-[0.82rem] text-[#888070]">
            <span className="text-[1rem] leading-none">💬</span>
            <span className="leading-none">{realCommentCount(post.id, userCommentCounts)}</span>
          </span>
          <button
            onClick={() => { if (gate("저장은 로그인 후 이용할 수 있어요.")) { toggleSave(post.id); setSavePop(true); setTimeout(() => setSavePop(false), 260); } }}
            className={`flex items-center gap-[5px] text-[0.82rem] ml-auto transition-colors ${saved ? "text-[#2050A0]" : "text-[#888070] hover:text-[#2050A0]"}`}
          >
            <span className={`inline-block transition-transform duration-200 ${savePop ? "scale-[1.3]" : "scale-100"}`}>{saved ? "🔖" : "🏷️"}</span> {saved ? "저장됨" : "저장"}
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
      <CommentSection comments={comments} postId={post.id} />

      <div className="h-4" />
    </div>
  );
}
