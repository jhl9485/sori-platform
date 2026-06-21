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
export const NEWS_ITEMS: NewsItem[] = [...RAW_NEWS_ITEMS].sort(
  (a, b) => b.publishedAt.localeCompare(a.publishedAt)
);
