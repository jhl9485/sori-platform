"use client";

import { useEffect, useState, useCallback } from "react";

export interface FavItem {
  id: string;
  icon: string;
  label: string;
  href: string;
  color: string;
}

// 메인 메뉴 6개 (사용자 지정 순서) + 커뮤니티 카테고리 9개 (커뮤니티 페이지 탭 순서와 동일)
export const ALL_FAV_ITEMS: FavItem[] = [
  // 메인 페이지
  { id: "news",      icon: "📰", label: "뉴스",       href: "/news",      color: "bg-[#EBF0FB]" },
  { id: "business",  icon: "🏪", label: "한인업소록", href: "/business",  color: "bg-[#FBF0EC]" },
  { id: "realty",    icon: "🏘️", label: "부동산",    href: "/realty",    color: "bg-[#FBF5E8]" },
  { id: "flea",      icon: "🛍️", label: "벼룩시장",  href: "/flea",      color: "bg-[#FBF5E8]" },
  { id: "jobs",      icon: "💼", label: "구인구직",   href: "/jobs",      color: "bg-[#EBF5F0]" },
  { id: "community", icon: "💬", label: "커뮤니티",   href: "/community", color: "bg-[#F0EDE8]" },
  // 커뮤니티 카테고리 (생활정보·익명·맛집·취업정보·금융/투자·육아·의료·연애·성인)
  { id: "cat_life",      icon: "🏠", label: "생활정보", href: "/community", color: "bg-[#FBF0EC]" },
  { id: "cat_anon",      icon: "🎭", label: "익명",     href: "/community", color: "bg-[#F0EDE8]" },
  { id: "cat_food",      icon: "🍱", label: "맛집",     href: "/community", color: "bg-[#FBF0EC]" },
  { id: "cat_job",       icon: "💼", label: "취업정보", href: "/community", color: "bg-[#EBF5F0]" },
  { id: "cat_finance",   icon: "💰", label: "금융/투자", href: "/community", color: "bg-[#EBF0FB]" },
  { id: "cat_parenting", icon: "👶", label: "육아",     href: "/community", color: "bg-[#FFF0F5]" },
  { id: "cat_medical",   icon: "🏥", label: "의료",     href: "/community", color: "bg-[#EBF0FB]" },
  { id: "cat_love",      icon: "💕", label: "연애",     href: "/community", color: "bg-[#FFF0F5]" },
  { id: "cat_adult",     icon: "🔞", label: "성인",     href: "/community", color: "bg-[#F0EDE8]" },
];

// 기본 노출: 메인 6개 + 자주 쓰는 카테고리 2개
export const DEFAULT_FAV_IDS = ["news", "business", "realty", "flea", "jobs", "community", "cat_life", "cat_anon"];

const STORAGE_KEY = "sori_home_favorites";
const isBrowser = typeof window !== "undefined";

export const MAX_FAV = 12;

// localStorage에 저장된 id 중 현재 ALL_FAV_ITEMS에 존재하는 것만 살리고,
// 8개 미만이면 DEFAULT_FAV_IDS에서 누락분을 자동 보충.
// (즐겨찾기 항목 id가 바뀌어도 사용자 경험 끊김 없이 마이그레이션)
function sanitize(ids: string[]): string[] {
  const validSet = new Set(ALL_FAV_ITEMS.map((i) => i.id));
  const valid = ids.filter((id) => validSet.has(id));
  if (valid.length < DEFAULT_FAV_IDS.length) {
    const missing = DEFAULT_FAV_IDS.filter((id) => !valid.includes(id));
    return [...valid, ...missing].slice(0, MAX_FAV);
  }
  return valid.slice(0, MAX_FAV);
}

function read(): string[] {
  if (!isBrowser) return DEFAULT_FAV_IDS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_FAV_IDS;
    return sanitize(JSON.parse(raw) as string[]);
  } catch {
    return DEFAULT_FAV_IDS;
  }
}

export function useFavorites() {
  const [favIds, setFavIds] = useState<string[]>(DEFAULT_FAV_IDS);

  useEffect(() => {
    setFavIds(read());
    const handler = (e: StorageEvent) => { if (e.key === STORAGE_KEY) setFavIds(read()); };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const save = useCallback((ids: string[]) => {
    setFavIds(ids);
    if (isBrowser) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
        window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
      } catch {}
    }
  }, []);

  const favItems = favIds
    .map((id) => ALL_FAV_ITEMS.find((i) => i.id === id))
    .filter((i): i is FavItem => Boolean(i));

  return { favIds, favItems, save };
}
