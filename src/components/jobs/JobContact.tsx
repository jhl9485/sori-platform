"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth";

/**
 * 채용 담당자 연락처 — 상세 맨 아래.
 * 게스트에게는 가려둔다: 공개해두면 크롤러가 이메일·번호를 수집해 스팸이 간다.
 */
export default function JobContact({ contact }: { contact?: string }) {
  const { isAuthed, hydrated } = useAuth();

  const value = contact?.trim();
  if (!value) {
    return (
      <div className="bg-white mt-2 px-4 md:px-6 py-5">
        <h2 className="text-[0.9rem] font-bold mb-2">담당자 연락처</h2>
        <p className="text-[0.8rem] text-[#888070] leading-relaxed">
          이 공고에는 등록된 연락처가 없어요. 회사 공식 채용 페이지를 통해 지원해주세요.
        </p>
      </div>
    );
  }

  // 하이드레이션 전에는 잠금 상태로 그린다 (연락처가 잠깐 보였다 사라지는 것 방지)
  const locked = !hydrated || !isAuthed;

  return (
    <div className="bg-white mt-2 px-4 md:px-6 py-5">
      <h2 className="text-[0.9rem] font-bold mb-3">담당자 연락처</h2>
      {locked ? (
        <div className="bg-[#F5F3EE] rounded-[12px] p-4 text-center">
          <div className="text-2xl mb-2">🔒</div>
          <p className="text-[0.8rem] text-[#888070] mb-3 leading-relaxed">
            연락처는 로그인 후 확인할 수 있어요.
            <span className="block text-[0.7rem] text-[#C0BBB0] mt-1">무분별한 수집·스팸을 막기 위한 조치예요.</span>
          </p>
          <Link
            href="/login"
            className="inline-block bg-[#D04020] text-white text-[0.8rem] font-bold px-5 py-2 rounded-[10px] hover:bg-[#B83515] transition-colors"
          >
            로그인하고 보기
          </Link>
        </div>
      ) : (
        <div className="bg-[#EBF5F0] border border-[#2B7A50]/20 rounded-[12px] p-4">
          <div className="text-[0.7rem] text-[#2B7A50] font-bold mb-1">📮 지원 · 문의</div>
          <div className="text-[0.9rem] font-semibold text-[#181614] break-all whitespace-pre-line select-all">
            {value}
          </div>
        </div>
      )}
    </div>
  );
}
