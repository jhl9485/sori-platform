// 채용 공고 마감 상태 판정.
// deadline은 자유 입력 문자열("2026-06-30", "채용시까지", "" 등). 날짜로 파싱되면 마감 여부를 계산한다.

const SIX_MONTHS_MS = 182 * 24 * 60 * 60 * 1000; // 약 6개월

// "2026-06-30", "2026.06.30", "2026/6/30" → Date. 파싱 불가("채용시까지" 등)면 null.
export function parseDeadline(deadline: string | undefined): Date | null {
  if (!deadline) return null;
  const m = deadline.trim().match(/^(\d{4})[.\-/](\d{1,2})[.\-/](\d{1,2})/);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]), 23, 59, 59);
  return Number.isNaN(d.getTime()) ? null : d;
}

// 마감일이 지났는가 (날짜 없는 공고는 '상시 채용'이라 마감 아님)
export function isJobClosed(deadline: string | undefined): boolean {
  const d = parseDeadline(deadline);
  if (!d) return false;
  return Date.now() > d.getTime();
}

// 마감 후 6개월이 지나 목록에서 숨겨야 하는가
export function isJobExpired(deadline: string | undefined): boolean {
  const d = parseDeadline(deadline);
  if (!d) return false;
  return Date.now() > d.getTime() + SIX_MONTHS_MS;
}

// 연봉 표시 텍스트. 안 적었거나 '협의'면 "연봉 협의"로.
export function salaryText(salary: string | undefined): string {
  const s = (salary || "").trim();
  if (!s || s === "협의" || s === "연봉 협의") return "연봉 협의";
  return s;
}
