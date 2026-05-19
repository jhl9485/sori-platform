export interface Category {
  id: string;
  label: string;
  icon: string;
  color: string;
  locked?: boolean;
}

export const CATEGORIES: Category[] = [
  { id: "life",      label: "생활정보", icon: "🏠", color: "bg-[#FBF0EC]" },
  { id: "love",      label: "연애",     icon: "💕", color: "bg-[#FFF0F5]" },
  { id: "adult",     label: "성인",     icon: "🔞", color: "bg-[#F0EDE8]", locked: true },
  { id: "flea",      label: "벼룩시장", icon: "🛍️", color: "bg-[#FBF5E8]" },
  { id: "food",      label: "맛집",     icon: "🍱", color: "bg-[#FBF0EC]" },
  { id: "job",       label: "취업정보", icon: "💼", color: "bg-[#EBF5F0]" },
  { id: "finance",   label: "금융/투자",icon: "💰", color: "bg-[#EBF0FB]" },
  { id: "parenting", label: "육아",     icon: "👶", color: "bg-[#FFF0F5]" },
  { id: "medical",   label: "의료",     icon: "🏥", color: "bg-[#EBF0FB]" },
  { id: "anon",      label: "익명",     icon: "🎭", color: "bg-[#F0EDE8]" },
  { id: "club",      label: "동아리",   icon: "🎯", color: "bg-[#F5F0FF]" },
  { id: "realty",    label: "부동산",   icon: "🏘️", color: "bg-[#FBF5E8]" },
];

export const DEFAULT_FAVORITES = ["life", "food", "job", "anon"];
