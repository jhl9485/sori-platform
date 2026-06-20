"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// ⚠️ 운영자 수신 이메일 — 진호님이 정해주시면 1줄 교체.
//   (전용 이메일 / 카카오톡 채널 / 구글폼 등 원하는 채널로 바꿀 수 있음)
const APPLICATION_EMAIL = "REPLACE_WITH_OPERATOR_EMAIL@example.com";

const CATEGORIES = ["한식", "뷰티", "마트", "병원", "학원", "부동산", "법무", "이사", "카페", "주점", "기타"];

export default function BusinessApplyPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [area, setArea] = useState("");
  const [intro, setIntro] = useState("");
  const [contact, setContact] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = name.trim() && category && contact.trim();

  const submit = () => {
    if (!canSubmit) return;
    const subject = `[SORI 업소 등록 신청] ${name.trim()}`;
    const body =
      `업소명: ${name.trim()}\n` +
      `카테고리: ${category}\n` +
      `지역: ${area.trim() || "-"}\n` +
      `한 줄 소개: ${intro.trim() || "-"}\n` +
      `사장님 연락처: ${contact.trim()}\n\n` +
      `※ SORI 운영자가 실제 영업·정보를 확인한 뒤 등록 여부를 안내드립니다.`;
    window.location.href = `mailto:${APPLICATION_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-[480px] mx-auto min-h-screen bg-white shadow-[0_0_60px_rgba(0,0,0,0.12)] flex flex-col items-center justify-center text-center px-6">
        <div className="text-5xl mb-4">📨</div>
        <h1 className="text-[1.1rem] font-bold mb-2">신청이 준비되었습니다</h1>
        <p className="text-[0.85rem] text-[#888070] leading-relaxed mb-6">
          메일 앱이 열렸어요. <strong>전송</strong>을 완료하시면 운영자가 실제 영업·정보를 확인한 뒤
          등록 여부를 안내드립니다. (기본 등록은 무료)
        </p>
        <button
          onClick={() => router.push("/business")}
          className="bg-[#D04020] text-white text-[0.85rem] font-bold px-5 py-[10px] rounded-[10px] hover:bg-[#B83515] transition-colors"
        >
          업소록으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[480px] mx-auto min-h-screen bg-white shadow-[0_0_60px_rgba(0,0,0,0.12)]">
      {/* 헤더 */}
      <div className="sticky top-0 z-50 bg-white border-b border-black/[0.08] px-4 h-[56px] flex items-center justify-between">
        <button onClick={() => router.back()} className="text-[0.9rem] text-[#888070]" aria-label="닫기">✕</button>
        <span className="text-[0.9rem] font-bold">업소 등록 신청</span>
        <button
          onClick={submit}
          disabled={!canSubmit}
          className={`text-[0.85rem] font-bold px-3 py-1 rounded-full transition-colors ${
            canSubmit ? "bg-[#D04020] text-white" : "bg-[#F0EDE8] text-[#888070]"
          }`}
        >
          신청
        </button>
      </div>

      <div className="px-4 py-4 space-y-5 pb-24">
        {/* 검토제 안내 */}
        <div className="bg-[#EBF0FB] border border-[#2050A0]/20 rounded-[12px] p-4">
          <div className="text-[0.85rem] font-bold text-[#2050A0] mb-1">🔎 SORI 업소록은 검토제로 운영됩니다</div>
          <p className="text-[0.78rem] text-[#2050A0]/90 leading-relaxed">
            아무나 바로 게시되지 않아요. <strong>운영자가 실제 영업·정보를 확인한 곳만 ✓ SORI 인증과 함께 등록</strong>합니다.
            그래서 한인분들이 믿고 쓸 수 있어요.
            <br /><br />
            <strong>· 기본 등록은 무료</strong> · 상단 노출·쿠폰 등 프리미엄 옵션은 등록 후 별도 안내
          </p>
        </div>

        {/* 업소명 */}
        <Field label="업소명" required>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="예: 구이가 (Guiga Korean BBQ)"
            maxLength={40}
            className="w-full bg-[#F5F3EE] rounded-[10px] px-4 py-3 text-[0.88rem] outline-none placeholder:text-[#C0BBB0]"
          />
        </Field>

        {/* 카테고리 */}
        <Field label="업종" required>
          <div className="flex flex-wrap gap-[6px]">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`text-[0.78rem] rounded-full px-3 py-[6px] border transition-colors ${
                  category === c
                    ? "bg-[#181614] text-white border-[#181614]"
                    : "bg-white text-[#888070] border-black/[0.08] hover:border-black/[0.15]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Field>

        {/* 지역 */}
        <Field label="지역 (선택)">
          <input
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="예: Tanjong Pagar"
            className="w-full bg-[#F5F3EE] rounded-[10px] px-4 py-3 text-[0.85rem] outline-none placeholder:text-[#C0BBB0]"
          />
        </Field>

        {/* 한 줄 소개 */}
        <Field label="한 줄 소개 (선택)">
          <input
            type="text"
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            placeholder="예: 25년 전통 한식, 한국어 상담 가능"
            maxLength={60}
            className="w-full bg-[#F5F3EE] rounded-[10px] px-4 py-3 text-[0.85rem] outline-none placeholder:text-[#C0BBB0]"
          />
        </Field>

        {/* 사장님 연락처 */}
        <Field label="사장님 연락처" required>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="카카오톡 ID / 전화 / 이메일 (운영자 확인용)"
            className="w-full bg-[#F5F3EE] rounded-[10px] px-4 py-3 text-[0.85rem] outline-none placeholder:text-[#C0BBB0]"
          />
          <p className="text-[0.68rem] text-[#888070] mt-1">운영자가 확인 연락을 드리기 위한 정보예요. 공개되지 않습니다.</p>
        </Field>

        {/* 제출 버튼 */}
        <button
          onClick={submit}
          disabled={!canSubmit}
          className={`w-full py-3 rounded-[12px] font-bold text-[0.9rem] transition-colors ${
            canSubmit ? "bg-[#D04020] text-white hover:bg-[#B83515]" : "bg-[#F0EDE8] text-[#C0BBB0]"
          }`}
        >
          📨 등록 신청 보내기
        </button>
        <p className="text-center text-[0.7rem] text-[#888070]">
          신청 후 운영자 검토를 거쳐 등록됩니다. 허위 정보는 등록이 거절될 수 있어요.
        </p>
      </div>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-1 mb-2">
        <span className="text-[0.85rem] font-bold">{label}</span>
        {required && <span className="text-[#D04020] text-[0.78rem]">*</span>}
      </div>
      {children}
    </div>
  );
}
