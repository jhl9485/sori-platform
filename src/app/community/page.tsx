import type { Metadata } from "next";
import CommunityClient from "./CommunityClient";

// 목록 8곳이 전부 같은 제목이었다(루트 layout.tsx 기본값). 여기만 서버 컴포넌트라
// 레이아웃을 새로 만들지 않고 이 파일에서 바로 제목을 정한다.
export const metadata: Metadata = {
  title: "커뮤니티",
  description:
    "싱가포르 한인 자유 게시판. 생활·직장·육아·의료·금융 이야기를 이웃과 나눠보세요.",
  openGraph: {
    title: "커뮤니티 · SORI",
    description:
      "싱가포르 한인 자유 게시판. 생활·직장·육아·의료·금융 이야기를 이웃과 나눠보세요.",
    type: "website",
    siteName: "SORI",
    locale: "ko_KR",
  },
};

// 이 페이지를 서버 컴포넌트로 되돌린 이유:
// 예전에는 page.tsx 전체가 "use client"였고 안에서 useSearchParams()를 썼다.
// 그러면 Next.js가 서버 사전 렌더링을 포기하고 Suspense fallback("불러오는 중…")만
// HTML로 내려보내, 검색엔진이 보는 /community 원문에 글 제목이 0개였다.
// (목록 6종 중 커뮤니티만 이랬다. sitemap에는 priority 0.9로 올라가 있다.)
//
// 주소의 ?cat= 를 서버에서 읽어 prop으로 넘기면, 클라이언트는 첫 렌더부터 값을 갖는다.
// 그래서 성인 확인 초기값 방어·뒤로가기 복원 같은 기존 로직을 한 줄도 바꾸지 않아도 된다.
//
// 트레이드오프: searchParams를 읽으므로 이 라우트는 정적 생성이 아니라
// 요청마다 서버 렌더링된다. 화면·SEO에는 문제가 없고(HTML은 매번 완전하게 나온다),
// 백엔드가 없는 지금은 비용도 사실상 없다.
export default function CommunityPage({
  searchParams,
}: {
  searchParams?: { cat?: string | string[] };
}) {
  // ?cat=a&cat=b 처럼 같은 키가 두 번 오면 배열이 된다. 첫 값만 쓴다.
  const raw = searchParams?.cat;
  const cat = (Array.isArray(raw) ? raw[0] : raw) || "all";
  return <CommunityClient catFromQuery={cat} />;
}
