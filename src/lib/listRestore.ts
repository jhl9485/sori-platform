"use client";

import { useEffect, useRef } from "react";

/**
 * 목록 페이지의 필터 상태 + 스크롤 위치를 sessionStorage에 저장했다가,
 * 상세를 봤다 뒤로가기로 돌아올 때 복원한다.
 *
 * @param key   페이지별 고유 키 (예: "sori_list_news")
 * @param state 저장할 필터 상태(직렬화 가능한 값들)
 * @param apply 복원 시 상태를 되돌리는 콜백
 */
export function useListRestore<T>(key: string, state: T, apply: (s: T) => void) {
  const stateStr = JSON.stringify(state);
  const readyRef = useRef(false);

  // 마운트 시: 저장된 필터·스크롤 복원
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.state !== undefined) apply(parsed.state as T);
        const y = parsed?.y || 0;
        const scroll = () => window.scrollTo(0, y);
        requestAnimationFrame(() => requestAnimationFrame(scroll));
        setTimeout(scroll, 100);
      }
    } catch {
      /* ignore */
    }
    const id = setTimeout(() => { readyRef.current = true; }, 150);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 필터 변경 시 + 스크롤 시 저장 (복원 완료 후에만)
  useEffect(() => {
    const save = () => {
      if (!readyRef.current) return;
      try {
        sessionStorage.setItem(key, JSON.stringify({ y: window.scrollY, state: JSON.parse(stateStr) }));
      } catch {
        /* ignore */
      }
    };
    save();
    let t: ReturnType<typeof setTimeout>;
    const onScroll = () => { clearTimeout(t); t = setTimeout(save, 100); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(t); };
  }, [key, stateStr]);
}
