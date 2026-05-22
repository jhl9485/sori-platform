export type CommunityCategory =
  | "생활정보"
  | "맛집"
  | "취업정보"
  | "금융/투자"
  | "육아"
  | "의료"
  | "연애"
  | "익명"
  | "동아리";

export type VisaBadge = "EP" | "S-Pass" | "DP" | "PR" | "시민권" | "WH" | null;

export interface Comment {
  id: string;
  author: string;
  avatarChar: string;
  avatarBg: string;
  avatarColor: string;
  content: string;
  time: string;
  likes: number;
  isAnon?: boolean;
  replies?: Comment[];
}

export interface CommunityPost {
  id: string;
  categoryId: string;
  categoryLabel: CommunityCategory;
  categoryStyle: string;
  avatarChar: string;
  avatarBg: string;
  avatarColor: string;
  author: string;
  time: string;
  title: string;
  preview: string;
  fullContent: string;
  tags: string[];
  views: string;
  comments: string;
  likes: string;
  isAnon?: boolean;
  visaBadge?: VisaBadge;
  isPinned?: boolean;
  relatedIds?: string[];
}

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: "1",
    categoryId: "life",
    categoryLabel: "생활정보",
    categoryStyle: "bg-[#EBF0FB] text-[#2050A0]",
    avatarChar: "김",
    avatarBg: "#EBF0FB",
    avatarColor: "#2050A0",
    author: "김싱가해",
    time: "2시간 전",
    title: "OCBC 은행 계좌 개설 2026 최신 후기 (EP 기준) — 달라진 서류 총정리",
    preview: "드디어 계좌 개설 성공! 예전이랑 달라진 게 있어서 정리해요. 예약 필수, 워크인 거의 안 받아요.",
    fullContent: `드디어 OCBC 계좌 개설 성공했습니다! 몇 달 전에 시도했다가 서류 문제로 실패했는데 이번엔 완벽하게 준비해서 갔어요.

**필요 서류 (2026년 최신 기준)**
- 여권 원본
- EP 카드 원본
- 재직증명서 영문본 (회사 레터헤드에 서명 필수, 3개월 이내 발급)
- 최근 3개월 급여명세서 또는 회사 고용 계약서
- 주소 증명 (유틸리티 빌 / 은행 스테이트먼트 / 텔레콤 빌 — 3개월 이내)

**주의사항**
예약은 필수입니다. 요즘 워크인은 거의 안 받아요. OCBC 앱에서 사전 예약 필수. 저는 Tanjong Pagar 지점 갔는데 대기 없이 바로 됐어요.

**추천 계좌: 360 Account**
월급 이체 + OCBC 카드 사용 + 보험 또는 투자 조건 맞추면 이자율 연 3~4%대 가능. 싱가포르 내 이자 수익 비과세라서 무조건 활용하세요.

**처리 시간**
현장에서 약 25~30분. 데빗카드는 3~5 영업일 내 등기 우편으로 옵니다.

**한국 송금 팁**
OCBC에서 직접 Wise 연동 추천드려요. 수수료 SGD 3~5 수준으로 저렴하고 빠릅니다.

궁금한 점 댓글로 달아주세요!`,
    tags: ["은행", "OCBC", "EP비자", "금융", "계좌개설"],
    views: "1,234",
    comments: "28",
    likes: "156",
    visaBadge: "EP",
    relatedIds: ["5", "6"],
  },
  {
    id: "2",
    categoryId: "food",
    categoryLabel: "맛집",
    categoryStyle: "bg-[#FBF0EC] text-[#D04020]",
    avatarChar: "이",
    avatarBg: "#FBF0EC",
    avatarColor: "#D04020",
    author: "이만지햄버",
    time: "5시간 전",
    title: "Tanjong Pagar 감자탕 신규 오픈 솔직 후기 — 웨이팅 있으니 참고",
    preview: "지난주에 오픈한 곳인데 진짜 실망이 없어요. 국물이 진하고 양도 많아요. 사장님이 한국분.",
    fullContent: `Tanjong Pagar Plaza 2층에 새로 오픈한 감자탕집 다녀왔어요!

**기본 정보**
- 위치: Tanjong Pagar Plaza #02-15 (MRT 5분 거리)
- 영업시간: 11:30 - 22:00 (월요일 휴무)
- 주차: 맞은편 공영 주차장 이용 ($1.20/30분)

**메뉴 & 가격**
- 감자탕 (小, 1~2인) $28 — 뼈가 두툼하고 국물 진함
- 감자탕 (大, 3~4인) $48 — 단체 추천
- 순대볶음 $22 — 분식집 느낌 그대로
- 도가니탕 $35 — 한국인 사장님 개인 추천
- 막걸리 (병) $12 / 소주 $10

**솔직 리뷰**
싱가포르에서 이 정도 퀄리티면 진짜 최상급이에요. 사장님이 직접 요리하시고 "고수 빼달라" 해도 흔쾌히 바꿔주세요. 국물 리필 가능!

단점은 주말 대기가 좀 있어요. 인스타 올린 후로 한국분들뿐 아니라 로컬도 많이 오시더라고요. 평일 점심 가시는 걸 추천!

양이 정말 많아서 소(小) 사이즈도 2명이 먹으면 배불러요 ㅋㅋ`,
    tags: ["감자탕", "Tanjong-Pagar", "한식", "맛집", "신규오픈"],
    views: "892",
    comments: "41",
    likes: "98",
    visaBadge: "EP",
    relatedIds: ["8"],
  },
  {
    id: "3",
    categoryId: "job",
    categoryLabel: "취업정보",
    categoryStyle: "bg-[#EBF5F0] text-[#2B7A50]",
    avatarChar: "박",
    avatarBg: "#EBF5F0",
    avatarColor: "#2B7A50",
    author: "박취업성공",
    time: "1일 전",
    title: "한국계 IT 기업 싱가포르 현지 취업 성공기 + EP 신청까지 전 과정 공유",
    preview: "6개월 준비 끝에 SGD 7,500 오퍼 수락. LinkedIn 전략, 기술면접 준비법, EP 신청까지 전부 공유합니다.",
    fullContent: `6개월의 긴 준비 끝에 드디어 싱가포르 IT 기업 오퍼 받았습니다! 처음부터 끝까지 공유할게요.

**제 배경**
- 한국 IT 기업 백엔드 개발 5년 경력
- 영어: 비즈니스 회화 가능 (OPIc AL 수준)
- 싱가포르 연고 없음

**취업 준비 타임라인 (6개월)**
- 1~2월: LinkedIn 프로필 전면 개편, 영문 이력서 재작성
- 3~4월: 50여 곳 지원, 서류 통과율 약 20%
- 5월: 최종 면접 3곳 (Zoom + 현장)
- 6월: 오퍼 수락 (SGD 7,500/월, EP 스폰서 포함)

**핵심 팁 5가지**
1. LinkedIn이 전부입니다 — 헤드헌터 연락이 먼저 와요
2. EP 스폰서 여부를 서류 전에 확인하세요 (안 해주는 곳 많음)
3. 기술 면접은 LeetCode Medium 위주로 대비
4. 한국어 + 영어 동시 가능 포지션이 경쟁률 낮음
5. Glassdoor에서 연봉 밴드 미리 확인 후 협상

**EP 신청 프로세스**
오퍼 수락 → 회사 HR이 MOM MyPass 통해 EP 신청 → 처리 기간 약 3주 → 승인 후 IPA 레터 수령 → 싱가포르 입국 후 EP 카드 발급

**2026년 EP 최저급여 주의**
2026년부터 EP 최저급여가 $6,000로 올랐으니 협상 전 꼭 확인하세요!`,
    tags: ["취업", "EP비자", "IT", "이직", "COMPASS"],
    views: "3,401",
    comments: "87",
    likes: "342",
    visaBadge: "EP",
    relatedIds: ["6", "7"],
  },
  {
    id: "4",
    categoryId: "anon",
    categoryLabel: "익명",
    categoryStyle: "bg-[#F0EDE8] text-[#888070]",
    avatarChar: "?",
    avatarBg: "#F0EDE8",
    avatarColor: "#888070",
    author: "익명",
    time: "3시간 전",
    title: "회사 한국인 상사 때문에 너무 힘들어요... EP라서 쉽게 이직도 못하고",
    preview: "한국 본사 파견 팀장인데 매일 야근 압박에 주말 카톡... EP 스폰서 때문에 못 나가는 분 계세요?",
    fullContent: `익명으로 올립니다. 많이 지쳐서요.

한국 본사에서 파견 나온 팀장이 있는데 정말 힘들어요. 현지 법인인데 한국 문화 그대로라 괴롭습니다.

**현재 상황**
- 계약서에 없는 매일 밤 10시 이후 야근
- 주말에도 카톡 업무 지시 (새벽 2시도 있음)
- "싱가포르 와서 생각이 느슨해졌다"는 발언
- HR에 얘기했더니 "팀장님이랑 잘 풀어봐라"

EP 스폰서가 이 회사라서 함부로 그만두기도 무서운 상황이에요. 이직하면 EP 처리 기간 동안 공백이 생기는데 그게 너무 걱정되고...

싱가포르 노동법 위반 아닌가요? MOM에 신고하면 어떻게 되나요? 비슷한 경험 있으신 분들 어떻게 하셨는지 여쭤보고 싶어요.`,
    tags: ["직장고민", "이직", "EP비자", "익명", "노동법"],
    views: "2,109",
    comments: "63",
    likes: "187",
    isAnon: true,
    relatedIds: ["3"],
  },
  {
    id: "5",
    categoryId: "finance",
    categoryLabel: "금융/투자",
    categoryStyle: "bg-[#EBF5F0] text-[#2B7A50]",
    avatarChar: "정",
    avatarBg: "#EBF5F0",
    avatarColor: "#2B7A50",
    author: "정재테크",
    time: "2일 전",
    title: "싱가포르 한인 재테크 완전정복 — SRS·CPF·ETF·보험 총정리 (2026 업데이트)",
    preview: "싱가포르에서 세금 줄이고 자산 불리는 방법. SRS 계좌로 세금 환급받고, CPF 이자 4% 챙기고, IBKR로 ETF 투자까지.",
    fullContent: `싱가포르 EP 직장인이라면 반드시 알아야 할 재테크 루틴 정리했습니다. 2026년 기준입니다.

**1. SRS (Supplementary Retirement Scheme) — 세금 환급 필수**
- 연간 최대 납입: SGD 35,700 (외국인 기준)
- 납입액 전액 소득 공제 → 세금 환급 효과
- 연간 소득 SGD 80,000 기준 약 SGD 3,000~5,000 환급 가능
- 투자처: SRS 계좌 내에서 주식·ETF·보험 투자 가능

**2. CPF (Central Provident Fund) — PR 취득 후 필수**
- PR 취득 시 자동 가입
- OA(Ordinary Account): 이자 2.5~3.5%
- SA(Special Account): 이자 4%
- 주택 구입 시 OA 잔액 사용 가능

**3. ETF 투자 — IBKR 추천**
- Interactive Brokers(IBKR) 통해 SGX/NYSE ETF 투자
- 추천: S&P500 ETF (VOO, SPY), 싱가포르 REIT ETF
- 싱가포르 거주자: 주식 배당·자본이득세 없음 (주요 장점!)

**4. 보험 — 우선순위**
- Term Life 먼저 (Pure Shield 또는 AIA)
- Hospital Plan: Integrated Shield Plan 필수
- EP 소지자도 MediShield Life 가입 의무

**5. 한국 vs 싱가포르 세금 비교**
- 싱가포르 소득세: 최고 22% (연소득 SGD 320k+)
- 한국 소득세: 최고 49.5%
- → 싱가포르 체류 기간 이용해 세금 절감 효과 극대화 전략 중요`,
    tags: ["재테크", "SRS", "CPF", "ETF", "세금", "투자"],
    views: "2,845",
    comments: "52",
    likes: "289",
    visaBadge: "EP",
    relatedIds: ["1", "7"],
  },
  {
    id: "6",
    categoryId: "life",
    categoryLabel: "생활정보",
    categoryStyle: "bg-[#EBF0FB] text-[#2050A0]",
    avatarChar: "최",
    avatarBg: "#EBF0FB",
    avatarColor: "#2050A0",
    author: "최콘도협상",
    time: "3일 전",
    title: "콘도 임대 협상 성공기 — 공실률 7% 활용해서 $500 깎은 방법 (실제 대화 스크립트 포함)",
    preview: "시장 약세 정보 공부해서 집주인이랑 협상했어요. SGD 500 깎고 2년 계약. 실제 이메일 내용 공유합니다.",
    fullContent: `2026년 싱가포르 콘도 임대 시장이 임차인에게 유리하게 바뀌었어요. 이걸 활용해서 협상 성공한 방법 공유합니다.

**배경 상황**
- 대상 유닛: Tanjong Pagar 인근 2BR 콘도
- 집주인 제시가: SGD 5,200/월
- 최종 계약가: **SGD 4,700/월** (SGD 500 절감, 2년 계약)

**협상 전 준비 (이게 핵심)**
1. PropertyGuru에서 동일 단지 유사 유닛 10개 시세 조사
2. 현재 공실률 7%, 임대료 상승률 3%로 둔화 정보 준비
3. 같은 단지 다른 유닛과도 동시에 상담 진행 (경쟁 유도)

**실제 협상 이메일 핵심 문구**
"Based on current market data, similar units in this development are listed at SGD 4,600–4,900. Given the current vacancy rate and market conditions, I'd like to propose SGD 4,700 with a 2-year lease. I'm a stable tenant with a confirmed EP and can sign promptly."

**추가로 얻어낸 조건**
- 에어컨 필터 교체 비용 집주인 부담 (연 1회)
- Diplomatic Clause 포함 (12개월 후 1개월 전 통보로 중도 해지 가능)
- 첫 달 렌트 50% 할인 (Free rent 1/2 month)

**팁**
- 절대 서두르는 티 내지 마세요
- 다른 유닛도 보고 있다는 걸 자연스럽게 알리기
- 계약 Stamp Duty는 임차인이 내지만 이것도 협상 가능`,
    tags: ["콘도", "임대협상", "부동산", "생활정보", "절약"],
    views: "1,567",
    comments: "34",
    likes: "201",
    visaBadge: "EP",
    relatedIds: ["1", "5"],
  },
  {
    id: "7",
    categoryId: "job",
    categoryLabel: "취업정보",
    categoryStyle: "bg-[#EBF5F0] text-[#2B7A50]",
    avatarChar: "강",
    avatarBg: "#EBF5F0",
    avatarColor: "#2B7A50",
    author: "강EP걱정",
    time: "4일 전",
    title: "2026년 EP 최저급여 $6,000 인상 — 내 연봉 기준으로 갱신 통과할 수 있을까? (COMPASS 자가진단 방법)",
    preview: "2026년부터 EP 최저급여 $6,000으로 올랐는데 COMPASS 점수도 함께 봐야 해서 걱정되시는 분들 많죠. 자가진단 방법 공유합니다.",
    fullContent: `2026년 1월부터 EP 최저급여가 SGD 5,600 → SGD 6,000으로 올랐습니다. 갱신 예정이거나 신규 신청 예정이신 분들 반드시 확인하세요.

**2026년 EP 최저 자격 급여**
- 일반 업종: SGD 6,000/월
- 금융 서비스업: SGD 6,600/월
- 나이가 많을수록 기준 급여 상향 (40대 중반: $10,700~$11,800)

**COMPASS 점수제 — 40점 이상 필수**
급여 기준 통과해도 COMPASS 40점 미달이면 거절됩니다.

| 항목 | 배점 | 설명 |
|------|------|------|
| C1 급여 | 0~20점 | 동종업계 중위 급여 대비 |
| C2 자격 | 0~20점 | 학위 수준 |
| C3 다양성 | 0~10점 | 회사 내 국적 다양성 |
| C4 로컬지원 | 0~10점 | 싱가포르인 채용 비율 |
| C5 전략분야 | 보너스 | 정부 지정 전략 업종 |

**자가진단 방법**
1. MOM 공식 사이트 → COMPASS Self-Assessment Tool
2. 연봉, 학력, 업종, 회사 규모 입력
3. 결과에서 약한 항목 파악 → HR과 협의

**실무 팁**
- 급여가 딱 기준선이면 위험 → 회사에 인상 요청하거나 이직 고려
- 금융업 기준인 $6,600에 해당하는지 MOM 분류 코드로 확인 필수
- EP 만료 6개월 전 갱신 준비 시작 권장`,
    tags: ["EP비자", "COMPASS", "갱신", "비자", "2026"],
    views: "4,123",
    comments: "96",
    likes: "387",
    visaBadge: "EP",
    relatedIds: ["3"],
  },
  {
    id: "8",
    categoryId: "food",
    categoryLabel: "맛집",
    categoryStyle: "bg-[#FBF0EC] text-[#D04020]",
    avatarChar: "윤",
    avatarBg: "#FBF0EC",
    avatarColor: "#D04020",
    author: "윤맛집탐방",
    time: "5일 전",
    title: "Little Korea (Tanjong Pagar) 한식 맛집 2026 최신 지도 — 한인 추천 TOP 10",
    preview: "Tanjong Pagar에 새 한식당이 계속 생기고 있어요. 한인 커뮤니티 추천 TOP 10 정리했습니다. 신규 오픈 포함.",
    fullContent: `Tanjong Pagar '리틀 코리아' 지역 한식 맛집 2026년 최신 버전으로 업데이트했습니다. 오래된 정보는 과감히 제외하고 최근 방문 후기 기준으로 정리했어요.

**🔥 강력 추천 TOP 5**

1. **강남부식** (Tanjong Pagar Plaza) ⭐4.8
   - 한국식 정식, 찌개류 전문. 점심 런치박스 $12 가성비 최고
   - 영업: 11:00~22:00

2. **뼈해장국 전문점 (신규 오픈)** (Tanjong Pagar Rd)
   - 2026년 2월 오픈. 뼈해장국 $22, 내장탕 $20
   - 해장에 최적. 주말 아침부터 오픈

3. **한가위 치킨** (Amoy St) ⭐4.7
   - 한국식 치킨. 후라이드+양념 반반 $28. 배달 가능 (GrabFood)

4. **서울김밥** (Tg Pagar Plaza #01) ⭐4.5
   - 참치마요, 불고기 김밥 $6~8. 혼밥하기 최고
   - 포장 전문, 자리 없음 주의

5. **홍콩반점 (한국식)** (Keong Saik Rd)
   - 짜장면, 짬뽕, 탕수육. 한국 분식 느낌 그대로
   - 짬뽕 $14, 탕수육 $28

**📍 위치 팁**
Tanjong Pagar MRT 출구에서 Tanjong Pagar Plaza, Tanjong Pagar Rd, Tras St 방향으로 걸으면 한식당들이 밀집해 있어요.

**가성비 추천**
호커센터 내 한식 코너 (Maxwell Food Centre 등)도 꽤 괜찮아요. $6~10에 한 끼 해결.`,
    tags: ["맛집", "Tanjong-Pagar", "한식", "리틀코리아", "맛집지도"],
    views: "3,218",
    comments: "72",
    likes: "445",
    visaBadge: "PR",
    relatedIds: ["2"],
  },
];

export const SAMPLE_COMMENTS: Record<string, Comment[]> = {
  "1": [
    {
      id: "c1",
      author: "이은행맨",
      avatarChar: "이",
      avatarBg: "#EBF5F0",
      avatarColor: "#2B7A50",
      content: "저도 지난달에 개설했는데 주소 증명 서류 때문에 한 번 더 가야 했어요. 유틸리티 빌 없으면 텔레콤 빌도 된다고 하더라고요. 좋은 정보 감사합니다!",
      time: "1시간 전",
      likes: 12,
      replies: [
        {
          id: "c1r1",
          author: "김싱가해",
          avatarChar: "김",
          avatarBg: "#EBF0FB",
          avatarColor: "#2050A0",
          content: "맞아요! 저는 Singtel 빌로 했는데 통과됐어요. Starhub이나 M1도 된다고 들었어요.",
          time: "45분 전",
          likes: 5,
        }
      ]
    },
    {
      id: "c2",
      author: "박뉴비",
      avatarChar: "박",
      avatarBg: "#FBF5E8",
      avatarColor: "#B07010",
      content: "혹시 계좌 개설 후 한국으로 송금할 때 Wise vs Instarem 중 어느 쪽이 더 저렴한가요?",
      time: "30분 전",
      likes: 3,
      replies: [
        {
          id: "c2r1",
          author: "김싱가해",
          avatarChar: "김",
          avatarBg: "#EBF0FB",
          avatarColor: "#2050A0",
          content: "저는 Wise 쓰는데 수수료 SGD 3~5 정도라 만족해요. Instarem은 큰 금액엔 더 저렴하다고 하더라고요!",
          time: "20분 전",
          likes: 7,
        }
      ]
    },
    {
      id: "c3",
      author: "한싱가",
      avatarChar: "한",
      avatarBg: "#F5F0FF",
      avatarColor: "#7040C0",
      content: "360 Account 이자 조건 중에 보험 가입 조건이 제일 어려운 것 같던데, 보험 어떤 거 가입하셨나요?",
      time: "15분 전",
      likes: 2,
    },
  ],
  "2": [
    {
      id: "c4",
      author: "한배고파",
      avatarChar: "한",
      avatarBg: "#FBF0EC",
      avatarColor: "#D04020",
      content: "저도 지난 주에 다녀왔는데 뼈찜도 진짜 맛있었어요! 사장님이 정말 친절하시고 고수 없이도 맛있게 먹었어요 ㅎㅎ",
      time: "4시간 전",
      likes: 8,
    },
    {
      id: "c5",
      author: "싱가주부",
      avatarChar: "싱",
      avatarBg: "#EBF5F0",
      avatarColor: "#2B7A50",
      content: "주말에 가보려고 했는데 웨이팅이 있군요ㅠ 평일 점심에 가봐야겠어요. 아이 데려가도 괜찮은 분위기인가요?",
      time: "2시간 전",
      likes: 4,
      replies: [
        {
          id: "c5r1",
          author: "이만지햄버",
          avatarChar: "이",
          avatarBg: "#FBF0EC",
          avatarColor: "#D04020",
          content: "네! 테이블 사이 공간도 넓어서 유모차도 가능할 것 같았어요. 아이 메뉴는 별도 없지만 밥이랑 국 따로 주문하면 돼요.",
          time: "1시간 전",
          likes: 6,
        }
      ]
    },
  ],
  "3": [
    {
      id: "c6",
      author: "개발자최",
      avatarChar: "최",
      avatarBg: "#EBF0FB",
      avatarColor: "#2050A0",
      content: "저도 비슷한 루트로 취업했어요. LinkedIn이 정말 중요하더라고요. 헤드헌터한테 먼저 연락이 오면 훨씬 편해요. 프로필 Open to Work 설정 꼭 하세요!",
      time: "20시간 전",
      likes: 34,
    },
    {
      id: "c7",
      author: "싱가포르뉴비",
      avatarChar: "싱",
      avatarBg: "#F5F0FF",
      avatarColor: "#7040C0",
      content: "2026년 EP 최저급여 $6,000로 올랐는데 이게 합격에 영향 미쳤나요? 저는 $6,200 오퍼 받았는데 괜찮을지 걱정돼요.",
      time: "18시간 전",
      likes: 15,
      replies: [
        {
          id: "c7r1",
          author: "박취업성공",
          avatarChar: "박",
          avatarBg: "#EBF5F0",
          avatarColor: "#2B7A50",
          content: "$6,200이면 최저 기준 통과는 되는데 COMPASS 점수도 같이 봐야 해요. MOM 자가진단 도구 써보시면 바로 확인 돼요!",
          time: "16시간 전",
          likes: 12,
        }
      ]
    },
    {
      id: "c8",
      author: "헤드헌터박",
      avatarChar: "헌",
      avatarBg: "#FBF5E8",
      avatarColor: "#B07010",
      content: "한인 대상 채용 많이 진행하는 헤드헌터입니다. LinkedIn 프로필에 한국어 가능 여부 명시하면 조회수가 확 올라요. 궁금하신 분은 DM 주세요.",
      time: "10시간 전",
      likes: 22,
    },
  ],
  "4": [
    {
      id: "c9",
      isAnon: true,
      author: "익명",
      avatarChar: "?",
      avatarBg: "#F0EDE8",
      avatarColor: "#888070",
      content: "저도 비슷한 상황이었어요. EP 이직 시 새 회사가 먼저 In-Principle Approval(IPA) 받아주면, 기존 EP 만료 전에 처리 가능해요. 공백 없이 이직 가능합니다. 새 회사 HR한테 이 부분 꼭 확인하세요.",
      time: "2시간 전",
      likes: 67,
    },
    {
      id: "c10",
      author: "노무사임",
      avatarChar: "노",
      avatarBg: "#EBF5F0",
      avatarColor: "#2B7A50",
      content: "싱가포르 노동법상 강제 야근(계약서 외)은 MOM에 신고 가능합니다. 익명 신고도 되고요. 다만 EP 상태에서 신고하면 실제로 복잡해질 수 있어 선택이 어렵죠. 이직 먼저 알아보시는 걸 권해드려요.",
      time: "1시간 전",
      likes: 43,
    },
  ],
  "5": [
    {
      id: "c11",
      author: "재테크왕",
      avatarChar: "재",
      avatarBg: "#EBF5F0",
      avatarColor: "#2B7A50",
      content: "SRS 정말 꿀이죠. 저는 올해 SGD 35,700 꽉 채웠어요. 세금 환급이 SGD 4,500 정도 됩니다. IBKR에서 SRS 계좌로 ETF 사는 것도 가능하더라고요.",
      time: "1일 전",
      likes: 28,
    },
    {
      id: "c12",
      author: "PR준비중",
      avatarChar: "피",
      avatarBg: "#EBF0FB",
      avatarColor: "#2050A0",
      content: "CPF 관련해서 PR 신청 시 CPF 납입 이력이 영향을 미치나요? PR 신청 준비 중인데 CPF 관련 정보가 궁금해요.",
      time: "20시간 전",
      likes: 11,
      replies: [
        {
          id: "c12r1",
          author: "정재테크",
          avatarChar: "정",
          avatarBg: "#EBF5F0",
          avatarColor: "#2B7A50",
          content: "EP 소지자는 CPF 의무 납입이 없어요. PR 취득 후부터 납입 시작됩니다. PR 심사에서 CPF가 직접 영향은 없지만, 세금 납부 이력은 중요해요.",
          time: "18시간 전",
          likes: 9,
        }
      ]
    },
  ],
  "6": [
    {
      id: "c13",
      author: "콘도이사중",
      avatarChar: "콘",
      avatarBg: "#FBF5E8",
      avatarColor: "#B07010",
      content: "이 글 덕분에 저도 협상해서 SGD 300 깎았어요!! 스크립트 참고해서 이메일 보냈는데 집주인이 수락했어요. 감사합니다!!",
      time: "1일 전",
      likes: 45,
    },
    {
      id: "c14",
      author: "부동산중개사",
      avatarChar: "중",
      avatarBg: "#EBF0FB",
      avatarColor: "#2050A0",
      content: "Diplomatic Clause는 정말 중요해요. EP 비자 상황이 바뀔 수 있으니 꼭 넣으세요. 집주인 입장에서도 좋은 세입자면 수락하는 경우 많아요.",
      time: "2일 전",
      likes: 33,
    },
  ],
  "7": [
    {
      id: "c15",
      author: "EP갱신예정",
      avatarChar: "갱",
      avatarBg: "#EBF0FB",
      avatarColor: "#2050A0",
      content: "MOM 자가진단 도구 써봤는데 C3(다양성) 점수가 낮게 나와서 걱정됩니다. 이걸 올릴 방법이 있나요?",
      time: "3일 전",
      likes: 19,
      replies: [
        {
          id: "c15r1",
          author: "강EP걱정",
          avatarChar: "강",
          avatarBg: "#EBF5F0",
          avatarColor: "#2B7A50",
          content: "C3는 개인이 바꾸기 어려운 항목이라, 다른 항목(C1 급여, C2 학력)에서 점수를 보완하는 게 현실적이에요. 급여 인상 협상을 우선 시도해보세요.",
          time: "2일 전",
          likes: 14,
        }
      ]
    },
    {
      id: "c16",
      author: "이민컨설턴트",
      avatarChar: "이",
      avatarBg: "#FBF5E8",
      avatarColor: "#B07010",
      content: "금융업 여부는 SSIC 코드로 결정됩니다. 회사 ACRA 등록 업종을 확인해보세요. 혼합 업종 회사는 주요 업종 기준으로 적용됩니다.",
      time: "3일 전",
      likes: 28,
    },
  ],
  "8": [
    {
      id: "c17",
      author: "싱가맛집러",
      avatarChar: "맛",
      avatarBg: "#FBF0EC",
      avatarColor: "#D04020",
      content: "강남부식 런치박스 진짜 가성비 최고예요. $12에 이 퀄리티라니. 요즘 줄이 좀 길어졌는데 11시 반에 가면 여유 있게 먹을 수 있어요!",
      time: "4일 전",
      likes: 31,
    },
    {
      id: "c18",
      author: "뉴비싱",
      avatarChar: "뉴",
      avatarBg: "#EBF5F0",
      avatarColor: "#2B7A50",
      content: "이제 막 싱가포르 이사 온 뉴비인데 이 리스트 너무 유용해요! 첫 주말에 Tanjong Pagar 투어 해봐야겠어요. 혼자 가도 괜찮은 분위기인가요?",
      time: "5일 전",
      likes: 16,
      replies: [
        {
          id: "c18r1",
          author: "윤맛집탐방",
          avatarChar: "윤",
          avatarBg: "#FBF0EC",
          avatarColor: "#D04020",
          content: "물론이죠! 특히 서울김밥이나 호커센터 한식 코너는 혼밥하기 딱 좋아요. 환영합니다 싱가포르에! 🇸🇬",
          time: "4일 전",
          likes: 22,
        }
      ]
    },
  ],
};
