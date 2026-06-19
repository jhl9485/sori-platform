export interface NewsSource {
  name: string;   // 예: "CNA", "Straits Times"
  url: string;    // 원문 기사 링크
}

export interface NewsItem {
  id: string;
  publishedAt: string;   // 정렬용 ISO 날짜 "YYYY-MM-DD" — 최신순 정렬 기준
  category: string;
  catStyle: string;
  title: string;
  summary: string;
  fullContent: string;
  source: string;        // 대표 출처 라벨 (예: "MOM" 또는 "MOM 외 2곳"). 목록/미리보기용
  sourceUrl?: string;    // (구) 단일 원문 링크 — 하위호환
  sources?: NewsSource[]; // (신) 참고한 모든 기사 출처. 여러 기사 종합 요약 시 전부 명시
  time: string;
  isBreaking: boolean;
  readTime: string;
  emoji: string;
  relatedIds: string[];
}

// 실제 출처 기반 싱가포르 뉴스 (2026년 1~6월). 모든 항목은 웹 검색으로 확인한 실제 자료를
// 한인 커뮤니티에 유용한 정보 위주로 한국어 요약한 것이며, 참고한 출처를 sources[]에 명시한다.
// ⚠️ AI 요약 특성상 원문과 차이가 있을 수 있어, 각 상세 페이지에 "원문 확인 권고"가 표시된다.
const RAW_NEWS_ITEMS: NewsItem[] = [
  {
    id: "19",
    publishedAt: "2026-06-19",
    category: "건강",
    catStyle: "bg-[#EBF5F0] text-[#2B7A50]",
    title: "🦟 뎅기열 2026년 주간 최다 발생 — 6월 13일 주 119건, 북부 레드얼럿 클러스터 주의",
    summary: "NEA 집계 기준 6월 13일로 끝나는 주에 뎅기 119건 확진(2026년 주간 최다, 전주比 +39). 누적 약 938건으로 피크 시즌 진입. 6월 15일 기준 활성 클러스터 12곳 중 4곳 레드얼럿. 북부 거주 한인 가정 모기 번식 방지 주의.",
    fullContent: `**2026년 뎅기열 주간 최다 발생**
국가환경청(NEA) 집계 기준, 6월 13일로 끝나는 주에 뎅기열 확진이 급증했습니다.

**현황**
- 해당 주 확진: **119건** (2026년 주간 최다, 전주 대비 +39건)
- 누적(1/1~6/13): 약 **938건**
- 피크 시즌(5~10월) 진입

**클러스터 경보 (6월 15일 기준)**
- 활성 클러스터 **12곳**, 그중 **4곳이 레드얼럿**(10건 이상·확산 가속)
- 특히 **북부 지역** 주의

**한인 가정 예방 체크리스트**
- 화분 받침대·에어컨 응결수 받이 고인 물 즉시 제거
- 발코니 양동이·물통 뒤집어 보관, 배수구 주 1회 청소
- 고열·심한 두통·관절통 시 GP/폴리클리닉 방문, NS1 검사 요청

실시간 클러스터(빨간 구역)는 NEA myENV 앱·haze.gov.sg에서 확인하세요.`,
    source: "NEA · Medical Daily",
    sources: [
      { name: "Medical Daily — Singapore Dengue 2026 (NEA 인용)", url: "https://www.medicaldaily.com/singapore-dengue-cases-2026-high-red-alert-clusters-june-475672" },
      { name: "NEA haze.gov.sg", url: "https://www.haze.gov.sg/home" },
    ],
    time: "2026년 6월 19일",
    isBreaking: true,
    readTime: "3분",
    emoji: "🦟",
    relatedIds: ["30"],
  },
  {
    id: "28",
    publishedAt: "2026-02-26",
    category: "사회",
    catStyle: "bg-[#F5F0FF] text-[#7040C0]",
    title: "🚨 2025년 사기 첫 감소 27.6%↓ — 그러나 'PR 신청 대행' 사칭 사기 한인 주의보",
    summary: "싱가포르 경찰(SPF) 발표: 2025년 사기 건수 37,308건으로 전년比 27.6% 첫 감소, 피해액 약 S$9.13억. 다만 2026년 들어 'PR 신청 대행' 사칭 사기 24건(피해 약 S$39.7만) 발생 — PR 신청하는 한인 표적 가능, 각별 주의.",
    fullContent: `**2025년 사기 통계 (2026년 2월 발표)**
싱가포르 경찰청(SPF)이 2025년 사기·사이버범죄 통계를 발표했습니다.

**전체 현황**
- 사기 건수: **37,308건** (2024년 51,501건 대비 **27.6% 감소** — 통계 분리 이후 첫 감소)
- 피해액: 약 **S$9.13억** (2024년 S$11.24억 대비 17.9%↓)
- 단, 1인당 평균 피해액은 상승

**⚠️ 한인 주의 — PR 신청 대행 사칭 사기**
- 2026년 1월 이후 'PR(영주권) 신청을 도와주겠다'는 가짜 광고·서류·공식기관 사칭 사기 **24건**, 피해 약 **S$39.7만**
- ICA 등 공식 절차는 정부 포털에서만 진행 — SNS 광고·대행 업체 통한 선입금 요구는 사기 의심

**예방 수칙**
- 정부 기관은 메신저·SNS DM으로 송금·개인정보를 요구하지 않음
- 의심 시 ScamShield 앱·1799(안티스캠 핫라인) 확인

정확한 최신 통계·경보는 아래 출처(SPF)를 확인하세요.`,
    source: "SPF · The Online Citizen",
    sources: [
      { name: "SPF — Scams and Cybercrime Fell in 2025", url: "https://www.police.gov.sg/Media-Hub/Police-Life/2026/02/Scams-and-Cybercrime-Fell-by-Almost-a-Quarter-in-2025" },
      { name: "SPF — PR 신청 사기 경보", url: "https://www.police.gov.sg/Media-Hub/News/2026/04/20260422_police_advisory_on_scam_variant_involving_fraudulent_social_media_advertisements_teaser" },
      { name: "The Online Citizen — 사기 27.6% 감소", url: "https://theonlinecitizen.com/2026/02/25/scam-cases-in-singapore-fall-27-6-per-cent-in-first-recorded-decrease" },
    ],
    time: "2026년 2월 26일",
    isBreaking: false,
    readTime: "3분",
    emoji: "🚨",
    relatedIds: ["17"],
  },
  {
    id: "20",
    publishedAt: "2026-02-12",
    category: "경제",
    catStyle: "bg-[#EBF0FB] text-[#2050A0]",
    title: "💰 Budget 2026 발표 (2월 12일) — CDC 바우처 $500·생활비 현금 $200~400, 단 시민·PR 대상",
    summary: "로런스 웡 총리 Budget 2026 발표: 전 가구 CDC 바우처 S$500(2027년 1월), 생활비 특별현금 S$200~400, U-Save 추가 환급, 자녀 LifeSG 크레딧 S$500 등. ⚠️ 대부분 시민·PR 대상이라 EP/DP 한인은 직접 혜택 제한적.",
    fullContent: `**Budget 2026 (2026년 2월 12일, 로런스 웡 총리 발표)**
싱가포르 정부가 2026년도 예산안을 발표했습니다. 생활비 지원이 핵심입니다.

**주요 지원 (대부분 싱가포르 시민·일부 PR 대상)**
- **CDC 바우처 S$500** / 전 가구 (2027년 1월 지급)
- **생활비 특별현금 S$200~400** (21세 이상·과세소득 S$10만 이하·주택 1채 이하 시민)
- **U-Save 환급** 1.5배 (HDB 가구, 연 최대 약 S$570~760)
- **자녀 LifeSG 크레딧 S$500** (12세 이하 시민 자녀)
- 영유아·보육 추가 보조금 소득기준 상향(월 S$1.2만 → S$1.5만)

**⚠️ EP/DP 한인 입장에서 꼭 알 점**
- CDC 바우처·생활비 현금·U-Save 등 **대부분 시민(일부 PR) 대상**으로, EP·DP 비자 한인 가구는 **직접 수혜 대상이 아닌 경우가 많습니다.**
- 다만 물가·정책 방향(생활비 보전 기조)은 전체 거주자에게 영향.

정확한 자격·금액은 아래 공식 출처(SupportGoWhere)에서 확인하세요.`,
    source: "MOF · Mothership · DollarsAndSense",
    sources: [
      { name: "SupportGoWhere — Budget 2026 (정부 공식)", url: "https://supportgowhere.life.gov.sg/budget-2026" },
      { name: "Mothership — CDC 바우처·생활비 지원", url: "https://mothership.sg/2026/02/cdc-vouchers-500-budget-2026/" },
      { name: "DollarsAndSense — Budget 2026 핵심 5가지", url: "https://dollarsandsense.sg/singapore-budget-2026-5-announcements-that-will-benefit-everyday-singaporeans-financially/" },
    ],
    time: "2026년 2월 12일",
    isBreaking: false,
    readTime: "4분",
    emoji: "💰",
    relatedIds: ["30", "17"],
  },
  {
    id: "17",
    publishedAt: "2026-03-03",
    category: "비자/취업",
    catStyle: "bg-[#EBF0FB] text-[#2050A0]",
    title: "💼 EP 최저급여 2027년 $6,000으로 인상 + 'ONE Pass (AI·Tech)' 신설 — Budget 2026 확정",
    summary: "MOM Budget 2026 발표: 일반 EP 최저 월급여 2027년 1월(신규)·2028년 1월(갱신)부터 $5,600→$6,000, 금융권 $6,200→$6,600. 2026년 현재는 아직 $5,600. 2027년 1월 Tech.Pass 대체 'ONE Pass (AI and Tech)' 신설 예정.",
    fullContent: `**Budget 2026 외국인력 정책 변경**
싱가포르 인력부(MOM)가 Budget 2026에서 Employment Pass(EP) 등 외국인력 정책 변경을 발표했습니다.

**EP 최저 월급여 인상 (2027~2028 적용)**
- 일반 업종: $5,600 → **$6,000** (2027년 1월 신규 / 2028년 1월 갱신부터)
- 금융 서비스업: $6,200 → **$6,600**
- ※ 2026년 현재는 아직 일반 $5,600 / 금융 $6,200

**ONE Pass (AI and Tech) 신설**
- 2027년 1월 기존 Tech.Pass를 대체하는 새 트랙 도입 예정
- AI·테크 인재 유치 강화 목적, 더 유리한 조건 제공 예정

**한인 체크리스트**
- EP 갱신 예정자는 인상 시점(2028년 갱신)에 맞춰 급여 기준 사전 확인
- COMPASS 40점 기준은 계속 적용 — 급여가 기준을 간신히 넘으면 사전 자가진단 권장

정확한 기준과 최신 발표는 반드시 MOM 공식 자료(아래 출처)를 확인하세요.`,
    source: "MOM · Newland Chase",
    sources: [
      { name: "MOM 공식 factsheet (2026-03-03)", url: "https://www.mom.gov.sg/-/media/mom/documents/press-releases/2026/factsheet-on-foreign-workforce-policies-03032026.pdf" },
      { name: "Newland Chase — 외국인력 정책 변경", url: "https://newlandchase.com/singapore-announces-further-updates-to-foreign-workforce-policies/" },
      { name: "Slasify — SG 취업비자 2026 가이드", url: "https://slasify.com/en/blog/singapore-work-visas-2026-guide" },
    ],
    time: "2026년 3월 3일",
    isBreaking: false,
    readTime: "3분",
    emoji: "💼",
    relatedIds: ["21", "20"],
  },
  {
    id: "21",
    publishedAt: "2026-02-12",
    category: "비자/취업",
    catStyle: "bg-[#EBF0FB] text-[#2050A0]",
    title: "🪪 S Pass 최저급여 2026년 $3,300 — 7월부터 LQS $1,800로 인상, 2027년 추가 인상 예고",
    summary: "2026년 S Pass 최저 월급여 S$3,300(금융 S$3,800), 연령에 따라 상향. 7월 1일부터 로컬 자격급여(LQS) S$1,600→S$1,800로 인상돼 쿼터 산정에 영향. S Pass 레비 월 S$650. 2027년 1월 최저 S$3,600/4,000으로 추가 인상 예정.",
    fullContent: `**S Pass 2026년 기준 (MOM)**
중급 숙련 외국인력 대상 S Pass의 2026년 기준입니다.

**최저 급여**
- 일반: **월 S$3,300** / 금융 서비스: **S$3,800**
- 연령이 높을수록 요구 최저급여 상향
- 2027년 1월부터: 일반 **S$3,600** / 금융 **S$4,000**로 추가 인상 예정

**LQS(로컬 자격급여) 인상 — 고용주 영향**
- 2026년 7월 1일부터 풀타임 로컬 직원 LQS **S$1,600 → S$1,800**
- LQS는 S Pass·Work Permit 쿼터 산정 기준 — 한인 자영업·요식업 고용주에 영향

**레비·쿼터**
- S Pass 레비: 월 **S$650** (고용주 부담, 급여 공제 불가)
- 쿼터: 서비스업 10% / 제조업 15%

정확한 기준은 MOM 공식 안내(아래 출처)를 확인하세요.`,
    source: "MOM · One Visa · Newland Chase",
    sources: [
      { name: "MOM — S Pass 자격 변경 안내", url: "https://www.mom.gov.sg/maintenance/passes-and-permits/s-pass/upcoming-changes-to-s-pass-eligibility" },
      { name: "One Visa — S Pass 최저급여 2026", url: "https://www.one-visa.com/s-pass-minimum-salary-for-2026-what-to-know/" },
      { name: "Newland Chase — 외국인력 정책", url: "https://newlandchase.com/singapore-announces-further-updates-to-foreign-workforce-policies/" },
    ],
    time: "2026년 2월",
    isBreaking: false,
    readTime: "3분",
    emoji: "🪪",
    relatedIds: ["17"],
  },
  {
    id: "26",
    publishedAt: "2025-12-27",
    category: "교통",
    catStyle: "bg-[#EBF5F0] text-[#2B7A50]",
    title: "🚇 대중교통 요금 5% 인상 (2025년 12월 27일 시행) — 성인 최대 10센트↑, 카드가 현금보다 저렴",
    summary: "교통위원회(PTC) 2025 요금심사로 12월 27일부터 대중교통 요금 5.0% 인상(최대 허용 14.4%보다 낮음). 성인 버스·MRT 최대 10센트↑, 학생·노인 등 최대 4센트↑. 카드(EZ-Link·SimplyGo·컨택리스)가 현금보다 트립당 약 S$0.22 저렴.",
    fullContent: `**대중교통 요금 조정 (2025년 12월 27일 시행, 2026년 적용 중)**
교통위원회(PTC)의 2025 요금심사 결과가 시행됐습니다.

**인상폭**
- 전체 **5.0% 인상** (최대 허용폭 14.4%보다 크게 낮은 수준)
- 성인 버스·MRT: 트립당 최대 **10센트** 인상
- 학생·노인·장애인·Workfare 대상: 최대 4센트 인상

**한인 생활 팁**
- **카드 결제가 현금보다 트립당 약 S$0.22 저렴** — EZ-Link·SimplyGo·해외 컨택리스 카드 활용
- 성인 카드 요금은 3.2km 이하 약 S$1.28부터 시작, 장거리 약 S$2.57 수준
- 정부는 2026년 대중교통에 22억 달러 이상 지원 중

정확한 구간별 요금은 아래 출처(MOT/SimplyGo)를 확인하세요.`,
    source: "PTC · MOT · TimeOut",
    sources: [
      { name: "MOT — 대중교통 지원·요금", url: "https://www.mot.gov.sg/news-resources/newsroom/more-than--2-2-billion-government-support-for-public-transport/" },
      { name: "SimplyGo — 성인 요금표", url: "https://simplygo.com.sg/travel-fares/adult-fares/" },
      { name: "TimeOut — 12월 27일 요금 인상", url: "https://www.timeout.com/singapore/news/singapores-public-transport-fares-will-be-increasing-once-again-on-december-27-2025-101525" },
    ],
    time: "2025년 12월 27일",
    isBreaking: false,
    readTime: "2분",
    emoji: "🚇",
    relatedIds: ["29"],
  },
  {
    id: "27",
    publishedAt: "2026-02-17",
    category: "생활",
    catStyle: "bg-[#F5F0FF] text-[#7040C0]",
    title: "🧧 설날(춘절) 2026년 2월 17~18일 — 말의 해, 2026년 공휴일 총 11일",
    summary: "2026년 춘절(Chinese New Year)은 2월 17일(화)·18일(수) 공식 공휴일. 말의 해. 2월 16일(월) 연차 시 토~수 4일 연휴. 2026년 싱가포르 법정 공휴일은 총 11일(춘절·하리라야·디파발리·크리스마스·노동절·건국기념일 등).",
    fullContent: `**2026년 춘절 & 공휴일 안내**
한인 가정의 연휴·여행 계획에 참고하세요.

**춘절(Chinese New Year) 2026**
- 공식 공휴일: **2월 17일(화)·18일(수)** — 말(馬)의 해
- 2월 16일(월) 연차 사용 시 **2/15(토)~2/18(수) 4일 연휴**
- 축제는 15일간 이어지며 정월대보름(Lantern Festival)으로 마무리

**2026년 법정 공휴일 (총 11일)**
- 신정, 춘절(2일), 성금요일, 노동절, 하리라야 푸아사, 베삭데이, 하리라야 하지, 건국기념일(8/9), 디파발리, 크리스마스 등

**팁**
- 춘절 연휴엔 한국행 항공권 수요·가격 상승 — 미리 예약
- 일부 한인 업소·마트 단축영업 가능, 방문 전 확인

정확한 날짜는 아래 출처를 확인하세요.`,
    source: "MOM · M1 · Foodline",
    sources: [
      { name: "M1 — 2026 공휴일 가이드", url: "https://www.m1.com.sg/blog/personal/public-holidays-2026-singapore-long-weekend" },
      { name: "Eskimo Travel — CNY 2026", url: "https://www.eskimo.travel/en/blog/chinese-new-year-singapore-2026" },
    ],
    time: "2026년 2월",
    isBreaking: false,
    readTime: "2분",
    emoji: "🧧",
    relatedIds: [],
  },
  {
    id: "25",
    publishedAt: "2026-02-15",
    category: "생활",
    catStyle: "bg-[#FBF5E8] text-[#B07010]",
    title: "🚗 COE(차량 권리증) 2026년 2월 전 카테고리 하락 — Cat B 8.8%↓ $110,890",
    summary: "2026년 2월 첫 입찰서 COE 프리미엄이 전 카테고리 하락. Cat B(대형) -8.8% S$110,890, Cat A(소형) -2.9% S$106,320. 1월 2차 입찰은 Cat A S$109,501·Cat B S$121,634. 2~4월 쿼터 1.489% 감축. 차량 소유는 여전히 고비용.",
    fullContent: `**COE 동향 (2026년 1~2월)**
싱가포르에서 차를 사려면 차량 권리증(COE)이 필요하며, 10년간 유효합니다.

**최근 낙찰가**
- **2026년 2월 1차 입찰**: 전 카테고리 하락
  - Cat A(소형): -2.9% → **S$106,320**
  - Cat B(대형): -8.8% → **S$110,890** (최대 낙폭)
- 2026년 1월 2차 입찰: Cat A S$109,501 / Cat B S$121,634 / Cat E(공개) S$120,891

**쿼터**
- 2~4월 Cat A·B·E 합산 쿼터 1.489% 감축 (14,094 → 13,884)

**한인 참고**
- COE만 약 **S$10만 이상** — 차량 총비용은 한국 대비 매우 높음
- 가족 단위가 아니면 대중교통·Grab이 보통 더 경제적

낙찰가는 격주 변동하니 최신은 아래 출처를 확인하세요.`,
    source: "LTA · Motorist · Yahoo",
    sources: [
      { name: "Motorist — COE 낙찰 결과 2026", url: "https://www.motorist.sg/coe-results" },
      { name: "Yahoo — 2월 COE 하락", url: "https://www.yahoo.com/news/article/coe-prices-cat-a-premiums-rise-to-109501-as-most-categories-see-drop-090439193.html" },
    ],
    time: "2026년 2월",
    isBreaking: false,
    readTime: "2분",
    emoji: "🚗",
    relatedIds: ["26"],
  },
  {
    id: "24",
    publishedAt: "2026-01-01",
    category: "교육",
    catStyle: "bg-[#FBF0EC] text-[#D04020]",
    title: "🏫 정부학교 외국인·PR 학비 2026년 또 인상 — 국제학생 월 최대 $140↑ (1월 시행)",
    summary: "MOE: 정부·정부지원 학교의 PR·국제학생 학비가 2024~2026년 매년 인상(1월 시행). 국제학생은 매년 월 $25~140 인상, 비아세안 국적이 더 높음. 국제학교(IB 등)는 연 약 $24,000~$40,000+. 한인 학부모 학비 부담 확대.",
    fullContent: `**MOE 정부학교 학비 인상 (2024~2026, 매년 1월)**
싱가포르 교육부(MOE)가 비시민(PR·국제학생) 학비를 3년에 걸쳐 인상해왔고, 2026년분도 1월부터 적용됐습니다.

**인상 내용**
- 국제학생: 매년 **월 S$25~140 인상** (학교급·국적별 상이)
- **비(非)아세안 국적**이 아세안 국적보다 학비 높음 — 한국은 비아세안
- 싱가포르 시민 학비는 동결(초등 무료, 중등 S$5~6 수준)

**국제학교(IB·외국계)**
- 연 학비 약 **S$24,000 ~ S$40,000+** (학년·학교별 큰 차이)
- 예: 일부 국제학교 EC~G6 약 S$24,158, G7~12 약 S$27,774

**한인 학부모 팁**
- 정부학교 vs 국제학교 비용·입학 가능성 비교 필요
- EP/DP 자녀 학생비자(Student Pass) 요건 사전 확인

정확한 학비표는 아래 MOE 공식 자료를 확인하세요.`,
    source: "MOE · Mothership · OWIS",
    sources: [
      { name: "MOE — 비시민 학비 2024~2026 (공식)", url: "https://www.moe.gov.sg/news/press-releases/20231018-revised-school-fees-for-non-citizens-in-government-and-government-aided-schools-for-2024-to-2026" },
      { name: "Mothership — 외국인 학비 인상", url: "https://mothership.sg/2023/10/permanent-residents-international-students-school-fee-increase/" },
      { name: "OWIS — 2026 국제학교 학비 가이드", url: "https://owis.org/sg/blog/guide-to-school-fees-and-cost/" },
    ],
    time: "2026년 1월",
    isBreaking: false,
    readTime: "3분",
    emoji: "🏫",
    relatedIds: ["30"],
  },
  {
    id: "23",
    publishedAt: "2026-02-11",
    category: "부동산",
    catStyle: "bg-[#FBF5E8] text-[#B07010]",
    title: "🏠 2026년 초 부동산 추가 쿨링 조치 없음 — 외국인 ABSD 60% 유지, HDB LTV 75%",
    summary: "정부는 2026년 초 부동산 추가 규제(쿨링) 도입 안 함 — 가격이 연 10% 이상 급등하지 않는 한 관망. 외국인 ABSD 60%, PR 첫 주택 5%·둘째 30% 유지. HDB 대출한도(LTV) 75%. 2023년 4월 틀 유지.",
    fullContent: `**부동산 규제 현황 (2026년 초)**
한인 임차·구매자에게 중요한 인지세·대출 규제 현황입니다.

**추가 쿨링 조치 — 당분간 없음**
- 정부(MAS·MND)는 민간주택 가격이 **연 10% 이상 급등하지 않는 한** 추가 규제 도입 안 함 방침
- 2023년 4월 조정한 ABSD 등 기존 틀 유지

**ABSD(추가 인지세) — 외국인에 큰 부담**
- **외국인: 모든 구매에 60%**
- PR: 첫 주택 5% / 둘째 30%
- 시민: 첫 0% / 둘째 20% / 셋째+ 30%

**대출(LTV)·기타**
- HDB 대출한도 LTV 75%, TDSR 55%, 매도 인지세(SSD) 보유기간 규정 등 유지

**한인 참고**
- EP 소지자 구매 시 ABSD 60%로 **매매보다 임대가 일반적으로 유리**
- PR 취득 후 첫 주택 구매 시 ABSD 5%로 절세 효과 큼

정확한 세율·요건은 아래 출처를 확인하세요.`,
    source: "MAS/MND · J&J Property · Homejourney",
    sources: [
      { name: "J&J Property — 2026 쿨링 조치 정리", url: "https://www.jjproperty.com.sg/market-insights/market-updates/singapore-property-cooling-measures-2026-what-changed-and-what-it-means-for-buye/" },
      { name: "Homejourney — ABSD 국적별 2026", url: "https://www.homejourney.sg/blog/absd-rates-by-nationality-2026-comparison-homejourney-202602112001" },
    ],
    time: "2026년 2월",
    isBreaking: false,
    readTime: "3분",
    emoji: "🏠",
    relatedIds: ["20"],
  },
  {
    id: "22",
    publishedAt: "2026-01-29",
    category: "경제",
    catStyle: "bg-[#EBF0FB] text-[#2050A0]",
    title: "📊 MAS 2026년 통화정책·물가 전망 — 수입물가 압력에 근원물가 상승 예상",
    summary: "MAS는 1월 통화정책성명 발표 후, 수입 비용 상승 영향으로 2026년 근원물가·CPI 전망을 1.5~2.5%로 상향. 근원물가는 향후 분기 상승 후 2027년 후반 평년 수준으로 완화 전망. SGD 정책밴드 운용은 환율·송금에 영향.",
    fullContent: `**MAS 통화정책 & 2026 물가 전망**
싱가포르 통화청(MAS)의 정책·물가 전망입니다. 환율에 민감한 한인에게 참고가 됩니다.

**물가 전망**
- MAS, 2026년 **근원물가·CPI 전망 1.5~2.5%로 상향** (기존 1.0~2.0%)
- 주된 요인: **수입 비용 상승**(imported cost pressures)
- 근원물가는 향후 몇 분기 약 2.5%까지 오른 뒤 2027년 후반 평년 수준으로 완화 전망

**통화정책**
- MAS는 SGD 명목실효환율(S$NEER) 정책밴드로 통화정책 운용 (1월 성명 등)
- 정책 변화는 SGD 강세/약세 → **한국 송금 환율에 직접 영향**

**한인 참고**
- SGD가 강하면 한국 송금 시 유리 — 환율 알림(Wise·Instarem) 활용
- SORI 홈 상단 실시간 환율 위젯에서 현재 시세 확인

정확한 정책·수치는 아래 MAS 공식 자료를 확인하세요.`,
    source: "MAS · ICIS",
    sources: [
      { name: "MAS — 통화정책성명 2026년 1월", url: "https://www.mas.gov.sg/news/monetary-policy-statements/2026/mas-monetary-policy-statement-29jan26" },
      { name: "ICIS — MAS 물가전망 상향", url: "https://www.icis.com/explore/resources/news/2026/04/14/11197621/singapore-tightens-monetary-policy-raises-2026-inflation-forecast/" },
    ],
    time: "2026년 1월 29일",
    isBreaking: false,
    readTime: "3분",
    emoji: "📊",
    relatedIds: ["30", "20"],
  },
  {
    id: "30",
    publishedAt: "2026-01-01",
    category: "경제",
    catStyle: "bg-[#EBF0FB] text-[#2050A0]",
    title: "🍜 GST 9% 유지 & 2026년 생활비 — 호커 한 끼 $4~8, 시민 지원금은 한인에 미적용",
    summary: "GST는 2024년 1월 8%→9% 인상 후 2026년 9% 유지. 호커 한 끼 약 S$4~8, 개인 식비 월 S$400~800 수준. 시민 대상 Assurance Package 현금·CDC 바우처 등은 EP/DP 한인에 미적용이라 체감 물가 부담이 상대적으로 큼.",
    fullContent: `**2026년 GST & 생활비**
물가에 민감한 한인 가정을 위한 정리입니다.

**GST**
- 2026년 GST **9%** 유지 (2024년 1월 8%→9% 인상, Budget 2022 2단계 인상의 완료분)
- S$100 소비당 S$9 부가

**생활비 체감**
- 호커센터 한 끼 약 **S$4~8**, 개인 식비 월 약 **S$400~800**
- 매출 S$100만 미만 소규모 호커는 GST 미부과인 경우도 있음

**⚠️ 한인(EP/DP) 입장**
- 시민·일부 PR 대상 **Assurance Package 현금(S$200~400)·CDC 바우처·U-Save** 등은 **EP/DP 한인 가구에 적용되지 않는 경우가 많음**
- 따라서 동일 물가라도 지원금 없는 한인의 체감 부담이 상대적으로 큼

**절약 팁**
- 호커·NTUC FairPrice 앱 할인·직접 픽업(배달비 절감) 활용

정확한 수치는 아래 출처를 확인하세요.`,
    source: "IRAS 정보 · SmartCalculator",
    sources: [
      { name: "GST 9% 2026 안내", url: "https://www.smartcalculator.sg/articles/how-much-gst-singapore-2026" },
      { name: "yourincomecalculator — GST 9% 영향", url: "https://yourincomecalculator.com/sg/blog/gst-9-percent-singapore-2026-businesses-consumers" },
    ],
    time: "2026년 1월",
    isBreaking: false,
    readTime: "3분",
    emoji: "🍜",
    relatedIds: ["20", "24"],
  },
  {
    id: "31",
    publishedAt: "2026-03-31",
    category: "취업",
    catStyle: "bg-[#EBF5F0] text-[#2B7A50]",
    title: "📈 2026년 1분기 노동시장 — 실업률 2.0%로 안정, 정리해고는 소폭 증가",
    summary: "MOM: 2026년 1분기 총고용 +9,400명(18분기 연속 증가), 실업률 2.0%로 낮은 수준 유지. 단 정리해고는 3,690→3,830명으로 소폭 증가(제조·금융·전문서비스 중심). 구인은 여전히 구직 초과(약 1.46배)지만 채용은 신중해지는 분위기.",
    fullContent: `**2026년 1분기 노동시장 동향 (MOM)**
한인 구직자·이직 고려자에게 참고가 되는 고용 지표입니다.

**전반적으로 안정**
- 총고용 **+9,400명** (2021년 말 이후 **18분기 연속 증가**)
- 실업률 **2.0%** (거주자 2.9%, 시민 3.1%)
- 구인 약 73,300건, 실업자 1명당 약 **1.46개 일자리**

**주의 신호**
- 정리해고 **3,690 → 3,830명**(전분기比 소폭 증가), 주로 **제조·금융·전문서비스**
- 단 해고율은 1,000명당 1.6명으로 비(非)침체 수준
- 채용·임금 인상 기대는 다소 둔화 — 기업이 신중해지는 분위기

**한인 참고**
- 전반적으로 견조하나 일부 업종은 채용 보수화 — 이직 시 타이밍·업종 확인
- EP 신청은 COMPASS·최저급여 기준 동시 충족 필요(관련 기사 참고)

정확한 통계는 아래 MOM 자료를 확인하세요.`,
    source: "MOM · Human Resources Online",
    sources: [
      { name: "Human Resources Online — Q1 노동시장", url: "https://www.humanresourcesonline.net/retrenchments-edged-up-in-q1-but-singapore-s-labour-market-stayed-broadly-stable-says-mom" },
      { name: "Asian Prime Properties — Q1 2026 고용", url: "https://asianprimeproperties.sg/singapore-employment-growth-q1-2026-labour-market-resilient/" },
    ],
    time: "2026년 1분기",
    isBreaking: false,
    readTime: "3분",
    emoji: "📈",
    relatedIds: ["17", "21"],
  },
  {
    id: "29",
    publishedAt: "2026-01-02",
    category: "교통",
    catStyle: "bg-[#EBF5F0] text-[#2B7A50]",
    title: "🚉 TEL 5단계 + DTL 연장 2026년 하반기 개통 예정 — Bedok South·Sungei Bedok 등 신설",
    summary: "Thomson-East Coast Line(TEL) 5단계와 Downtown Line 3 연장이 2026년 하반기 개통 예정. 신역 Xilin·Bedok South·Sungei Bedok(환승역) 3곳으로 두 노선 연결. East Coast Integrated Depot도 2026년 완전 개통. 동부 거주 한인 교통 개선.",
    fullContent: `**TEL 5단계 & DTL 연장 (2026년 하반기 개통 예정)**
싱가포르 동부 교통이 개선됩니다.

**개통 내용**
- **Thomson-East Coast Line(TEL) 5단계** + **Downtown Line 3 연장**이 2026년 하반기 개통 예정
- 신설역 3곳: **Xilin · Bedok South · Sungei Bedok**(환승역)
- 이 연결로 TEL·DTL 두 노선이 이어지고, **East Coast Integrated Depot**도 2026년 완전 개통

**한인 참고**
- Bedok·East Coast 일대 거주 한인의 도심 접근성 개선
- 정확한 개통일·운행 정보는 개통 임박 시 LTA·운영사(SMRT/SBS) 공지 확인

세부 일정은 변동될 수 있으니 아래 출처를 확인하세요.`,
    source: "LTA · Land Transport Guru",
    sources: [
      { name: "Land Transport Guru — 2026 대중교통 전망", url: "https://landtransportguru.net/2026-outlook-for-public-transport/" },
      { name: "Wikipedia — Thomson-East Coast Line", url: "https://en.wikipedia.org/wiki/Thomson%E2%80%93East_Coast_Line" },
    ],
    time: "2026년",
    isBreaking: false,
    readTime: "2분",
    emoji: "🚉",
    relatedIds: ["26"],
  },
];

// 최신순(publishedAt 내림차순) 자동 정렬 — 새 뉴스 추가 시 배열 위치와 무관하게 최신이 위로.
export const NEWS_ITEMS: NewsItem[] = [...RAW_NEWS_ITEMS].sort(
  (a, b) => b.publishedAt.localeCompare(a.publishedAt)
);
