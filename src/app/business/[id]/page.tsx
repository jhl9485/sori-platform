import type { Metadata } from "next";
import { BUSINESSES } from "@/data/businesses";
import BusinessDetailClient from "./BusinessDetailClient";

// 상세 화면 본체는 "use client"라 generateMetadata를 붙일 수 없다(서버 전용 기능).
// 그래서 이 얇은 서버 페이지가 제목·설명만 만들고, 화면은 클라이언트 쪽에 넘긴다.
export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const biz = BUSINESSES.find((b) => b.id === params.id);
  // 사용자가 등록한 업소는 localStorage에만 있어 서버에서 찾을 수 없다.
  // 여기서 notFound()를 던지면 정상적인 내 업소 상세가 404로 죽으므로,
  // 못 찾으면 일반 제목으로 조용히 빠진다(화면은 클라이언트가 정상 렌더).
  if (!biz) return { title: "업소" }; // layout의 template("%s · SORI")이 붙여주므로 여기서 SORI를 또 쓰지 않는다

  const subtitle = `${biz.category}${biz.cuisine ? ` ${biz.cuisine}` : ""} · ${biz.area}`;
  const description = `${subtitle} · ${biz.description}`.slice(0, 150);
  return {
    title: `${biz.name} · ${subtitle}`,
    description,
    openGraph: {
      title: `${biz.name} · ${subtitle}`,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${biz.name} · ${subtitle}`,
      description,
    },
  };
}

export default function Page({ params }: { params: { id: string } }) {
  return <BusinessDetailClient params={params} />;
}
