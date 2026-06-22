// 1,234 → "1.2K", 12,345 → "1.2만", 123,456 → "12만"
export function formatCount(value: number | string | undefined): string {
  if (value === undefined || value === null) return "0";
  const num = typeof value === "string" ? parseInt(value.replace(/,/g, ""), 10) : value;
  if (Number.isNaN(num)) return String(value);

  if (num < 1000) return String(num);
  if (num < 10000) {
    const k = num / 1000;
    return k % 1 === 0 ? `${k}K` : `${k.toFixed(1)}K`;
  }
  if (num < 100000) {
    const man = num / 10000;
    return man % 1 === 0 ? `${man}만` : `${man.toFixed(1)}만`;
  }
  if (num < 100000000) {
    return `${Math.floor(num / 10000)}만`;
  }
  return `${Math.floor(num / 100000000)}억`;
}

// ISO 날짜/시간 문자열 → "방금", "N분 전", "N시간 전", "N일 전", "N주 전", "YYYY.MM.DD"
// 자동 생성 글처럼 createdAt(실제 날짜)을 가진 항목의 시간 표시를 화면에서 자동 계산할 때 사용.
// 표시 위치에는 suppressHydrationWarning을 함께 줄 것(서버/클라 시각 차이로 인한 경고 방지).
export function timeAgo(iso: string | undefined): string {
  if (!iso) return "";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const diffMs = Date.now() - then;
  // 미래(시차/오차)면 "방금"으로 처리
  if (diffMs < 0) return "방금";

  const min = Math.floor(diffMs / 60000);
  if (min < 1) return "방금";
  if (min < 60) return `${min}분 전`;

  const hour = Math.floor(min / 60);
  if (hour < 24) return `${hour}시간 전`;

  const day = Math.floor(hour / 24);
  if (day === 1) return "어제";
  if (day < 7) return `${day}일 전`;
  if (day < 28) return `${Math.floor(day / 7)}주 전`;

  const d = new Date(iso);
  const yy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yy}.${mm}.${dd}`;
}

// 상대 시간 (이미 lib/userContent.ts에 있지만 export로 재노출용 — 향후 활용)
export function shortPrice(s: string): string {
  // "$1,850,000" → "$185만"
  const m = s.match(/^\$?([\d,]+)/);
  if (!m) return s;
  const n = parseInt(m[1].replace(/,/g, ""), 10);
  if (Number.isNaN(n)) return s;
  if (n >= 10000) {
    const man = n / 10000;
    return `$${man % 1 === 0 ? man : man.toFixed(1)}만`;
  }
  return s;
}
