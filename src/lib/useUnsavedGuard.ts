"use client";

import { useCallback, useEffect } from "react";
import { confirmDialog } from "@/components/shared/Feedback";

/**
 * 작성 중 내용이 있을 때 화면 이탈을 막는다.
 *
 * 두 경로를 함께 처리한다:
 *  1) 새로고침 · 탭 닫기 · 외부 주소 이동 → 브라우저 기본 이탈 경고(beforeunload)
 *  2) 폼 안의 ✕(닫기)·뒤로 버튼 같은 앱 내부 이동 → 반환된 confirmLeave()로 인앱 모달 확인
 *
 * ⚠️ Next.js App Router에는 라우팅 차단 훅이 없어, 하단 탭이나 브라우저 뒤로가기 같은
 *    다른 앱 내부 이동까지 완벽히 막지는 못한다. 대신 대부분의 실수 경로(새로고침·✕ 버튼)를 막는다.
 *    (작성 내용은 임시저장되므로 다시 돌아오면 복원된다.)
 *
 * @param dirty 저장되지 않은 내용이 있는지 여부
 * @returns confirmLeave — 나가기 전에 호출. 나가도 되면 true, 취소면 false.
 */
export function useUnsavedGuard(dirty: boolean) {
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      // 크롬은 빈 문자열이면 경고를 띄우지 않는다 → 비어있지 않은 값을 넣는다.
      e.returnValue = "작성 중인 내용이 있어요.";
      return e.returnValue;
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  const confirmLeave = useCallback(async () => {
    if (!dirty) return true;
    return confirmDialog({
      title: "작성을 멈출까요?",
      message: "작성 중인 내용이 있어요.\n지금 나가도 될까요?",
      confirmText: "나가기",
      cancelText: "계속 작성",
      danger: true,
    });
  }, [dirty]);

  return confirmLeave;
}
