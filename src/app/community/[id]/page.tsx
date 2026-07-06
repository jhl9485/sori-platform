import type { Metadata } from "next";
import { COMMUNITY_POSTS } from "@/data/communityPosts";
import CommunityDetailClient from "./CommunityDetailClient";

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const post = COMMUNITY_POSTS.find((p) => p.id === params.id);
  if (!post) return { title: "커뮤니티 · SORI" };
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
  return <CommunityDetailClient params={params} />;
}
