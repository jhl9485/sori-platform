"use client";

import { useState } from "react";
import type { Comment } from "@/data/communityPosts";

interface Props {
  comments: Comment[];
  postId: string;
}

function CommentItem({ comment, depth = 0 }: { comment: Comment; depth?: number }) {
  const [liked, setLiked] = useState(false);
  const [showReply, setShowReply] = useState(false);

  return (
    <div className={depth > 0 ? "ml-8 border-l-2 border-black/[0.05] pl-3" : ""}>
      <div className="py-3">
        <div className="flex items-center gap-2 mb-1">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-[0.8rem] font-bold flex-shrink-0"
            style={{ background: comment.avatarBg, color: comment.avatarColor }}
          >
            {comment.avatarChar}
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[0.78rem] font-semibold">{comment.author}</span>
            <span className="text-[0.68rem] text-[#888070] ml-2">{comment.time}</span>
          </div>
        </div>
        <p className="text-[0.82rem] text-[#181614] leading-relaxed mb-2 pl-9">{comment.content}</p>
        <div className="flex items-center gap-3 pl-9">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-1 text-[0.72rem] transition-colors ${liked ? "text-[#D04020]" : "text-[#888070]"}`}
          >
            {liked ? "❤️" : "🤍"} {comment.likes + (liked ? 1 : 0)}
          </button>
          {depth === 0 && (
            <button
              onClick={() => setShowReply(!showReply)}
              className="text-[0.72rem] text-[#888070] hover:text-[#181614]"
            >
              답글
            </button>
          )}
          <button className="text-[0.72rem] text-[#888070] hover:text-[#D04020]">신고</button>
        </div>
        {showReply && (
          <div className="mt-2 pl-9">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="답글을 입력하세요..."
                className="flex-1 bg-[#F5F3EE] rounded-full px-3 py-[6px] text-[0.78rem] outline-none"
              />
              <button className="bg-[#181614] text-white px-3 py-[6px] rounded-full text-[0.75rem] font-medium">
                등록
              </button>
            </div>
          </div>
        )}
      </div>
      {comment.replies?.map((reply) => (
        <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
      ))}
    </div>
  );
}

export default function CommentSection({ comments }: Props) {
  const [newComment, setNewComment] = useState("");
  const [isAnon, setIsAnon] = useState(false);

  return (
    <div className="bg-white border-t border-black/[0.06]">
      {/* 댓글 입력 */}
      <div className="px-4 md:px-6 py-4 border-b border-black/[0.06]">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[0.78rem] font-bold">댓글 {comments.length}개</span>
          <button
            onClick={() => setIsAnon(!isAnon)}
            className={`ml-auto text-[0.7rem] px-2 py-[3px] rounded-full border transition-colors ${
              isAnon ? "bg-[#181614] text-white border-[#181614]" : "text-[#888070] border-black/[0.1]"
            }`}
          >
            🎭 {isAnon ? "익명 ON" : "익명 OFF"}
          </button>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요..."
            className="flex-1 bg-[#F5F3EE] rounded-full px-4 py-[8px] text-[0.82rem] outline-none"
          />
          <button
            disabled={!newComment.trim()}
            className={`px-4 py-[8px] rounded-full text-[0.78rem] font-bold transition-colors ${
              newComment.trim() ? "bg-[#D04020] text-white" : "bg-[#F0EDE8] text-[#C0BBB0]"
            }`}
          >
            등록
          </button>
        </div>
      </div>

      {/* 댓글 목록 */}
      <div className="px-4 md:px-6 divide-y divide-black/[0.04]">
        {comments.length === 0 ? (
          <div className="py-10 text-center text-[#888070] text-[0.82rem]">
            첫 댓글을 남겨보세요 💬
          </div>
        ) : (
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
}
