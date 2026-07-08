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
    id: "auto-20260708-1",
    publishedAt: "2026-07-07",
    category: "사회",
    catStyle: "bg-[#F5F0FF] text-[#7040C0]",
    title: "🏦 ASC·5개 은행 합동 2개월 작전 — 600건 이상 차단·S$3,800만 손실 예방 (7/7 발표)",
    summary: "싱가포르 경찰청 반사기센터(ASC)가 DBS·UOB·OCBC·스탠다드차타드·GXS은행과 5~6월 두 달간 RPA(로봇프로세스자동화) 기술을 활용해 600건 이상의 진행 중인 사기를 차단하고 S$3,800만 이상의 잠재 피해를 막았다고 7월 7일 발표했다. 잠재 피해자 3,300명 이상에게 3,800건 이상의 SMS 경보를 발송해 사전에 차단한 것이 핵심이다.",
    fullContent: `**ASC·5개 은행 합동 작전 결과 (2026년 7월 7일 발표)**
싱가포르 경찰청(SPF) 사이버사령부 반사기센터(Anti-Scam Centre, ASC)가 7월 7일 발표한 내용입니다.

**작전 개요**
- **기간**: 2026년 5월 1일~6월 30일 (2개월)
- **협력 은행**: DBS, UOB, OCBC, Standard Chartered Bank, GXS Bank (5곳)
- **기술**: 로봇프로세스자동화(RPA) 활용, 은행과 ASC 간 신속 정보 교환

**성과**
- 진행 중인 사기 **600건 이상** 차단
- 잠재 피해자 **3,300명 이상**에게 **3,800건 이상의 SMS 경보** 발송
- 예방된 잠재 손실: **S$3,800만(S$38 million) 이상**

**주요 사기 유형**
- 정부기관 사칭 사기, 투자 사기, 취업 사기, 전자상거래 사기, 임대 사기

**역대 합동 작전 성과 (참고)**
- 2026년 3월: 300건+·S$2,400만 예방
- 2026년 5월: 500건+·S$3,300만 예방
- 이번(7월): 600건+·S$3,800만 예방 — 매 작전마다 차단 규모 증가

**한인 팁**
- 은행이나 경찰청 명의의 "귀하의 계좌가 사기에 연루됐다"는 전화·문자는 사기 가능성이 높으니 즉시 끊고 공식 번호로 재확인
- 의심 시 1799(안티스캠 핫라인) 또는 ScamShield 앱 이용

정확한 내용은 원문(아래 출처)을 확인하세요.`,
    source: "SPF (공식) · Fintech News SG",
    sources: [
      { name: "SPF — Anti-Scam Centre And Five Banks Collaborate To Foil Over 600 Scam Attempts (공식)", url: "https://www.police.gov.sg/Media-Hub/News/2026/07/20260707_anti_scam_centre_and_five_banks_collaborate_to_foil_over_600_scam_attempts" },
      { name: "Fintech News Singapore — Five Banks, Singapore Anti-Scam Centre Avert S$38 Million in Scam Losses", url: "https://fintechnews.sg/134107/security/singapore-anti-scam-centre/" },
    ],
    time: "2026년 7월 7일",
    isBreaking: false,
    readTime: "2분",
    emoji: "🏦",
    relatedIds: ["auto-20260706-2"],
  },
  {
    id: "auto-20260708-2",
    publishedAt: "2026-07-02",
    category: "사회",
    catStyle: "bg-[#F5F0FF] text-[#7040C0]",
    title: "🖥️ MS·Crypto.com 사칭 신종 복합 사기 — 5월 이후 30건·S$100만 피해, '3'으로 시작 번호 주의",
    summary: "싱가포르 경찰청(SPF)이 7월 2일, 마이크로소프트(MS)와 암호화폐 거래소 Crypto.com을 동시에 사칭하는 신종 기술지원 사기를 경보했다. 5월 이후 최소 30건·S$100만 이상의 피해가 발생했다. 브라우저에 가짜 MS 보안 경고가 뜨고, '3'으로 시작하는 8자리 번호로 전화하면 사칭 담당자가 암호화폐 지갑 접근 권한을 탈취하는 수법이다.",
    fullContent: `**MS·Crypto.com 사칭 기술지원 사기 경보 (SPF, 2026년 7월 2일)**
6월 9일 MS 단독 사칭 경보(S$170만 피해)에 이은 신종 복합형 경보입니다.

**피해 현황**
- 2026년 5월 이후 최소 **30건** 신고
- 피해액 최소 **S$100만(S$1 million)**

**수법**
1. 인터넷 브라우저에 MS 사칭 가짜 보안 경고 팝업 발생 ("기기 해킹 감지" 등)
2. 팝업 속 **'3'으로 시작하는 8자리 전화번호** 클릭/전화 유도
3. 사칭 기술지원 담당자가 기기 원격 접근·정보 제공 요구
4. 이후 **Crypto.com 지원팀** 사칭 2차 사기범에게 연결 → 암호화폐 지갑 시드구문·비밀키 탈취, 취소 불가 이체 유도

**경찰 당부**
- MS는 보안 경고에 전화번호를 포함하지 않음 — 팝업 속 번호로 절대 전화하지 말 것
- 암호화폐 지갑 시드구문·비밀키는 누구와도 공유하지 말 것
- '3'으로 시작하는 8자리 번호는 VoIP 번호로, 공식 기업 지원번호가 아님
- 의심 팝업 발생 시 브라우저를 즉시 닫고, ScamShield 앱 또는 1799 확인

정확한 내용은 원문(아래 출처)을 확인하세요.`,
    source: "SPF (공식) · Yahoo News SG",
    sources: [
      { name: "SPF — Police Advisory On Technical Support Scams Impersonating Microsoft And Crypto.com (공식)", url: "https://www.police.gov.sg/Media-Hub/News/2026/07/20260702_police_advisory_on_technical_support_scams_impersonating_microsoft_and_crypto_com" },
      { name: "Yahoo News Singapore — At least $1 million lost since May in Microsoft, Crypto.com impersonation scams", url: "https://sg.news.yahoo.com/least-1-million-lost-since-150500821.html" },
    ],
    time: "2026년 7월 2일",
    isBreaking: true,
    readTime: "2분",
    emoji: "🖥️",
    relatedIds: ["auto-20260624-3"],
  },
  {
    id: "auto-20260708-3",
    publishedAt: "2026-07-04",
    category: "문화",
    catStyle: "bg-[#FBF0EC] text-[#D04020]",
    title: "🌸 싱가포르 가든 페스티벌 2026 — 7/4~12 가든스바이더베이, '블룸 카니발' 10주년 (진행 중)",
    summary: "싱가포르 가든 페스티벌(SGF) 10주년 에디션이 '블룸 카니발(Carnival of Blooms)' 테마로 7월 4~12일 가든스바이더베이에서 열리고 있다. 역대 Best of Show 수상 디자이너 8팀의 Show Gardens, 세계 플로럴 챔피언십, 싱가포르 오키드 쇼 등이 진행 중이며, 12일 일요일까지다. 입장료: 싱가포르 주민 성인 S$12·어린이 S$8, 비주민 성인 S$24.",
    fullContent: `**싱가포르 가든 페스티벌 2026 (Singapore Garden Festival 2026)**
10주년 에디션이 지금 진행 중입니다.

**기본 정보**
- **날짜**: 2026년 7월 4일(토)~12일(일) ← 현재 진행 중, **이번 주말(7/12)이 마지막**
- **장소**: 가든스바이더베이(Gardens by the Bay)
- **운영시간**: 오전 10시~밤 10시 (입장 마감 9:30pm), 플라워돔 오전 9시~밤 9시
- **주제**: Carnival of Blooms (10주년 에디션)
- MarketPlace(무료 입장) 오전 10시~오후 8시

**주요 프로그램**
- **Show Gardens — All-Stars Edition**: 역대 Best of Show 수상 정원 디자이너 8팀 재참가, Pinnacle Award 경합
- **Floral Windows to the World Championship**: 국제 플로럴 마스터 토너먼트
- **Singapore Orchid Show**: 희귀·수상 난초 전시 (싱가포르 난초협회 OSSEA 공동 주관)
- **MarketPlace**: 식물·원예용품·소품 판매 (무료 입장)

**입장료**
- 싱가포르 주민: 성인 S$12 / 경로(60세+)·어린이(3~12세) S$8
- 비주민: 성인 S$24 / 어린이(3~12세) S$15

**한인 팁**
- 가든스바이더베이 야외 공간은 무료이나 Show Gardens·플라워돔 내부 행사는 유료 티켓 필요
- 주말 붐빔 → 온라인 사전 구매 권장
- 7월 12일(일) 마감이므로 이번 주말이 마지막 기회

정확한 내용은 원문(아래 출처)을 확인하세요.`,
    source: "NParks SGF (공식) · Timeout SG · Little Day Out",
    sources: [
      { name: "Singapore Garden Festival 2026 — Show Info (공식)", url: "https://sgf.nparks.gov.sg/about/show-info/" },
      { name: "Timeout Singapore — See spectacular floral displays at SG Garden Festival 2026", url: "https://www.timeout.com/singapore/things-to-do/sg-garden-festival-2026" },
      { name: "Little Day Out — Singapore Garden Festival 2026 (4 to 12 July)", url: "https://www.littledayout.com/singapore-garden-festival/" },
    ],
    time: "2026년 7월 4~12일 (진행 중)",
    isBreaking: false,
    readTime: "2분",
    emoji: "🌸",
    relatedIds: [],
  },
  {
    id: "auto-20260708-4",
    publishedAt: "2026-07-01",
    category: "비자/취업",
    catStyle: "bg-[#EBF0FB] text-[#2050A0]",
    title: "👷 LQS S$1,800 인상 7/1 시행 — S Pass·Work Permit 쿼터에 영향, 사업주 즉시 확인 필요",
    summary: "로컬자격급여(LQS)가 7월 1일부터 S$1,600에서 S$1,800으로 올랐다. LQS는 S Pass·Work Permit 쿼터 산정 기준으로, 로컬 직원 급여가 S$1,600~S$1,799 구간이면 해당 직원이 쿼터 1명이 아닌 0.5명으로 산정돼 한인 자영업자·중소기업 고용주의 외국인 고용 가능 인원이 줄어들 수 있다. 기한 내 조치를 못 했다면 S Pass 갱신 실패 위험이 있다.",
    fullContent: `**LQS(로컬자격급여) S$1,800 인상 시행 (2026년 7월 1일)**
Budget 2026 발표 사항이 7월 1일부터 시행됐습니다. 외국인 직원을 고용 중인 한인 사업주는 즉시 확인이 필요합니다.

**무엇이 바뀌었나**
- LQS: **S$1,600 → S$1,800** (2026년 7월 1일 시행)

**S Pass·Work Permit 쿼터에 미치는 영향**
- 로컬 직원이 S$1,800 이상 → 쿼터 **1명 카운트** (변동 없음)
- 로컬 직원이 S$900~S$1,799 구간 → 쿼터 **0.5명 카운트**
- **→ 기존 S$1,600~S$1,799 구간 직원을 7/1 전 S$1,800으로 올리지 않았다면, 해당 직원이 0.5명으로 줄어 S Pass·Work Permit 쿼터 감소**

**실질 결과**
- 쿼터 감소 → S Pass 갱신 신청 실패, LoC(의존자 취업허가) 무효화 위험
- 쿼터 부족 상태가 지속되면 기존 S Pass 직원이 법적 위반 상태에 놓일 수 있음

**고용주 체크리스트**
- S$1,600~S$1,799 로컬 직원 급여를 S$1,800으로 인상했는지 확인
- MOM 포털에서 현재 S Pass·Work Permit 쿼터 잔여분 재확인
- 쿼터 감소가 예상된다면 노동법 전문 컨설턴트와 조기 상담 권장

**참고**
- 파트타임(주 35시간 미만) 직원은 별도 기준 적용
- 서비스업 S Pass 쿼터: 총 인력의 10% / 제조업: 15%

정확한 내용은 원문(아래 출처)을 확인하세요.`,
    source: "MOM (공식) · Mothership · Singapore Employment Agency",
    sources: [
      { name: "MOM — Local Qualifying Salary (공식)", url: "https://www.mom.gov.sg/employment-practices/progressive-wage-model/local-qualifying-salary" },
      { name: "Mothership — Local Qualifying Salary for full-time local employees to increase from S$1,600 to S$1,800: Budget 2026", url: "https://mothership.sg/2026/02/budget-2026-local-qualifying-salary-raised/" },
      { name: "Singapore Employment Agency — Local Qualifying Salary Rises to S$1,800 from 1 July 2026", url: "https://singaporeemploymentagency.com/local-qualifying-salary-s1800-july-2026/" },
    ],
    time: "2026년 7월 1일 시행",
    isBreaking: false,
    readTime: "3분",
    emoji: "👷",
    relatedIds: ["auto-20260620-1"],
  },
  {
    id: "auto-20260706-1",
    publishedAt: "2026-07-05",
    category: "안전",
    catStyle: "bg-[#EBF5F0] text-[#2B7A50]",
    title: "⚡ 파시르 리스 해변 낙뢰 사망 — 24세 패들보더 숨지고 6명 부상, 맑은 날씨에도 갑작스러운 낙뢰 주의",
    summary: "7월 5일(일) 오후 4시 50분경 파시르 리스 해변 해상 약 100m 지점에서 패들보드를 타던 24세 남성이 낙뢰에 맞아 병원에서 숨졌다. 함께 있던 13~54세 6명도 의식 있는 상태로 병원에 이송됐다. 목격자에 따르면 사고 당시 하늘이 맑았던 것으로 전해지며, 날씨 예보와 무관하게 갑작스러운 낙뢰가 덮칠 수 있음을 일깨워준 사례다.",
    fullContent: `**파시르 리스 해변 낙뢰 사망 사고 (2026년 7월 5일)**
싱가포르 민방위대(SCDF)가 7월 5일 오후 4시 50분경 파시르 리스 해변 인근 해상에서 발생한 낙뢰 사고 신고를 접수했습니다.

**사고 개요**
- **날짜·시각**: 2026년 7월 5일(일) 오후 4시 50분경 SCDF 신고
- **장소**: 파시르 리스 해변에서 약 100m 떨어진 해상
- **사망**: 24세 남성 (의식불명 상태로 이송 후 사망)
- **부상**: 13~54세 남녀 6명 의식 있는 상태로 병원 이송
- **상황**: 일행 8명이 카약·패들보드를 타던 중 낙뢰 직격
- **목격자 증언**: 사고 직전 하늘이 맑았다고 전해짐 — 예보 없이도 갑작스러운 낙뢰 가능성을 보여주는 사례

**⚠️ 야외 수상활동 낙뢰 안전 수칙**
- 천둥 소리가 들리거나 번개가 보이면 **즉시 물 밖으로 나올 것** (마지막 천둥 후 30분 경과 전까지 야외·수중 활동 중단 권장)
- 카약·패들보드·수영 등 야외 수상활동 전 **NEA myENV 앱 또는 weather.gov.sg**에서 뇌우 경보 확인
- 개방된 물 위는 피할 곳이 없어 낙뢰 피해 범위가 넓어질 수 있음
- 어린이와 해변·수영장을 이용 시 뇌우 경보 발령 즉시 실내로 이동

정확한 내용은 원문(아래 출처)을 확인하세요.`,
    source: "Yahoo News SG · Mothership · The Star",
    sources: [
      { name: "Yahoo News Singapore — Man dies after lightning strike in waters off Pasir Ris Beach", url: "https://sg.news.yahoo.com/7-taken-hospital-1-unconscious-113045275.html" },
      { name: "Mothership — Man, 24, dies after lightning strike while paddleboarding at Pasir Ris Beach, 6 others sent to hospital", url: "https://mothership.sg/2026/07/man-die-paddleboarding-pasir-ris/" },
      { name: "The Star — Man dies after lightning strike in waters off Singapore's Pasir Ris Beach", url: "https://www.thestar.com.my/aseanplus/aseanplus-news/2026/07/06/man-dies-after-lightning-strike-in-waters-off-singapore039s-pasir-ris-beach" },
    ],
    time: "2026년 7월 5일",
    isBreaking: true,
    readTime: "2분",
    emoji: "⚡",
    relatedIds: [],
  },
  {
    id: "auto-20260706-2",
    publishedAt: "2026-07-05",
    category: "사회",
    catStyle: "bg-[#F5F0FF] text-[#7040C0]",
    title: "🛡️ SPF·암호화폐 거래소 제3차 합동 작전 — 130명 이상 피해자 구제·S$290만 손실 예방 (7/5 발표)",
    summary: "싱가포르 경찰청(SPF)이 6월 한 달간 암호화폐 거래소 7곳(Coinbase·Coinhako·Gemini·Independent Reserve·OKX·StraitsX·Upbit)과 제3차 합동 작전을 벌여 130명 이상 사기 피해자를 조기 발견하고 S$290만 이상의 잠재 피해를 막았다고 7월 5일 발표했다. 정부기관 사칭·투자·취업 사기가 주요 유형이며, 블록체인 정보는 FBI·호주 경찰에도 공유됐다.",
    fullContent: `**SPF·암호화폐 거래소 제3차 합동 사기 수사 작전 (2026년 7월 5일 발표)**
싱가포르 경찰청 범죄수사국(CIB)·안티사기센터(ASC)가 7월 5일 제3차 합동 작전 결과를 발표했습니다.

**작전 개요**
- **기간**: 2026년 6월 1~30일
- **협력 거래소**: Coinbase, Coinhako, Gemini, Independent Reserve, OKX, StraitsX, Upbit (7곳)
- **블록체인 분석 툴**: Chainalysis, TRM Labs 활용

**성과**
- 잠재 피해자 **130명 이상** 조기 발견 → 전화·방문 개입으로 피해 예방
- 예방된 잠재 손실: **S$290만(S$2.9 million) 이상**

**주요 사기 유형**
- 정부기관 사칭 사기 (Government Officials Impersonation Scams)
- 투자 사기 (Investment Scams)
- 취업 사기 (Job Scams)

**국제 공조**
- 블록체인 추적 정보를 **미국 FBI** 및 **호주 뉴사우스웨일스(NSW) 경찰청 사이버범죄수사대**에 공유

**역대 합동 작전 성과 (참고)**
- 1차 (4월): 90명+ 피해자, S$286만 예방
- 2차 (6월 초): S$420만 예방
- 3차 (이번): 130명+, S$290만 예방

**한인 주의 팁**
- 암호화폐 거래 중 갑작스러운 '계좌 동결·해킹 경고' 연락은 사기일 가능성이 높음
- 정부기관(경찰·MAS·ICA 등)은 메신저·전화로 암호화폐 이체를 요구하지 않음
- 취업·투자 명목으로 암호화폐를 이체하라는 요청은 즉시 거절하고 1799(안티사기 핫라인) 또는 ScamShield 앱으로 신고

정확한 내용은 원문(아래 출처)을 확인하세요.`,
    source: "SPF (공식)",
    sources: [
      { name: "SPF — Third Joint Operation By Police And Cryptocurrency Exchanges (공식)", url: "https://www.police.gov.sg/Media-Hub/News/2026/07/20260705_third_joint_operation_by_police_and_cryptocurrency_exchanges_detects_over_130_scam_victims" },
      { name: "The Star — Singapore police, crypto exchanges stop over 130 scam victims from losing more than S$2.9mil", url: "https://www.thestar.com.my/aseanplus/aseanplus-news/2026/07/05/singapore-police-crypto-exchanges-stop-over-130-scam-victims-from-losing-more-than-s29mil" },
    ],
    time: "2026년 7월 5일",
    isBreaking: false,
    readTime: "2분",
    emoji: "🛡️",
    relatedIds: [],
  },
  {
    id: "auto-20260706-3",
    publishedAt: "2026-07-06",
    category: "교육",
    catStyle: "bg-[#FBF0EC] text-[#D04020]",
    title: "🎒 2026 하반기 학교 주요 일정 — P1 2A 등록 7/9~10·PSLE 8~10월·9월 방학 한눈에 정리",
    summary: "3학기가 6월 29일 시작된 가운데 Youth Day(7/5)·대체공휴일(7/6) 방학 후 7월 7일(화)부터 수업이 재개된다. P1 2A단계 등록이 7월 9~10일로 3일 앞으로 다가왔다. PSLE 구술시험 8월 12~13일, 필기시험 9월 24~30일. 9월 방학 9월 5~13일. 현지 정부학교 재학 자녀를 둔 한인 가정의 하반기 일정 참고용.",
    fullContent: `**2026년 하반기 학사 주요 일정 (MOE)**
현지 정부학교에 재학 중인 자녀가 있는 한인 가정을 위한 2026년 하반기 학사 주요 일정입니다.

**3학기 현황**
- 3학기 시작: **6월 29일(월)** (6월 방학 5/30~6/28 종료 후)
- Youth Day (7/5 일요일) → 대체공휴일 **7월 6일(월) 학교 휴무**
- **7월 7일(화)부터 수업 재개**

**⭐ 곧 다가오는 일정**
- **P1 2A단계 등록: 7월 9일(목)~10일(금)** → 결과 발표 7/17 *(2027년 입학 대상, PR·시민권자 자녀)*

**PSLE (초등 졸업시험, P6 대상) 일정**
- 구술시험(Orals): **8월 12일~13일**
- 듣기평가(Listening Comprehension): **9월 15일**
- 필기시험(Written Exams): **9월 24~25일, 28~30일**
- 채점기간(P1~5 일부 수업 조정 가능): **10월 12~14일**

**9월 방학**
- **9월 5일(토)~13일(일)** (9일간)

**연말 방학**
- **11월 21일~12월 31일**

**참고**
- PSLE는 초등 6학년(P6) 대상. P1~5는 구술·필기시험 기간 중 일정 변동이 있을 수 있으며, 10월 채점기간에는 조기 하교 등이 적용될 수 있음
- 국제학교·IB 학교는 별도 일정이니 해당 학교 캘린더를 확인할 것
- P1 등록 2A단계는 해당 아동 거주지와 희망 학교 거리(1km·2km 이내 여부)에 따라 우선순위가 갈림

정확한 내용은 원문(아래 출처)을 확인하세요.`,
    source: "MOE (공식)",
    sources: [
      { name: "MOE — School Terms and Holidays for 2026 (공식)", url: "https://www.moe.gov.sg/news/press-releases/20250730-school-terms-and-holidays-for-2026" },
      { name: "MOE — Academic Calendar 2026", url: "https://www.moe.gov.sg/calendar" },
    ],
    time: "2026년 7월",
    isBreaking: false,
    readTime: "2분",
    emoji: "🎒",
    relatedIds: ["auto-20260619-3"],
  },
  {
    id: "auto-20260705-1",
    publishedAt: "2026-07-05",
    category: "교통",
    catStyle: "bg-[#EBF5F0] text-[#2B7A50]",
    title: "🚌 탐피네스 버스, SBS → Go-Ahead로 이관 — 7/5 1단계·7/19 2단계, 노선·요금 변동 없음",
    summary: "탐피네스 버스 패키지가 SBS Transit에서 Go-Ahead Singapore로 이관된다(5년 계약). 1단계는 7월 5일(일) 14개 노선(10·10e·18·18M·20·31·39·65·129·292·293·298·299·454·646), 2단계는 7월 19일(일) 잔여 노선이 넘어간다. 노선번호·요금·정류장은 그대로 유지돼 이용객 입장에서 바뀌는 건 운영사뿐이다.",
    fullContent: `**탐피네스 버스 운영사 이관 (SBS Transit → Go-Ahead Singapore)**
LTA가 발주한 탐피네스 버스 패키지가 두 단계에 걸쳐 Go-Ahead로 넘어갑니다.

- **1단계 7/5(일)**: 14개 노선 (10·10e·18·18M·20·31·39·65·129·292·293·298·299·454·646)
- **2단계 7/19(일)**: 잔여 노선 + 창이비즈니스파크 버스터미널
- 앵커 인터체인지: 탐피네스·탐피네스 컨코스·탐피네스 노스(7/5부터), 창이비즈니스파크(7/19부터)
- **노선번호·요금·정류장 변동 없음** — 체감 변화는 운영사(버스 도색·기사 소속)뿐

**참고**
- 탐피네스·파시르리스 쪽 한인이라면 버스 색이 바뀌어도 같은 번호·같은 요금이니 그대로 이용하시면 됩니다.`,
    source: "LTA · Go-Ahead Singapore",
    sources: [
      { name: "LTA — 탐피네스 버스 패키지 Go-Ahead 발주 (공식)", url: "https://www.lta.gov.sg/content/ltagov/en/newsroom/2025/9/news-releases/lta-awards-tampines-bus-package-to-go-ahead-singapore.html" },
      { name: "Go-Ahead Singapore — 2026년 7월 이관 안내", url: "https://go-aheadsingapore.com/2026/transition-of-the-tampines-bus-package-in-july-2026/" },
    ],
    time: "2026년 7월",
    isBreaking: false,
    readTime: "2분",
    emoji: "🚌",
    relatedIds: [],
  },
  {
    id: "auto-20260703-1",
    publishedAt: "2026-07-03",
    category: "생활",
    catStyle: "bg-[#F5F0FF] text-[#7040C0]",
    title: "🏝️ '그레이터 센토사' 20년 대개발 마스터플랜 공개 — 센토사+풀라우 브라니 통합, 모노레일→트램 교체",
    summary: "센토사개발청(SDC)이 센토사와 풀라우 브라니를 통합해 레저 면적을 약 2배로 넓히는 장기 마스터플랜 '그레이터 센토사'를 공개했다. 현 센토사 익스프레스 모노레일은 지상형 고용량 트램(People Mover System)으로 교체돼, 본토·브라니·센토사를 잇는 '아일랜드 하트' 교통 허브와 연결된다. 새 명소는 2030년대 초부터 순차 개장 예정. 계획을 소개하는 'Your Island. Reimagined.' 순회 전시가 7월 3~5일 비보시티에서 시작됐다.",
    fullContent: `**그레이터 센토사 마스터플랜 (Greater Sentosa Master Plan)**
센토사개발청(SDC)이 향후 약 20년에 걸친 센토사 재개발 청사진을 공개했습니다.

- **센토사 + 풀라우 브라니 통합** — 섬 레저 면적 약 2배 확대
- **교통**: 현 센토사 익스프레스 모노레일 → 지상형 고용량 트램(People Mover System)으로 교체. 본토·브라니·센토사를 잇는 '아일랜드 하트(Island Heart)' 교통 허브 신설, 워터택시도 검토
- **새 명소**: 2030년대 초부터 순차 개장 예정 (RWS 확장·슈퍼닌텐도월드 등 포함)
- **전시**: 'Your Island. Reimagined.' 순회 전시 — 비보시티 7/3~5 시작 → 우리탐피네스허브(7/22~27) → 주롱포인트(8/19~23) → 워터웨이포인트(9/23~27) → 10월 센토사

**참고**
- 아이와 센토사 자주 가는 한인 가정이라면 앞으로 몇 년간 공사·동선 변화가 있을 수 있어 방문 전 확인하면 좋아요.`,
    source: "TTG Asia · Yahoo SG · SDC",
    sources: [
      { name: "TTG Asia — 그레이터 센토사 마스터플랜", url: "https://www.ttgasia.com/2026/07/03/greater-sentosa-master-plan-to-transform-singapores-island-getaway-over-two-decades/" },
      { name: "Yahoo SG — 마스터플랜 공개, 2030년대 초 개장", url: "https://sg.news.yahoo.com/master-plan-greater-sentosa-unveiled-023000300.html" },
    ],
    time: "2026년 7월",
    isBreaking: false,
    readTime: "2분",
    emoji: "🏝️",
    relatedIds: [],
  },
  {
    id: "auto-20260702-1",
    publishedAt: "2026-07-02",
    category: "생활비",
    catStyle: "bg-[#FBF5E8] text-[#B07010]",
    title: "💰 7월 U-Save 리베이트 '2배' 지급 — 최대 S$190, 100만+ HDB 가구 자동 반영",
    summary: "재무부(MOF)가 2026년 7월 GSTV U-Save 리베이트를 평소의 2배로 지급한다. 1~2룸 최대 S$190 등 평형별 차등이며, 100만 가구 이상이 대상. S&CC(관리비) 리베이트도 최대 1개월분 함께 지급된다. 7월 전기요금 인상(3분기 +17%) 부담을 덜기 위한 조치로, U-Save는 SP Services 계정에, S&CC는 타운카운슬 계정에 자동 반영돼 별도 신청이 필요 없다.",
    fullContent: `**2026년 7월 U-Save·S&CC 리베이트 (2배 지급)**
재무부(MOF)가 7월 전기요금 인상에 대응해 GSTV(소비세바우처) 리베이트를 확대 지급합니다.

- **U-Save 리베이트: 평소의 2배**, 1~2룸 **최대 S$190** (평형이 클수록 차등)
- **S&CC(관리비) 리베이트: 최대 1개월분** (평형별 차등)
- 대상: **100만 가구 이상**의 싱가포르 시민 HDB 가구
- **자동 반영** — U-Save는 SP Services 전기·수도 계정, S&CC는 타운카운슬 계정에 직접 입금 (별도 신청 불필요)
- FY2026 전체로는 U-Save 최대 S$570·S&CC 최대 3.5개월분

**참고**
- 리베이트는 **시민 소유 HDB 가구** 대상입니다. EP·DP 등으로 임차 거주 중이면 직접 대상이 아닐 수 있어요.`,
    source: "MOF (공식)",
    sources: [
      { name: "MOF — 7월 U-Save·S&CC 리베이트 (공식)", url: "https://www.mof.gov.sg/news-resources/newsroom/more-than-1-million-singaporean-hdb-households-to-benefit-from-s-cc-rebates-and-double-of-the-regular-u-save-rebates-in-jul-2026/" },
      { name: "Human Resources Online — 7월 리베이트 2배", url: "https://www.humanresourcesonline.net/eligible-singaporean-hdb-households-to-receive-double-gstv-u-save-and-s-cc-rebates-in-july-2026" },
    ],
    time: "2026년 7월",
    isBreaking: false,
    readTime: "2분",
    emoji: "💰",
    relatedIds: [],
  },
  {
    id: "auto-20260701-1",
    publishedAt: "2026-07-01",
    category: "교통",
    catStyle: "bg-[#EBF5F0] text-[#2B7A50]",
    title: "🚇 다운타운라인(DTL) 7/10~9/5 금요일 밤 조기 종료·토요일 늦은 개통 — 셔틀버스 운행",
    summary: "7월 10일(금)~9월 5일(토) 기간, 매주 금요일 밤 다운타운라인(DTL) 전 구간이 오후 11시 30분에 운행을 종료하고 토요일은 오전 8시 30분에 개통한다. DTL3e 통합 시스템 최종 시험이 목적이며, 토요 조조(5:00~8:30)에는 대체 셔틀버스(S41·S42·S43)가 운행된다. DTL 이용 한인은 금·토 이동 계획에 참고.",
    fullContent: `**다운타운라인(DTL) 주말 운행 조정 (2026년 7월 10일~9월 5일)**
철도 확장 공사(DTL3e 통합 시스템 최종 시험)를 위해 매주 금·토 운행 시간이 조정됩니다.

- **매주 금요일**: DTL 전 구간 오후 **11:30 조기 종료**
- **매주 토요일**: 오전 **8:30 늦은 개통**
- 토요일 조조(오전 5:00~8:30)에는 **대체 셔틀버스 S41·S42·S43** 운행
- 적용 기간: **7/10(금)~9/5(토)**

**참고**
- 금요일 밤 늦게 또는 토요일 아침 일찍 DTL로 이동한다면 대체 교통편을 미리 확인하세요.`,
    source: "LTA · SBS Transit",
    sources: [
      { name: "LTA — TEL·DTL 운행조정 (공식)", url: "https://www.lta.gov.sg/content/ltagov/en/newsroom/2026/4/news-releases/train-service-adjustments-tel-and-dtl-to-facilitate-rail-expansion-works.html" },
      { name: "The Smart Local — TEL/DTL 운행조정 안내", url: "https://thesmartlocal.com/read/tel-dtl-train-service-adjustments/" },
    ],
    time: "2026년 7월",
    isBreaking: false,
    readTime: "2분",
    emoji: "🚇",
    relatedIds: [],
  },
  {
    id: "auto-20260630-2",
    publishedAt: "2026-06-30",
    category: "생활비",
    catStyle: "bg-[#FBF5E8] text-[#B07010]",
    title: "💡 전기요금 3분기 17% 인상 '확정' — 34.78센트/kWh(GST 포함), 4룸 HDB 월 +약 $17",
    summary: "에너지시장청(EMA)이 2026년 3분기(7~9월) 규제 전기요금을 전 분기 대비 약 17% 올린 kWh당 34.78센트(GST 포함, GST 전 31.91센트)로 확정했다. 최근 수년 내 최대 분기 인상폭으로, 4룸 HDB 가구 기준 월 약 S$17.14 부담 증가. 중동發 가스값 급등이 원인이며, 7월 U-Save 리베이트(가구당 S$110~190)가 일부를 상쇄한다.",
    fullContent: `**2026년 3분기 전기요금 인상 확정 (7~9월)**
에너지시장청(EMA)이 6월 30일 3분기 규제 전기요금을 공식 확정했습니다. (기존 '최대 30% 예고' 기사의 확정 후속)

- 규제 전기요금: **kWh당 34.78센트(GST 포함)** / 31.91센트(GST 전)
- 전 분기(29.72센트) 대비 **약 +17%** — 최근 수년 내 최대 분기 인상폭
- **4룸 HDB 기준 월 약 S$17.14 추가** 부담 예상
- 원인: 중동 사태發 LNG(천연가스) 가격 급등 (3분기 요금은 4~6월 가스가 기준 산정)
- 7월 지급 **U-Save 리베이트(가구당 S$110~190)**가 일부 상쇄

**참고**
- 전기 소매플랜(OEM) 이용 중이면 계약 조건에 따라 영향이 다를 수 있습니다.`,
    source: "EMA · Mothership",
    sources: [
      { name: "EMA — 3분기 전기·가스 요금 (공식)", url: "https://www.ema.gov.sg/news-events/news/media-releases/2026/Higher-Electricity-and-Town-Gas-Tariffs-for-July-September-2026" },
      { name: "Mothership — 전기요금 7월 인상", url: "https://mothership.sg/2026/06/singapore-electricity-tariff-up-july-2026/" },
    ],
    time: "2026년 6월",
    isBreaking: false,
    readTime: "2분",
    emoji: "💡",
    relatedIds: [],
  },
  {
    id: "auto-20260630-1",
    publishedAt: "2026-06-30",
    category: "부동산",
    catStyle: "bg-[#FBF5E8] text-[#B07010]",
    title: "🏠 5월 콘도 렌트 -0.6%·HDB -0.3% 하락 — 신규 공급 늘며 임차인 협상력 개선",
    summary: "99-SRX 렌트 플래시 리포트(6월 발표)에 따르면 5월 콘도 임대료는 전월比 -0.6%(지역별 CCR -0.4%·RCR -0.6%·OCR -1.0%), HDB 임대료는 -0.3%(성숙단지 -0.5%·비성숙 +0.2%) 내렸다. 4룸 HDB 중간 월세는 약 S$2,600. 2024~25년 신규 공급 증가로 시장이 집주인 우위에서 균형으로 이동 중이라, 렌트 계약·재계약 시 임차인 협상 여지가 커졌다.",
    fullContent: `**5월 임대료 하락 — 임차인에 유리한 흐름**
99-SRX가 6월 발표한 렌트 플래시 리포트입니다.

- **콘도 임대료**: 전월比 **-0.6%** (CCR -0.4% / RCR -0.6% / OCR -1.0%)
- **HDB 임대료**: 전월比 **-0.3%** (성숙단지 -0.5% / 비성숙단지 +0.2%)
- 4룸 HDB 중간 월세 약 **S$2,600**
- 2024~25년 신규 공급 증가로 시장이 **집주인 우위 → 균형**으로 전환 중

**참고**
- 렌트 신규·재계약을 앞두고 있다면 협상 여지가 이전보다 커진 편입니다. 단지·지역별 차이가 크니 실제 매물로 비교하세요.`,
    source: "99.co (SRX)",
    sources: [
      { name: "99.co — 콘도·HDB 렌트 (2026년 5월)", url: "https://www.99.co/singapore/insider/condo-hdb-rental-market-may-2026/" },
    ],
    time: "2026년 5월",
    isBreaking: false,
    readTime: "2분",
    emoji: "🏠",
    relatedIds: [],
  },
  {
    id: "auto-20260629-1",
    publishedAt: "2026-06-29",
    category: "문화",
    catStyle: "bg-[#F5F0FF] text-[#7040C0]",
    title: "🎤 7월 K팝 공연 풍년 — 아이린 7/4·EXO 7/24·26·iKON 7/25·마마무 7/31 싱가포르 무대",
    summary: "7월 한 달간 대형 K팝 공연이 몰려 있다. 레드벨벳 아이린 첫 솔로 아시아투어(7/4, The Theatre at Mediacorp), EXO 7년 만의 싱가포르 공연(7/24·26, Singapore Indoor Stadium, 매진), iKON(7/25, Arena @ EXPO), 마마무(7/31, Singapore Indoor Stadium). 예매는 Ticketmaster SG.",
    fullContent: `**2026년 7월 싱가포르 K팝 공연 일정**
7월 한 달간 대형 K팝 공연이 연달아 열립니다.

- **아이린(레드벨벳)** — 7/4(금) 오후 6시, The Theatre at Mediacorp / 첫 솔로 아시아투어 'I-WILL', 티켓 약 S$138~288(예매 수수료 별도)
- **EXO** — 7/24·26, Singapore Indoor Stadium / 'EXhOrizon' 월드투어, 7년 만의 싱가포르 공연 (Ticketmaster 기준 **매진**)
- **iKON** — 7/25, Arena @ EXPO / 'FOUREVER' 월드투어
- **마마무** — 7/31, Singapore Indoor Stadium / '4WARD' 월드투어

**참고**
- 예매는 **Ticketmaster SG**, 공연별로 좌석이 빠르게 소진되니 잔여석·정확한 가격은 공식 티켓 페이지에서 확인하세요.`,
    source: "(x)clusive · Harper's Bazaar SG · Ticketmaster",
    sources: [
      { name: "(x)clusive — 아이린 I-WILL 싱가포르", url: "https://x-clusive.sg/events/red-velvet-irene-i-will-singapore/" },
      { name: "Harper's Bazaar SG — 2026 K팝 공연 일정", url: "https://www.harpersbazaar.com.sg/lifestyle/kpop-concerts-singapore" },
      { name: "Ticketmaster SG — EXO", url: "https://ticketmaster.sg/activity/detail/26sg_exo" },
    ],
    time: "2026년 7월",
    isBreaking: false,
    readTime: "2분",
    emoji: "🎤",
    relatedIds: [],
  },
  {
    id: "auto-20260629-2",
    publishedAt: "2026-06-29",
    category: "교통",
    catStyle: "bg-[#EBF5F0] text-[#2B7A50]",
    title: "🚕 Grab 유류할증료 90센트·플랫폼피 $1.20, 7월 31일까지 연장 — 유가 상승 여파",
    summary: "Grab이 3~4월부터 부과해온 유류할증료(50→90센트), GrabCab 미터요금 인상(구간당 26→27센트), 플랫폼피($0.90→$1.20)를 당초 5월 31일 종료 예정에서 7월 31일까지 연장했다. 중동 정세發 글로벌 유가 상승이 원인으로, 건당 약 S$0.30~0.60 추가 부담이 예상된다.",
    fullContent: `**Grab 추가 요금 7월 31일까지 연장**
글로벌 유가 상승으로 임시 부과되던 추가 요금이 연장됐습니다.

- 유류할증료: **50센트 → 90센트**
- 플랫폼피: **S$0.90 → S$1.20**
- GrabCab 미터요금: 구간당 26 → 27센트
- 적용: 당초 5/31 종료 → **7/31까지 연장**
- 건당 약 **S$0.30~0.60 추가** 부담 예상

**참고**
- 정확한 최종 요금은 호출 시 앱에 표시되는 금액을 기준으로 확인하세요.`,
    source: "The Star · Mothership",
    sources: [
      { name: "The Star — Grab 할증료 7/31 연장", url: "https://www.thestar.com.my/aseanplus/aseanplus-news/2026/05/23/singapore-grab-extends-90-cent-fuel-surcharge-higher-grabcab-metered-fares-till-july-31" },
      { name: "Mothership — Grab 유류할증료", url: "https://mothership.sg/2026/03/grab-temporarily-raise-fuel-surcharge-price-volatility/" },
    ],
    time: "2026년 6월",
    isBreaking: false,
    readTime: "2분",
    emoji: "🚕",
    relatedIds: [],
  },
  {
    id: "auto-20260628-1",
    publishedAt: "2026-06-28",
    category: "교통",
    catStyle: "bg-[#EBF5F0] text-[#2B7A50]",
    title: "🎆 NDP 2026 리허설 교통통제 — 7/4·7/25·8/1 캘랑 일대 도로 통제 반복 예정",
    summary: "8월 9일 내셔널 스타디움 National Day Parade(NDP) 2026를 앞두고 콤바인드 리허설·프리뷰 공연 때마다 캘랑·내셔널 스타디움 일대 도로가 통제된다. 6/27 1차 리허설(완료)에 이어 7/4 2차 리허설, 7/25·8/1 프리뷰가 예정돼 유사한 교통통제가 반복될 전망이다. 경찰은 대중교통 이용을 권고했다.",
    fullContent: `**NDP 2026 리허설·프리뷰 교통통제 안내**
8월 9일 내셔널 스타디움 NDP 2026을 앞두고 리허설 때마다 캘랑 일대가 통제됩니다.

- 일정: 1차 리허설 6/27(완료) → **2차 리허설 7/4** → **프리뷰 7/25·8/1**
- 통제 구간: **캘랑·내셔널 스타디움 일대**(Stadium Drive 등), 행사 시간대 도로 통제
- 경찰은 **대중교통 이용 권고**, 통제 구간 불법 주정차 차량 견인

**참고**
- 해당 날짜에 캘랑 지역을 지난다면 시간을 여유 있게 두거나 우회하세요. 정확한 통제 구간·시간은 경찰(SPF) 안내를 확인하세요.`,
    source: "SPF · NDP.gov.sg",
    sources: [
      { name: "SPF — NDP 2026 교통안내 (공식)", url: "https://www.police.gov.sg/Media-Hub/News/2026/06/20260625_traffic_arrangements_for_national_day_parade_2026_combined_rehearsal_1" },
      { name: "NDP.gov.sg — Advisories", url: "https://www.ndp.gov.sg/resources/advisories/" },
    ],
    time: "2026년 6월",
    isBreaking: false,
    readTime: "2분",
    emoji: "🎆",
    relatedIds: [],
  },
  {
    id: "auto-20260627-2",
    publishedAt: "2026-06-27",
    category: "경제",
    catStyle: "bg-[#EBF0FB] text-[#2050A0]",
    title: "🏦 모든 HDB 단지 500m 내 ATM·은행·캐시포인트 배치 — 은행권, 2027년 말까지 고령화 대비 20개 정책",
    summary: "싱가포르은행협회(ABS)가 6월 25일 DBS·OCBC·UOB·NETS와 함께 2027년 말까지 모든 HDB 단지 500m 이내에 ATM·은행지점·캐시포인트를 두겠다고 발표했다. '장수사회 은행서비스' 정책집(총 20개 이니셔티브)의 일부로, 노인 인지저하 감지 가이드라인·사망자 계좌정리 간소화 등이 포함된다. 과도기로 2026년 말까지 대중교통역·호커센터·대형마트 인근에 우선 설치한다.",
    fullContent: `**모든 HDB 단지 500m 내 현금 접근성 확보 (2027년 말 목표)**
싱가포르은행협회(ABS)가 3대 은행(DBS·OCBC·UOB)·NETS와 함께 6월 25일 발표한 고령화 대비 정책입니다.

- 2027년 말까지 **모든 HDB 단지 반경 500m 내 ATM·은행지점·캐시포인트** 확보
- 과도기: **2026년 말까지** 대중교통역·호커센터·대형마트 인근 우선 설치
- '장수사회 은행서비스' 정책집 = 총 **20개 이니셔티브** (노인 인지저하 징후 감지 가이드라인, 사망자 계좌정리 절차 간소화 등 포함)

**참고**
- 현금 사용이 잦거나 부모님을 모시는 한인 가정에 참고가 됩니다.`,
    source: "Mothership · Caproasia",
    sources: [
      { name: "Mothership — HDB 500m 내 ATM·은행 (2027)", url: "https://mothership.sg/2026/06/banks-500m-hdb-seniors/" },
    ],
    time: "2026년 6월",
    isBreaking: false,
    readTime: "2분",
    emoji: "🏦",
    relatedIds: [],
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
    relatedIds: [],
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
    relatedIds: [],
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
    relatedIds: ["17"],
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
];

// 최신순(publishedAt 내림차순) 자동 정렬 — 새 뉴스 추가 시 배열 위치와 무관하게 최신이 위로.
export const NEWS_ITEMS: NewsItem[] = [...RAW_NEWS_ITEMS]
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  .slice(0, 50); // 최신 50건만 노출 (데이터 비대·번들·렌더 비용 관리)
