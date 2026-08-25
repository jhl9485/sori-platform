// 부동산 매물의 "입주 가능일" 표시 규칙.
//
// availableFrom은 자유 입력이다("2026-09-01", "즉시 입주 가능", "협의" 등). 여기에 날짜가 들어오면
// 시간이 지나면서 반드시 과거가 되고, 상태가 "가능"인 매물은 그 순간 화면에 모순이 생긴다
// ("지금 입주 가능"이라면서 입주 가능일은 두 달 전).
//
// 데이터에 박힌 날짜를 그때그때 미루는 방식으로 이미 세 번 고쳤고(데-15 외), 미루는 순간
// 다음 시한폭탄이 예약된다. 게다가 사용자가 직접 등록한 매물(localStorage)은 우리가 고칠 수도 없다.
// 그래서 값은 그대로 두고 **화면에서 계산**한다 — 시드든 사용자 매물이든 시간이 지나도 썩지 않는다.

// "2026-09-01" / "2026.9.1" / "2026/9/1" → Date(그날 23:59:59). 파싱 불가하면 null.
// 그날 하루는 아직 "앞으로의 날짜"로 본다 — 9월 1일 입주 매물은 9월 1일까지 그 날짜를 보여준다.
function parseDate(value: string): Date | null {
  const m = value.match(/^(\d{4})[.\-/](\d{1,2})[.\-/](\d{1,2})$/);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]), 23, 59, 59);
  return Number.isNaN(d.getTime()) ? null : d;
}

/**
 * 화면에 표시할 입주 가능일 문구.
 * @param availableFrom 데이터에 적힌 값 (날짜 또는 자유 문구)
 * @param status        현재 거래 상태. 없으면 "가능"으로 본다(데이터 기본값과 동일).
 *
 * - 자유 문구("즉시 입주 가능", "협의")나 아직 오지 않은 날짜는 그대로 보여준다(유용한 정보다).
 * - 지난 날짜인데 상태가 "가능"이면 "즉시 입주 가능"으로 보여준다 — 이미 비어 있다는 뜻이고,
 *   지난 날짜를 그대로 보여주는 것보다 정확하다.
 * - "예약중"·"완료"는 "즉시 입주 가능"이 상태 배지와 어긋나므로 원문 날짜를 그대로 둔다
 *   ("7월 1일부터 입주 가능했고 지금은 예약됨"은 모순이 아니라 사실이다).
 */
export function availableFromText(availableFrom: string | undefined, status?: string): string {
  const s = (availableFrom || "").trim();
  if (!s) return "";
  const d = parseDate(s);
  if (!d) return s;
  if (Date.now() <= d.getTime()) return s;
  return !status || status === "가능" ? "즉시 입주 가능" : s;
}
