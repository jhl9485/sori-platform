"use client";

import { useEffect, useState } from "react";
import { SAMPLE_COMMENTS, type Comment } from "@/data/communityPosts";

// 정적(예시) 댓글 수 — 글별. 답글까지 포함해서 센다.
// 예전에는 최상위 배열 길이만 셌다. 그래서 글 1은 화면에 말풍선이 6개(최상위 4 + 답글 2)인데
// 라벨은 "댓글 4개"로 나왔다. 사용자가 세는 것은 화면에 보이는 말풍선 수이므로 답글도 포함한다.
// 답글은 2단계까지 달릴 수 있어(CommentSection의 depth < 2) 재귀로 센다.
function countWithReplies(list: Comment[] | undefined): number {
  if (!list) return 0;
  return list.reduce((sum, c) => sum + 1 + countWithReplies(c.replies), 0);
}

export function baseCommentCount(postId: string): number {
  return countWithReplies(SAMPLE_COMMENTS[postId]);
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
