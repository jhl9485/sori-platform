"use client";

import { useRouter } from "next/navigation";

interface Props {
  title?: string;
  right?: React.ReactNode;
}

export default function PageHeader({ title, right }: Props) {
  const router = useRouter();
  return (
    <div className="sticky top-0 z-40 bg-[rgba(245,243,238,0.95)] backdrop-blur-md border-b border-black/[0.07] px-3 md:px-6 h-[52px] flex items-center gap-2">
      <button
        onClick={() => router.back()}
        aria-label="뒤로가기"
        className="flex items-center gap-1 px-2 h-9 rounded-full hover:bg-black/[0.06] active:scale-95 transition-all text-[#181614] flex-shrink-0"
      >
        <span className="text-base leading-none">←</span>
        <span className="text-[0.78rem] font-medium hidden sm:inline">뒤로</span>
      </button>
      {title && <span className="text-[0.95rem] font-bold flex-1 truncate">{title}</span>}
      {right && <div className="ml-auto flex-shrink-0">{right}</div>}
    </div>
  );
}
