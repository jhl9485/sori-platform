"use client";

import { useRouter } from "next/navigation";
import { removeUserItem } from "@/lib/userContent";
import { toast, confirmDialog } from "@/components/shared/Feedback";

interface Props {
  storageKey: string;     // "sori_user_posts" 등
  itemId: string;
  editHref?: string;      // /write?edit=user-123
  backHref: string;       // 삭제 후 이동할 목록 페이지
  label?: string;         // (미사용, 하위호환)
}

/**
 * 본인이 등록한 글/매물/물건 상세에서 표시되는 수정·삭제 액션.
 * (상위 컴포넌트에서 isMine 검증 후에만 렌더)
 */
export default function OwnerActions({ storageKey, itemId, editHref, backHref }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    const ok = await confirmDialog({
      message: "정말 삭제할까요?\n삭제하면 되돌릴 수 없어요.",
      confirmText: "삭제",
      danger: true,
    });
    if (!ok) return;
    toast("🗑️ 삭제되었어요.");
    router.push(backHref);
    // 상세 페이지가 먼저 목록으로 벗어난 뒤 삭제 → 삭제 순간 '페이지를 찾을 수 없어요'가 뜨는 것 방지
    setTimeout(() => removeUserItem(storageKey, itemId), 150);
  };

  // 삭제는 되돌릴 수 없는데 수정과 똑같이 생겨서 구분이 안 됐다.
  // 색(#888070)은 따로 결정 대기 중이라 쉬는 상태의 글자색은 그대로 두고 모양으로 갈랐다:
  //   · 삭제에만 테두리를 줘서 "눌러야 하는 별개의 버튼"으로 보이게 한다(수정은 글자 버튼 유지)
  //   · 간격을 4px→8px로 벌려 수정을 누르려다 삭제가 눌리는 것을 줄인다
  // 테두리로 가른 이유가 하나 더 있다 — 색만으로 구분하면 색을 구별하기 어려운 분에게는
  // 아무 차이가 없다. 모양 차이는 누구에게나 보인다.
  return (
    <div className="flex items-center justify-end gap-2 px-4 md:px-6 py-2 border-b border-black/[0.06] bg-[#FAF8F3]">
      {editHref && (
        <button
          onClick={() => router.push(editHref)}
          className="flex items-center gap-1 text-[0.78rem] font-medium text-[#888070] hover:text-[#181614] px-2.5 py-1.5 rounded-lg hover:bg-white transition-colors"
        >
          ✏️ 수정
        </button>
      )}
      <button
        onClick={handleDelete}
        className="flex items-center gap-1 text-[0.78rem] font-medium text-[#888070] hover:text-[#D04020] hover:bg-[#FBEBE8] hover:border-[#D04020]/25 px-2.5 py-1.5 rounded-lg border border-black/[0.10] transition-colors"
      >
        🗑️ 삭제
      </button>
    </div>
  );
}
