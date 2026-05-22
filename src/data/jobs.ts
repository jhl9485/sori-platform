export type VisaType = "EP" | "S-Pass" | "WP" | "무관";
export type JobType = "정규직" | "계약직" | "파트타임" | "인턴";

export interface Job {
  id: string;
  company: string;
  companyIcon: string;
  companyBg: string;
  companyDesc: string;
  title: string;
  location: string;
  salary: string;
  visaSponsored: boolean;
  visaType: VisaType;
  jobType: JobType;
  koreanRequired: boolean;
  tags: string[];
  postedAt: string;
  deadline: string;
  views: number;
  applicants: number;
  isNew: boolean;
  isUrgent: boolean;
  description: string;
  requirements: string[];
  preferred: string[];
  benefits: string[];
}

export const JOBS: Job[] = [
  {
    id: "1",
    company: "Samsung Electronics SG",
    companyIcon: "📱",
    companyBg: "bg-[#EBF0FB]",
    companyDesc: "글로벌 전자 기업 삼성전자 싱가포르 법인. APAC 리전 R&D 허브.",
    title: "Senior Software Engineer (Mobile)",
    location: "One-North · Buona Vista",
    salary: "$8,000 ~ $12,000",
    visaSponsored: true,
    visaType: "EP",
    jobType: "정규직",
    koreanRequired: false,
    tags: ["React Native", "iOS", "Android", "TypeScript"],
    postedAt: "1시간 전",
    deadline: "2026-06-30",
    views: 1240,
    applicants: 34,
    isNew: true,
    isUrgent: false,
    description: "글로벌 모바일 앱 개발팀에서 함께 할 시니어 개발자를 찾습니다. APAC 리전 사용자를 위한 모바일 애플리케이션 개발 및 최적화를 담당합니다.",
    requirements: [
      "모바일 앱 개발 경력 5년 이상 (iOS 또는 Android)",
      "React Native 또는 Flutter 실무 경험",
      "TypeScript / JavaScript 숙련자",
      "RESTful API 및 GraphQL 경험",
      "영어 비즈니스 커뮤니케이션 가능",
    ],
    preferred: [
      "한국어 가능자 우대",
      "대용량 트래픽 서비스 경험",
      "CI/CD 파이프라인 구축 경험",
      "성능 최적화 경험",
    ],
    benefits: [
      "EP 비자 스폰서",
      "연간 성과급 (1~4개월)",
      "의료보험 + 치과보험",
      "유연근무제 (주 2회 재택)",
      "교육비 지원 연 SGD 2,000",
    ],
  },
  {
    id: "2",
    company: "강남부식 Pte Ltd",
    companyIcon: "🍱",
    companyBg: "bg-[#EBF5F0]",
    companyDesc: "싱가포르 대표 한식 레스토랑 체인. 3개 지점 운영 중.",
    title: "한식 조리사 (경력 3년 이상)",
    location: "Tanjong Pagar · Bugis",
    salary: "$3,500 ~ $4,500",
    visaSponsored: true,
    visaType: "S-Pass",
    jobType: "정규직",
    koreanRequired: true,
    tags: ["한식", "조리사", "요리"],
    postedAt: "5시간 전",
    deadline: "2026-06-10",
    views: 543,
    applicants: 8,
    isNew: false,
    isUrgent: true,
    description: "싱가포르 최대 한식 레스토랑 체인에서 열정 있는 조리사를 모집합니다. 한국 정통 맛을 싱가포르에서 선보일 분을 찾습니다.",
    requirements: [
      "한식 조리 경력 3년 이상",
      "조리사 자격증 보유자",
      "한국어 가능 (필수)",
      "위생 관리 능력",
      "팀 협업 능력",
    ],
    preferred: [
      "갈비탕, 설렁탕 등 국물 요리 전문",
      "해외 레스토랑 근무 경험",
    ],
    benefits: [
      "S-Pass 비자 스폰서",
      "숙소 제공 또는 주거 지원금",
      "식사 제공 (2회/일)",
      "연간 항공권 1회",
      "퇴직금 적립",
    ],
  },
  {
    id: "3",
    company: "KEB 하나은행 싱가포르",
    companyIcon: "🏦",
    companyBg: "bg-[#FBF5E8]",
    companyDesc: "한국 4대 시중은행 하나은행 싱가포르 지점.",
    title: "재무 분석가 (Finance Analyst)",
    location: "Marina Bay · Raffles Place",
    salary: "$6,000 ~ $9,000",
    visaSponsored: true,
    visaType: "EP",
    jobType: "정규직",
    koreanRequired: true,
    tags: ["Finance", "Bloomberg", "Excel", "CFA"],
    postedAt: "2일 전",
    deadline: "2026-06-20",
    views: 934,
    applicants: 23,
    isNew: false,
    isUrgent: false,
    description: "하나은행 싱가포르 지점 리테일/기업금융 부서에서 재무 분석 업무를 담당할 분을 모집합니다. 한-싱 비즈니스 네트워크를 활용한 기업금융 지원 업무입니다.",
    requirements: [
      "재무/금융 관련 학사 이상",
      "금융기관 경력 2년 이상",
      "한국어/영어 모두 비즈니스 레벨",
      "Excel, Bloomberg 사용 능숙",
      "MAS 규정 이해",
    ],
    preferred: [
      "CFA 또는 CPA 보유자 우대",
      "싱가포르 금융기관 경험",
      "한국-싱가포르 무역금융 경험",
    ],
    benefits: [
      "EP 비자 스폰서",
      "성과급 (연 1-3개월)",
      "의료보험 (가족 포함)",
      "연금 기여",
      "전문 자격증 취득 지원",
    ],
  },
];
