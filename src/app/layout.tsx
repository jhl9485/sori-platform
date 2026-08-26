import type { Metadata, Viewport } from "next";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";
import { ToastHost, ConfirmHost, ReportHost } from "@/components/shared/Feedback";
// sitemap.ts · robots.ts와 같은 주소를 써야 해서 lib/site.ts 한 곳에서 가져온다.
import { SITE_URL } from "@/lib/site";
import JsonLd from "@/components/shared/JsonLd";

const SITE_DESCRIPTION =
  "싱가포르 한인을 위한 뉴스·커뮤니티·구인구직·벼룩시장·부동산·맛집 정보 플랫폼";

// 사이트 전체를 설명하는 구조화 데이터. 검색엔진·AI가 "이 도메인이 무엇인지"를 추측하지 않게 한다.
//
// potentialAction(SearchAction) = "이 주소에 검색어를 붙이면 사이트 내 검색이 된다"는 약속.
// 예전엔 검색 페이지가 검색어를 화면 상태로만 들고 있어서 /search?q=감자탕 으로 들어가도
// 검색창이 비어 있었고, 그래서 이 약속을 일부러 넣지 않았다.
// 이제 src/app/search/page.tsx가 useSearchParams로 ?q= 를 읽어 결과를 그리는 것을
// 브라우저로 확인했으므로(공유 링크 동작 확인 완료) 사실이 된 약속만 넣는다.
const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SORI",
  alternateName: "SORI · 싱가포르 한인 커뮤니티",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: "ko",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// logo를 넣지 않은 이유: public 폴더가 없고 favicon 말고는 로고 이미지 파일이 실제로 없다.
// 없는 이미지 주소를 지어내면 기계가 깨진 링크를 사실로 받아들인다.
const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SORI",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SORI · 싱가포르 한인 커뮤니티",
    template: "%s · SORI",
  },
  description: SITE_DESCRIPTION,
  applicationName: "SORI",
  keywords: [
    "싱가포르 한인",
    "싱가포르 교민",
    "싱가포르 한인 커뮤니티",
    "싱가포르 한인 뉴스",
    "싱가포르 구인구직",
    "싱가포르 한인 부동산",
    "SORI",
  ],
  openGraph: {
    title: "SORI · 싱가포르 한인 커뮤니티",
    description: "싱가포르 한인을 위한 생활 정보 플랫폼",
    type: "website",
    siteName: "SORI",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "SORI · 싱가포르 한인 커뮤니티",
    description: "싱가포르 한인을 위한 생활 정보 플랫폼",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#F5F3EE",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <JsonLd data={WEBSITE_JSONLD} />
        <JsonLd data={ORGANIZATION_JSONLD} />
        <AppShell>{children}</AppShell>
        <ToastHost />
        <ConfirmHost />
        <ReportHost />
      </body>
    </html>
  );
}
