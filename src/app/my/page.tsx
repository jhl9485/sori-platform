"use client";

import { Suspense, useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { COMMUNITY_POSTS } from "@/data/communityPosts";
import { NEWS_ITEMS } from "@/data/newsItems";
import { BUSINESSES } from "@/data/businesses";
import { REALTY_ITEMS } from "@/data/realtyItems";
import { useToggleSet } from "@/lib/storage";
import {
  useUserPosts,
  useUserFlea,
  useUserJobs,
  useUserRealty,
  removeUserItem,
} from "@/lib/userContent";
import { useProfile } from "@/lib/profile";

const TABS = [
  { id: "overview", label: "활동", icon: "📊" },
  { id: "posts",    label: "내 글", icon: "📝" },
  { id: "saved",    label: "저장", icon: "🔖" },
  { id: "liked",    label: "좋아요", icon: "❤️" },
  { id: "settings", label: "설정", icon: "⚙️" },
] as const;
type TabId = typeof TABS[number]["id"];

const SETTINGS_MENU = [
  { icon: "🔔", label: "알림 설정" },
  { icon: "🔒", label: "개인정보 보호" },
  { icon: "🌐", label: "언어 설정" },
  { icon: "📱", label: "앱 정보" },
  { icon: "🆘", label: "고객센터" },
];

function MyPageInner() {
  const sp = useSearchParams();
  const tabParam = sp.get("tab");
  const initialTab: TabId = (TABS.find((t) => t.id === tabParam)?.id) || "overview";
  const [activeTab, setActiveTab] = useState<TabId>(initialTab);
  const { profile, setProfile } = useProfile();
  const [editingProfile, setEditingProfile] = useState(false);

  useEffect(() => {
    if (tabParam) {
      const found = TABS.find((t) => t.id === tabParam);
      if (found) setActiveTab(found.id);
    }
  }, [tabParam]);

  // 사용자 작성 글들
  const userPosts = useUserPosts();
  const userFlea = useUserFlea();
  const userJobs = useUserJobs();
  const userRealty = useUserRealty();

  // 저장/좋아요/도움됨 ID 집합
  const { ids: savedPostIds } = useToggleSet("sori_saved_posts");
  const { ids: savedNewsIds } = useToggleSet("sori_saved_news");
  const { ids: savedBizIds } = useToggleSet("sori_saved_biz");
  const { ids: savedRealtyIds } = useToggleSet("sori_saved_realty");
  const { ids: likedPostIds } = useToggleSet("sori_liked_posts");
  const { ids: helpedPostIds } = useToggleSet("sori_helped_posts");

  // 저장된 항목 실제 객체 조회 (사용자 글 + 정적 데이터)
  const allPosts = useMemo(() => [...userPosts, ...COMMUNITY_POSTS], [userPosts]);
  const allRealty = useMemo(() => [...userRealty, ...REALTY_ITEMS], [userRealty]);

  const savedPosts = useMemo(
    () => allPosts.filter((p) => savedPostIds.has(p.id)),
    [allPosts, savedPostIds]
  );
  const savedNews = useMemo(
    () => NEWS_ITEMS.filter((n) => savedNewsIds.has(n.id)),
    [savedNewsIds]
  );
  const savedBiz = useMemo(
    () => BUSINESSES.filter((b) => savedBizIds.has(b.id)),
    [savedBizIds]
  );
  const savedRealty = useMemo(
    () => allRealty.filter((r) => savedRealtyIds.has(r.id)),
    [allRealty, savedRealtyIds]
  );

  const likedPosts = useMemo(
    () => allPosts.filter((p) => likedPostIds.has(p.id)),
    [allPosts, likedPostIds]
  );
  const helpedPosts = useMemo(
    () => allPosts.filter((p) => helpedPostIds.has(p.id)),
    [allPosts, helpedPostIds]
  );

  const totalSaved = savedPosts.length + savedNews.length + savedBiz.length + savedRealty.length;
  const totalUserWrites = userPosts.length + userFlea.length + userJobs.length + userRealty.length;

  return (
    <div className="max-w-[680px] mx-auto">
      {/* 프로필 헤더 */}
      <div className="bg-[#131211] pt-8 md:pt-10 pb-6 px-4 md:px-6 md:rounded-b-[20px]">
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#EBF0FB] flex items-center justify-center text-2xl border-2 border-white/20 font-bold text-[#2050A0]">
              {profile.avatarChar}
            </div>
            <div>
              <div className="text-white font-bold text-[1.05rem]">{profile.name}</div>
              <div className="text-white/50 text-[0.75rem] mt-[2px]">{profile.visa} {profile.yearsInSG} · {profile.area}</div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[0.65rem] bg-[#EBF0FB] text-[#2050A0] px-2 py-[2px] rounded-full font-medium">{profile.visa} 비자</span>
                <span className="text-[0.65rem] bg-[#EBF5F0] text-[#2B7A50] px-2 py-[2px] rounded-full font-medium">인증회원 ✓</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setEditingProfile(true)}
            className="text-white/50 border border-white/20 px-3 py-1 rounded-full text-[0.75rem] hover:border-white/40 hover:text-white/80 transition-colors"
          >
            편집
          </button>
        </div>

        {editingProfile && (
          <ProfileEditModal profile={profile} onSave={(p) => { setProfile(p); setEditingProfile(false); }} onClose={() => setEditingProfile(false)} />
        )}
        <div className="grid grid-cols-4 gap-2 mt-5 bg-white/[0.07] rounded-[12px] p-3">
          <Stat label="작성" value={totalUserWrites} onClick={() => setActiveTab("posts")} />
          <Stat label="저장" value={totalSaved} onClick={() => setActiveTab("saved")} />
          <Stat label="좋아요" value={likedPostIds.size} onClick={() => setActiveTab("liked")} />
          <Stat label="도움됨" value={helpedPostIds.size} />
        </div>
      </div>

      {/* 탭 바 */}
      <div className="flex border-b border-black/[0.08] bg-white sticky top-[56px] md:top-0 z-10 overflow-x-auto scrollbar-hide">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 py-[12px] px-4 text-[0.82rem] font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? "text-[#D04020] border-b-2 border-[#D04020]"
                : "text-[#888070] hover:text-[#181614]"
            }`}
          >
            <span className="mr-1">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* 탭 콘텐츠 */}
      <div className="px-4 md:px-6 py-5 pb-12">
        {activeTab === "overview" && (
          <OverviewTab
            userPostsCount={userPosts.length}
            userFleaCount={userFlea.length}
            userJobsCount={userJobs.length}
            userRealtyCount={userRealty.length}
            savedCount={totalSaved}
            likedCount={likedPostIds.size}
            helpedCount={helpedPostIds.size}
            onSelectTab={setActiveTab}
          />
        )}

        {activeTab === "posts" && (
          <PostsTab
            userPosts={userPosts}
            userFlea={userFlea}
            userJobs={userJobs}
            userRealty={userRealty}
          />
        )}

        {activeTab === "saved" && (
          <SavedTab
            posts={savedPosts}
            news={savedNews}
            biz={savedBiz}
            realty={savedRealty}
          />
        )}

        {activeTab === "liked" && (
          <LikedTab posts={likedPosts} helped={helpedPosts} />
        )}

        {activeTab === "settings" && <SettingsTab />}
      </div>
    </div>
  );
}

export default function MyPage() {
  return (
    <Suspense fallback={<div className="max-w-[680px] mx-auto p-6 text-[#888070]">불러오는 중…</div>}>
      <MyPageInner />
    </Suspense>
  );
}

// ── 보조 컴포넌트 ──

function Stat({ label, value, onClick }: { label: string; value: number; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-center transition-opacity hover:opacity-80"
      disabled={!onClick}
    >
      <div className="text-white font-bold text-[1rem]">{value}</div>
      <div className="text-white/40 text-[0.68rem] mt-[2px]">{label}</div>
    </button>
  );
}

function EmptyState({ icon, text, ctaText, ctaHref }: { icon: string; text: string; ctaText?: string; ctaHref?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-[#888070]">
      <div className="text-4xl mb-3">{icon}</div>
      <div className="text-[0.85rem] font-medium mb-3">{text}</div>
      {ctaText && ctaHref && (
        <Link href={ctaHref} className="text-[0.78rem] text-[#D04020] font-bold hover:underline">
          {ctaText} →
        </Link>
      )}
    </div>
  );
}

function ListLink({ href, title, sub, badge }: { href: string; title: string; sub: string; badge?: string }) {
  return (
    <Link
      href={href}
      className="block py-3 px-3 border-b border-black/[0.04] hover:bg-[#F5F3EE] transition-colors rounded-lg -mx-2 px-2"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="text-[0.85rem] font-medium text-[#181614] line-clamp-1">{title}</div>
          <div className="text-[0.7rem] text-[#888070] mt-[2px]">{sub}</div>
        </div>
        {badge && (
          <span className="text-[0.62rem] bg-[#F5F3EE] text-[#888070] px-2 py-[2px] rounded-full flex-shrink-0">
            {badge}
          </span>
        )}
      </div>
    </Link>
  );
}

function SectionHeader({ title, count }: { title: string; count: number }) {
  return (
    <div className="flex items-center justify-between mb-2 mt-4 first:mt-0">
      <h3 className="text-[0.88rem] font-bold">{title}</h3>
      <span className="text-[0.7rem] text-[#888070]">{count}개</span>
    </div>
  );
}

// ── 탭 컴포넌트 ──

interface OverviewProps {
  userPostsCount: number;
  userFleaCount: number;
  userJobsCount: number;
  userRealtyCount: number;
  savedCount: number;
  likedCount: number;
  helpedCount: number;
  onSelectTab: (id: TabId) => void;
}

function OverviewTab(props: OverviewProps) {
  const items = [
    { icon: "📝", label: "내가 쓴 글", count: props.userPostsCount, action: () => props.onSelectTab("posts") },
    { icon: "🛍️", label: "내 판매", count: props.userFleaCount, action: () => props.onSelectTab("posts") },
    { icon: "💼", label: "내 공고", count: props.userJobsCount, action: () => props.onSelectTab("posts") },
    { icon: "🏘️", label: "내 매물", count: props.userRealtyCount, action: () => props.onSelectTab("posts") },
    { icon: "🔖", label: "저장한 글", count: props.savedCount, action: () => props.onSelectTab("saved") },
    { icon: "❤️", label: "좋아요", count: props.likedCount, action: () => props.onSelectTab("liked") },
  ];

  return (
    <>
      <div className="grid grid-cols-3 gap-2 mb-5">
        {items.map((item) => (
          <button
            key={item.label}
            onClick={item.action}
            className="bg-white rounded-[12px] border border-black/[0.08] p-3 flex flex-col items-center gap-1 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:-translate-y-[1px] transition-all"
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-[0.72rem] font-medium text-[#181614]">{item.label}</span>
            <span className="text-[0.72rem] font-bold text-[#D04020]">{item.count}</span>
          </button>
        ))}
      </div>

      {/* 빠른 액션 */}
      <div className="bg-white rounded-[14px] border border-black/[0.08] overflow-hidden mb-5">
        <div className="px-4 py-3 border-b border-black/[0.06] flex items-center justify-between">
          <span className="text-[0.85rem] font-bold">빠른 글쓰기</span>
        </div>
        <div className="grid grid-cols-2 gap-px bg-black/[0.04]">
          <Link href="/write" className="px-4 py-3 bg-white hover:bg-[#F5F3EE] transition-colors flex items-center gap-2 text-[0.82rem]">✏️ 커뮤니티 글</Link>
          <Link href="/realty/write" className="px-4 py-3 bg-white hover:bg-[#F5F3EE] transition-colors flex items-center gap-2 text-[0.82rem]">🏘️ 부동산 매물</Link>
          <Link href="/flea/write" className="px-4 py-3 bg-white hover:bg-[#F5F3EE] transition-colors flex items-center gap-2 text-[0.82rem]">🛍️ 벼룩시장</Link>
          <Link href="/jobs/write" className="px-4 py-3 bg-white hover:bg-[#F5F3EE] transition-colors flex items-center gap-2 text-[0.82rem]">💼 채용 공고</Link>
        </div>
      </div>

      {props.helpedCount > 0 && (
        <div className="bg-[#EBF5F0] rounded-[12px] p-4 flex items-center gap-3">
          <span className="text-2xl">👍</span>
          <div>
            <div className="text-[0.85rem] font-bold text-[#2B7A50]">{props.helpedCount}개의 글에 도움됨 표시</div>
            <div className="text-[0.7rem] text-[#2B7A50]/80 mt-[2px]">좋은 글을 알아봐 주셔서 감사해요!</div>
          </div>
        </div>
      )}
    </>
  );
}

interface PostsTabProps {
  userPosts: ReturnType<typeof useUserPosts>;
  userFlea: ReturnType<typeof useUserFlea>;
  userJobs: ReturnType<typeof useUserJobs>;
  userRealty: ReturnType<typeof useUserRealty>;
}

function PostsTab({ userPosts, userFlea, userJobs, userRealty }: PostsTabProps) {
  const [, forceUpdate] = useState({});
  const remove = (key: string, id: string) => {
    if (!confirm("정말 삭제하시겠어요? 되돌릴 수 없어요.")) return;
    removeUserItem(key, id);
    forceUpdate({});
  };

  const total = userPosts.length + userFlea.length + userJobs.length + userRealty.length;

  if (total === 0) {
    return (
      <EmptyState
        icon="✏️"
        text="아직 작성한 글이 없어요"
        ctaText="첫 글 작성하기"
        ctaHref="/write"
      />
    );
  }

  return (
    <div className="space-y-5">
      {userPosts.length > 0 && (
        <section className="bg-white rounded-[14px] border border-black/[0.08] p-4">
          <SectionHeader title="💬 커뮤니티 글" count={userPosts.length} />
          {userPosts.map((p) => (
            <div key={p.id} className="border-b border-black/[0.04] last:border-0 py-3 flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <Link href={`/community/${p.id}`} className="block">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[0.62rem] px-2 py-[1px] rounded-full font-semibold ${p.categoryStyle}`}>
                      {p.categoryLabel}
                    </span>
                    <span className="text-[0.65rem] text-[#888070]">{p.time}</span>
                  </div>
                  <div className="text-[0.85rem] font-medium line-clamp-1 hover:text-[#D04020] transition-colors">{p.title}</div>
                </Link>
              </div>
              <button onClick={() => remove("sori_user_posts", p.id)} className="text-[0.7rem] text-[#888070] hover:text-[#D04020] flex-shrink-0 mt-1">삭제</button>
            </div>
          ))}
        </section>
      )}

      {userRealty.length > 0 && (
        <section className="bg-white rounded-[14px] border border-black/[0.08] p-4">
          <SectionHeader title="🏘️ 부동산 매물" count={userRealty.length} />
          {userRealty.map((r) => (
            <div key={r.id} className="border-b border-black/[0.04] last:border-0 py-3 flex items-start gap-3">
              <Link href={`/realty/${r.id}`} className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[0.62rem] bg-[#F5F3EE] text-[#888070] px-2 py-[1px] rounded-full font-semibold">{r.type}</span>
                  <span className="text-[0.62rem] bg-[#FBF5E8] text-[#B07010] px-2 py-[1px] rounded-full font-medium">{r.deal}</span>
                  <span className="text-[0.65rem] text-[#888070]">{r.time}</span>
                </div>
                <div className="text-[0.85rem] font-medium line-clamp-1 hover:text-[#D04020] transition-colors">{r.title}</div>
                <div className="text-[0.78rem] text-[#D04020] font-bold mt-[2px]">{r.price}</div>
              </Link>
              <button onClick={() => remove("sori_user_realty", r.id)} className="text-[0.7rem] text-[#888070] hover:text-[#D04020] flex-shrink-0 mt-1">삭제</button>
            </div>
          ))}
        </section>
      )}

      {userFlea.length > 0 && (
        <section className="bg-white rounded-[14px] border border-black/[0.08] p-4">
          <SectionHeader title="🛍️ 벼룩시장" count={userFlea.length} />
          {userFlea.map((f) => (
            <div key={f.id} className="border-b border-black/[0.04] last:border-0 py-3 flex items-start gap-3">
              <Link href={`/flea/${f.id}`} className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[0.62rem] bg-[#F5F3EE] text-[#888070] px-2 py-[1px] rounded-full">{f.category}</span>
                  <span className="text-[0.65rem] text-[#888070]">{f.time}</span>
                </div>
                <div className="text-[0.85rem] font-medium line-clamp-1 hover:text-[#D04020] transition-colors">{f.title}</div>
                <div className="text-[0.78rem] text-[#D04020] font-bold mt-[2px]">{f.price}</div>
              </Link>
              <button onClick={() => remove("sori_user_flea", f.id)} className="text-[0.7rem] text-[#888070] hover:text-[#D04020] flex-shrink-0 mt-1">삭제</button>
            </div>
          ))}
        </section>
      )}

      {userJobs.length > 0 && (
        <section className="bg-white rounded-[14px] border border-black/[0.08] p-4">
          <SectionHeader title="💼 채용 공고" count={userJobs.length} />
          {userJobs.map((j) => (
            <div key={j.id} className="border-b border-black/[0.04] last:border-0 py-3 flex items-start gap-3">
              <Link href={`/jobs/${j.id}`} className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[0.62rem] bg-[#EBF0FB] text-[#2050A0] px-2 py-[1px] rounded-full font-medium">{j.visaType}</span>
                  <span className="text-[0.65rem] text-[#888070]">{j.postedAt}</span>
                </div>
                <div className="text-[0.85rem] font-medium line-clamp-1 hover:text-[#D04020] transition-colors">{j.title}</div>
                <div className="text-[0.7rem] text-[#888070] mt-[2px]">{j.company} · {j.salary}</div>
              </Link>
              <button onClick={() => remove("sori_user_jobs", j.id)} className="text-[0.7rem] text-[#888070] hover:text-[#D04020] flex-shrink-0 mt-1">삭제</button>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

interface SavedTabProps {
  posts: ReturnType<typeof useUserPosts>;
  news: typeof NEWS_ITEMS;
  biz: typeof BUSINESSES;
  realty: ReturnType<typeof useUserRealty>;
}

function SavedTab({ posts, news, biz, realty }: SavedTabProps) {
  const total = posts.length + news.length + biz.length + realty.length;
  if (total === 0) {
    return (
      <EmptyState
        icon="🔖"
        text="저장한 항목이 없어요"
        ctaText="둘러보기"
        ctaHref="/"
      />
    );
  }

  return (
    <div className="space-y-5">
      {posts.length > 0 && (
        <section className="bg-white rounded-[14px] border border-black/[0.08] p-4">
          <SectionHeader title="💬 커뮤니티 글" count={posts.length} />
          {posts.map((p) => (
            <ListLink
              key={p.id}
              href={`/community/${p.id}`}
              title={p.title}
              sub={`${p.categoryLabel} · ❤️ ${p.likes} · 💬 ${p.comments}`}
              badge={p.time}
            />
          ))}
        </section>
      )}

      {news.length > 0 && (
        <section className="bg-white rounded-[14px] border border-black/[0.08] p-4">
          <SectionHeader title="📰 뉴스" count={news.length} />
          {news.map((n) => (
            <ListLink
              key={n.id}
              href={`/news/${n.id}`}
              title={n.title}
              sub={`${n.category} · ${n.source}`}
              badge={n.time}
            />
          ))}
        </section>
      )}

      {biz.length > 0 && (
        <section className="bg-white rounded-[14px] border border-black/[0.08] p-4">
          <SectionHeader title="🏪 한인 업소" count={biz.length} />
          {biz.map((b) => (
            <ListLink
              key={b.id}
              href={`/business/${b.id}`}
              title={b.name}
              sub={`${b.category} · ${b.area} · ★ ${b.rating}`}
              badge={b.isOpen ? "영업중" : "종료"}
            />
          ))}
        </section>
      )}

      {realty.length > 0 && (
        <section className="bg-white rounded-[14px] border border-black/[0.08] p-4">
          <SectionHeader title="🏘️ 부동산" count={realty.length} />
          {realty.map((r) => (
            <ListLink
              key={r.id}
              href={`/realty/${r.id}`}
              title={r.title}
              sub={`${r.type} · ${r.area} · ${r.price}`}
              badge={r.deal}
            />
          ))}
        </section>
      )}
    </div>
  );
}

interface LikedTabProps {
  posts: ReturnType<typeof useUserPosts>;
  helped: ReturnType<typeof useUserPosts>;
}

function LikedTab({ posts, helped }: LikedTabProps) {
  if (posts.length === 0 && helped.length === 0) {
    return (
      <EmptyState
        icon="❤️"
        text="좋아요/도움됨 표시한 글이 없어요"
        ctaText="커뮤니티 보러가기"
        ctaHref="/community"
      />
    );
  }

  return (
    <div className="space-y-5">
      {posts.length > 0 && (
        <section className="bg-white rounded-[14px] border border-black/[0.08] p-4">
          <SectionHeader title="❤️ 좋아요한 글" count={posts.length} />
          {posts.map((p) => (
            <ListLink
              key={p.id}
              href={`/community/${p.id}`}
              title={p.title}
              sub={`${p.categoryLabel} · 좋아요 ${p.likes}`}
              badge={p.time}
            />
          ))}
        </section>
      )}

      {helped.length > 0 && (
        <section className="bg-white rounded-[14px] border border-black/[0.08] p-4">
          <SectionHeader title="👍 도움됨" count={helped.length} />
          {helped.map((p) => (
            <ListLink
              key={p.id}
              href={`/community/${p.id}`}
              title={p.title}
              sub={`${p.categoryLabel}`}
              badge={p.time}
            />
          ))}
        </section>
      )}
    </div>
  );
}

function SettingsTab() {
  const handleMenu = (label: string) => {
    const messages: Record<string, string> = {
      "알림 설정": "알림 설정\n\n• 댓글 알림: ON\n• 좋아요 알림: ON\n• 채용 추천: ON\n• 마케팅: OFF\n\n(실제 서비스 연동 시 토글로 변경 가능)",
      "개인정보 보호": "개인정보 보호\n\n• 프로필 공개 범위: 회원에게만\n• 검색 결과 노출: ON\n• 활동 기록 표시: ON\n\n(실제 서비스 연동 시 변경 가능)",
      "언어 설정": "언어 설정\n\n현재: 한국어\n\n(영어/중국어 지원은 향후 추가 예정)",
      "앱 정보": "SORI v1.0.0\n\n싱가포르 한인 커뮤니티 플랫폼\n© 2026 SORI\n\n약관 · 개인정보 처리방침은 곧 추가됩니다.",
      "고객센터": "고객센터\n\n📧 support@sori.sg (가상)\n💬 카카오톡: @sori_sg (가상)\n🕐 평일 10:00 ~ 18:00 SGT",
    };
    alert(messages[label] || label);
  };

  const handleLogout = () => {
    if (!window.confirm("로그아웃하시겠어요?\n저장된 글·댓글·좋아요는 그대로 유지됩니다.")) return;
    alert("로그아웃되었습니다.\n(실제 서비스에서는 로그인 화면으로 이동)");
  };

  const handleClearData = () => {
    if (!window.confirm("⚠️ 모든 로컬 데이터가 삭제됩니다.\n\n• 내가 쓴 글/매물/공고/벼룩\n• 저장·좋아요·도움됨 표시\n• 임시저장 / 검색 기록 / 알림 읽음 / 프로필\n\n되돌릴 수 없어요. 정말 진행하시겠어요?")) return;
    if (!window.confirm("정말 확실하신가요? 마지막 확인이에요.")) return;
    Object.keys(localStorage)
      .filter((k) => k.startsWith("sori_"))
      .forEach((k) => localStorage.removeItem(k));
    alert("모든 로컬 데이터가 초기화되었습니다.");
    window.location.reload();
  };

  return (
    <>
      <div className="bg-white rounded-[14px] border border-black/[0.08] overflow-hidden">
        {SETTINGS_MENU.map((item, i) => (
          <button
            key={item.label}
            onClick={() => handleMenu(item.label)}
            className={`w-full px-4 py-4 flex items-center gap-3 hover:bg-[#F5F3EE] transition-colors text-left ${
              i < SETTINGS_MENU.length - 1 ? "border-b border-black/[0.06]" : ""
            }`}
          >
            <span className="text-lg flex-shrink-0 leading-none">{item.icon}</span>
            <span className="flex-1 text-[0.85rem]">{item.label}</span>
            <span className="text-[#C0BBB0] text-sm">›</span>
          </button>
        ))}
      </div>
      <button
        onClick={handleLogout}
        className="w-full mt-3 py-3 text-[0.82rem] text-[#D04020] font-medium bg-white rounded-[14px] border border-black/[0.08] hover:bg-[#FBF0EC] transition-colors"
      >
        로그아웃
      </button>
      <button
        onClick={handleClearData}
        className="w-full mt-2 py-3 text-[0.78rem] text-[#888070] font-medium bg-white rounded-[14px] border border-black/[0.08] hover:bg-[#F5F3EE] hover:text-[#D04020] transition-colors"
      >
        🗑️ 모든 로컬 데이터 초기화
      </button>
      <div className="text-center mt-4 text-[0.65rem] text-[#C0BBB0]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        SORI v1.0.0 · 싱가포르 한인 플랫폼
      </div>
    </>
  );
}

// ── 프로필 편집 모달 ──
import type { UserProfile } from "@/lib/profile";

function ProfileEditModal({ profile, onSave, onClose }: { profile: UserProfile; onSave: (p: UserProfile) => void; onClose: () => void }) {
  const [name, setName] = useState(profile.name);
  const [visa, setVisa] = useState(profile.visa);
  const [yearsInSG, setYearsInSG] = useState(profile.yearsInSG);
  const [area, setArea] = useState(profile.area);

  const VISAS = ["EP", "S-Pass", "DP", "PR", "시민권", "WH", "방문"];
  const AREAS = ["Tanjong Pagar", "Buona Vista", "Orchard", "River Valley", "Clementi", "Bishan", "Marine Parade", "East Coast", "Woodlands", "Bedok", "Marina Bay", "기타"];

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 flex items-end sm:items-center justify-center sm:px-4 animate-fade-up"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-t-[20px] sm:rounded-[16px] w-full sm:max-w-[420px] p-5 max-h-[88vh] overflow-y-auto shadow-[0_-8px_30px_rgba(0,0,0,0.15)] sm:shadow-none"
      >
        {/* 모바일 grabber */}
        <div className="sm:hidden w-10 h-1 bg-black/[0.12] rounded-full mx-auto mb-3" />

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[1rem] font-bold text-[#181614]">프로필 편집</h2>
          <button onClick={onClose} className="text-[#888070] hover:text-[#D04020] text-lg leading-none w-8 h-8 flex items-center justify-center -mr-2">✕</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-[0.72rem] text-[#888070] mb-1 block">닉네임</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 12))}
              placeholder="닉네임 (최대 12자)"
              className="w-full bg-[#F5F3EE] rounded-[10px] px-3 py-[10px] text-[0.85rem] outline-none placeholder:text-[#C0BBB0]"
            />
          </div>

          <div>
            <label className="text-[0.72rem] text-[#888070] mb-1 block">비자 상태</label>
            <div className="flex flex-wrap gap-[5px]">
              {VISAS.map((v) => (
                <button
                  key={v}
                  onClick={() => setVisa(v)}
                  className={`text-[0.75rem] rounded-full px-3 py-[5px] border transition-colors ${
                    visa === v ? "bg-[#181614] text-white border-[#181614]" : "bg-white text-[#888070] border-black/[0.08] hover:border-black/[0.15]"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[0.72rem] text-[#888070] mb-1 block">싱가포르 거주 기간</label>
            <input
              type="text"
              value={yearsInSG}
              onChange={(e) => setYearsInSG(e.target.value)}
              placeholder="예: 3년차, 6개월차"
              className="w-full bg-[#F5F3EE] rounded-[10px] px-3 py-[10px] text-[0.85rem] outline-none placeholder:text-[#C0BBB0]"
            />
          </div>

          <div>
            <label className="text-[0.72rem] text-[#888070] mb-1 block">거주 지역</label>
            <div className="flex flex-wrap gap-[5px]">
              {AREAS.map((a) => (
                <button
                  key={a}
                  onClick={() => setArea(a)}
                  className={`text-[0.72rem] rounded-full px-3 py-[4px] border transition-colors ${
                    area === a ? "bg-[#D04020] text-white border-[#D04020]" : "bg-white text-[#888070] border-black/[0.08] hover:border-black/[0.15]"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-5">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-[10px] bg-[#F5F3EE] text-[#888070] text-[0.85rem] font-medium hover:bg-[#F0EDE8] transition-colors"
          >
            취소
          </button>
          <button
            onClick={() => onSave({
              name: name.trim() || profile.name,
              visa,
              yearsInSG: yearsInSG.trim() || profile.yearsInSG,
              area,
              avatarChar: (name.trim() || profile.name).charAt(0),
            })}
            className="flex-1 py-3 rounded-[10px] bg-[#D04020] text-white text-[0.85rem] font-bold hover:bg-[#B83515] transition-colors"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
