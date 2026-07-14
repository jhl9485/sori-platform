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
    removeUserItem(storageKey, itemId);
    toast("🗑️ 삭제되었어요.");
    router.push(backHref);
  };

  return (
    <div className="flex items-center justify-end gap-1 px-4 md:px-6 py-2 border-b border-black/[0.06] bg-[#FAF8F3]">
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
        className="flex items-center gap-1 text-[0.78rem] font-medium text-[#888070] hover:text-[#D04020] px-2.5 py-1.5 rounded-lg hover:bg-white transition-colors"
      >
        🗑️ 삭제
      </button>
    </div>
  );
}
