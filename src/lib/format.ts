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

// ── 게시 시간 표시 ────────────────────────────────────────────────
// 시드(데모) 데이터엔 실제 날짜가 없고 "10분 전" 같은 고정 문자열만 있다.
// 이를 "고정 기준시각(SEED_EPOCH)" 기준의 실제 ISO로 바꿔 카드=상대시간 / 상세=정확시각을
// 가능하게 한다. 기준시각이 고정이라 시간이 지나면 자연히 오래된 표시로 바뀐다(의도된 동작).
const SEED_EPOCH = new Date("2026-07-16T10:00:00+08:00").getTime(); // SGT 기준

// "방금 / N분 전 / N시간 전 / 어제 / N일 전 / N주 전" → SEED_EPOCH 기준 실제 ISO.
// 변환 불가한 절대/월 단위 문자열(예: "2026년 7월")은 null 반환.
export function seedTimeToISO(time: string | undefined): string | null {
  if (!time) return null;
  const s = time.trim();
  let ms: number | null = null;
  let m: RegExpMatchArray | null;
  if (/^방금/.test(s)) ms = 0;
  else if ((m = s.match(/(\d+)\s*분\s*전/))) ms = parseInt(m[1], 10) * 60_000;
  else if ((m = s.match(/(\d+)\s*시간\s*전/))) ms = parseInt(m[1], 10) * 3_600_000;
  else if (/어제/.test(s)) ms = 86_400_000;
  else if ((m = s.match(/(\d+)\s*일\s*전/))) ms = parseInt(m[1], 10) * 86_400_000;
  else if ((m = s.match(/(\d+)\s*주\s*전/))) ms = parseInt(m[1], 10) * 7 * 86_400_000;
  if (ms === null) return null;
  return new Date(SEED_EPOCH - ms).toISOString();
}

// 표시할 실제 ISO를 정한다: 실제 createdAt이 있으면 그걸, 없으면 시드 문자열을 변환해서.
export function resolveISO(createdAt: string | undefined, time: string | undefined): string | null {
  if (createdAt) return createdAt;
  return seedTimeToISO(time);
}

const pad = (n: number) => String(n).padStart(2, "0");

// 카드용: 24시간 이내는 상대시간(방금/N분 전/N시간 전), 그 이후는 날짜(YYYY.MM.DD).
export function cardTime(iso: string | null | undefined): string {
  if (!iso) return "";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const diff = Date.now() - then;
  if (diff < 0) return "방금";
  const min = Math.floor(diff / 60_000);
  if (min < 1) return "방금";
  if (min < 60) return `${min}분 전`;
  const hour = Math.floor(min / 60);
  if (hour < 24) return `${hour}시간 전`;
  const d = new Date(iso);
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`;
}

// 최신순 정렬 키(ms). createdAt 우선, 없으면 시드 문자열 변환. 못 구하면 0(맨 뒤로).
export function timeSortKey(createdAt: string | undefined, time: string | undefined): number {
  const iso = resolveISO(createdAt, time);
  if (!iso) return 0;
  const t = new Date(iso).getTime();
  return Number.isNaN(t) ? 0 : t;
}

// 상세용: 항상 정확한 날짜와 시간 (YYYY.MM.DD HH:MM).
export function exactTime(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
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

// 마크다운 기호를 걷어낸 "순수 글자"를 만든다.
//
// 화면은 renderMarkdown이 **굵게**를 <strong>으로 바꿔 별표가 보이지 않는다(4차에서 고침).
// 그런데 검색엔진·카톡 미리보기가 읽는 값(JSON-LD description, meta description)은
// 그냥 문자열이라 그 처리를 못 받는다. 그래서 화면은 멀쩡한데 기계가 읽는 쪽에만
// **제품 정보** 같은 별표가 그대로 남아 있었다.
//
// renderInline과 같은 규칙을 쓴다: 짝이 맞는 **...**만 벗기고, 짝이 없는 별표는
// 원문 그대로 둔다(원문을 함부로 지우지 않는다).
//
// renderMarkdown.tsx에 두지 않은 이유: 그 파일은 "use client"인 Linkify를 가져오는데,
// 이 함수를 쓰는 곳(flea/[id]/page.tsx)은 서버 컴포넌트라 문자열 하나 때문에
// 클라이언트 컴포넌트를 딸려 보내게 된다. 여기(순수 문자열 유틸)가 맞는 자리다.
export function plainFromMarkdown(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1") // 짝이 맞는 굵게만 벗긴다
    .replace(/^[ \t]*-\s+/gm, "")      // 줄머리 목록 기호("- ")
    .replace(/\s+/g, " ")              // 줄바꿈·연속 공백을 한 칸으로
    .trim();
}
