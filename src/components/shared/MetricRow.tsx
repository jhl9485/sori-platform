"use client";

import { useState } from "react";
import { useToggleSet } from "@/lib/storage";
import { formatCount } from "@/lib/format";

// 데이터마다 타입이 다르다 — 커뮤니티는 "1,203" 같은 문자열, 벼룩·부동산은 숫자.
// 양쪽 다 받아서 숫자로 맞춘다.
type Count = number | string | undefined;

function toNum(v: Count): number {
  if (v === undefined) return 0;
  if (typeof v === "number") return Number.isFinite(v) ? v : 0;
  const n = parseInt(v.replace(/,/g, ""), 10);
  return Number.isNaN(n) ? 0 : n;
}

interface Props {
  likeKey: string;      // LIKE_KEY.biz 등
  viewKey?: string;     // VIEW_KEY.biz 등. 없으면 조회수는 데이터 값 그대로(집계 안 함)
  id: string;
  seedLikes?: Count;    // 데이터에 박힌 기준 숫자 (업소는 실제 집계만 쓰므로 0)
  seedViews?: Count;
  comments?: Count;     // 있으면 💬 댓글수까지 표시 (커뮤니티)
  variant?: "card" | "detail";
  className?: string;
}

/**
 * ❤️ 좋아요 · 👁 조회수 (· 💬 댓글수) — 카드와 상세가 같은 숫자·같은 모양으로 보이게 하는 공용 지표.
 * 지표를 쓰는 모든 화면이 이 컴포넌트 하나를 공유한다 (같은 마크업을 복사하면 정렬이 또 어긋난다).
 * 저장(🔖)은 뜻이 다른 기능이라 여기 포함하지 않는다.
 */
export default function MetricRow({
  likeKey,
  viewKey,
  id,
  seedLikes,
  seedViews,
  comments,
  variant = "card",
  className = "",
}: Props) {
  const { has: isLiked, toggle: toggleLike } = useToggleSet(likeKey);
  // viewKey가 없으면 매칭되는 키가 없어 항상 빈 집합 → 조회수는 seedViews 그대로
  const { has: isViewed } = useToggleSet(viewKey ?? "");
  const [pop, setPop] = useState(false);

  const liked = isLiked(id);
  const likeCount = toNum(seedLikes) + (liked ? 1 : 0);
  const viewCount = toNum(seedViews) + (viewKey && isViewed(id) ? 1 : 0);

  const detail = variant === "detail";
  const textSize = detail ? "text-[0.82rem]" : "text-[0.7rem]";

  // 아이콘/숫자 높이 맞추기:
  // - 아이콘 크기를 em으로 잡아 카드·상세가 같은 비율을 유지한다.
  // - 둘 다 leading-none + 부모 items-center → 글자 상자의 중심이 정확히 겹친다.
  // - 이모지는 글리프가 상자 안에서 살짝 아래에 그려져 숫자보다 내려가 보이므로 0.5px 올린다.
  const icon = "text-[1.1em] leading-none -translate-y-[0.5px]";
  const num = "leading-none tabular-nums";

  return (
    <div className={`flex items-center ${detail ? "gap-3" : "gap-2"} ${textSize} ${className}`}>
      <button
        onClick={(e) => {
          // 카드가 <Link> 안에 있는 경우 상세로 이동하지 않도록 막는다
          e.preventDefault();
          e.stopPropagation();
          toggleLike(id);
          setPop(true);
          setTimeout(() => setPop(false), 260);
        }}
        className={`flex items-center gap-[2px] font-medium transition-colors ${
          liked ? "text-[#D04020]" : "text-[#888070] hover:text-[#D04020]"
        }`}
        aria-label="좋아요"
      >
        <span className={`${icon} transition-transform duration-200 ${pop ? "scale-[1.35]" : "scale-100"}`}>
          {liked ? "❤️" : "🤍"}
        </span>
        <span className={num}>{formatCount(likeCount)}</span>
      </button>
      <span className="flex items-center gap-[2px] text-[#888070]">
        <span className={icon}>👁</span>
        <span className={num}>{formatCount(viewCount)}</span>
      </span>
      {comments !== undefined && (
        <span className="flex items-center gap-[2px] text-[#888070]">
          <span className={icon}>💬</span>
          <span className={num}>{formatCount(toNum(comments))}</span>
        </span>
      )}
    </div>
  );
}
