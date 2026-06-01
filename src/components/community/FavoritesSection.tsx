"use client";

import { useState, useEffect } from "react";
import { CATEGORIES, DEFAULT_FAVORITES } from "@/data/categories";

interface Props {
  onSelect: (categoryId: string) => void;
  selectedId: string;
}

const MAX_CAT_FAV = 9; // 커뮤니티 카테고리 전체

export default function FavoritesSection({ onSelect, selectedId }: Props) {
  const [favorites, setFavorites] = useState<string[]>(DEFAULT_FAVORITES);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sori_favorites");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as string[];
        // CATEGORIES에 없는 옛 id 정리 + 부족하면 DEFAULT로 보충
        const validIds = new Set(CATEGORIES.map((c) => c.id));
        const valid = parsed.filter((id) => validIds.has(id));
        if (valid.length === 0) setFavorites(DEFAULT_FAVORITES);
        else setFavorites(valid.slice(0, MAX_CAT_FAV));
      } catch {
        setFavorites(DEFAULT_FAVORITES);
      }
    }
  }, []);

  const saveFavorites = (ids: string[]) => {
    setFavorites(ids);
    localStorage.setItem("sori_favorites", JSON.stringify(ids));
  };

  const toggle = (id: string) => {
    if (favorites.includes(id)) {
      if (favorites.length <= 1) return; // 최소 1개 유지
      saveFavorites(favorites.filter((f) => f !== id));
    } else {
      if (favorites.length >= MAX_CAT_FAV) return;
      saveFavorites([...favorites, id]);
    }
  };

  const favCategories = CATEGORIES.filter((c) => favorites.includes(c.id));

  if (editing) {
    return (
      <div className="px-4 pb-4">
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="text-[0.9rem] font-bold">내 커뮤니티 편집</span>
            <span className="text-[0.72rem] text-[#888070] ml-2">{favorites.length}/{MAX_CAT_FAV}개</span>
          </div>
          <button
            onClick={() => setEditing(false)}
            className="text-[0.78rem] font-bold text-[#D04020] bg-[#FBF0EC] px-3 py-1 rounded-full"
          >
            완료
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {CATEGORIES.map((cat) => {
            const isFav = favorites.includes(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => toggle(cat.id)}
                className="flex flex-col items-center gap-[5px] relative"
              >
                <div
                  className={`w-[52px] h-[52px] rounded-2xl flex items-center justify-center text-[1.3rem] border-2 transition-all ${cat.color} ${
                    isFav ? "border-[#D04020]" : "border-transparent opacity-50"
                  }`}
                >
                  {cat.icon}
                </div>
                {isFav && (
                  <span className="absolute top-0 right-1 w-4 h-4 bg-[#D04020] rounded-full flex items-center justify-center text-white text-[0.6rem] font-bold">
                    ✓
                  </span>
                )}
                <span className="text-[0.68rem] text-[#181614] text-center leading-tight">
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pb-4">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[0.9rem] font-bold">내 커뮤니티</span>
        <button
          onClick={() => setEditing(true)}
          className="text-[0.72rem] text-[#888070] border border-black/[0.08] px-2 py-[3px] rounded-full"
        >
          편집
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {favCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className="flex flex-col items-center gap-[5px] group"
          >
            <div
              className={`w-[52px] h-[52px] rounded-2xl flex items-center justify-center text-[1.3rem] transition-all group-hover:scale-105 border-2 ${cat.color} ${
                selectedId === cat.id ? "border-[#D04020]" : "border-transparent"
              }`}
            >
              {cat.icon}
              {cat.locked && (
                <span className="absolute text-[0.6rem] bottom-0 right-0">🔒</span>
              )}
            </div>
            <span
              className={`text-[0.68rem] text-center leading-tight font-medium ${
                selectedId === cat.id ? "text-[#D04020]" : "text-[#181614]"
              }`}
            >
              {cat.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
