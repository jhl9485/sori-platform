"use client";

import { useEffect } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import CommentSection from "@/components/shared/CommentSection";
import OwnerActions from "@/components/shared/OwnerActions";
import { COMMUNITY_POSTS, SAMPLE_COMMENTS } from "@/data/communityPosts";
import { VISA_BADGE_STYLE } from "@/lib/visaBadge";
import { renderMarkdown } from "@/lib/renderMarkdown";
import { useToggleSet } from "@/lib/storage";
import { useUserPosts } from "@/lib/userContent";

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const userPosts = useUserPosts();
  const post = userPosts.find((p) => p.id === params.id) || COMMUNITY_POSTS.find((p) => p.id === params.id);
  const { has: isLiked, toggle: toggleLike } = useToggleSet("sori_liked_posts");
  const { has: isSaved, toggle: toggleSave } = useToggleSet("sori_saved_posts");
  const { toggle: markRead } = useToggleSet("sori_read_posts");

  useEffect(() => {
    if (post) markRead(post.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post?.id]);

  if (!post) return notFound();

  const liked = isLiked(post.id);
  const saved = isSaved(post.id);
  const isMine = userPosts.some((p) => p.id === post.id);
  const allPosts = [...userPosts, ...COMMUNITY_POSTS];
  const comments = SAMPLE_COMMENTS[post.id] || [];

  // relatedIds 기반 연관글, 없으면 같은 카테고리에서 표시
  const relatedPosts = (post.relatedIds && post.relatedIds.length > 0
    ? post.relatedIds.map((rid) => allPosts.find((p) => p.id === rid))
    : allPosts.filter((p) => p.categoryId === post.categoryId && p.id !== post.id).slice(0, 2)
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  const likeCount = parseInt(post.likes.replace(/,/g, "")) + (liked ? 1 : 0);

  // 이전/다음 글 (현재 글 인덱스 기준)
  const currentIdx = allPosts.findIndex((p) => p.id === post.id);
  const prevPost = currentIdx > 0 ? allPosts[currentIdx - 1] : null;
  const nextPost = currentIdx >= 0 && currentIdx < allPosts.length - 1 ? allPosts[currentIdx + 1] : null;

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
            <button
              onClick={() => {
                const r = window.prompt("신고 사유를 적어주세요 (선택)");
                if (r !== null) alert("신고가 접수되었습니다.");
              }}
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
          {renderMarkdown(post.fullContent)}
        </div>

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
            onClick={() => toggleLike(post.id)}
            className={`flex items-center gap-[5px] text-[0.82rem] font-medium transition-colors ${liked ? "text-[#D04020]" : "text-[#888070] hover:text-[#D04020]"}`}
          >
            {liked ? "❤️" : "🤍"} <span>{likeCount.toLocaleString()}</span>
          </button>
          <button className="flex items-center gap-[5px] text-[0.82rem] text-[#888070]">
            💬 <span>{post.comments}</span>
          </button>
          <button
            onClick={() => toggleSave(post.id)}
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

      {/* 이전/다음 글 네비게이션 */}
      {(prevPost || nextPost) && (
        <div className="bg-white mt-2 grid grid-cols-2 divide-x divide-black/[0.06]">
          {prevPost ? (
            <Link href={`/community/${prevPost.id}`} className="px-4 md:px-6 py-4 hover:bg-[#F5F3EE] transition-colors">
              <div className="text-[0.68rem] text-[#888070] mb-1">← 이전 글</div>
              <div className="text-[0.78rem] font-medium line-clamp-1">{prevPost.title}</div>
            </Link>
          ) : <div className="px-4 md:px-6 py-4 text-[0.7rem] text-[#C0BBB0]">처음 글이에요</div>}
          {nextPost ? (
            <Link href={`/community/${nextPost.id}`} className="px-4 md:px-6 py-4 hover:bg-[#F5F3EE] transition-colors text-right">
              <div className="text-[0.68rem] text-[#888070] mb-1">다음 글 →</div>
              <div className="text-[0.78rem] font-medium line-clamp-1">{nextPost.title}</div>
            </Link>
          ) : <div className="px-4 md:px-6 py-4 text-[0.7rem] text-[#C0BBB0] text-right">마지막 글이에요</div>}
        </div>
      )}

      {/* 댓글 */}
      <CommentSection comments={comments} postId={post.id} />

      {/* 연관 게시글 */}
      {relatedPosts.length > 0 && (
        <div className="bg-white mt-2 px-4 md:px-6 py-4">
          <h3 className="text-[0.85rem] font-bold mb-3 text-[#888070]">연관 게시글</h3>
          {relatedPosts.map((related) => (
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
