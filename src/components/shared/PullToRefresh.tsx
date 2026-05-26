"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface Props {
  onRefresh?: () => void | Promise<void>;
  children: ReactNode;
}

const TRIGGER_DISTANCE = 70;
const MAX_PULL = 120;

export default function PullToRefresh({ onRefresh, children }: Props) {
  const [pull, setPull] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY > 0) return;
      startY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (startY.current === null || refreshing) return;
      const delta = e.touches[0].clientY - startY.current;
      if (delta <= 0) {
        setPull(0);
        return;
      }
      // 위로 당기는 동안 스크롤 막기 위해 passive: false로 등록
      const dampened = Math.min(MAX_PULL, delta * 0.55);
      setPull(dampened);
    };

    const handleTouchEnd = async () => {
      if (startY.current === null) return;
      startY.current = null;
      if (pull >= TRIGGER_DISTANCE) {
        setRefreshing(true);
        try {
          await Promise.resolve(onRefresh?.());
        } finally {
          // 깜빡 보여줬다가 닫기
          setTimeout(() => {
            setRefreshing(false);
            setPull(0);
            // 기본 새로고침: location.reload()
            if (!onRefresh) window.location.reload();
          }, 400);
        }
      } else {
        setPull(0);
      }
    };

    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: true });
    el.addEventListener("touchend", handleTouchEnd);

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [pull, refreshing, onRefresh]);

  const ratio = Math.min(1, pull / TRIGGER_DISTANCE);
  const triggered = pull >= TRIGGER_DISTANCE;

  return (
    <div ref={containerRef} className="md:hidden">
      <div
        className="flex items-center justify-center overflow-hidden transition-[height] duration-150"
        style={{ height: refreshing ? 50 : pull }}
        aria-hidden="true"
      >
        <div className="flex items-center gap-2 text-[0.75rem] text-[#888070]">
          <span
            className={`text-base leading-none transition-transform ${refreshing ? "animate-spin" : ""}`}
            style={{ transform: refreshing ? undefined : `rotate(${ratio * 360}deg)` }}
          >
            🔄
          </span>
          <span>
            {refreshing ? "새로고침 중..." : triggered ? "놓으면 새로고침" : "당겨서 새로고침"}
          </span>
        </div>
      </div>
      {children}
    </div>
  );
}
