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
