"use client";

import { useEffect, useState } from "react";

interface Props {
  photos: string[];
  startIndex?: number;
  alt?: string;
  onClose: () => void;
}

/**
 * 사진 전체화면 뷰어. 탭/Esc로 닫고, 여러 장이면 좌우로 넘긴다.
 * 깨진 이미지는 안내로 대체한다. body 스크롤은 열려 있는 동안 잠근다.
 */
export default function Lightbox({ photos, startIndex = 0, alt = "사진", onClose }: Props) {
  const safePhotos = photos.filter(Boolean);
  const [idx, setIdx] = useState(Math.min(Math.max(startIndex, 0), Math.max(safePhotos.length - 1, 0)));
  const [broken, setBroken] = useState(false);

  const count = safePhotos.length;
  const go = (d: number) => { setBroken(false); setIdx((i) => (i + d + count) % count); };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" && count > 1) go(-1);
      else if (e.key === "ArrowRight" && count > 1) go(1);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  if (count === 0) return null;

  return (
    <div
      className="fixed inset-0 z-[140] bg-black/90 flex items-center justify-center select-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="사진 크게 보기"
    >
      {/* 닫기 */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="닫기"
        className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white text-lg flex items-center justify-center z-10"
      >
        ✕
      </button>

      {count > 1 && (
        <span className="absolute top-4 left-1/2 -translate-x-1/2 text-white/80 text-[0.8rem] font-medium z-10">
          {idx + 1} / {count}
        </span>
      )}

      {/* 이미지 (탭 영역과 분리해 이미지 탭으로는 안 닫히게) */}
      <div className="max-w-[96vw] max-h-[88vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        {broken ? (
          <div className="text-white/70 text-center px-6">
            <div className="text-4xl mb-2">🖼️</div>
            <div className="text-[0.85rem]">사진을 불러올 수 없어요</div>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={safePhotos[idx]}
            alt={alt}
            onError={() => setBroken(true)}
            className="max-w-[96vw] max-h-[88vh] object-contain rounded-[8px]"
            draggable={false}
          />
        )}
      </div>

      {count > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); go(-1); }}
            aria-label="이전 사진"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white text-xl flex items-center justify-center"
          >
            ‹
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); go(1); }}
            aria-label="다음 사진"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white text-xl flex items-center justify-center"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}
