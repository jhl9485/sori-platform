"use client";

import { CATEGORIES } from "@/data/categories";
import ScrollRow from "@/components/shared/ScrollRow";

interface Props {
  selected: string;
  onSelect: (id: string) => void;
  counts?: Record<string, number>;
  totalCount?: number;
}

export default function CategoryTabs({ selected, onSelect, counts, totalCount }: Props) {
  const allTabs = [{ id: "all", label: "전체", locked: false }, ...CATEGORIES];

  // 성인 확인창은 여기 있었지만, 탭을 눌러 들어올 때만 떠서 즐겨찾기·주소창으로는 새어 나갔다.
  // 이제 커뮤니티 페이지의 selectCategory가 모든 입구를 대신 막는다.
  // 여기서 또 물으면 탭 클릭 때만 확인창이 두 번 뜨므로, 그대로 넘기기만 한다.

  return (
    <ScrollRow className="gap-0 px-4 pb-3">
      {allTabs.map((tab) => {
        const count = tab.id === "all" ? totalCount : counts?.[tab.id];
        const isActive = selected === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelect(tab.id)}
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
    </ScrollRow>
  );
}
