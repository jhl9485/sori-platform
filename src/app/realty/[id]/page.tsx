"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import PhotoCarousel from "@/components/shared/PhotoCarousel";
import OwnerActions from "@/components/shared/OwnerActions";
import DetailSkeleton from "@/components/shared/DetailSkeleton";
import { REALTY_ITEMS, type RealtyStatus } from "@/data/realtyItems";
import { toast, confirmDialog } from "@/components/shared/Feedback";
import { useUserRealty, updateUserItem } from "@/lib/userContent";
import { useHydrated } from "@/lib/hooks";
import DetailActions from "@/components/shared/DetailActions";
import { LIKE_KEY, VIEW_KEY, SAVE_KEY, useMarkViewed } from "@/lib/metrics";
import { exactTime, resolveISO } from "@/lib/format";

const REALTY_STATUSES: { id: RealtyStatus; label: string; color: string }[] = [
  { id: "가능",   label: "가능",   color: "border-[#2B7A50] bg-[#EBF5F0] text-[#2B7A50]" },
  { id: "예약중", label: "예약중", color: "border-[#B07010] bg-[#FBF5E8] text-[#B07010]" },
  { id: "완료",   label: "완료",   color: "border-[#888070] bg-[#F0EDE8] text-[#888070]" },
];

export default function RealtyDetailPage({ params }: { params: { id: string } }) {
  const hydrated = useHydrated();
  const userRealty = useUserRealty();
  const item = userRealty.find((r) => r.id === params.id) || REALTY_ITEMS.find((r) => r.id === params.id);
  useMarkViewed(VIEW_KEY.realty, item?.id);

  if (!item) {
    if (!hydrated) return <DetailSkeleton />;
    return notFound();
  }

  const allItems = [...userRealty, ...REALTY_ITEMS];
  const others = allItems.filter((r) => r.id !== item.id && r.deal === item.deal).slice(0, 3);

  // 본인 매물 여부 — 본인만 거래 상태 변경 가능
  const isMine = userRealty.some((r) => r.id === params.id);
  const currentStatus: RealtyStatus = item.status || "가능";

  const changeStatus = async (next: RealtyStatus) => {
    if (!isMine) return;
    if (next === currentStatus) return;
    if (!(await confirmDialog({ message: `거래 상태를 "${next}"(으)로 변경할까요?`, confirmText: "변경" }))) return;
    const ok = updateUserItem<{ id: string; status?: RealtyStatus }>("sori_user_realty", params.id, { status: next });
    if (!ok) toast("상태 변경에 실패했어요. 새로고침 후 다시 시도해주세요.");
    else toast(`거래 상태를 '${next}'(으)로 변경했어요.`);
  };



  return (
    <div className="max-w-[680px] mx-auto">
      {/* 공유는 아래 액션 바에 있으므로 헤더에는 두지 않는다 */}
      <PageHeader />

      {/* 히어로 */}
      <div className="relative">
        <PhotoCarousel
          photos={item.photos || []}
          fallbackEmoji={item.emoji}
          fallbackBg={item.bg}
          heightClass="h-[260px]"
          alt={item.title}
        />
        <span className="absolute top-3 right-3 bg-white/90 text-[#181614] text-[0.7rem] font-bold px-2 py-1 rounded-full z-10">
          {item.deal}
        </span>
        {/* 거래완료면 이미지를 흐리게 덮어 확실히 구분 */}
        {currentStatus === "완료" && (
          <div className="absolute inset-0 bg-white/55 z-10 flex items-center justify-center">
            <span className="bg-[#181614]/85 text-white text-[0.95rem] font-bold px-5 py-2 rounded-full">거래완료</span>
          </div>
        )}
      </div>

      {/* 거래완료 안내 배너 */}
      {currentStatus === "완료" && (
        <div className="bg-[#F0EDE8] border-y border-[#888070]/25 px-4 md:px-6 py-3 flex items-center gap-2">
          <span className="text-base">✅</span>
          <span className="text-[0.82rem] font-bold text-[#888070]">이미 거래완료된 매물이에요</span>
        </div>
      )}

      {/* 본인 매물이면 수정/삭제 진입점 */}
      {isMine && (
        <OwnerActions
          storageKey="sori_user_realty"
          itemId={item.id}
          editHref={`/realty/write?edit=${item.id}`}
          backHref="/realty"
          label="내 매물"
        />
      )}

      {/* 본인 매물이면 거래 상태 변경 UI */}
      {isMine && (
        <div className="bg-[#EBF5F0] border-y border-[#2B7A50]/20 px-4 md:px-6 py-3">
          <div className="text-[0.72rem] font-bold text-[#2B7A50] mb-2">🔑 내 매물 — 거래 상태를 직접 변경할 수 있어요</div>
          <div className="grid grid-cols-3 gap-2">
            {REALTY_STATUSES.map((s) => (
              <button
                key={s.id}
                onClick={() => changeStatus(s.id)}
                className={`py-2 rounded-[8px] text-[0.78rem] font-bold border-2 transition-all ${
                  currentStatus === s.id ? s.color : "border-black/[0.08] bg-white text-[#888070]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 기본 정보 */}
      <div className="bg-white px-4 md:px-6 py-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[0.7rem] bg-[#F5F3EE] text-[#888070] px-2 py-[2px] rounded-full font-semibold">
            {item.type}
          </span>
          {item.diplomaticClause && (
            <span className="text-[0.65rem] bg-[#EBF0FB] text-[#2050A0] px-2 py-[2px] rounded-full font-medium">
              Diplomatic Clause ✓
            </span>
          )}
        </div>
        <h1 className="text-[1.15rem] font-bold leading-snug mb-2">{item.title}</h1>
        <div className="text-[1.6rem] font-extrabold text-[#D04020] mb-1">{item.price}</div>
        <div className="text-[0.78rem] text-[#888070] mb-3">
          📍 {item.area} · 🚇 {item.mrt}
        </div>

        {/* 액션 바 — 모든 카테고리 공통 배치 */}
        <DetailActions
          id={item.id}
          likeKey={LIKE_KEY.realty}
          viewKey={VIEW_KEY.realty}
          saveKey={SAVE_KEY.realty}
          seedLikes={item.likes}
          seedViews={item.views}
          shareTitle={item.title}
          shareText={`${item.price} · ${item.area}`}
          className="mb-4"
        />

        {/* 핵심 스펙 */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-[#F5F3EE] rounded-[10px] p-3">
            <div className="text-[0.68rem] text-[#888070] mb-1">🛏 침실 · 욕실</div>
            <div className="text-[0.88rem] font-bold">
              {item.bedrooms}BR · {item.bathrooms}욕실
            </div>
          </div>
          <div className="bg-[#F5F3EE] rounded-[10px] p-3">
            <div className="text-[0.68rem] text-[#888070] mb-1">📐 면적</div>
            <div className="text-[0.88rem] font-bold">{item.size}</div>
          </div>
          <div className="bg-[#F5F3EE] rounded-[10px] p-3">
            <div className="text-[0.68rem] text-[#888070] mb-1">🏢 층수</div>
            <div className="text-[0.88rem] font-bold">{item.floor}</div>
          </div>
          <div className="bg-[#F5F3EE] rounded-[10px] p-3">
            <div className="text-[0.68rem] text-[#888070] mb-1">🛋️ 가구</div>
            <div className="text-[0.88rem] font-bold">{item.furnished}</div>
          </div>
        </div>

        {/* 입주 가능일 + 주소 (중개사 정보는 표시하지 않음) */}
        <div className="divide-y divide-black/[0.05]">
          <div className="flex justify-between py-3">
            <span className="text-[0.78rem] text-[#888070]">📅 입주 가능</span>
            <span className="text-[0.82rem] font-medium">{item.availableFrom}</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-[0.78rem] text-[#888070]">📍 주소</span>
            <span className="text-[0.82rem] font-medium text-right">{item.address}</span>
          </div>
          {exactTime(resolveISO(item.createdAt, item.time)) && (
            <div className="flex justify-between py-3">
              <span className="text-[0.78rem] text-[#888070]">🕐 등록</span>
              <span className="text-[0.82rem] font-medium" suppressHydrationWarning>{exactTime(resolveISO(item.createdAt, item.time))}</span>
            </div>
          )}
        </div>
      </div>

      {/* 매물 설명 */}
      <div className="bg-white mt-2 px-4 md:px-6 py-5">
        <h3 className="text-[0.9rem] font-bold mb-3">매물 설명</h3>
        <p className="text-[0.85rem] text-[#181614] leading-relaxed whitespace-pre-line">
          {item.description}
        </p>
      </div>

      {/* 단지 편의시설 */}
      <div className="bg-white mt-2 px-4 md:px-6 py-5">
        <h3 className="text-[0.9rem] font-bold mb-3">🏗️ 단지 편의시설</h3>
        <div className="flex flex-wrap gap-2">
          {item.amenities.map((a) => (
            <span
              key={a}
              className="text-[0.75rem] bg-[#F5F3EE] border border-black/[0.08] rounded-full px-3 py-[5px] text-[#181614]"
            >
              {a}
            </span>
          ))}
        </div>
      </div>

      {/* 핵심 특장점 */}
      <div className="bg-white mt-2 px-4 md:px-6 py-5">
        <h3 className="text-[0.9rem] font-bold mb-3">✨ 추천 포인트</h3>
        <ul className="space-y-2">
          {item.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-[0.85rem] text-[#181614]">
              <span className="text-[#D04020] font-bold">✓</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 비슷한 매물 */}
      {others.length > 0 && (
        <div className="bg-white mt-2 px-4 md:px-6 py-4">
          <h3 className="text-[0.85rem] font-bold mb-3 text-[#888070]">비슷한 {item.deal} 매물</h3>
          {others.map((r) => (
            <Link
              key={r.id}
              href={`/realty/${r.id}`}
              className="flex items-center gap-3 py-3 border-b border-black/[0.04] last:border-0 group"
            >
              <div className={`w-12 h-12 rounded-[10px] flex items-center justify-center text-2xl flex-shrink-0 ${r.bg}`}>
                {r.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[0.82rem] font-medium group-hover:text-[#D04020] transition-colors line-clamp-1">
                  {r.title}
                </div>
                <div className="text-[0.72rem] text-[#888070] mt-[2px]">
                  {r.area} · {r.bedrooms}BR · <span className="font-bold text-[#D04020]">{r.price}</span>
                </div>
              </div>
            </Link>
          ))}
          <Link
            href="/realty"
            className="block text-center text-[0.78rem] text-[#D04020] font-medium pt-3 hover:underline"
          >
            전체 매물 보기 →
          </Link>
        </div>
      )}

      <div className="h-4" />
    </div>
  );
}
