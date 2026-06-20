"use client";

import { useRouter } from "next/navigation";

// ⚠️ 구글폼 신청 링크 — 진호님이 구글폼을 만든 뒤 그 "응답 링크"를 여기에 넣으면 연결됨.
//   비어 있으면 "준비 중" 안내가 표시된다.
const GOOGLE_FORM_URL = "";

export default function BusinessApplyPage() {
  const router = useRouter();

  return (
    <div className="max-w-[480px] mx-auto min-h-screen bg-white shadow-[0_0_60px_rgba(0,0,0,0.12)]">
      {/* 헤더 */}
      <div className="sticky top-0 z-50 bg-white border-b border-black/[0.08] px-4 h-[56px] flex items-center justify-between">
        <button onClick={() => router.back()} className="text-[0.9rem] text-[#888070]" aria-label="닫기">✕</button>
        <span className="text-[0.9rem] font-bold">업소 등록 신청</span>
        <span className="w-6" />
      </div>

      <div className="px-4 py-5 space-y-5 pb-24">
        {/* 검토제 안내 */}
        <div className="bg-[#EBF0FB] border border-[#2050A0]/20 rounded-[12px] p-4">
          <div className="text-[0.85rem] font-bold text-[#2050A0] mb-1">🔎 SORI 업소록은 검토제로 운영됩니다</div>
          <p className="text-[0.78rem] text-[#2050A0]/90 leading-relaxed">
            아무나 바로 게시되지 않아요. 신청해 주시면 <strong>운영자가 실제 영업·정보를 확인한 곳만
            ✓ SORI 인증과 함께 등록</strong>합니다. 그래서 한인분들이 믿고 쓸 수 있어요.
            <br /><br />
            <strong>· 기본 등록은 무료</strong> · 상단 노출·쿠폰 등 프리미엄 옵션은 등록 후 별도 안내
          </p>
        </div>

        {/* 신청 절차 */}
        <div>
          <div className="text-[0.85rem] font-bold mb-2">📋 신청 절차</div>
          <ol className="space-y-2">
            <Step n="1" t="아래 버튼으로 등록 신청서(구글폼) 작성" />
            <Step n="2" t="운영자가 실제 영업·정보 확인 (필요 시 연락)" />
            <Step n="3" t="확인 완료 → ✓ SORI 인증과 함께 업소록에 등록" />
          </ol>
        </div>

        {/* 준비하면 좋은 정보 */}
        <div className="bg-[#F5F3EE] rounded-[12px] p-4">
          <div className="text-[0.78rem] font-bold text-[#181614] mb-1">✍️ 미리 준비하면 좋아요</div>
          <p className="text-[0.74rem] text-[#888070] leading-relaxed">
            업소명 · 업종 · 지역/주소 · 전화·영업시간 · 한 줄 소개 · 한국어 상담 가능 여부 · 사장님 연락처(카톡/전화)
          </p>
        </div>

        {/* 신청 버튼 */}
        {GOOGLE_FORM_URL ? (
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center py-3 rounded-[12px] font-bold text-[0.9rem] bg-[#D04020] text-white hover:bg-[#B83515] transition-colors"
          >
            📝 등록 신청서 작성하기 →
          </a>
        ) : (
          <div className="w-full text-center py-3 rounded-[12px] font-bold text-[0.9rem] bg-[#F0EDE8] text-[#888070]">
            신청서 준비 중 — 곧 열립니다
          </div>
        )}
        <p className="text-center text-[0.7rem] text-[#888070]">
          허위 정보는 등록이 거절될 수 있어요. 사장님 연락처는 확인용이며 공개되지 않습니다.
        </p>
      </div>
    </div>
  );
}

function Step({ n, t }: { n: string; t: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="w-5 h-5 rounded-full bg-[#181614] text-white text-[0.62rem] font-bold flex items-center justify-center flex-shrink-0 mt-[1px]">
        {n}
      </span>
      <span className="text-[0.82rem] text-[#181614] leading-relaxed">{t}</span>
    </li>
  );
}
