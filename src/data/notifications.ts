export interface NotificationItem {
  id: string;
  type: "comment" | "like" | "job" | "news" | "biz" | "reply";
  icon: string;
  iconBg: string;
  title: string;
  body: string;
  time: string;
  link: string;
}

export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    type: "comment",
    icon: "💬",
    iconBg: "bg-[#EBF0FB]",
    title: "내 게시글에 댓글이 달렸어요",
    body: "이은행맨님: \"저도 지난달에 개설했는데 주소 증명 서류 때문에...\"",
    time: "1시간 전",
    link: "/community/1",
  },
  {
    id: "2",
    type: "like",
    icon: "❤️",
    iconBg: "bg-[#FBF0EC]",
    title: "내 게시글이 인기글이 됐어요",
    body: "\"OCBC 은행 계좌 개설 2026 최신 후기\" 가 156명에게 좋아요를 받았습니다.",
    time: "3시간 전",
    link: "/community/1",
  },
  {
    id: "3",
    type: "job",
    icon: "💼",
    iconBg: "bg-[#EBF5F0]",
    title: "관심 직무 새 공고가 올라왔어요",
    body: "Samsung Electronics SG - Senior Software Engineer (Mobile)",
    time: "5시간 전",
    link: "/jobs/1",
  },
  {
    id: "4",
    type: "news",
    icon: "📰",
    iconBg: "bg-[#EBF0FB]",
    title: "오늘의 Daily SG 뉴스",
    body: "싱가포르 콘도 임대료 3개월 연속 하락 외 3건",
    time: "오늘 오전 8:00",
    link: "/news",
  },
  {
    id: "5",
    type: "biz",
    icon: "🏪",
    iconBg: "bg-[#FBF5E8]",
    title: "즐겨찾는 업소 영업시간 변경",
    body: "강남부식 영업시간이 변경되었습니다: 11:00 - 22:00",
    time: "어제",
    link: "/business/1",
  },
  {
    id: "6",
    type: "reply",
    icon: "💬",
    iconBg: "bg-[#EBF0FB]",
    title: "내 댓글에 답글이 달렸어요",
    body: "김싱가해님: \"맞아요! 주소 증명이 제일 헷갈리더라고요.\"",
    time: "2일 전",
    link: "/community/1",
  },
];
