"use client";

import { useEffect } from "react";

/**
 * 작성 중 내용이 있을 때 새로고침·탭 닫기·주소 이동 시 브라우저 기본 이탈 경고를 띄운다.
 * (SPA 내부 라우팅까지 완벽히 막지는 못하지만, 실수로 창을 닫거나 새로고침하는 사고를 막아준다.)
 *
 * @param dirty 저장되지 않은 내용이 있는지 여부
 */
export function useUnsavedGuard(dirty: boolean) {
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      // 최신 브라우저는 커스텀 문구를 무시하고 기본 경고를 띄운다. 값 설정은 형식상 필요.
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);
}
