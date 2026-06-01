/**
 * 상세 페이지가 localStorage hydration을 기다리는 동안 표시되는 스켈레톤.
 * 깜빡임/빈 화면 대신 자연스러운 로딩 인상을 줌.
 */
export default function DetailSkeleton() {
  return (
    <div className="max-w-[680px] mx-auto animate-pulse">
      {/* 헤더 자리 */}
      <div className="h-[56px] bg-white border-b border-black/[0.06]" />

      {/* 히어로/이미지 자리 */}
      <div className="bg-[#F0EDE8] h-[240px] w-full" />

      {/* 본문 자리 */}
      <div className="bg-white px-4 md:px-6 py-5 space-y-3">
        <div className="h-4 bg-[#F0EDE8] rounded w-1/3" />
        <div className="h-6 bg-[#F0EDE8] rounded w-3/4" />
        <div className="h-4 bg-[#F0EDE8] rounded w-1/2" />
        <div className="h-32 bg-[#F5F3EE] rounded mt-4" />
        <div className="space-y-2 mt-4">
          <div className="h-3 bg-[#F0EDE8] rounded w-full" />
          <div className="h-3 bg-[#F0EDE8] rounded w-5/6" />
          <div className="h-3 bg-[#F0EDE8] rounded w-4/6" />
        </div>
      </div>
    </div>
  );
}
