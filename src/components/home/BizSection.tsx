import Link from "next/link";

const businesses = [
  { emoji: "🍱", bg: "bg-[#FBF0EC]", name: "강남부식",    cat: "한식 · Tanjong Pagar",   rating: "4.8", reviews: "124" },
  { emoji: "💅", bg: "bg-[#EBF0FB]", name: "서울뷰티",    cat: "헤어·뷰티 · Orchard",    rating: "4.6", reviews: "89" },
  { emoji: "🛒", bg: "bg-[#EBF5F0]", name: "K-마트",      cat: "한인마트 · Buona Vista", rating: "4.5", reviews: "201" },
  { emoji: "🍗", bg: "bg-[#FBF5E8]", name: "한가위치킨",  cat: "치킨 · Clarke Quay",     rating: "4.7", reviews: "67" },
];

export default function BizSection() {
  return (
    <section className="mb-6">
      <div className="flex justify-between items-center px-4 md:px-6 pb-3">
        <h2 className="text-[1rem] font-bold tracking-tight">인기 한인 업소</h2>
        <Link href="/business" className="text-[0.78rem] text-[#D04020] font-medium hover:underline">전체보기</Link>
      </div>

      {/* 모바일: 가로 스크롤 / 데스크탑: 4열 그리드 */}
      <div className="hidden md:grid md:grid-cols-4 gap-3 px-6">
        {businesses.map((b) => (
          <BizCard key={b.name} biz={b} />
        ))}
      </div>
      <div className="flex md:hidden gap-3 px-4 overflow-x-auto scrollbar-hide pb-1">
        {businesses.map((b) => (
          <div key={b.name} className="flex-shrink-0 w-40">
            <BizCard biz={b} />
          </div>
        ))}
      </div>
    </section>
  );
}

function BizCard({ biz }: { biz: typeof businesses[0] }) {
  return (
    <div className="bg-white rounded-[14px] border border-black/[0.08] overflow-hidden cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all">
      <div className={`w-full h-[80px] flex items-center justify-center text-[2.2rem] ${biz.bg}`}>
        {biz.emoji}
      </div>
      <div className="px-3 py-2">
        <div className="text-[0.82rem] font-bold mb-[2px]">{biz.name}</div>
        <div className="text-[0.7rem] text-[#888070] mb-[5px]">{biz.cat}</div>
        <div className="flex items-center gap-1">
          <span className="text-[0.7rem] text-[#B07010] font-semibold">★ {biz.rating}</span>
          <span className="text-[0.68rem] text-[#888070]">({biz.reviews})</span>
          <span className="text-[0.68rem] font-semibold text-[#2B7A50] ml-auto">영업중</span>
        </div>
      </div>
    </div>
  );
}
