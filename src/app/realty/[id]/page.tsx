"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import PhotoCarousel from "@/components/shared/PhotoCarousel";
import OwnerActions from "@/components/shared/OwnerActions";
import DetailSkeleton from "@/components/shared/DetailSkeleton";
import { REALTY_ITEMS, type RealtyStatus } from "@/data/realtyItems";
import { useToggleSet } from "@/lib/storage";
import { useUserRealty, updateUserItem } from "@/lib/userContent";
import { useHydrated } from "@/lib/hooks";

const REALTY_STATUSES: { id: RealtyStatus; label: string; color: string }[] = [
  { id: "가능",   label: "가능",   color: "border-[#2B7A50] bg-[#EBF5F0] text-[#2B7A50]" },
  { id: "예약중", label: "예약중", color: "border-[#B07010] bg-[#FBF5E8] text-[#B07010]" },
  { id: "완료",   label: "완료",   color: "border-[#888070] bg-[#F0EDE8] text-[#888070]" },
];

export default function RealtyDetailPage({ params }: { params: { id: string } }) {
  const hydrated = useHydrated();
  const userRealty = useUserRealty();
  const item = userRealty.find((r) => r.id === params.id) || REALTY_ITEMS.find((r) => r.id === params.id);
  const { has: isSaved, toggle: toggleSave } = useToggleSet("sori_saved_realty");

  if (!item) {
    if (!hydrated) return <DetailSkeleton />;
    return notFound();
  }

  const saved = isSaved(item.id);
  const allItems = [...userRealty, ...REALTY_ITEMS];
  const others = allItems.filter((r) => r.id !== item.id && r.deal === item.deal).slice(0, 3);

  // 본인 매물 여부 — 본인만 거래 상태 변경 가능
  const isMine = userRealty.some((r) => r.id === params.id);
  const currentStatus: RealtyStatus = item.status || "가능";

  const changeStatus = (next: RealtyStatus) => {
    if (!isMine) return;
    if (next === currentStatus) return;
    if (!confirm(`거래 상태를 "${next}"(으)로 변경하시겠어요?`)) return;
    const ok = updateUserItem<{ id: string; status?: RealtyStatus }>("sori_user_realty", params.id, { status: next });
    if (!ok) alert("상태 변경에 실패했어요. 새로고침 후 다시 시도해주세요.");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: item.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("링크가 복사되었습니다.");
    }
  };

  const handleContact = () => {
    const msg = `중개사: ${item.agent}\n매물: ${item.title}\n\n실제 서비스에서는 중개사에게 메시지 보내기 또는 전화 연결됩니다.\n(현재는 데모이며 연락처는 가상입니다)`;
    alert(msg);
  };

  const handleMap = () => {
    const query = encodeURIComponent(`${item.address || item.area} Singapore`);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="max-w-[680px] mx-auto">
      <PageHeader
        right={
          <button
            onClick={() => toggleSave(item.id)}
            className={`text-xl transition-transform active:scale-90 ${saved ? "text-[#D04020]" : "text-[#C0BBB0]"}`}
            aria-label="저장"
          >
            {saved ? "❤️" : "🤍"}
          </button>
        }
      />

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
      </div>

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
        <div className="text-[0.78rem] text-[#888070] mb-4">
          📍 {item.area} · 🚇 {item.mrt}
        </div>

        {/* 빠른 액션 */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          <button
            onClick={handleShare}
            className="flex flex-col items-center gap-1 py-3 bg-[#F5F3EE] rounded-[12px] hover:bg-[#F0EDE8] transition-colors active:scale-95"
          >
            <span className="text-xl leading-none">↗</span>
            <span className="text-[0.72rem] font-medium text-[#181614]">공유</span>
          </button>
          <button
            onClick={handleContact}
            className="flex flex-col items-center gap-1 py-3 bg-[#F5F3EE] rounded-[12px] hover:bg-[#F0EDE8] transition-colors active:scale-95"
          >
            <span className="text-xl leading-none">📞</span>
            <span className="text-[0.72rem] font-medium text-[#181614]">중개사 연락</span>
          </button>
          <button
            onClick={handleMap}
            className="flex flex-col items-center gap-1 py-3 bg-[#F5F3EE] rounded-[12px] hover:bg-[#F0EDE8] transition-colors active:scale-95"
          >
            <span className="text-xl leading-none">🗺️</span>
            <span className="text-[0.72rem] font-medium text-[#181614]">지도</span>
          </button>
        </div>

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

        {/* 입주 가능일 + 중개사 */}
        <div className="divide-y divide-black/[0.05]">
          <div className="flex justify-between py-3">
            <span className="text-[0.78rem] text-[#888070]">📅 입주 가능</span>
            <span className="text-[0.82rem] font-medium">{item.availableFrom}</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-[0.78rem] text-[#888070]">📍 주소</span>
            <span className="text-[0.82rem] font-medium text-right">{item.address}</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-[0.78rem] text-[#888070]">
              {item.agentBadge === "집주인 직거래" ? "👤 직거래" : "🏢 중개사"}
            </span>
            <span className="text-[0.82rem] font-medium">{item.agent}</span>
          </div>
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
