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
    <div
      className={`flex items-center bg-white border border-black/[0.08] rounded-full px-4 focus-within:border-black/[0.15] transition-colors ${className}`}
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
