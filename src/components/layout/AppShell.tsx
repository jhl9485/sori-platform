"use client";

import { usePathname } from "next/navigation";
import DesktopSidebar from "./DesktopSidebar";
import DesktopRightPanel from "./DesktopRightPanel";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";
import ScrollToTop from "@/components/shared/ScrollToTop";
import LoginRequired from "@/components/shared/LoginRequired";
import { useAuth } from "@/lib/auth";

// 사이드바 없이 단독 렌더링할 페이지
const STANDALONE = ["/demo", "/write", "/realty/write", "/flea/write", "/jobs/write", "/business/write", "/login", "/signup"];

// 로그인해야 접근 가능한 글쓰기 페이지 (게스트 차단)
const WRITE_ROUTES = ["/write", "/realty/write", "/flea/write", "/jobs/write", "/business/write"];

// 글쓰기 라우트: 로그인 확인 후 통과 (게스트는 로그인 안내 화면)
function WriteGate({ children }: { children: React.ReactNode }) {
  const { isAuthed, hydrated } = useAuth();
  if (!hydrated) return null; // 로그인 상태 확인 전 (깜빡임 방지)
  if (!isAuthed) return <LoginRequired />;
  return <>{children}</>;
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (STANDALONE.some((p) => pathname?.startsWith(p))) {
    if (WRITE_ROUTES.some((p) => pathname?.startsWith(p))) {
      return <WriteGate>{children}</WriteGate>;
    }
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
        <div className="pb-[calc(72px+env(safe-area-inset-bottom))] md:pb-10">
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
