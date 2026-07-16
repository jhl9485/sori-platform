"use client";

import { useState } from "react";
import { useJobQuestions, addQuestion, removeQuestion, answerQuestion } from "@/lib/jobQuestions";
import { useProfile } from "@/lib/profile";
import { useAuth, useAuthGate } from "@/lib/auth";
import { toast, confirmDialog } from "@/components/shared/Feedback";
import { relativeTime } from "@/lib/userContent";

const MAX = 500;

/**
 * 채용 공고 질문하기 — 누구나(로그인 시) 질문할 수 있고, 답변은 공고 작성자만 단다.
 * 시드 공고는 답변할 작성자가 없으므로 호출 측에서 렌더하지 않는다.
 */
export default function JobQuestions({ jobId, isOwner }: { jobId: string; isOwner: boolean }) {
  const questions = useJobQuestions(jobId);
  const { profile } = useProfile();
  const { isAuthed, hydrated } = useAuth();
  const gate = useAuthGate();
  const [text, setText] = useState("");
  const [answering, setAnswering] = useState<string | null>(null);
  const [answerText, setAnswerText] = useState("");

  const handleAsk = () => {
    if (!gate("질문은 로그인 후 남길 수 있어요.")) return;
    const content = text.trim();
    if (!content) return;
    addQuestion(jobId, {
      id: `q-${Date.now()}`,
      author: profile.name,
      avatarChar: profile.avatarChar,
      content,
      createdAt: new Date().toISOString(),
    });
    setText("");
    toast("✅ 질문을 남겼어요.");
  };

  const handleAnswer = (questionId: string) => {
    const content = answerText.trim();
    if (!content) return;
    answerQuestion(jobId, questionId, content);
    setAnswering(null);
    setAnswerText("");
    toast("✅ 답변을 등록했어요.");
  };

  const handleDelete = async (questionId: string) => {
    const ok = await confirmDialog({ message: "이 질문을 삭제할까요?", confirmText: "삭제", danger: true });
    if (!ok) return;
    removeQuestion(jobId, questionId);
    toast("🗑️ 질문을 삭제했어요.");
  };

  return (
    <div className="bg-white mt-2 px-4 md:px-6 py-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[0.9rem] font-bold">
          💬 질문하기 {questions.length > 0 && <span className="text-[#888070] font-medium">{questions.length}</span>}
        </h2>
        {isOwner && (
          <span className="text-[0.65rem] bg-[#EBF5F0] text-[#2B7A50] px-2 py-[2px] rounded-full font-bold">
            내 공고 — 답변 가능
          </span>
        )}
      </div>

      {/* 질문 입력 */}
      {hydrated && !isAuthed ? (
        <button
          onClick={() => gate("질문은 로그인 후 남길 수 있어요.")}
          className="w-full py-3 mb-4 border-2 border-dashed border-black/[0.12] rounded-[12px] text-[0.8rem] text-[#888070] hover:border-[#D04020] hover:text-[#D04020] transition-colors"
        >
          로그인하고 질문 남기기
        </button>
      ) : (
        <div className="mb-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, MAX))}
            rows={3}
            placeholder="궁금한 점을 남겨보세요. 공고를 올린 분이 답변해요."
            className="w-full bg-[#F5F3EE] rounded-[10px] px-4 py-3 text-[0.85rem] leading-relaxed outline-none placeholder:text-[#C0BBB0] resize-none"
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-[0.68rem] text-[#C0BBB0]">{text.length} / {MAX}</span>
            <button
              onClick={handleAsk}
              disabled={!text.trim()}
              className="px-4 py-2 rounded-[10px] text-[0.8rem] font-bold text-white bg-[#D04020] hover:bg-[#B83515] disabled:bg-[#C0BBB0] disabled:cursor-not-allowed transition-colors"
            >
              질문 등록
            </button>
          </div>
        </div>
      )}

      {/* 질문 목록 */}
      {questions.length === 0 ? (
        <p className="text-[0.78rem] text-[#888070] text-center py-4">아직 질문이 없어요. 첫 질문을 남겨보세요.</p>
      ) : (
        <div className="space-y-4">
          {questions.map((q) => (
            <div key={q.id} className="border-b border-black/[0.05] last:border-0 pb-4 last:pb-0">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-full bg-[#F5F3EE] flex items-center justify-center text-[0.75rem] font-bold flex-shrink-0">
                  {q.avatarChar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[0.78rem] font-semibold truncate">{q.author}</div>
                  <div className="text-[0.66rem] text-[#888070]" suppressHydrationWarning>{relativeTime(q.createdAt)}</div>
                </div>
                {!q.answer && (
                  <span className="text-[0.62rem] bg-[#FBF5E8] text-[#B07010] px-2 py-[2px] rounded-full font-semibold flex-shrink-0">
                    답변 대기
                  </span>
                )}
                <button
                  onClick={() => handleDelete(q.id)}
                  className="text-[0.7rem] text-[#888070] hover:text-[#D04020] px-1.5 py-1 rounded-lg hover:bg-[#F5F3EE] transition-colors flex-shrink-0"
                >
                  삭제
                </button>
              </div>
              <p className="text-[0.82rem] text-[#181614] leading-relaxed whitespace-pre-line ml-9">{q.content}</p>

              {/* 답변 */}
              {q.answer ? (
                <div className="ml-9 mt-2 bg-[#EBF5F0] border-l-2 border-[#2B7A50] rounded-r-[8px] px-3 py-2">
                  <div className="text-[0.66rem] font-bold text-[#2B7A50] mb-[2px]">
                    ↳ 작성자 답변 <span className="font-normal text-[#888070]" suppressHydrationWarning>· {relativeTime(q.answer.createdAt)}</span>
                  </div>
                  <p className="text-[0.8rem] text-[#181614] leading-relaxed whitespace-pre-line">{q.answer.content}</p>
                  {isOwner && (
                    <button
                      onClick={() => { setAnswering(q.id); setAnswerText(q.answer?.content ?? ""); }}
                      className="text-[0.68rem] text-[#2B7A50] hover:underline mt-1"
                    >
                      답변 수정
                    </button>
                  )}
                </div>
              ) : isOwner && answering !== q.id ? (
                <button
                  onClick={() => { setAnswering(q.id); setAnswerText(""); }}
                  className="ml-9 mt-2 text-[0.72rem] font-semibold text-[#2B7A50] hover:underline"
                >
                  ↳ 답변 달기
                </button>
              ) : null}

              {/* 답변 입력 (작성자만) */}
              {isOwner && answering === q.id && (
                <div className="ml-9 mt-2">
                  <textarea
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value.slice(0, MAX))}
                    rows={3}
                    autoFocus
                    placeholder="답변을 입력하세요."
                    className="w-full bg-[#F5F3EE] rounded-[10px] px-3 py-2 text-[0.82rem] leading-relaxed outline-none placeholder:text-[#C0BBB0] resize-none"
                  />
                  <div className="flex justify-end gap-2 mt-1">
                    <button
                      onClick={() => { setAnswering(null); setAnswerText(""); }}
                      className="px-3 py-1.5 rounded-[8px] text-[0.75rem] font-medium text-[#888070] hover:bg-[#F5F3EE] transition-colors"
                    >
                      취소
                    </button>
                    <button
                      onClick={() => handleAnswer(q.id)}
                      disabled={!answerText.trim()}
                      className="px-3 py-1.5 rounded-[8px] text-[0.75rem] font-bold text-white bg-[#2B7A50] hover:bg-[#236641] disabled:bg-[#C0BBB0] disabled:cursor-not-allowed transition-colors"
                    >
                      답변 등록
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
