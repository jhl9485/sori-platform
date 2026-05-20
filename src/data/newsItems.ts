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

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "1",
    category: "경제",
    catStyle: "bg-[#EBF0FB] text-[#2050A0]",
    title: "싱가포르 2025년 4월 소비자물가 전년比 2.3% 상승",
    summary: "식품·주거비 상승이 주된 원인. MAS는 기준금리 동결 기조 유지.",
    fullContent: `싱가포르 통계청(DOS)은 2025년 4월 소비자물가지수(CPI)가 전년 동기 대비 2.3% 상승했다고 발표했습니다.

**주요 상승 항목**
- 식품: +3.1% (특히 외식 비용 상승)
- 주거비: +2.8%
- 교통비: +1.9%
- 의류/신발: -0.4% (하락)

**한인 커뮤니티 영향**
한인 밀집 지역인 Tanjong Pagar, Buona Vista 등의 콘도 임대료가 꾸준히 상승 중이며, 한국 식품 수입 비용 증가로 한인 마트 물가도 영향을 받고 있습니다.

**MAS 입장**
싱가포르 통화청(MAS)은 현재의 환율 정책을 유지하면서 인플레이션을 점진적으로 안정시킨다는 입장을 재확인했습니다.

**전문가 전망**
대부분의 경제 전문가들은 2025년 하반기 물가 상승세가 둔화될 것으로 예측하고 있습니다.`,
    source: "CNA · AI 번역",
    time: "오늘 오전 8:12",
    isBreaking: false,
    readTime: "2분",
    emoji: "📊",
    relatedIds: ["3", "5"],
  },
  {
    id: "2",
    category: "한인소식",
    catStyle: "bg-[#FBF0EC] text-[#D04020]",
    title: "[한인회] 2025 한인의 밤 행사 참가 신청 시작",
    summary: "6월 28일 Marina Bay Sands 개최. 사전 신청 시 할인 혜택.",
    fullContent: `싱가포르 한인회는 2025년 '한인의 밤' 행사 참가 신청을 받는다고 밝혔습니다.

**행사 개요**
- 일시: 2025년 6월 28일(토) 오후 6시
- 장소: Marina Bay Sands Ballroom
- 주최: 싱가포르 한인회
- 참가비: SGD 120/인 (사전 신청 SGD 100)

**프로그램**
- 한인회장 환영사
- 싱가포르 주재 한국대사 축사
- 한국 전통 공연 및 K-POP 공연
- 뷔페 디너 및 네트워킹

**신청 방법**
한인회 공식 웹사이트 또는 카카오톡 채널 @koreasocietysg 를 통해 신청하세요. 마감일: 2025년 5월 31일

**문의**: koreasociety@korea.org.sg`,
    source: "싱가포르 한인회 공식",
    time: "오늘 오전 9:30",
    isBreaking: false,
    readTime: "1분",
    emoji: "🎉",
    relatedIds: [],
  },
  {
    id: "3",
    category: "부동산",
    catStyle: "bg-[#FBF5E8] text-[#B07010]",
    title: "싱가포르 콘도 임대료, 3개월 연속 하락세",
    summary: "CBD 인근 콘도 임대료 3개월 연속 하락. 하반기 추가 조정 가능성 언급.",
    fullContent: `싱가포르 부동산 시장 데이터에 따르면 CBD 및 주요 주거 지역의 콘도 임대료가 3개월 연속 하락세를 보이고 있습니다.

**지역별 현황**
- Tanjong Pagar: 평균 3.8% 하락
- Buona Vista / One-North: 2.9% 하락
- Orchard: 4.1% 하락
- Bishan / Ang Mo Kio: 1.5% 하락

**한인 관심 지역 임대료 (2BR 기준)**
- Tanjong Pagar: SGD 4,200~5,500/월
- Buona Vista: SGD 3,800~5,000/월
- Orchard: SGD 5,500~8,000/월

**전문가 분석**
공급 과잉과 외국인 수요 감소가 주된 원인으로, 하반기에도 소폭 하락이 지속될 것으로 예상됩니다. 특히 럭셔리 세그먼트에서 조정이 더 두드러질 전망입니다.

**이주 예정자에게는 기회**
전문가들은 현재가 협상력이 강한 시점이라며, 장기 계약(2년+) 시 추가 할인을 요구해볼 것을 권장합니다.`,
    source: "Straits Times · AI 번역",
    time: "어제 오후 6:00",
    isBreaking: false,
    readTime: "3분",
    emoji: "🏘️",
    relatedIds: ["1"],
  },
  {
    id: "4",
    category: "날씨/환경",
    catStyle: "bg-[#F5F0FF] text-[#7040C0]",
    title: "이번 주말 강한 스콜 예보, 외출 시 우산 필수",
    summary: "NEA: 주말 오후 강한 스콜 예상. 기온 32-35°C, 습도 85%+.",
    fullContent: `싱가포르 국가환경청(NEA)은 이번 주말 강한 스콜이 예상된다며 주의를 당부했습니다.

**날씨 예보**
- 토요일: 오후 2시~6시 강한 스콜 예상
- 일요일: 오전 11시~오후 3시 스콜 가능성
- 기온: 32~35°C
- 습도: 80~90%

**주의사항**
- 외출 시 우산 필수 지참
- 야외 행사 계획 재검토 권고
- 번개 동반 가능성 있음

**한인 커뮤니티 영향**
주말 야외 활동(바베큐, 피크닉 등) 계획하신 분들은 실내 대안을 마련해두세요.

**주간 날씨 예보**
- 월-화: 맑음 ~ 약간의 소나기
- 수-목: 부분적 흐림
- 금: 스콜 가능성 있음`,
    source: "NEA · AI 번역",
    time: "오늘 오전 7:00",
    isBreaking: true,
    readTime: "1분",
    emoji: "🌧️",
    relatedIds: [],
  },
];
