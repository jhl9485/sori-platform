import HomeFavorites from "@/components/home/HomeFavorites";
import HomeGreeting from "@/components/home/HomeGreeting";
import SearchBar from "@/components/home/SearchBar";
import LiveBar from "@/components/home/LiveBar";
import OpenNowButton from "@/components/home/OpenNowButton";
import BizSection from "@/components/home/BizSection";
import CommunityFeed from "@/components/home/CommunityFeed";
import JobSection from "@/components/home/JobSection";
import NewsPreview from "@/components/home/NewsPreview";

export default function HomePage() {
  return (
    <div className="max-w-[680px] mx-auto">

      {/* 모바일 검색 + 라이브바 */}
      <div className="md:hidden">
        <SearchBar />
        <LiveBar />
      </div>

      {/* 데스크탑 페이지 헤더 */}
      <div className="hidden md:flex items-center justify-between px-6 pt-7 pb-4">
        <div>
          <h1 className="text-[1.4rem] font-bold tracking-tight">홈 피드</h1>
          <p className="text-[0.78rem] text-[#888070] mt-[2px]">싱가포르 한인 커뮤니티 · 오늘도 좋은 하루</p>
        </div>
      </div>

      {/* 인사말 (로그인 상태면 이름, 아니면 환영 문구 + 로그인 버튼).
          예전에 "첫 방문 온보딩"이라고 적혀 있었지만 온보딩은 2026-07-16(7d29c30)에 제거됐고
          지금 HomeGreeting이 하는 일은 인사말과 로그인 버튼뿐이다. */}
      <HomeGreeting />

      {/* 즐겨찾기 */}
      <div className="px-4 md:px-6 pt-1 md:pt-0">
        <HomeFavorites />
      </div>

      <OpenNowButton />

      {/* Daily 뉴스 */}
      <NewsPreview />

      {/* 인기 업소 */}
      <BizSection />

      {/* ③ 커뮤니티 피드 (내부에 인피드 광고 포함) */}
      <CommunityFeed />

      {/* 채용공고 */}
      <JobSection />

    </div>
  );
}
