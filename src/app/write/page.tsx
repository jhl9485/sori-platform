"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/data/categories";

export default function WritePage() {
  const router = useRouter();
  const [selectedCat, setSelectedCat] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAnon, setIsAnon] = useState(false);
  const [showCatPicker, setShowCatPicker] = useState(false);

  const selectedCatData = CATEGORIES.find((c) => c.id === selectedCat);
  const canSubmit = selectedCat && title.trim().length > 0 && content.trim().length > 0;

  return (
    <div className="max-w-[390px] mx-auto min-h-screen bg-white shadow-[0_0_60px_rgba(0,0,0,0.12)]">
      {/* 헤더 */}
      <div className="sticky top-0 z-50 bg-white border-b border-black/[0.08] px-4 h-[56px] flex items-center justify-between">
        <button onClick={() => router.back()} className="text-[0.9rem] text-[#888070]">✕</button>
        <span className="text-[0.9rem] font-bold">글쓰기</span>
        <button
          onClick={() => canSubmit && router.push("/community")}
          className={`text-[0.85rem] font-bold px-3 py-1 rounded-full transition-colors ${
            canSubmit ? "bg-[#D04020] text-white" : "bg-[#F0EDE8] text-[#888070]"
          }`}
        >
          등록
        </button>
      </div>

      <div className="px-4 py-4">
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

        {/* 카테고리 그리드 */}
        {showCatPicker && (
          <div className="grid grid-cols-4 gap-2 mb-4 p-3 bg-[#F5F3EE] rounded-[12px]">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  if (cat.locked) {
                    if (window.confirm("성인 게시판입니다. 계속하시겠습니까?")) {
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

        {/* 제목 */}
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={50}
          className="w-full text-[1rem] font-bold border-b border-black/[0.08] pb-3 mb-4 outline-none placeholder:text-[#C0BBB0] bg-transparent"
        />

        {/* 본문 */}
        <textarea
          placeholder={`내용을 입력하세요.\n\n싱가포르 생활 정보, 질문, 고민 등 자유롭게 작성해 주세요.\n욕설, 혐오 표현, 스팸은 제재될 수 있습니다.`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={12}
          className="w-full text-[0.88rem] text-[#181614] leading-relaxed outline-none placeholder:text-[#C0BBB0] bg-transparent resize-none"
        />

        {/* 글자수 */}
        <div className="text-right text-[0.72rem] text-[#C0BBB0] mt-2" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          {content.length} / 2000
        </div>
      </div>

      {/* 하단 옵션 바 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-black/[0.08] px-4 py-3 flex items-center justify-between z-50">
        <div className="flex items-center gap-3">
          <button className="w-8 h-8 flex items-center justify-center text-[#888070] text-lg hover:bg-[#F5F3EE] rounded-lg">📷</button>
          <button className="w-8 h-8 flex items-center justify-center text-[#888070] text-lg hover:bg-[#F5F3EE] rounded-lg">🔗</button>
          <button className="w-8 h-8 flex items-center justify-center text-[#888070] text-lg hover:bg-[#F5F3EE] rounded-lg">📍</button>
        </div>
        <button
          onClick={() => setIsAnon(!isAnon)}
          className={`flex items-center gap-2 px-3 py-[5px] rounded-full text-[0.75rem] font-medium border transition-all ${
            isAnon ? "bg-[#181614] text-white border-[#181614]" : "bg-white text-[#888070] border-black/[0.08]"
          }`}
        >
          🎭 {isAnon ? "익명 ON" : "익명 OFF"}
        </button>
      </div>

      {/* 하단 패딩 */}
      <div className="h-[60px]" />
    </div>
  );
}
