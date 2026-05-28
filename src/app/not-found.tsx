import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-[680px] mx-auto flex flex-col items-center justify-center text-center px-4 py-24 min-h-[60vh]">
      <div className="text-6xl mb-4">🧭</div>
      <h1 className="text-[1.4rem] font-bold text-[#181614] mb-2">페이지를 찾을 수 없어요</h1>
      <p className="text-[0.88rem] text-[#888070] mb-1">주소가 바뀌었거나 삭제된 콘텐츠일 수 있어요.</p>
      <p className="text-[0.78rem] text-[#888070] mb-6">아래 버튼으로 다시 둘러보세요.</p>
      <div className="flex flex-wrap gap-2 justify-center">
        <Link href="/" className="bg-[#D04020] text-white text-[0.85rem] font-bold px-5 py-[10px] rounded-[10px] hover:bg-[#B83515] transition-colors">
          🏠 홈으로
        </Link>
        <Link href="/community" className="bg-white border border-black/[0.1] text-[#181614] text-[0.85rem] font-medium px-5 py-[10px] rounded-[10px] hover:bg-[#F5F3EE] transition-colors">
          💬 커뮤니티
        </Link>
        <Link href="/search" className="bg-white border border-black/[0.1] text-[#181614] text-[0.85rem] font-medium px-5 py-[10px] rounded-[10px] hover:bg-[#F5F3EE] transition-colors">
          🔍 검색
        </Link>
      </div>
    </div>
  );
}
