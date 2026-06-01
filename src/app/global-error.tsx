"use client";

import { useEffect } from "react";

/**
 * root layout 자체가 깨졌을 때 fallback (app/error.tsx보다 더 외곽).
 * <html>/<body> 직접 렌더링이 필요함 — layout이 동작하지 않는 상태이기 때문.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[global error]", error);
  }, [error]);

  return (
    <html lang="ko">
      <body className="antialiased">
        <div className="max-w-[480px] mx-auto flex flex-col items-center justify-center text-center px-4 py-20 min-h-[80vh]">
          <div className="text-6xl mb-4">💥</div>
          <h1 className="text-[1.4rem] font-bold text-[#181614] mb-2">
            앱을 불러오지 못했어요
          </h1>
          <p className="text-[0.88rem] text-[#888070] mb-6">
            새로고침하거나 잠시 후 다시 접속해주세요.
          </p>
          <button
            onClick={reset}
            className="bg-[#D04020] text-white text-[0.85rem] font-bold px-5 py-[10px] rounded-[10px]"
          >
            🔄 다시 시도
          </button>
        </div>
      </body>
    </html>
  );
}
