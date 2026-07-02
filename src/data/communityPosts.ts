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
  createdAt?: string; // ISO 날짜시간. 있으면 화면에서 timeAgo로 자동 계산해 표시(time보다 우선). 자동 생성 글이 사용.
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

const RAW_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: "auto-20260702-1",
    categoryId: "parenting",
    categoryLabel: "육아",
    categoryStyle: "bg-[#FFF0F5] text-[#C04080]",
    avatarChar: "개",
    avatarBg: "#FFF0F5",
    avatarColor: "#C04080",
    author: "개학맘",
    time: "방금",
    createdAt: "2026-07-02T08:20:00",
    title: "6월 방학 끝나고 개학하니 아침마다 다시 전쟁이네요",
    preview: "방학 동안 늦잠 버릇 든 애 깨우는 것부터가 일이에요. 전날 밤 미리 챙겨두니 그나마 낫더라구요.",
    fullContent: `6월 방학 끝나고 이번 주부터 애가 다시 학교 가는데, 아침마다 다시 전쟁이네요ㅎㅎ 방학 동안 늦잠 자던 버릇이 붙어서 깨우는 것부터가 일이에요ㅠㅠ

아침에 밥 먹이고 물통 챙기고 옷 입히다 보면 정작 저는 출근 준비를 못 해서 결국 대충 나가게 되더라구요. 그래서 이번 주부터는 전날 밤에 가방이랑 옷을 미리 다 챙겨두기 시작했는데, 확실히 아침이 조금은 덜 정신없더라구요.

아직 애도 저도 방학 모드가 덜 풀려서 며칠은 더 헤맬 거 같긴 한데, 그래도 조금씩 리듬 찾아가는 중이에요. 이맘때 다들 비슷한 적응기 보내고 계실 것 같네요.`,
    tags: ["육아", "개학", "등원"],
    views: "41",
    comments: "0",
    likes: "7",
  },
  {
    id: "auto-20260702-2",
    categoryId: "finance",
    categoryLabel: "금융/투자",
    categoryStyle: "bg-[#EBF5F0] text-[#2B7A50]",
    avatarChar: "송",
    avatarBg: "#EBF5F0",
    avatarColor: "#2B7A50",
    author: "매달송금러",
    time: "어제",
    createdAt: "2026-07-01T21:10:00",
    title: "한국에 돈 보낼 때, 저는 이번에 Wise 한번 써보려구요",
    preview: "은행 송금 수수료가 아까워서 이번엔 Wise 가입해뒀어요. 다음 달치부터 은행이랑 비교해보려구요.",
    fullContent: `매달 한국에 생활비랑 적금 때문에 돈을 좀 보내는데, 은행에서 보내면 수수료가 은근 나가더라구요ㅠㅠ 금액이 크지도 않은데 보낼 때마다 떼이는 게 좀 아까웠어요.

그래서 이번엔 주변에서 많이들 쓴다는 Wise를 한번 써보려고 가입해뒀어요. 환율이랑 수수료 합치면 은행보다 낫다는 얘기가 많더라구요. 아직 첫 송금은 안 해봤는데, 다음 달치부터 이걸로 보내보고 은행이랑 얼마나 차이 나는지 직접 비교해볼 생각이에요.

돌아보면 처음엔 그냥 은행이 제일 안전한 줄 알고 계속 거기로만 보냈거든요. 이런 건 진작 좀 알아둘 걸 싶네요.`,
    tags: ["송금", "환율", "재테크"],
    views: "28",
    comments: "0",
    likes: "5",
  },
  {
    id: "auto-20260702-3",
    categoryId: "love",
    categoryLabel: "연애",
    categoryStyle: "bg-[#F5F0FF] text-[#7040C0]",
    avatarChar: "모",
    avatarBg: "#F5F0FF",
    avatarColor: "#7040C0",
    author: "일집만반복",
    time: "어제",
    createdAt: "2026-07-01T19:00:00",
    title: "싱가포르에서 일-집만 반복하다, 얼마 전 처음 한인 모임 나가봤어요",
    preview: "새로운 사람 만날 일이 없어서 큰맘 먹고 모임에 나갔는데, 생각보다 편하고 숨통이 트이더라구요.",
    fullContent: `싱가포르 온 지 1년 좀 넘었는데, 일하느라 정신없다 보니 어느새 회사랑 집만 왔다갔다 하고 있더라구요. 문득 정신 차려보니 새로운 사람 만날 일이 거의 없었어요ㅠㅠ

그래서 얼마 전에 큰맘 먹고 한인 모임에 처음 나가봤어요. 나가기 전엔 어색하면 어쩌나 걱정 엄청 했는데, 막상 가보니 다들 비슷한 마음으로 온 분들이라 생각보다 편하더라구요. 대단한 인연을 만난 건 아니지만, 회사 밖에서 사람들이랑 얘기 나누는 것만으로도 숨통이 좀 트이는 느낌이었어요.

돌아보니 그동안 일이랑 집만 오가면서 저를 너무 방치했던 거 같아요. 앞으로는 이렇게 조금씩이라도 밖으로 나와보려구요. 혼자 지내다 보면 자꾸 움츠러들게 되는데, 결국 한 발 내딛는 게 답이더라구요.`,
    tags: ["연애", "만남", "일상"],
    views: "53",
    comments: "0",
    likes: "11",
  },
  {
    id: "auto-20260702-4",
    categoryId: "medical",
    categoryLabel: "의료",
    categoryStyle: "bg-[#EBF0FB] text-[#2050A0]",
    avatarChar: "치",
    avatarBg: "#EBF0FB",
    avatarColor: "#2050A0",
    author: "치과데인사람",
    time: "어제",
    createdAt: "2026-07-01T15:00:00",
    title: "여기 치과 비용 보고 좀 놀랐네요, 다음엔 미리 알아보고 가려구요",
    preview: "스케일링 했다가 금액 보고 띠용... 동네마다 가격 차이가 은근 있더라구요. 다음엔 몇 군데 물어보려구요.",
    fullContent: `얼마 전에 이가 좀 시려서 동네 치과 갔다가 김에 스케일링도 했는데, 계산할 때 금액 보고 좀 놀랐어요ㅠㅠ 한국에서 하던 감각으로 갔다가 살짝 띠용했네요.

로컬분들은 보조 같은 게 있다고 들었는데 저희 같은 외국인은 그냥 다 내는 거라 더 그런 거 같더라구요. 그날 집에 와서 찾아보니 동네마다, 또 큰 체인이냐 작은 치과냐에 따라 가격이 은근 차이가 나더라구요.

저는 이번에 크게 데인 셈 치고, 다음엔 미리 몇 군데 가격 물어보고 가려구요. 어차피 연말에 한국 들어갈 일 있으면 큰 치료는 그때 몰아서 하는 것도 방법인 거 같아요. 비슷하게 고민하셨던 분들 참고되시라고 적어봐요.`,
    tags: ["치과", "의료", "비용"],
    views: "36",
    comments: "0",
    likes: "6",
  },
  {
    id: "auto-20260627-1",
    categoryId: "food",
    categoryLabel: "맛집",
    categoryStyle: "bg-[#FBF0EC] text-[#D04020]",
    avatarChar: "김",
    avatarBg: "#FBF0EC",
    avatarColor: "#D04020",
    author: "김치찌개급땡김",
    time: "방금",
    createdAt: "2026-06-27T19:30:00",
    title: "갑자기 김치찌개 땡기는데 김치 다들 어디서 사세요?",
    preview: "퇴근길에 갑자기 김치찌개가 미친듯이 땡기는데 하필 집에 김치가 똑 떨어졌네요ㅠㅠ 다들 김치 어디서 사시나요?",
    fullContent: `퇴근하고 오는 길에 갑자기 김치찌개가 미친 듯이 땡기는데 하필 집에 김치가 똑 떨어졌네요ㅠㅠ

한인마트 김치는 맛있는데 좀 비싸고, 그렇다고 큰 마트 거는 맛이 어떨지 몰라서요. 다들 김치 보통 어디서 사세요? 아님 그냥 담가 드시나요?ㅎㅎ

아 배고프니까 글이 두서가 없네요ㅋㅋ`,
    tags: ["김치", "장보기", "맛집"],
    views: "9",
    comments: "0",
    likes: "1",
  },
  {
    id: "auto-20260627-2",
    categoryId: "anon",
    categoryLabel: "익명",
    categoryStyle: "bg-[#F0EDE8] text-[#888070]",
    avatarChar: "?",
    avatarBg: "#F0EDE8",
    avatarColor: "#888070",
    author: "익명",
    time: "2시간 전",
    createdAt: "2026-06-27T17:30:00",
    title: "EP 갱신 앞두고 괜히 불안한 거... 저만 그런가요ㅠㅠ",
    preview: "올 하반기에 EP 갱신이 걸려있는데 기준이 좀 바뀐다는 얘기 듣고 괜히 신경쓰이네요. 비슷한 분 계세요?",
    fullContent: `좀 사소한 고민인데 적어봐요ㅠㅠ

올 하반기에 EP 갱신이 걸려있는데, 요즘 7월부터 갱신 심사 기준이 좀 바뀐다는 얘기를 들어서 괜히 신경쓰이더라구요. 제 급여가 기준을 아주 넉넉하게 넘는 편은 아니라서... 혹시 점수 모자라서 갱신 안 되면 어쩌나 싶고ㅠ 막상 회사에 먼저 물어보기도 좀 그렇구요(괜히 불안해 보일까봐).

일단 정확한 건 회사 HR이랑 MOM 통해서 확인하는 게 맞다고 해서, 다음 주에 조심스럽게 한번 여쭤보려구요. 근데 그 전까지 괜히 머릿속이 복잡하네요ㅋㅋ

비슷하게 갱신 앞두고 계신 분들 있으세요? 다들 보통 만료 몇 달 전부터 준비하시는지도 궁금하구요. 같이 화이팅해요ㅠㅠ`,
    tags: ["EP", "비자", "고민", "직장"],
    views: "24",
    comments: "0",
    likes: "4",
    isAnon: true,
    visaBadge: "EP",
  },
  {
    id: "auto-20260625-1",
    categoryId: "life",
    categoryLabel: "생활정보",
    categoryStyle: "bg-[#EBF0FB] text-[#2050A0]",
    avatarChar: "헬",
    avatarBg: "#EBF0FB",
    avatarColor: "#2050A0",
    author: "동네헬스다니는중",
    time: "방금",
    createdAt: "2026-06-25T09:00:00",
    title: "동네 헬스장 등록했는데 한국분들 생각보다 많아서 좀 신기했어요ㅎㅎ",
    preview: "이사온 지 얼마 안 돼서 등록한 헬스장인데 가보니 한국분들이 꽤 계시더라구요. 다들 그러신가요?",
    fullContent: `이사온 지 한 달쯤 됐는데, 슬슬 운동 좀 해야지 싶어서 집 근처 헬스장 등록했어요.

첨엔 로컬분들이나 외국인들만 있을 줄 알았거든요? 근데 가보니까 한국분들이 은근 보이더라구요ㅎㅎ 인사를 튼 건 아닌데 한국어로 통화하시는 분도 있고, 같은 시간대에 자주 마주치는 분도 있고요.

등록할 때 팁이라면 평일/주말 가격이 다르니까 미리 비교해보시구요. 1일 체험 되는지 데스크에 물어보고 정하는 것도 좋아요. 근데 결국 제일 중요한 건 집-회사 동선에 있는지인 거 같아요ㅋㅋ 멀면 결국 안 가게 되더라고요.

암튼 낯선 동네에서 운동하다 같은 한국분들 보니까 괜히 좀 반갑더라구요. 혹시 다니시는 헬스장에서 비슷한 경험 있으신 분 계세요?~`,
    tags: ["헬스장", "운동", "생활정보", "정착"],
    views: "18",
    comments: "1",
    likes: "3",
  },
  {
    id: "auto-20260625-2",
    categoryId: "love",
    categoryLabel: "연애",
    categoryStyle: "bg-[#F5F0FF] text-[#7040C0]",
    avatarChar: "장",
    avatarBg: "#F5F0FF",
    avatarColor: "#7040C0",
    author: "장거리연애중",
    time: "1시간 전",
    createdAt: "2026-06-25T08:00:00",
    title: "한국-싱가포르 장거리 연애... 시차 때문에 힘드신 분 계신가요?ㅠㅠ",
    preview: "남친은 한국에 있고 저는 싱가포르인데, 시차 1시간이 생각보다 연락 타이밍 맞추기 빡세네요ㅠ",
    fullContent: `싱가포르 온 지 반년쯤 됐는데, 남친은 한국에 그대로 있어서 계속 장거리 연애 중이에요.

시차 1시간이라 별거 아닐 줄 알았거든요? 근데 막상 지내보니까 퇴근 시간이랑 자는 시간이 자꾸 어긋나서 연락 타이밍 맞추는 게 은근 피곤하더라구요ㅠㅠ 저는 야근하고 와서 지쳐있는데 남친은 한창 일하고 있고, 제가 막 자려는데 남친은 그제서야 퇴근해서 연락하고 싶어하고... 그런 식이에요.

그래서 저희는 매일 정해진 시간에 하기보다 그날그날 되는 시간에 짧게라도 연락하기로 룰을 좀 느슨하게 바꿨어요. 대신 한 달에 한 번은 화상으로 길게 얘기하는 시간 따로 잡구요. 서로 바쁜 날엔 '오늘 바빠서 짧게만!' 미리 말해주기로 했어요.

그래도 가끔은 그냥 옆에 있었으면 좋겠다 싶을 때가 있네요ㅠ 비슷하게 장거리 하시는 분들은 어떻게 버티세요?`,
    tags: ["연애", "장거리연애", "고민", "일상"],
    views: "31",
    comments: "3",
    likes: "7",
  },
  {
    id: "auto-20260624-1",
    categoryId: "parenting",
    categoryLabel: "육아",
    categoryStyle: "bg-[#FFF0F5] text-[#C04080]",
    avatarChar: "둘",
    avatarBg: "#FFF0F5",
    avatarColor: "#C04080",
    author: "둘째맘싱가",
    time: "방금",
    createdAt: "2026-06-24T09:00:00",
    title: "콘도 놀이터에서 우리 애만 혼자 노는 거 같아서 속상했는데ㅠㅠ (+해결한 썰)",
    preview: "이사 온 지 얼마 안 됐을 때 큰애가 놀이터에서 맨날 혼자라 진짜 속상했거든요. 근데 몇 가지 해보니까 좀 나아져서 끄적여봐요.",
    fullContent: `안녕하세요~~ 저희 여기 이사온 지 이제 두 달 좀 넘었는데요ㅎㅎ 큰애가 놀이터만 가면 맨날 혼자 겉돌아서 한동안 진짜진짜 속상했거든요ㅠㅠ 저녁에 애 데리고 들어오면서 괜히 저까지 시무룩해지고... 저만 이런가요?ㅋㅋ

근데 요즘은 좀 나아져서 혹시 비슷한 분들 있을까봐 끄적여봐요!

일단 나가는 시간대를 바꿨어요. 첨엔 등하원 끝나고 나갔는데 애들이 진짜 없더라구요? 근데 한 5시 6시쯤 되니까 우르르 나오던데ㅋㅋ 그때 맞춰 나가니까 확실히 달랐어요.

그리고 이거 좀 오글거리는데ㅋㅋㅋ 비눗방울이나 간식 같은거 챙겨가서 슬쩍 나눠주면 애들 금방 모여요 진짜. 부모님들한테도 그냥 영어 짧아도 웃으면서 하이~ 했더니 다들 엄청 친절하시더라구요. 두세번 마주치니까 애들끼리도 알아서 놀고ㅎㅎ

아 그리고!! 콘도 단톡방이나 페북 그룹 있으면 무조건 들어가세요. 거기 플레이데이트 정보 종종 떠요. 도서관 스토리타임 같은 무료 프로그램도 또래 만나기 좋았구요.

암튼 저도 첨엔 낯가려서 쭈뼛댔는데 그냥 먼저 들이대는 게 답이더라구요ㅋㅋ 다들 힘내시고~~ 다른 분들은 또 어떻게 하시는지 궁금하네용!`,
    tags: ["육아", "콘도생활", "아이친구", "정착팁"],
    views: "23",
    comments: "1",
    likes: "4",
    visaBadge: "DP",
  },
  {
    id: "auto-20260624-2",
    categoryId: "medical",
    categoryLabel: "의료",
    categoryStyle: "bg-[#EBF0FB] text-[#2050A0]",
    avatarChar: "감",
    avatarBg: "#EBF0FB",
    avatarColor: "#2050A0",
    author: "동네병원초보",
    time: "30분 전",
    createdAt: "2026-06-24T08:30:00",
    title: "동네 GP 처음 가봤다가 수납할 때 살짝 띠용했던 썰ㅋㅋ (외국인 비용)",
    preview: "감기 기운 있어서 집 앞 GP 처음 갔는데 계산할 때 어? 했어요. 미리 알면 좋을 거 같아서 적어봐요.",
    fullContent: `며칠 전에 감기 기운 좀 있어서 그냥 집 근처 GP 클리닉 처음 가봤거든요. 별생각 없이 갔다가 수납할 때 어?? 하고 살짝 당황했어요ㅋㅋ

진료 자체는 빠르고 의사쌤도 친절했어요. 근데 계산할 때 보니까 클리닉마다 비용 차이가 은근 크고, 외국인은 로컬분들 받는 보조금이 적용 안 되는 경우가 많더라구요? 정확한 금액은 클리닉이랑 보험 따라 다 다르니까 여기서 얼마다 딱 말하긴 좀 그렇고... 그냥 생각보다 좀 더 나왔다 정도로만 말씀드릴게요ㅎㅎ

그래서 저는 다음부턴 이렇게 하려구요. 가기 전에 리셉션에 비용 대충 한번 물어보고, 회사 보험이든 개인 보험이든 카드 꼭 챙겨가서 적용되는지 바로 확인하고, 영수증 보험사 청구 되는지도 체크하려구요.

암튼 정확한 보조금이나 비용은 클리닉이나 보험사에 직접 물어보는 게 젤 확실할 거 같아요! 저처럼 첨 가시는 분들은 미리 전화 한번 해보고 가시는 거 추천드려요~ 안 그럼 저처럼 수납할 때 살짝 띠용 합니다ㅋㅋ`,
    tags: ["GP클리닉", "병원", "의료", "외국인생활"],
    views: "41",
    comments: "2",
    likes: "6",
    visaBadge: "EP",
  },
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
    createdAt: "2026-06-22T07:00:00",
    title: "드디어 OCBC 계좌 텄어요!! 서류 때문에 한번 빠꾸당하고 재도전한 썰ㅎㅎ",
    preview: "몇 달 전에 서류 부족으로 실패했다가 이번엔 제대로 준비해서 성공했어요. 달라진 점도 있어서 적어봐요~",
    fullContent: `드디어 OCBC 계좌 텄어요ㅠㅠ 사실 몇 달 전에 한번 갔다가 서류 부족으로 빠꾸당했었거든요... 이번엔 단단히 준비해서 갔더니 한방에 됐어요ㅎㅎ 혹시 저처럼 헤매는 분들 있을까봐 적어봐요!

일단 서류는 이거 챙기세요 (2026년 기준이에요). 여권이랑 EP 카드 원본은 당연하고, 재직증명서 영문본 꼭이요!! 이거 회사 레터헤드에 서명 있어야 하고 3개월 이내 발급분이어야 하더라구요. 그리고 최근 3개월 급여명세서나 고용계약서, 주소증명(유틸리티 빌이나 텔레콤 빌 같은거 3개월 이내)도 챙겨가시구요.

아 그리고 요즘 워크인 거의 안 받아요!! 앱에서 예약 꼭 하고 가세요. 저는 Tanjong Pagar 지점 갔는데 예약하니까 대기 없이 바로 되던데요?

계좌는 360 Account 추천이요. 월급 이체에 카드 쓰고 보험이나 투자 조건 맞추면 이자율 연 3~4%대까지 나온대요. 싱가포르는 이자 수익 비과세라 안 쓰면 좀 손해인 느낌ㅋㅋ 처리는 한 25~30분 걸렸고 데빗카드는 며칠 뒤에 우편으로 오더라구요.

아 한국 송금은 OCBC에서 Wise 연동하는 거 추천이요~ 수수료 SGD 3~5 정도라 쌉니다. 암튼 궁금한 거 있으면 댓글 주세요!`,
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
    createdAt: "2026-06-22T04:00:00",
    title: "Tanjong Pagar에 감자탕집 새로 생겼는데 여기 진짜 물건이에요ㅠㅠ (웨이팅 주의)",
    preview: "지난주 오픈한 곳 다녀왔는데 국물 진하고 양도 많고... 사장님도 한국분이세요. 강추ㅎㅎ",
    fullContent: `Tanjong Pagar Plaza 2층에 감자탕집 새로 생겨서 다녀왔는데요, 와 여기 진짜 물건이에요ㅠㅠ

위치는 Tanjong Pagar Plaza #02-15이고 MRT에서 한 5분? 영업은 11시반부터 밤 10시까지인데 월요일은 쉬어요. 주차는 맞은편 공영주차장 쓰면 되구요(30분에 $1.20).

메뉴는 감자탕 小가 $28(1~2인), 大가 $48(3~4인)인데 뼈가 두툼하고 국물이 진짜 진해요. 순대볶음($22)도 딱 분식집 그 맛이고, 도가니탕($35)은 사장님이 직접 추천해주신 거예요. 막걸리 $12, 소주 $10이구요.

솔직히 싱가포르에서 이 정도면 최상급이에요 진짜ㅋㅋ 사장님이 직접 요리하시는데 고수 빼달라니까 흔쾌히 빼주시고 국물 리필도 돼요! 근데 단점은 주말에 웨이팅 좀 있어요ㅠ 인스타 뜨고 나서 로컬분들도 많이 오시더라구요. 평일 점심이 그나마 한가해요.

아 그리고 양 진짜 많아요. 小도 둘이 먹으면 배 터져요ㅋㅋ`,
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
    createdAt: "2026-06-21T15:00:00",
    title: "한국계 IT 회사 싱가포르 취업 성공했어요!! 6개월 삽질기 + EP까지 후기ㅎㅎ",
    preview: "6개월 준비해서 SGD 7,500 오퍼 받았어요. 링크드인이 진짜 답이더라구요. EP 신청까지 쭉 풀어봐요~",
    fullContent: `6개월 빡세게 준비한 끝에 드디어 싱가포르 IT 회사 오퍼 받았어요ㅠㅠ 너무 기뻐서 후기 풀어요!

저는 한국에서 백엔드 개발 5년 했고 영어는 비즈니스 회화 정도(OPIc AL)였어요. 싱가포르 연고는 1도 없었구요ㅋㅋ

타임라인 대충 보면, 1~2월에 링크드인 프로필 갈아엎고 영문 이력서 다시 쓰고, 3~4월에 한 50군데 넣었는데 서류는 20%쯤 붙었어요. 5월에 최종면접 3곳 보고(줌+현장), 6월에 오퍼 수락했어요. SGD 7,500에 EP 스폰서까지요.

팁 좀 드리자면... 일단 진짜 링크드인이 답이에요. 헤드헌터한테 먼저 연락 오거든요. 그리고 지원 전에 EP 스폰서 해주는 회사인지 꼭 확인하세요(안 해주는 데 은근 많아요ㅠ). 기술면접은 리트코드 미디엄 위주로 풀었고, 한국어+영어 둘 다 되는 포지션이 경쟁률 낮더라구요. 연봉은 글래스도어에서 밴드 미리 보고 협상했어요.

EP는 오퍼 수락하면 회사 HR이 MOM MyPass로 신청하고 한 3주쯤 걸려요. 승인되면 IPA 레터 받고 입국해서 카드 발급받는 식이요. 아 그리고 2026년부터 EP 최저급여가 $6,000으로 올랐으니까 협상 전에 꼭 체크하세요! 궁금한 거 있으면 댓글 주세요~`,
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
    createdAt: "2026-06-22T06:00:00",
    title: "한국인 상사 때문에 진짜 너무 힘들어요... EP라 이직도 무섭고ㅠㅠ",
    preview: "한국 본사 파견 팀장인데 매일 야근에 주말 새벽까지 카톡이요... EP 스폰서 때문에 못 나가는 분 계신가요?",
    fullContent: `익명으로 올려요. 진짜 너무 지쳐서요ㅠㅠ

한국 본사에서 파견 온 팀장이 있는데 정말 힘들어요. 분명 현지 법인인데 한국 문화 그대로라 미치겠어요.

계약서엔 없는데 매일 밤 10시 넘게 야근시키고, 주말에도 카톡으로 일 시켜요. 새벽 2시에 온 적도 있어요 진짜... '싱가포르 와서 생각이 느슨해졌다'는 말까지 하고요. HR한테 얘기했더니 '팀장님이랑 잘 풀어봐라'래요. 하...

근데 EP 스폰서가 이 회사라 함부로 그만두기도 무서워요. 이직하면 EP 처리 기간에 공백 생기는 것도 걱정되고요. 이거 싱가포르 노동법 위반 아닌가요? MOM에 신고하면 어떻게 되는지... 혹시 비슷한 경험 있으신 분들은 어떻게 하셨어요? 조언 좀 부탁드려요ㅠㅠ`,
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
    createdAt: "2026-06-20T15:00:00",
    title: "싱가포르 재테크 이건 알아야 안 손해예요~ SRS·CPF·ETF·보험 정리해봄ㅎㅎ",
    preview: "여기서 세금 줄이고 돈 굴리는 법 정리해봤어요. SRS로 세금 환급받고, ETF 투자까지. 2026년 기준이요!",
    fullContent: `싱가포르에서 직장 다니면 이건 좀 알아두면 좋을 거 같아서 재테크 정리해봤어요. 2026년 기준이에요~

일단 SRS(Supplementary Retirement Scheme)는 진짜 필수예요. 외국인은 연 SGD 35,700까지 넣을 수 있는데, 넣은 만큼 소득공제 돼서 세금 환급받아요. 연소득 8만 정도면 한 3,000~5,000불 정도 돌려받는다고 하더라구요. 게다가 그 계좌 안에서 주식이나 ETF도 굴릴 수 있어요.

CPF는 PR 되면 자동 가입인데 OA가 이자 2.5~3.5%, SA는 4%나 줘요. 집 살 때 OA 잔액도 쓸 수 있구요. 근데 EP일 땐 의무는 아니에요.

ETF 투자는 IBKR(인터랙티브 브로커스) 많이들 써요. S&P500이나 싱가포르 리츠 ETF 같은 거요. 싱가포르 거주자는 주식 배당·양도차익 세금이 없어서 이게 진짜 꿀이에요ㅋㅋ

보험은 Term Life 먼저 들고, 병원비 커버되는 Integrated Shield Plan은 꼭 챙기세요. EP여도 MediShield Life는 의무구요.

암튼 한국 소득세 최고가 49.5%인데 싱가포르는 22%라(연 32만불 이상 기준), 여기 있는 동안 절세 잘 챙기면 차이 진짜 커요! 다들 화이팅~`,
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
    createdAt: "2026-06-19T15:00:00",
    title: "콘도 렌트 $500 깎은 후기ㅎㅎ 요즘 시장 약세라 협상 잘 먹혀요 (이메일 문구 포함)",
    preview: "요즘 임차인한테 유리하게 바뀌어서 집주인이랑 협상해서 $500 깎고 2년 계약했어요. 실제 보낸 이메일도 공유해요~",
    fullContent: `요즘 싱가포르 콘도 렌트 시장이 세입자한테 유리하게 바뀌었더라구요. 이거 활용해서 협상 성공한 썰 풀어요ㅎㅎ

저는 Tanjong Pagar 근처 2BR 콘도였는데, 집주인이 처음에 월 SGD 5,200 불렀어요. 근데 최종적으로 SGD 4,700에 2년 계약으로 깎았어요! $500 절약ㅋㅋ

협상 전에 준비가 진짜 중요해요. PropertyGuru에서 같은 단지 비슷한 유닛 10개쯤 시세 조사하고, 요즘 공실률 7%에 임대료 상승도 둔화됐다는 정보 챙겼어요. 그리고 같은 단지 다른 유닛도 동시에 보러 다니면서 은근히 경쟁 붙였구요.

실제로 집주인한테 보낸 이메일 핵심 문구는 이거였어요:
"Based on current market data, similar units in this development are listed at SGD 4,600–4,900. Given the current vacancy rate and market conditions, I'd like to propose SGD 4,700 with a 2-year lease. I'm a stable tenant with a confirmed EP and can sign promptly."

이렇게 보냈더니 먹히더라구요! 추가로 에어컨 필터 교체 연 1회 집주인 부담, Diplomatic Clause(12개월 후 1개월 전 통보로 중도해지 가능), 첫 달 렌트 반값까지 받아냈어요.

팁이라면 절대 급한 티 내지 말기! 다른 집도 보고 있다고 자연스럽게 흘리구요. 아 Stamp Duty는 세입자가 내는데 이것도 협상 가능하더라구요~`,
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
    createdAt: "2026-06-18T15:00:00",
    title: "2026년 EP 최저급여 $6,000 됐는데 나 갱신 통과될까요?ㅠㅠ COMPASS 자가진단 해봄",
    preview: "올해부터 EP 최저급여 올라서 갱신 걱정되는 분들 많죠. COMPASS 점수 보는 법이랑 자가진단 방법 적어봐요~",
    fullContent: `2026년 1월부터 EP 최저급여가 SGD 5,600에서 6,000으로 올랐어요. 갱신 예정이거나 신규 신청하는 분들 꼭 확인하세요!

일반 업종은 월 6,000, 금융 서비스업은 6,600이 기준이에요. 그리고 나이 많을수록 기준 급여가 올라가는데 40대 중반이면 만불 넘게 보더라구요ㄷㄷ

근데 급여만 통과한다고 끝이 아니에요. COMPASS라는 점수제가 있는데 40점 이상 돼야 해요. 항목이 급여(C1, 동종업계 중위 대비), 학위(C2), 회사 내 국적 다양성(C3), 싱가포르인 채용 비율(C4), 그리고 전략분야 보너스(C5) 이렇게 있어요. C1이랑 C2가 각각 20점씩이라 크구요.

자가진단은 MOM 사이트에서 COMPASS Self-Assessment Tool 들어가서 연봉·학력·업종·회사 규모 넣으면 바로 나와요. 약한 항목 보고 HR이랑 상의하면 되구요.

팁이라면, 급여가 딱 기준선이면 좀 위험해요ㅠ 회사에 인상 요청하거나 이직 고려해보세요. 그리고 우리 회사가 금융업($6,600) 기준인지 MOM 분류 코드로 확인하구요. EP 만료 6개월 전부터 갱신 준비 시작하는 거 추천해요!`,
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
    createdAt: "2026-06-17T15:00:00",
    title: "Tanjong Pagar 리틀코리아 한식 맛집 정리해봤어요ㅎㅎ 한인 추천 모음~",
    preview: "Tanjong Pagar에 한식당 계속 생기더라구요. 최근 다녀온 곳들 기준으로 추천 정리해봤어요~ 신상도 포함!",
    fullContent: `Tanjong Pagar '리틀 코리아' 쪽 한식 맛집 최신으로 정리해봤어요. 오래된 정보는 빼고 최근 가본 곳들 위주로요ㅎㅎ

일단 강남부식(Tanjong Pagar Plaza)은 한국식 정식이랑 찌개류 잘해요. 점심 런치박스 $12인데 가성비 최고예요. 11시~22시 영업이구요.

올해 2월에 새로 생긴 뼈해장국 전문점(Tanjong Pagar Rd)도 좋아요. 뼈해장국 $22, 내장탕 $20인데 해장에 딱이에요. 주말 아침부터 열어요.

한가위 치킨(Amoy St)은 한국식 치킨인데 후라이드+양념 반반 $28이고 그랩푸드 배달도 돼요. 서울김밥(Tg Pagar Plaza)은 참치마요·불고기 김밥 $6~8인데 혼밥하기 딱이에요(근데 포장 전문이라 자리는 없어요ㅠ). 홍콩반점(Keong Saik Rd)은 짜장·짬뽕·탕수육 파는데 딱 한국 분식 느낌이에요. 짬뽕 $14, 탕수육 $28이요.

위치는 Tanjong Pagar MRT에서 Plaza나 Tras St 방향으로 걸으면 한식당 쫙 몰려있어요. 아 그리고 Maxwell 같은 호커센터 한식 코너도 $6~10에 한 끼 되니까 가성비로 괜찮아요! 다들 맛있게 드세요~`,
    tags: ["맛집", "Tanjong-Pagar", "한식", "리틀코리아", "맛집지도"],
    views: "3,218",
    comments: "72",
    likes: "445",
    visaBadge: "PR",
    relatedIds: ["2"],
  },
];

// createdAt(실제 날짜) 기준 최신순 정렬. createdAt 없는 글은 맨 뒤로.
// 자동 생성 글은 createdAt을 채워 RAW 배열 어디에 넣어도 항상 최신순으로 표시된다.
export const COMMUNITY_POSTS: CommunityPost[] = [...RAW_COMMUNITY_POSTS].sort((a, b) => {
  const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
  const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
  return tb - ta;
});

export const SAMPLE_COMMENTS: Record<string, Comment[]> = {
  "auto-20260625-1": [
    {
      id: "c22",
      author: "싱가초보22",
      avatarChar: "싱",
      avatarBg: "#EBF0FB",
      avatarColor: "#2050A0",
      content: "저도 헬스장 가면 한국분들 자주 보여서 신기했어요ㅋㅋ 괜히 더 열심히 하게 되더라구요!",
      time: "5분 전",
      likes: 1,
    },
  ],
  "auto-20260625-2": [
    {
      id: "c23",
      author: "이제정착중",
      avatarChar: "이",
      avatarBg: "#EBF5F0",
      avatarColor: "#2B7A50",
      content: "1시간 차이도 생각보다 크죠ㅠㅠ 저도 화상통화 시간 정해놓는 게 젤 효과 있었어요.",
      time: "30분 전",
      likes: 2,
    },
    {
      id: "c24",
      author: "박뉴비",
      avatarChar: "박",
      avatarBg: "#FBF5E8",
      avatarColor: "#B07010",
      content: "완전 공감... 저흰 바쁜 날 미리 말해주는 룰 정하고 훨씬 편해졌어요. 잘 버티고 계신 거예요!",
      time: "15분 전",
      likes: 1,
    },
  ],
  "auto-20260624-1": [
    {
      id: "c19",
      author: "이제정착중",
      avatarChar: "이",
      avatarBg: "#EBF5F0",
      avatarColor: "#2B7A50",
      content: "도서관 스토리타임 진짜 좋아요! 저희도 그걸로 또래 친구 사귀었어요. 혹시 보통 오후 몇 시쯴 나가셨어요?",
      time: "10분 전",
      likes: 2,
    },
  ],
  "auto-20260624-2": [
    {
      id: "c20",
      author: "보험가입필수",
      avatarChar: "보",
      avatarBg: "#FBF5E8",
      avatarColor: "#B07010",
      content: "맞아요, 저도 처음에 모르고 갔다가 놀랐어요. 회사 보험 카드 챙겨가면 그 자리에서 적용 여부 바로 알려주더라고요.",
      time: "20분 전",
      likes: 3,
    },
    {
      id: "c21",
      author: "싱가초보22",
      avatarChar: "싱",
      avatarBg: "#EBF0FB",
      avatarColor: "#2050A0",
      content: "외국인 보조금 관련해서 정확한 기준이 따로 있나요? 클리닉마다 다르다고 하셔서 헷갈리네요.",
      time: "12분 전",
      likes: 1,
      replies: [
        {
          id: "c21r1",
          author: "동네병원초보",
          avatarChar: "감",
          avatarBg: "#EBF0FB",
          avatarColor: "#2050A0",
          content: "저도 정확히는 몰라서 보험사랑 클리닉에 직접 물어봤어요. 케이스마다 달라서 일반화하기는 어려운 것 같아요!",
          time: "5분 전",
          likes: 2,
        },
      ],
    },
  ],
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
