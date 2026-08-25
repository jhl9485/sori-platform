// 사이트의 절대 주소(base URL).
// layout.tsx의 metadataBase · sitemap.ts · robots.ts 세 곳이 반드시 같은 값을 써야 한다.
// 같은 문자열을 여러 파일에 적어두면 도메인을 바꿀 때 한 곳을 빠뜨리게 되고,
// 그러면 검색엔진에 서로 다른 주소가 올라가 같은 페이지가 중복 등록된다.
// ⚠️ 실제 배포 도메인으로 교체 필요 (환경변수 NEXT_PUBLIC_SITE_URL 권장)
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sori-platform.netlify.app";
