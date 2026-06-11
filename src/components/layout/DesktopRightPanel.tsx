import Link from "next/link";
import DesktopLiveInfo from "./DesktopLiveInfo";
import DesktopRightLists from "./DesktopRightLists";

export default function DesktopRightPanel() {
  return (
    <aside className="fixed top-0 right-0 h-screen w-[288px] border-l border-black/[0.06] bg-[#F5F3EE] overflow-y-auto flex flex-col gap-4 p-5 scrollbar-hide">

      {/* 검색 */}
      <Link
        href="/search"
        className="flex items-center bg-white border border-black/[0.08] rounded-full px-4 py-[8px] mt-1 hover:border-black/[0.15] transition-colors"
      >
        <span className="text-[0.88rem] text-[#888070] mr-2 leading-none flex-shrink-0">🔍</span>
        <span className="text-[0.82rem] text-[#C0BBB0]">검색...</span>
      </Link>

      {/* 실시간 정보 (환율·날씨·MRT) */}
      <DesktopLiveInfo />

      {/* 인기 게시글 / 채용 / 업소 — 사용자 글 통합 */}
      <DesktopRightLists />

      {/* 푸터 */}
      <div className="text-[0.63rem] text-[#C0BBB0] leading-relaxed pb-2" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        SORI · 싱가포르 한인 커뮤니티<br/>
        © 2026 · All rights reserved
      </div>
    </aside>
  );
}
