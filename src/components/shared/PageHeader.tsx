"use client";

import { useRouter } from "next/navigation";

interface Props {
  title?: string;
  right?: React.ReactNode;
}

export default function PageHeader({ title, right }: Props) {
  const router = useRouter();
  return (
    <div className="sticky top-0 z-40 bg-[rgba(245,243,238,0.95)] backdrop-blur-md border-b border-black/[0.07] px-4 md:px-6 h-[52px] flex items-center gap-3">
      <button
        onClick={() => router.back()}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/[0.06] transition-colors text-[#181614] flex-shrink-0"
      >
        ←
      </button>
      {title && <span className="text-[0.95rem] font-bold flex-1 truncate">{title}</span>}
      {right && <div className="ml-auto flex-shrink-0">{right}</div>}
    </div>
  );
}
