"use client";

import { useState } from "react";

interface Props {
  photos: string[];
  fallbackEmoji: string;
  fallbackBg: string;     // tailwind class (예: "bg-[#EBF0FB]")
  heightClass?: string;   // 예: "h-[220px]"
  alt: string;
}

export default function PhotoCarousel({ photos, fallbackEmoji, fallbackBg, heightClass = "h-[220px]", alt }: Props) {
  const [idx, setIdx] = useState(0);

  if (!photos || photos.length === 0) {
    return (
      <div className={`w-full ${heightClass} flex items-center justify-center text-[5rem] ${fallbackBg}`}>
        {fallbackEmoji}
      </div>
    );
  }

  const prev = () => setIdx((idx - 1 + photos.length) % photos.length);
  const next = () => setIdx((idx + 1) % photos.length);

  return (
    <div className={`w-full ${heightClass} relative overflow-hidden bg-black`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photos[idx]} alt={alt} className="w-full h-full object-cover" />

      {photos.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center text-sm transition-colors"
            aria-label="이전 사진"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center text-sm transition-colors"
            aria-label="다음 사진"
          >
            ›
          </button>

          {/* 인디케이터 */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-[5px]">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-[5px] rounded-full transition-all ${
                  i === idx ? "bg-white w-5" : "bg-white/50 w-[5px] hover:bg-white/80"
                }`}
                aria-label={`사진 ${i + 1}로 이동`}
              />
            ))}
          </div>

          {/* 카운터 */}
          <span className="absolute top-3 right-3 bg-black/60 text-white text-[0.7rem] font-medium px-2 py-[2px] rounded-full">
            {idx + 1} / {photos.length}
          </span>
        </>
      )}
    </div>
  );
}
