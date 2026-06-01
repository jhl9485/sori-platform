"use client";

import { useRef, useState } from "react";

interface Props {
  photos: string[];
  fallbackEmoji: string;
  fallbackBg: string;
  heightClass?: string;
  alt: string;
}

const SWIPE_THRESHOLD = 50;

export default function PhotoCarousel({ photos, fallbackEmoji, fallbackBg, heightClass = "h-[220px]", alt }: Props) {
  const [idx, setIdx] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);
  const [dragOffset, setDragOffset] = useState(0);

  if (!photos || photos.length === 0) {
    return (
      <div className={`w-full ${heightClass} flex items-center justify-center text-[5rem] leading-none ${fallbackBg}`}>
        {fallbackEmoji}
      </div>
    );
  }

  const prev = () => setIdx((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setIdx((i) => (i + 1) % photos.length);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    // 시각적 피드백 (가벼운 따라옴)
    setDragOffset(touchDeltaX.current * 0.3);
  };
  const onTouchEnd = () => {
    if (touchStartX.current === null) return;
    const dx = touchDeltaX.current;
    setDragOffset(0);
    touchStartX.current = null;
    touchDeltaX.current = 0;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    if (dx > 0) prev(); else next();
  };

  return (
    <div
      className={`w-full ${heightClass} relative overflow-hidden bg-black select-none touch-pan-y`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photos[idx]}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-150"
        style={{ transform: `translateX(${dragOffset}px)` }}
        draggable={false}
      />

      {photos.length > 1 && (
        <>
          <button
            onClick={prev}
            className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/70 text-white rounded-full items-center justify-center text-sm transition-colors leading-none"
            aria-label="이전 사진"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/70 text-white rounded-full items-center justify-center text-sm transition-colors leading-none"
            aria-label="다음 사진"
          >
            ›
          </button>

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

          <span className="absolute top-3 right-3 bg-black/60 text-white text-[0.7rem] font-medium px-2 py-[2px] rounded-full leading-none">
            {idx + 1} / {photos.length}
          </span>

          <div className="sm:hidden absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/40 text-white text-[0.62rem] px-2 py-[2px] rounded-full leading-none">
            ← 좌우 스와이프 →
          </div>
        </>
      )}
    </div>
  );
}
