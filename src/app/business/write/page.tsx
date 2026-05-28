"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/shared/ImageUploader";
import type { BizCategory } from "@/data/businesses";

const DRAFT_KEY = "sori_biz_draft";
const SAVED_KEY = "sori_user_biz";

const CATEGORIES: { id: BizCategory; icon: string }[] = [
  { id: "한식",   icon: "🍱" },
  { id: "뷰티",   icon: "💅" },
  { id: "마트",   icon: "🛒" },
  { id: "병원",   icon: "🏥" },
  { id: "학원",   icon: "📚" },
  { id: "부동산", icon: "🏠" },
  { id: "법무",   icon: "⚖️" },
  { id: "이사",   icon: "📦" },
  { id: "카페",   icon: "☕" },
  { id: "주점",   icon: "🍻" },
];

const AREAS = [
  "Tanjong Pagar", "Orchard", "Buona Vista", "Raffles Place",
  "Marina Bay", "Bugis", "Clementi", "Bishan",
  "Woodlands", "Jurong East", "Bedok", "기타",
];

const PRICE_RANGES = [
  { id: "$", label: "$", sub: "$10 이하/인" },
  { id: "$$", label: "$$", sub: "$10~30/인" },
  { id: "$$$", label: "$$$", sub: "$30~80/인" },
  { id: "$$$$", label: "$$$$", sub: "$80+/인" },
];

export default function BusinessWritePage() {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const [restored, setRestored] = useState(false);

  const [photos, setPhotos] = useState<string[]>([]);
  const [category, setCategory] = useState<BizCategory | "">("");
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [openHours, setOpenHours] = useState("");
  const [priceRange, setPriceRange] = useState("$$");
  const [tagsInput, setTagsInput] = useState("");
  const [description, setDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [koreanAvailable, setKoreanAvailable] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        if (d.name || d.description || (d.photos && d.photos.length > 0)) {
          setPhotos(d.photos || []);
          setCategory(d.category || "");
          setName(d.name || "");
          setArea(d.area || "");
          setAddress(d.address || "");
          setPhone(d.phone || "");
          setOpenHours(d.openHours || "");
          setPriceRange(d.priceRange || "$$");
          setTagsInput(d.tagsInput || "");
          setDescription(d.description || "");
          setFullDescription(d.fullDescription || "");
          setKoreanAvailable(d.koreanAvailable ?? true);
          setRestored(true);
        }
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (!name && !description && photos.length === 0) {
      localStorage.removeItem(DRAFT_KEY);
      return;
    }
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({
        photos, category, name, area, address, phone, openHours,
        priceRange, tagsInput, description, fullDescription, koreanAvailable,
      }));
    } catch {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify({
          category, name, area, address, phone, openHours,
          priceRange, tagsInput, description, fullDescription, koreanAvailable,
        }));
      } catch {}
    }
  }, [hydrated, photos, category, name, area, address, phone, openHours, priceRange, tagsInput, description, fullDescription, koreanAvailable]);

  const parseTags = (s: string) => s.split(/[,\s#]+/).map(t => t.trim()).filter(Boolean).slice(0, 6);
  const tags = parseTags(tagsInput);

  const canSubmit = category && name.trim() && area && description.trim();

  const submit = () => {
    if (!canSubmit) return;
    try {
      const raw = localStorage.getItem(SAVED_KEY);
      const arr = raw ? (JSON.parse(raw) as unknown[]) : [];
      arr.unshift({
        id: `user-biz-${Date.now()}`,
        photos,
        category, name: name.trim(),
        area, address: address.trim(),
        phone: phone.trim(),
        openHours: openHours.trim(),
        priceRange,
        tags,
        description: description.trim(),
        fullDescription: fullDescription.trim() || description.trim(),
        koreanAvailable,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem(SAVED_KEY, JSON.stringify(arr));
      localStorage.removeItem(DRAFT_KEY);
    } catch {}
    router.push("/business");
  };

  const discardDraft = () => {
    setPhotos([]); setCategory(""); setName(""); setArea("");
    setAddress(""); setPhone(""); setOpenHours("");
    setPriceRange("$$"); setTagsInput(""); setDescription("");
    setFullDescription(""); setKoreanAvailable(true);
    setRestored(false);
    localStorage.removeItem(DRAFT_KEY);
  };

  return (
    <div className="max-w-[480px] mx-auto min-h-screen bg-white shadow-[0_0_60px_rgba(0,0,0,0.12)]">
      {/* 헤더 */}
      <div className="sticky top-0 z-50 bg-white border-b border-black/[0.08] px-4 h-[56px] flex items-center justify-between">
        <button onClick={() => router.back()} className="text-[0.9rem] text-[#888070]" aria-label="닫기">✕</button>
        <span className="text-[0.9rem] font-bold">한인 업소 등록</span>
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

      {restored && (
        <div className="mx-4 mt-3 bg-[#EBF0FB] border border-[#2050A0]/20 rounded-[10px] px-3 py-2 flex items-center gap-2">
          <span className="text-sm leading-none">📝</span>
          <span className="text-[0.75rem] text-[#2050A0] flex-1">작성 중이던 정보를 복원했어요</span>
          <button onClick={discardDraft} className="text-[0.72rem] text-[#888070] hover:text-[#D04020]">지우기</button>
        </div>
      )}

      <div className="px-4 py-4 pb-32 space-y-6">
        {/* 1. 사진 */}
        <section>
          <SectionTitle index="1" title="사진" />
          <ImageUploader images={photos} onChange={setPhotos} max={5} />
        </section>

        {/* 2. 카테고리 */}
        <section>
          <SectionTitle index="2" title="업종" required />
          <div className="grid grid-cols-5 gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`flex flex-col items-center gap-1 py-3 rounded-[10px] border-2 transition-all ${
                  category === c.id
                    ? "border-[#D04020] bg-[#FBF0EC]"
                    : "border-black/[0.08] bg-white hover:border-black/[0.15]"
                }`}
              >
                <span className="text-lg leading-none">{c.icon}</span>
                <span className={`text-[0.68rem] font-medium ${category === c.id ? "text-[#D04020]" : "text-[#181614]"}`}>
                  {c.id}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* 3. 업소명 */}
        <section>
          <SectionTitle index="3" title="업소명" required />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="예: 강남부식, 서울뷰티"
            maxLength={30}
            className="w-full bg-[#F5F3EE] rounded-[10px] px-4 py-3 text-[0.88rem] outline-none placeholder:text-[#C0BBB0]"
          />
        </section>

        {/* 4. 위치 */}
        <section>
          <SectionTitle index="4" title="위치" required />
          <div className="flex flex-wrap gap-[5px] mb-2">
            {AREAS.map((a) => (
              <button
                key={a}
                onClick={() => setArea(a)}
                className={`text-[0.72rem] rounded-full px-3 py-[5px] border transition-colors ${
                  area === a ? "bg-[#181614] text-white border-[#181614]" : "bg-white text-[#888070] border-black/[0.08] hover:border-black/[0.15]"
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
            placeholder="상세 주소 (선택)"
            className="w-full bg-[#F5F3EE] rounded-[10px] px-4 py-3 text-[0.85rem] outline-none placeholder:text-[#C0BBB0]"
          />
        </section>

        {/* 5. 연락처·영업시간 */}
        <section>
          <SectionTitle index="5" title="연락처 / 영업시간" />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="📞 전화번호 (예: +65 6222 1234)"
            className="w-full bg-[#F5F3EE] rounded-[10px] px-4 py-3 text-[0.85rem] outline-none placeholder:text-[#C0BBB0] mb-2"
          />
          <input
            type="text"
            value={openHours}
            onChange={(e) => setOpenHours(e.target.value)}
            placeholder="🕐 영업시간 (예: 11:00 - 22:00)"
            className="w-full bg-[#F5F3EE] rounded-[10px] px-4 py-3 text-[0.85rem] outline-none placeholder:text-[#C0BBB0]"
          />
        </section>

        {/* 6. 가격대 */}
        <section>
          <SectionTitle index="6" title="가격대" />
          <div className="grid grid-cols-4 gap-2">
            {PRICE_RANGES.map((p) => (
              <button
                key={p.id}
                onClick={() => setPriceRange(p.id)}
                className={`flex flex-col items-center py-2 rounded-[10px] border-2 transition-all ${
                  priceRange === p.id ? "border-[#D04020] bg-[#FBF0EC]" : "border-black/[0.08] bg-white"
                }`}
              >
                <span className={`text-[0.95rem] font-bold ${priceRange === p.id ? "text-[#D04020]" : "text-[#181614]"}`}>
                  {p.label}
                </span>
                <span className="text-[0.62rem] text-[#888070] mt-[2px]">{p.sub}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 7. 한국어 가능 */}
        <section>
          <button
            onClick={() => setKoreanAvailable(!koreanAvailable)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-[10px] border-2 transition-all ${
              koreanAvailable ? "border-[#D04020] bg-[#FBF0EC]" : "border-black/[0.08] bg-white"
            }`}
          >
            <span className="text-[0.85rem] font-medium text-left flex-1">
              🇰🇷 한국어 상담 가능
              <span className="block text-[0.68rem] text-[#888070] font-normal">한인 사용자에게 노출 우선순위 상승</span>
            </span>
            <span className={`inline-block w-10 h-6 rounded-full flex-shrink-0 transition-colors relative ${
              koreanAvailable ? "bg-[#D04020]" : "bg-[#C0BBB0]"
            }`}>
              <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                koreanAvailable ? "translate-x-4" : "translate-x-0"
              }`} />
            </span>
          </button>
        </section>

        {/* 8. 태그 */}
        <section>
          <SectionTitle index="8" title="태그 (선택)" />
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="예: 갈비탕, 한정식, 포장가능"
            className="w-full bg-[#F5F3EE] rounded-[10px] px-3 py-[10px] text-[0.85rem] outline-none placeholder:text-[#C0BBB0]"
          />
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-[5px] mt-2">
              {tags.map((t) => (
                <span key={t} className="text-[0.68rem] bg-[#FBF0EC] text-[#D04020] rounded-full px-2 py-[2px]">#{t}</span>
              ))}
            </div>
          )}
        </section>

        {/* 9. 한줄 소개 */}
        <section>
          <SectionTitle index="9" title="한 줄 소개" required />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, 80))}
            placeholder="예: 25년 전통 한식 맛집. 서울에서 직접 공수한 재료만 사용."
            className="w-full bg-[#F5F3EE] rounded-[10px] px-3 py-[10px] text-[0.85rem] outline-none placeholder:text-[#C0BBB0]"
          />
          <div className="text-right text-[0.68rem] text-[#C0BBB0] mt-1">{description.length}/80</div>
        </section>

        {/* 10. 상세 설명 */}
        <section>
          <SectionTitle index="10" title="상세 설명 (선택)" />
          <textarea
            value={fullDescription}
            onChange={(e) => setFullDescription(e.target.value)}
            rows={6}
            placeholder="추천 메뉴, 인기 시술, 영업 정책 등 자유롭게 작성"
            className="w-full bg-[#F5F3EE] rounded-[10px] px-3 py-[10px] text-[0.85rem] outline-none placeholder:text-[#C0BBB0] resize-none"
          />
        </section>

        <div className="bg-[#FBF5E8] border border-[#E8D090] rounded-[10px] p-3 flex items-start gap-2">
          <span className="text-sm leading-none">💡</span>
          <p className="text-[0.72rem] text-[#B07010] leading-relaxed">
            허위 정보 · 광고성 도배는 사전 고지 없이 삭제될 수 있어요. 실제 사업자만 등록해주세요. 한국어 상담 가능 표시는 검증 후 부여됩니다.
          </p>
        </div>

        {hydrated && (name || description) && (
          <div className="text-center text-[0.7rem] text-[#C0BBB0]">💾 자동 저장 중</div>
        )}
      </div>
    </div>
  );
}

function SectionTitle({ index, title, required }: { index: string; title: string; required?: boolean }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <span
        className="w-5 h-5 rounded-full bg-[#181614] text-white text-[0.62rem] font-bold flex items-center justify-center leading-none"
        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
      >
        {index}
      </span>
      <span className="text-[0.88rem] font-bold">{title}</span>
      {required && <span className="text-[#D04020] text-[0.78rem]">*</span>}
    </div>
  );
}
