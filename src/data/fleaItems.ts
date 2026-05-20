export interface FleaItem {
  id: string;
  category: string;
  emoji: string;
  bg: string;
  title: string;
  price: string;
  originalPrice: string | null;
  location: string;
  area: string;
  time: string;
  condition: "새상품" | "최상" | "상태좋음" | "좋음" | "보통";
  isUrgent: boolean;
  likes: number;
  views: number;
  seller: string;
  sellerEmoji: string;
  sellerSince: string;
  sellerDeals: number;
  description: string;
  canDeliver: boolean;
  canMeet: boolean;
}

export const FLEA_CATEGORIES = ["전체", "가전/가구", "의류/잡화", "식품", "도서", "유아용품", "디지털", "기타"];

export const FLEA_ITEMS: FleaItem[] = [
  {
    id: "1",
    category: "가전/가구",
    emoji: "❄️",
    bg: "bg-[#EBF0FB]",
    title: "다이킨 에어컨 2년사용 (5 ticks)",
    price: "$380",
    originalPrice: null,
    location: "Bishan MRT 근처",
    area: "Bishan",
    time: "10분 전",
    condition: "상태좋음",
    isUrgent: true,
    likes: 18,
    views: 234,
    seller: "윤귀국",
    sellerEmoji: "👤",
    sellerSince: "2022",
    sellerDeals: 12,
    description: `귀국 준비로 에어컨 판매합니다.

**제품 정보**
- 모델: Daikin FTKF25D
- 구매일: 2023년 3월
- 사용 기간: 약 2년
- Energy Label: 5 ticks (최고 등급)
- BTU: 9,000

**상태**
정상 작동 확인했습니다. 외관 스크래치 없고 리모컨 포함이에요. 분리 비용은 별도 협의 가능합니다.

**거래 방법**
Bishan 직거래 선호. 멀리 계신 분은 편의점 택배 가능 (비용 실비)

**협상 불가** 급하게 처분해야 해서요.`,
    canDeliver: false,
    canMeet: true,
  },
  {
    id: "2",
    category: "디지털",
    emoji: "💻",
    bg: "bg-[#EBF5F0]",
    title: "맥북 프로 M2 14인치 (2023) 256GB",
    price: "$1,800",
    originalPrice: "$2,500",
    location: "Tanjong Pagar",
    area: "Tanjong Pagar",
    time: "1시간 전",
    condition: "최상",
    isUrgent: false,
    likes: 67,
    views: 892,
    seller: "김테크",
    sellerEmoji: "👤",
    sellerSince: "2021",
    sellerDeals: 8,
    description: `회사 지급품 반납 후 개인 구매한 맥북입니다.

**스펙**
- 모델: MacBook Pro 14" M2 (2023)
- 저장공간: 256GB SSD
- 메모리: 16GB
- 색상: Space Gray
- 배터리: 92% (System Report 확인 가능)

**포함 구성**
- 맥북 본체
- 67W 충전 어댑터 (국내 규격)
- 박스 (있음)

Apple Care 가입되어 있으며 2025년 9월까지 남아있어요. 양도 가능합니다.`,
    canDeliver: false,
    canMeet: true,
  },
  {
    id: "3",
    category: "유아용품",
    emoji: "🛒",
    bg: "bg-[#FFF0F5]",
    title: "스토케 익스플로리 유모차 + 카시트 세트",
    price: "$450",
    originalPrice: "$1,200",
    location: "Buona Vista",
    area: "Buona Vista",
    time: "3시간 전",
    condition: "좋음",
    isUrgent: false,
    likes: 28,
    views: 345,
    seller: "정이맘",
    sellerEmoji: "👤",
    sellerSince: "2023",
    sellerDeals: 5,
    description: `아이가 커서 더 이상 사용하지 않아 판매합니다.

**포함 제품**
- Stokke Xplory X 유모차 (블랙)
- Stokke iZi Go Modular 카시트
- 레인 커버
- 풋머프 (보온 발 커버)

**상태**
일부 사용감 있으나 기능적으로 완전 정상입니다. 세척 완료했어요.

구매 전 실물 확인 환영합니다. Buona Vista 만남 가능.`,
    canDeliver: false,
    canMeet: true,
  },
];
