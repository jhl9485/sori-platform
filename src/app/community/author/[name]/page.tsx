"use client";

import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import CommunityPostCard from "@/components/community/CommunityPostCard";
import { COMMUNITY_POSTS } from "@/data/communityPosts";
import { useUserPosts } from "@/lib/userContent";

export default function AuthorPage({ params }: { params: { name: string } }) {
  const name = decodeURIComponent(params.name);
  const userPosts = useUserPosts();
  const all = [...userPosts, ...COMMUNITY_POSTS];
  const posts = all.filter((p) => !p.isAnon && p.author === name);

  return (
    <div className="max-w-[680px] mx-auto">
      <PageHeader title={`${name}님의 글`} />

      <div className="px-4 md:px-6 pt-4 pb-3 flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-[#FBF0EC] flex items-center justify-center text-[1.1rem] font-bold text-[#D04020] flex-shrink-0">
          {name.charAt(0)}
        </div>
        <div>
          <div className="text-[1rem] font-bold">{name}</div>
          <div className="text-[0.75rem] text-[#888070]">작성 글 {posts.length}개</div>
        </div>
      </div>

      <div className="px-4 md:px-6 pb-6 flex flex-col gap-3">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-[#888070]">
            <div className="text-4xl mb-3">🗒️</div>
            <div className="text-[0.85rem] font-medium mb-3">아직 작성한 글이 없어요</div>
            <Link href="/community" className="text-[0.8rem] text-[#D04020] font-semibold hover:underline">
              커뮤니티 둘러보기 →
            </Link>
          </div>
        ) : (
          posts.map((post) => <CommunityPostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}
