"use client";

import { memo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { CommunityPost } from "@/data/communityPosts";
import { VISA_BADGE_STYLE } from "@/lib/visaBadge";
import { useToggleSet } from "@/lib/storage";
import { cardTime, resolveISO } from "@/lib/format";
import { realCommentCount, useUserCommentCounts } from "@/lib/comments";
import MetricRow from "@/components/shared/MetricRow";
import { LIKE_KEY, VIEW_KEY } from "@/lib/metrics";

function isNew(post: CommunityPost): boolean {
  // createdAt이 있으면 48시간 이내를 NEW로 간주, 없으면 기존 time 문자열로 판단
  if (post.createdAt) {
    const diff = Date.now() - new Date(post.createdAt).getTime();
    return diff >= 0 && diff < 48 * 60 * 60 * 1000;
  }
  return /방금|분 전|시간 전/.test(post.time);
}

function isHot(likes: string): boolean {
  return parseInt(likes.replace(/,/g, ""), 10) >= 200;
}

function CommunityPostCardBase({ post }: { post: CommunityPost }) {
  const { has: isRead } = useToggleSet("sori_read_posts");
  const read = isRead(post.id);
  const newBadge = isNew(post);
  const hotBadge = isHot(post.likes);
  const displayTime = cardTime(resolveISO(post.createdAt, post.time)) || post.time;
  const router = useRouter();
  const [imgBroken, setImgBroken] = useState(false);
  const userCommentCounts = useUserCommentCounts();
  const commentCount = realCommentCount(post.id, userCommentCounts);

  // 여백 p-4(16px): 다른 목록 카드(뉴스·채용·부동산·업소·벼룩)가 모두 p-4라 여기만 14px일 이유가 없다.
  //
  // hover 뜨기에 `!`가 붙는 이유 — 이게 없으면 아무 일도 일어나지 않는다(브라우저에서 실측 확인):
  // animate-fade-up이 `animation-fill-mode: both`라서 애니메이션이 끝난 뒤에도
  // transform: translateY(0)을 계속 붙들고 있고, CSS 애니메이션은 일반 선언보다 우선순위가 높다.
  // 그래서 평범한 hover:-translate-y-[1px]는 애니메이션에 밀려 무시된다.
  // (더 깔끔한 대안은 globals.css의 fill-mode를 both→backwards로 바꾸는 것이지만
  //  그 클래스는 마이페이지 모달·토스트도 함께 쓰므로 이번 범위 밖으로 두고 팀장에게 보고한다.)
  return (
    <Link href={`/community/${post.id}`} className={`block rounded-[14px] border p-4 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:!-translate-y-[1px] transition-all animate-fade-up ${read ? "bg-[#FAF8F3] border-black/[0.05]" : "bg-white border-black/[0.08]"}`}>
      {/* 헤더 */}
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-[0.9rem] font-bold flex-shrink-0"
          style={{ background: post.avatarBg, color: post.avatarColor }}
        >
          {post.avatarChar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-[5px] flex-wrap">
            <span className="text-[0.8rem] font-semibold truncate">{post.author}</span>
            {post.visaBadge && (
              <span className={`text-[0.58rem] px-[5px] py-[1px] rounded font-bold flex-shrink-0 ${VISA_BADGE_STYLE[post.visaBadge]}`}>
                {post.visaBadge}
              </span>
            )}
          </div>
          <div className="text-[0.7rem] text-[#888070]" suppressHydrationWarning>{displayTime}</div>
        </div>
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); router.push(`/community?cat=${post.categoryId}`); }}
          className={`text-[0.68rem] px-2 py-[3px] rounded-full font-semibold whitespace-nowrap flex-shrink-0 transition-transform active:scale-95 ${post.categoryStyle}`}
        >
          {post.categoryLabel}
        </button>
      </div>

      <div className={`text-[0.9rem] font-bold mb-1 tracking-tight line-clamp-2 ${read ? "text-[#888070]" : ""}`} suppressHydrationWarning>
        {newBadge && <span className="inline-block text-[0.58rem] bg-[#2B7A50] text-white px-[5px] py-[1px] rounded font-bold mr-1 align-middle">NEW</span>}
        {hotBadge && <span className="inline-block text-[0.58rem] bg-[#D04020] text-white px-[5px] py-[1px] rounded font-bold mr-1 align-middle">🔥 HOT</span>}
        {post.title}
      </div>
      <div className="text-[0.8rem] text-[#888070] leading-[1.5] mb-[10px] line-clamp-2">{post.preview}</div>

      {post.images && post.images.length > 0 && !imgBroken && (
        <div className="relative mb-[10px] rounded-[10px] overflow-hidden border border-black/[0.06] h-52 bg-[#F5F3EE]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.images[0]} alt={`${post.title} 첨부 사진`} loading="lazy" decoding="async" onError={() => setImgBroken(true)} className="w-full h-full object-cover" />
          {post.images.length > 1 && (
            <span className="absolute bottom-1.5 right-1.5 bg-black/60 text-white text-[0.62rem] font-semibold px-1.5 py-[1px] rounded-full">
              📷 {post.images.length}
            </span>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-[5px] mb-2">
        {post.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="text-[0.68rem] bg-[#F5F3EE] border border-black/[0.08] rounded-full px-2 py-[2px] text-[#888070]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="pt-2 border-t border-black/[0.08]">
        <MetricRow
          likeKey={LIKE_KEY.community}
          viewKey={VIEW_KEY.community}
          id={post.id}
          seedLikes={post.likes}
          seedViews={post.views}
          comments={commentCount}
        />
      </div>
    </Link>
  );
}

// post 객체 ref가 같으면 리렌더 회피 (useMemo로 캐싱된 리스트와 함께 사용 시 효과)
export default memo(CommunityPostCardBase, (prev, next) => prev.post === next.post);
