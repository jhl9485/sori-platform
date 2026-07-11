"use client";

import { useEffect, useState } from "react";
import { SAMPLE_COMMENTS } from "@/data/communityPosts";

// 정적(예시) 댓글 수 — 글별 최상위 댓글 개수
export function baseCommentCount(postId: string): number {
  return SAMPLE_COMMENTS[postId]?.length ?? 0;
}

// 사용자가 추가한 댓글 수(글별) — localStorage 반응형
export function useUserCommentCounts(): Record<string, number> {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const read = () => {
      try {
        const raw = localStorage.getItem("sori_user_comments");
        const obj = raw ? JSON.parse(raw) : {};
        const c: Record<string, number> = {};
        for (const k of Object.keys(obj)) c[k] = Array.isArray(obj[k]) ? obj[k].length : 0;
        setCounts(c);
      } catch {
        /* ignore */
      }
    };
    read();
    const h = (e: StorageEvent) => {
      if (e.key === "sori_user_comments") read();
    };
    window.addEventListener("storage", h);
    return () => window.removeEventListener("storage", h);
  }, []);

  return counts;
}

// 실제 표시용 댓글 수 = 예시 + 사용자 추가
export function realCommentCount(postId: string, userCounts: Record<string, number>): number {
  return baseCommentCount(postId) + (userCounts[postId] || 0);
}
