"use client";

import { useEffect, useState, useCallback } from "react";

const isBrowser = typeof window !== "undefined";

function read<T>(key: string, fallback: T): T {
  if (!isBrowser) return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  if (!isBrowser) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    // 같은 탭의 다른 useToggleSet 인스턴스도 갱신되도록 수동 dispatch
    // (브라우저는 같은 탭 내 localStorage 변경에 대해 StorageEvent를 자동 발생시키지 않음)
    window.dispatchEvent(new StorageEvent("storage", { key }));
  } catch {
    // quota exceeded 등 무시
  }
}

// 단일 boolean (좋아요·저장 등) — id 기반
// 같은 키를 들고 있는 모든 useToggleSet 인스턴스가 storage 이벤트로 동기화됨
export function useToggleSet(key: string) {
  const [ids, setIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const refresh = () => setIds(new Set(read<string[]>(key, [])));
    refresh();
    const handler = (e: StorageEvent) => { if (e.key === key) refresh(); };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [key]);

  const toggle = useCallback((id: string) => {
    setIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      write(key, Array.from(next));
      return next;
    });
  }, [key]);

  const has = useCallback((id: string) => ids.has(id), [ids]);

  return { has, toggle, ids };
}
