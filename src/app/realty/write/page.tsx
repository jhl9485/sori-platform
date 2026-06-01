"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { RealtyDeal, RealtyType, RealtyRegion, RealtyStatus } from "@/data/realtyItems";
import ImageUploader from "@/components/shared/ImageUploader";

const DRAFT_KEY = "sori_realty_draft";
const SAVED_KEY = "sori_user_realty";

const DEALS: { id: RealtyDeal; label: string; sub: string }[] = [
  { id: "매매",      label: "매매",     sub: "Sale" },
  { id: "룸렌트",   label: "룸렌트",   sub: "Room rent" },
  { id: "렌트",     label: "렌트",     sub: "Whole rent" },
  { id: "룸메이트", label: "룸메이트", sub: "Roommate" },
];

const TYPES: { id: RealtyType; label: string; icon: string }[] = [
  { id: "콘도",        label: "콘도",    icon: "🏙️" },
  { id: "HDB",         label: "HDB",     icon: "🏢" },
  { id: "서비스아파트", label: "서비스",   icon: "🏨" },
  { id: "하우스",      label: "하우스",   icon: "🏡" },
  { id: "사무실",      label: "사무실",   icon: "🏢" },
];

const REGIONS: RealtyRegion[] = ["동부", "서부", "남부", "북부", "중부"];

// 거래 상태는 등록 시 항상 "가능"으로 시작 — 작성자가 상세 페이지에서 변경
const DEFAULT_REALTY_STATUS: RealtyStatus = "가능";

// 동/네 추천 (선택은 지역 → 동네 순)
const AREAS = [
  "Tanjong Pagar", "Buona Vista", "Orchard", "River Valley",
  "Clementi", "Bishan", "Marine Parade", "East Coast",
  "Woodlands", "Jurong East", "Bedok", "Marina Bay",
];

const FURNISHINGS = ["풀퍼니시", "세미퍼니시", "언퍼니시"] as const;
type Furnishing = (typeof FURNISHINGS)[number];

const AMENITY_OPTIONS = [
  "수영장", "헬스장", "BBQ Pit", "24시간 경비", "지하주차장",
  "키즈풀", "테니스장", "스터디룸", "스카이가든", "발레파킹",
  "공유 사무공간", "키즈룸",
];

export default function RealtyWritePage() {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const [restored, setRestored] = useState(false);

  // 폼 상태
  const [photos, setPhotos] = useState<string[]>([]);
  const [deal, setDeal] = useState<RealtyDeal | "">("");
  const [type, setType] = useState<RealtyType | "">("");
  const [region, setRegion] = useState<RealtyRegion | "">("");
  const [title, setTitle] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [mrt, setMrt] = useState("");
  const [bedrooms, setBedrooms] = useState<number>(1);
  const [bathrooms, setBathrooms] = useState<number>(1);
  const [sizeSqft, setSizeSqft] = useState("");
  const [floor, setFloor] = useState("");
  const [furnished, setFurnished] = useState<Furnishing>("풀퍼니시");
  const [price, setPrice] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [diplomaticClause, setDiplomaticClause] = useState(false);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [description, setDescription] = useState("");

  // 임시저장 복원
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        if (d.title || d.address || d.description || (d.photos && d.photos.length > 0)) {
          setPhotos(d.photos || []);
          setDeal(d.deal || "");
          setType(d.type || "");
          setRegion(d.region || "");
          setTitle(d.title || "");
          setArea(d.area || "");
          setAddress(d.address || "");
          setMrt(d.mrt || "");
          setBedrooms(d.bedrooms ?? 1);
          setBathrooms(d.bathrooms ?? 1);
          setSizeSqft(d.sizeSqft || "");
          setFloor(d.floor || "");
          setFurnished(d.furnished || "풀퍼니시");
          setPrice(d.price || "");
          setAvailableFrom(d.availableFrom || "");
          setDiplomaticClause(!!d.diplomaticClause);
          setAmenities(d.amenities || []);
          setDescription(d.description || "");
          setRestored(true);
        }
      }
    } catch {}
    setHydrated(true);
  }, []);

  // 자동 임시저장
  useEffect(() => {
    if (!hydrated) return;
    if (!title && !address && !description) {
      localStorage.removeItem(DRAFT_KEY);
      return;
    }
    try {
      localStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({
          photos, deal, type, region, title, area, address, mrt, bedrooms, bathrooms,
          sizeSqft, floor, furnished, price, availableFrom,
          diplomaticClause, amenities, description,
        })
      );
    } catch {
      // 용량 초과 시 사진 제외하고 저장
      try {
        localStorage.setItem(
          DRAFT_KEY,
          JSON.stringify({
            deal, type, region, title, area, address, mrt, bedrooms, bathrooms,
            sizeSqft, floor, furnished, price, availableFrom,
            diplomaticClause, amenities, description,
          })
        );
      } catch {}
    }
  }, [
    hydrated, photos, deal, type, region, title, area, address, mrt, bedrooms, bathrooms,
    sizeSqft, floor, furnished, price, availableFrom,
    diplomaticClause, amenities, description,
  ]);

  const canSubmit =
    deal && type && region && title.trim() && area && price.trim() && description.trim();

  const toggleAmenity = (a: string) => {
    setAmenities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );
  };

  const submit = () => {
    if (!canSubmit) return;
    try {
      const raw = localStorage.getItem(SAVED_KEY);
      const arr = raw ? (JSON.parse(raw) as unknown[]) : [];
      arr.unshift({
        id: `user-realty-${Date.now()}`,
        photos,
        deal, type, region, status: DEFAULT_REALTY_STATUS,
        title: title.trim(), area, address: address.trim(),
        mrt: mrt.trim(), bedrooms, bathrooms, sizeSqft: sizeSqft.trim(),
        floor: floor.trim(), furnished, price: price.trim(),
        availableFrom, diplomaticClause, amenities,
        description: description.trim(),
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem(SAVED_KEY, JSON.stringify(arr));
      localStorage.removeItem(DRAFT_KEY);
    } catch {}
    router.push("/realty");
  };

  const discardDraft = () => {
    setPhotos([]);
    setDeal(""); setType(""); setRegion("");
    setTitle(""); setArea(""); setAddress("");
    setMrt(""); setBedrooms(1); setBathrooms(1); setSizeSqft(""); setFloor("");
    setFurnished("풀퍼니시"); setPrice(""); setAvailableFrom("");
    setDiplomaticClause(false); setAmenities([]); setDescription("");
    setRestored(false);
    localStorage.removeItem(DRAFT_KEY);
  };

  return (
    <div className="max-w-[480px] mx-auto min-h-screen bg-white shadow-[0_0_60px_rgba(0,0,0,0.12)]">
      {/* 헤더 */}
      <div className="sticky top-0 z-50 bg-white border-b border-black/[0.08] px-4 h-[56px] flex items-center justify-between">
        <button onClick={() => router.back()} className="text-[0.9rem] text-[#888070]" aria-label="닫기">✕</button>
        <span className="text-[0.9rem] font-bold">부동산 매물 등록</span>
        <button
          onClick={submit}
          disabled={!canSubmit}
          className={`text-[0.85rem] font-bold px-3 py-1 rounded-full transition-colors ${
            canSubmit ? "bg-[#D04020] text-white" : "bg-[#F0EDE8] text-[#888070]"
          }`}
        >
          등록
        </button>
      </div>

      {/* 임시저장 복원 알림 */}
      {restored && (
        <div className="mx-4 mt-3 bg-[#EBF0FB] border border-[#2050A0]/20 rounded-[10px] px-3 py-2 flex items-center gap-2">
          <span className="text-sm">📝</span>
          <span className="text-[0.75rem] text-[#2050A0] flex-1">작성 중이던 매물을 복원했어요</span>
          <button onClick={discardDraft} className="text-[0.72rem] text-[#888070] hover:text-[#D04020]">
            지우기
          </button>
        </div>
      )}

      <div className="px-4 py-4 pb-32 space-y-6">
        {/* 1. 매물 제목 (최상단) */}
        <section>
          <SectionTitle index="1" title="매물 제목" required />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="예: Tanjong Pagar 신축 2BR — Diplomatic Clause 포함"
            maxLength={60}
            className="w-full bg-[#F5F3EE] rounded-[10px] px-4 py-3 text-[0.88rem] outline-none placeholder:text-[#C0BBB0]"
          />
          <div className="text-right text-[0.68rem] text-[#C0BBB0] mt-1">{title.length}/60</div>
        </section>

        {/* 2. 사진 */}
        <section>
          <SectionTitle index="2" title="사진" />
          <ImageUploader images={photos} onChange={setPhotos} max={5} />
        </section>

        {/* 3. 거래 유형 (4종: 매매·룸렌트·렌트·룸메이트) */}
        <section>
          <SectionTitle index="3" title="거래 유형" required />
          <div className="grid grid-cols-4 gap-2">
            {DEALS.map((d) => (
              <button
                key={d.id}
                onClick={() => setDeal(d.id)}
                className={`flex flex-col items-center gap-1 py-3 rounded-[10px] border-2 transition-all ${
                  deal === d.id
                    ? "border-[#D04020] bg-[#FBF0EC]"
                    : "border-black/[0.08] bg-white hover:border-black/[0.15]"
                }`}
              >
                <span className={`text-[0.82rem] font-bold ${deal === d.id ? "text-[#D04020]" : "text-[#181614]"}`}>
                  {d.label}
                </span>
                <span className="text-[0.6rem] text-[#888070]">{d.sub}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 4. 주거 타입 (5종: 콘도·HDB·서비스·하우스·사무실) */}
        <section>
          <SectionTitle index="4" title="주거 타입" required />
          <div className="grid grid-cols-5 gap-2">
            {TYPES.map((t) => (
              <button
                key={t.id}
                onClick={() => setType(t.id)}
                className={`flex flex-col items-center gap-1 py-3 rounded-[10px] border-2 transition-all ${
                  type === t.id
                    ? "border-[#D04020] bg-[#FBF0EC]"
                    : "border-black/[0.08] bg-white hover:border-black/[0.15]"
                }`}
              >
                <span className="text-lg leading-none">{t.icon}</span>
                <span className={`text-[0.65rem] font-medium ${type === t.id ? "text-[#D04020]" : "text-[#181614]"}`}>
                  {t.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* 5. 위치 */}
        <section>
          <SectionTitle index="5" title="위치" required />
          <div className="space-y-2">
            {/* 지역구분 (동서남북중) */}
            <div className="text-[0.72rem] text-[#888070] mb-1">📍 지역구분 (필수)</div>
            <div className="flex flex-wrap gap-[5px] mb-3">
              {REGIONS.map((r) => (
                <button
                  key={r}
                  onClick={() => setRegion(r)}
                  className={`text-[0.78rem] font-medium rounded-full px-[14px] py-[5px] border transition-colors ${
                    region === r
                      ? "bg-[#D04020] text-white border-[#D04020]"
                      : "bg-white text-[#888070] border-black/[0.08] hover:border-black/[0.15]"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <div className="text-[0.72rem] text-[#888070] mb-1">한인 밀집 지역 추천</div>
            <div className="flex flex-wrap gap-[5px] mb-3">
              {AREAS.map((a) => (
                <button
                  key={a}
                  onClick={() => setArea(a)}
                  className={`text-[0.72rem] rounded-full px-3 py-[5px] border transition-colors ${
                    area === a
                      ? "bg-[#181614] text-white border-[#181614]"
                      : "bg-white text-[#888070] border-black/[0.08] hover:border-black/[0.15]"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="상세 주소 (선택 · 단지명·도로명 정도만)"
              className="w-full bg-[#F5F3EE] rounded-[10px] px-4 py-3 text-[0.85rem] outline-none placeholder:text-[#C0BBB0]"
            />
            <input
              type="text"
              value={mrt}
              onChange={(e) => setMrt(e.target.value)}
              placeholder="🚇 가까운 MRT (선택 · 예: Tanjong Pagar EW15, 도보 3분)"
              className="w-full bg-[#F5F3EE] rounded-[10px] px-4 py-3 text-[0.85rem] outline-none placeholder:text-[#C0BBB0]"
            />
            <p className="text-[0.68rem] text-[#888070] mt-1">
              💡 정확한 주소는 비공개로 두셔도 됩니다. 지역만 선택하셔도 OK.
            </p>
          </div>
        </section>

        {/* 6. 기본 스펙 */}
        <section>
          <SectionTitle index="6" title="기본 스펙" />
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[0.7rem] text-[#888070] mb-1 block">🛏 침실</label>
              <NumberStepper value={bedrooms} onChange={setBedrooms} min={0} max={10} />
            </div>
            <div>
              <label className="text-[0.7rem] text-[#888070] mb-1 block">🚽 욕실</label>
              <NumberStepper value={bathrooms} onChange={setBathrooms} min={1} max={8} />
            </div>
            <div>
              <label className="text-[0.7rem] text-[#888070] mb-1 block">📐 면적 (선택)</label>
              <input
                type="text"
                value={sizeSqft}
                onChange={(e) => setSizeSqft(e.target.value)}
                placeholder="예: 969 sqft"
                className="w-full bg-[#F5F3EE] rounded-[10px] px-3 py-[10px] text-[0.85rem] outline-none placeholder:text-[#C0BBB0]"
              />
            </div>
            <div>
              <label className="text-[0.7rem] text-[#888070] mb-1 block">🏢 층수 (선택)</label>
              <input
                type="text"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                placeholder="예: 중층"
                className="w-full bg-[#F5F3EE] rounded-[10px] px-3 py-[10px] text-[0.85rem] outline-none placeholder:text-[#C0BBB0]"
              />
            </div>
          </div>
        </section>

        {/* 7. 가구 옵션 */}
        <section>
          <SectionTitle index="7" title="가구 옵션" />
          <div className="grid grid-cols-3 gap-2">
            {FURNISHINGS.map((f) => (
              <button
                key={f}
                onClick={() => setFurnished(f)}
                className={`py-2 rounded-[10px] text-[0.78rem] font-medium border-2 transition-all ${
                  furnished === f
                    ? "border-[#D04020] bg-[#FBF0EC] text-[#D04020]"
                    : "border-black/[0.08] bg-white text-[#888070]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </section>

        {/* 8. 가격 */}
        <section>
          <SectionTitle index="8" title="가격" required />
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[0.88rem] font-bold text-[#D04020] pointer-events-none">$</span>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder={deal === "매매" ? "예: 1,850,000" : "예: 4,700"}
              className="w-full bg-[#F5F3EE] rounded-[10px] pl-7 pr-16 py-3 text-[0.95rem] font-bold outline-none placeholder:text-[#C0BBB0] placeholder:font-normal"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[0.78rem] text-[#888070] pointer-events-none">
              {deal === "매매" ? "총액" : "/월"}
            </span>
          </div>
        </section>

        {/* 9. 입주 가능일 + Diplomatic Clause */}
        <section>
          <SectionTitle index="9" title="입주 / 계약 조건" />
          <input
            type="text"
            value={availableFrom}
            onChange={(e) => setAvailableFrom(e.target.value)}
            placeholder="📅 입주 가능일 (예: 2026-06-15 또는 즉시 입주)"
            className="w-full bg-[#F5F3EE] rounded-[10px] px-4 py-3 text-[0.85rem] outline-none placeholder:text-[#C0BBB0] mb-2"
          />
          {(deal === "렌트" || deal === "룸렌트" || deal === "룸메이트") && (
            <button
              onClick={() => setDiplomaticClause(!diplomaticClause)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-[10px] border-2 transition-all ${
                diplomaticClause
                  ? "border-[#2050A0] bg-[#EBF0FB]"
                  : "border-black/[0.08] bg-white"
              }`}
            >
              <span className="text-[0.82rem] font-medium text-left flex-1">
                Diplomatic Clause
                <span className="block text-[0.68rem] text-[#888070] font-normal">
                  EP 상태 변동 시 조기 해지 가능 조항
                </span>
              </span>
              <span className={`inline-block w-10 h-6 rounded-full flex-shrink-0 transition-colors relative ${
                diplomaticClause ? "bg-[#2050A0]" : "bg-[#C0BBB0]"
              }`}>
                <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  diplomaticClause ? "translate-x-4" : "translate-x-0"
                }`} />
              </span>
            </button>
          )}
        </section>

        {/* 10. 단지 편의시설 */}
        <section>
          <SectionTitle index="10" title="단지 편의시설" />
          <div className="flex flex-wrap gap-2">
            {AMENITY_OPTIONS.map((a) => {
              const selected = amenities.includes(a);
              return (
                <button
                  key={a}
                  onClick={() => toggleAmenity(a)}
                  className={`text-[0.75rem] rounded-full px-3 py-[6px] border transition-colors ${
                    selected
                      ? "bg-[#2B7A50] text-white border-[#2B7A50]"
                      : "bg-white text-[#888070] border-black/[0.08] hover:border-black/[0.15]"
                  }`}
                >
                  {selected && "✓ "}{a}
                </button>
              );
            })}
          </div>
        </section>

        {/* 11. 매물 설명 */}
        <section>
          <SectionTitle index="11" title="매물 설명" required />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={8}
            placeholder={`매물 강점, 주변 환경, 협상 가능 여부 등 자유롭게 작성해주세요.\n\n예시:\n- 신축 5년차, 깨끗한 상태\n- 한국학교 셔틀 정류장 단지 앞\n- 2년 계약 우대\n- 가구·가전 일체 포함`}
            className="w-full bg-[#F5F3EE] rounded-[10px] px-4 py-3 text-[0.85rem] leading-relaxed outline-none placeholder:text-[#C0BBB0] resize-none"
          />
          <div className="text-right text-[0.68rem] text-[#C0BBB0] mt-1">
            {description.length} / 2000
          </div>
        </section>

        {/* 안내 */}
        <div className="bg-[#FBF5E8] border border-[#E8D090] rounded-[10px] p-3 flex items-start gap-2">
          <span className="text-sm">💡</span>
          <p className="text-[0.72rem] text-[#B07010] leading-relaxed">
            허위 매물·과장 광고 등록 시 사전 고지 없이 삭제될 수 있습니다.
            연락처는 등록 후 매물 상세 페이지에서 별도 인증 절차를 거쳐 노출됩니다.
          </p>
        </div>

        {hydrated && (title || description) && (
          <div className="text-center text-[0.7rem] text-[#C0BBB0]">💾 자동 저장 중</div>
        )}
      </div>
    </div>
  );
}

// ── 보조 컴포넌트 ──
function SectionTitle({ index, title, required }: { index: string; title: string; required?: boolean }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <span
        className="w-5 h-5 rounded-full bg-[#181614] text-white text-[0.62rem] font-bold flex items-center justify-center"
        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
      >
        {index}
      </span>
      <span className="text-[0.88rem] font-bold">{title}</span>
      {required && <span className="text-[#D04020] text-[0.78rem]">*</span>}
    </div>
  );
}

function NumberStepper({ value, onChange, min, max }: { value: number; onChange: (v: number) => void; min: number; max: number }) {
  return (
    <div className="flex items-center bg-[#F5F3EE] rounded-[10px]">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-10 h-10 flex items-center justify-center text-[#888070] disabled:opacity-30 hover:text-[#D04020]"
        aria-label="감소"
      >
        −
      </button>
      <span className="flex-1 text-center text-[0.95rem] font-bold">{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-10 h-10 flex items-center justify-center text-[#888070] disabled:opacity-30 hover:text-[#D04020]"
        aria-label="증가"
      >
        +
      </button>
    </div>
  );
}
