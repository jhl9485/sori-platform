"use client";

import { usePathname, useRouter } from "next/navigation";
import { hasInAppHistory } from "@/lib/navEntry";

interface Props {
  title?: string;
  right?: React.ReactNode;
}

export default function PageHeader({ title, right }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  // 공유 링크를 새 탭에 붙여넣고 들어오면 뒤로 갈 앱 내 기록이 없다.
  // 그대로 router.back()을 하면 빈 화면(about:blank)으로 앱 밖에 떨어지므로 해당 목록으로 보낸다.
  const handleBack = () => {
    if (hasInAppHistory(pathname)) {
      router.back();
      return;
    }
    const [section] = pathname.split("/").filter(Boolean);
    router.push(section && `/${section}` !== pathname ? `/${section}` : "/");
  };

  return (
    <div className="sticky top-0 z-40 bg-[rgba(245,243,238,0.95)] backdrop-blur-md border-b border-black/[0.07] px-3 md:px-6 h-[52px] flex items-center gap-2">
      <button
        onClick={handleBack}
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
