"use client";

import { useState } from "react";
import Link from "next/link";
import type { CommunityPost, VisaBadge } from "@/data/communityPosts";

const VISA_BADGE_STYLE: Record<NonNullable<VisaBadge>, string> = {
  "EP":    "bg-[#EBF0FB] text-[#2050A0]",
  "S-Pass":"bg-[#EBF5F0] text-[#2B7A50]",
  "DP":    "bg-[#FBF5E8] text-[#B07010]",
  "PR":    "bg-[#F0EDE8] text-[#555]",
  "시민권": "bg-[#181614] text-white",
  "WH":   "bg-[#F5F0FF] text-[#7040C0]",
};

export default function CommunityPostCard({ post }: { post: CommunityPost }) {
  const [helped, setHelped] = useState(false);

  return (
    <Link href={`/community/${post.id}`} className="block bg-white rounded-[14px] border border-black/[0.08] p-[14px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-shadow animate-fade-up">
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

      <div className="text-[0.9rem] font-bold mb-1 tracking-tight line-clamp-2">{post.title}</div>
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
        <span className="flex items-center gap-[3px] text-[0.75rem] text-[#888070]">👁 {post.views}</span>
        <span className="flex items-center gap-[3px] text-[0.75rem] text-[#888070]">💬 {post.comments}</span>
        <span className="flex items-center gap-[3px] text-[0.75rem] text-[#888070]">❤️ {post.likes}</span>
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setHelped(true); }}
          className={`ml-auto bg-[#F5F3EE] border border-black/[0.08] rounded-lg px-[10px] py-1 text-[0.75rem] font-semibold transition-colors ${helped ? "text-[#2B7A50] border-[#2B7A50]" : "text-[#181614]"}`}
        >
          {helped ? "✓ 도움됨" : "👍 도움돼요"}
        </button>
      </div>
    </Link>
  );
}
