interface Props {
  size?: "sm" | "md";
  className?: string;
}

/**
 * "✓ SORI 인증" 신뢰 배지 — 한인업소록 Phase 1.
 * SORI가 실제 영업·연락처·위치를 확인한 업소에 표시한다.
 * (시드 업소는 기본 인증, 사용자 등록 업소는 운영자 검증 전까지 미인증)
 */
export default function VerifiedBadge({ size = "sm", className = "" }: Props) {
  const sizeCls =
    size === "md"
      ? "text-[0.7rem] px-2 py-[3px] gap-1"
      : "text-[0.6rem] px-[6px] py-[1px] gap-[2px]";
  return (
    <span
      title="SORI가 실제 영업·연락처·위치를 확인한 인증 업소입니다."
      className={`inline-flex items-center rounded-full font-bold bg-[#EBF0FB] text-[#2050A0] border border-[#2050A0]/25 whitespace-nowrap ${sizeCls} ${className}`}
    >
      <span className="leading-none">✓</span>SORI 인증
    </span>
  );
}
