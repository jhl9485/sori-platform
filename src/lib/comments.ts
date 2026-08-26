"use client";

import { useEffect, useState } from "react";
// 예시 댓글 수 계산은 서버 컴포넌트(커뮤니티 상세의 구조화 데이터)도 써야 해서
// "use client"가 없는 lib/commentCount.ts로 옮겼다. 구현은 그쪽 한 벌뿐이다.
import { baseCommentCount } from "./commentCount";
import { SAMPLE_COMMENTS, type Comment } from "@/data/communityPosts";

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

// ── 내가 남긴 댓글 모으기 (마이페이지 "내 댓글" 탭) ──
// 사이드바·서랍의 "내 댓글" 메뉴가 갈 곳이 없어 활동 탭으로 보내고 있었다(기-8).
// 댓글은 두 곳에 나뉘어 저장된다:
//   sori_user_comments  Record<글id, 댓글[]>        → 글id를 바로 안다
//   sori_user_replies   Record<부모댓글id, 답글[]>  → 글id를 모른다 → 아래에서 되찾는다

export interface MyComment {
  id: string;
  postId: string;      // "news-"로 시작하면 뉴스, 아니면 커뮤니티 글
  content: string;
  time: string;
  createdAt?: string;
  isReply: boolean;
}

function containsId(list: Comment[] | undefined, id: string): boolean {
  if (!list) return false;
  return list.some((c) => c.id === id || containsId(c.replies, id));
}

// 답글 id는 부모 id에 "-r-<시각>"을 붙여 만든다(CommentSection의 submitReply).
// 그래서 뒤쪽 "-r-숫자"를 떼면 최상위 댓글 id가 나온다 — 2단계 답글도 한 번에 처리된다.
function rootCommentId(id: string): string {
  return id.replace(/(-r-\d+)+$/, "");
}

function findPostIdOfComment(commentId: string, userComments: Record<string, Comment[]>): string | null {
  const root = rootCommentId(commentId);
  for (const [postId, list] of Object.entries(userComments)) {
    if (Array.isArray(list) && list.some((c) => c.id === root)) return postId;
  }
  // 예시(시드) 댓글에 단 답글
  for (const [postId, list] of Object.entries(SAMPLE_COMMENTS)) {
    if (containsId(list, root)) return postId;
  }
  return null;
}

export function useMyComments(): MyComment[] {
  const [items, setItems] = useState<MyComment[]>([]);

  useEffect(() => {
    const read = () => {
      try {
        const rawC = localStorage.getItem("sori_user_comments");
        const byPost: Record<string, Comment[]> = rawC ? JSON.parse(rawC) : {};
        const rawR = localStorage.getItem("sori_user_replies");
        const byParent: Record<string, Comment[]> = rawR ? JSON.parse(rawR) : {};

        const out: MyComment[] = [];
        for (const [postId, list] of Object.entries(byPost)) {
          if (!Array.isArray(list)) continue;
          for (const c of list) out.push({ id: c.id, postId, content: c.content, time: c.time, createdAt: c.createdAt, isReply: false });
        }
        for (const [parentId, list] of Object.entries(byParent)) {
          if (!Array.isArray(list)) continue;
          const postId = findPostIdOfComment(parentId, byPost);
          if (!postId) continue; // 어느 글의 답글인지 못 찾으면 건너뛴다(잘못 안내하느니 빼는 게 낫다)
          for (const r of list) out.push({ id: r.id, postId, content: r.content, time: r.time, createdAt: r.createdAt, isReply: true });
        }
        // 최신순. createdAt이 없는 예전 데이터는 뒤로 보낸다.
        out.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
        setItems(out);
      } catch {
        /* ignore */
      }
    };
    read();
    const h = (e: StorageEvent) => {
      if (e.key === "sori_user_comments" || e.key === "sori_user_replies") read();
    };
    window.addEventListener("storage", h);
    return () => window.removeEventListener("storage", h);
  }, []);

  return items;
}
