import type { Metadata, Viewport } from "next";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "SORI · 싱가포르 한인 커뮤니티",
  description: "싱가포르 한인을 위한 뉴스·커뮤니티·구인구직·벼룩시장·부동산·맛집 정보 플랫폼",
  openGraph: {
    title: "SORI · 싱가포르 한인 커뮤니티",
    description: "싱가포르 한인을 위한 생활 정보 플랫폼",
    type: "website",
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
      </body>
    </html>
  );
}
