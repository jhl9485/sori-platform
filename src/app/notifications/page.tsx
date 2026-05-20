"use client";

import { useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";

const NOTIFICATIONS = [
  {
    id: "1",
    type: "comment",
    icon: "💬",
    iconBg: "bg-[#EBF0FB]",
    title: "내 게시글에 댓글이 달렸어요",
    body: "이은행맨님: \"저도 지난달에 개설했는데 주소 증명 서류 때문에...\"",
    time: "1시간 전",
    isRead: false,
    link: "/community/1",
  },
  {
    id: "2",
    type: "like",
    icon: "❤️",
    iconBg: "bg-[#FBF0EC]",
    title: "내 게시글이 인기글이 됐어요",
    body: "\"OCBC 은행 계좌 개설 2025 최신 후기\" 가 156명에게 좋아요를 받았습니다.",
    time: "3시간 전",
    isRead: false,
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
    isRead: true,
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
    isRead: true,
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
    isRead: true,
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
    isRead: true,
    link: "/community/1",
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, isRead: true } : n));
  };

  return (
    <div className="max-w-[680px] mx-auto">
      <PageHeader
        title={`알림 ${unreadCount > 0 ? `(${unreadCount})` : ""}`}
        right={
          unreadCount > 0 ? (
            <button onClick={markAllRead} className="text-[0.75rem] text-[#888070] hover:text-[#181614]">
              모두 읽음
            </button>
          ) : undefined
        }
      />

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-[#888070]">
          <div className="text-5xl mb-4">🔔</div>
          <div className="text-[0.9rem] font-medium">알림이 없습니다</div>
        </div>
      ) : (
        <div className="divide-y divide-black/[0.05]">
          {notifications.map((notif) => (
            <Link
              key={notif.id}
              href={notif.link}
              onClick={() => markRead(notif.id)}
              className={`flex items-start gap-3 px-4 md:px-6 py-4 hover:bg-[#F5F3EE] transition-colors ${
                !notif.isRead ? "bg-[#FBF0EC]" : "bg-white"
              }`}
            >
              {/* 아이콘 */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 ${notif.iconBg}`}>
                {notif.icon}
              </div>

              {/* 내용 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className={`text-[0.82rem] font-medium ${!notif.isRead ? "text-[#181614]" : "text-[#444]"}`}>
                    {notif.title}
                  </div>
                  <span className="text-[0.68rem] text-[#888070] flex-shrink-0">{notif.time}</span>
                </div>
                <p className="text-[0.75rem] text-[#888070] mt-[2px] line-clamp-2">{notif.body}</p>
              </div>

              {/* 읽지 않음 표시 */}
              {!notif.isRead && (
                <div className="w-2 h-2 rounded-full bg-[#D04020] flex-shrink-0 mt-1" />
              )}
            </Link>
          ))}
        </div>
      )}

      {/* 알림 설정 링크 */}
      <div className="px-4 md:px-6 py-4 mt-2 bg-white border-t border-black/[0.06]">
        <Link href="/my" className="flex items-center justify-between text-[0.82rem] text-[#888070] hover:text-[#181614] transition-colors">
          <span>🔔 알림 설정 변경</span>
          <span>›</span>
        </Link>
      </div>
    </div>
  );
}
