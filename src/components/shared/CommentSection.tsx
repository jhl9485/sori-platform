"use client";

import { useEffect, useState } from "react";
import type { Comment } from "@/data/communityPosts";
import { useProfile } from "@/lib/profile";

interface Props {
  comments: Comment[];
  postId?: string;
}

const STORAGE_KEY = "sori_user_comments";

function readAll(): Record<string, Comment[]> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeFor(postId: string, comments: Comment[]) {
  if (typeof window === "undefined") return;
  try {
    const all = readAll();
    all[postId] = comments;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {}
}

function CommentItem({ comment, depth = 0 }: { comment: Comment; depth?: number }) {
  const [liked, setLiked] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [replies, setReplies] = useState<Comment[]>(comment.replies || []);
  const [replyText, setReplyText] = useState("");

  const submitReply = () => {
    const text = replyText.trim();
    if (!text) return;
    const newReply: Comment = {
      id: `${comment.id}-r${replies.length + 1}-${Date.now()}`,
      author: "나",
      avatarChar: "나",
      avatarBg: "#FBF0EC",
      avatarColor: "#D04020",
      content: text,
      time: "방금 전",
      likes: 0,
    };
    setReplies([...replies, newReply]);
    setReplyText("");
    setShowReply(false);
  };

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
          <button
            onClick={() => {
              const reason = window.prompt("신고 사유를 적어주세요 (선택)\n\n예: 욕설, 스팸, 음란/혐오, 광고, 허위정보 등");
              if (reason !== null) {
                alert("신고가 접수되었습니다. 검토 후 조치하겠습니다.");
              }
            }}
            className="text-[0.72rem] text-[#888070] hover:text-[#D04020]"
          >
            신고
          </button>
        </div>
        {showReply && (
          <div className="mt-2 pl-9">
            <div className="flex gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") submitReply(); }}
                placeholder="답글을 입력하세요..."
                className="flex-1 bg-[#F5F3EE] rounded-full px-3 py-[6px] text-[0.78rem] outline-none"
                autoFocus
              />
              <button
                onClick={submitReply}
                disabled={!replyText.trim()}
                className={`px-3 py-[6px] rounded-full text-[0.75rem] font-medium ${
                  replyText.trim() ? "bg-[#181614] text-white" : "bg-[#F0EDE8] text-[#C0BBB0]"
                }`}
              >
                등록
              </button>
            </div>
          </div>
        )}
      </div>
      {replies.map((reply) => (
        <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
      ))}
    </div>
  );
}

export default function CommentSection({ comments, postId }: Props) {
  // 정적 댓글 + 사용자 추가 댓글 (localStorage) 병합
  const { profile } = useProfile();
  const [userComments, setUserComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isAnon, setIsAnon] = useState(false);

  useEffect(() => {
    if (!postId) return;
    const all = readAll();
    setUserComments(all[postId] || []);
  }, [postId]);

  const list = [...comments, ...userComments];

  const submitComment = () => {
    const text = newComment.trim();
    if (!text) return;
    const c: Comment = isAnon
      ? {
          id: `c-${Date.now()}`,
          isAnon: true,
          author: "익명",
          avatarChar: "?",
          avatarBg: "#F0EDE8",
          avatarColor: "#888070",
          content: text,
          time: "방금 전",
          likes: 0,
        }
      : {
          id: `c-${Date.now()}`,
          author: profile.name,
          avatarChar: profile.avatarChar,
          avatarBg: "#FBF0EC",
          avatarColor: "#D04020",
          content: text,
          time: "방금 전",
          likes: 0,
        };
    const next = [...userComments, c];
    setUserComments(next);
    if (postId) writeFor(postId, next);
    setNewComment("");
  };

  return (
    <div className="bg-white border-t border-black/[0.06]">
      {/* 댓글 입력 */}
      <div className="px-4 md:px-6 py-4 border-b border-black/[0.06]">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[0.78rem] font-bold">댓글 {list.length}개</span>
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
            onKeyDown={(e) => { if (e.key === "Enter") submitComment(); }}
            placeholder="댓글을 입력하세요..."
            maxLength={500}
            className="flex-1 bg-[#F5F3EE] rounded-full px-4 py-[8px] text-[0.82rem] outline-none min-w-0"
          />
          <button
            onClick={submitComment}
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
        {list.length === 0 ? (
          <div className="py-10 text-center text-[#888070] text-[0.82rem]">
            첫 댓글을 남겨보세요 💬
          </div>
        ) : (
          list.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
}
