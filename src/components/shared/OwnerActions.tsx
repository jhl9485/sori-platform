"use client";

import { useRouter } from "next/navigation";
import { removeUserItem } from "@/lib/userContent";

interface Props {
  storageKey: string;     // "sori_user_posts" 등
  itemId: string;
  editHref?: string;      // /write?edit=user-123
  backHref: string;       // 삭제 후 이동할 목록 페이지
  label?: string;         // "내 글" / "내 매물" / "내 물건" 등
}

/**
 * 본인이 등록한 글/매물/물건 상세 페이지에서 표시되는 액션 패널.
 * 작성자 본인만 수정·삭제 가능 (상위 컴포넌트에서 isMine 검증 후 렌더)
 */
export default function OwnerActions({ storageKey, itemId, editHref, backHref, label = "내 글" }: Props) {
  const router = useRouter();

  const handleDelete = () => {
    if (!confirm(`정말 삭제하시겠어요?\n삭제하면 되돌릴 수 없어요.`)) return;
    removeUserItem(storageKey, itemId);
    alert("🗑️ 삭제되었습니다.");
    router.push(backHref);
  };

  return (
    <div className="bg-[#EBF0FB] border-y border-[#2050A0]/20 px-4 md:px-6 py-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[0.78rem] font-bold text-[#2050A0]">🔑 {label} — 작성자만 수정/삭제 가능</span>
        <div className="flex gap-2">
          {editHref && (
            <button
              onClick={() => router.push(editHref)}
              className="bg-white border border-[#2050A0] text-[#2050A0] text-[0.78rem] font-bold px-3 py-[6px] rounded-[8px] hover:bg-[#2050A0]/5 transition-colors"
            >
              ✏️ 수정
            </button>
          )}
          <button
            onClick={handleDelete}
            className="bg-white border border-[#D04020] text-[#D04020] text-[0.78rem] font-bold px-3 py-[6px] rounded-[8px] hover:bg-[#D04020]/5 transition-colors"
          >
            🗑️ 삭제
          </button>
        </div>
      </div>
    </div>
  );
}
