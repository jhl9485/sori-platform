"use client";

import { CATEGORIES } from "@/data/categories";

interface Props {
  selected: string;
  onSelect: (id: string) => void;
  counts?: Record<string, number>;
  totalCount?: number;
}

export default function CategoryTabs({ selected, onSelect, counts, totalCount }: Props) {
  const allTabs = [{ id: "all", label: "전체", locked: false }, ...CATEGORIES];

  const handleClick = (id: string, locked?: boolean) => {
    if (locked) {
      if (window.confirm("성인 콘텐츠입니다. 계속하시겠습니까?")) {
        onSelect(id);
      }
      return;
    }
    onSelect(id);
  };

  return (
    <div className="flex gap-0 px-4 pb-3 overflow-x-auto scrollbar-hide">
      {allTabs.map((tab) => {
        const count = tab.id === "all" ? totalCount : counts?.[tab.id];
        const isActive = selected === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => handleClick(tab.id, tab.locked)}
            className={`flex-shrink-0 px-[12px] py-[6px] rounded-full text-[0.78rem] font-medium whitespace-nowrap transition-all flex items-center gap-1 ${
              isActive ? "bg-[#181614] text-white" : "text-[#888070] hover:text-[#181614]"
            }`}
          >
            <span>{tab.label}{tab.locked && " 🔒"}</span>
            {typeof count === "number" && count > 0 && (
              <span className={`text-[0.62rem] font-bold ${isActive ? "text-white/80" : "text-[#D04020]"}`}>
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
