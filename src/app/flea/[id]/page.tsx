import type { Metadata } from "next";
import { FLEA_ITEMS, type FleaItem } from "@/data/fleaItems";
import FleaDetailClient from "./FleaDetailClient";
import JsonLd from "@/components/shared/JsonLd";
import { SITE_URL } from "@/lib/site";

// 화면 설명과 구조화 데이터 설명이 갈라지지 않게 한 곳에서 만든다.
function fleaDescription(item: FleaItem): string {
  return `${item.price} · ${item.condition} · ${item.category} · ${item.area} · ${item.description}`.slice(0, 150);
}

// 판매 상태 → schema.org ItemAvailability.
// "예약중"에 딱 맞는 표준 용어가 없다. SoldOut은 아직 안 팔렸으니 과장이고, InStock은
// 예약이 걸린 사실을 숨긴다. 그래서 "제한적으로만 구매 가능"이라는 LimitedAvailability를 골랐다.
const AVAILABILITY: Record<string, string> = {
  "판매중": "https://schema.org/InStock",
  "예약중": "https://schema.org/LimitedAvailability",
  "판매완료": "https://schema.org/SoldOut",
};

// 벼룩시장 = 중고 거래. "새상품"만 NewCondition이고 나머지 상태(최상·상태좋음·좋음·보통)는 중고다.
function itemCondition(condition: FleaItem["condition"]): string {
  return condition === "새상품" ? "https://schema.org/NewCondition" : "https://schema.org/UsedCondition";
}

function fleaJsonLd(item: FleaItem) {
  const url = `${SITE_URL}/flea/${item.id}`;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.title,
    description: fleaDescription(item),
    category: item.category,
    url,
    mainEntityOfPage: url,
  };

  // 가격은 화면에 "$1,800" 같은 문자열로 저장돼 있는데 구조화 데이터의 price는 숫자여야 한다.
  // 통화 기호와 천 단위 쉼표를 떼고 숫자만 남긴다. 숫자로 못 읽으면(예: "무료", "협의")
  // 0원이라고 우기지 말고 offers를 통째로 뺀다.
  const price = Number(item.price.replace(/[^0-9.]/g, ""));
  if (Number.isFinite(price) && price > 0) {
    // status는 선택 항목이라 없을 수 있다. 화면(FleaDetailClient)이 쓰는 것과 같은 기본값을 쓴다.
    const status = item.status || "판매중";
    data.offers = {
      "@type": "Offer",
      price,
      priceCurrency: "SGD",
      availability: AVAILABILITY[status],
      itemCondition: itemCondition(item.condition),
      url,
    };
  }
  return data;
}

// 상세 화면 본체는 "use client"라 generateMetadata를 붙일 수 없다(서버 전용 기능).
// 그래서 이 얇은 서버 페이지가 제목·설명만 만들고, 화면은 클라이언트 쪽에 넘긴다.
export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const item = FLEA_ITEMS.find((f) => f.id === params.id);
  // 사용자가 올린 물건은 localStorage에만 있어 서버에서 찾을 수 없다.
  // 못 찾아도 404로 만들지 않고 일반 제목으로 빠진다(화면은 클라이언트가 정상 렌더).
  if (!item) return { title: "벼룩시장" }; // layout의 template("%s · SORI")이 붙여주므로 여기서 SORI를 또 쓰지 않는다

  const title = `${item.title} · ${item.price}`;
  const description = fleaDescription(item);
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
  // 사용자가 올린 물건은 localStorage에만 있어 서버가 못 본다 — 그때는 구조화 데이터를 넣지 않는다.
  const item = FLEA_ITEMS.find((f) => f.id === params.id);
  return (
    <>
      {item && <JsonLd data={fleaJsonLd(item)} />}
      <FleaDetailClient params={params} />
    </>
  );
}
