// 사이드바·서랍의 가장 큰 "글쓰기" 버튼이 어느 화면에서 눌러도 커뮤니티 글쓰기(/write)로만 갔다(기-25).
// 부동산·벼룩·채용·업소를 보다가 누르면 엉뚱한 게시판으로 떨어진다.
//
// 목록 화면들은 이미 각자 등록 버튼을 갖고 있다
// (realty/page.tsx:361 "매물 등록" · flea:175 "물건 등록" · jobs:187 "공고 등록" · business:192 "업소 등록").
// 그래서 새 낱말을 지어내지 않고 그 라벨을 그대로 가져다 쓴다 — 같은 동작이 화면마다 다른 이름으로
// 보이면 안 되기 때문이다.
//
// 이 파일을 따로 둔 이유: 버튼이 DesktopSidebar와 MobileDrawer 두 곳에 있어서, 한쪽만 고치면
// 데스크탑과 모바일이 서로 다른 곳으로 가버린다. 판정 규칙을 한 군데로 모아 어긋날 수 없게 한다.

export interface WriteTarget {
  href: string;
  label: string;
  icon: string;
}

// 보고 있는 게시판이 없으면(홈·뉴스·커뮤니티·검색·마이 등) 종전대로 커뮤니티 글쓰기다.
const DEFAULT_TARGET: WriteTarget = { href: "/write", label: "글쓰기", icon: "✏️" };

const BOARD_TARGETS: { prefix: string; target: WriteTarget }[] = [
  { prefix: "/realty",   target: { href: "/realty/write",   label: "매물 등록", icon: "🏘️" } },
  { prefix: "/flea",     target: { href: "/flea/write",     label: "물건 등록", icon: "🛍️" } },
  { prefix: "/jobs",     target: { href: "/jobs/write",     label: "공고 등록", icon: "💼" } },
  { prefix: "/business", target: { href: "/business/write", label: "업소 등록", icon: "🏪" } },
];

export function writeTargetFor(pathname: string | null | undefined): WriteTarget {
  if (!pathname) return DEFAULT_TARGET;
  // "/realty"(목록)와 "/realty/1"(상세)만 잡고 "/realtyfoo" 같은 건 안 잡히게 경계를 명시한다.
  const hit = BOARD_TARGETS.find(
    (b) => pathname === b.prefix || pathname.startsWith(`${b.prefix}/`)
  );
  return hit ? hit.target : DEFAULT_TARGET;
}
