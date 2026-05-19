export default function SponsoredJobCard() {
  return (
    <div className="bg-white rounded-[14px] border-2 border-[#2050A0]/20 p-4 cursor-pointer hover:shadow-[0_4px_16px_rgba(32,80,160,0.1)] hover:-translate-y-[1px] transition-all relative">
      {/* 스폰서 배지 */}
      <div className="absolute top-3 right-3">
        <span
          className="text-[0.58rem] bg-[#2050A0] text-white px-[6px] py-[2px] rounded font-bold"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          스폰서
        </span>
      </div>

      {/* 회사 + 직무 */}
      <div className="flex items-start gap-3 mb-3 pr-16">
        <div className="w-10 h-10 rounded-[10px] bg-[#EBF0FB] flex items-center justify-center text-xl flex-shrink-0">
          🏦
        </div>
        <div>
          <div className="text-[0.88rem] font-bold leading-tight">한국계 금융기관 재무 분석가 채용</div>
          <div className="text-[0.75rem] text-[#888070]">KEB 하나은행 싱가포르</div>
        </div>
      </div>

      {/* 조건 태그 */}
      <div className="flex flex-wrap gap-[6px] mb-3">
        <span className="text-[0.72rem] bg-[#EBF0FB] text-[#2050A0] px-2 py-[3px] rounded-full font-medium">EP 스폰서</span>
        <span className="text-[0.72rem] bg-[#EBF5F0] text-[#2B7A50] px-2 py-[3px] rounded-full font-medium">💰 $7K~10K</span>
        <span className="text-[0.72rem] bg-[#FBF0EC] text-[#D04020] px-2 py-[3px] rounded-full font-medium">🇰🇷 한국어 필수</span>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {["Finance", "Bloomberg", "CFA 우대", "정규직"].map((tag) => (
          <span key={tag} className="text-[0.68rem] bg-[#F5F3EE] border border-black/[0.08] rounded-full px-2 py-[2px] text-[#888070]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            {tag}
          </span>
        ))}
      </div>

      {/* 프로모션 */}
      <div className="bg-[#EBF0FB] rounded-lg px-3 py-2 text-[0.75rem] text-[#2050A0] font-medium">
        🎯 서류 합격 시 인터뷰 코칭 무료 제공
      </div>

      <div className="flex items-center justify-between mt-3 pt-2 border-t border-black/[0.06]">
        <span className="text-[0.72rem] text-[#888070]">📍 Marina Bay · 마감 D-7</span>
        <span className="text-[0.72rem] text-[#D04020] font-semibold">지금 지원 →</span>
      </div>
    </div>
  );
}
