"use client";

interface Props {
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  onClear?: () => void;
  autoFocus?: boolean;
  className?: string;
}

/**
 * 검색 입력 필드 — flex 구조로 돋보기 아이콘을 항상 입력칸 수직 정중앙에 배치.
 * absolute 포지셔닝을 쓰지 않아 emoji baseline 영향 없음.
 */
export default function SearchField({ value, onChange, placeholder, onClear, autoFocus, className = "" }: Props) {
  return (
    // 포커스 표시는 input이 아니라 이 바깥 div에 준다.
    // input은 bg-transparent에 모서리가 각진 채로 pill 안에 끼어 있어서,
    // input에 focus:ring을 걸면 돋보기 아이콘 옆에서 시작하는 각진 사각형이
    // pill의 둥근 테두리를 뚫고 나온다. 바깥 div는 rounded-full이라 링이 pill 모양을 따라간다.
    // 색·두께는 작성 화면(realty/write 등)에서 쓰는 ring-2 + #D04020/25 를 그대로 쓴다.
    <div
      className={`flex items-center bg-white border border-black/[0.08] rounded-full px-4 focus-within:border-black/[0.15] focus-within:ring-2 focus-within:ring-[#D04020]/25 transition-colors ${className}`}
    >
      <span className="text-[0.9rem] text-[#888070] mr-2 flex-shrink-0 leading-none">🔍</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="flex-1 bg-transparent py-[10px] text-[0.85rem] outline-none placeholder:text-[#888070] min-w-0"
      />
      {value && onClear && (
        <button
          onClick={onClear}
          className="text-[#888070] text-sm ml-2 flex-shrink-0 leading-none"
          aria-label="검색어 지우기"
        >
          ✕
        </button>
      )}
    </div>
  );
}
