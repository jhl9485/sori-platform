export interface NewsItem {
  id: string;
  category: string;
  catStyle: string;
  title: string;
  summary: string;
  fullContent: string;
  source: string;
  sourceUrl?: string;
  time: string;
  isBreaking: boolean;
  readTime: string;
  emoji: string;
  relatedIds: string[];
}

// 실제 싱가포르 뉴스 (2026년 5월 기준) — 한인 커뮤니티 유용 정보 중심
export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "1",
    category: "교육",
    catStyle: "bg-[#FBF0EC] text-[#D04020]",
    title: "⚠️ 자녀 초등학교 P1 신청 마감 D-4 — 국제학생 5월 25일까지",
    summary: "MOE 공식: 2027년 입학 예정 국제학생 P1 신청 기간 5월 19일~25일. 미신청 시 Phase 3 등록 불가. 대상 아동은 2020년 1월 2일~2021년 1월 1일생.",
    fullContent: `싱가포르 교육부(MOE)는 2026년 P1(Primary 1) 등록 일정을 공식 발표했습니다. 자녀를 2027년 초등학교에 입학시키려는 국제학생(IS) 가정은 반드시 기한 내 신청해야 합니다.

**신청 기간 (국제학생)**
- 온라인 관심 등록 시작: 2026년 5월 19일(화) 오전 9시
- **마감: 2026년 5월 25일(일) 오후 4시 30분**
- 신청 URL: MOE 공식 포털 (www.moe.gov.sg/primary/p1-registration)

**대상 아동**
- 생년월일: 2020년 1월 2일 ~ 2021년 1월 1일생 (양일 포함)
- 국적: 비싱가포르시민 · 비PR (EP/S-Pass/DP 자녀 포함)

**주의사항**
- 국제학생은 SC, PR 배정 후 남은 자리에만 배정 (Phase 3)
- 입학이 보장되지 않으며, 결과는 2026년 10월 이메일 통보
- **마감 후 신청 불가 — 이의 신청도 불가**

**신청 방법**
MOE 포털에서 자녀 정보, 보호자 여권/비자 사본, 현재 거주지 증빙(공과금 영수증 또는 임대차계약서)을 준비해 온라인 제출하세요.

**가까운 학교 우선 배정**
학교 선택 시 자택 1km 이내 학교에 우선권이 주어집니다. 한인 밀집 지역(Tanjong Pagar, Buona Vista, Clementi 등)의 주요 학교를 미리 확인해두세요.

**한인 커뮤니티 팁**
SORI 커뮤니티 교육 카테고리에 작년 합격·불합격 경험 공유 글이 다수 있으니 참고하세요.`,
    source: "MOE 공식 발표",
    sourceUrl: "https://www.moe.gov.sg/news/press-releases/20260429-2026-primary-one-registration-exercise",
    time: "2026년 5월 21일",
    isBreaking: true,
    readTime: "3분",
    emoji: "🏫",
    relatedIds: ["5"],
  },
  {
    id: "2",
    category: "비자/취업",
    catStyle: "bg-[#EBF0FB] text-[#2050A0]",
    title: "EP 최저급여 $6,000 공식 적용 — 2026년 COMPASS 변경사항 총정리",
    summary: "2026년 1월부터 EP 최저 월급여 기준이 $5,600→$6,000으로 인상. 금융권은 $6,600. COMPASS 점수제도 함께 적용. 갱신 예정자는 반드시 확인 필요.",
    fullContent: `싱가포르 인력부(MOM)는 2026년 1월 1일부터 Employment Pass(EP) 최저 자격 급여를 인상했습니다. 현재 EP 보유자 및 갱신 예정자 모두에게 적용됩니다.

**2026년 EP 최저 급여 (월 기준)**
- 일반 업종: **SGD 6,000** (기존 SGD 5,600)
- 금융 서비스업: **SGD 6,600** (기존 SGD 6,200)

**연령별 기대 급여 (참고)**
- 20대 중반: ~SGD 6,000
- 30대 중반: ~SGD 7,500~9,000
- 40대 중반: ~SGD 10,700~11,800

**COMPASS 점수제 (40점 이상 필수)**
EP 신청은 최저 급여 충족 외에도 COMPASS 점수 40점 이상을 동시에 충족해야 합니다.

주요 평가 항목:
- 급여 수준 (C1): 동종 업계 중위값 대비 상대 급여
- 자격 수준 (C2): 학력 및 전문 자격
- 다양성 기여 (C3): 해당 국적의 회사 내 비율
- 로컬 고용 지원 (C4): 회사의 현지인 채용 비율
- 전략 경제 우선 (C5): 정부 지정 전략 분야 여부

**실무 팁**
- 급여가 기준을 간신히 넘는 경우 COMPASS 점수에서 탈락할 수 있으므로 사전 자가진단 권장
- MOM 공식 COMPASS 자가진단 도구: mom.gov.sg/compass
- EP 갱신은 만료 6개월 전부터 신청 가능

**2027년 이후 예고된 추가 인상**
2027년 1월(신규) 및 2028년 1월(갱신)부터 전 업종 기준이 또 한번 인상될 예정이므로 미리 대비하세요.`,
    source: "MOM 공식 · EBOS SG",
    sourceUrl: "https://ebos-sg.com/singapore-employment-pass-2026-salary-rules-gst/",
    time: "2026년 5월 15일",
    isBreaking: false,
    readTime: "4분",
    emoji: "💼",
    relatedIds: ["6"],
  },
  {
    id: "3",
    category: "교통",
    catStyle: "bg-[#EBF5F0] text-[#2B7A50]",
    title: "TEL·DTL 5월 22일~7월 4일 주말 운행 조정 — 영향 구간 총정리",
    summary: "LTA 공식: 5월 22일부터 7월 4일까지 매주 주말 TEL·DTL 일부 구간 감편 운행. TEL Stage 5(Bedok South·Sungei Bedok) 2026년 하반기 개통 준비 공사.",
    fullContent: `싱가포르 육상교통청(LTA)은 Thomson-East Coast Line(TEL)과 Downtown Line(DTL) 연장 공사를 위해 주말 열차 운행을 조정한다고 발표했습니다.

**운행 조정 기간**
- 시작: 2026년 5월 22일(토)
- 종료: 2026년 7월 4일(토)
- 적용: **매주 토·일요일만** (평일 정상 운행)

**TEL 영향 구간**
TEL 전 구간에서 열차 배차 간격이 늘어납니다. 특히 Woodlands North ~ Bayshore 구간에서 테스트 운행이 진행됩니다.

**DTL 영향 구간**
DTL 일부 구간에서도 배차 간격 조정이 있습니다. 구체적 영향 역은 LTA 앱 또는 SBS Transit 공식 채널에서 확인하세요.

**대체 교통 수단**
- 영향 구간에는 셔틀버스 운행 예정
- 피크 시간대(오전 8~10시, 오후 5~8시) 는 혼잡 예상
- 버스 및 그랩/택시 활용 권장

**TEL Stage 5 개통 일정**
- 추가 역: Bedok South, Sungei Bedok
- 예정 개통: **2026년 하반기**
- 동시에 East Coast Integrated Depot도 개통

**한인 거주자 영향**
- Woodlands, Tanjong Pagar, Marina Bay 이용 한인 가정 주의
- 주말 종교 활동, 쇼핑, 외식 시 이동 시간 여유 있게 계획하세요`,
    source: "LTA 공식 발표",
    sourceUrl: "https://www.lta.gov.sg/content/ltagov/en/newsroom/2026/4/news-releases/train-service-adjustments-tel-and-dtl-to-facilitate-rail-expansion-works.html",
    time: "2026년 5월 12일",
    isBreaking: false,
    readTime: "2분",
    emoji: "🚇",
    relatedIds: [],
  },
  {
    id: "4",
    category: "부동산",
    catStyle: "bg-[#FBF5E8] text-[#B07010]",
    title: "2026년 싱가포르 콘도 임대 시장 — 공실률 7%, 지금이 협상 타이밍",
    summary: "민간 콘도 공실률 7%로 상승, 임대료 상승세 3%로 둔화. 장기계약 시 추가 할인 협상 유리. 1베드 평균 $3,900/월, 한인 밀집 Tanjong Pagar 2베드 $4,200~5,500.",
    fullContent: `2026년 초 싱가포르 민간 콘도 임대 시장은 임차인에게 유리한 환경이 형성되고 있습니다.

**2026년 임대료 현황 (월 기준)**
- 1베드룸: SGD 3,500~4,500 (시내 인근), SGD 2,800~3,500 (외곽)
- 2베드룸: SGD 4,500~6,500 (시내 인근), SGD 3,500~5,000 (외곽)
- 3베드룸: SGD 6,500~9,000 (시내 인근), SGD 5,000~7,000 (외곽)

**한인 밀집 지역 임대료 (2베드 기준)**
- Tanjong Pagar: SGD 4,200~5,500/월
- Buona Vista / One-North: SGD 3,800~5,000/월
- Orchard / River Valley: SGD 5,500~8,000/월
- Clementi / West Coast: SGD 3,500~4,800/월

**시장 흐름**
- 공실률: 약 7% (2022년 2%대에서 상승)
- 임대료 상승률: 연 3% (2022~2023년 두 자릿수에서 대폭 둔화)
- 신규 공급: 2026년 4,575세대 신규 분양, 10년 평균 대비 50% 초과

**협상 전략 (실전 팁)**
- 2년 이상 장기 계약 시 3~8% 추가 할인 요청 가능
- 공실 기간이 1개월 이상인 유닛은 집주인 협상 의사 높음
- 계약 전 PropNex, ERA 등 공인 중개사 통해 주변 시세 확인 필수
- 가구, 에어컨 필터 교체, 주차 1대 무료 등 조건 협상도 가능

**주의사항**
- 임대차 계약 시 Stamp Duty 납부 필수 (임차인 부담)
- 계약서에 Diplomatic Clause(조기 해지 조항) 반드시 삽입 요청`,
    source: "PropertyGuru · Global Property Guide",
    sourceUrl: "https://www.propertyguru.com.sg/property-guides/ura-private-property-prices-q1-2026-pjx-98370",
    time: "2026년 5월 10일",
    isBreaking: false,
    readTime: "3분",
    emoji: "🏘️",
    relatedIds: ["2"],
  },
  {
    id: "5",
    category: "사회",
    catStyle: "bg-[#EBF5F0] text-[#2B7A50]",
    title: "싱가포르 의회, AI 시대 '고용 없는 성장 없다' 결의안 만장일치 통과",
    summary: "노동운동 주도 결의안, 10년 만에 처음. AI 전환 속 포용적 성장 확인. 정부·기업·노조 3자 협력 모델 강조. 한인 IT 종사자, 제조업 종사자 주목.",
    fullContent: `싱가포르 의회는 2026년 5월 6일(수) AI 전환 시대에 '고용 없는 성장은 없다'는 결의안을 만장일치로 통과시켰습니다.

**결의안 주요 내용**
- AI 기술 도입으로 인한 일자리 변화를 인정하면서도
- 경제 성장은 반드시 포용적·고용 창출적이어야 한다는 원칙 확인
- 정부·기업·노동조합 간 3자 협력(Tripartism) 모델 강화

**배경**
이 결의안은 싱가포르 전국노동조합총연맹(NTUC)이 주도한 것으로, 노동운동이 의회에 결의안을 제출한 것은 10년 만입니다. 이틀간의 토론을 거쳐 통과됐습니다.

**정부 입장**
싱가포르 정부는 AI를 직업 대체 수단이 아닌 생산성 향상 도구로 활용하겠다는 방침을 재확인했습니다. SkillsFuture 프로그램을 통해 AI 관련 재교육을 지원할 계획입니다.

**한인 직장인에 미치는 영향**
- IT/테크 분야: AI 도입 확대로 기술 스택 업데이트 중요성 증가
- 금융/회계: 자동화로 인한 역할 변화 예상, 고부가가치 업무 집중 필요
- 제조/물류: Jurong 지역 스마트팩토리 전환 가속화
- SkillsFuture 크레딧($500/성인) 적극 활용 권장 — 외국인 EP 소지자도 일부 과정 수강 가능

**SkillsFuture 활용법**
skills Future.gov.sg에서 AI 관련 무료·유료 강좌 확인 가능. Python, 데이터 분석, AI 프롬프트 엔지니어링 과정이 인기.`,
    source: "Bloomberg · CNA",
    sourceUrl: "https://www.bloomberg.com/news/articles/2026-05-06/singapore-parliament-pledges-no-jobless-growth-in-ai-era-cna",
    time: "2026년 5월 7일",
    isBreaking: false,
    readTime: "3분",
    emoji: "🤖",
    relatedIds: ["2"],
  },
  {
    id: "6",
    category: "경제",
    catStyle: "bg-[#EBF0FB] text-[#2050A0]",
    title: "싱가포르 민간 주택 Q1 2026 가격 0.9% 상승 — OCR 외곽 2.2% 급등",
    summary: "URA Q1 2026 발표: 전체 민간주택 0.9% 상승. 외곽(OCR) 2.2% 급등, 도심(CCR) 보합세. 2026년 신규 분양 물량 4,575세대로 10년 평균 50% 초과.",
    fullContent: `싱가포르 도시재개발청(URA)은 2026년 1분기(Q1) 민간 주택 가격이 전분기 대비 0.9% 상승했다고 발표했습니다.

**지역별 가격 변동 (Q1 2026)**
- 전체 평균: +0.9%
- CCR(도심 핵심 지역): +0.1% (보합)
- RCR(도심 외곽 지역): +0.8%
- **OCR(외곽 지역): +2.2%** (가장 큰 상승)

**OCR 외곽 급등 이유**
- 신규 HDB 분양 지역 인접한 민간 단지 수요 증가
- Tengah, Jurong Lake District 개발 기대감
- 상대적으로 저렴한 가격대로 실수요자 몰림

**2026년 신규 분양 예정 주요 단지**
- 1H 2026 GLS 확정 목록: 총 4,575세대 (10년 평균 대비 50% 초과)
- 예정 단지: Zion Road, Media Circle, Tanah Merah 등

**투자 vs. 거주 관점**
- 거주 목적: 현재 공실률 7%로 렌트 협상이 유리한 시점
- 투자 목적: ABSD(추가 인지세) 외국인 60% 적용으로 부담 여전히 높음

**한인 실수요자 체크리스트**
- EP 소지자는 콘도 구매 가능 (ABSD 60% 적용)
- PR 취득 후 구매 시 ABSD 5% (절세 효과 큼)
- 주택 구매 전 CPF OA 사용 가능 여부 확인`,
    source: "URA · PropertyGuru",
    sourceUrl: "https://www.propertyguru.com.sg/property-guides/ura-private-property-prices-q1-2026-pjx-98370",
    time: "2026년 5월 2일",
    isBreaking: false,
    readTime: "3분",
    emoji: "📈",
    relatedIds: ["4"],
  },
  {
    id: "7",
    category: "생활",
    catStyle: "bg-[#F5F0FF] text-[#7040C0]",
    title: "2026년 싱가포르 생활비 완전 정리 — 한인 가정 실제 지출 기준",
    summary: "싱가포르 평균 월 생활비 SGD 3,640. 1인 콘도 임대 SGD 3,200. 한인 가정 기준 식비·교육비·의료비 상세 분석. GST 9% 적용 후 변화한 실제 체감 물가.",
    fullContent: `2026년 싱가포르 생활비를 한인 가정 기준으로 상세히 정리했습니다. 이주 예정이거나 연봉 협상 중인 분들에게 실질적인 참고가 되길 바랍니다.

**월 생활비 요약 (싱가포르 평균)**
- 평균 순소득: SGD 4,451/월
- 평균 총 지출: SGD 3,640/월
- 주거비(임대): SGD 3,200 (전체 지출의 88%!)
- 식비: SGD 600~1,000
- 교통비: SGD 150~250
- 통신비: SGD 50~80

**한인 가정 유형별 예상 월 지출**

1인 전문직 (EP, 콘도 1베드):
- 임대: SGD 3,500~4,000
- 식비: SGD 800 (외식 포함)
- 교통: SGD 200
- 기타: SGD 500
- **합계: SGD 5,000~5,500**

부부 (자녀 없음, 콘도 2베드):
- 임대: SGD 4,500~6,000
- 식비: SGD 1,200
- 교통: SGD 350
- 기타: SGD 800
- **합계: SGD 6,850~8,350**

가족 (자녀 1~2명, 콘도 3베드, 국제학교):
- 임대: SGD 6,500~8,500
- 국제학교 학비: SGD 2,000~4,000/자녀
- 식비: SGD 1,500
- 교통: SGD 500
- **합계: SGD 12,000~16,500**

**GST 9% 적용 후 주요 변화 (2024년 1월부터)**
- 외식: 평균 SGD 1~3 추가 부담/끼니
- 쇼핑몰 구매: 체감 물가 9% 상승
- 한인 마트: 수입 식품 가격 상승

**절약 팁**
- 호커센터 활용: 한 끼 SGD 3~5로 해결
- NTUC FairPrice 앱 할인 활용
- Grab Food 대신 직접 픽업 할인
- 통신사: 시밀리 또는 가장 저렴한 MVNO 활용 (SGD 15~20/월)`,
    source: "Numbeo · Expat-SG.com",
    sourceUrl: "https://www.numbeo.com/cost-of-living/in/Singapore",
    time: "2026년 5월 1일",
    isBreaking: false,
    readTime: "4분",
    emoji: "💰",
    relatedIds: ["4", "2"],
  },
];
