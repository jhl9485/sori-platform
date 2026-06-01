/**
 * 라우트 전환 시 표시되는 글로벌 로딩.
 * Next.js App Router가 새 segment 데이터를 불러오는 동안 자동 표시.
 * 깜빡임 대신 부드러운 펄스 스켈레톤으로 인상 개선.
 */
export default function Loading() {
  return (
    <div className="max-w-[680px] mx-auto animate-pulse">
      <div className="h-[56px] bg-white border-b border-black/[0.06]" />
      <div className="px-4 md:px-6 py-6 space-y-4">
        <div className="h-5 bg-[#F0EDE8] rounded w-1/3" />
        <div className="h-32 bg-[#F5F3EE] rounded" />
        <div className="space-y-2">
          <div className="h-3 bg-[#F0EDE8] rounded w-full" />
          <div className="h-3 bg-[#F0EDE8] rounded w-5/6" />
          <div className="h-3 bg-[#F0EDE8] rounded w-4/6" />
        </div>
      </div>
    </div>
  );
}
