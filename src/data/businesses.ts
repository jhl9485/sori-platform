export type BizCategory = "한식" | "뷰티" | "마트" | "병원" | "학원" | "부동산" | "법무" | "이사" | "카페" | "주점";

export interface BizReview {
  id: string;
  author: string;
  avatarChar: string;
  avatarBg: string;
  avatarColor: string;
  rating: number;
  content: string;
  time: string;
  images?: string[];
}

export interface Business {
  id: string;
  name: string;
  category: BizCategory;
  emoji: string;
  bg: string;
  address: string;
  area: string;
  rating: number;
  reviewCount: number;
  isOpen: boolean;
  openHours: string;
  phone: string;
  tags: string[];
  priceRange: string;
  description: string;
  fullDescription: string;
  reviews: BizReview[];
}

export const BIZ_CATEGORIES = [
  { id: "all",    label: "전체",   icon: "🏪" },
  { id: "한식",   label: "한식",   icon: "🍱" },
  { id: "뷰티",   label: "뷰티",   icon: "💅" },
  { id: "마트",   label: "마트",   icon: "🛒" },
  { id: "병원",   label: "병원",   icon: "🏥" },
  { id: "학원",   label: "학원",   icon: "📚" },
  { id: "부동산", label: "부동산", icon: "🏠" },
  { id: "법무",   label: "법무",   icon: "⚖️" },
  { id: "이사",   label: "이사",   icon: "📦" },
  { id: "카페",   label: "카페",   icon: "☕" },
  { id: "주점",   label: "주점",   icon: "🍻" },
];

export const BUSINESSES: Business[] = [
  {
    id: "1",
    name: "강남부식",
    category: "한식",
    emoji: "🍱",
    bg: "bg-[#FBF0EC]",
    address: "10 Tanjong Pagar Plaza, #02-23",
    area: "Tanjong Pagar",
    rating: 4.8,
    reviewCount: 124,
    isOpen: true,
    openHours: "11:00 - 22:00",
    phone: "+65 6222 1234",
    tags: ["갈비탕", "설렁탕", "한정식", "포장가능"],
    priceRange: "$$",
    description: "25년 전통 한식 맛집. 서울에서 직접 공수한 재료만 사용합니다.",
    fullDescription: `25년 전통의 한식 전문점입니다. 1999년 창업 이래 싱가포르 한인 커뮤니티의 단골 맛집으로 자리잡았습니다.

모든 재료는 한국에서 직접 공수하며, 화학조미료를 사용하지 않는 정통 한식을 선보입니다. 갈비탕과 설렁탕은 12시간 이상 뭉근히 끓여 진한 국물 맛을 자랑합니다.

단체 예약 가능 (10인 이상), 포장 주문 환영합니다.`,
    reviews: [
      {
        id: "r1",
        author: "이만지햄버",
        avatarChar: "이",
        avatarBg: "#FBF0EC",
        avatarColor: "#D04020",
        rating: 5,
        content: "갈비탕이 진짜 한국 맛 그대로예요. 국물이 너무 진하고 깔끔해서 감동받았어요. 싱가포르에서 이런 맛 먹을 수 있을 줄 몰랐어요.",
        time: "1주일 전",
      },
      {
        id: "r2",
        author: "박싱가",
        avatarChar: "박",
        avatarBg: "#EBF5F0",
        avatarColor: "#2B7A50",
        rating: 4,
        content: "설렁탕이 맛있어요. 양도 넉넉하고 반찬도 푸짐하게 나와요. 가격 대비 만족스럽습니다. 주말 점심엔 좀 기다려야 해요.",
        time: "2주일 전",
      },
    ],
  },
  {
    id: "2",
    name: "서울뷰티",
    category: "뷰티",
    emoji: "💅",
    bg: "bg-[#EBF0FB]",
    address: "313 Orchard Road, #03-12",
    area: "Orchard",
    rating: 4.6,
    reviewCount: 89,
    isOpen: true,
    openHours: "10:00 - 21:00",
    phone: "+65 6733 5678",
    tags: ["네일아트", "속눈썹", "왁싱", "예약필수"],
    priceRange: "$$",
    description: "한국식 네일아트 & 뷰티 케어 전문점. 한국어 상담 가능합니다.",
    fullDescription: `한국식 감성으로 운영하는 뷰티 살롱입니다. 한국에서 10년 경력의 원장님이 직접 시술하며, 최신 한국 네일 트렌드를 반영합니다.

**시술 메뉴**
- 젤 네일 (from $45)
- 속눈썹 연장 (from $80)
- 눈썹 왁싱 (from $25)
- 페디큐어 (from $55)

예약 필수이며, 카카오톡으로도 예약 가능합니다. (@seoulbeautysg)`,
    reviews: [
      {
        id: "r3",
        author: "김뷰티",
        avatarChar: "김",
        avatarBg: "#EBF0FB",
        avatarColor: "#2050A0",
        rating: 5,
        content: "한국에서 하는 것처럼 섬세하게 해주세요. 디자인도 최신 트렌드 다 알고 계세요. 이제 여기 단골입니다!",
        time: "3일 전",
      },
    ],
  },
  {
    id: "3",
    name: "K-마트 부오나비스타",
    category: "마트",
    emoji: "🛒",
    bg: "bg-[#EBF5F0]",
    address: "1 Vista Exchange Green, #B1-10",
    area: "Buona Vista",
    rating: 4.5,
    reviewCount: 201,
    isOpen: true,
    openHours: "09:00 - 22:00",
    phone: "+65 6779 9999",
    tags: ["한국식품", "라면", "과자", "냉동식품", "주류"],
    priceRange: "$",
    description: "싱가포르 최대 한인 마트. 한국 직수입 제품 1000여 종 취급.",
    fullDescription: `싱가포르 내 최대 규모의 한인 전문 마트입니다. 한국에서 직수입한 신선 식품, 냉동 식품, 과자, 음료, 주류 등 1,000여 종의 한국 제품을 만나볼 수 있습니다.

**주요 취급 품목**
- 신선 야채/과일 (한국산)
- 냉동 만두, 삼겹살, 갈비 등
- 라면 전 종류
- 한국 과자, 음료
- 한국 소주, 막걸리, 맥주
- 반찬류 (김치, 젓갈 등)

주차 가능, 온라인 주문 배달 서비스도 운영 중입니다.`,
    reviews: [
      {
        id: "r4",
        author: "최한식러버",
        avatarChar: "최",
        avatarBg: "#FBF5E8",
        avatarColor: "#B07010",
        rating: 5,
        content: "없는 게 없어요! 진짜 한국 마트 그대로예요. 삼겹살이랑 소주 사러 주기적으로 방문해요.",
        time: "1주일 전",
      },
    ],
  },
  {
    id: "4",
    name: "박앤리 이민법무법인",
    category: "법무",
    emoji: "⚖️",
    bg: "bg-[#F0EDE8]",
    address: "1 Raffles Place, #35-01",
    area: "Raffles Place",
    rating: 4.8,
    reviewCount: 34,
    isOpen: false,
    openHours: "09:00 - 18:00 (주말휴무)",
    phone: "+65 6533 8800",
    tags: ["비자", "노동법", "이민", "창업", "한국어"],
    priceRange: "$$$",
    description: "한국인 변호사 보유. 비자·이민·노동 분쟁 전문 법무법인.",
    fullDescription: `싱가포르 현지 한국인 변호사가 직접 상담하는 이민 전문 법무법인입니다.

**전문 분야**
- EP / S-Pass / 취업비자 신청 및 갱신
- PR (영주권) 신청
- 한국-싱가포르 이중 국적 문제
- 노동법 분쟁 (부당해고, 임금 체불 등)
- 법인 설립 및 창업 컨설팅
- 이혼 및 가족법

**초기 상담**: 30분 무료 (예약 필수)
**언어**: 한국어, 영어 모두 가능

카카오톡 @parknleelaw 으로 문의주세요.`,
    reviews: [
      {
        id: "r5",
        author: "이EP문제",
        avatarChar: "이",
        avatarBg: "#EBF0FB",
        avatarColor: "#2050A0",
        rating: 5,
        content: "EP 갱신 거절당했을 때 도움받았어요. 한국어로 상세히 설명해 주셔서 이해하기 쉬웠고, 결국 재신청으로 승인받았습니다. 정말 감사해요.",
        time: "2주일 전",
      },
    ],
  },
];
