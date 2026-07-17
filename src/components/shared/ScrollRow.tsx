import type { ReactNode } from "react";

/**
 * 가로 스크롤되는 칩/탭 행. 우측에 크림→투명 페이드를 얹어 "더 있음"을 암시한다.
 * 탭이 화면에 다 들어오면 페이드 아래도 배경(크림)이라 자연히 안 보인다.
 *
 * @param className 내부 flex 행에 붙일 클래스(간격·패딩 등)
 */
export default function ScrollRow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className="relative">
      <div className={`flex overflow-x-auto scrollbar-hide ${className}`}>{children}</div>
      <div className="pointer-events-none absolute top-0 right-0 bottom-0 w-9 bg-gradient-to-l from-[#F5F3EE] to-transparent" />
    </div>
  );
}
