"use client";

import { useBizReviewCount } from "@/lib/reviews";

/**
 * 업소 카드/상세의 리뷰 수 표시.
 * 별점(★)은 쓰지 않는다 — 별점을 받지 않으므로 평균 별점이 존재할 수 없다.
 * 목록 카드는 항목마다 훅을 부를 수 없어 별도 컴포넌트로 분리했다.
 */
export default function BizReviewCount({
  bizId,
  seed,
  size = "card",
}: {
  bizId: string;
  seed: number;
  size?: "card" | "detail";
}) {
  const count = useBizReviewCount(bizId, seed);
  const cls = size === "detail" ? "text-[0.8rem]" : "text-[0.7rem]";

  if (count === 0) {
    return <span className={`${cls} text-[#888070]`}>🆕 신규 · 아직 리뷰가 없어요</span>;
  }
  return <span className={`${cls} text-[#888070]`}>💬 리뷰 {count}개</span>;
}
