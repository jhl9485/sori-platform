"use client";

import { memo } from "react";
import Link from "next/link";
import type { CommunityPost } from "@/data/communityPosts";
import { VISA_BADGE_STYLE } from "@/lib/visaBadge";
import { useToggleSet } from "@/lib/storage";
import { formatCount } from "@/lib/format";

function isNew(time: string): boolean {
  // "분 전" / "시간 전" / "방금" → 24시간 이내로 간주
  return /방금|분 전|시간 전/.test(time);
}

function isHot(likes: string): boolean {
  return parseInt(likes.replace(/,/g, ""), 10) >= 200;
}

function CommunityPostCardBase({ post }: { post: CommunityPost }) {
  const { has: isHelped, toggle: toggleHelped } = useToggleSet("sori_helped_posts");
  const { has: isRead } = useToggleSet("sori_read_posts");
  const helped = isHelped(post.id);
  const read = isRead(post.id);
  const newBadge = isNew(post.time);
  const hotBadge = isHot(post.likes);

  return (
    <Link href={`/community/${post.id}`} className={`block rounded-[14px] border p-[14px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-shadow animate-fade-up ${read ? "bg-[#FAF8F3] border-black/[0.05]" : "bg-white border-black/[0.08]"}`}>
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
          <div className="text-[0.7rem] text-[#888070]">{post.time}</div>
        </div>
        <span className={`text-[0.68rem] px-2 py-[3px] rounded-full font-semibold whitespace-nowrap flex-shrink-0 ${post.categoryStyle}`}>
          {post.categoryLabel}
        </span>
      </div>

      <div className={`text-[0.9rem] font-bold mb-1 tracking-tight line-clamp-2 ${read ? "text-[#888070]" : ""}`}>
        {newBadge && <span className="inline-block text-[0.58rem] bg-[#2B7A50] text-white px-[5px] py-[1px] rounded font-bold mr-1 align-middle">NEW</span>}
        {hotBadge && <span className="inline-block text-[0.58rem] bg-[#D04020] text-white px-[5px] py-[1px] rounded font-bold mr-1 align-middle">🔥 HOT</span>}
        {post.title}
      </div>
      <div className="text-[0.8rem] text-[#888070] leading-[1.5] mb-[10px] line-clamp-2">{post.preview}</div>

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

      <div className="flex gap-3 items-center pt-2 border-t border-black/[0.08]">
        <span className="flex items-center gap-[3px] text-[0.75rem] text-[#888070]">👁 {formatCount(post.views)}</span>
        <span className="flex items-center gap-[3px] text-[0.75rem] text-[#888070]">💬 {formatCount(post.comments)}</span>
        <span className="flex items-center gap-[3px] text-[0.75rem] text-[#888070]">❤️ {formatCount(post.likes)}</span>
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleHelped(post.id); }}
          className={`ml-auto bg-[#F5F3EE] border border-black/[0.08] rounded-lg px-[10px] py-1 text-[0.75rem] font-semibold transition-colors ${helped ? "text-[#2B7A50] border-[#2B7A50]" : "text-[#181614]"}`}
        >
          {helped ? "✓ 도움됨" : "👍 도움돼요"}
        </button>
      </div>
    </Link>
  );
}

// post 객체 ref가 같으면 리렌더 회피 (useMemo로 캐싱된 리스트와 함께 사용 시 효과)
export default memo(CommunityPostCardBase, (prev, next) => prev.post === next.post);
