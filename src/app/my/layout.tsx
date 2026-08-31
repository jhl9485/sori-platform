import type { Metadata } from "next";

// 목록/개인 페이지가 "use client"라 그 파일 안에는 metadata를 둘 수 없다.
// (metadata·generateMetadata는 서버 컴포넌트 전용)
// 레이아웃은 기본이 서버 컴포넌트라 페이지 코드를 건드리지 않고 제목을 씌울 수 있다.
//
// 여기는 남에게 보여줄 화면이 아니라 "내 것"만 모아둔 개인 화면이다.
// 그래서 제목은 검색 결과용 홍보 문구가 아니라, 이용자가 브라우저 탭·즐겨찾기에서
// 자기 화면을 알아보는 용도로만 쓴다. 설명(description)은 일부러 넣지 않았다 —
// 검색 결과에 뜰 일이 없는 화면에 홍보 문구를 다는 것은 사실과 맞지 않는다.
//
// robots noindex를 함께 넣은 이유(솔직한 한계 포함):
// robots.txt가 이미 /my를 Disallow(크롤링 금지)하고 있다. 그 상태에서는 크롤러가
// 페이지를 아예 안 받아가므로 이 noindex 태그를 볼 일도 없다 — 지금 당장은 효과가 없다.
// 다만 나중에 robots.txt에서 /my가 풀리는 날, 이 한 줄이 없으면 개인 화면이 그대로
// 검색 결과에 올라간다. 그때를 대비한 안전장치다.
export const metadata: Metadata = {
  // default = 이 목록 자신의 제목. template = 하위 라우트(상세 등)에 붙일 꼬리표.
  // template을 다시 적지 않으면 루트 layout의 "%s · SORI"가 여기서 끊겨
  // 상세 페이지 제목 끝의 "· SORI"가 사라진다(curl로 확인하고 되살린 것).
  title: {
    default: "마이페이지",
    template: "%s · SORI",
  },
  robots: { index: false, follow: false },
};

export default function MyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
