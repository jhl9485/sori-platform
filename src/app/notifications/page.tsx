"use client";

import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import { NOTIFICATIONS } from "@/data/notifications";
import { useReadNotifications } from "@/lib/notifications";

export default function NotificationsPage() {
  const { read, markRead, markAllRead } = useReadNotifications();
  const unread = NOTIFICATIONS.filter((n) => !read.has(n.id));
  const unreadCount = unread.length;

  return (
    <div className="max-w-[680px] mx-auto">
      <PageHeader
        title={`알림 ${unreadCount > 0 ? `(${unreadCount})` : ""}`}
        right={
          unreadCount > 0 ? (
            <button
              onClick={() => markAllRead(NOTIFICATIONS.map((n) => n.id))}
              className="text-[0.75rem] text-[#888070] hover:text-[#181614]"
            >
              모두 읽음
            </button>
          ) : undefined
        }
      />

      {NOTIFICATIONS.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-[#888070]">
          <div className="text-5xl mb-4">🔔</div>
          <div className="text-[0.9rem] font-medium">알림이 없습니다</div>
        </div>
      ) : (
        <div className="divide-y divide-black/[0.05]">
          {NOTIFICATIONS.map((notif) => {
            const isRead = read.has(notif.id);
            return (
              <Link
                key={notif.id}
                href={notif.link}
                onClick={() => markRead(notif.id)}
                className={`flex items-start gap-3 px-4 md:px-6 py-4 hover:bg-[#F5F3EE] transition-colors ${
                  !isRead ? "bg-[#FBF0EC]" : "bg-white"
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 ${notif.iconBg}`}>
                  {notif.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className={`text-[0.82rem] font-medium ${!isRead ? "text-[#181614]" : "text-[#444]"}`}>
                      {notif.title}
                    </div>
                    <span className="text-[0.68rem] text-[#888070] flex-shrink-0">{notif.time}</span>
                  </div>
                  <p className="text-[0.75rem] text-[#888070] mt-[2px] line-clamp-2">{notif.body}</p>
                </div>

                {!isRead && <div className="w-2 h-2 rounded-full bg-[#D04020] flex-shrink-0 mt-1" />}
              </Link>
            );
          })}
        </div>
      )}

      <div className="px-4 md:px-6 py-4 mt-2 bg-white border-t border-black/[0.06]">
        <Link href="/my?tab=settings" className="flex items-center justify-between text-[0.82rem] text-[#888070] hover:text-[#181614] transition-colors">
          <span>🔔 알림 설정 변경</span>
          <span>›</span>
        </Link>
      </div>
    </div>
  );
}
