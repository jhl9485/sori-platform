"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CATEGORIES } from "@/data/categories";
import type { VisaBadge } from "@/data/communityPosts";
import { updateUserItem } from "@/lib/userContent";
import { toast, confirmDialog } from "@/components/shared/Feedback";
import { useUnsavedGuard, useEditDirty } from "@/lib/useUnsavedGuard";
import ImageUploader from "@/components/shared/ImageUploader";

const DRAFT_KEY = "sori_write_draft";
const POSTS_KEY = "sori_user_posts";

interface RawPost {
  id: string;
  categoryId: string;
  categoryLabel: string;
  title: string;
  content: string;
  tags: string[];
  visaBadge: VisaBadge;
  isAnon: boolean;
  images: string[];
  createdAt: string;
}

const VISA_BADGES: { id: VisaBadge; label: string; color: string }[] = [
  { id: null,    label: "표시 안 함", color: "bg-white text-[#888070] border-black/[0.08]" },
  { id: "EP",    label: "EP",         color: "bg-[#EBF0FB] text-[#2050A0] border-[#2050A0]/30" },
  { id: "S-Pass", label: "S-Pass",    color: "bg-[#EBF5F0] text-[#2B7A50] border-[#2B7A50]/30" },
  { id: "DP",    label: "DP",         color: "bg-[#FBF5E8] text-[#B07010] border-[#B07010]/30" },
  { id: "PR",    label: "PR",         color: "bg-[#F0EDE8] text-[#555] border-black/[0.15]" },
  { id: "시민권", label: "시민권",      color: "bg-[#181614] text-white border-[#181614]" },
  { id: "WH",    label: "WH",         color: "bg-[#F5F0FF] text-[#7040C0] border-[#7040C0]/30" },
];

interface DraftState {
  selectedCat: string;
  title: string;
  content: string;
  isAnon: boolean;
  tagsInput: string;
  visaBadge: VisaBadge;
  images: string[];
}

// 사진 압축·리사이즈는 공용 ImageUploader가 담당한다.
// (예전엔 여기에 별도 구현이 있어 1000px/0.7 — 공용은 1200px/0.78 이라 결과물이 달랐다)

function WriteInner() {
  const router = useRouter();
  const sp = useSearchParams();
  const presetCat = sp.get("cat") || "";
  const editId = sp.get("edit") || "";
  const isEditMode = !!editId;

  const [selectedCat, setSelectedCat] = useState(presetCat);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAnon, setIsAnon] = useState(false);
  const [tagsInput, setTagsInput] = useState("");
  const [visaBadge, setVisaBadge] = useState<VisaBadge>(null);
  const [images, setImages] = useState<string[]>([]);
  const [showCatPicker, setShowCatPicker] = useState(false);
  const [restored, setRestored] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // 수정 모드는 기존 글을 불러오므로 열자마자 내용이 있다 → "내용이 있는가"로 판정하면
  // 아무것도 안 고쳐도 항상 이탈 경고가 떴다. 수정 모드만 불러온 값과 비교하고,
  // 신규 작성은 종전대로 내용 유무로 판정한다(신규 경고는 그대로 살아 있어야 한다).
  const editDirty = useEditDirty(
    [selectedCat, title, content, isAnon, tagsInput, visaBadge, images],
    isEditMode && hydrated
  );
  const confirmLeave = useUnsavedGuard(isEditMode ? editDirty : !!(title || content));

  useEffect(() => {
    try {
      // 수정 모드: 기존 글 로드 (draft 무시)
      if (isEditMode) {
        const raw = localStorage.getItem(POSTS_KEY);
        if (raw) {
          const arr = JSON.parse(raw) as RawPost[];
          const target = arr.find((p) => p.id === editId);
          if (target) {
            setSelectedCat(target.categoryId || "");
            setTitle(target.title || "");
            setContent(target.content || "");
            setIsAnon(!!target.isAnon);
            setTagsInput((target.tags || []).join(", "));
            setVisaBadge(target.visaBadge ?? null);
            setImages(target.images || []);
          }
        }
        setHydrated(true);
        return;
      }

      // 신규 모드: draft 복원
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const draft = JSON.parse(raw) as DraftState;
        if (draft.title || draft.content) {
          setSelectedCat(draft.selectedCat || presetCat);
          setTitle(draft.title || "");
          setContent(draft.content || "");
          setIsAnon(!!draft.isAnon);
          setTagsInput(draft.tagsInput || "");
          setVisaBadge(draft.visaBadge ?? null);
          setImages(draft.images || []);
          setRestored(true);
        }
      }
    } catch {}
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hydrated || isEditMode) return; // 수정 모드는 draft 저장 안 함
    if (!title && !content && !selectedCat) {
      localStorage.removeItem(DRAFT_KEY);
      return;
    }
    try {
      localStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({ selectedCat, title, content, isAnon, tagsInput, visaBadge, images } satisfies DraftState)
      );
    } catch {}
  }, [selectedCat, title, content, isAnon, tagsInput, visaBadge, images, hydrated, isEditMode]);

  const selectedCatData = CATEGORIES.find((c) => c.id === selectedCat);
  const canSubmit = selectedCat && title.trim().length > 0 && content.trim().length > 0;

  const parseTags = (input: string): string[] => {
    return input
      .split(/[,\s#]+/)
      .map((t) => t.trim())
      .filter((t) => t.length > 0)
      .slice(0, 6);
  };

  const tagsPreview = parseTags(tagsInput);

  const submit = () => {
    if (!canSubmit) return;

    if (isEditMode) {
      const ok = updateUserItem<RawPost>(POSTS_KEY, editId, {
        categoryId: selectedCat,
        categoryLabel: selectedCatData?.label || "",
        title: title.trim(),
        content: content.trim(),
        tags: tagsPreview,
        visaBadge: isAnon ? null : visaBadge,
        isAnon,
        images,
      });
      if (!ok) {
        toast("수정 실패: 글을 찾을 수 없어요.");
        return;
      }
      toast("✅ 글이 수정되었어요!");
      router.push(`/community/${editId}`);
      return;
    }

    const newItem = {
      id: `user-${Date.now()}`,
      categoryId: selectedCat,
      categoryLabel: selectedCatData?.label || "",
      title: title.trim(),
      content: content.trim(),
      tags: tagsPreview,
      visaBadge: isAnon ? null : visaBadge,
      isAnon,
      images,
      createdAt: new Date().toISOString(),
    };
    try {
      const raw = localStorage.getItem(POSTS_KEY);
      const arr = raw ? (JSON.parse(raw) as unknown[]) : [];
      arr.unshift(newItem);
      localStorage.setItem(POSTS_KEY, JSON.stringify(arr));
      localStorage.removeItem(DRAFT_KEY);
    } catch (err) {
      console.error("글 저장 실패:", err);
      toast("등록 실패: 저장 공간이 부족해요. 옛 글을 지운 뒤 다시 시도해주세요.");
      return;
    }
    toast("✅ 글이 등록되었어요!");
    router.push("/community");
  };

  const discardDraft = () => {
    setSelectedCat("");
    setTitle("");
    setContent("");
    setIsAnon(false);
    setTagsInput("");
    setVisaBadge(null);
    setRestored(false);
    localStorage.removeItem(DRAFT_KEY);
  };

  return (
    <div className="max-w-[480px] mx-auto min-h-screen bg-white shadow-[0_0_60px_rgba(0,0,0,0.12)]">
      {/* 헤더 */}
      <div className="sticky top-0 z-50 bg-white border-b border-black/[0.08] px-4 h-[56px] flex items-center justify-between">
        <button onClick={async () => { if (await confirmLeave()) router.back(); }} className="text-[0.9rem] text-[#888070]" aria-label="닫기">✕</button>
        <span className="text-[0.9rem] font-bold">{isEditMode ? "글 수정" : "글쓰기"}</span>
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

      <div className="px-4 py-4 pb-32">
        {/* 카테고리 선택 */}
        <button
          onClick={() => setShowCatPicker(!showCatPicker)}
          className="w-full flex items-center justify-between bg-[#F5F3EE] rounded-[10px] px-4 py-3 mb-4"
        >
          <span className="text-[0.85rem] text-[#888070]">
            {selectedCatData ? `${selectedCatData.icon} ${selectedCatData.label}` : "게시판 선택 *"}
          </span>
          <span className="text-[#888070] text-sm">{showCatPicker ? "▲" : "▼"}</span>
        </button>

        {showCatPicker && (
          <div className="grid grid-cols-4 gap-2 mb-4 p-3 bg-[#F5F3EE] rounded-[12px]">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={async () => {
                  if (cat.locked) {
                    if (await confirmDialog({ message: "성인 게시판입니다.\n계속하시겠어요?", confirmText: "계속" })) {
                      setSelectedCat(cat.id);
                      setShowCatPicker(false);
                    }
                    return;
                  }
                  setSelectedCat(cat.id);
                  setShowCatPicker(false);
                }}
                className={`flex flex-col items-center gap-1 p-2 rounded-[10px] transition-all ${
                  selectedCat === cat.id ? "bg-[#181614]" : "bg-white hover:bg-[#F0EDE8]"
                }`}
              >
                <span className="text-lg">{cat.icon}</span>
                <span className={`text-[0.65rem] font-medium ${selectedCat === cat.id ? "text-white" : "text-[#181614]"}`}>
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* 비자 배지 (익명 OFF일 때만) */}
        {!isAnon && (
          <div className="mb-4">
            <div className="text-[0.72rem] text-[#888070] mb-2">🏷️ 내 비자 표시 (선택)</div>
            <div className="flex flex-wrap gap-[5px]">
              {VISA_BADGES.map((v) => (
                <button
                  key={v.label}
                  onClick={() => setVisaBadge(v.id)}
                  className={`text-[0.72rem] font-bold rounded-full px-3 py-[4px] border transition-all ${
                    visaBadge === v.id ? v.color : "bg-white text-[#888070] border-black/[0.08] hover:border-black/[0.15]"
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 제목 */}
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={50}
          className="w-full text-[1rem] font-bold border-b border-black/[0.08] pb-2 outline-none focus:ring-2 focus:ring-[#D04020]/25 placeholder:text-[#C0BBB0] bg-transparent"
        />
        <div className="text-right text-[0.68rem] text-[#C0BBB0] mt-1 mb-3">{title.length}/50</div>

        {/* 본문 */}
        <textarea
          placeholder={`내용을 입력하세요.\n\n싱가포르 생활 정보, 질문, 고민 등 자유롭게 작성해 주세요.\n욕설, 혐오 표현, 스팸은 제재될 수 있습니다.`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onFocus={(e) => setTimeout(() => e.target.scrollIntoView({ behavior: "smooth", block: "center" }), 300)}
          rows={10}
          maxLength={2000}
          className="w-full text-[0.88rem] text-[#181614] leading-relaxed outline-none focus:ring-2 focus:ring-[#D04020]/25 placeholder:text-[#C0BBB0] bg-transparent resize-none"
        />

        {/* 태그 입력 */}
        <div className="mt-4 pt-4 border-t border-black/[0.06]">
          <div className="text-[0.72rem] text-[#888070] mb-2">🏷️ 태그 (쉼표나 공백으로 구분, 최대 6개)</div>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="예: 비자, EP, OCBC, Tanjong-Pagar"
            className="w-full bg-[#F5F3EE] rounded-[10px] px-3 py-2 text-[0.82rem] outline-none focus:ring-2 focus:ring-[#D04020]/25 placeholder:text-[#C0BBB0]"
          />
          {tagsPreview.length > 0 && (
            <div className="flex flex-wrap gap-[5px] mt-2">
              {tagsPreview.map((t) => (
                <span
                  key={t}
                  className="text-[0.68rem] bg-[#FBF0EC] text-[#D04020] rounded-full px-2 py-[2px]"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 사진 — 다른 작성 화면 3곳과 같은 공용 컴포넌트를 쓴다.
            예전엔 여기만 직접 구현이라 4장 제한·대표 배지 없음·다른 압축 설정이었다. */}
        <div className="mt-4">
          <label className="block text-[0.8rem] font-bold text-[#888070] mb-2">사진</label>
          <ImageUploader images={images} onChange={setImages} />
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-[0.7rem] text-[#C0BBB0]">
            {hydrated && (title || content) ? "💾 자동 저장 중" : ""}
          </span>
          <span className="text-[0.72rem] text-[#C0BBB0]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            {content.length} / 2000
          </span>
        </div>
      </div>

      {/* 하단 옵션 바 */}
      {/* 폭은 위 본문 컨테이너(max-w-[480px])와 반드시 같아야 어긋나지 않는다 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-black/[0.08] px-4 py-3 flex items-center justify-between z-50 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        {/* 사진 첨부는 본문 안 공용 컴포넌트 한 곳에서만 받는다.
            여기에도 📷을 두면 입구가 두 개가 되어 벼룩 카드의 하트 중복과 같은 문제가 생긴다. */}
        <div />
        <button
          onClick={() => setIsAnon(!isAnon)}
          className={`inline-flex items-center gap-[6px] px-3 h-9 rounded-full text-[0.75rem] font-medium border transition-all leading-none ${
            isAnon ? "bg-[#181614] text-white border-[#181614]" : "bg-white text-[#888070] border-black/[0.08]"
          }`}
        >
          <span className="leading-none">🎭</span>
          <span>{isAnon ? "익명 ON" : "익명 OFF"}</span>
        </button>
      </div>

      <div className="h-[60px]" />
    </div>
  );
}

export default function WritePage() {
  return (
    <Suspense fallback={<div className="p-6 text-[#888070]">불러오는 중…</div>}>
      <WriteInner />
    </Suspense>
  );
}
