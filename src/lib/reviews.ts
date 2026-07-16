"use client";

import { useEffect, useState } from "react";
import type { BizReview } from "@/data/businesses";

// 사용자가 쓴 업소 리뷰 — { [업소id]: BizReview[] }
//
// ⚠️ 백엔드가 없는 MVP라 리뷰는 이 브라우저에만 저장된다. 다른 사람은 볼 수 없고,
// 다른 사람이 쓴 리뷰도 여기엔 안 보인다. 화면에 그 한계를 명시할 것.
// 별점(rating)은 받지 않는다 — 실존 업소에 근거 없는 평점을 붙이지 않기 위함.
// 나중에 백엔드를 붙이면 이 구조 그대로 서버 리뷰로 옮길 수 있다.
const KEY = "sori_user_reviews";

type ReviewMap = Record<string, BizReview[]>;

function read(): ReviewMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY);
    const obj = raw ? JSON.parse(raw) : {};
    return obj && typeof obj === "object" ? obj : {};
  } catch {
    return {};
  }
}

function write(map: ReviewMap): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(map));
    // 같은 탭의 다른 구독자(카드의 리뷰 수 등)도 갱신되도록 수동 dispatch
    window.dispatchEvent(new StorageEvent("storage", { key: KEY }));
  } catch {
    /* quota 초과 등 무시 */
  }
}

/** 업소별 내 리뷰 목록 — localStorage 반응형 */
export function useUserReviews(): ReviewMap {
  const [map, setMap] = useState<ReviewMap>({});

  useEffect(() => {
    const refresh = () => setMap(read());
    refresh();
    const handler = (e: StorageEvent) => { if (e.key === KEY) refresh(); };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return map;
}

/** 화면에 표시할 리뷰 수 = 시드 리뷰 수 + 내가 쓴 리뷰 수 */
export function useBizReviewCount(bizId: string, seed: number): number {
  const map = useUserReviews();
  return seed + (map[bizId]?.length ?? 0);
}

export function addReview(bizId: string, review: BizReview): void {
  const map = read();
  map[bizId] = [review, ...(map[bizId] ?? [])];
  write(map);
}

export function removeReview(bizId: string, reviewId: string): void {
  const map = read();
  const next = (map[bizId] ?? []).filter((r) => r.id !== reviewId);
  if (next.length > 0) map[bizId] = next;
  else delete map[bizId];
  write(map);
}
