import Link from "next/link";

const NEWS_PREVIEW = [
  { emoji: "📊", category: "경제", title: "싱가포르 소비자물가 2.3% 상승", time: "오전 8:12" },
  { emoji: "🌧️", category: "날씨", title: "이번 주말 강한 스콜 예보", time: "오전 7:00", isBreaking: true },
  { emoji: "🏘️", category: "부동산", title: "콘도 임대료 3개월 연속 하락세", time: "어제" },
];

export default function NewsPreview() {
  return (
    <section className="mb-6">
      <div className="flex justify-between items-center px-4 md:px-6 pb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-[1rem] font-bold tracking-tight">Daily SG 뉴스</h2>
          <span className="text-[0.6rem] bg-[#FBF0EC] text-[#D04020] px-[6px] py-[2px] rounded font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            LIVE
          </span>
        </div>
        <Link href="/news" className="text-[0.78rem] text-[#D04020] font-medium hover:underline">전체보기</Link>
      </div>
      <div className="flex flex-col gap-2 px-4 md:px-6">
        {NEWS_PREVIEW.map((news, i) => (
          <Link
            href="/news"
            key={i}
            className="bg-white rounded-[12px] border border-black/[0.08] px-3 py-[10px] flex items-center gap-3 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:border-black/[0.12] transition-all"
          >
            <span className="text-xl flex-shrink-0">{news.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="text-[0.82rem] font-medium truncate">{news.title}</div>
              <div className="flex items-center gap-2 mt-[2px]">
                {news.isBreaking && <span className="text-[0.62rem] text-[#D04020] font-bold">⚡속보</span>}
                <span className="text-[0.68rem] text-[#888070]">{news.category} · {news.time}</span>
              </div>
            </div>
            <span className="text-[#C0BBB0] text-sm flex-shrink-0">›</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
