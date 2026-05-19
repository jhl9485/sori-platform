"use client";

import { useState } from "react";
import type { FeedItem, FeedCategory } from "@/types/feed";

const categoryStyle: Record<FeedCategory, string> = {
  생활정보: "bg-[#EBF0FB] text-[#2050A0]",
  맛집: "bg-[#FBF0EC] text-[#D04020]",
  취업: "bg-[#EBF5F0] text-[#2B7A50]",
  생활: "bg-[#FBF5E8] text-[#B07010]",
};

export default function FeedCard({ item }: { item: FeedItem }) {
  const [helped, setHelped] = useState(false);

  return (
    <div className="bg-white rounded-[14px] border border-black/[0.08] p-[14px] cursor-pointer hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-shadow animate-fade-up">
      {/* 헤더 */}
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-[0.9rem] font-bold flex-shrink-0"
          style={{ background: item.avatarBg, color: item.avatarColor }}
        >
          {item.avatarChar}
        </div>
        <div className="flex-1">
          <div className="text-[0.8rem] font-semibold">{item.author}</div>
          <div className="text-[0.72rem] text-[#888070]">{item.time}</div>
        </div>
        <span
          className={`text-[0.68rem] px-2 py-[3px] rounded-full font-semibold whitespace-nowrap ${categoryStyle[item.category]}`}
        >
          {item.category}
        </span>
      </div>

      {/* 본문 */}
      <div className="text-[0.9rem] font-bold mb-1 tracking-tight">{item.title}</div>
      <div className="text-[0.8rem] text-[#888070] leading-[1.5] mb-[10px]">{item.preview}</div>

      {/* 태그 */}
      <div className="flex flex-wrap gap-[5px] mb-2">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="text-[0.68rem] bg-[#F5F3EE] border border-black/[0.08] rounded-full px-2 py-[2px] text-[#888070]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* 푸터 */}
      <div className="flex gap-3 items-center pt-2 border-t border-black/[0.08]">
        <span className="flex items-center gap-[3px] text-[0.75rem] text-[#888070]">
          👁 {item.views}
        </span>
        <span className="flex items-center gap-[3px] text-[0.75rem] text-[#888070]">
          💬 {item.comments}
        </span>
        <span className="flex items-center gap-[3px] text-[0.75rem] text-[#888070]">
          ❤️ {item.likes}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setHelped(true);
          }}
          className={`ml-auto bg-[#F5F3EE] border border-black/[0.08] rounded-lg px-[10px] py-1 text-[0.75rem] font-semibold transition-colors ${
            helped ? "text-[#2B7A50]" : "text-[#181614]"
          }`}
        >
          {helped ? "✓ 도움됨" : "👍 도움돼요"}
        </button>
      </div>
    </div>
  );
}
