import type { Metadata } from "next";

// 목록 페이지는 "use client"라 이 파일 안에 metadata를 둘 수 없다.
// (metadata·generateMetadata는 서버 컴포넌트에서만 동작한다.)
// 레이아웃은 기본이 서버 컴포넌트라, 페이지 코드를 한 줄도 건드리지 않고
// 이 폴더 전체에 제목·설명을 씌울 수 있다. 그래서 페이지를 쪼개지 않고 레이아웃을 썼다.
//
// 이 제목은 /news/[id] 상세에는 영향을 주지 않는다.
// 상세는 자기 generateMetadata로 제목을 직접 정하고, 더 안쪽 세그먼트가 이긴다.
export const metadata: Metadata = {
  // default = 이 목록 자신의 제목. template = 하위 라우트(상세 등)에 붙일 꼬리표.
  // template을 다시 적지 않으면 루트 layout의 "%s · SORI"가 여기서 끊겨
  // 상세 페이지 제목 끝의 "· SORI"가 사라진다(curl로 확인하고 되살린 것).
  title: {
    default: "Daily SG 뉴스",
    template: "%s · SORI",
  },
  description:
    "싱가포르 현지 뉴스를 한국어로 요약해 매일 전합니다. AI 번역 · 매일 오전 8시 업데이트.",
  openGraph: {
    title: "Daily SG 뉴스 · SORI",
    description:
      "싱가포르 현지 뉴스를 한국어로 요약해 매일 전합니다. AI 번역 · 매일 오전 8시 업데이트.",
    type: "website",
    siteName: "SORI",
    locale: "ko_KR",
  },
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
