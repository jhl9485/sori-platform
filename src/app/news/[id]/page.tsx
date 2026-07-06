import type { Metadata } from "next";
import { NEWS_ITEMS } from "@/data/newsItems";
import NewsDetailClient from "./NewsDetailClient";

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
  return <NewsDetailClient params={params} />;
}
