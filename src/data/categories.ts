export interface Category {
  id: string;
  label: string;
  icon: string;
  color: string;
  locked?: boolean;
}

// 커뮤니티 카테고리 (벼룩시장·부동산은 별도 페이지로 분리됨)
// 사용자 지정 순서: 생활정보 → 익명 → 맛집 → 취업정보 → 금융/투자 → 육아 → 의료 → 연애 → 성인
export const CATEGORIES: Category[] = [
  { id: "life",      label: "생활정보", icon: "🏠", color: "bg-[#FBF0EC]" },
  { id: "anon",      label: "익명",     icon: "🎭", color: "bg-[#F0EDE8]" },
  { id: "food",      label: "맛집",     icon: "🍱", color: "bg-[#FBF0EC]" },
  { id: "job",       label: "취업정보", icon: "💼", color: "bg-[#EBF5F0]" },
  { id: "finance",   label: "금융/투자",icon: "💰", color: "bg-[#EBF0FB]" },
  { id: "parenting", label: "육아",     icon: "👶", color: "bg-[#FFF0F5]" },
  { id: "medical",   label: "의료",     icon: "🏥", color: "bg-[#EBF0FB]" },
  { id: "love",      label: "연애",     icon: "💕", color: "bg-[#FFF0F5]" },
  { id: "adult",     label: "성인",     icon: "🔞", color: "bg-[#F0EDE8]", locked: true },
];

export const DEFAULT_FAVORITES = ["life", "anon", "food", "job"];
