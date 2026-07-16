"use client";

import { useEffect } from "react";
import { useToggleSet } from "@/lib/storage";

// 좋아요·조회수·저장 localStorage 키.
// 카드와 상세가 반드시 같은 키를 써야 숫자가 일치하므로 키는 여기서만 정의한다.
// (community/news 키는 기존 데이터를 유지하려고 예전 이름을 그대로 쓴다)
export const LIKE_KEY = {
  community: "sori_liked_posts",
  news: "sori_liked_news",
  biz: "sori_liked_biz",
  flea: "sori_liked_flea",
  realty: "sori_liked_realty",
  jobs: "sori_liked_jobs",
} as const;

export const VIEW_KEY = {
  community: "sori_viewed_posts",
  news: "sori_viewed_news",
  biz: "sori_viewed_biz",
  flea: "sori_viewed_flea",
  realty: "sori_viewed_realty",
  jobs: "sori_viewed_jobs",
} as const;

export const SAVE_KEY = {
  community: "sori_saved_posts",
  news: "sori_saved_news",
  biz: "sori_saved_biz",
  flea: "sori_saved_flea",
  realty: "sori_saved_realty",
  jobs: "sori_saved_jobs",
} as const;

/**
 * 상세 페이지를 열면 그 항목을 "봤음"으로 기록한다.
 *
 * ⚠️ 백엔드가 없는 MVP라 집계는 브라우저 단위다. 같은 항목을 여러 번 열어도
 * 중복으로 오르지 않고, 다른 사람의 조회는 알 수 없다. 그래서 화면에 보이는 조회수는
 * `시드 숫자 + (내가 봤으면 1)`이다. 좋아요와 정확히 같은 방식.
 */
export function useMarkViewed(key: string, id: string | undefined) {
  const { add } = useToggleSet(key);

  useEffect(() => {
    if (!id) return;
    add(id);
  }, [add, id]);
}
