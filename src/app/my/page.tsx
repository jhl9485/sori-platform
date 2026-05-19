"use client";

import { useState } from "react";

const MY_MENU = [
  { icon: "📝", label: "내가 쓴 글", count: 12 },
  { icon: "💬", label: "내 댓글", count: 34 },
  { icon: "❤️", label: "저장한 글", count: 28 },
  { icon: "🏪", label: "즐겨찾는 업소", count: 5 },
  { icon: "💼", label: "지원한 공고", count: 3 },
  { icon: "🛍️", label: "내 판매 상품", count: 2 },
];

const SETTINGS_MENU = [
  { icon: "🔔", label: "알림 설정" },
  { icon: "🔒", label: "개인정보 보호" },
  { icon: "🌐", label: "언어 설정" },
  { icon: "📱", label: "앱 정보" },
  { icon: "🆘", label: "고객센터" },
];

const RECENT_ACTIVITY = [
  { icon: "📝", text: "OCBC 계좌 개설 후기 등록", time: "방금 전" },
  { icon: "❤️", text: "취업 성공기 글 좋아요", time: "1시간 전" },
  { icon: "💬", text: "감자탕 맛집 후기에 댓글", time: "3시간 전" },
  { icon: "🔖", text: "한국어 강사 공고 저장", time: "어제" },
];

export default function MyPage() {
  const [activeTab, setActiveTab] = useState<"activity" | "settings">("activity");

  return (
    <div className="max-w-[680px] mx-auto">
      {/* 프로필 헤더 */}
      <div className="bg-[#131211] pt-8 md:pt-10 pb-6 px-4 md:px-6 md:rounded-b-[20px]">
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#EBF0FB] flex items-center justify-center text-3xl border-2 border-white/20">👤</div>
            <div>
              <div className="text-white font-bold text-[1.05rem]">김싱가해</div>
              <div className="text-white/50 text-[0.75rem] mt-[2px]">EP 3년차 · Tanjong Pagar</div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[0.65rem] bg-[#EBF0FB] text-[#2050A0] px-2 py-[2px] rounded-full font-medium">EP 비자</span>
                <span className="text-[0.65rem] bg-[#EBF5F0] text-[#2B7A50] px-2 py-[2px] rounded-full font-medium">인증회원 ✓</span>
              </div>
            </div>
          </div>
          <button className="text-white/50 border border-white/20 px-3 py-1 rounded-full text-[0.75rem] hover:border-white/40 transition-colors">편집</button>
        </div>
        <div className="grid grid-cols-4 gap-2 mt-5 bg-white/[0.07] rounded-[12px] p-3">
          {[{ label: "게시글", value: "12" }, { label: "댓글", value: "34" }, { label: "도움됨", value: "89" }, { label: "팔로워", value: "23" }].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-white font-bold text-[1rem]">{stat.value}</div>
              <div className="text-white/40 text-[0.68rem] mt-[2px]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 탭 */}
      <div className="flex border-b border-black/[0.08] bg-white sticky top-[60px] md:top-0 z-10">
        {(["activity", "settings"] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`flex-1 py-[14px] text-[0.85rem] font-medium transition-colors ${activeTab === tab ? "text-[#D04020] border-b-2 border-[#D04020]" : "text-[#888070] hover:text-[#181614]"}`}>
            {tab === "activity" ? "내 활동" : "설정"}
          </button>
        ))}
      </div>

      {activeTab === "activity" ? (
        <div className="px-4 md:px-6 py-5 pb-8">
          <div className="grid grid-cols-3 gap-2 mb-5">
            {MY_MENU.map((item) => (
              <button key={item.label} className="bg-white rounded-[12px] border border-black/[0.08] p-3 flex flex-col items-center gap-1 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:-translate-y-[1px] transition-all">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-[0.72rem] font-medium text-[#181614]">{item.label}</span>
                <span className="text-[0.72rem] font-bold text-[#D04020]">{item.count}</span>
              </button>
            ))}
          </div>
          <div className="bg-white rounded-[14px] border border-black/[0.08] overflow-hidden">
            <div className="px-4 py-3 border-b border-black/[0.06]">
              <span className="text-[0.85rem] font-bold">최근 활동</span>
            </div>
            {RECENT_ACTIVITY.map((act, i) => (
              <div key={i} className={`px-4 py-3 flex items-center gap-3 ${i < RECENT_ACTIVITY.length - 1 ? "border-b border-black/[0.04]" : ""}`}>
                <span className="text-lg flex-shrink-0">{act.icon}</span>
                <div className="flex-1 min-w-0 text-[0.8rem] truncate">{act.text}</div>
                <span className="text-[0.7rem] text-[#888070] flex-shrink-0">{act.time}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="px-4 md:px-6 py-5 pb-8">
          <div className="bg-white rounded-[14px] border border-black/[0.08] overflow-hidden">
            {SETTINGS_MENU.map((item, i) => (
              <button key={item.label} className={`w-full px-4 py-4 flex items-center gap-3 hover:bg-[#F5F3EE] transition-colors text-left ${i < SETTINGS_MENU.length - 1 ? "border-b border-black/[0.06]" : ""}`}>
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                <span className="flex-1 text-[0.85rem]">{item.label}</span>
                <span className="text-[#C0BBB0] text-sm">›</span>
              </button>
            ))}
          </div>
          <button className="w-full mt-3 py-3 text-[0.82rem] text-[#D04020] font-medium bg-white rounded-[14px] border border-black/[0.08] hover:bg-[#FBF0EC] transition-colors">로그아웃</button>
          <div className="text-center mt-4 text-[0.65rem] text-[#C0BBB0]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>SORI v1.0.0 · 싱가포르 한인 플랫폼</div>
        </div>
      )}
    </div>
  );
}
