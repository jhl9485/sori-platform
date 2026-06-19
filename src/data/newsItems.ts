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

// 실제 싱가포르 뉴스 (2026년 6월 기준) — 한인 커뮤니티 유용 정보 중심
export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "16",
    category: "문화",
    catStyle: "bg-[#FBF0EC] text-[#D04020]",
    title: "🇸🇬 NDP 2026 (8월 9일) 본격 준비 — 6월 리허설·티켓 추첨 시작, 한인 가정 관람 가이드",
    summary: "건국 61주년 National Day Parade가 Padang에서 개최. 6월부터 주말 리허설(NE Show) 시작, 무료 티켓은 추첨제. 마리나 베이 불꽃놀이·전투기 플라이패스트 관람 명당 정리.",
    fullContent: `싱가포르 건국 61주년 National Day Parade(NDP 2026)가 8월 9일(일) Padang에서 열립니다. 6월부터 주말 리허설이 시작되며, 무료 입장권 추첨도 진행됩니다.

**일정**
- 6월 말~7월: National Education(NE) Show 및 리허설 (토요일)
- 7월 중순: 두 차례 프리뷰
- 8월 9일(일): 본 행사 (저녁)

**티켓 안내**
- NDP 본 행사·프리뷰 입장권은 **무료 추첨제** (NDPeople.gov.sg)
- 1인당 신청 매수 제한, 당첨 시 e-티켓 발송
- 리허설(NE Show)은 별도 배포 — 학교·커뮤니티 단체 통해서도 배포

**한인 가정 관람 팁 (티켓 없이도 OK)**
- 마리나 베이 일대: 불꽃놀이·플라이패스트(전투기 편대)는 베이 주변에서 무료 관람
- 명당: Marina Barrage, Gardens by the Bay East, Esplanade 지붕 테라스
- 리허설 주말에도 동일하게 불꽃놀이를 볼 수 있어 인파가 덜한 리허설 날 추천
- 저녁 6~8시 MRT 혼잡 — 여유 있게 이동

**주의사항**
- 본 행사·리허설 당일 마리나 베이 일대 도로 통제 및 MRT 혼잡
- 드론 비행 금지 구역 — 개인 드론 촬영 불가
- 우천 대비 우비 지참 (우산은 시야 방해로 제지될 수 있음)

NDP 관람 후기나 동행 모집은 SORI 커뮤니티 '생활정보'에서 공유해요.`,
    source: "MCCY · NDPeople · CNA",
    sourceUrl: "https://www.ndp.gov.sg/",
    time: "2026년 6월 10일",
    isBreaking: true,
    readTime: "3분",
    emoji: "🇸🇬",
    relatedIds: ["11", "10"],
  },
  {
    id: "15",
    category: "건강",
    catStyle: "bg-[#EBF5F0] text-[#2B7A50]",
    title: "🌫️ 연무(Haze) 시즌 진입 — PSI 모니터링·마스크 준비, 한인 가정 호흡기 관리 가이드",
    summary: "6~9월 인도네시아 산불로 인한 연무 시즌 시작. NEA, PSI 지수 주의 당부. PSI 100 초과 시 외출 자제·N95 마스크 권장. 어린이·노약자·천식 환자 각별한 주의 필요.",
    fullContent: `매년 6~9월은 인도네시아 수마트라·칼리만탄 산불에서 발생한 연무(Haze)가 바람을 타고 싱가포르로 유입되는 시즌입니다. NEA가 PSI 지수 모니터링을 당부했습니다.

**PSI 지수 읽는 법 (24시간 기준)**
- 0~50: 좋음 (Good)
- 51~100: 보통 (Moderate)
- 101~200: 나쁨 (Unhealthy) — 야외활동 줄이기
- 201~300: 매우 나쁨 (Very Unhealthy)
- 300 초과: 위험 (Hazardous) — 실외 활동 금지

**한인 가정 체크리스트**
- NEA myENV 앱 또는 haze.gov.sg에서 실시간 1시간 PSI·PM2.5 확인
- N95 마스크 미리 구비 (일반 마스크는 미세입자 차단 효과 낮음)
- 공기청정기 필터 점검·교체, 창문 밀폐
- 어린이·임산부·천식/호흡기 질환자는 PSI 100 초과 시 실내 머물기

**증상 대응**
- 눈 따가움, 목 칼칼함, 기침은 흔한 연무 반응
- 증상 지속 시 폴리클리닉·GP 방문
- 한국어 진료 병원은 SORI 한인업소록 '병원' 카테고리 참고

**학교·직장**
- PSI 악화 시 학교 야외활동(PE, 조회)·스포츠 취소될 수 있음
- 일부 학교는 자체 공기질 기준에 따라 휴교 결정
- 옥외 근무자는 고용주의 보호 조치(휴식·마스크 제공) 확인

연무 상황은 해마다 편차가 크니, 시즌 초 미리 마스크·공기청정기를 준비해두는 게 안전합니다.`,
    source: "NEA · MSS · CNA",
    sourceUrl: "https://www.haze.gov.sg/",
    time: "2026년 6월 8일",
    isBreaking: false,
    readTime: "3분",
    emoji: "🌫️",
    relatedIds: ["10", "12"],
  },
  {
    id: "14",
    category: "경제",
    catStyle: "bg-[#EBF0FB] text-[#2050A0]",
    title: "💱 원·싱달러 ₩1,180선 — 원화 약세 지속, 6월 송금 전략 업데이트",
    summary: "SGD/KRW 1,180원 부근까지 상승(원화 약세). 싱가포르에서 한국 송금 시 유리, 한국→싱가포르 송금은 부담. 분할 송금·목표 환율 알림 전략과 핀테크 수수료 재정리.",
    fullContent: `싱가포르 달러 대비 원화 환율이 1싱달러당 1,180원 부근까지 올랐습니다(원화 약세). 5월 1,150원대에서 추가 상승한 흐름으로, 송금 방향에 따라 유불리가 갈립니다.

**최근 환율 동향**
- SGD 1 = 약 ₩1,180 (6월 초 기준, SORI 홈 실시간 위젯 연동)
- 흐름: 5월 ~1,150원 → 6월 ~1,180원 (원화 약세 지속)
- 변동 요인: 미국 금리 경로, 달러 강세, 원화 상대적 약세

**송금 방향별 전략**
- **싱가포르 → 한국 송금: 유리** (같은 SGD로 더 많은 원화)
  - 학자금·생활비·부모님 송금은 지금이 상대적으로 좋은 시점
- **한국 → 싱가포르 송금: 불리** (원화 가치 하락)
  - 급하지 않으면 환율 안정 시점까지 분할 대기

**실전 팁**
- 분할 송금으로 환율 변동 리스크 분산 (한 번에 큰 금액 ✕)
- Wise·Instarem 앱에서 목표 환율 알림 설정
- 큰 목돈(전세·학자금)은 더욱 분할·타이밍 분산

**핀테크 송금 수수료 비교 (SGD→KRW)**
| 서비스 | 수수료 | 도착 시간 |
|--------|--------|-----------|
| Wise | SGD 3~5 | 수 시간~1일 |
| Instarem | 큰 금액 유리 | 1~2일 |
| 은행 전신환 | SGD 20~30 | 1~3일 |

**참고**
환율은 매일 변동합니다. SORI 홈 화면 상단의 실시간 환율 위젯에서 현재 시세를 확인하고, 송금 전 Wise·Instarem 앱의 실시간 환율과 한 번 더 비교하세요.`,
    source: "SORI 편집팀 · Wise · 한국은행",
    sourceUrl: "https://wise.com/sgd-to-krw-rate",
    time: "2026년 6월 5일",
    isBreaking: false,
    readTime: "3분",
    emoji: "💱",
    relatedIds: ["8", "7"],
  },
  {
    id: "13",
    category: "생활",
    catStyle: "bg-[#F5F0FF] text-[#7040C0]",
    title: "🛍️ Great Singapore Sale 시즌 + 학교 6월 30일 개학 — 6월 말 체크리스트",
    summary: "연중 최대 쇼핑 시즌 GSS(6~7월) 진행 중. 백화점·온라인 할인 집중. 동시에 6월 방학 종료(6/30 개학)로 교복·학용품 수요 급증. 한인 가정 6월 말 준비 사항 총정리.",
    fullContent: `6월은 연중 최대 쇼핑 시즌인 Great Singapore Sale(GSS)과 학교 개학 준비가 겹치는 시기입니다. 한인 가정의 6월 말 체크리스트를 정리했습니다.

**Great Singapore Sale (GSS)**
- 기간: 6월~7월 (매장·브랜드별 상이)
- 오프라인: Orchard Road 백화점(ION, Takashimaya, Paragon), VivoCity 등 집중 할인
- 온라인: Shopee·Lazada 6.6/7.7 메가세일과 맞물림
- 관광객 환급(GST Refund)은 관광객 대상 — 거주자는 해당 없음

**학교 개학 (방학 종료)**
- 6월 중간 방학: 6월 1일~29일
- **개학: 6월 30일(화)** — 학교별로 일정 확인 필수
- 준비물: 교복·체육복 사이즈 점검, 학용품, 교과서, 셔틀버스 재신청

**6월 말 한인 가정 체크리스트**
1. 자녀 교복·신발 사이즈 확인 (방학 중 성장분 반영)
2. 학용품·교재 GSS 할인 시 미리 구매
3. 한국 다녀온 가정은 시차 적응·등교 리듬 회복
4. 방학 중 멈췄던 학원·한글학교 일정 재확인

**쇼핑 절약 팁**
- 백화점 멤버십·신용카드 추가 할인 중복 적용 확인
- 가전·가구는 GSS + 신학기 세일 겹치는 시점이 최저가
- 중고 교복·학용품은 SORI 벼룩시장에서 거래 활발

**날씨 참고**
6월 말은 연무·스콜이 잦은 시기입니다. 야외 쇼핑·등하교 시 우산과 마스크를 함께 챙기세요.`,
    source: "SORI 편집팀 · MOE · Singapore Retailers Association",
    sourceUrl: "https://www.moe.gov.sg/news/school-terms-and-holidays",
    time: "2026년 6월 2일",
    isBreaking: false,
    readTime: "3분",
    emoji: "🛍️",
    relatedIds: ["11", "7"],
  },
  {
    id: "12",
    category: "건강",
    catStyle: "bg-[#EBF5F0] text-[#2B7A50]",
    title: "🦟 뎅기열 피크 시즌 시작 — NEA 전국 예방 캠페인, 한인 가정 주의보",
    summary: "NEA 발표: 1~5월 뎅기 감염 600건대로 전년比 66% 감소했으나, 5~10월 피크 시즌 진입. 우기와 겹쳐 모기 번식 급증 우려. 가정 내 고인 물 제거 권고.",
    fullContent: `싱가포르 국가환경청(NEA)이 5~10월 뎅기열 피크 시즌을 맞아 전국 예방 캠페인을 시작했습니다. 우기와 겹치면서 모기 번식이 빨라질 수 있어 주의가 필요합니다.

**2026년 현황 (긍정적 신호)**
- 1월 1일 ~ 5월 중순 누적 감염: 약 600건
- 전년 동기 대비 **66% 감소**
- 다만 피크 시즌(5~10월) 진입으로 방심 금물

**한인 가정 체크리스트 (모기 번식 방지)**
- 화분 받침대 고인 물 즉시 제거
- 에어컨 응결수 받이 주 1회 비우기
- 발코니·베란다 양동이·물통 뒤집어 보관
- 배수구 주 1회 청소

**증상 및 대응**
- 고열(39~40°C), 심한 두통, 관절·근육통, 발진
- 의심 시 폴리클리닉 또는 GP 방문, NS1 항원검사 요청
- 한국어 진료 가능 병원은 SORI 한인업소록 '병원' 카테고리 참고

**Dengue Cluster 확인**
NEA 홈페이지(nea.gov.sg) 또는 myENV 앱에서 거주 지역 뎅기 클러스터(빨간 구역) 실시간 확인 가능. 클러스터 지역 거주 시 모기 기피제 사용 권장.`,
    source: "NEA · CNA",
    sourceUrl: "https://www.nea.gov.sg/dengue-zika",
    time: "2026년 5월 28일",
    isBreaking: true,
    readTime: "3분",
    emoji: "🦟",
    relatedIds: ["10", "7"],
  },
  {
    id: "11",
    category: "교육",
    catStyle: "bg-[#FBF0EC] text-[#D04020]",
    title: "🏫 6월 학교 방학(6.1~6.29) 시작 — 한인 가정 캠프·홀리데이 프로그램 총정리",
    summary: "싱가포르 전국 학교 6월 한 달 방학(6/1~6/29). 국제학교·로컬학교 모두 휴교. 한인 가정 대상 홀리데이 캠프, 한국어 특강, 귀국 항공권 수요 급증 예상.",
    fullContent: `싱가포르 전국 학교가 6월 1일부터 29일까지 약 4주간 중간 방학(Mid-Year Holidays)에 들어갑니다. 한인 가정은 방학 계획을 미리 세우는 것이 좋습니다.

**방학 기간**
- 기간: 2026년 6월 1일(월) ~ 6월 29일(월)
- 대상: 로컬 학교 전체 + 대부분 국제학교
- 7월 첫째 주 개학 (학교별 상이, 반드시 확인)

**한인 가정 인기 옵션**
1. **홀리데이 캠프** — 코딩, 로보틱스, 수영, 축구 캠프 등 (1주 단위, $200~500)
2. **한국어 특강** — 한글학교 방학 집중반, 한국 교과 보충
3. **한국 귀국** — 6월 초·말 항공권 수요 폭증, 미리 예약 필수
4. **근교 여행** — 말레이시아 조호바루, 바탐(인니) 당일치기 인기

**항공권 팁**
- 인천행 6월 항공권은 이미 가격 상승 중
- 대한항공·싱가포르항공 직항 외 스쿠트(저가) 활용
- SORI 커뮤니티 '생활정보'에서 항공권 공동구매 정보 확인

**주의사항**
방학 중에도 EP/DP 비자 자녀의 학생 비자(Student Pass) 상태는 유지됩니다. 장기 출국(1개월 이상) 시 학교에 사전 통보 권장.`,
    source: "MOE · SORI 편집팀",
    sourceUrl: "https://www.moe.gov.sg/news/school-terms-and-holidays",
    time: "2026년 5월 27일",
    isBreaking: false,
    readTime: "3분",
    emoji: "🏫",
    relatedIds: ["1"],
  },
  {
    id: "10",
    category: "날씨",
    catStyle: "bg-[#EBF0FB] text-[#2050A0]",
    title: "🌧️ 이번 주말 강한 스콜 예보 — 낮 최고 35°C, 오후 천둥번개 동반 소나기",
    summary: "기상청(MSS): 5월 말 우기 영향으로 오후 국지성 스콜 잦음. 낮 최고 33~35°C, 습도 85%. 주말 야외 활동 시 우산 필수. 일부 지역 침수 주의.",
    fullContent: `싱가포르 기상청(Meteorological Service Singapore)은 5월 말 우기 영향으로 오후 시간대 강한 스콜(소나기)이 자주 발생할 것으로 예보했습니다.

**이번 주 날씨 전망**
- 낮 최고기온: 33~35°C (일부 날 35°C 초과)
- 습도: 80~90% (체감온도 높음)
- 강수: 오후~저녁 국지성 천둥번개 동반 소나기
- 5월은 평균 14~15일 비

**생활 팁**
- 오후 외출 시 휴대용 우산 필수
- 갑작스러운 폭우로 일부 저지대(Orchard 지하도 등) 침수 가능
- 빨래는 오전에, 실내 건조 권장
- 에어컨 사용 증가로 전기요금 상승 — 26~27°C 설정 권장

**한인 밀집 지역 영향**
- Tanjong Pagar·Marina Bay: 퇴근 시간 스콜 시 택시·Grab 수요 폭증 (요금 할증)
- 자녀 등하교 시 우비·장화 준비

**연무(Haze) 참고**
6~9월은 인도네시아 산불로 인한 연무 시즌이 시작될 수 있습니다. PSI 지수가 100을 넘으면 마스크 착용 권장. NEA myENV 앱에서 실시간 확인하세요.`,
    source: "MSS · NEA",
    sourceUrl: "https://www.weather.gov.sg/",
    time: "2026년 5월 26일",
    isBreaking: false,
    readTime: "2분",
    emoji: "🌧️",
    relatedIds: ["12"],
  },
  {
    id: "9",
    category: "부동산",
    catStyle: "bg-[#FBF5E8] text-[#B07010]",
    title: "🏠 콘도 공급 완화로 렌트 안정세 — 2025년 말 1.85만 세대 완공, 협상 우위 지속",
    summary: "2025년 말 민간 콘도 18,500세대 대거 완공으로 공급 부족 해소. 임대료 상승세 둔화, 임차인 협상력 강화. 단 CCR(도심) 일부는 연중 최대 12% 변동성 유지.",
    fullContent: `2025년 말 민간 콘도 약 18,500세대가 한꺼번에 완공되면서, 그간의 공급 부족이 크게 해소됐습니다. 한인 임차인에게 유리한 환경이 이어지고 있습니다.

**시장 변화 (2026년 5월 기준)**
- 2025년 말 신규 입주 물량: 약 18,500세대 (최근 수년 중 최대)
- 임대료 상승세: 둔화 → 일부 지역 하락 전환
- 임차인 협상력: 강화 (공실 증가로 집주인 양보 여지 ↑)

**지역별 동향**
- OCR(외곽): 안정세, 신규 입주로 선택지 풍부
- RCR(준도심): 보합
- **CCR(도심 핵심): 연중 최대 12% 변동성** — 계약 타이밍 중요

**한인 임차인 협상 팁 (지금이 기회)**
- 2년 계약 시 월 $200~500 인하 요청 적극 시도
- 신축 입주 단지는 첫 임차인 우대(가구 추가, 1개월 무료 렌트) 협상 가능
- Diplomatic Clause(외국인 조기 해지 조항) 기본 요청
- SORI 부동산 게시판에서 실시간 매물·시세 비교

**구매 관점**
- EP 소지자 구매 시 ABSD 60% 여전 → 매매보다 임대가 유리
- PR 취득 후 첫 주택 구매 시 ABSD 5%

자세한 매물은 SORI 부동산 카테고리에서 확인하세요.`,
    source: "URA · PropertyGuru · StackedHomes",
    sourceUrl: "https://www.propertyguru.com.sg/property-management-news",
    time: "2026년 5월 25일",
    isBreaking: false,
    readTime: "3분",
    emoji: "🏠",
    relatedIds: ["4", "6"],
  },
  {
    id: "8",
    category: "경제",
    catStyle: "bg-[#EBF0FB] text-[#2050A0]",
    title: "💱 원·싱달러 환율 ₩1,150선 — 송금 타이밍과 6월 환율 전망",
    summary: "SGD/KRW 약 1,150원 부근 등락. 미 금리·원화 약세 영향. 한국 송금은 분할 송금 전략 권장. Wise·Instarem 등 핀테크 수수료 비교 정리.",
    fullContent: `싱가포르 달러 대비 원화 환율이 1싱달러당 1,150원 부근에서 등락하고 있습니다. 한국으로 송금하거나 받는 한인들에게 환율은 중요한 관심사입니다.

**최근 환율 동향**
- SGD 1 = 약 ₩1,150 (5월 말 기준)
- 변동 요인: 미국 금리 정책, 원화 상대적 약세
- 6월 전망: 원화 약세가 이어지며 1,150~1,200원 박스권 예상

**송금 전략**
- **분할 송금**: 환율 변동 리스크 분산 (한 번에 큰 금액 ✕)
- **목표 환율 알림**: Wise·Instarem 앱에서 원하는 환율 도달 시 알림 설정
- 급하지 않으면 유리한 환율 대기

**핀테크 송금 수수료 비교 (SGD→KRW)**
| 서비스 | 수수료 | 도착 시간 |
|--------|--------|-----------|
| Wise | SGD 3~5 | 수 시간~1일 |
| Instarem | 큰 금액 유리 | 1~2일 |
| 은행 전신환 | SGD 20~30 | 1~3일 |

**팁**
- 월급 받는 날 일괄 송금보다, 환율 좋은 날 분할 송금
- 한국 부동산·학자금 등 목돈은 환율 알림 활용
- SORI 금융/투자 커뮤니티에서 환테크 정보 공유 중`,
    source: "SORI 편집팀 · 한국은행",
    sourceUrl: "https://www.wise.com/sgd-to-krw-rate",
    time: "2026년 5월 23일",
    isBreaking: false,
    readTime: "3분",
    emoji: "💱",
    relatedIds: ["7", "5"],
  },
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
