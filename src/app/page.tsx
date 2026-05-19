import Link from "next/link";
import HomeFavorites from "@/components/home/HomeFavorites";
import SearchBar from "@/components/home/SearchBar";
import LiveBar from "@/components/home/LiveBar";
import OpenNowButton from "@/components/home/OpenNowButton";
import BizSection from "@/components/home/BizSection";
import CommunityFeed from "@/components/home/CommunityFeed";
import JobSection from "@/components/home/JobSection";
import NewsPreview from "@/components/home/NewsPreview";
import BannerAd from "@/components/ads/BannerAd";

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

      {/* 즐겨찾기 */}
      <div className="px-4 md:px-6 pt-4 md:pt-0">
        <HomeFavorites />
      </div>

      {/* ① 배너형 광고 — 홈 상단 프리미엄 노출 ($300~500/월) */}
      <BannerAd index={0} />

      <OpenNowButton />

      {/* Daily 뉴스 */}
      <NewsPreview />

      {/* ② 뉴스 하단 배너 광고 — 카테고리 상단 노출 ($150~250/월) */}
      <BannerAd index={1} />

      {/* 인기 업소 */}
      <BizSection />

      {/* ③ 커뮤니티 피드 (내부에 인피드 광고 포함) */}
      <CommunityFeed />

      {/* 채용공고 */}
      <JobSection />

    </div>
  );
}
