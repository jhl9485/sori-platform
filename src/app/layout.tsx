import type { Metadata, Viewport } from "next";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";
import { ToastHost, ConfirmHost, ReportHost } from "@/components/shared/Feedback";
// sitemap.ts · robots.ts와 같은 주소를 써야 해서 lib/site.ts 한 곳에서 가져온다.
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SORI · 싱가포르 한인 커뮤니티",
    template: "%s · SORI",
  },
  description: "싱가포르 한인을 위한 뉴스·커뮤니티·구인구직·벼룩시장·부동산·맛집 정보 플랫폼",
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
        <AppShell>{children}</AppShell>
        <ToastHost />
        <ConfirmHost />
        <ReportHost />
      </body>
    </html>
  );
}
