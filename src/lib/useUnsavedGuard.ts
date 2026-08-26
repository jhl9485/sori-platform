"use client";

import { useCallback, useEffect, useRef } from "react";
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

// 값 목록이 같은지 비교. 사진 배열(images/photos)·편의시설 배열까지 다루려고 한 겹만 더 들어간다.
// 사진은 base64라 문자열이 매우 길지만, 바뀌지 않은 사진은 같은 문자열 참조라 비교가 빠르다.
function sameValues(a: readonly unknown[], b: readonly unknown[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    const x = a[i];
    const y = b[i];
    if (Array.isArray(x) && Array.isArray(y)) {
      if (x.length !== y.length) return false;
      for (let j = 0; j < x.length; j++) if (x[j] !== y[j]) return false;
    } else if (x !== y) {
      return false;
    }
  }
  return true;
}

/**
 * 수정 모드에서 "정말 고친 것이 있는지"를 판정한다.
 *
 * 신규 작성은 "내용이 있으면 저장 안 된 변경"이 맞지만, 수정 모드는 기존 글을 불러오므로
 * 열자마자 내용이 있다 → 같은 규칙을 쓰면 아무것도 안 고치고 ✕를 눌러도 항상 경고가 떴다.
 * 그래서 불러오기가 끝난 순간(ready)의 값을 기준값으로 붙잡아 두고, 지금 값과 다를 때만 dirty로 본다.
 *
 * @param values 폼의 현재 값들 (수정 대상 필드 전부)
 * @param ready  기존 값 불러오기가 끝났는지. false면 기준값을 잡지 않고 항상 false를 돌려준다.
 */
export function useEditDirty(values: readonly unknown[], ready: boolean): boolean {
  const baseline = useRef<readonly unknown[] | null>(null);
  if (!ready) return false;
  // 기준값은 불러오기가 끝난 첫 렌더에서 한 번만 잡는다(useEffect로 잡으면 그 사이 한 프레임이 dirty로 보인다).
  if (baseline.current === null) baseline.current = values;
  return !sameValues(values, baseline.current);
}
