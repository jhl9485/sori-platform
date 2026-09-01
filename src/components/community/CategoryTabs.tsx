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
    // 업소·벼룩·채용·부동산·뉴스의 주 필터와 같은 모양(흰 알약 + 옅은 테두리)으로 맞춘다.
    // 예전에는 테두리도 배경도 없는 맨 글자여서, 고르는 일은 같은데 커뮤니티에서만
    // 눌리는 것처럼 보이지 않았다. 테두리를 넣으면 칩끼리 선이 붙으므로 gap-0 → gap-2도 함께 준다.
    <ScrollRow className="gap-2 px-4 pb-3">
      {allTabs.map((tab) => {
        const count = tab.id === "all" ? totalCount : counts?.[tab.id];
        const isActive = selected === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelect(tab.id)}
            className={`flex-shrink-0 px-3 py-[5px] rounded-full text-[0.75rem] font-medium whitespace-nowrap border transition-all flex items-center gap-1 ${
              isActive ? "bg-[#181614] text-white border-[#181614]" : "bg-white text-[#888070] border-black/[0.08] hover:border-black/[0.15]"
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
