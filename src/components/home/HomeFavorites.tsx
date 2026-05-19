"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface FavItem {
  id: string;
  icon: string;
  label: string;
  href: string;
  color: string;
}

const ALL_ITEMS: FavItem[] = [
  { id: "business",  icon: "🏪", label: "한인업소록", href: "/business",  color: "bg-[#FBF0EC]" },
  { id: "jobs",      icon: "💼", label: "구인구직",   href: "/jobs",      color: "bg-[#EBF5F0]" },
  { id: "news",      icon: "📰", label: "뉴스",       href: "/news",      color: "bg-[#EBF0FB]" },
  { id: "flea",      icon: "🛍️", label: "벼룩시장",  href: "/flea",      color: "bg-[#FBF5E8]" },
  { id: "community", icon: "💬", label: "커뮤니티",   href: "/community", color: "bg-[#F0EDE8]" },
  { id: "qna",       icon: "❓", label: "Q&A",        href: "/community", color: "bg-[#FBF0EC]" },
  { id: "visa",      icon: "📋", label: "비자정보",   href: "/community", color: "bg-[#EBF0FB]" },
  { id: "realty",    icon: "🏠", label: "부동산",     href: "/community", color: "bg-[#FBF5E8]" },
  { id: "food",      icon: "🍱", label: "맛집",       href: "/business",  color: "bg-[#FBF0EC]" },
  { id: "anon",      icon: "🎭", label: "익명",       href: "/community", color: "bg-[#F0EDE8]" },
  { id: "event",     icon: "📅", label: "이벤트",     href: "/community", color: "bg-[#FBF5E8]" },
  { id: "my",        icon: "🤍", label: "MY",         href: "/my",        color: "bg-[#F5F0FF]" },
];

const DEFAULT_FAV_IDS = ["business", "jobs", "news", "flea", "community", "qna", "visa", "my"];
const STORAGE_KEY = "sori_home_favorites";

export default function HomeFavorites() {
  const [favIds, setFavIds] = useState<string[]>(DEFAULT_FAV_IDS);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setFavIds(JSON.parse(saved));
  }, []);

  const save = (ids: string[]) => {
    setFavIds(ids);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  };

  const toggle = (id: string) => {
    if (favIds.includes(id)) {
      if (favIds.length <= 1) return;
      save(favIds.filter((f) => f !== id));
    } else {
      if (favIds.length >= 8) return;
      save([...favIds, id]);
    }
  };

  const favItems = ALL_ITEMS.filter((item) => favIds.includes(item.id));

  if (editing) {
    return (
      <div className="px-4 pb-5">
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="text-[0.9rem] font-bold">즐겨찾기 편집</span>
            <span className="text-[0.72rem] text-[#888070] ml-2">
              {favIds.length}/8개 선택
            </span>
          </div>
          <button
            onClick={() => setEditing(false)}
            className="text-[0.78rem] font-bold text-white bg-[#D04020] px-3 py-1 rounded-full"
          >
            완료
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {ALL_ITEMS.map((item) => {
            const selected = favIds.includes(item.id);
            const maxed = favIds.length >= 8 && !selected;
            return (
              <button
                key={item.id}
                onClick={() => !maxed && toggle(item.id)}
                className={`flex flex-col items-center gap-[5px] relative ${maxed ? "opacity-40" : ""}`}
              >
                <div className={`w-[52px] h-[52px] rounded-2xl flex items-center justify-center text-[1.4rem] border-2 transition-all ${item.color} ${selected ? "border-[#D04020]" : "border-transparent"}`}>
                  {item.icon}
                </div>
                {selected && (
                  <span className="absolute top-0 right-1 w-4 h-4 bg-[#D04020] rounded-full flex items-center justify-center text-white text-[0.6rem] font-bold">
                    ✓
                  </span>
                )}
                <span className="text-[0.68rem] text-[#181614] font-medium text-center leading-tight">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
        {favIds.length >= 8 && (
          <p className="text-center text-[0.72rem] text-[#888070] mt-3">
            최대 8개까지 선택 가능합니다
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="px-4 pb-5">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-base font-bold tracking-tight">즐겨찾기</h2>
        <button
          onClick={() => setEditing(true)}
          className="text-[0.72rem] text-[#888070] border border-black/[0.08] bg-white px-2 py-[3px] rounded-full"
        >
          편집
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {favItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="flex flex-col items-center gap-[6px] group"
          >
            <div className={`w-[52px] h-[52px] rounded-2xl flex items-center justify-center text-[1.4rem] transition-transform group-hover:scale-105 border border-transparent ${item.color}`}>
              {item.icon}
            </div>
            <span className="text-[0.72rem] text-[#181614] font-medium text-center leading-tight">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
