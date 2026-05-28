"use client";

import { useEffect, useState, useCallback } from "react";

export interface FavItem {
  id: string;
  icon: string;
  label: string;
  href: string;
  color: string;
}

export const ALL_FAV_ITEMS: FavItem[] = [
  { id: "business",  icon: "🏪", label: "한인업소록", href: "/business",  color: "bg-[#FBF0EC]" },
  { id: "realty",    icon: "🏘️", label: "부동산",    href: "/realty",    color: "bg-[#FBF5E8]" },
  { id: "jobs",      icon: "💼", label: "구인구직",   href: "/jobs",      color: "bg-[#EBF5F0]" },
  { id: "news",      icon: "📰", label: "뉴스",       href: "/news",      color: "bg-[#EBF0FB]" },
  { id: "flea",      icon: "🛍️", label: "벼룩시장",  href: "/flea",      color: "bg-[#FBF5E8]" },
  { id: "community", icon: "💬", label: "커뮤니티",   href: "/community", color: "bg-[#F0EDE8]" },
  { id: "search",    icon: "🔍", label: "통합검색",   href: "/search",    color: "bg-[#F5F0FF]" },
  { id: "my",        icon: "🤍", label: "MY",         href: "/my",        color: "bg-[#F5F0FF]" },
  { id: "qna",       icon: "❓", label: "Q&A",        href: "/community", color: "bg-[#FBF0EC]" },
  { id: "visa",      icon: "📋", label: "비자정보",   href: "/community", color: "bg-[#EBF0FB]" },
  { id: "food",      icon: "🍱", label: "맛집",       href: "/business",  color: "bg-[#FBF0EC]" },
  { id: "anon",      icon: "🎭", label: "익명",       href: "/community", color: "bg-[#F0EDE8]" },
  { id: "event",     icon: "📅", label: "이벤트",     href: "/community", color: "bg-[#FBF5E8]" },
];

export const DEFAULT_FAV_IDS = ["business", "realty", "jobs", "news", "flea", "community", "search", "my"];

const STORAGE_KEY = "sori_home_favorites";
const isBrowser = typeof window !== "undefined";

function read(): string[] {
  if (!isBrowser) return DEFAULT_FAV_IDS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : DEFAULT_FAV_IDS;
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
