"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Comment } from "@/data/communityPosts";
import { useProfile } from "@/lib/profile";
import { useAuth, useAuthGate, isLoggedIn } from "@/lib/auth";
import { useToggleSet } from "@/lib/storage";
import { relativeTime } from "@/lib/userContent";
import { toast, confirmDialog, reportDialog } from "@/components/shared/Feedback";

interface Props {
  comments: Comment[];
  postId?: string;
}

const STORAGE_KEY = "sori_user_comments";
const REPLIES_KEY = "sori_user_replies"; // Record<parentCommentId, Comment[]>

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
    window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
  } catch {}
}

function readAllReplies(): Record<string, Comment[]> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(REPLIES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeReplies(parentId: string, replies: Comment[]) {
  if (typeof window === "undefined") return;
  try {
    const all = readAllReplies();
    all[parentId] = replies;
    localStorage.setItem(REPLIES_KEY, JSON.stringify(all));
  } catch {}
}

function displayTime(c: Comment): string {
  return c.createdAt ? relativeTime(c.createdAt) : c.time;
}

// 자동 높이 조절 입력창 (여러 줄 지원)
function AutoTextarea({
  value,
  onChange,
  placeholder,
  maxLength,
  className,
  autoFocus,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  maxLength?: number;
  className?: string;
  autoFocus?: boolean;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 120) + "px";
    }
  }, [value]);
  return (
    <textarea
      ref={ref}
      rows={1}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      autoFocus={autoFocus}
      className={className}
    />
  );
}

interface ItemProps {
  comment: Comment;
  depth?: number;
  parentId: string | null; // 답글이면 부모 댓글 id, 최상위면 null
  userReplies: Record<string, Comment[]>;
  ownIds: Set<string>;
  highlightId: string | null;
  onAddReply: (parentId: string, reply: Comment) => void;
  onEdit: (id: string, parentId: string | null, content: string) => void;
  onDelete: (id: string, parentId: string | null) => void;
}

function CommentItem({
  comment,
  depth = 0,
  parentId,
  userReplies,
  ownIds,
  highlightId,
  onAddReply,
  onEdit,
  onDelete,
}: ItemProps) {
  const { has: isCommentLiked, toggle: toggleCommentLike } = useToggleSet("sori_comment_likes");
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(comment.content);
  const gate = useAuthGate();

  const liked = isCommentLiked(comment.id);
  const isOwn = ownIds.has(comment.id);
  const highlighted = highlightId === comment.id;

  const replies = [
    ...(comment.replies || []),
    ...(userReplies[comment.id] || []),
  ];

  const submitReply = () => {
    if (!isLoggedIn()) return;
    const text = replyText.trim();
    if (!text) return;
    const newReply: Comment = {
      id: `${comment.id}-r-${Date.now()}`,
      author: "나",
      avatarChar: "나",
      avatarBg: "#FBF0EC",
      avatarColor: "#D04020",
      content: text,
      time: "방금 전",
      createdAt: new Date().toISOString(),
      likes: 0,
    };
    onAddReply(comment.id, newReply);
    setReplyText("");
    setShowReply(false);
  };

  const saveEdit = () => {
    const text = editText.trim();
    if (!text) return;
    onEdit(comment.id, parentId, text);
    setEditing(false);
  };

  return (
    <div className={depth > 0 ? "ml-7 border-l-2 border-black/[0.05] pl-3" : ""}>
      <div
        id={`comment-${comment.id}`}
        className={`py-3 -mx-2 px-2 rounded-[10px] transition-colors duration-500 ${highlighted ? "bg-[#FFF6E9]" : ""}`}
      >
        <div className="flex items-center gap-2 mb-1">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-[0.8rem] font-bold flex-shrink-0"
            style={{ background: comment.avatarBg, color: comment.avatarColor }}
          >
            {comment.avatarChar}
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[0.78rem] font-semibold">{comment.author}</span>
            {isOwn && (
              <span className="text-[0.58rem] bg-[#FBF0EC] text-[#D04020] px-[5px] py-[1px] rounded font-bold ml-1 align-middle">나</span>
            )}
            <span className="text-[0.68rem] text-[#888070] ml-2" suppressHydrationWarning>{displayTime(comment)}</span>
          </div>
        </div>

        {editing ? (
          <div className="pl-9 mb-2">
            <AutoTextarea
              value={editText}
              onChange={setEditText}
              className="w-full bg-[#F5F3EE] rounded-[12px] px-3 py-2 text-[0.82rem] outline-none resize-none leading-relaxed"
              autoFocus
            />
            <div className="flex gap-2 mt-1">
              <button
                onClick={saveEdit}
                disabled={!editText.trim()}
                className={`px-3 py-[5px] rounded-full text-[0.72rem] font-medium ${editText.trim() ? "bg-[#181614] text-white" : "bg-[#F0EDE8] text-[#C0BBB0]"}`}
              >
                저장
              </button>
              <button
                onClick={() => { setEditText(comment.content); setEditing(false); }}
                className="px-3 py-[5px] rounded-full text-[0.72rem] text-[#888070] hover:text-[#181614]"
              >
                취소
              </button>
            </div>
          </div>
        ) : (
          <p className="text-[0.82rem] text-[#181614] leading-relaxed mb-2 pl-9 whitespace-pre-wrap">{comment.content}</p>
        )}

        {!editing && (
          <div className="flex items-center gap-2 pl-9">
            <button
              onClick={() => toggleCommentLike(comment.id)}
              className={`flex items-center gap-1 text-[0.72rem] px-1.5 py-1 -ml-1.5 rounded transition-colors ${liked ? "text-[#D04020]" : "text-[#888070] hover:text-[#D04020]"}`}
            >
              {liked ? "❤️" : "🤍"} {comment.likes + (liked ? 1 : 0)}
            </button>
            {depth < 2 && (
              <button
                onClick={() => { if (gate("답글은 로그인 후 남길 수 있어요.")) setShowReply(!showReply); }}
                className="text-[0.72rem] text-[#888070] hover:text-[#181614] px-2 py-1.5 rounded"
              >
                답글
              </button>
            )}
            {isOwn ? (
              <>
                <button
                  onClick={() => { setEditText(comment.content); setEditing(true); }}
                  className="text-[0.72rem] text-[#888070] hover:text-[#181614] px-2 py-1.5 rounded"
                >
                  수정
                </button>
                <button
                  onClick={async () => { if (await confirmDialog({ message: "이 댓글을 삭제할까요?", confirmText: "삭제", danger: true })) onDelete(comment.id, parentId); }}
                  className="text-[0.72rem] text-[#888070] hover:text-[#D04020] px-2 py-1.5 rounded"
                >
                  삭제
                </button>
              </>
            ) : (
              <button
                onClick={async () => { const reason = await reportDialog(); if (reason) toast(`신고가 접수되었어요 (${reason}). 검토 후 조치할게요.`); }}
                className="text-[0.72rem] text-[#888070] hover:text-[#D04020] px-2 py-1.5 rounded"
              >
                신고
              </button>
            )}
          </div>
        )}

        {showReply && (
          <div className="mt-2 pl-9">
            <div className="flex gap-2 items-end">
              <AutoTextarea
                value={replyText}
                onChange={setReplyText}
                placeholder="답글을 입력하세요..."
                className="flex-1 bg-[#F5F3EE] rounded-[16px] px-3 py-[7px] text-[0.78rem] outline-none resize-none leading-relaxed"
                autoFocus
              />
              <button
                onClick={submitReply}
                disabled={!replyText.trim()}
                className={`px-3 py-[7px] rounded-full text-[0.75rem] font-medium shrink-0 ${
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
        <CommentItem
          key={reply.id}
          comment={reply}
          depth={depth + 1}
          parentId={comment.id}
          userReplies={userReplies}
          ownIds={ownIds}
          highlightId={highlightId}
          onAddReply={onAddReply}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default function CommentSection({ comments, postId }: Props) {
  const { profile } = useProfile();
  const { isAuthed, hydrated } = useAuth();
  const [userComments, setUserComments] = useState<Comment[]>([]);
  const [userReplies, setUserReplies] = useState<Record<string, Comment[]>>({});
  const [newComment, setNewComment] = useState("");
  const [isAnon, setIsAnon] = useState(false);
  const [sortBy, setSortBy] = useState<"등록순" | "인기순">("등록순");
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!postId) return;
    const all = readAll();
    setUserComments(all[postId] || []);
    setUserReplies(readAllReplies());
  }, [postId]);

  const list = [...comments, ...userComments];
  const displayList = sortBy === "인기순" ? [...list].sort((a, b) => b.likes - a.likes) : list;

  const ownIds = new Set<string>([
    ...userComments.map((c) => c.id),
    ...Object.values(userReplies).flat().map((r) => r.id),
  ]);

  // 새로 단 댓글/답글로 스크롤 + 잠깐 강조
  const flashTo = (id: string) => {
    setShowAll(true); // 새 댓글이 접힌 목록에 가려지지 않게
    setHighlightId(id);
    setTimeout(() => {
      document.getElementById(`comment-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 60);
    setTimeout(() => setHighlightId((cur) => (cur === id ? null : cur)), 2200);
  };

  const handleAddReply = (parentId: string, reply: Comment) => {
    setUserReplies((prev) => {
      const next = { ...prev, [parentId]: [...(prev[parentId] || []), reply] };
      writeReplies(parentId, next[parentId]);
      return next;
    });
    flashTo(reply.id);
  };

  const handleEdit = (id: string, parentId: string | null, content: string) => {
    if (parentId === null) {
      setUserComments((prev) => {
        const next = prev.map((c) => (c.id === id ? { ...c, content } : c));
        if (postId) writeFor(postId, next);
        return next;
      });
    } else {
      setUserReplies((prev) => {
        const arr = (prev[parentId] || []).map((r) => (r.id === id ? { ...r, content } : r));
        const next = { ...prev, [parentId]: arr };
        writeReplies(parentId, arr);
        return next;
      });
    }
  };

  const handleDelete = (id: string, parentId: string | null) => {
    if (parentId === null) {
      setUserComments((prev) => {
        const next = prev.filter((c) => c.id !== id);
        if (postId) writeFor(postId, next);
        return next;
      });
    } else {
      setUserReplies((prev) => {
        const arr = (prev[parentId] || []).filter((r) => r.id !== id);
        const next = { ...prev, [parentId]: arr };
        writeReplies(parentId, arr);
        return next;
      });
    }
    toast("댓글을 삭제했어요.");
  };

  const submitComment = () => {
    if (!isLoggedIn()) return;
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
          createdAt: new Date().toISOString(),
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
          createdAt: new Date().toISOString(),
          likes: 0,
        };
    const next = [...userComments, c];
    setUserComments(next);
    if (postId) writeFor(postId, next);
    setNewComment("");
    flashTo(c.id);
  };

  return (
    <div className="bg-white border-t border-black/[0.06]">
      {/* 댓글 입력 */}
      <div className="px-4 md:px-6 py-4 border-b border-black/[0.06]">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[0.78rem] font-bold">댓글 {list.length}개</span>
          {list.length > 1 && (
            <div className="flex gap-1 ml-1">
              {(["등록순", "인기순"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  className={`text-[0.68rem] px-2 py-[2px] rounded-full transition-colors ${
                    sortBy === s ? "bg-[#F0EDE8] text-[#181614] font-semibold" : "text-[#888070]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          {(isAuthed || !hydrated) && (
            <button
              onClick={() => setIsAnon(!isAnon)}
              className={`ml-auto text-[0.7rem] px-2 py-[3px] rounded-full border transition-colors ${
                isAnon ? "bg-[#181614] text-white border-[#181614]" : "text-[#888070] border-black/[0.1]"
              }`}
            >
              🎭 {isAnon ? "익명 ON" : "익명 OFF"}
            </button>
          )}
        </div>
        {hydrated && !isAuthed ? (
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 w-full bg-[#F5F3EE] rounded-full px-4 py-[10px] text-[0.82rem] text-[#888070] hover:bg-[#EFEBE3] transition-colors"
          >
            🔒 로그인하고 댓글 남기기
          </Link>
        ) : (
          <div className="flex gap-2 items-end">
            <AutoTextarea
              value={newComment}
              onChange={setNewComment}
              placeholder="댓글을 입력하세요..."
              maxLength={500}
              className="flex-1 bg-[#F5F3EE] rounded-[18px] px-4 py-[9px] text-[0.82rem] outline-none min-w-0 resize-none leading-relaxed"
            />
            <button
              onClick={submitComment}
              disabled={!newComment.trim()}
              className={`px-4 py-[9px] rounded-full text-[0.78rem] font-bold shrink-0 transition-colors ${
                newComment.trim() ? "bg-[#D04020] text-white" : "bg-[#F0EDE8] text-[#C0BBB0]"
              }`}
            >
              등록
            </button>
          </div>
        )}
      </div>

      {/* 댓글 목록 */}
      <div className="px-4 md:px-6 divide-y divide-black/[0.04]">
        {displayList.length === 0 ? (
          <div className="py-10 text-center text-[#888070] text-[0.82rem]">
            첫 댓글을 남겨보세요 💬
          </div>
        ) : (
          (showAll ? displayList : displayList.slice(0, 5)).map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              parentId={null}
              userReplies={userReplies}
              ownIds={ownIds}
              highlightId={highlightId}
              onAddReply={handleAddReply}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
      {!showAll && displayList.length > 5 && (
        <button
          onClick={() => setShowAll(true)}
          className="w-full py-3 text-[0.82rem] font-medium text-[#888070] hover:bg-[#F5F3EE] border-t border-black/[0.05] transition-colors"
        >
          댓글 {displayList.length - 5}개 더 보기 ▾
        </button>
      )}
    </div>
  );
}
