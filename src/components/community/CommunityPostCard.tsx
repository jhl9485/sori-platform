"use client";

import { useState } from "react";
import type { CommunityPost } from "@/data/communityPosts";

export default function CommunityPostCard({ post }: { post: CommunityPost }) {
  const [helped, setHelped] = useState(false);

  return (
    <div className="bg-white rounded-[14px] border border-black/[0.08] p-[14px] cursor-pointer hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-shadow animate-fade-up">
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-[0.9rem] font-bold flex-shrink-0"
          style={{ background: post.avatarBg, color: post.avatarColor }}
        >
          {post.avatarChar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[0.8rem] font-semibold truncate">{post.author}</div>
          <div className="text-[0.72rem] text-[#888070]">{post.time}</div>
        </div>
        <span className={`text-[0.68rem] px-2 py-[3px] rounded-full font-semibold whitespace-nowrap flex-shrink-0 ${post.categoryStyle}`}>
          {post.categoryLabel}
        </span>
      </div>

      <div className="text-[0.9rem] font-bold mb-1 tracking-tight">{post.title}</div>
      <div className="text-[0.8rem] text-[#888070] leading-[1.5] mb-[10px] line-clamp-2">{post.preview}</div>

      <div className="flex flex-wrap gap-[5px] mb-2">
        {post.tags.map((tag) => (
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
          onClick={(e) => { e.stopPropagation(); setHelped(true); }}
          className={`ml-auto bg-[#F5F3EE] border border-black/[0.08] rounded-lg px-[10px] py-1 text-[0.75rem] font-semibold transition-colors ${helped ? "text-[#2B7A50]" : "text-[#181614]"}`}
        >
          {helped ? "✓ 도움됨" : "👍 도움돼요"}
        </button>
      </div>
    </div>
  );
}
