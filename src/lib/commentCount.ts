import { SAMPLE_COMMENTS, type Comment } from "@/data/communityPosts";

// 예시 댓글 수 세기 — 답글까지 포함한다.
// 원래 lib/comments.ts 안에 있었는데, 그 파일은 "use client"라서 서버 컴포넌트가 못 쓴다.
// 커뮤니티 상세의 구조화 데이터(commentCount)를 서버에서 만들어야 해서 순수 계산만 이리로 옮겼다.
// 같은 계산을 두 벌 적어두면 화면 숫자와 기계가 읽는 숫자가 갈라지므로 구현은 여기 하나만 둔다.
//
// 답글을 왜 포함하나: 글 1은 화면에 말풍선이 6개(최상위 4 + 답글 2)인데 최상위만 세면 "댓글 4개"가
// 나왔다. 사용자가 세는 것은 화면에 보이는 말풍선 수다.
// 답글은 2단계까지 달릴 수 있어(CommentSection의 depth < 2) 재귀로 센다.
function countWithReplies(list: Comment[] | undefined): number {
  if (!list) return 0;
  return list.reduce((sum, c) => sum + 1 + countWithReplies(c.replies), 0);
}

export function baseCommentCount(postId: string): number {
  return countWithReplies(SAMPLE_COMMENTS[postId]);
}
