"use client";

import { useState } from "react";
import type { BizReview } from "@/data/businesses";
import { useUserReviews, addReview, removeReview } from "@/lib/reviews";
import { useProfile } from "@/lib/profile";
import { useAuth } from "@/lib/auth";
import { useAuthGate } from "@/lib/auth";
import { toast, confirmDialog } from "@/components/shared/Feedback";
import { relativeTime } from "@/lib/userContent";

const MAX = 1000;

/**
 * 업소 리뷰 — 목록 + 작성.
 * 별점은 받지 않는다(실존 업소에 근거 없는 평점을 붙이지 않기 위함). 글만 받는다.
 */
export default function BizReviewSection({
  bizId,
  seedReviews,
}: {
  bizId: string;
  seedReviews: BizReview[];
}) {
  const reviewMap = useUserReviews();
  const { profile } = useProfile();
  const { isAuthed, hydrated } = useAuth();
  const gate = useAuthGate();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const myReviews = reviewMap[bizId] ?? [];
  const myIds = new Set(myReviews.map((r) => r.id));
  const all = [...myReviews, ...seedReviews];

  const handleOpen = () => {
    if (!gate("리뷰는 로그인 후 남길 수 있어요.")) return;
    setOpen(true);
  };

  const handleSubmit = () => {
    const content = text.trim();
    if (!content) return;
    addReview(bizId, {
      id: `ur-${Date.now()}`,
      author: profile.name,
      avatarChar: profile.avatarChar,
      avatarBg: "#FBF0EC",
      avatarColor: "#D04020",
      content,
      time: new Date().toISOString(),
    });
    setText("");
    setOpen(false);
    toast("✅ 리뷰가 등록되었어요.");
  };

  const handleDelete = async (reviewId: string) => {
    const ok = await confirmDialog({
      message: "이 리뷰를 삭제할까요?",
      confirmText: "삭제",
      danger: true,
    });
    if (!ok) return;
    removeReview(bizId, reviewId);
    toast("🗑️ 리뷰를 삭제했어요.");
  };

  return (
    <div className="bg-white">
      {/* 작성 */}
      <div className="px-4 md:px-6 py-4 border-b border-black/[0.06]">
        {open ? (
          <div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, MAX))}
              rows={5}
              autoFocus
              placeholder={"직접 다녀온 경험을 적어주세요.\n\n예시:\n- 김치찌개가 한국이랑 거의 같은 맛\n- 점심시간엔 20분 정도 대기\n- 사장님이 한국어로 응대해주셔서 편했어요"}
              className="w-full bg-[#F5F3EE] rounded-[10px] px-4 py-3 text-[0.85rem] leading-relaxed outline-none placeholder:text-[#C0BBB0] resize-none"
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-[0.68rem] text-[#C0BBB0]">{text.length} / {MAX}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => { setOpen(false); setText(""); }}
                  className="px-3 py-2 rounded-[10px] text-[0.8rem] font-medium text-[#888070] hover:bg-[#F5F3EE] transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!text.trim()}
                  className="px-4 py-2 rounded-[10px] text-[0.8rem] font-bold text-white bg-[#D04020] hover:bg-[#B83515] disabled:bg-[#C0BBB0] disabled:cursor-not-allowed transition-colors"
                >
                  등록
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={handleOpen}
            className="w-full py-3 border-2 border-dashed border-black/[0.12] rounded-[12px] text-[0.82rem] text-[#888070] hover:border-[#D04020] hover:text-[#D04020] transition-colors"
          >
            ✍️ 리뷰 작성하기
          </button>
        )}
        {hydrated && !isAuthed && !open && (
          <p className="text-[0.68rem] text-[#888070] mt-2 text-center">로그인하면 리뷰를 남길 수 있어요.</p>
        )}
      </div>

      {/* 목록 */}
      {all.length === 0 ? (
        <div className="px-4 md:px-6 py-10 text-center">
          <div className="text-3xl mb-2">💬</div>
          <div className="text-[0.85rem] font-medium text-[#888070]">아직 리뷰가 없어요</div>
          <div className="text-[0.72rem] text-[#C0BBB0] mt-1">첫 리뷰를 남겨보세요</div>
        </div>
      ) : (
        <div className="divide-y divide-black/[0.05]">
          {all.map((review) => {
            const mine = myIds.has(review.id);
            return (
              <div key={review.id} className="px-4 md:px-6 py-4">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[0.85rem] font-bold flex-shrink-0"
                    style={{ background: review.avatarBg, color: review.avatarColor }}
                  >
                    {review.avatarChar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-[5px]">
                      <span className="text-[0.8rem] font-semibold truncate">{review.author}</span>
                      {mine && (
                        <span className="text-[0.58rem] bg-[#2B7A50] text-white px-[5px] py-[1px] rounded font-bold flex-shrink-0">나</span>
                      )}
                    </div>
                    <div className="text-[0.68rem] text-[#888070]" suppressHydrationWarning>
                      {mine ? relativeTime(review.time) : review.time}
                    </div>
                  </div>
                  {mine && (
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="text-[0.72rem] text-[#888070] hover:text-[#D04020] px-2 py-1 rounded-lg hover:bg-[#F5F3EE] transition-colors flex-shrink-0"
                    >
                      삭제
                    </button>
                  )}
                </div>
                <p className="text-[0.82rem] text-[#181614] leading-relaxed whitespace-pre-line">{review.content}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* MVP 한계 안내 — 사용자가 "왜 내 리뷰가 남에게 안 보이지?"로 혼란하지 않도록 */}
      {myReviews.length > 0 && (
        <div className="px-4 md:px-6 py-3 bg-[#FBF5E8] flex items-start gap-2">
          <span className="text-sm flex-shrink-0">💡</span>
          <p className="text-[0.7rem] text-[#B07010] leading-relaxed">
            지금은 서버 연동 전이라 내가 쓴 리뷰는 <b>이 기기에서만</b> 보여요. 다른 사람에게는 아직 표시되지 않아요.
          </p>
        </div>
      )}
    </div>
  );
}
