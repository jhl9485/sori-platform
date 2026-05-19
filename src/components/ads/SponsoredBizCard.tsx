export default function SponsoredBizCard() {
  return (
    <div className="bg-white rounded-[14px] border-2 border-[#D04020]/20 overflow-hidden cursor-pointer hover:shadow-[0_4px_16px_rgba(208,64,32,0.12)] hover:-translate-y-[1px] transition-all relative">
      {/* 스폰서 배지 */}
      <div className="absolute top-2 right-2 z-10">
        <span
          className="text-[0.58rem] bg-[#D04020] text-white px-[6px] py-[2px] rounded font-bold"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          스폰서
        </span>
      </div>

      {/* 썸네일 */}
      <div className="w-full h-[80px] bg-gradient-to-br from-[#FBF0EC] to-[#F5E8E4] flex items-center justify-center text-[2.2rem]">
        ⚖️
      </div>

      <div className="px-3 py-2">
        <div className="text-[0.82rem] font-bold mb-[2px]">박앤리 이민법무법인</div>
        <div className="text-[0.7rem] text-[#888070] mb-[5px]">법무 · Raffles Place</div>
        <div className="flex items-center gap-1 mb-2">
          <span className="text-[0.7rem] text-[#B07010] font-semibold">★ 4.9</span>
          <span className="text-[0.68rem] text-[#888070]">(48)</span>
          <span className="text-[0.68rem] font-semibold text-[#2B7A50] ml-auto">영업중</span>
        </div>
        <div className="bg-[#FBF0EC] rounded-lg p-2 text-[0.72rem] text-[#D04020] font-medium">
          🎁 첫 상담 무료 · 한국어 상담 가능
        </div>
      </div>
    </div>
  );
}
