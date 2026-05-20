export type CommunityCategory = "생활정보" | "맛집" | "취업정보" | "금융/투자" | "부동산" | "육아" | "의료" | "연애" | "익명" | "동아리" | "벼룩시장";

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
    author: "김싱가해 · EP 3년차",
    time: "2시간 전",
    title: "OCBC 은행 계좌 개설 2025 최신 후기 (EP 기준)",
    preview: "드디어 계좌 개설 성공했습니다. 예전이랑 달라진 게 있어서 정리해요.",
    fullContent: `드디어 OCBC 계좌 개설 성공했습니다! 몇 달 전에 시도했다가 서류 문제로 실패했는데 이번엔 완벽하게 준비해서 갔어요.

**필요 서류 (2025년 기준)**
- 여권 원본
- EP 카드 (원본)
- 재직증명서 영문본 (회사 레터헤드에 서명 필수)
- 최근 3개월 급여명세서
- 주소 증명 (유틸리티 빌 또는 은행 스테이트먼트)

**주의사항**
예약은 필수입니다. 요즘 워크인은 거의 안 받더라고요. OCBC 앱에서 사전 예약하고 가세요. 저는 Tanjong Pagar 지점 갔는데 대기 거의 없었어요.

**계좌 종류**
360 Account 추천드려요. 월급 이체 + 크레딧 카드 쓰면 이자율이 꽤 높아집니다. 조건 맞추면 연 4%대도 가능해요.

**처리 시간**
현장에서 30분 정도 걸렸고, 카드는 5-7 영업일 후 우편으로 받았습니다.

궁금한 점 댓글로 달아주세요!`,
    tags: ["은행", "OCBC", "EP비자", "금융"],
    views: "1,234",
    comments: "28",
    likes: "156",
  },
  {
    id: "2",
    categoryId: "food",
    categoryLabel: "맛집",
    categoryStyle: "bg-[#FBF0EC] text-[#D04020]",
    avatarChar: "이",
    avatarBg: "#FBF0EC",
    avatarColor: "#D04020",
    author: "이만지햄버 · 싱가포르 5년",
    time: "5시간 전",
    title: "Tanjong Pagar 새로 생긴 감자탕집 진짜 후기",
    preview: "지난주에 오픈한 곳인데 진짜 실망이 없어요. 한국에서 먹던 그 맛이에요.",
    fullContent: `Tanjong Pagar Plaza 2층에 새로 오픈한 감자탕집 다녀왔습니다.

**위치**: Tanjong Pagar Plaza #02-15 (MRT에서 5분 거리)
**영업시간**: 11:30 - 22:00 (월요일 휴무)
**가격대**: $25-45 (1-2인 기준)

**먹어본 메뉴**
- 감자탕 (小) $28 - 뼈가 두툼하고 국물이 진해요. 고수 빼달라고 하면 빼줍니다.
- 순대볶음 $22 - 한국 분식집 느낌 그대로
- 막걸리 $12 - 선택지가 다양해서 좋았어요

**총평**
싱가포르에서 이 정도 감자탕 퀄리티면 진짜 최상급입니다. 사장님이 한국분이고 직접 요리하시더라고요. 주말엔 웨이팅 있을 것 같아서 평일 점심 가시는 걸 추천드려요.

가격이 좀 있긴 한데 양이 정말 많아서 2명이 먹으면 배터져요 ㅋㅋ`,
    tags: ["감자탕", "Tanjong-Pagar", "한식", "맛집"],
    views: "892",
    comments: "41",
    likes: "98",
  },
  {
    id: "3",
    categoryId: "job",
    categoryLabel: "취업정보",
    categoryStyle: "bg-[#EBF5F0] text-[#2B7A50]",
    avatarChar: "박",
    avatarBg: "#EBF5F0",
    avatarColor: "#2B7A50",
    author: "박취업중 · 구직중",
    time: "1일 전",
    title: "한국계 IT 기업 싱가포르 현지 취업 성공기 + 팁",
    preview: "6개월간의 긴 준비 끝에 드디어 오퍼 받았습니다.",
    fullContent: `6개월의 준비 끝에 드디어 싱가포르 IT 기업 오퍼 받았습니다! 과정 공유할게요.

**제 배경**
- 한국 IT 기업 5년 경력 (백엔드 개발)
- 영어 회화 가능 (비즈니스 레벨)
- 싱가포르 어학연수 경험 없음

**취업 준비 타임라인**
- 1-2월: LinkedIn 프로필 정비, 이력서 영문화
- 3-4월: 지원 시작 (50여 곳), 서류 통과율 약 20%
- 5월: 최종 면접 3곳
- 6월: 오퍼 수락 (연봉 SGD 7,500/월)

**핵심 팁**
1. LinkedIn이 전부입니다. 헤드헌터들이 엄청 연락해요.
2. EP 스폰서 여부를 초반에 확인하세요. 안 해주는 곳 많아요.
3. 기술 인터뷰는 LeetCode 위주로 준비하세요.
4. 한국어+영어 가능 포지션이 경쟁이 낮아요.

EP 비자 신청부터 승인까지 약 3주 걸렸어요. 궁금한 거 편하게 물어보세요!`,
    tags: ["취업", "EP비자", "IT", "이직"],
    views: "3,401",
    comments: "87",
    likes: "342",
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
    title: "회사 상사가 너무 힘들어요... 이직해야 할까요",
    preview: "한국 본사에서 파견 나온 상사인데 매일 야근 압박에 주말에도 카톡이 와요.",
    fullContent: `익명으로 올립니다. 많이 지쳐서요.

한국 본사에서 파견 나온 팀장이 있는데 진짜 너무 힘들어요. 현지 법인인데 완전 한국식 문화 그대로거든요.

**상황**
- 매일 밤 10시 이후까지 야근 (계약서에 없는 내용)
- 주말에도 카톡 업무 지시
- "싱가포르 와서 생각이 느슨해졌다" 같은 발언
- HR에 얘기했는데 "참아라"는 답변

EP 스폰서가 이 회사라서 함부로 그만두기도 무서운 상황이에요. 이직하면 EP 처리 기간 동안 공백이 생기는데 그게 너무 걱정되고...

혹시 비슷한 경험 있으신 분들 어떻게 하셨어요?`,
    tags: ["직장고민", "이직", "EP비자", "익명"],
    views: "2,109",
    comments: "63",
    likes: "187",
    isAnon: true,
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
      content: "저도 지난달에 개설했는데 주소 증명 서류 때문에 한 번 더 가야 했어요. 미리 꼼꼼하게 준비하는 게 중요한 것 같아요. 좋은 정보 감사합니다!",
      time: "1시간 전",
      likes: 12,
      replies: [
        {
          id: "c1r1",
          author: "김싱가해",
          avatarChar: "김",
          avatarBg: "#EBF0FB",
          avatarColor: "#2050A0",
          content: "맞아요! 주소 증명이 제일 헷갈리더라고요. 저는 유틸리티 빌로 했는데 통과됐어요.",
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
      content: "혹시 계좌 개설 후 한국으로 송금할 때 수수료가 얼마나 나오나요? OCBC에서 직접 하시나요?",
      time: "30분 전",
      likes: 3,
    },
  ],
  "2": [
    {
      id: "c3",
      author: "한배고파",
      avatarChar: "한",
      avatarBg: "#FBF0EC",
      avatarColor: "#D04020",
      content: "오! 저도 지난 주에 다녀왔는데 진짜 맛있더라고요. 뼈찜도 있던데 그것도 괜찮았어요 ㅎㅎ",
      time: "4시간 전",
      likes: 8,
    },
  ],
  "3": [
    {
      id: "c4",
      author: "개발자최",
      avatarChar: "최",
      avatarBg: "#EBF0FB",
      avatarColor: "#2050A0",
      content: "저도 비슷한 루트로 취업했어요. LinkedIn이 정말 중요하더라고요. 헤드헌터한테 먼저 연락이 오면 훨씬 편해요.",
      time: "20시간 전",
      likes: 34,
    },
    {
      id: "c5",
      author: "싱가포르뉴비",
      avatarChar: "싱",
      avatarBg: "#F5F0FF",
      avatarColor: "#7040C0",
      content: "EP 스폰서 안 해주는 곳이 많다는 게 놀라웠어요. 지원 전에 꼭 확인해야겠네요. 감사합니다!",
      time: "18시간 전",
      likes: 15,
    },
  ],
  "4": [
    {
      id: "c6",
      isAnon: true,
      author: "익명",
      avatarChar: "?",
      avatarBg: "#F0EDE8",
      avatarColor: "#888070",
      content: "저도 비슷한 상황이었어요. EP 문제는 이직 확정 후 새 회사에서 EP 신청하면 기존 EP 유효기간 내에 처리 가능해요. 단, 비자 승인 전엔 새 회사 출근 안 됩니다.",
      time: "2시간 전",
      likes: 45,
    },
  ],
};
