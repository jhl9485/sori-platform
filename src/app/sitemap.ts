import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { resolveISO } from "@/lib/format";
import { NEWS_ITEMS } from "@/data/newsItems";
import { COMMUNITY_POSTS } from "@/data/communityPosts";
import { BUSINESSES } from "@/data/businesses";
import { JOBS } from "@/data/jobs";
import { REALTY_ITEMS } from "@/data/realtyItems";
import { FLEA_ITEMS } from "@/data/fleaItems";

/**
 * 검색엔진에 "이 사이트에 어떤 페이지가 있는지" 알려주는 목록(/sitemap.xml).
 *
 * ⚠️ 사용자가 앱에서 직접 등록한 글·업소·매물·물건은 여기에 담을 수 없다.
 *    그 데이터는 브라우저의 localStorage에만 저장되고(src/lib/userContent.ts),
 *    sitemap은 서버에서 만들어지므로 서버는 그 항목의 존재 자체를 모른다.
 *    지금 담을 수 있는 것은 src/data/*.ts의 시드(예시) 데이터뿐이다.
 *    나중에 백엔드(DB)를 붙이면 그때 사용자 등록분도 함께 넣어야 한다.
 *
 * 개인 화면(/my, /notifications)과 작성 화면(/write, 각 게시판의 write, /business/apply),
 * 로그인·가입(/login, /signup)은 검색 결과에 뜰 이유가 없어 일부러 뺐다.
 * robots.ts에서도 같은 목록을 막고 있으니 한쪽만 고치지 말 것.
 */

type SitemapEntry = MetadataRoute.Sitemap[number];
type ChangeFrequency = SitemapEntry["changeFrequency"];

const url = (path: string) => `${SITE_URL}${path}`;

// resolveISO는 사용자 등록분의 createdAt(ISO)을 우선 쓰고, 없으면 시드의
// "3시간 전" 같은 문자열을 고정 기준시각으로 환산한다. 환산이 안 되면 null이라
// 그때는 lastModified를 아예 넣지 않는다(틀린 날짜를 넣는 것보다 없는 게 낫다).
const lastMod = (createdAt: string | undefined, time: string | undefined) => {
  const iso = resolveISO(createdAt, time);
  return iso ? { lastModified: new Date(iso) } : {};
};

const STATIC_ROUTES: { path: string; changeFrequency: ChangeFrequency; priority: number }[] = [
  { path: "/", changeFrequency: "hourly", priority: 1.0 },
  { path: "/news", changeFrequency: "hourly", priority: 0.9 },
  { path: "/community", changeFrequency: "hourly", priority: 0.9 },
  { path: "/business", changeFrequency: "daily", priority: 0.8 },
  { path: "/jobs", changeFrequency: "daily", priority: 0.8 },
  { path: "/realty", changeFrequency: "daily", priority: 0.8 },
  { path: "/flea", changeFrequency: "daily", priority: 0.8 },
  { path: "/search", changeFrequency: "weekly", priority: 0.4 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.2 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: url(r.path),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // 뉴스는 publishedAt("YYYY-MM-DD")이 그대로 발행일이라 변환 없이 쓴다.
  const newsEntries: MetadataRoute.Sitemap = NEWS_ITEMS.map((n) => ({
    url: url(`/news/${n.id}`),
    lastModified: new Date(n.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const communityEntries: MetadataRoute.Sitemap = COMMUNITY_POSTS.map((p) => ({
    url: url(`/community/${p.id}`),
    ...lastMod(p.createdAt, p.time),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  // 업소는 날짜 필드가 없다(실존 업체 정보라 등록 시각을 지어내지 않는다) → lastModified 생략.
  const businessEntries: MetadataRoute.Sitemap = BUSINESSES.map((b) => ({
    url: url(`/business/${b.id}`),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const jobEntries: MetadataRoute.Sitemap = JOBS.map((j) => ({
    url: url(`/jobs/${j.id}`),
    ...lastMod(j.createdAt, j.postedAt),
    changeFrequency: "daily",
    priority: 0.6,
  }));

  const realtyEntries: MetadataRoute.Sitemap = REALTY_ITEMS.map((r) => ({
    url: url(`/realty/${r.id}`),
    ...lastMod(r.createdAt, r.time),
    changeFrequency: "daily",
    priority: 0.6,
  }));

  const fleaEntries: MetadataRoute.Sitemap = FLEA_ITEMS.map((f) => ({
    url: url(`/flea/${f.id}`),
    ...lastMod(f.createdAt, f.time),
    changeFrequency: "daily",
    priority: 0.6,
  }));

  return [
    ...staticEntries,
    ...newsEntries,
    ...communityEntries,
    ...businessEntries,
    ...jobEntries,
    ...realtyEntries,
    ...fleaEntries,
  ];
}
