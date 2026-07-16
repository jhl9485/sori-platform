"use client";

import { useMemo } from "react";
import type { NotificationItem } from "@/data/notifications";
import { JOBS } from "@/data/jobs";
import { FLEA_ITEMS } from "@/data/fleaItems";
import { REALTY_ITEMS } from "@/data/realtyItems";
import { useUserPosts, useUserJobs, useUserFlea, useUserRealty } from "@/lib/userContent";
import { useToggleSet } from "@/lib/storage";
import { SAVE_KEY } from "@/lib/metrics";
import { useUserCommentCounts, realCommentCount } from "@/lib/comments";
import { isJobClosed } from "@/lib/jobStatus";
import { cardTime, resolveISO } from "@/lib/format";

/**
 * 실제 로컬 데이터로 만드는 알림.
 *
 * ⚠️ 백엔드가 없는 단일 사용자 MVP라 "다른 사람이 내 글에 반응" 같은 알림은 만들 수 없다.
 * 대신 이 기기에 실제로 존재하는 신호만 알림으로 바꾼다:
 *   1) 저장한 채용 공고가 마감됨
 *   2) 저장한 매물/물건이 거래완료됨
 *   3) 내가 쓴 커뮤니티 글에 달린 댓글
 * 신호가 없으면 빈 목록을 반환한다(가짜 알림을 만들지 않는다).
 */
export function useLiveNotifications(): NotificationItem[] {
  const userPosts = useUserPosts();
  const userJobs = useUserJobs();
  const userFlea = useUserFlea();
  const userRealty = useUserRealty();
  const commentCounts = useUserCommentCounts();

  const { ids: savedJobIds } = useToggleSet(SAVE_KEY.jobs);
  const { ids: savedFleaIds } = useToggleSet(SAVE_KEY.flea);
  const { ids: savedRealtyIds } = useToggleSet(SAVE_KEY.realty);

  return useMemo(() => {
    const items: NotificationItem[] = [];
    const allJobs = [...userJobs, ...JOBS];
    const allFlea = [...userFlea, ...FLEA_ITEMS];
    const allRealty = [...userRealty, ...REALTY_ITEMS];

    // 1) 저장한 공고 마감
    for (const id of Array.from(savedJobIds)) {
      const job = allJobs.find((j) => j.id === id);
      if (job && isJobClosed(job.deadline)) {
        items.push({
          id: `job-closed-${id}`,
          type: "job",
          icon: "🔒",
          iconBg: "bg-[#F0EDE8]",
          title: "저장한 공고가 마감됐어요",
          body: `${job.title} · ${job.company}`,
          time: "",
          link: `/jobs/${id}`,
        });
      }
    }

    // 2) 저장한 물건/매물 거래완료
    for (const id of Array.from(savedFleaIds)) {
      const it = allFlea.find((f) => f.id === id);
      if (it && it.status === "판매완료") {
        items.push({
          id: `flea-done-${id}`,
          type: "biz",
          icon: "✅",
          iconBg: "bg-[#EBF5F0]",
          title: "저장한 물건이 판매완료됐어요",
          body: `${it.title} · ${it.price}`,
          time: "",
          link: `/flea/${id}`,
        });
      }
    }
    for (const id of Array.from(savedRealtyIds)) {
      const it = allRealty.find((r) => r.id === id);
      if (it && it.status === "완료") {
        items.push({
          id: `realty-done-${id}`,
          type: "biz",
          icon: "✅",
          iconBg: "bg-[#EBF5F0]",
          title: "저장한 매물이 거래완료됐어요",
          body: `${it.title} · ${it.price}`,
          time: "",
          link: `/realty/${id}`,
        });
      }
    }

    // 3) 내 글에 달린 댓글 (id에 개수를 넣어 새 댓글이 달리면 새 알림으로 보이게)
    for (const post of userPosts) {
      const count = realCommentCount(post.id, commentCounts);
      if (count > 0) {
        items.push({
          id: `post-comments-${post.id}-${count}`,
          type: "comment",
          icon: "💬",
          iconBg: "bg-[#EBF0FB]",
          title: "내 글에 댓글이 달렸어요",
          body: `${post.title} · 댓글 ${count}개`,
          time: cardTime(resolveISO(post.createdAt, post.time)),
          link: `/community/${post.id}`,
        });
      }
    }

    return items;
  }, [userPosts, userJobs, userFlea, userRealty, commentCounts, savedJobIds, savedFleaIds, savedRealtyIds]);
}
