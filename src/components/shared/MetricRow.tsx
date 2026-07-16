"use client";

import { useState } from "react";
import { useToggleSet } from "@/lib/storage";
import { formatCount } from "@/lib/format";

interface Props {
  likeKey: string;      // LIKE_KEY.biz 등
  viewKey: string;      // VIEW_KEY.biz 등
  id: string;
  seedLikes?: number;   // 데이터에 박힌 기준 숫자 (업소는 실제 집계만 쓰므로 0)
  seedViews?: number;
  variant?: "card" | "detail";
  className?: string;
}

/**
 * ❤️ 좋아요 · 👁 조회수 — 카드와 상세에서 같은 숫자·같은 모양으로 보이게 하는 공용 지표.
 * 커뮤니티 글의 액션 바와 동일한 규칙을 따른다(❤️=좋아요, 👁=조회수).
 * 저장(🔖)은 뜻이 다른 기능이라 여기 포함하지 않는다.
 */
export default function MetricRow({
  likeKey,
  viewKey,
  id,
  seedLikes = 0,
  seedViews = 0,
  variant = "card",
  className = "",
}: Props) {
  const { has: isLiked, toggle: toggleLike } = useToggleSet(likeKey);
  const { has: isViewed } = useToggleSet(viewKey);
  const [pop, setPop] = useState(false);

  const liked = isLiked(id);
  const likeCount = seedLikes + (liked ? 1 : 0);
  const viewCount = seedViews + (isViewed(id) ? 1 : 0);

  const detail = variant === "detail";
  const textSize = detail ? "text-[0.82rem]" : "text-[0.7rem]";
  const iconSize = detail ? "text-[1rem]" : "text-[0.85rem]";

  return (
    <div className={`flex items-center ${detail ? "gap-4" : "gap-[10px]"} ${textSize} ${className}`}>
      <button
        onClick={(e) => {
          // 카드가 <Link> 안에 있는 경우 상세로 이동하지 않도록 막는다
          e.preventDefault();
          e.stopPropagation();
          toggleLike(id);
          setPop(true);
          setTimeout(() => setPop(false), 260);
        }}
        className={`flex items-center gap-[4px] font-medium transition-colors ${
          liked ? "text-[#D04020]" : "text-[#888070] hover:text-[#D04020]"
        }`}
        aria-label="좋아요"
      >
        <span className={`${iconSize} leading-none transition-transform duration-200 ${pop ? "scale-[1.35]" : "scale-100"}`}>
          {liked ? "❤️" : "🤍"}
        </span>
        <span className="leading-none">{formatCount(likeCount)}</span>
      </button>
      <span className="flex items-center gap-[4px] text-[#888070]">
        <span className={`${iconSize} leading-none`}>👁</span>
        <span className="leading-none">{formatCount(viewCount)}</span>
      </span>
    </div>
  );
}
