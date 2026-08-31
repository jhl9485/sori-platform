import type { Metadata } from "next";

// 목록 페이지가 "use client"라 그 파일 안에는 metadata를 둘 수 없다.
// (metadata·generateMetadata는 서버 컴포넌트 전용)
// 레이아웃은 기본이 서버 컴포넌트라, 페이지 코드를 한 줄도 건드리지 않고
// 이 폴더에 제목·설명을 씌울 수 있다. 그래서 페이지를 쪼개지 않고 레이아웃을 썼다.
export const metadata: Metadata = {
  // default = 이 목록 자신의 제목. template = 하위 라우트(상세 등)에 붙일 꼬리표.
  // template을 다시 적지 않으면 루트 layout의 "%s · SORI"가 여기서 끊겨
  // 상세 페이지 제목 끝의 "· SORI"가 사라진다(curl로 확인하고 되살린 것).
  title: {
    default: "구인구직",
    template: "%s · SORI",
  },
  description:
    "싱가포르 한인 채용 공고. EP/S-Pass 스폰서 지원 포함 일자리를 확인하세요.",
  openGraph: {
    title: "구인구직 · SORI",
    description:
      "싱가포르 한인 채용 공고. EP/S-Pass 스폰서 지원 포함 일자리를 확인하세요.",
    type: "website",
    siteName: "SORI",
    locale: "ko_KR",
  },
};

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
