import type { Metadata } from "next";
import { COMMUNITY_POSTS, type CommunityPost } from "@/data/communityPosts";
import CommunityDetailClient from "./CommunityDetailClient";
import JsonLd from "@/components/shared/JsonLd";
import { baseCommentCount } from "@/lib/commentCount";
import { SITE_URL } from "@/lib/site";

// 커뮤니티 글 = 게시판 글이므로 DiscussionForumPosting.
//
// - commentCount: 화면이 쓰는 realCommentCount와 같은 계산(lib/commentCount.ts, 답글 포함)을 쓴다.
//   서버는 사용자가 단 댓글(localStorage)을 볼 수 없어 예시 댓글만 센다. 처음 들어온 사람이
//   보는 화면 숫자와 같은 값이다. 화면과 다른 숫자를 기계에게 말하지 않기 위해 구현을 공유한다.
// - text 대신 description에 preview를 넣은 이유: preview는 본문을 그대로 잘라낸 조각이 아니라
//   요약 문장이다(글 1은 본문이 "드디어 OCBC 계좌 텄어요"로 시작하는데 preview는 다른 문장이다).
//   그걸 text(본문)라고 하면 거짓이 되므로, 요약이라는 뜻의 description에 넣었다.
// - author는 post.author를 그대로 쓴다. 익명 글은 데이터의 author가 이미 "익명"이라 화면과 같다.
function communityJsonLd(post: CommunityPost) {
  const url = `${SITE_URL}/community/${post.id}`;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "DiscussionForumPosting",
    headline: post.title,
    description: post.preview,
    articleSection: post.categoryLabel,
    inLanguage: "ko",
    url,
    mainEntityOfPage: url,
    author: { "@type": "Person", name: post.author },
    commentCount: baseCommentCount(post.id),
    publisher: { "@type": "Organization", name: "SORI", url: SITE_URL },
  };
  // createdAt이 없는 글은 화면에 "2시간 전" 같은 상대시간만 있어 정확한 날짜를 알 수 없다.
  // 지어내지 말고 필드를 뺀다.
  if (post.createdAt) data.datePublished = post.createdAt;
  return data;
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const post = COMMUNITY_POSTS.find((p) => p.id === params.id);
  // layout의 template("%s · SORI")이 붙여주므로 여기서 SORI를 또 쓰지 않는다 ("커뮤니티 · SORI · SORI"가 됐었다)
  if (!post) return { title: "커뮤니티" };
  const description = (post.preview || post.fullContent || "").slice(0, 150);
  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
    },
  };
}

export default function Page({ params }: { params: { id: string } }) {
  // 시드에 없는 id(사용자가 쓴 글은 localStorage에만 있다)면 구조화 데이터를 넣지 않는다.
  const post = COMMUNITY_POSTS.find((p) => p.id === params.id);
  return (
    <>
      {post && <JsonLd data={communityJsonLd(post)} />}
      <CommunityDetailClient params={params} />
    </>
  );
}
