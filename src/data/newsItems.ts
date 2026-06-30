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
    id: "auto-20260630-1",
    publishedAt: "2026-06-30",
    category: "생활비",
    catStyle: "bg-[#FBF5E8] text-[#B07010]",
    title: "⚡ 7~9월 전기요금 17.5%(4.66센트/kWh) 인상 공식 확정 — EMA 6월 30일 발표, 가스 7.1%↑",
    summary: "에너지시장청(EMA)이 6월 30일 2026년 3분기(7~9월) 전기요금을 전 분기 대비 평균 17.5%(4.66센트/kWh) 인상한다고 공식 확정했다. 가스요금도 7.1% 오른다. 기존 '최대 30%' 예고 대비 17.5%로 확정됐으며, 7월 지급 U-Save 리베이트(가구당 S$110~190)가 일부를 상쇄할 예정이다.",
    fullContent: `**3분기(7~9월) 전기요금 17.5% 인상 공식 확정 (EMA, 2026년 6월 30일)**
에너지시장청(EMA)이 오늘(6월 30일) 2026년 3분기(7~9월) 규제 전기요금 인상폭을 공식 확정했습니다.

**인상 규모**
- 전기요금: 전 분기 대비 평균 **17.5%(4.66센트/kWh)** 인상
  - 2분기(4~6월) 요금: kWh당 27.27센트(GST 제외) · 29.72센트(GST 포함)
  - 3분기 새 요금(GST 제외 기준): 27.27 + 4.66 = 약 **31.93센트/kWh** — 정확한 확정 금액은 EMA·SP Group 공식 발표 확인
- 가스요금: **7.1%** 인상

**원인**
- 2026년 2월 28일 미국·이스라엘의 이란 공습 이후 호르무즈 해협이 사실상 봉쇄되며 국제 LNG 가격 급등
- 카타르 등 아시아 주요 LNG 공급처에서 오는 물량에 영향
- 3분기 요금은 4월 1일~6월 15일 평균 가스가격으로 산정 — 최근 정세 변화는 4분기에나 반영 가능

**완화 조치**
- 7월 중 U-Save 리베이트(적격 가구당 **S$110~190**) 지급 예정으로 일부 상쇄

**한인 참고**
- 이전 기사들의 '최대 30%' 예고 대비 17.5%로 확정됐으나, 여전히 상당한 인상폭
- 7월 청구서부터 반영되므로 에어컨·냉장고 등 전력 다소비 가전 사용량 관리를 권장
- OEM 고정요금제 계약 중인 가구는 이번 분기 직접 영향은 적으나, 계약 갱신 시 시장 요금 수준을 참고

정확한 내용은 원문(아래 출처)을 확인하세요.`,
    source: "EMA · Mothership · The Online Citizen",
    sources: [
      { name: "EMA — Would the Electricity Tariff be Much Higher from 1 July - and What are Your Options?", url: "https://www.ema.gov.sg/news-events/news/feature-stories/2026/would-the-electricity-tariff-be-much-higher-from-1-july-and-what-are-your-options" },
      { name: "Mothership — Electricity tariff to go up 17% for S'pore households from Jul.-Sep. 2026", url: "https://mothership.sg/2026/06/singapore-electricity-tariff-up-july-2026/" },
      { name: "The Online Citizen — Singapore electricity tariff to rise 17% and gas tariff 7.1% from July to September", url: "https://theonlinecitizen.com/2026/06/30/singapore-electricity-tariff-to-rise-17-and-gas-tariff-7-1-from-july-to-september" },
    ],
    time: "2026년 6월 30일 발표 · 7월 1일 시행",
    isBreaking: true,
    readTime: "3분",
    emoji: "⚡",
    relatedIds: ["auto-20260619-1", "auto-20260624-7"],
  },
  {
    id: "auto-20260630-2",
    publishedAt: "2026-06-25",
    category: "사회",
    catStyle: "bg-[#F5F0FF] text-[#7040C0]",
    title: "⚠️ '통신사 사칭→정부기관 사칭→대금업자 대출 전달' 신종 사기 — 6월 이후 5건·S$252,000 피해",
    summary: "경찰(SPF)이 6월 25일 발표한 신종 정부기관 사칭 사기 경보에 따르면 6월 1일 이후 5건이 신고돼 피해액이 S$252,000에 달한다. 통신사 직원 사칭 전화로 시작해 MinLaw·MAS 직원을 사칭한 '수사관'에게 연결 후 '범죄 연루'를 이유로 대금업자(licensed moneylender)에서 대출받아 현금을 건네도록 강요한다. 피해자가 저축을 잃는 것에 그치지 않고 빚까지 지게 되는 이중 피해가 특징이다.",
    fullContent: `**정부기관 사칭→대금업자 대출 유도 신종 사기 경보 (SPF, 2026년 6월 25일)**
싱가포르 경찰(SPF)이 6월 25일 발표한 새로운 유형의 정부기관 사칭 사기입니다.

**피해 현황**
- 2026년 6월 1일 이후 최소 **5건** 신고, 피해액 최소 **S$252,000**
- 기존 정부기관 사칭 사기와 달리 **저축을 잃는 데 그치지 않고 빚까지 지게 되는** 이중 피해 발생

**수법 (3단계)**
1. 사기범이 **통신사 직원**을 사칭해 전화 — "당신 명의로 계약 체결·SIM카드 등록이 됐다"고 주장
2. 전화를 MinLaw(법무부) 또는 MAS(통화청) 직원을 사칭한 '수사관'에게 넘기며 **"자금세탁 등 범죄에 연루됐다"** 고 협박
3. "수사 과정에서 자금이 필요하다"며 **대금업자(licensed moneylender)에서 대출받아 현금을 지정 계좌에 이체하거나 직접 전달**하도록 강요

**경찰 안내**
- 싱가포르 정부 기관(MinLaw·MAS 포함)은 절대 다음을 요구하지 않음:
  - ①돈·고가 시계·금·암호화폐 이체 또는 전달
  - ②대금업자에서 대출받을 것
- 의심스러운 전화는 즉시 끊고 공식 채널로 직접 확인할 것

**한인 참고**
- 갑작스럽게 영어로 '통신사 사칭 전화→수사기관 연결'로 이어지면 즉시 끊을 것
- '법적 절차를 위해 대출받아 전달하라'는 요구는 100% 사기
- 의심 시 ScamShield 앱 또는 1799(안티스캠 핫라인) 확인

정확한 내용은 원문(아래 출처)을 확인하세요.`,
    source: "SPF · The Independent Singapore",
    sources: [
      { name: "SPF — Police Advisory On Government Officials Impersonation Scams That Involve Obtaining Loans From Licensed Moneylenders", url: "https://www.police.gov.sg/Media-Hub/News/2026/06/20260625_police_advisory_on_government_officials_impersonation_scams_that_involve_obtaining_loans" },
      { name: "The Independent Singapore — Attention, new scam!: Fake government officials trick victims into fraud, S$252,000 losses from five reports this month", url: "https://theindependent.sg/attention-new-scam-fake-government-officials-trick-victims-into-fraud-s-252-000-losses-from-five-reports-this-month/" },
    ],
    time: "2026년 6월 25일",
    isBreaking: true,
    readTime: "2분",
    emoji: "⚠️",
    relatedIds: ["28"],
  },
  {
    id: "auto-20260630-3",
    publishedAt: "2026-06-30",
    category: "비자/취업",
    catStyle: "bg-[#EBF0FB] text-[#2050A0]",
    title: "💼 내일(7/1)부터 최저현지급여 S$1,800 시행 — 로컬 직원 월급 미달 시 S Pass 쿼터 즉시 감소",
    summary: "인력부(MOM) Budget 2026 발표에 따라 7월 1일부터 최저현지급여(LQS·Local Qualifying Salary)가 월 S$1,600에서 S$1,800으로 오른다. 로컬 직원 급여가 S$1,800 미만이면 외국인 인력쿼터 계산 시 1명이 0.5명으로 줄어 S Pass·워크퍼밋 신규·갱신에 직접 영향을 준다. 로컬 직원을 고용 중인 한인 사업주는 오늘(6/30) 내 임금 현황 확인이 필요하다.",
    fullContent: `**최저현지급여(LQS) 7월 1일부터 S$1,800 시행 — 내일부터 즉시 적용**
인력부(MOM) Budget 2026 발표 사항으로, 내일(7월 1일)부터 최저현지급여(Local Qualifying Salary, LQS)가 인상됩니다.

**무엇이 바뀌나**
- 풀타임 로컬(시민권자·PR) 직원 최저현지급여: S$1,600 → **S$1,800/월**
- 파트타임 로컬 직원: 시간당 S$9 → **S$10.50**

**왜 중요한가 — S Pass·워크퍼밋 쿼터에 직접 영향**
LQS는 외국인 인력(S Pass·워크퍼밋) 쿼터를 계산할 때 로컬 직원 1명을 '1명'으로 셀 수 있는 최저 급여 기준입니다.

7월 1일부터 적용되는 새 카운팅 기준:
- 월급 **S$1,800 이상**: 로컬 1.0카운트
- 월급 S$900 이상 S$1,800 미만: 로컬 **0.5카운트**
- 월급 S$900 미만: 카운트 없음

기존에 S$1,600~1,799를 받던 로컬 직원을 인상 없이 유지하면, 해당 직원이 1.0카운트 → 0.5카운트로 떨어져 **외국인 인력쿼터가 즉시 줄어들 수 있음**.

**결과**
- 7월 1일 이후 S Pass·워크퍼밋 신청·갱신은 새 쿼터 기준으로 심사
- 쿼터 초과 시 MOM이 기존 패스 취소를 지시할 수 있음

**정부 지원**
- 진보임금크레딧(PWCS, Progressive Wage Credit Scheme): 로컬 저임금 근로자 임금 인상분의 **30%** 공동 부담(2026년 기준), 2028년까지 연장

**한인 참고**
- 로컬 직원을 고용 중인 한인 사업주라면 오늘(6/30) 내 S$1,600~1,799 구간 직원 급여 현황을 점검하고, S$1,800 인상 여부를 HR·회계사와 협의할 것
- EP(고용패스) 소지 외국인 근로자에게 LQS는 직접 적용되지 않으나, 고용주의 S Pass·WP 쿼터 감소로 간접 영향이 생길 수 있음
- 세부 계산 방법은 MOM 공식 페이지(아래 출처)에서 확인할 것

정확한 내용은 원문(아래 출처)을 확인하세요.`,
    source: "MOM · Mothership",
    sources: [
      { name: "MOM — Local Qualifying Salary (공식)", url: "https://www.mom.gov.sg/employment-practices/progressive-wage-model/local-qualifying-salary" },
      { name: "Mothership — Local qualifying salary for full-time local employees to increase from S$1,600 to S$1,800: Budget 2026", url: "https://mothership.sg/2026/02/budget-2026-local-qualifying-salary-raised/" },
    ],
    time: "2026년 6월 30일(내일 7월 1일 시행)",
    isBreaking: true,
    readTime: "3분",
    emoji: "💼",
    relatedIds: ["auto-20260620-1", "auto-20260619-4"],
  },
  {
    id: "auto-20260630-4",
    publishedAt: "2026-06-30",
    category: "부동산",
    catStyle: "bg-[#FBF5E8] text-[#B07010]",
    title: "🏠 5월 콘도 렌트 -0.6%·HDB -0.3% 하락 — 4월 최고치 후 완화, 임차인 협상력 개선 중",
    summary: "99-SRX 렌트 플래시 리포트(2026년 6월 발표 5월 데이터)에 따르면 콘도 렌트가 전월 대비 0.6% 하락했다(4월 사상 최고치 직후). 지역별로는 CCR -0.4%, RCR -0.6%, OCR -1.0%. HDB 렌트도 0.3% 하락(성숙단지 -0.5%, 비성숙단지 +0.2%). 2024~25년 신규 공급 증가로 시장이 집주인 주도에서 균형으로 이동 중이라 임대차 갱신 협상에 유리한 환경이 만들어지고 있다.",
    fullContent: `**5월 콘도·HDB 렌트 동반 하락 (99-SRX Rental Flash Report, 2026년 6월 발표)**
99-SRX 렌트 플래시 리포트에 따른 2026년 5월 싱가포르 임대 시장 현황입니다.

**콘도(민간주택) 렌트**
- 전월 대비 **-0.6%** (4월에 기록한 사상 최고치 직후 하락)
- 지역별:
  - CCR(핵심 중심지역): **-0.4%**
  - RCR(중심지역 외곽): **-0.6%**
  - OCR(외곽지역): **-1.0%** (가장 큰 폭 하락)

**HDB 렌트**
- 전월 대비 **-0.3%**
  - 성숙단지(Mature estates): **-0.5%**
  - 비성숙단지(Non-mature estates): +0.2%
- 4룸 기준 월세 중간값: 약 S$2,600

**시장 전망**
- 99.co 수석 데이터·애널리틱스 책임자: "싱가포르 임대 시장이 집주인 주도 시장에서 균형 잡힌 시장으로 전환 중"
- 2024~25년 신규 완공 물량 증가와 외국인 고용 수요 안정화가 주요 원인으로 분석
- 향후 급격한 렌트 재반등보다는 완만한 흐름 예상

**한인 참고**
- 임대차 갱신을 앞두고 있다면 OCR(외곽) 지역을 중심으로 협상 여지가 커진 점을 활용할 수 있음
- 다만 지역·평형·건물별 편차가 크므로 실제 계약 전 SRX, HDB(공공) 또는 URA(민간) 최신 시세를 직접 확인할 것
- 지속적인 하락이 보장되는 것은 아니므로 계약 기간 설정 시 시장 동향을 종합적으로 참고할 것

정확한 내용은 원문(아래 출처)을 확인하세요.`,
    source: "99.co (99-SRX Rental Flash Report)",
    sources: [
      { name: "99.co — Condo and HDB rents ease in May 2026 as market moves towards greater balance", url: "https://www.99.co/singapore/insider/condo-hdb-rental-market-may-2026/" },
    ],
    time: "2026년 6월 30일(5월 데이터)",
    isBreaking: false,
    readTime: "2분",
    emoji: "🏠",
    relatedIds: ["auto-20260622-3"],
  },
  {
    id: "auto-20260627-1",
    publishedAt: "2026-06-27",
    category: "생활",
    catStyle: "bg-[#F5F0FF] text-[#7040C0]",
    title: "🧧 2027년 공휴일 확정 — 설 연휴 2/6~2/8 '3일', 총 11일 (MOM 발표)",
    summary: "인력부(MOM)가 6월 18일 2027년 법정 공휴일(총 11일)을 발표했다. 설날이 2월 6일(토)·7일(일)인데 둘째 날이 일요일과 겹쳐, 다음 월요일인 2월 8일이 대체공휴일로 지정됐다. 이로써 설 연휴는 토~월 3일 연속 휴무가 된다. 한인 가정의 연휴·여행 계획에 참고.",
    fullContent: `**2027년 싱가포르 공휴일 (총 11일)**
인력부(MOM)가 2026년 6월 18일 2027년 법정 공휴일을 발표했습니다. 한인 가정의 연휴·항공권 계획에 미리 참고하세요.

**설날(춘절) 2027**
- 공식 공휴일: **2월 6일(토)·2월 7일(일)**
- 둘째 날(2/7)이 **일요일**과 겹쳐, 다음 월요일 **2월 8일(월)이 대체공휴일**로 지정
- 결과적으로 **2/6(토)~2/8(월) 3일 연속 휴무**

**참고**
- 설 연휴엔 한국행 항공권 수요·가격이 오르니 미리 예약하면 좋습니다.
- 일부 한인 업소·마트가 단축영업할 수 있어 방문 전 확인을 권합니다.

정확한 전체 날짜는 아래 MOM 공식 자료를 확인하세요.`,
    source: "MOM · Mothership",
    sources: [
      { name: "MOM — Public Holidays for 2027 (공식)", url: "https://www.mom.gov.sg/newsroom/press-releases/2026/0618-public-holidays-for-2027" },
      { name: "Mothership — S'pore public holidays 2027", url: "https://mothership.sg/2026/06/singapore-public-holiday-2027/" },
    ],
    time: "2026년 6월",
    isBreaking: false,
    readTime: "2분",
    emoji: "🧧",
    relatedIds: [],
  },
  {
    id: "auto-20260625-1",
    publishedAt: "2026-06-25",
    category: "교통",
    catStyle: "bg-[#EBF5F0] text-[#2B7A50]",
    title: "⛴️ HarbourFront 페리·크루즈, '임시 터미널'로 이전 — Batam·Karimun 가는 분들 탑승 장소 변경 주의",
    summary: "HarbourFront Centre에서 운영되던 국제 페리·크루즈 터미널이 인근에 새로 지은 임시(interim) 터미널로 이전한다. 소유주 Mapletree의 HarbourFront Centre 재개발에 따른 것으로, 2026년 하반기부터 운영되며 2026년 7월 15일 이후 출발하는 여행객은 새 터미널로 직접 가야 한다. Batam·Karimun행 페리 이용객은 탑승 장소를 미리 확인할 필요가 있다.",
    fullContent: `**HarbourFront 국제 페리·크루즈 터미널 이전 (2026년 하반기)**

HarbourFront Centre에서 1992년부터 운영돼 온 국제 페리·크루즈 터미널이, 바로 옆에 새로 지은 **임시(interim) 터미널**로 옮겨갑니다.

**왜 옮기나**
- 소유주인 부동산 기업 Mapletree Investments가 HarbourFront Centre를 재개발하기 위함
- 임시 터미널 공사는 2024년 시작, 2025년 12월 완공 예정

**언제부터**
- 2026년 하반기부터 임시 터미널에서 운영 시작
- **2026년 7월 15일 이후 출발하는 여행객은 새(임시) 터미널로 직접** 가도록 안내됨

**한인 참고**
- HarbourFront에서 **Batam·Karimun**행 페리를 타시는 분들은 7월 중순부터 탑승 장소가 바뀌니, 출발 전 운영사(예매처) 안내를 꼭 확인하세요
- **Bintan** 등으로 가는 Tanah Merah 페리 터미널, Pasir Panjang 터미널은 이번 이전과 별개로 계속 운영됩니다
- 정확한 새 터미널 위치·셔틀·체크인 시간은 예매 시 운영사 공지를 확인하는 것이 안전합니다

정확한 내용은 원문(아래 출처)을 확인하세요.`,
    source: "The Straits Times 외",
    sources: [
      { name: "The Straits Times — HarbourFront ferry, cruise operations moving to interim terminal in later half of 2026", url: "https://www.magzter.com/en/stories/newspaper/The-Straits-Times/HARBOURFRONT-FERRY-CRUISE-OPERATIONS-MOVING-TO-INTERIM-TERMINAL-IN-LATER-HALF-OF-2026" },
      { name: "Singapore Cruise Centre (공식)", url: "https://singaporecruise.com.sg/" },
    ],
    time: "2026년 6월 25일",
    isBreaking: false,
    readTime: "2분",
    emoji: "⛴️",
    relatedIds: [],
  },
  {
    id: "auto-20260624-5",
    publishedAt: "2026-06-24",
    category: "환경",
    catStyle: "bg-[#EBF5F0] text-[#2B7A50]",
    title: "🌫️ 동남아 연무 '레드' 경보 — SIIA, 8~9월 '피크 위험기' 경고 (2019년 이후 두 번째 레드 등급)",
    summary: "싱가포르국제관계연구소(SIIA)가 6월 24일 발표한 'Haze Outlook 2026' 보고서에서 브루나이·인도네시아·말레이시아·싱가포르에 영향을 줄 수 있는 심각한 초국경 연무 위험을 '레드'(고위험)로 평가했다. 2019년 보고서 발간 이후 두 번째 레드 등급(이전은 2023년)이며, 엘니뇨·인도양 다이폴 영향으로 8~9월이 가장 위험한 시기로 지목됐다.",
    fullContent: `**SIIA 'Haze Outlook 2026' 보고서 발표 (2026년 6월 24일)**
싱가포르국제관계연구소(SIIA)가 발표한 8번째 연례 동남아 연무 위험 평가 보고서입니다.

**위험 등급**
- 브루나이·인도네시아·말레이시아·싱가포르 대상 초국경 연무 위험을 **'레드(Red)'(고위험)**로 평가
- SIIA가 2019년 Haze Outlook 발간 이후 **두 번째** 레드 등급(이전 레드 등급은 2023년)

**피크 위험기**
- **8~9월**을 가장 위험한 시기로 지목
- 엘니뇨 및 양의 인도양 다이폴(IOD) 발달이 겹치며 건기가 더 길고 강해질 가능성

**원인**
- 엘니뇨로 인한 고온·건조한 날씨가 산불·이탄지 화재 위험을 높임
- 호르무즈 해협 관련 사태로 바이오연료 수요가 늘면서 일부 생산지의 무분별한 토지 개간 유인이 커질 수 있다고 경고
- 인도네시아는 산불·토지화재 대응을 위한 신규 부처간 조정 데스크를 신설해 대응 중

**한인 참고**
- 8~9월 사이 PSI(오염지수)가 높아질 경우를 대비해 외출 전 haze.gov.sg에서 1시간 PM2.5·24시간 PSI를 확인하는 습관을 들일 것
- 호흡기 질환자·어린이·노약자가 있는 가정은 마스크(N95 등)와 공기청정기를 미리 준비해두는 것을 권장
- 실외 활동(운동회·캠핑 등) 계획 시 8~9월은 대체 일정도 고려할 만함

정확한 내용은 원문(아래 출처)을 확인하세요.`,
    source: "SIIA(싱가포르국제관계연구소)",
    sources: [
      { name: "SIIA — Haze Outlook 2026 Warns of High Risk of Severe Transboundary Haze Event", url: "https://siiaonline.org/siia-haze-outlook-2026-media-release/" },
      { name: "Mothership — Rare 'red alert' severe haze warning for S'pore, Aug-Sep 'peak danger period': SIIA", url: "https://mothership.sg/2026/06/haze-outlook-report-2026/" },
      { name: "The Borneo Post — Southeast Asia on red alert for transboundary haze risk in coming months, says SIIA", url: "https://www.theborneopost.com/2026/06/24/southeast-asia-on-red-alert-for-transboundary-haze-risk-in-coming-months-says-siia/" },
    ],
    time: "2026년 6월 24일",
    isBreaking: true,
    readTime: "3분",
    emoji: "🌫️",
    relatedIds: [],
  },
  {
    id: "auto-20260624-6",
    publishedAt: "2026-06-24",
    category: "사회",
    catStyle: "bg-[#F5F0FF] text-[#7040C0]",
    title: "🚨 가자전쟁발 자생적 극단화 — 싱가포르인 2명 ISA 명령(구금·거주제한), 내무부 6월 24일 발표",
    summary: "싱가포르 내무부(MHA)·내부보안부(ISD)는 6월 24일, 가자전쟁을 계기로 자생적으로 급진화된 싱가포르인 2명에 대한 내부보안법(ISA) 명령을 공개했다. 30세 고객서비스직 남성(타르미지)은 하마스 지시가 있으면 싱가포르 내 공격도 가능하다고 진술해 구금명령(OD)을, 19세 대학생(사이러스)은 복합적 극단주의 성향으로 거주제한명령(RO)을 받았으며 두 명령 모두 3월에 발효됐다. 가자전쟁을 계기로 ISA 조치를 받은 것은 이들이 7·8번째 사례다.",
    fullContent: `**내부보안법(ISA) 명령 발표 (싱가포르 내무부·ISD, 2026년 6월 24일)**

**대상자**
- 타르미지 빈 모드 타하(30세, 고객서비스직): 구금명령(Order of Detention)
- 사이러스 둘카르나인 알샤리아르(19세, 대학생): 거주제한명령(Restriction Order)
- 두 명령 모두 2026년 3월 발효

**배경**
- 타르미지: 2023년 10월 하마스의 이스라엘 공격 이후 SNS에서 하마스 선전물에 노출, 무력 사용이 정당하다고 믿게 됐으며 하마스가 지시하면 싱가포르 내에서도 공격을 벌일 수 있다고 진술
- 사이러스: ISD가 '복합적 극단주의(Composite Violent Extremism, 일명 "샐러드바" 극단주의)'로 분류 — 여러 갈래의(때로 서로 상충하는) 극단주의 사상에 동시에 영향을 받은 사례. 2022년 이슬람 관련 온라인 커뮤니티에 참여하다 반서구·반LGBTQ 콘텐츠에 노출됐고, 2023년 이후 하마스의 민간인 살해를 '지하드'로 정당화하는 발언을 함

**의미**
- 가자전쟁(2023년 10월 이후)을 계기로 ISA 조치를 받은 싱가포르인은 이들로 7번째·8번째

**한인 참고**
- 직접적인 피해 위험을 알리는 뉴스는 아니며, 싱가포르 정부가 온라인 극단주의 확산을 적극적으로 감시·대응하고 있다는 점을 보여주는 사례
- 자녀가 SNS·온라인 커뮤니티에서 특정 이념에 과도하게 몰입하는 정후가 보이면 주의 깊게 살펴볼 필요가 있음

정확한 내용은 원문(아래 출처)을 확인하세요.`,
    source: "싱가포르 내무부(MHA)·ISD",
    sources: [
      { name: "MHA — Issuance of Orders Under the Internal Security Act Against Two Self-Radicalised Singaporean Youths", url: "https://www.mha.gov.sg/mediaroom/press-releases/issuance-of-orders-under-the-internal-security-act-against-two-self-radicalised-singaporean-youths/" },
      { name: "Mothership — 2 self-radicalised S'poreans, aged 19 & 30, issued ISA orders, 1 willing to conduct attacks in S'pore if instructed by Hamas", url: "https://mothership.sg/2026/06/isa-orders-self-radicalisation-19-30/" },
      { name: "Malay Mail — Two Singaporeans detained under ISA after self-radicalisation linked to Gaza war", url: "https://www.malaymail.com/news/singapore/2026/06/24/two-singaporeans-detained-under-isa-after-self-radicalisation-linked-to-gaza-war/225046" },
    ],
    time: "2026년 6월 24일",
    isBreaking: true,
    readTime: "3분",
    emoji: "🚨",
    relatedIds: [],
  },
  {
    id: "auto-20260624-7",
    publishedAt: "2026-06-18",
    category: "생활",
    catStyle: "bg-[#FBF5E8] text-[#B07010]",
    title: "💡 7월 전기요금 '대폭' 인상 예고 — 에너지청, 중동 사태發 가스값 급등으로 최대 30% 상승 전망",
    summary: "싱가포르 에너지청(EMA)이 6월 18일 더 스트레이츠 타임스에 3분기(7~9월) 규제 전기요금이 'significantly'(상당히) 오를 것이라고 확인했다. 현재 요금(GST 포함 kWh당 29.72센트) 대비 분석가들은 최대 30%까지 인상을 전망하며, 원인은 2월 말 이후 이란을 둘러싼 분쟁과 호르무즈 해협 관련 천연가스 가격 급등이다. 정부는 7월 U-Save 리베이트(가구당 110~190달러)로 부담을 일부 완화할 계획이다.",
    fullContent: `**전기요금 3분기(7~9월) 인상 전망 (에너지청 EMA, 2026년 6월 18일 확인)**

**현황**
- 에너지청(EMA)이 6월 18일 더 스트레이츠 타임스에 규제 전기요금(가구 62.8%가 적용받는 요금)이 3분기부터 'significantly'(상당히) 오를 것이라 확인
- 현재(4~6월) 요금: GST 포함 kWh당 **29.72센트**
- 분석가 전망: 최대 **30%**까지 인상 가능성

**원인**
- 2월 말 미국·이스라엘의 이란 공습 이후 호르무즈 해협이 사실상 봉쇄되며 천연가스 가격 급등
- 싱가포르는 발전 연료의 95%를 수입에 의존해 국제 가스값 변동에 취약
- 요금은 전 분기 첫 2.5개월 평균 연료비로 산정되는 구조라, 최근 미·이란 휴전 합의도 7월 요금에는 반영되지 않음

**정부 지원**
- 7월 중 U-Save 리베이트(가구당 110~190달러) 및 SCC(관리비) 리베이트 지급 예정

**한인 참고**
- 7월 1일부터 실제 고지서에 인상분이 반영되므로, 전기 사용량이 많은 가정은 미리 절약 계획을 세워두는 것이 좋음
- 오픈일렉트리시티마켓(OEM) 고정요금제 계약자는 이번 인상의 직접 영향은 적지만, 계약 갱신 시점에는 새 시세가 반영될 수 있음

정확한 내용은 원문(아래 출처)을 확인하세요.`,
    source: "싱가포르 에너지청(EMA)",
    sources: [
      { name: "Mothership — S'pore electricity tariff expected to rise 'significantly' from July: EMA", url: "https://mothership.sg/2026/06/electricity-tariff-july-2026-expected-rise/" },
      { name: "VnExpress International — Singapore households warned of 'significant' electricity tariff hike in coming months", url: "https://e.vnexpress.net/news/business/economy/singapore-households-warned-of-significant-electricity-tariff-hike-in-coming-months-5087292.html" },
    ],
    time: "2026년 6월 18일",
    isBreaking: false,
    readTime: "3분",
    emoji: "💡",
    relatedIds: [],
  },
  {
    id: "auto-20260624-1",
    publishedAt: "2026-06-10",
    category: "사회",
    catStyle: "bg-[#F5F0FF] text-[#7040C0]",
    title: "🎫 BTS 콘서트 티켓 사기 주의보 — 6월 1일 이후 62건·6만8천200달러 피해, 12월 'Arirang' 싱가포르 공연 전 회차 매진",
    summary: "싱가포르 경찰(SPF)에 따르면 6월 1일 이후 BTS 월드투어 'Arirang' 콘서트 티켓 판매 사기가 최소 62건 발생, 피해액이 6만8천200달러를 넘었다. X·인스타그램·캐러셀 등에서 티켓을 판다며 PayNow로 결제를 유도한 뒤 '수수료' 등 추가 송금을 요구하는 수법이다. 해당 콘서트는 12월 17·19·20·22일 내셔널 스타디움에서 열리며, BTS가 완전체로 7년 만에 싱가포르를 찾는 공연으로 전 회차 매진됐다.",
    fullContent: `**BTS 콘서트 티켓 사기 경보 (싱가포르 경찰, 2026년 6월)**
싱가포르 경찰(SPF)이 발표한 내용입니다.

**피해 현황**
- 6월 1일 이후 최소 **62건** 신고, 피해액 최소 **6만8천200달러(S$68,200)**

**수법**
- X(트위터)·인스타그램·캐러셀 등 SNS에서 "콘서트 티켓 판매" 게시물·DM으로 접근
- PayNow 또는 QR코드로 결제 유도 → 결제 후 "수수료" 등 명목으로 추가 송금 요구
- 티켓이 오지 않거나 판매자와 연락이 끊겨야 사기임을 인지

**콘서트 정보(참고)**
- BTS 월드투어 'Arirang' 싱가포르 공연: 12월 17·19·20·22일, 내셔널 스타디움
- 완전체로 7년 만의 싱가포르 공연이며, 공식 채널(Ticketmaster) 기준 전 회차 매진
- Ticketmaster 약관상 리세일 티켓 사용 시 입장이 거부되며 환불도 되지 않음

**경찰 안내**
- 콘서트 티켓은 공식 판매처(Ticketmaster 등)에서만 구매할 것
- SNS 개인 판매자에게 선입금하지 말 것, 의심 시 ScamShield 앱 또는 1799 확인

**한인 참고**
- 싱가포르 거주 한인 팬덤 다수가 이번 공연 티켓을 구하려 SNS 개인거래를 시도할 수 있어 특히 주의가 필요
- 리세일 티켓은 설령 진짜 티켓이라도 공연장 입장이 거부될 수 있다는 점도 유의할 것

정확한 내용은 원문(아래 출처)을 확인하세요.`,
    source: "싱가포르 경찰(SPF)",
    sources: [
      { name: "SPF — Police Advisory On Scams Involving The Sale Of BTS World Tour 'Arirang' Concert Tickets", url: "https://www.police.gov.sg/Media-Hub/News/2026/06/20260610_police_advisory_on_scams_involving_the_sale_of_bts_world_tour_arirang_concert_tickets" },
      { name: "Klook — BTS World Tour 'Arirang' in Singapore", url: "https://www.klook.com/en-US/blog/bts-world-tour-arirang-singapore/" },
    ],
    time: "2026년 6월 10일 경보(피해 집계 진행 중)",
    isBreaking: true,
    readTime: "3분",
    emoji: "🎫",
    relatedIds: ["28"],
  },
  {
    id: "auto-20260624-2",
    publishedAt: "2026-06-04",
    category: "사회",
    catStyle: "bg-[#F5F0FF] text-[#7040C0]",
    title: "💰 \"무료 투자강의\" 빙자 사기 — 5월 이후 48건·360만 달러 피해, SNS 광고→ 채팅방 초대 수법",
    summary: "싱가포르 경찰(SPF)에 따르면 5월 이후 '무료 투자강의'를 빙자한 채팅방 투자 사기가 최소 48건 발생해 피해액이 360만 달러를 넘었다. SNS 광고로 유인해 왓츠앱 채팅방에 초대한 뒤 '멘토'를 자처하는 사기범과 가짜 수익 인증을 보여주는 '회원'들이 투자를 권유하고, 가짜 앱·웹사이트에 투자하게 한 뒤 인출을 막는 수법이다.",
    fullContent: `**"무료 투자강의" 채팅방 투자 사기 경보 (싱가포르 경찰, 2026년 6월 4일 발표)**

**피해 현황**
- 5월 이후 최소 **48건** 신고, 피해액 최소 **360만 달러(S$3.6 million)**

**수법**
- SNS에서 "무료로 투자를 배울 수 있다"는 광고 게시 → 관심 등록 시 왓츠앱 채팅방으로 초대
- 채팅방 내 '멘토'를 자처하는 인물이 투자 조언·보너스를 제공하며 투자를 유도
- 다른 '회원'들이 가짜 수익 인증 스크린샷을 공유해 신뢰를 유도
- 피해자는 사기범이 안내한 가짜 투자 웹사이트나 앱(애플 앱스토어·구글플레이 외 경로 포함)을 통해 자금을 입금
- 수익을 인출하려 하면 막히거나 사기범과 연락이 끊겨야 사기임을 인지

**경찰 안내**
- 신원이 확인되지 않은 사람에게 금전·귀중품을 건네지 말 것
- 투자 회사·상품은 MAS(통화청) 공식 웹사이트에서 등록 여부를 먼저 확인할 것

**한인 참고**
- SNS에서 '무료 투자 강의' 광고를 보고 단체방에 초대받았다면 투자 권유로 이어지는지 주의할 것
- 의심 시 ScamShield 앱 또는 1799(안티스캠 핫라인) 확인

정확한 내용은 원문(아래 출처)을 확인하세요.`,
    source: "싱가포르 경찰(SPF)",
    sources: [
      { name: "SPF — Police Advisory On Investment Scams Involving Chat Groups That Offer Fake Opportunities To Learn Investing", url: "https://www.police.gov.sg/Media-Hub/News/2026/06/20260604_police_advisory_on_investment_scams_involving_chat_groups" },
      { name: "The Independent Singapore — SG police report: S$3.6M lost from 'free lessons' investment scams via chat group since May", url: "https://theindependent.sg/sg-police-report-s-3-6m-lost-from-free-lessons-investment-scams-via-chat-group-since-may/" },
    ],
    time: "2026년 6월 4일",
    isBreaking: true,
    readTime: "3분",
    emoji: "💰",
    relatedIds: ["28"],
  },
  {
    id: "auto-20260624-3",
    publishedAt: "2026-06-09",
    category: "사회",
    catStyle: "bg-[#F5F0FF] text-[#7040C0]",
    title: "🖥️ MS(마이크로소프트) 기술지원 사칭 사기 — 2월 이후 170만 달러 피해, 가짜 '해킹 경고' 팝업→ 가짜 경찰관 연결",
    summary: "싱가포르 경찰(SPF)·사이버보안청(CSA) 공동 경보에 따르면 2월 이후 마이크로소프트(MS) 기술지원을 사칭한 사기가 최소 10건 발생해 피해액이 170만 달러를 넘었다. 브라우저에 '기기가 해킹됐다'는 가짜 팝업이 뜨고, 안내된 번호로 전화하면 가짜 경찰관에게 연결돼 '자금세탁에 연루됐다'며 계좌이체·원격조종을 요구받는 수법이다.",
    fullContent: `**MS 기술지원 사칭 사기 공동 경보 (SPF·CSA, 2026년 6월 9일 발표)**

**피해 현황**
- 2월 이후 최소 **10건** 신고, 피해액 최소 **170만 달러(S$1.7 million)**

**수법**
- 인터넷 브라우저에 마이크로소프트(MS)를 사칭한 팝업 경고 — "기기가 해킹·손상됐다"는 내용
- 팝업에 안내된 인터넷전화 번호로 전화하면 "기술지원 담당자"와 연결
- 이후 "경찰관"을 사칭하는 또 다른 사기범에게 전화가 넘겨지며, 해당 기기가 자금세탁 등 범죄에 연루됐다고 주장
- 계좌이체, 은행 로그인 정보 제공, 또는 기기 원격조종 허용을 요구

**경찰·CSA 안내**
- 마이크로소프트는 오류·경고 메시지에 전화번호를 포함하지 않음
- 팝업에 표시된 번호로 전화하거나 링크·버튼을 클릭하지 말고, 브라우저를 종료할 것

**한인 참고**
- 평소 사용하는 PC·노트북에 이런 팝업이 뜨면 절대 전화하지 말고 그대로 브라우저를 닫을 것
- 원격조종 프로그램 설치나 계좌 정보 요구는 모두 사기로 간주할 것

정확한 내용은 원문(아래 출처)을 확인하세요.`,
    source: "SPF · CSA",
    sources: [
      { name: "SPF — Joint Advisory On Technical Support Scams Involving The Impersonation Of Microsoft", url: "https://www.police.gov.sg/Media-Hub/News/2026/06/20260609_joint_advisory_on_technical_support_scams_involving_the_impersonation_of_microsoft" },
      { name: "CSA — Joint Advisory on Technical Support Scams Involving the Impersonation of Microsoft", url: "https://www.csa.gov.sg/alerts-and-advisories/advisories/ad-2026-006/" },
      { name: "Yahoo News Singapore — At least $1.7m lost since February to scams where fraudsters impersonate Microsoft tech support", url: "https://sg.news.yahoo.com/least-1-7m-lost-since-155000129.html" },
    ],
    time: "2026년 6월 9일",
    isBreaking: true,
    readTime: "3분",
    emoji: "🖥️",
    relatedIds: ["28"],
  },
  {
    id: "auto-20260624-4",
    publishedAt: "2026-06-22",
    category: "취업",
    catStyle: "bg-[#EBF5F0] text-[#2B7A50]",
    title: "📊 싱가포르 직장 몰입도 14%로 세계 최저권 — 35세 미만은 10%만 \"몰입\", 절반 이상 매일 스트레스",
    summary: "노동부(MOM) 디네시 바수 다시(Dinesh Vasu Dash) 차관이 6월 22일 발표한 'Singapore Workplace Report 2026'(갤럽 공동조사)에 따르면 싱가포르 직장인 몰입도는 14%로 세계 평균(20%)·동남아 평균(25%)보다 낮았다. 35세 미만 근로자는 10%만 몰입한다고 답해 35세 이상(16%)보다 낮았고, 이들은 매일 스트레스·걱정 등을 더 많이 느낀다고 응답했다. 다만 삶을 긍정적으로 평가하는 비율은 40%로 동남아·세계 평균보다 높았다.",
    fullContent: `**Singapore Workplace Report 2026 발표 (2026년 6월 22일)**
노동부(MOM) 디네시 바수 다시 인력담당 정무차관이 갤럽과 공동 조사한 'Singapore Workplace Report 2026' 발표 행사에서 밝힌 내용입니다.

**직장 몰입도**
- 싱가포르 직장인 몰입도 **14%** — 세계 평균(20%), 동남아 평균(25%)보다 낮음
- 2019년 이후 낮은 수준에서 큰 변화 없이 정체

**세대별 격차**
- 35세 미만 근로자: 몰입도 **10%**
- 35세 이상 근로자: 몰입도 **16%**
- 35세 미만은 35세 이상보다 매일 스트레스·걱정·분노·슬픔을 더 많이 느낀다고 응답

**삶의 만족도는 양호**
- "삶을 긍정적으로 평가" 비율 **40%** — 동남아 평균(36%), 세계 평균(34%)보다 높음

**정부 메시지**
- 차관은 만성적으로 낮은 직장 몰입도가 장기적으로 싱가포르 경제 경쟁력에 "전략적 리스크"가 될 수 있다고 지적
- 기업에 인적자원 관리를 단순 HR 업무가 아닌 경영 전략 우선순위로 다룰 것을 당부

**한인 참고**
- 싱가포르에서 취업·이직을 고려 중이라면 전반적인 직장 문화(낮은 몰입도·세대 간 스트레스 격차)를 참고할 만한 자료
- 회사 선택 시 워라밸·매니지먼트 문화를 면접 단계에서 확인해보는 것을 권장

정확한 내용은 원문(아래 출처)을 확인하세요.`,
    source: "MOM · Gallup",
    sources: [
      { name: "MOM — Keynote Address by MOS Dinesh Vasu Dash at Launch of Singapore Workplace Report 2026", url: "https://www.mom.gov.sg/newsroom/speeches/2026/0622-mos-keynote-address-at-launch-of-singapore-workplace-report-2026" },
      { name: "Mothership — Only 10% of S'pore employees under 35 feel engaged at work, over half face stress daily: 2026 Gallup report", url: "https://mothership.sg/2026/06/singapore-2026-gallup-report/" },
    ],
    time: "2026년 6월 22일",
    isBreaking: false,
    readTime: "3분",
    emoji: "📊",
    relatedIds: [],
  },
  {
    id: "auto-20260622-6",
    publishedAt: "2026-06-22",
    category: "사회",
    catStyle: "bg-[#F5F0FF] text-[#7040C0]",
    title: "🚨 LTA 사칭 피싱 사기 재발 — ERP 미납 문자 클릭 유도, 6월 들어 13건·피해액 7만4천 달러",
    summary: "싱가포르 경찰(SPF)에 따르면 6월 1일 이후 LTA(육상교통청)를 사칭해 'ERP(혼잡통행료) 미납' 문자로 피싱 링크 클릭을 유도하는 사기가 최소 13건 발생했고 피해액은 7만4천 달러를 넘었다. 가짜 LTA·OneMotoring 페이지에서 차량번호·계좌정보를 입력하게 유도하는 방식이며, 경찰은 실제 LTA 문자에는 결제 링크가 없고 발신자는 'gov.sg'로 표시된다고 안내했다.",
    fullContent: `**LTA 사칭 피싱 사기 경보 (2026년 6월 22일)**
싱가포르 경찰(SPF)이 6월 22일 발표한 내용입니다.

**피해 현황**
- 6월 1일 이후 최소 13건 신고, 피해액 최소 7만4천 달러(S$74,000)
- 앞서 2월에도 같은 수법(말레이시아 여행객 대상 ERP 문자)으로 최소 10건·2만4천 달러 피해 발생

**수법**
- LTA를 사칭한 문자메시지로 "ERP(혼잡통행료) 미납, 추가 과태료 부과 전 결제" 안내
- 문자 속 링크 클릭 시 실제 LTA·OneMotoring과 비슷한 가짜 사이트로 연결
- 가짜 사이트에서 차량번호, 은행 계좌·카드 정보 등 개인정보 입력 유도

**경찰 안내**
- LTA가 보내는 미납 요금·도로세 안내 문자에는 결제 링크가 없음
- 정부 공식 문자는 발신자가 'gov.sg'로 표시되며, 전자고지서는 Singpass 로그인으로만 확인 가능
- 의심스러운 링크 클릭 금지, 개인정보·계좌정보·OTP를 누구에게도 알려주지 말 것

**한인 참고**
- 차량을 소유했거나 말레이시아 등 인접국으로 자주 이동하는 한인이라면 특히 주의할 것
- 'LTA' 명의 문자에 결제 링크가 있다면 클릭하지 말고 OneMotoring 공식 앱·웹사이트에서 직접 확인할 것
- 의심 시 ScamShield 앱 또는 1799(안티스캠 핫라인) 확인

정확한 내용은 원문(아래 출처)을 확인하세요.`,
    source: "싱가포르 경찰(SPF)",
    sources: [
      { name: "Yahoo News Singapore — LTA impersonation phishing scams on the rise again, with at least $74,000 lost in 3 weeks", url: "https://sg.news.yahoo.com/lta-impersonation-phishing-scams-rise-125300991.html" },
    ],
    time: "2026년 6월 22일",
    isBreaking: true,
    readTime: "2분",
    emoji: "🚨",
    relatedIds: [],
  },
  {
    id: "auto-20260622-7",
    publishedAt: "2026-06-29",
    category: "사회",
    catStyle: "bg-[#F5F0FF] text-[#7040C0]",
    title: "🛡️ 온라인안전위원회(OSC) 6월 29일 출범 — 온라인 괴롭힘·명예훼손 피해자 신속 구제 절차 신설",
    summary: "싱가포르 법무부(MinLaw)·디지털개발정보부(MDDI) 발표에 따르면 온라인안전위원회(Online Safety Commission)와 온라인안전(구제 및 책임)법 2025가 6월 29일부터 시행된다. 온라인 괴롭힘·스토킹·명예훼손성 게시물 등 피해를 입은 시민이 위원회를 통해 빠른 구제를 받을 수 있게 되며, 6월 1일부터 위원장 직무대행을 맡은 Francis Ng가 6월 29일 정식 위원장이 된다.",
    fullContent: `**온라인안전위원회(OSC) 출범 (2026년 6월 29일 시행)**
법무부(MinLaw)·디지털개발정보부(MDDI)가 공동 발표한 내용입니다.

**시행일**
- 2026년 6월 29일부터 온라인안전위원회(Online Safety Commission)와 온라인안전(구제 및 책임)법 2025(OSRAA)의 관련 조항 시행

**무엇이 달라지나**
- 온라인 괴롭힘, 사이버스토킹, 명예훼손성 게시물, 음란합성물(딥페이크) 등 온라인 피해를 입은 사람이 위원회를 통해 콘텐츠 삭제·시정 명령 등 신속한 구제를 요청할 수 있음
- 위원회는 유해 콘텐츠 게시자, 온라인 공간 운영자, 플랫폼 사업자에게 직접 시정 지시를 내릴 권한을 가짐

**조직**
- Francis Ng(50)가 6월 1일부터 위원장 직무대행(Commissioner-Designate)을 맡았고, 6월 29일 정식 위원장(Commissioner)으로 취임
- 법무부 법무정책국장, 검찰청 범죄수사부 부장검사 등을 지낸 25년 경력의 법조인

**한인 참고**
- 온라인에서 괴롭힘·명예훼손·신상유출(독싱) 피해를 입었다면 6월 29일부터 OSC를 통한 구제 신청이 가능해짐
- 신청 절차·자격 등 세부 사항은 MinLaw·MDDI 공식 발표를 확인할 것

정확한 내용은 원문(아래 출처)을 확인하세요.`,
    source: "MinLaw · MDDI",
    sources: [
      { name: "MinLaw — Online Safety Commission and Online Safety (Relief and Accountability) Act 2025 to Start on 29 June 2026", url: "https://www.mlaw.gov.sg/online-safety-commission-and-online-safety-relief-and-accountability-act-2025-to-start-on-29-june-2026/" },
      { name: "MDDI — Online Safety Commission And Online Safety (Relief And Accountability) Act 2025 to start on 29 June 2026", url: "https://www.mddi.gov.sg/newsroom/online-safety-commission-and-online-safety--relief-and-accountability--act-2025-to-start-on-29-june-2026/" },
    ],
    time: "2026년 6월 29일 시행 예정(6월 발표)",
    isBreaking: false,
    readTime: "3분",
    emoji: "🛡️",
    relatedIds: [],
  },
  {
    id: "auto-20260622-8",
    publishedAt: "2026-06-15",
    category: "취업",
    catStyle: "bg-[#EBF5F0] text-[#2B7A50]",
    title: "📉 1분기 정리해고 3년래 최고 — 3,830명, 학위소지자·50대 타격 더 커",
    summary: "MOM(노동부) 1분기 노동시장 보고서(6월 15일 발표)에 따르면 정리해고가 3,830명으로 직전 분기(3,690명)보다 늘어 2023년 3분기 이후 최다를 기록했다. 학위 소지자의 정리해고 비율이 1천명당 2.6명에서 3.1명으로 가장 높게 뛰었고, 50~59세 고령 근로자도 2.8명에서 3.1명으로 올랐다. 다만 전체 고용은 9,400명 늘어 18개 분기 연속 증가했고, 정리해고 후 6개월 내 재취업률도 60.7%로 개선됐다.",
    fullContent: `**1분기(Q1) 2026 노동시장 보고서 (6월 15일 발표)**
노동부(MOM)가 발표한 2026년 1분기 노동시장 보고서 내용입니다.

**정리해고**
- 1분기 정리해고 **3,830명** — 직전 분기(3,690명)보다 증가, 2023년 3분기 이후 최다
- 주요 사유는 비용절감보다 **조직 재편·구조조정**
- 제조업·금융서비스업·전문서비스업에서 많이 발생

**계층별 영향**
- 학위 소지자: 1천명당 정리해고 비율 2.6명 → **3.1명**(전 학력군 중 최고)
- 50~59세: 2.8명 → **3.1명**
- 중졸 이하: 0.7명, 디플로마·전문자격: 1.1명

**고용 전체는 견조**
- 전체 고용 9,400명 증가 — 2021년 4분기 이후 18개 분기 연속 증가
- 정리해고 후 6개월 내 재취업률 60.7%(직전 57.4%에서 개선)
- 다만 향후 3개월 내 채용계획이 있는 기업은 5곳 중 2곳 미만

**대체 수단**
- 정리해고 대신 단축근무·임시휴직을 택한 근로자 1,230명(직전 960명에서 증가)

**한인 참고**
- EP·S Pass로 금융·전문서비스·제조업에 종사 중이라면 구조조정 영향권에 있을 수 있어 고용 상황을 주시할 것
- 정리해고 시 통지·보상 등 기본 권리는 MOM 공식 안내를 확인할 것

정확한 내용은 원문(아래 출처)을 확인하세요.`,
    source: "MOM",
    sources: [
      { name: "Human Resources Online — Retrenchments edged up in Q1, but Singapore's labour market stayed broadly stable, says MOM", url: "https://www.humanresourcesonline.net/retrenchments-edged-up-in-q1-but-singapore-s-labour-market-stayed-broadly-stable-says-mom" },
      { name: "Malay Mail — Singapore retrenchments rise in Q1 as degree holders and older workers face sharper impact", url: "https://www.malaymail.com/news/singapore/2026/06/15/singapore-retrenchments-rise-in-q1-as-degree-holders-and-older-workers-face-sharper-impact/223883" },
    ],
    time: "2026년 6월 15일",
    isBreaking: false,
    readTime: "3분",
    emoji: "📉",
    relatedIds: [],
  },
  {
    id: "auto-20260622-9",
    publishedAt: "2026-06-16",
    category: "날씨",
    catStyle: "bg-[#EBF5F0] text-[#2B7A50]",
    title: "🌩️ 6월 남은 기간 거의 매일 천둥소나기 — NEA \"수마트라 스콜 동반 가능\", 낮 최고 33~34도",
    summary: "기상청(NEA)이 6월 16일 발표한 기후전망에 따르면 6월 남은 기간 동안 거의 매일 늦은 오전~오후에 국지적 천둥소나기가 예상되며, 일부 날은 새벽~정오 사이 수마트라 스콜(돌풍 동반 비구름대)도 발생할 수 있다. 남서 몬순 영향으로 낮 최고기온은 33~34도로 예상된다.",
    fullContent: `**6월 후반 날씨 전망 (NEA, 6월 16일 발표)**
기상청(NEA)이 발표한 2026년 6월 후반 날씨 전망입니다.

**천둥소나기**
- 6월 남은 기간 거의 매일 늦은 오전~오후, 싱가포르 북부·동부·서부 지역 중심으로 국지적 천둥소나기 예상
- 광범위한 바람 수렴이 있는 날은 강한 비가 내릴 수 있음

**수마트라 스콜**
- 일부 날은 새벽~정오 사이 수마트라 스콜(돌풍을 동반한 비구름대) 발생 가능 — 광범위한 비·강풍 동반

**기온**
- 낮 최고기온 대부분 33~34도
- 남서 몬순이 6월부터 9월 말까지 이어질 전망(우기철 천둥번개 활동이 전형적으로 잦은 시기)

**한인 참고**
- 야외활동·통근 시 우산을 휴대하고, 특히 늦은 오전~오후 시간대 갑작스러운 비를 염두에 둘 것
- 천둥 시 야외 수영장·운동장 이용은 자제하고, 최신 경보는 NEA myENV 앱·weather.gov.sg에서 확인할 것

정확한 내용은 원문(아래 출처)을 확인하세요.`,
    source: "NEA",
    sources: [
      { name: "NEA — Thundery Showers Expected On Most Days For The Rest Of June 2026", url: "https://www.nea.gov.sg/media/news/advisories/index/thundery-showers-expected-on-most-days-for-the-rest-of-june-2026" },
    ],
    time: "2026년 6월 16일",
    isBreaking: false,
    readTime: "2분",
    emoji: "🌩️",
    relatedIds: [],
  },
  {
    id: "auto-20260622-10",
    publishedAt: "2026-06-27",
    category: "교육",
    catStyle: "bg-[#FBF0EC] text-[#D04020]",
    title: "🎓 MOE \"PSLE 부담 줄이기\" 공개 논의 시작 — 6월 27일 첫 공개 세션, DSA 제도 개편도 포함",
    summary: "교육부(MOE)가 PSLE(초등 졸업시험)의 중등 배정 활용 방식과 DSA(직접학교입학) 제도 개편 등을 주제로 한 'Education Conversations' 공개 의견수렴을 시작했다. 4월부터 교육 전문가·학부모·청년 대상 포커스그룹을 진행했고, 6월 27일 Desmond Lee 교육부장관이 직접 이끄는 첫 공개 세션이 열렸다. 논의는 2026~2027년에 걸쳐 계속된다.",
    fullContent: `**MOE 'Education Conversations' 공개 의견수렴 시작**
교육부(MOE) 발표 내용입니다.

**배경**
- PSLE(초등 졸업시험) 성적이 중등학교 배정에 미치는 영향과 '학업 군비경쟁' 우려에 대한 학부모·사회 논쟁이 이어짐에 따라, MOE가 공개 의견수렴 절차를 시작

**진행 방식**
- 4월부터 교육 전문가·학부모·청년 대상 소규모 포커스그룹 진행
- 6월 27일(토) Desmond Lee 교육부장관이 이끄는 첫 공개 세션 개최
- 이후 2026~2027년에 걸쳐 대면·온라인('Education Conversations' 마이크로사이트) 의견수렴 계속

**주요 논의 주제**
- PSLE를 중등 1학년 배정에 활용하는 방식 등 시험 부담 완화 방안
- DSA(직접학교입학) 제도 개편 — 학생 역량 개발·선발 방식·접근성 개선
- 인성·시민교육(CCE)·교내외 활동(CCA) 강화로 가치관·생활역량 함양

**한인 참고**
- 자녀가 현지 정부학교(특히 초·중등)에 재학 중인 한인 가정은 PSLE·DSA 제도 변화가 입시 전략에 직접 영향을 줄 수 있어 추이를 지켜볼 것
- 구체적 개편안은 아직 확정되지 않았으며 MOE 공식 발표를 통해 순차적으로 공개될 예정

정확한 내용은 원문(아래 출처)을 확인하세요.`,
    source: "MOE",
    sources: [
      { name: "MOE — Education Conversations", url: "https://www.moe.gov.sg/news/press-releases/20260528-education-conversations" },
    ],
    time: "2026년 6월 27일(첫 공개 세션)",
    isBreaking: false,
    readTime: "3분",
    emoji: "🎓",
    relatedIds: [],
  },
  {
    id: "auto-20260622-1",
    publishedAt: "2026-04-28",
    category: "교통",
    catStyle: "bg-[#EBF5F0] text-[#2B7A50]",
    title: "🚆 TEL·DTL 금요일 단축운행·토요일 늦은 개통 — TEL 7/4까지, DTL 7/10~9/5 셔틀버스 운행",
    summary: "LTA·SBS Transit·SMRT 공동 발표에 따르면 톰슨이스트코스트선(TEL)이 5월 22일~7월 12일 시행 중, 다운타운선(DTL)이 7월 10일~9월 5일 매주 금요일 밤 11시 30분 조기 종료·토요일 오전 8시 30분 늦은 개통된다. TEL 5단계·DTL3 연장 개통 전 최종 통합 시험운행 때문이며, 토요일 늦은 개통 시간대엔 환승역 연계 셔틀버스가 운행된다.",
    fullContent: `**TEL·DTL 주말 단축운행 (2026년 4~9월)**
LTA·SBS Transit·SMRT가 공동 발표한 톰슨이스트코스트선(TEL)·다운타운선(DTL) 시운전 관련 운행 조정입니다.

**시행 기간**
- **TEL**: 5월 22일~7월 4일, 매주 금요일 밤 11시 30분 조기 종료 / 토요일 오전 8시 30분 늦은 개통
- **DTL**: 7월 10일~9월 5일, 동일하게 금요일 밤 11시 30분 조기 종료 / 토요일 오전 8시 30분 늦은 개통

**이유**
- TEL 5단계(Xilin·Bedok South·Sungei Bedok)와 DTL3 연장 개통(2026년 하반기 예정)에 앞서, 신규 구간을 기존 노선에 통합하는 최종 시스템 통합 시험운행 필요
- 야간 시간대 정규 정비시간으로는 부족해 금요일 밤~토요일 아침 운행시간을 늘려 시험

**대체 교통**
- 토요일 늦은 개통 시간대엔 환승역 연계 셔틀버스 3개 노선 운행(DTL 구간은 부기스·맥퍼슨 환승역 연계)

**한인 참고**
- 금요일 야간 약속·새벽 귀가, 토요일 오전 일찍 이동 계획이 있다면 해당 기간 TEL·DTL 이용 시 시간을 다시 확인할 것
- 정확한 적용 구간·셔틀버스 노선은 LTA·SMRT·SBS Transit 공지를 확인할 것

정확한 내용은 원문(아래 출처)을 확인하세요.`,
    source: "LTA·SBS Transit·SMRT",
    sources: [
      { name: "LTA — Train Service Adjustments along TEL and DTL to Facilitate Rail Expansion Works", url: "https://www.lta.gov.sg/content/ltagov/en/newsroom/2026/4/news-releases/train-service-adjustments-tel-and-dtl-to-facilitate-rail-expansion-works.html" },
      { name: "TheSmartLocal — Train Service Adjustments For TEL & DTL From May To Sep 2026", url: "https://thesmartlocal.com/read/tel-dtl-train-service-adjustments/" },
    ],
    time: "2026년 4월 28일 발표",
    isBreaking: false,
    readTime: "2분",
    emoji: "🚆",
    relatedIds: ["29"],
  },
  {
    id: "auto-20260622-2",
    publishedAt: "2026-06-10",
    category: "사회",
    catStyle: "bg-[#F5F0FF] text-[#7040C0]",
    title: "⚠️ ICA 사칭 전화·영상통화 사기 + IRAS '세금 추징' 피싱 메일 — 두 정부기관 동시 경보",
    summary: "ICA(이민국)는 1월 이후 자신을 ICA 직원이라 사칭하며 전화·영상통화로 '가족이 구금됐다'는 등 협박하는 사기 신고가 잇따른다고 6월 10일 경보했다. 앞서 6월 2일에는 IRAS(국세청)가 '세금 추징·미신고 벌금' 제목의 피싱 이메일을 사칭 발송하는 사기에 대해 경보했다. 두 기관 모두 공식 절차상 은행정보·계좌이체를 요구하지 않는다고 강조했다.",
    fullContent: `**정부기관 사칭 사기 경보 2건 (2026년 6월)**

**① ICA(이민국) 사칭 전화·영상통화 사기 (6월 10일 경보)**
- 1월 이후 신고 다수, 사기 유형 2가지
  1) ICA 직원을 사칭해 전화·영상통화 — ICA 마크를 프로필 사진으로 쓰거나 제복을 입고 영상통화로 신뢰를 유도
  2) 가족·지인을 사칭 — "당신 또는 가족이 ICA에 구금됐다"며 위조 문서(ICA 마크·직원 서명 위조 포함)까지 제시
- ICA는 "직원은 절대 은행 로그인 정보를 요구하거나, 계좌이체를 요청하거나, 구금자 석방 명목으로 돈을 요구하지 않는다"고 강조
- 확인 방법: ICA 공식 피드백 양식 또는 6391-6100 전화

**② IRAS(국세청) '세금 추징' 피싱 메일 (6월 2일 경보)**
- "Official Notice of Tax Demand & Penalty", "Tax Penalty – Under-declaration of Income" 등 제목의 이메일로 IRAS 사칭
- "소득을 축소 신고했다"며 벌금 납부·이의신청을 유도하는 의심 링크 포함(피싱 사이트·악성코드 위험)
- IRAS는 세금 관련 공지를 비보안 이메일로 보내지 않으며, 모든 거래는 Singpass 인증이 필요한 myTax Portal에서만 이뤄진다고 안내

**한인 주의 팁**
- 영어가 서툴거나 한국 행정 절차에 익숙해 낯선 협박성 전화·영상통화를 받으면 일단 끊고, ICA·IRAS 공식 채널로 직접 확인할 것
- 이메일 속 링크·첨부파일은 클릭하지 말고, 공식 포털(myTax, ICA 사이트)에 직접 로그인해 확인할 것
- 의심 시 ScamShield 앱 또는 1799(안티스캠 핫라인) 확인

정확한 내용은 원문(아래 출처)을 확인하세요.`,
    source: "ICA · IRAS · Malay Mail",
    sources: [
      { name: "ICA — Public Advisory on Scam Callers Impersonating as ICA Officers", url: "https://www.ica.gov.sg/news-and-publications/newsroom/media-release/public-advisory-on-scam-callers-impersonating-as-ica-officers" },
      { name: "Malay Mail — Singapore ICA warns of scammers posing as officers in phone and video impersonation scams", url: "https://www.malaymail.com/news/singapore/2026/06/10/singapore-ica-warns-of-scammers-posing-as-officers-in-phone-and-video-impersonation-scams/223206" },
      { name: "IRAS — Scam Advisory: Phishing, beware of scam emails", url: "https://www.iras.gov.sg/news-events/announcements/scam-advisory/phishing-beware-of-scam-emails" },
    ],
    time: "2026년 6월 2일·10일",
    isBreaking: true,
    readTime: "3분",
    emoji: "⚠️",
    relatedIds: ["28"],
  },
  {
    id: "auto-20260622-3",
    publishedAt: "2026-04-24",
    category: "부동산",
    catStyle: "bg-[#FBF5E8] text-[#B07010]",
    title: "🏢 1분기 콘도 렌트·매매가 동반 상승 — 렌트 +0.3%(외곽 OCR +1.0%), 매매가 +0.9%(OCR +2.2%)",
    summary: "URA(도시재개발청) 발표에 따르면 2026년 1분기 민간주택 렌트지수가 전분기比 0.3% 올랐다(직전 분기는 -0.5%). 외곽지역(OCR)이 +1.0%로 가장 많이 오르고 중심지역(RCR)은 -0.2%로 6분기 연속 상승 후 처음 하락했다. 같은 기간 매매가지수는 +0.9%로 상향 확정(잠정치 +0.3%보다 큼), 공실률은 6.2%로 소폭 상승했다.",
    fullContent: `**URA 1분기(Q1) 2026 부동산 통계 (4월 24일 발표)**
도시재개발청(URA)이 발표한 2026년 1분기 민간주택 가격·렌트 지표입니다.

**렌트지수**
- 전체: 전분기比 **+0.3%** (직전 4분기는 -0.5%)
- 외곽지역(OCR): **+1.0%**(상승 주도)
- 중심지역(CCR, 고급): **+0.5%**
- 도심외곽(RCR, 중급): **-0.2%** — 6분기 연속 상승 후 첫 하락
- 공실률: **6.2%**(전분기比 +0.2%p)

**매매가지수**
- 전체: **+0.9%**(잠정치 +0.3%보다 상향 확정)
- 비단독(콘도 등): +1.3% / 단독주택: -0.4%
- 1분기 거래량은 전분기比 19.2% 감소(5,413건), 신규분양 31.5% 감소(2,013건) — 설 연휴·분양 물량 감소 영향

**한인 참고**
- 콘도 임차 중이라면 OCR(외곽) 지역 렌트가 가장 빠르게 오르고 있어 갱신 시 인상 가능성을 염두에 둘 것
- RCR(중급) 렌트는 6분기 만에 처음 하락해 협상 여지가 있을 수 있음
- 정확한 지역별·평형별 수치는 URA 공식 발표를 확인할 것

정확한 내용은 원문(아래 출처)을 확인하세요.`,
    source: "URA",
    sources: [
      { name: "URA — Release of 1st Quarter 2026 real estate statistics (PR26-31)", url: "https://www.ura.gov.sg/Corporate/Media-Room/Media-Releases/pr26-31" },
      { name: "LittleBigRedDot — URA Q1 2026 Property Statistics: What The 0.9% Private Home Price Rise Means", url: "https://littlebigreddot.com/ura-q1-2026-property-statistics-private-home-prices-guide/" },
    ],
    time: "2026년 4월 24일",
    isBreaking: false,
    readTime: "3분",
    emoji: "🏢",
    relatedIds: ["20"],
  },
  {
    id: "auto-20260622-4",
    publishedAt: "2026-02-26",
    category: "비자/취업",
    catStyle: "bg-[#EBF0FB] text-[#2050A0]",
    title: "🛂 PR 연 4만명 승인 목표 발표(2026~2030년) — 출산율 0.87 역대 최저, 금융·테크·헬스케어·물류·엔지니어링 우대",
    summary: "Gan Kim Yong 부총리가 Budget 2026 예산위원회(COS) 토론에서 2026~2030년 연간 PR(영주권) 승인을 약 4만명 규모로 늘릴 계획이라고 밝혔다(2025년 약 3만5천명 대비 증가). 2025년 거주 출생아 수가 역대 최저(약 2만7,500명), 합계출산율 0.87로 더 낮아진 데 따른 대응이며, 금융·테크(AI·퀀텀 포함)·헬스케어·물류·엔지니어링 분야가 우대 대상으로 언급됐다.",
    fullContent: `**PR(영주권) 연간 승인 목표 상향 — Budget 2026 COS 토론**
Gan Kim Yong 부총리가 2026년 예산위원회(Committee of Supply) 토론에서 발표한 내용입니다.

**핵심 발표**
- 2026~2030년 연간 PR 승인을 약 **4만명** 규모로 계획 — 2025년(약 3만5천명) 대비 증가
- Gan 부총리: "향후 5년간 연 약 4만명 PR 승인을 예상한다. 작년 승인한 3만5천명보다 다소 높은 수준"

**배경**
- 2025년 거주 출생아 수 약 2만7,500명으로 역대 최저
- 합계출산율(TFR) 0.87로 전년 0.97에서 추가 하락
- 고령화·생산연령인구 감소에 대한 대응 차원

**우대 산업 분야**
- 금융, 테크(AI·퀀텀컴퓨팅 포함), 헬스케어, 물류, 엔지니어링

**한인 참고**
- EP·S Pass로 거주 중 PR을 고려하는 한인이라면, 위 우대 산업군 종사 여부가 승인 가능성에 도움이 될 수 있음
- 다만 이는 정부의 전체 정책 방향 발표로, 개별 심사 기준·세부 가점 항목은 ICA가 별도 공개하지 않음에 유의

정확한 내용은 원문(아래 출처)을 확인하세요.`,
    source: "population.gov.sg · VisaVerge",
    sources: [
      { name: "population.gov.sg — Speech by Deputy Prime Minister Gan Kim Yong, Committee of Supply Debate 2026", url: "https://www.population.gov.sg/speech-by-deputy-prime-minister-gan-kim-yong-committee-of-supply-debate-2026/" },
      { name: "VisaVerge — Singapore to grant up to 40,000 Permanent Residencies a year, DPM Gan Kim Yong says", url: "https://www.visaverge.com/news/singapore-to-grant-up-to-40000-permanent-residencies-a-year-deputy-pm-gan-kim-yong-says/" },
    ],
    time: "2026년 2월 26일",
    isBreaking: false,
    readTime: "3분",
    emoji: "🛂",
    relatedIds: [],
  },
  {
    id: "auto-20260622-5",
    publishedAt: "2026-05-29",
    category: "날씨",
    catStyle: "bg-[#EBF5F0] text-[#2B7A50]",
    title: "🌫️ 엘니뇨 영향 6~10월 연무(헤이즈) 위험 증가 — 기상청 \"1997년급 가능성\", NEA 헤이즈대응팀 가동 대비",
    summary: "싱가포르 기상청(MSS)은 6~7월 엘니뇨, 7~8월 양(+)의 인도양 다이폴 발생 가능성이 80% 이상이라고 밝혔다. 두 현상이 겹치면 인도네시아·말레이시아 강수량이 줄어 농지·산림 화재가 늘고, 그 연무가 바람을 타고 싱가포르로 유입될 위험이 6~10월 내내 커진다. NEA는 헤이즈대응팀(Haze Task Force)이 대응 준비를 마쳤다고 밝혔다.",
    fullContent: `**엘니뇨·연무(헤이즈) 위험 전망 (2026년 6~10월)**
싱가포르 기상청(MSS)·국가환경청(NEA) 발표 내용입니다.

**기후 전망**
- 6~7월 **엘니뇨** 형성 가능성 80% 이상
- 7~8월 양(+)의 **인도양 다이폴(IOD)** 동반 발생 가능성
- 두 현상이 겹치면 싱가포르·주변 지역에 평년보다 덥고 건조한 날씨, 6~8월 강수량은 평년 이하 예상

**연무(헤이즈) 위험**
- 인도네시아·말레이시아의 강수량 감소로 농지·산림 화재가 늘기 쉬워, 그 연무가 바람을 타고 싱가포르에 유입될 위험이 6~10월 내내 상승
- MSS·NEA는 올해 건기가 최근 몇 년보다 더 강하고 길게(10월까지) 이어질 수 있다고 전망
- 참고: 엘니뇨+양의 IOD가 동시에 발생했던 1997년은 싱가포르 기상 관측 사상 가장 건조한 해로 기록

**대응**
- NEA 산하 헤이즈대응팀(Haze Task Force)이 연무 악화 시 대응계획을 가동할 준비를 마쳤다고 밝힘
- 외출 계획 시 1시간 단위 PM2.5 수치, 다음날 계획은 24시간 PSI 예보·건강 권고 확인 권장

**한인 가정 참고**
- 6~10월 사이 외부활동(운동·캠핑·자녀 야외수업 등) 계획 시 NEA 'myENV' 앱 또는 haze.gov.sg에서 PSI·PM2.5를 미리 확인할 것
- 호흡기 질환자·영유아·노약자가 있는 가정은 N95 마스크·공기청정기를 미리 점검해 두는 것을 권장

정확한 내용은 원문(아래 출처)을 확인하세요.`,
    source: "MSS · NEA · The Star",
    sources: [
      { name: "The Star — Increased risk of haze in Singapore from June to October due to El Nino, Indian Ocean Dipole", url: "https://www.thestar.com.my/aseanplus/aseanplus-news/2026/05/29/increased-risk-of-haze-in-singapore-from-june-to-october-due-to-el-nino-indian-ocean-dipole" },
      { name: "NEA — Regional Haze Situation", url: "https://www.nea.gov.sg/corporate-functions/weather/regional-haze-situation" },
    ],
    time: "2026년 5월 29일",
    isBreaking: false,
    readTime: "3분",
    emoji: "🌫️",
    relatedIds: ["19"],
  },
  {
    id: "auto-20260621-3",
    publishedAt: "2026-05-14",
    category: "교통",
    catStyle: "bg-[#EBF5F0] text-[#2B7A50]",
    title: "🚇 서클선 6단계(CCL6) 7월 12일 개통 — 7/4 무료 시승, 케펠·캔턴먼트·프린스에드워드로드 신설역",
    summary: "LTA 발표에 따르면 서클선(Circle Line) 6단계 신설역 케펠·캔턴먼트·프린스에드워드로드가 7월 12일부터 정식 개통한다. 개통 전인 7월 4일 오전 9시 30분~밤 9시 무료 시승(public preview)이 열린다. 이번 개통으로 서클선이 하버프론트~마리나베이 구간까지 연결되며 33개 역, 39km 순환선이 완성된다.",
    fullContent: `**서클선 6단계(CCL6) 개통 — 7월 12일**
LTA(육상교통청)가 서클선(Circle Line) 마지막 구간인 6단계 개통 일정을 발표했습니다.

**신설역 3곳**
- 케펠(Keppel), 캔턴먼트(Cantonment), 프린스에드워드로드(Prince Edward Road)
- 이 3개 역 개통으로 하버프론트(HarbourFront)~마리나베이(Marina Bay) 구간이 연결되며, 서클선이 **33개 역·39km**로 완전한 순환선이 됩니다.

**일정**
- **7월 4일(토) 오전 9:30~밤 9:00**: 일반 시민 대상 무료 시승(public preview) — 신설 3개 역 구간 자유 이용
- **7월 12일**: 정식 여객 서비스 개통

**한인 참고**
- 탄종파가(Tanjong Pagar)·센토사·하버프론트 인근 거주·근무하는 한인이라면 마리나베이·시티홀 등 도심 이동 시간이 단축될 가능성이 큽니다.
- 7월 4일 무료 시승은 신설 구간만 해당하니, 정식 개통(7/12) 전까지는 환승 경로를 미리 확인해 두는 것이 좋습니다.

세부 시간표·환승 정보는 LTA 공식 발표(아래 출처)를 확인하세요.`,
    source: "LTA",
    sources: [
      { name: "LTA — Circle Line Stage 6 to Open for Public Preview on 4 July 2026", url: "https://www.lta.gov.sg/content/ltagov/en/newsroom/2026/5/news-releases/circle-line-stage-6-to-open-for-public-preview-on-4-july-2026.html" },
      { name: "Land Transport Guru — Circle Line Stage 6 to commence service on 12 Jul 2026", url: "https://landtransportguru.net/circle-line-stage-6-start-service-12jul26/" },
    ],
    time: "2026년 5월 14일 발표 · 7월 12일 개통",
    isBreaking: false,
    readTime: "2분",
    emoji: "🚇",
    relatedIds: ["26"],
  },
  {
    id: "auto-20260619-1",
    publishedAt: "2026-06-17",
    category: "생활비",
    catStyle: "bg-[#FBF5E8] text-[#B07010]",
    title: "⚡ 전기요금 7월부터 큰 폭 인상 예고 — 2분기 대비 8.1%↑(2.21센트/kWh), U-Save 환급으로 일부 상쇄",
    summary: "에너지시장청(EMA) 발표에 따르면 중동 정세발 천연가스 가격 상승 영향으로 2026년 3분기(7~9월) 규제 전기요금이 2분기보다 평균 8.1%(2.21센트/kWh) 오를 전망이다. 1~3월기 대비 4~6월기 인상폭(2.1%·0.56센트)보다 훨씬 크다. 7월 지급되는 U-Save 환급(가구당 S$110~190)이 일부를 상쇄할 예정이다.",
    fullContent: `**3분기(7~9월) 전기요금 인상 전망**
에너지시장청(EMA)에 따르면, 중동 정세 불안으로 천연가스 가격이 급등하면서 2026년 7~9월 적용될 규제 전기요금이 직전 분기보다 크게 오를 전망입니다.

**인상 규모**
- 2026년 4~6월 요금: **27.27센트/kWh(GST 제외) · 29.72센트/kWh(GST 포함)** — 직전 분기比 2.1%(0.56센트) 인상
- 2026년 7~9월 요금: 직전 분기比 평균 **8.1%(2.21센트/kWh) 인상** 전망 — 훨씬 가파른 인상폭
- 원인: 중동 정세 불안으로 천연가스 가격 급등. SP그룹은 분기별로 직전 2.5개월 평균 가스가격을 반영해 요금을 산정

**완화 조치**
- 2026년 7월, 적격 가구에 **U-Save 환급(가구당 S$110~190)** 추가 지급 예정

**한인 가정 참고**
- 고정요율(fixed-price) 전기 소매 플랜 가입 가구 비율이 2월 36.6%→6월 37.1%로 늘고 있어, 변동요율 부담이 크다면 고정 플랜 비교를 검토할 만합니다.
- HDB·콘도 가구 모두 여름철(7~9월) 전기 사용량 관리가 필요합니다.

정확한 수치는 EMA·SP그룹 공식 발표 또는 아래 출처를 확인하세요.`,
    source: "EMA · Mothership",
    sources: [
      { name: "Mothership — S'pore electricity tariff expected to rise 'significantly' from July: EMA", url: "https://mothership.sg/2026/06/electricity-tariff-july-2026-expected-rise/" },
      { name: "Malay Mail — Singapore electricity and gas tariffs to rise from April to June, with steeper hikes likely later in 2026, says Energy Market Authority", url: "https://www.malaymail.com/news/singapore/2026/03/31/singapore-electricity-and-gas-tariffs-to-rise-from-april-to-june-with-steeper-hikes-likely-later-in-2026-says-energy-market-authority/214524" },
    ],
    time: "2026년 6월 17일",
    isBreaking: true,
    readTime: "3분",
    emoji: "⚡",
    relatedIds: [],
  },
  {
    id: "auto-20260619-3",
    publishedAt: "2026-04-29",
    category: "교육",
    catStyle: "bg-[#FBF0EC] text-[#D04020]",
    title: "🎒 2026년 P1(초1) 등록 6월 30일 시작 — PR 가정 단계별 일정, 외국인은 5월 의향서 마감으로 이번 회차 신청 불가",
    summary: "2027년 초1 입학생 대상 등록이 6월 30일~10월 30일 진행된다. 1단계(6/30~7/2)부터 2C 추가단계(8/17~8/18)까지 시민권자·PR이 순차 등록한다. 비PR 외국인 자녀는 시민권자·PR 배정이 끝난 3단계에서만, 그것도 5월 19~25일 사전 '관심 등록'을 마친 경우에만 신청할 수 있는데 이 기간이 이미 지나 이번 회차엔 해당되지 않는다.",
    fullContent: `**2026년 P1(초등 1학년) 등록 일정 (2027년 1월 입학생 대상)**
싱가포르 교육부(MOE)가 2026년 Primary 1 등록 일정을 발표했습니다. 전체 등록 기간은 **6월 30일~10월 30일**입니다.

**단계별 일정 (시민권자·PR)**
- 1단계: 6/30(9am)~7/2(4:30pm) → 결과 7/8
- 2A단계: 7/9~7/10 → 결과 7/17
- 2B단계: 7/20~7/21 → 결과 7/27
- 2C단계: 7/28~7/30 → 결과 8/11
- 2C 추가단계: 8/17~8/18 → 결과 8/27
- 대상: 2020년 1월 2일~2021년 1월 1일生 자녀. 전 과정 온라인 진행(학교 방문 등록 없음)

**⚠️ 외국인(비PR) 가정 — 이번 회차는 이미 마감**
- 비PR 외국인 자녀는 시민권자·PR 배정이 모두 끝난 뒤인 **3단계**에서, 빈자리가 있는 경우에만 등록할 수 있습니다.
- 3단계 참여 자격을 얻으려면 **5월 19일~25일 사이 온라인 '관심 등록(indication of interest)'**을 먼저 마쳤어야 합니다. 이 기간을 놓쳤다면 이번 회차에는 3단계 등록 자체가 불가능합니다.
- 자녀가 2027년 초1 입학 대상(2020년生)이고 아직 PR이 아닌 한인 가정이라면, 매년 5월경 열리는 '관심 등록' 기간을 다음 회차에는 놓치지 않도록 미리 챙겨야 합니다.

**PR 가정 참고**
- 거주지~학교 거리(1km/2km 이내)에 따라 단계 내 우선순위가 갈리므로, 6월 30일 1단계 시작 전 MOE 공식 사이트에서 희망 학교의 작년 커트라인·빈자리 수를 확인해 두는 것을 권장합니다.

정확한 단계별 조건은 MOE 공식 안내(아래 출처)를 확인하세요.`,
    source: "MOE",
    sources: [
      { name: "MOE — 2026 Primary One Registration Exercise", url: "https://www.moe.gov.sg/news/press-releases/20260429-2026-primary-one-registration-exercise" },
      { name: "MOE — Registration phases and key dates of P1 registration", url: "https://www.moe.gov.sg/primary/p1-registration/registration-phases-key-dates" },
      { name: "Honeykids Asia — Primary 1 registration phases explained: Key dates for 2026 registration are out!", url: "https://honeykidsasia.com/primary-1-registration-phases-explained/" },
    ],
    time: "2026년 4월 29일",
    isBreaking: false,
    readTime: "3분",
    emoji: "🎒",
    relatedIds: ["24"],
  },
  {
    id: "auto-20260619-4",
    publishedAt: "2026-03-24",
    category: "취업",
    catStyle: "bg-[#EBF5F0] text-[#2B7A50]",
    title: "👴 정년 64세·재고용 69세로 상향 — 7월 1일 시행, CPF 수령연령(65세)은 변동 없음",
    summary: "싱가포르 정년이 7월 1일부터 63→64세, 재고용 연령이 68→69세로 오른다. 1962년 7월 1일 이후 출생 시민권자·PR에게 새 정년이, 1957년 7월 1일 이후 출생자에게 새 재고용 연령이 적용된다. CPF 수령 개시 연령(65세)은 이번 변경과 무관하게 그대로 유지된다.",
    fullContent: `**정년·재고용 연령 상향 (2026년 7월 1일 시행)**
싱가포르 인력부(MOM) 발표에 따라, 7월 1일부터 정년과 재고용 연령이 각각 1세씩 올라갑니다.

**무엇이 바뀌나**
- 정년: 63세 → **64세** (1962년 7월 1일 이후 출생 시민권자·PR 적용)
- 재고용 연령: 68세 → **69세** (1957년 7월 1일 이후 출생자 적용)
- 2030년까지 정년 65세·재고용 70세로 추가 상향 예정(장기 로드맵)

**CPF는 별도 기준 — 영향 없음**
- **CPF 수령 개시 연령(65세)은 정년·재고용 연령과 무관한 별도 기준**이라 이번 변경으로 바뀌지 않습니다.
- 55~60세, 60~65세 구간 CPF 기여율은 2027년부터 단계적으로 추가 인상되는데, 이는 이번 7월 변경과는 별개 일정입니다.

**기업 지원**
- Senior Employment Credit(고령자 고용지원금)을 2027년 12월까지 연장, 69세 이상 고용 시 최대 7% 임금 지원

**한인 근로자·고용주 참고**
- 만 63세 정년을 앞두고 있던 시민권자·PR 직원이라면 7월 1일부터 정년이 1년 늘어납니다.
- 한인 사업장에서 시니어 직원을 고용 중이라면 정년·재고용 규정 갱신 여부를 HR과 점검해야 합니다.
- EP 등 외국인 근로비자 소지자에게는 이 정년 규정이 직접 적용되지 않지만(외국인 워크패스는 별도 만료·갱신 체계), PR 신분의 시니어 근로자라면 직접 영향을 받습니다.

정확한 적용 대상·시행 세부사항은 MOM 공식 발표(아래 출처)를 확인하세요.`,
    source: "MOM · L&E Global",
    sources: [
      { name: "L&E Global — Singapore: Retirement Age and Re-Employment Age to be Raised on 1 July 2026 and Other Related Changes", url: "https://leglobal.law/2026/03/24/singapore-retirement-age-and-re-employment-age-to-be-raised-on-1-july-2026-and-other-related-changes/" },
      { name: "Human Resources Online — MOM Committee of Supply 2026: Singapore to raise retirement age to 64 & re-employment age to 69 from 1 July 2026", url: "https://www.humanresourcesonline.net/mom-committee-of-supply-2026-singapore-to-raise-retirement-age-to-64-re-employment-age-to-69-from-1-july-2026" },
      { name: "CPFB — Does raising the Singapore retirement age affect the CPF payout eligibility age?", url: "https://www.cpf.gov.sg/member/infohub/educational-resources/does-raising-the-singapore-retirement-age-affect-the-cpf-payout-eligibility-age" },
    ],
    time: "2026년 3월 24일",
    isBreaking: false,
    readTime: "3분",
    emoji: "👴",
    relatedIds: [],
  },
  {
    id: "auto-20260619-5",
    publishedAt: "2026-06-17",
    category: "사회",
    catStyle: "bg-[#F5F0FF] text-[#7040C0]",
    title: "🎫 NDP 2026 입장권 발표 6/15~17 — 시민권자·PR만 신청 가능, '재판매·스캠 주의' 경고",
    summary: "8월 9일 내셔널 스타디움에서 16년 만에 돌아오는 National Day Parade 2026 입장권 응모(5/23~6/6, 시민권자·PR만 Singpass로 신청) 결과가 6월 15~17일 사이 정부 공식 채널로 통지됐다. 주최 측은 표가 매매 대상이 아니며 재판매·스캠 시도에 단호히 대응하겠다고 경고했다.",
    fullContent: `**NDP 2026 입장권 발표 (6월 15~17일)**
8월 9일 National Stadium에서 2016년 이후 처음으로 돌아오는 National Day Parade(NDP) 2026의 입장권 발표가 6월 15~17일 사이 이뤄졌습니다.

**응모·발표 절차**
- 응모 기간: 5월 23일 정오~6월 6일 정오, **Singpass**로 본인 인증 후 신청(시민권자·PR만 가능)
- 본 행사(8/9) 또는 프리뷰 공연(7/25, 8/1) 중 선택, 1인당 2·4·6매 신청 가능
- 발표: 추첨 방식으로 6월 15~17일 사이 정부 공식 채널(gov.sg, 주최 측 승인 이메일)로만 통지

**⚠️ 주의사항**
- 주최 측은 **티켓 매매·양도가 금지**돼 있으며, **재판매(스캘핑)·사기에 대해 강력 대응**하겠다고 공식 경고했습니다.
- 공식 채널 외 SNS·메신저로 "당첨됐다"며 금전을 요구하거나 표를 판매한다는 연락은 사기일 가능성이 매우 높습니다.

**한인 가정 참고**
- 시민권자·PR만 응모할 수 있어 EP 등 외국인 신분이라면 이번 회차는 해당되지 않습니다.
- PR이고 6/6 마감 전 응모했다면 공식 채널로만 결과를 확인하고, SNS에 떠도는 양도·판매 글은 무시·신고하세요.

정확한 내용은 원문(아래 출처)을 확인하세요.`,
    source: "The Independent · IBTimes SG",
    sources: [
      { name: "The Independent Singapore — Singapore National Day Parade 2026: Up to 6 tickets can be applied for via SingPass; organisers warn against scams and scalping", url: "https://theindependent.sg/singapore-national-day-parade-2026-up-to-6-tickets-can-be-applied-for-via-singpass-organisers-warn-against-scams-and-scalping/" },
      { name: "IBTimes SG — National Day Parade 2026: Singapore Opens NDP Ticket Applications from May 23 to June 6", url: "https://www.ibtimes.sg/national-day-parade-2026-singapore-opens-ndp-ticket-applications-may-23-june-6-heres-how-book-86825" },
    ],
    time: "2026년 6월 17일",
    isBreaking: true,
    readTime: "2분",
    emoji: "🎫",
    relatedIds: [],
  },
  {
    id: "auto-20260620-1",
    publishedAt: "2026-06-15",
    category: "비자/취업",
    catStyle: "bg-[#EBF0FB] text-[#2050A0]",
    title: "📋 EP COMPASS 갱신 심사 7월 1일부터 강화 — 2023~24년 승인자도 재심사 시 탈락 위험",
    summary: "2026년 1월 신규 EP 신청부터 적용된 개정 COMPASS 기준(섹터·연령대별 급여 벤치마크, 자격 목록 등)이 7월 1일부터 갱신(renewal) 심사에도 적용된다. 2023~24년 65th 퍼센타일 기준으로 승인됐던 EP도 2026년 갱신 시점 기준 미달 시 점수가 깎여 탈락할 수 있다.",
    fullContent: `**COMPASS 2단계 — 갱신 심사 적용 (2026년 7월 1일부터)**
싱가포르 인력부(MOM)의 Employment Pass(EP) COMPASS 프레임워크 개정판이 2026년 1월 1일 신규 신청에 먼저 적용됐고, **7월 1일부터는 갱신 신청**에도 동일하게 적용됩니다.

**무엇이 바뀌었나**
- **C1 급여 기준**: 섹터·연령대별로 세분화돼, 동일 분야 로컬 PMET 임금의 **65th 퍼센타일**을 기준으로 채점
- **C2 자격 목록**: 학위 동등 전문자격·상위권 대학 리스트 갱신
- Shortage Occupation List(부족 직종 목록) 확대(헬스케어 등 신규 직종 추가)
- 통과 기준선은 여전히 **40점 이상**

**한인 EP 보유자가 챙겨야 할 점**
- 2023~2024년에 당시 65th 퍼센타일을 통과해 승인받았더라도, **2026년 갱신 시점 기준으로는 미달**할 수 있어 점수가 깎입니다.
- 본인 EP 만료일이 **2026년 하반기**라면, 고용주(HR)에 COMPASS 점수 사전 점검을 요청하는 것이 안전합니다.
- 점수가 부족하면 급여 조정, 자격 보완 서류 준비 등을 갱신 신청 전에 검토해야 합니다.

정확한 점수표·기준은 아래 출처(MOM 안내를 다룬 전문 매체)를 확인하세요.`,
    source: "Human Resources Online · Asanify",
    sources: [
      { name: "Human Resources Online — Reminder: Singapore's updated COMPASS rules effective in 2026", url: "https://www.humanresourcesonline.net/reminder-singapore-s-updated-compass-rules-effective-in-2026-for-ep-applications-and-renewals" },
      { name: "Asanify — Singapore Employment Pass Renewals Digest (Jun 15, 2026)", url: "https://asanify.com/blog/news/singapore-employment-pass-renewals-june-15-2026/" },
    ],
    time: "2026년 6월 15일",
    isBreaking: true,
    readTime: "3분",
    emoji: "📋",
    relatedIds: ["17", "21"],
  },
  {
    id: "auto-20260620-3",
    publishedAt: "2026-04-01",
    category: "부동산",
    catStyle: "bg-[#FBF5E8] text-[#B07010]",
    title: "📉 HDB 재판매가 7년 만에 첫 하락 — 1분기 -0.1%, 렌트도 소폭 완화세",
    summary: "HDB 발표 기준 2026년 1분기 재판매가지수가 203.4로 전 분기比 0.1% 하락, 2019년 2분기 이후 약 7년 만의 첫 하락이다. 렌트 지수도 0.1% 내리며 2023년 고점 이후 완만한 하락세가 이어지고 있다(4룸 기준 월세 중간값 약 S$2,600).",
    fullContent: `**HDB 1분기(Q1) 2026 통계**
HDB가 2026년 1분기 재판매·임대 시장 통계를 발표했습니다.

**재판매(Resale) 가격**
- 재판매가격지수(RPI) **203.4**, 전 분기比 **-0.1%**
- **2019년 2분기 이후 약 7년 만의 첫 분기 하락**

**임대(Rental) 시장**
- HDB 렌트 지수도 전 분기比 **-0.1%**, 2023년 고점 이후 완만한 하락세 지속
- **4룸 기준 월세 중간값 약 S$2,600**

**한인 임차인 참고**
- 렌트 시장이 과열기를 지나 완만히 안정되는 흐름이라, 계약 갱신·재계약 시 협상 여지가 있을 수 있습니다.
- 다만 지역·평형별 편차가 크므로, 실제 시세는 HDB·중개사 최신 데이터로 재확인하세요.

정확한 수치는 아래 출처(HDB 통계 기반 보도)를 확인하세요.`,
    source: "99.co · Mothership",
    sources: [
      { name: "99.co — Q1 2026: HDB resale market sees first price decline in 7 years", url: "https://www.99.co/singapore/insider/q1-2026-hdb-resale-market-first-price-decline-in-7-years/" },
      { name: "Mothership — HDB resale prices fell by 0.1%, private housing prices rose 0.9%, in 1st quarter 2026", url: "https://mothership.sg/2026/04/hdb-ura-real-estate-statistics/" },
    ],
    time: "2026년 4월 1일",
    isBreaking: false,
    readTime: "2분",
    emoji: "📉",
    relatedIds: ["23"],
  },
  {
    id: "auto-20260620-5",
    publishedAt: "2026-06-18",
    category: "사회",
    catStyle: "bg-[#F5F0FF] text-[#7040C0]",
    title: "🚨 일주일 새 사기 경보 2건 — 페이스북 라이브 행운권·시니어 대상 안드로이드 악성코드",
    summary: "싱가포르 경찰(SPF)이 6월 15일·18일 잇따라 경보를 냈다. ①페북 라이브 행운권/스크래치카드 사기: 5월 20일 이후 33건·손실 최소 S$6만, PayNow QR로 '수수료' 요구. ②시니어 대상 안드로이드 악성코드: 4월 1일 이후 8건·손실 최소 S$6.9만, APK 설치 유도 후 Singpass·ScamShield 삭제·계좌 한도 조작.",
    fullContent: `**SPF 사기 경보 2건 (2026년 6월)**
싱가포르 경찰(SPF)이 일주일 사이 신종 사기 경보를 두 건 발표했습니다.

**① 페이스북 라이브 행운권 사기 (6월 15일 발표)**
- 5월 20일 이후 최소 **33건**, 피해액 최소 **S$6만**
- 페북 라이브 방송에서 스크래치카드·복권을 판매 → "당첨됐다"며 **PayNow QR(Liquidpay 계좌)**로 '수수료' 등 추가 송금 요구
- 당첨금이 안 들어오거나 연락이 끊겨야 사기임을 인지

**② 시니어 대상 안드로이드 악성코드 사기 (6월 18일 발표)**
- 4월 1일 이후 최소 **8건**, 피해액 최소 **S$6.9만**
- 페북·TikTok의 '시니어 활동' 광고 → 관심 등록 시 WhatsApp으로 연락 → **APK 파일 설치** 유도(활동 목록 확인 명목)
- 설치 후 **Singpass·ScamShield 앱이 삭제**되거나 **계좌 이체 한도가 무단 변경**된 피해 사례

**한인 가정 주의 팁**
- 출처 불명 APK 파일은 절대 설치하지 말 것(공식 앱스토어 외 설치 차단 권장)
- SNS 라이브·광고 경품·당첨 안내는 선입금·수수료 요구 시 사기로 의심
- 부모님 등 시니어가 방문·체류 중이라면 이 2건을 미리 공유해 주의를 당부할 것
- 의심 시 ScamShield 앱 또는 1799(안티스캠 핫라인) 확인

정확한 내용은 원문(아래 출처)을 확인하세요.`,
    source: "SPF",
    sources: [
      { name: "SPF — Police Advisory On Lucky Draw Scams Involving Facebook Live", url: "https://www.police.gov.sg/Media-Hub/News/2026/06/20260615_police_advisory_on_lucky_draw_scams_involving_facebook_live" },
      { name: "SPF — Police Advisory On Malware-Enabled Scams On Android Devices Targeting Senior Citizens", url: "https://www.police.gov.sg/Media-Hub/News/2026/06/20260618_police_advisory_on_malware_enabled_scams_on_android_devices_targeting_senior_citizens" },
    ],
    time: "2026년 6월 18일",
    isBreaking: true,
    readTime: "3분",
    emoji: "🚨",
    relatedIds: ["28"],
  },
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
export const NEWS_ITEMS: NewsItem[] = [...RAW_NEWS_ITEMS]
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  .slice(0, 50); // 최신 50건만 노출 (데이터 비대·번들·렌더 비용 관리)
