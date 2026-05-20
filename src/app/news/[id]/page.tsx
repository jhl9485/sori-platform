"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import { NEWS_ITEMS } from "@/data/newsItems";

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const news = NEWS_ITEMS.find((n) => n.id === params.id);
  const [saved, setSaved] = useState(false);

  if (!news) return notFound();

  const related = NEWS_ITEMS.filter((n) => news.relatedIds.includes(n.id));

  const lines = news.fullContent.split("\n").map((line, i) => {
    if (line.startsWith("**") && line.endsWith("**")) {
      return <p key={i} className="font-bold text-[0.9rem] mt-4 mb-1 text-[#181614]">{line.replace(/\*\*/g, "")}</p>;
    }
    if (line.startsWith("- ")) {
      return <li key={i} className="text-[0.85rem] text-[#181614] ml-4 list-disc leading-relaxed">{line.slice(2)}</li>;
    }
    if (line.trim() === "") return <br key={i} />;
    return <p key={i} className="text-[0.85rem] text-[#181614] leading-relaxed">{line}</p>;
  });

  return (
    <div className="max-w-[680px] mx-auto">
      <PageHeader
        right={
          <button onClick={() => setSaved(!saved)} className={`text-xl ${saved ? "text-[#D04020]" : "text-[#C0BBB0]"}`}>
            {saved ? "🔖" : "🏷️"}
          </button>
        }
      />

      <article className="bg-white">
        {/* 헤더 */}
        <div className="px-4 md:px-6 pt-5 pb-4">
          {news.isBreaking && (
            <div className="inline-flex items-center gap-1 bg-[#D04020] text-white text-[0.68rem] font-bold px-2 py-1 rounded mb-3">
              ⚡ 속보
            </div>
          )}
          <span className={`inline-block text-[0.7rem] px-2 py-[3px] rounded-full font-semibold mb-3 ${news.catStyle}`}>
            {news.category}
          </span>
          <h1 className="text-[1.1rem] font-bold leading-snug mb-4">{news.title}</h1>

          <div className="flex items-center justify-between text-[0.72rem] text-[#888070]">
            <div className="flex items-center gap-2">
              <span className="font-medium text-[#181614]">{news.source}</span>
              <span>·</span>
              <span>{news.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📖 {news.readTime}</span>
              <button className="hover:text-[#181614]">↗ 공유</button>
            </div>
          </div>
        </div>

        {/* 요약 박스 */}
        <div className="mx-4 md:mx-6 mb-4 bg-[#F5F3EE] rounded-[12px] p-4">
          <div className="text-[0.7rem] font-bold text-[#888070] mb-1 uppercase tracking-wider">요약</div>
          <p className="text-[0.85rem] text-[#181614] leading-relaxed">{news.summary}</p>
        </div>

        <div className="h-px bg-black/[0.06] mx-4 md:mx-6 mb-4" />

        {/* 본문 */}
        <div className="px-4 md:px-6 pb-5 space-y-1">{lines}</div>

        {/* AI 번역 고지 */}
        <div className="mx-4 md:mx-6 mb-5 bg-[#EBF0FB] rounded-[10px] p-3 flex items-start gap-2">
          <span className="text-sm flex-shrink-0">🤖</span>
          <p className="text-[0.72rem] text-[#2050A0]">
            이 기사는 AI가 번역하고 편집자가 검토한 콘텐츠입니다. 원문과 일부 차이가 있을 수 있습니다.
          </p>
        </div>

        {/* 액션 */}
        <div className="px-4 md:px-6 py-3 border-t border-black/[0.06] flex items-center gap-4">
          <button className="flex items-center gap-1 text-[0.82rem] text-[#888070] hover:text-[#D04020]">
            ↗ 공유
          </button>
          <button
            onClick={() => setSaved(!saved)}
            className={`flex items-center gap-1 text-[0.82rem] ml-auto ${saved ? "text-[#2050A0]" : "text-[#888070]"}`}
          >
            {saved ? "🔖 저장됨" : "🏷️ 저장"}
          </button>
        </div>
      </article>

      {/* 관련 기사 */}
      {related.length > 0 && (
        <div className="bg-white mt-2 px-4 md:px-6 py-4">
          <h3 className="text-[0.85rem] font-bold mb-3 text-[#888070]">관련 기사</h3>
          {related.map((r) => (
            <Link key={r.id} href={`/news/${r.id}`} className="flex items-center gap-3 py-2 border-b border-black/[0.04] last:border-0 group">
              <span className="text-xl">{r.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="text-[0.82rem] font-medium group-hover:text-[#D04020] transition-colors line-clamp-1">{r.title}</div>
                <div className="text-[0.7rem] text-[#888070]">{r.source} · {r.time}</div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* 다른 뉴스 */}
      <div className="bg-white mt-2 px-4 md:px-6 py-4">
        <h3 className="text-[0.85rem] font-bold mb-3 text-[#888070]">다른 뉴스</h3>
        {NEWS_ITEMS.filter((n) => n.id !== news.id).slice(0, 3).map((n) => (
          <Link key={n.id} href={`/news/${n.id}`} className="flex items-center gap-3 py-2 border-b border-black/[0.04] last:border-0 group">
            <span className="text-xl">{n.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="text-[0.82rem] font-medium group-hover:text-[#D04020] transition-colors line-clamp-1">{n.title}</div>
              <div className="text-[0.7rem] text-[#888070]">{n.category} · {n.time}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="h-4" />
    </div>
  );
}
