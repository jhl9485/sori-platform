// 연락처·링크 관련 헬퍼.

// "확인 필요", "미입력", "—", 빈값 등은 실제 값이 아니다.
export function isRealValue(v: string | undefined | null): boolean {
  if (!v) return false;
  const s = v.trim();
  if (s === "" || s === "—" || s === "-" || s === "미입력") return false;
  if (s.includes("확인 필요") || s.includes("확인필요")) return false;
  return true;
}

// 전화 문자열 → tel: href. 여러 번호가 '/'나 ','로 나뉘면 첫 번호만 사용.
export function telHref(phone: string): string {
  const first = phone.split(/[/,]/)[0] ?? phone;
  const cleaned = first.replace(/[^\d+]/g, "");
  return `tel:${cleaned}`;
}

// URL 문자열 → https href (스킴 없으면 https:// 붙임).
export function urlHref(url: string): string {
  const s = url.trim();
  return /^https?:\/\//i.test(s) ? s : `https://${s}`;
}

// 화면 표시용으로 URL의 스킴/트레일링 슬래시를 다듬는다.
export function prettyUrl(url: string): string {
  return url.trim().replace(/^https?:\/\//i, "").replace(/\/$/, "");
}
