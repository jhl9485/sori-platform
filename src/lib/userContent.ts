"use client";

import { useEffect, useState } from "react";
import { CATEGORIES } from "@/data/categories";
import type { CommunityPost, CommunityCategory, VisaBadge } from "@/data/communityPosts";
import type { FleaItem, FleaStatus } from "@/data/fleaItems";
import type { Job } from "@/data/jobs";
import type { RealtyItem } from "@/data/realtyItems";
import type { Business, BizCategory } from "@/data/businesses";

const isBrowser = typeof window !== "undefined";

function readArr<T>(key: string): T[] {
  if (!isBrowser) return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

// "방금 전" / "5분 전" / "2시간 전" / "3일 전"
export function relativeTime(iso: string): string {
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return "";
  const diff = Date.now() - t;
  const min = Math.floor(diff / 60_000);
  if (min < 1) return "방금 전";
  if (min < 60) return `${min}분 전`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}시간 전`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day}일 전`;
  return new Date(iso).toLocaleDateString("ko-KR");
}

// ── 사용자 커뮤니티 글 ──
interface RawUserPost {
  id: string;
  categoryId: string;
  categoryLabel: string;
  title: string;
  content: string;
  tags?: string[];
  visaBadge?: VisaBadge;
  isAnon?: boolean;
  createdAt: string;
}

export function userPostToCommunityPost(p: RawUserPost): CommunityPost {
  const cat = CATEGORIES.find((c) => c.id === p.categoryId);
  // categoryStyle은 기존 정적 데이터의 색상 매핑 패턴 따라감
  const colorMap: Record<string, string> = {
    life: "bg-[#EBF0FB] text-[#2050A0]",
    food: "bg-[#FBF0EC] text-[#D04020]",
    job: "bg-[#EBF5F0] text-[#2B7A50]",
    finance: "bg-[#EBF0FB] text-[#2050A0]",
    anon: "bg-[#F0EDE8] text-[#888070]",
    love: "bg-[#FFF0F5] text-[#D04020]",
    parenting: "bg-[#FFF0F5] text-[#D04020]",
    medical: "bg-[#EBF0FB] text-[#2050A0]",
    club: "bg-[#F5F0FF] text-[#7040C0]",
    adult: "bg-[#F0EDE8] text-[#888070]",
  };

  const anon = !!p.isAnon;

  return {
    id: p.id,
    categoryId: p.categoryId,
    categoryLabel: (cat?.label || p.categoryLabel || "생활정보") as CommunityCategory,
    categoryStyle: colorMap[p.categoryId] || "bg-[#F5F3EE] text-[#888070]",
    avatarChar: anon ? "?" : "나",
    avatarBg: anon ? "#F0EDE8" : "#FBF0EC",
    avatarColor: anon ? "#888070" : "#D04020",
    author: anon ? "익명" : "나",
    time: relativeTime(p.createdAt),
    title: p.title,
    preview: p.content.slice(0, 100),
    fullContent: p.content,
    tags: p.tags || [],
    views: "1",
    comments: "0",
    likes: "0",
    visaBadge: anon ? null : (p.visaBadge ?? undefined),
    isAnon: anon,
  };
}

// ── 사용자 벼룩시장 ──
interface RawUserFlea {
  id: string;
  photos?: string[];
  category: string;
  title: string;
  price: string;
  originalPrice: string | null;
  negotiable?: boolean;
  condition: string;
  area: string;
  canMeet: boolean;
  canDeliver: boolean;
  description: string;
  status?: FleaStatus;
  createdAt: string;
}

const FLEA_EMOJI: Record<string, { emoji: string; bg: string }> = {
  "가전/가구": { emoji: "🛋️", bg: "bg-[#EBF0FB]" },
  "의류/잡화": { emoji: "👕", bg: "bg-[#FFF0F5]" },
  식품: { emoji: "🍎", bg: "bg-[#EBF5F0]" },
  도서: { emoji: "📚", bg: "bg-[#FBF5E8]" },
  유아용품: { emoji: "🍼", bg: "bg-[#FFF0F5]" },
  디지털: { emoji: "💻", bg: "bg-[#EBF5F0]" },
  기타: { emoji: "📦", bg: "bg-[#F0EDE8]" },
};

export function userFleaToFleaItem(p: RawUserFlea): FleaItem {
  const meta = FLEA_EMOJI[p.category] || { emoji: "📦", bg: "bg-[#F0EDE8]" };
  return {
    id: p.id,
    category: p.category,
    emoji: meta.emoji,
    bg: meta.bg,
    title: p.title,
    price: p.price.startsWith("$") ? p.price : `$${p.price}`,
    originalPrice: p.originalPrice ? (p.originalPrice.startsWith("$") ? p.originalPrice : `$${p.originalPrice}`) : null,
    location: p.area || "협의",
    area: p.area || "협의",
    time: relativeTime(p.createdAt),
    condition: (p.condition as FleaItem["condition"]) || "상태좋음",
    isUrgent: false,
    likes: 0,
    views: 1,
    seller: "나",
    sellerEmoji: "👤",
    sellerSince: String(new Date().getFullYear()),
    sellerDeals: 0,
    description: p.description,
    canDeliver: !!p.canDeliver,
    canMeet: !!p.canMeet,
    photos: p.photos || [],
    negotiable: p.negotiable,
    status: p.status || "판매중",
  };
}

// ── 사용자 구인구직 ──
interface RawUserJob {
  id: string;
  company: string;
  title: string;
  jobType: Job["jobType"];
  visaSponsored: boolean;
  visaType: Job["visaType"];
  salary: string;
  location: string;
  koreanRequired: boolean;
  tags: string[];
  deadline: string;
  description: string;
  requirements: string[];
  preferred: string[];
  benefits: string[];
  createdAt: string;
}

export function userJobToJob(p: RawUserJob): Job {
  return {
    id: p.id,
    company: p.company,
    companyIcon: "🏢",
    companyBg: "bg-[#F0EDE8]",
    companyDesc: "",
    title: p.title,
    location: p.location,
    salary: p.salary,
    visaSponsored: p.visaSponsored,
    visaType: p.visaType,
    jobType: p.jobType,
    koreanRequired: p.koreanRequired,
    tags: p.tags || [],
    postedAt: relativeTime(p.createdAt),
    deadline: p.deadline || "채용시까지",
    views: 1,
    applicants: 0,
    isNew: true,
    isUrgent: false,
    description: p.description,
    requirements: p.requirements || [],
    preferred: p.preferred || [],
    benefits: p.benefits || [],
  };
}

// ── 사용자 부동산 ──
interface RawUserRealty {
  id: string;
  photos?: string[];
  deal: RealtyItem["deal"];
  type: RealtyItem["type"];
  region?: NonNullable<RealtyItem["region"]>;
  status?: NonNullable<RealtyItem["status"]>;
  title: string;
  area: string;
  address: string;
  mrt: string;
  bedrooms: number;
  bathrooms: number;
  sizeSqft: string;
  floor: string;
  furnished: RealtyItem["furnished"];
  price: string;
  availableFrom: string;
  diplomaticClause: boolean;
  amenities: string[];
  description: string;
  createdAt: string;
}

const REALTY_EMOJI: Record<string, { emoji: string; bg: string }> = {
  콘도: { emoji: "🏙️", bg: "bg-[#EBF0FB]" },
  HDB: { emoji: "🏢", bg: "bg-[#FBF5E8]" },
  서비스아파트: { emoji: "🏨", bg: "bg-[#FBF0EC]" },
  하우스: { emoji: "🏡", bg: "bg-[#F5F0FF]" },
  사무실: { emoji: "🏢", bg: "bg-[#F0EDE8]" },
};

export function userRealtyToRealtyItem(p: RawUserRealty): RealtyItem {
  const meta = REALTY_EMOJI[p.type] || { emoji: "🏘️", bg: "bg-[#F5F3EE]" };
  const isSale = p.deal === "매매";
  return {
    id: p.id,
    type: p.type,
    deal: p.deal,
    region: p.region,
    status: p.status || "가능",
    emoji: meta.emoji,
    bg: meta.bg,
    title: p.title,
    price: p.price.startsWith("$") ? p.price : `$${p.price}${isSale ? "" : "/월"}`,
    area: p.area,
    address: p.address || p.area,
    size: p.sizeSqft || "—",
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    floor: p.floor || "—",
    furnished: p.furnished,
    availableFrom: p.availableFrom || "협의",
    diplomaticClause: !!p.diplomaticClause,
    views: 1,
    likes: 0,
    time: relativeTime(p.createdAt),
    agent: "나",
    description: p.description,
    highlights: [],
    mrt: p.mrt || "—",
    amenities: p.amenities || [],
    photos: p.photos || [],
  };
}

// ── React 훅 ──
function useUserItems<TRaw, TOut>(key: string, convert: (raw: TRaw) => TOut): TOut[] {
  const [items, setItems] = useState<TOut[]>([]);

  useEffect(() => {
    const refresh = () => {
      const raw = readArr<TRaw>(key);
      setItems(raw.map(convert));
    };
    refresh();
    const handler = (e: StorageEvent) => {
      if (e.key === key) refresh();
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [key, convert]);

  return items;
}

// ── 사용자 업소 ──
interface RawUserBiz {
  id: string;
  photos?: string[];
  category: BizCategory;
  name: string;
  area: string;
  address: string;
  phone: string;
  openHours: string;
  priceRange: string;
  tags: string[];
  description: string;
  fullDescription: string;
  koreanAvailable?: boolean;
  createdAt: string;
}

const BIZ_EMOJI: Record<string, { emoji: string; bg: string }> = {
  한식:    { emoji: "🍱", bg: "bg-[#FBF0EC]" },
  뷰티:    { emoji: "💅", bg: "bg-[#EBF0FB]" },
  마트:    { emoji: "🛒", bg: "bg-[#EBF5F0]" },
  병원:    { emoji: "🏥", bg: "bg-[#EBF0FB]" },
  학원:    { emoji: "📚", bg: "bg-[#FBF5E8]" },
  부동산:  { emoji: "🏠", bg: "bg-[#FBF5E8]" },
  법무:    { emoji: "⚖️", bg: "bg-[#F0EDE8]" },
  이사:    { emoji: "📦", bg: "bg-[#FBF5E8]" },
  카페:    { emoji: "☕", bg: "bg-[#F5F0FF]" },
  주점:    { emoji: "🍻", bg: "bg-[#FBF0EC]" },
};

export function userBizToBusiness(p: RawUserBiz): Business {
  const meta = BIZ_EMOJI[p.category] || { emoji: "🏪", bg: "bg-[#F5F3EE]" };
  return {
    id: p.id,
    name: p.name,
    category: p.category,
    emoji: meta.emoji,
    bg: meta.bg,
    address: p.address || p.area,
    area: p.area,
    rating: 0,
    reviewCount: 0,
    isOpen: true,
    openHours: p.openHours || "미입력",
    phone: p.phone || "—",
    tags: p.tags || [],
    priceRange: p.priceRange || "$$",
    description: p.description,
    fullDescription: p.fullDescription || p.description,
    reviews: [],
  };
}

export const useUserPosts = () => useUserItems<RawUserPost, CommunityPost>("sori_user_posts", userPostToCommunityPost);
export const useUserFlea = () => useUserItems<RawUserFlea, FleaItem>("sori_user_flea", userFleaToFleaItem);
export const useUserJobs = () => useUserItems<RawUserJob, Job>("sori_user_jobs", userJobToJob);
export const useUserRealty = () => useUserItems<RawUserRealty, RealtyItem>("sori_user_realty", userRealtyToRealtyItem);
export const useUserBiz = () => useUserItems<RawUserBiz, Business>("sori_user_biz", userBizToBusiness);

// 사용자 글 ID 집합 (배지 표시용)
export function useUserIdSet(key: string): Set<string> {
  const [set, setSet] = useState<Set<string>>(new Set());
  useEffect(() => {
    const refresh = () => {
      const arr = readArr<{ id: string }>(key);
      setSet(new Set(arr.map((x) => x.id)));
    };
    refresh();
    const handler = (e: StorageEvent) => { if (e.key === key) refresh(); };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [key]);
  return set;
}

// 사용자 글 삭제 (내가 쓴 글 관리용)
export function removeUserItem(key: string, id: string): void {
  if (!isBrowser) return;
  try {
    const arr = readArr<{ id: string }>(key);
    const next = arr.filter((x) => x.id !== id);
    localStorage.setItem(key, JSON.stringify(next));
    // 같은 탭에서도 반응하도록 수동 이벤트
    window.dispatchEvent(new StorageEvent("storage", { key }));
  } catch {}
}

// 사용자 항목의 특정 필드 업데이트 (예: status)
export function updateUserItem<T extends { id: string }>(
  key: string,
  id: string,
  patch: Partial<T>
): boolean {
  if (!isBrowser) return false;
  try {
    const arr = readArr<T>(key);
    const idx = arr.findIndex((x) => x.id === id);
    if (idx === -1) return false;
    arr[idx] = { ...arr[idx], ...patch };
    localStorage.setItem(key, JSON.stringify(arr));
    window.dispatchEvent(new StorageEvent("storage", { key }));
    return true;
  } catch {
    return false;
  }
}
