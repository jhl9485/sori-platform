import type { Metadata } from "next";
import { NEWS_ITEMS, type NewsItem } from "@/data/newsItems";
import NewsDetailClient from "./NewsDetailClient";
import JsonLd from "@/components/shared/JsonLd";
import { SITE_URL } from "@/lib/site";

// SORI 뉴스는 "우리가 취재한 기사"가 아니라 "다른 매체 기사를 한국어로 요약한 글"이다.
// 화면에도 "이 글은 위 출처의 기사를 바탕으로 ... 요약했습니다"라고 밝히고 있으므로
// 구조화 데이터도 같은 사실을 말해야 한다.
//
// - publisher/author = SORI: 이 "한국어 요약문"을 쓰고 발행한 주체는 SORI가 맞다.
// - 원문 출처 = isBasedOn: citation은 "참고로 언급한 다른 글"이라는 뜻이라 너무 약하다.
//   isBasedOn은 "이 글이 그것을 바탕으로 파생·각색된 것"이라는 뜻이고,
//   SORI 뉴스가 원문에 대해 갖는 관계가 정확히 그것이다. 그래서 isBasedOn을 골랐다.
// - 출처를 NewsArticle이 아니라 CreativeWork로 적은 이유: 출처 중에는 NDP 공식 사이트처럼
//   뉴스 기사가 아닌 것도 섞여 있다. 확실하지 않은 타입을 단정하지 않는다.
// - dateModified·image는 데이터에 없어서 필드를 통째로 뺐다(뉴스에는 사진이 없고 이모지뿐이다).
function newsJsonLd(news: NewsItem) {
  // 화면(NewsDetailClient)과 똑같은 규칙: 신 sources[] 우선, 없으면 구 source/sourceUrl 폴백
  const sourceList = news.sources && news.sources.length > 0
    ? news.sources
    : (news.sourceUrl ? [{ name: news.source, url: news.sourceUrl }] : []);

  const url = `${SITE_URL}/news/${news.id}`;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: news.title,
    description: news.summary,
    datePublished: news.publishedAt,
    articleSection: news.category,
    inLanguage: "ko",
    url,
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: "SORI", url: SITE_URL },
    publisher: { "@type": "Organization", name: "SORI", url: SITE_URL },
  };
  if (sourceList.length > 0) {
    data.isBasedOn = sourceList.map((src) => ({
      "@type": "CreativeWork",
      name: src.name,
      url: src.url,
    }));
  }
  return data;
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const news = NEWS_ITEMS.find((n) => n.id === params.id);
  if (!news) return { title: "뉴스를 찾을 수 없어요" };
  const description = news.summary?.slice(0, 150);
  return {
    title: news.title,
    description,
    openGraph: {
      title: news.title,
      description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      description,
    },
  };
}

export default function Page({ params }: { params: { id: string } }) {
  // 시드에 없는 id(사용자 글은 localStorage에만 있어 서버가 못 본다)면 구조화 데이터를 아예 넣지 않는다.
  // 빈 값이나 추측을 넣느니 빼는 게 낫고, 화면은 그대로 클라이언트가 정상 렌더한다.
  const news = NEWS_ITEMS.find((n) => n.id === params.id);
  return (
    <>
      {news && <JsonLd data={newsJsonLd(news)} />}
      <NewsDetailClient params={params} />
    </>
  );
}
