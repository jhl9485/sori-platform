"use client";

import { useEffect } from "react";

/**
 * 페이지 단위 런타임 에러 경계.
 * Next.js App Router가 페이지 트리에서 발생한 에러를 catch하여 이 컴포넌트를 표시.
 * digest는 서버 사이드에서 발생한 에러의 해시(클라이언트에는 메시지 미노출).
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 향후 Sentry 등 모니터링 도구 연동 자리
    console.error("[page error]", error);
  }, [error]);

  return (
    <div className="max-w-[680px] mx-auto flex flex-col items-center justify-center text-center px-4 py-20 min-h-[60vh]">
      <div className="text-6xl mb-4">⚠️</div>
      <h1 className="text-[1.4rem] font-bold text-[#181614] mb-2">
        일시적인 문제가 발생했어요
      </h1>
      <p className="text-[0.88rem] text-[#888070] mb-1">
        페이지를 불러오는 중 오류가 발생했어요.
      </p>
      <p className="text-[0.78rem] text-[#888070] mb-6">
        잠시 후 다시 시도해주세요. 계속 안 되면 마이페이지 → 캐시 비우기를 시도해주세요.
      </p>

      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={reset}
          className="bg-[#D04020] text-white text-[0.85rem] font-bold px-5 py-[10px] rounded-[10px] hover:bg-[#B83515] transition-colors"
        >
          🔄 다시 시도
        </button>
        <a
          href="/"
          className="bg-white border border-black/[0.1] text-[#181614] text-[0.85rem] font-medium px-5 py-[10px] rounded-[10px] hover:bg-[#F5F3EE] transition-colors"
        >
          🏠 홈으로
        </a>
      </div>

      {error?.digest && (
        <p
          className="mt-6 text-[0.65rem] text-[#C0BBB0]"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          error_id: {error.digest}
        </p>
      )}
    </div>
  );
}
