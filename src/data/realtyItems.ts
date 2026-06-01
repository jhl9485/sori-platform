export type RealtyType = "콘도" | "HDB" | "서비스아파트" | "하우스" | "사무실";
export type RealtyDeal = "매매" | "룸렌트" | "렌트" | "룸메이트";
export type RealtyStatus = "가능" | "예약중" | "완료";
export type RealtyRegion = "동부" | "서부" | "남부" | "북부" | "중부";

export interface RealtyItem {
  id: string;
  type: RealtyType;
  deal: RealtyDeal;
  status?: RealtyStatus;     // 거래 상태 (기본: 가능)
  region?: RealtyRegion;     // 동서남북중 5구역
  emoji: string;
  bg: string;
  title: string;
  price: string;             // "$4,500/월" 또는 "$1,850,000"
  area: string;              // 동네 (Tanjong Pagar 등 그대로 표시)
  address: string;           // 상세 주소
  size: string;              // "92 sqm" / "990 sqft"
  bedrooms: number;
  bathrooms: number;
  floor: string;             // "중층 12층"
  furnished: "풀퍼니시" | "세미퍼니시" | "언퍼니시";
  availableFrom: string;     // 입주 가능일
  diplomaticClause: boolean; // 외국인 조기 해지 조항
  views: number;
  likes: number;
  time: string;
  agent: string;
  agentBadge?: "공인중개사" | "집주인 직거래";
  description: string;
  highlights: string[];
  mrt: string;               // 가까운 MRT
  amenities: string[];       // 편의시설
  photos?: string[];
}

export const REALTY_CATEGORIES = [
  { id: "all",   label: "전체",   icon: "🏘️" },
  { id: "콘도",  label: "콘도",   icon: "🏙️" },
  { id: "HDB",   label: "HDB",    icon: "🏢" },
  { id: "서비스아파트", label: "서비스", icon: "🏨" },
  { id: "하우스", label: "하우스", icon: "🏡" },
  { id: "사무실", label: "사무실", icon: "🏢" },
];

export const REALTY_DEALS = ["전체", "매매", "룸렌트", "렌트", "룸메이트"] as const;
export const REALTY_STATUSES = ["전체", "가능", "예약중", "완료"] as const;
export const REALTY_REGIONS = ["전체", "동부", "서부", "남부", "북부", "중부"] as const;

// 한인 밀집 동네 → 동서남북중 매핑
export const AREA_TO_REGION: Record<string, RealtyRegion> = {
  // 동부
  "Marine Parade": "동부", "East Coast": "동부", "Bedok": "동부", "Tampines": "동부", "Pasir Ris": "동부", "Changi": "동부",
  // 서부
  "Clementi": "서부", "Buona Vista": "서부", "Jurong East": "서부", "Jurong West": "서부", "Tuas": "서부", "Pioneer": "서부", "One-North": "서부",
  // 남부
  "Tanjong Pagar": "남부", "Marina Bay": "남부", "Sentosa": "남부", "Bukit Merah": "남부", "Telok Blangah": "남부", "Raffles Place": "남부",
  // 북부
  "Woodlands": "북부", "Yishun": "북부", "Sembawang": "북부", "Admiralty": "북부",
  // 중부
  "Orchard": "중부", "River Valley": "중부", "Bukit Timah": "중부", "Bishan": "중부", "Toa Payoh": "중부", "Novena": "중부", "Bugis": "중부",
};

export function getRegion(area: string): RealtyRegion | undefined {
  return AREA_TO_REGION[area];
}

export const REALTY_ITEMS: RealtyItem[] = [
  {
    id: "1",
    type: "콘도",
    deal: "렌트",
    status: "가능",
    region: "남부",
    emoji: "🏙️",
    bg: "bg-[#EBF0FB]",
    title: "Tanjong Pagar 한인 밀집 콘도 2BR — Diplomatic Clause 포함",
    price: "$4,700/월",
    area: "Tanjong Pagar",
    address: "Wallich Residence 인근 · Tanjong Pagar Road",
    size: "90 sqm (969 sqft)",
    bedrooms: 2,
    bathrooms: 2,
    floor: "중층 18층",
    furnished: "풀퍼니시",
    availableFrom: "2026-06-15",
    diplomaticClause: true,
    views: 412,
    likes: 28,
    time: "2시간 전",
    agent: "박앤리 부동산",
    agentBadge: "공인중개사",
    description: `Tanjong Pagar MRT 도보 3분, 한인 밀집 지역 핵심 위치 2베드룸 콘도입니다.

**주요 특징**
- 도시 전망 (Marina Bay 일부 조망)
- 풀퍼니시드 (가구·가전 일체 포함)
- 신축 5년차, 깨끗한 상태
- 한국인 임차인 환영, 한국어 상담 가능

협상 시 2년 계약 우대, Diplomatic Clause 기본 포함입니다.`,
    highlights: ["MRT 3분", "Marina Bay 조망", "한인 밀집", "2년 우대"],
    mrt: "Tanjong Pagar (EW15)",
    amenities: ["수영장", "헬스장", "BBQ", "24시간 경비", "지하주차장"],
  },
  {
    id: "2",
    type: "콘도",
    deal: "렌트",
    status: "예약중",
    region: "서부",
    emoji: "🌳",
    bg: "bg-[#EBF5F0]",
    title: "Buona Vista 패밀리 콘도 3BR — 한국학교/국제학교 통학권",
    price: "$5,800/월",
    area: "Buona Vista",
    address: "One-North · Buona Vista MRT 5분",
    size: "115 sqm (1,238 sqft)",
    bedrooms: 3,
    bathrooms: 2,
    floor: "고층 25층",
    furnished: "세미퍼니시",
    availableFrom: "2026-07-01",
    diplomaticClause: true,
    views: 689,
    likes: 52,
    time: "5시간 전",
    agent: "김명자 부동산",
    agentBadge: "공인중개사",
    description: `One-North 비즈니스 허브 인접, 자녀 교육 환경 우수한 3BR 콘도입니다.

**입지 강점**
- 한국학교(SKS) 셔틀 정류장 단지 앞
- 국제학교(NPS, ACSI) 도보권
- Star Vista 쇼핑몰 도보 5분
- A*STAR / Biopolis 직장인 추천

가족 단위 한인 거주자 가장 많은 단지입니다.`,
    highlights: ["한국학교 셔틀", "패밀리 친화", "Star Vista 인접"],
    mrt: "Buona Vista (EW21/CC22)",
    amenities: ["수영장", "키즈풀", "헬스장", "테니스장", "BBQ Pit", "스터디룸"],
  },
  {
    id: "3",
    type: "HDB",
    deal: "렌트",
    status: "가능",
    region: "서부",
    emoji: "🏢",
    bg: "bg-[#FBF5E8]",
    title: "Clementi HDB 4-Room — 가성비 최고, EP 가능",
    price: "$3,200/월",
    area: "Clementi",
    address: "Clementi Ave 3 · MRT 8분 도보",
    size: "90 sqm (969 sqft)",
    bedrooms: 3,
    bathrooms: 2,
    floor: "저층 5층",
    furnished: "풀퍼니시",
    availableFrom: "즉시 입주 가능",
    diplomaticClause: false,
    views: 1024,
    likes: 87,
    time: "어제",
    agent: "이정훈",
    agentBadge: "집주인 직거래",
    description: `Clementi HDB 4-Room 전체 임대 (Whole Unit). 한인 가정에 인기 높은 위치입니다.

**솔직 정보**
- 외국인 임대 정부 승인 받은 유닛 (HDB Approval 완료)
- 콘도 대비 50% 저렴, 면적은 비슷
- 단점: 수영장·헬스장 없음
- 장점: NTUC, NUS, JEM 쇼핑몰 도보권

EP/S-Pass/DP 모두 임대 가능. 1년 계약 우선.`,
    highlights: ["HDB 승인", "콘도 대비 50%", "즉시 입주"],
    mrt: "Clementi (EW23)",
    amenities: ["커뮤니티센터", "공원", "호커센터"],
  },
  {
    id: "4",
    type: "콘도",
    deal: "매매",
    status: "가능",
    region: "중부",
    emoji: "💎",
    bg: "bg-[#F5F0FF]",
    title: "River Valley 럭셔리 콘도 3BR 매매 — PR 자격 추천",
    price: "$2,850,000",
    area: "River Valley",
    address: "River Valley Road · 시내 핵심",
    size: "125 sqm (1,345 sqft)",
    bedrooms: 3,
    bathrooms: 3,
    floor: "고층 32층",
    furnished: "언퍼니시",
    availableFrom: "2026-09-01",
    diplomaticClause: false,
    views: 543,
    likes: 41,
    time: "2일 전",
    agent: "박앤리 부동산",
    agentBadge: "공인중개사",
    description: `River Valley 시내 중심, CCR 핵심 콘도 매매 매물입니다.

**투자 포인트**
- 99년 Leasehold, 잔존 92년
- 분양가 대비 -5% (시세 저점 매수 기회)
- PR 취득 시 ABSD 5%만 부담
- 외국인은 ABSD 60% 적용

장기 보유 추천 매물입니다. 가족 거주 또는 임대 운용 모두 가능.`,
    highlights: ["CCR 핵심", "분양가 -5%", "Orchard 도보권"],
    mrt: "Great World (TE15)",
    amenities: ["수영장", "헬스장", "스카이가든", "발레파킹", "24시간 컨시어지"],
  },
  {
    id: "5",
    type: "서비스아파트",
    deal: "룸렌트",
    status: "완료",
    region: "중부",
    emoji: "🏨",
    bg: "bg-[#FBF0EC]",
    title: "Orchard 서비스 아파트 1BR — 6개월 단기 (이사 전 임시)",
    price: "$6,500/월",
    area: "Orchard",
    address: "Orchard Road · ION 인근",
    size: "55 sqm (592 sqft)",
    bedrooms: 1,
    bathrooms: 1,
    floor: "고층 22층",
    furnished: "풀퍼니시",
    availableFrom: "2026-06-01",
    diplomaticClause: false,
    views: 287,
    likes: 14,
    time: "3일 전",
    agent: "Frasers Hospitality",
    agentBadge: "공인중개사",
    description: `Orchard 한복판 서비스 아파트. 싱가포르 정착 초기 또는 단기 출장 추천.

**서비스 포함**
- 주 1회 하우스키핑
- 침구·타월 교체
- 24시간 프론트 데스크
- 조식 옵션 (+$300/월)
- 헬스장·수영장 무료 이용

최소 3개월, 최대 12개월 계약.`,
    highlights: ["Orchard 한복판", "하우스키핑 포함", "유연한 계약"],
    mrt: "Orchard (NS22)",
    amenities: ["수영장", "헬스장", "라운지", "비즈니스센터", "키즈룸"],
  },
  {
    id: "6",
    type: "콘도",
    deal: "룸메이트",
    status: "가능",
    region: "동부",
    emoji: "🌊",
    bg: "bg-[#EBF0FB]",
    title: "East Coast 1BR — 부부/싱글 추천, 신축 콘도",
    price: "$3,800/월",
    area: "East Coast",
    address: "Marine Parade · East Coast Park 도보 5분",
    size: "50 sqm (538 sqft)",
    bedrooms: 1,
    bathrooms: 1,
    floor: "중층 15층",
    furnished: "풀퍼니시",
    availableFrom: "2026-06-20",
    diplomaticClause: true,
    views: 356,
    likes: 19,
    time: "4일 전",
    agent: "정한솔",
    agentBadge: "집주인 직거래",
    description: `2025년 완공 신축 1베드룸. East Coast Park 도보권으로 운동·산책 환경 최고.

**추천 대상**
- DINK 부부 또는 싱글
- 재택 근무자 (방 공간 넉넉)
- East Coast 한식당 즐기는 분

집주인 직거래, 중개수수료 절감.`,
    highlights: ["신축", "East Coast Park", "직거래"],
    mrt: "Marine Parade (TE26, 2026 개통)",
    amenities: ["수영장", "헬스장", "BBQ", "공유 사무공간"],
  },
];
