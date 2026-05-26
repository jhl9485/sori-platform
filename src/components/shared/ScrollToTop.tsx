"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="맨 위로"
      className="md:hidden fixed bottom-[140px] right-4 w-10 h-10 bg-white/95 backdrop-blur border border-black/[0.1] text-[#181614] rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.1)] flex items-center justify-center text-sm leading-none z-40 hover:bg-white active:scale-90 transition-all"
    >
      ↑
    </button>
  );
}
