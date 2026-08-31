import type { Metadata } from "next";
import { REALTY_ITEMS } from "@/data/realtyItems";
import RealtyDetailClient from "./RealtyDetailClient";
import { plainFromMarkdown } from "@/lib/format";

// 상세 화면 본체는 "use client"라 generateMetadata를 붙일 수 없다(서버 전용 기능).
// 그래서 이 얇은 서버 페이지가 제목·설명만 만들고, 화면은 클라이언트 쪽에 넘긴다.
export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const item = REALTY_ITEMS.find((r) => r.id === params.id);
  // 사용자가 올린 매물은 localStorage에만 있어 서버에서 찾을 수 없다.
  // 못 찾아도 404로 만들지 않고 일반 제목으로 빠진다(화면은 클라이언트가 정상 렌더).
  if (!item) return { title: "부동산" }; // layout의 template("%s · SORI")이 붙여주므로 여기서 SORI를 또 쓰지 않는다

  const title = `${item.title} · ${item.price}`;
  // item.description은 마크다운이다(**굵게**, "- " 목록). 화면은 renderMarkdown이 처리하지만
  // 이 문자열은 meta/og description으로 그대로 나가 별표와 줄바꿈이 그대로 노출됐다(벼룩과 같은 결).
  // 자르기 전에 기호를 걷어내야 150자가 낭비되지 않는다.
  const description = plainFromMarkdown(
    `${item.deal} · ${item.type} · ${item.price} · ${item.area} · 방 ${item.bedrooms} · ${item.size} · ${item.description}`
  ).slice(0, 150);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function Page({ params }: { params: { id: string } }) {
  return <RealtyDetailClient params={params} />;
}
