"use client";

import { useState } from "react";
import MetricRow, { type Count } from "@/components/shared/MetricRow";
import { useToggleSet } from "@/lib/storage";
import { useAuthGate } from "@/lib/auth";
import { toast } from "@/components/shared/Feedback";

interface Props {
  id: string;
  likeKey: string;
  viewKey?: string;
  saveKey: string;
  seedLikes?: Count;
  seedViews?: Count;
  comments?: Count;      // 있으면 💬 댓글수까지 (커뮤니티)
  shareTitle: string;
  shareText?: string;
  className?: string;
}

/**
 * 상세 페이지 공용 액션 바 — 모든 카테고리가 같은 배치를 쓴다.
 *
 *   ❤️ 좋아요 · 👁 조회수 (· 💬 댓글수)  ───────  🔖 저장   ↗ 공유
 *
 * 지표는 왼쪽, 저장·공유는 오른쪽. 카테고리마다 따로 만들면 배치가 어긋나므로
 * 상세 페이지는 반드시 이 컴포넌트를 쓴다.
 */
export default function DetailActions({
  id,
  likeKey,
  viewKey,
  saveKey,
  seedLikes,
  seedViews,
  comments,
  shareTitle,
  shareText,
  className = "",
}: Props) {
  const { has: isSaved, toggle: toggleSave } = useToggleSet(saveKey);
  const gate = useAuthGate();
  const [savePop, setSavePop] = useState(false);
  const saved = isSaved(id);

  const handleSave = () => {
    if (!gate("저장은 로그인 후 이용할 수 있어요.")) return;
    toggleSave(id);
    setSavePop(true);
    setTimeout(() => setSavePop(false), 260);
    toast(saved ? "저장을 해제했어요." : "🔖 저장했어요.");
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      // 사용자가 공유 시트를 닫으면 reject되므로 조용히 무시한다
      navigator.share({ title: shareTitle, text: shareText, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      toast("링크가 복사되었어요.");
    }
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <MetricRow
        likeKey={likeKey}
        viewKey={viewKey}
        id={id}
        seedLikes={seedLikes}
        seedViews={seedViews}
        comments={comments}
        variant="detail"
      />
      <button
        onClick={handleSave}
        className={`flex items-center gap-[3px] text-[0.82rem] ml-auto transition-colors ${
          saved ? "text-[#2050A0]" : "text-[#888070] hover:text-[#2050A0]"
        }`}
      >
        <span className={`text-[1.1em] leading-none -translate-y-[0.5px] transition-transform duration-200 ${savePop ? "scale-[1.3]" : "scale-100"}`}>
          {saved ? "🔖" : "🏷️"}
        </span>
        <span className="leading-none">{saved ? "저장됨" : "저장"}</span>
      </button>
      <button
        onClick={handleShare}
        className="flex items-center gap-[3px] text-[0.82rem] text-[#888070] hover:text-[#181614] transition-colors"
      >
        <span className="leading-none">↗</span>
        <span className="leading-none">공유</span>
      </button>
    </div>
  );
}
