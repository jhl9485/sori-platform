"use client";

import { useEffect, useState } from "react";
// 예시 댓글 수 계산은 서버 컴포넌트(커뮤니티 상세의 구조화 데이터)도 써야 해서
// "use client"가 없는 lib/commentCount.ts로 옮겼다. 구현은 그쪽 한 벌뿐이다.
import { baseCommentCount } from "./commentCount";

export { baseCommentCount };

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
