"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ImageUploader from "@/components/shared/ImageUploader";
import { updateUserItem } from "@/lib/userContent";
import type { FleaStatus } from "@/data/fleaItems";

const DRAFT_KEY = "sori_flea_draft";
const SAVED_KEY = "sori_user_flea";

interface RawFlea {
  id: string;
  category: string;
  title: string;
  price: string;
  originalPrice: string | null;
  negotiable: boolean;
  condition: string;
  area: string;
  canMeet: boolean;
  canDeliver: boolean;
  description: string;
  status: FleaStatus;
  photos: string[];
  createdAt: string;
}

// 거래 상태는 등록 시 항상 "판매중"으로 시작 — 작성자가 상세 페이지에서 변경
const DEFAULT_FLEA_STATUS: FleaStatus = "판매중";

const CATEGORIES = [
  { id: "가전/가구", icon: "🛋️" },
  { id: "의류/잡화", icon: "👕" },
  { id: "식품",     icon: "🍎" },
  { id: "도서",     icon: "📚" },
  { id: "유아용품",  icon: "🍼" },
  { id: "디지털",    icon: "💻" },
  { id: "기타",     icon: "📦" },
];

const CONDITIONS = ["새상품", "최상", "상태좋음", "좋음", "보통"] as const;
type Condition = (typeof CONDITIONS)[number];

const AREAS = [
  "Tanjong Pagar", "Buona Vista", "Orchard", "River Valley",
  "Clementi", "Bishan", "Marine Parade", "East Coast",
  "Woodlands", "Jurong East", "Bedok", "Marina Bay",
];

function FleaWriteInner() {
  const router = useRouter();
  const sp = useSearchParams();
  const editId = sp.get("edit") || "";
  const isEditMode = !!editId;

  const [hydrated, setHydrated] = useState(false);
  const [restored, setRestored] = useState(false);

  const [photos, setPhotos] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [negotiable, setNegotiable] = useState(true);
  const [condition, setCondition] = useState<Condition>("상태좋음");
  const [area, setArea] = useState("");
  const [canMeet, setCanMeet] = useState(true);
  const [canDeliver, setCanDeliver] = useState(false);
  const [description, setDescription] = useState("");

  // 임시저장 복원 또는 수정 모드 로드
  useEffect(() => {
    try {
      if (isEditMode) {
        const raw = localStorage.getItem(SAVED_KEY);
        if (raw) {
          const arr = JSON.parse(raw) as RawFlea[];
          const target = arr.find((x) => x.id === editId);
          if (target) {
            setPhotos(target.photos || []);
            setCategory(target.category || "");
            setTitle(target.title || "");
            setPrice(target.price || "");
            setOriginalPrice(target.originalPrice || "");
            setNegotiable(target.negotiable ?? true);
            setCondition((target.condition as Condition) || "상태좋음");
            setArea(target.area || "");
            setCanMeet(target.canMeet ?? true);
            setCanDeliver(target.canDeliver ?? false);
            setDescription(target.description || "");
          }
        }
        setHydrated(true);
        return;
      }

      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        if (d.title || d.description || (d.photos && d.photos.length > 0)) {
          setPhotos(d.photos || []);
          setCategory(d.category || "");
          setTitle(d.title || "");
          setPrice(d.price || "");
          setOriginalPrice(d.originalPrice || "");
          setNegotiable(d.negotiable ?? true);
          setCondition(d.condition || "상태좋음");
          setArea(d.area || "");
          setCanMeet(d.canMeet ?? true);
          setCanDeliver(d.canDeliver ?? false);
          setDescription(d.description || "");
          setRestored(true);
        }
      }
    } catch {}
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hydrated || isEditMode) return;
    if (!title && !description) {
      localStorage.removeItem(DRAFT_KEY);
      return;
    }
    try {
      localStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({
          photos, category, title, price, originalPrice, negotiable, condition,
          area, canMeet, canDeliver, description,
        })
      );
    } catch {
      // localStorage 용량 초과 시 사진 빼고 저장
      try {
        localStorage.setItem(
          DRAFT_KEY,
          JSON.stringify({
            category, title, price, originalPrice, negotiable, condition,
            area, canMeet, canDeliver, description,
          })
        );
      } catch {}
    }
  }, [hydrated, isEditMode, photos, category, title, price, originalPrice, negotiable, condition, area, canMeet, canDeliver, description]);

  const canSubmit = category && title.trim() && price.trim() && description.trim();

  const submit = () => {
    if (!canSubmit) return;

    if (isEditMode) {
      const patch = {
        category, title: title.trim(),
        price: price.trim(), originalPrice: originalPrice.trim() || null,
        negotiable, condition, area,
        canMeet, canDeliver,
        description: description.trim(),
      };
      // 사진 포함 시도, 실패 시 사진 빼고 재시도
      let ok = updateUserItem<RawFlea>(SAVED_KEY, editId, { ...patch, photos });
      let savedWithoutPhotos = false;
      if (!ok) {
        ok = updateUserItem<RawFlea>(SAVED_KEY, editId, { ...patch, photos: [] });
        if (ok) savedWithoutPhotos = true;
      }
      if (!ok) {
        alert("수정 실패: 저장 공간이 부족하거나 글을 찾을 수 없어요.");
        return;
      }
      alert(savedWithoutPhotos
        ? "⚠️ 저장 공간 부족으로 사진 없이 수정됐어요."
        : "✅ 물건이 수정되었습니다!");
      router.push(`/flea/${editId}`);
      return;
    }

    const base = {
      id: `user-flea-${Date.now()}`,
      category, title: title.trim(),
      price: price.trim(), originalPrice: originalPrice.trim() || null,
      negotiable, condition, area,
      canMeet, canDeliver,
      description: description.trim(),
      status: DEFAULT_FLEA_STATUS,
      createdAt: new Date().toISOString(),
    };
    let savedWithoutPhotos = false;
    const tryStore = (photosToSave: string[]) => {
      const raw = localStorage.getItem(SAVED_KEY);
      const arr = raw ? (JSON.parse(raw) as unknown[]) : [];
      arr.unshift({ ...base, photos: photosToSave });
      localStorage.setItem(SAVED_KEY, JSON.stringify(arr));
    };
    try {
      tryStore(photos);
    } catch {
      // 용량 초과 — 사진 제외하고 재시도
      try {
        tryStore([]);
        savedWithoutPhotos = true;
      } catch (err2) {
        console.error("물건 저장 실패:", err2);
        alert("등록 실패: 저장 공간이 부족합니다.\n마이페이지에서 옛 물건을 삭제 후 다시 시도해주세요.");
        return;
      }
    }
    try { localStorage.removeItem(DRAFT_KEY); } catch {}
    alert(savedWithoutPhotos
      ? "⚠️ 저장 공간 부족으로 사진 없이 등록됐어요. 텍스트만 저장됐습니다."
      : "✅ 물건이 등록되었습니다!");
    router.push("/flea");
  };

  const discardDraft = () => {
    setPhotos([]);
    setCategory(""); setTitle(""); setPrice(""); setOriginalPrice("");
    setNegotiable(true); setCondition("상태좋음"); setArea("");
    setCanMeet(true); setCanDeliver(false); setDescription("");
    setRestored(false);
    localStorage.removeItem(DRAFT_KEY);
  };

  return (
    <div className="max-w-[480px] mx-auto min-h-screen bg-white shadow-[0_0_60px_rgba(0,0,0,0.12)]">
      {/* 헤더 */}
      <div className="sticky top-0 z-50 bg-white border-b border-black/[0.08] px-4 h-[56px] flex items-center justify-between">
        <button onClick={() => router.back()} className="text-[0.9rem] text-[#888070]" aria-label="닫기">✕</button>
        <span className="text-[0.9rem] font-bold">{isEditMode ? "물건 수정" : "중고 물건 등록"}</span>
        <button
          onClick={submit}
          disabled={!canSubmit}
          className={`text-[0.85rem] font-bold px-3 py-1 rounded-full transition-colors ${
            canSubmit ? "bg-[#D04020] text-white" : "bg-[#F0EDE8] text-[#888070]"
          }`}
        >
          {isEditMode ? "수정" : "등록"}
        </button>
      </div>

      {restored && (
        <div className="mx-4 mt-3 bg-[#EBF0FB] border border-[#2050A0]/20 rounded-[10px] px-3 py-2 flex items-center gap-2">
          <span className="text-sm">📝</span>
          <span className="text-[0.75rem] text-[#2050A0] flex-1">작성 중이던 글을 복원했어요</span>
          <button onClick={discardDraft} className="text-[0.72rem] text-[#888070] hover:text-[#D04020]">
            지우기
          </button>
        </div>
      )}

      <div className="px-4 py-4 space-y-6">
        {/* 1. 제목 (최상단) */}
        <section>
          <SectionTitle index="1" title="제목" required />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="예: 다이킨 에어컨 2년사용 (5 ticks)"
            maxLength={50}
            className="w-full bg-[#F5F3EE] rounded-[10px] px-4 py-3 text-[0.88rem] outline-none placeholder:text-[#C0BBB0]"
          />
          <div className="text-right text-[0.68rem] text-[#C0BBB0] mt-1">{title.length}/50</div>
        </section>

        {/* 2. 사진 */}
        <section>
          <SectionTitle index="2" title="사진" />
          <ImageUploader images={photos} onChange={setPhotos} max={5} />
        </section>

        {/* 3. 카테고리 */}
        <section>
          <SectionTitle index="3" title="카테고리" required />
          <div className="grid grid-cols-4 gap-2">
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
                <span className="text-lg">{c.icon}</span>
                <span className={`text-[0.68rem] font-medium ${category === c.id ? "text-[#D04020]" : "text-[#181614]"}`}>
                  {c.id}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* 4. 가격 */}
        <section>
          <SectionTitle index="4" title="가격" required />
          <div className="relative mb-2">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[0.88rem] font-bold text-[#D04020] pointer-events-none">$</span>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="판매 가격"
              className="w-full bg-[#F5F3EE] rounded-[10px] pl-7 pr-4 py-3 text-[0.95rem] font-bold outline-none placeholder:text-[#C0BBB0] placeholder:font-normal"
            />
          </div>
          <div className="relative mb-2">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[0.82rem] text-[#888070] pointer-events-none">$</span>
            <input
              type="text"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="정가 (선택 · 신상품 대비 할인율 표시용)"
              className="w-full bg-[#F5F3EE] rounded-[10px] pl-7 pr-4 py-3 text-[0.85rem] outline-none placeholder:text-[#C0BBB0]"
            />
          </div>
          <button
            onClick={() => setNegotiable(!negotiable)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-[10px] border-2 transition-all ${
              negotiable
                ? "border-[#2B7A50] bg-[#EBF5F0]"
                : "border-black/[0.08] bg-white"
            }`}
          >
            <span className="text-[0.82rem] font-medium">
              💬 가격 협상 가능
            </span>
            <span className={`inline-block flex-shrink-0 w-10 h-6 rounded-full transition-colors relative ${
              negotiable ? "bg-[#2B7A50]" : "bg-[#C0BBB0]"
            }`}>
              <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                negotiable ? "translate-x-4" : "translate-x-0"
              }`} />
            </span>
          </button>
        </section>

        {/* 5. 상품 상태 */}
        <section>
          <SectionTitle index="5" title="상품 상태" required />
          <div className="grid grid-cols-5 gap-1">
            {CONDITIONS.map((c) => (
              <button
                key={c}
                onClick={() => setCondition(c)}
                className={`py-2 rounded-[8px] text-[0.72rem] font-medium border-2 transition-all ${
                  condition === c
                    ? "border-[#D04020] bg-[#FBF0EC] text-[#D04020]"
                    : "border-black/[0.08] bg-white text-[#888070]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </section>

        {/* 6. 거래 지역 */}
        <section>
          <SectionTitle index="6" title="거래 희망 지역" />
          <div className="flex flex-wrap gap-[5px]">
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
        </section>

        {/* 7. 거래 방법 */}
        <section>
          <SectionTitle index="7" title="거래 방법" />
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setCanMeet(!canMeet)}
              className={`flex items-center justify-center gap-2 py-3 rounded-[10px] border-2 text-[0.82rem] font-medium transition-all ${
                canMeet
                  ? "border-[#2B7A50] bg-[#EBF5F0] text-[#2B7A50]"
                  : "border-black/[0.08] bg-white text-[#888070]"
              }`}
            >
              {canMeet && "✓ "}🤝 직거래
            </button>
            <button
              onClick={() => setCanDeliver(!canDeliver)}
              className={`flex items-center justify-center gap-2 py-3 rounded-[10px] border-2 text-[0.82rem] font-medium transition-all ${
                canDeliver
                  ? "border-[#2050A0] bg-[#EBF0FB] text-[#2050A0]"
                  : "border-black/[0.08] bg-white text-[#888070]"
              }`}
            >
              {canDeliver && "✓ "}📦 택배 가능
            </button>
          </div>
        </section>

        {/* 8. 설명 */}
        <section>
          <SectionTitle index="8" title="상품 설명" required />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={8}
            placeholder={`상품 상태, 사용 기간, 구매 시기 등 자세히 적어주세요.\n\n예시:\n- 모델: Daikin FTKF25D\n- 사용 기간: 약 2년\n- 정상 작동 확인, 외관 스크래치 없음\n- 분리 비용 별도 협의 가능`}
            className="w-full bg-[#F5F3EE] rounded-[10px] px-4 py-3 text-[0.85rem] leading-relaxed outline-none placeholder:text-[#C0BBB0] resize-none"
          />
          <div className="text-right text-[0.68rem] text-[#C0BBB0] mt-1">{description.length} / 2000</div>
        </section>

        {/* 안내 */}
        <div className="bg-[#FBF5E8] border border-[#E8D090] rounded-[10px] p-3 flex items-start gap-2">
          <span className="text-sm">💡</span>
          <p className="text-[0.72rem] text-[#B07010] leading-relaxed">
            허위·과장 광고는 사전 고지 없이 삭제될 수 있어요. 거래 약속 후 잠수, 사기 등은 신고를 통해 제재됩니다.
          </p>
        </div>

        {hydrated && (title || description) && (
          <div className="text-center text-[0.7rem] text-[#C0BBB0]">💾 자동 저장 중</div>
        )}
      </div>
    </div>
  );
}

export default function FleaWritePage() {
  return (
    <Suspense fallback={<div className="p-6 text-[#888070]">불러오는 중…</div>}>
      <FleaWriteInner />
    </Suspense>
  );
}

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
