"use client";

import Link from "next/link";

interface Props {
  title?: string;
  desc?: string;
}

export default function LoginRequired({
  title = "로그인이 필요해요",
  desc = "글 작성은 로그인 후 이용할 수 있어요.",
}: Props) {
  return (
    <div className="min-h-screen bg-[#F5F3EE] flex flex-col items-center justify-center px-6 text-center">
      <div className="text-[2.5rem] mb-3">🔒</div>
      <h1 className="text-[1.15rem] font-bold text-[#181614] mb-1.5">{title}</h1>
      <p className="text-[0.85rem] text-[#888070] mb-6 max-w-[260px] leading-relaxed">{desc}</p>
      <Link
        href="/login"
        className="px-6 py-2.5 rounded-[10px] bg-[#D04020] text-white text-[0.9rem] font-semibold hover:bg-[#B83818] transition-colors"
      >
        로그인하기
      </Link>
      <Link href="/signup" className="mt-3 text-[0.8rem] text-[#D04020] font-medium">
        회원가입
      </Link>
      <Link href="/" className="mt-5 text-[0.75rem] text-[#888070] underline underline-offset-2">
        둘러보기로 돌아가기
      </Link>
    </div>
  );
}
