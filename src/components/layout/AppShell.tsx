"use client";

import { usePathname } from "next/navigation";
import DesktopSidebar from "./DesktopSidebar";
import DesktopRightPanel from "./DesktopRightPanel";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";
import ScrollToTop from "@/components/shared/ScrollToTop";

// 사이드바 없이 단독 렌더링할 페이지
const STANDALONE = ["/demo", "/write", "/realty/write", "/flea/write", "/jobs/write", "/business/write"];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (STANDALONE.some((p) => pathname?.startsWith(p))) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#F5F3EE]">

      {/* ── 데스크탑 왼쪽 사이드바 (md 이상) ── */}
      <div className="hidden md:block">
        <DesktopSidebar />
      </div>

      {/* ── 모바일 상단 네비 (md 미만) ── */}
      <div className="md:hidden sticky top-0 z-50">
        <TopNav />
      </div>

      {/* ── 메인 컨텐츠 영역 ── */}
      <div className="md:ml-[240px] xl:mr-[288px]">
        <div className="pb-[80px] md:pb-10">
          {children}
        </div>
      </div>

      {/* ── 데스크탑 오른쪽 패널 (xl 이상) ── */}
      <div className="hidden xl:block">
        <DesktopRightPanel />
      </div>

      {/* ── 모바일 하단 네비 (md 미만) ── */}
      <div className="md:hidden">
        <BottomNav />
      </div>

      {/* ── 모바일 스크롤 탑 ── */}
      <ScrollToTop />
    </div>
  );
}
