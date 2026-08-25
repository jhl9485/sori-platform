import { Fragment, type ReactNode } from "react";
import Linkify from "@/components/shared/Linkify";

// 줄 전체가 **로 감싸진 "소제목" 줄인지. 안쪽에 별표가 또 있으면(예: "**A** 그리고 **B**")
// 소제목이 아니라 본문이므로 제외한다 — 그런 줄까지 소제목으로 삼으면 문장 전체가 굵어진다.
const BOLD_LINE = /^\*\*[^*]+\*\*$/;

/**
 * 줄 "안쪽"에 섞인 **굵게**를 <strong>으로 바꾼다. (예: "비단독주택 **-0.1%** (RCR ...)")
 * 예전에는 줄 전체가 감싸진 경우만 처리해서, 문장 중간에 섞이면 별표가 그대로 화면에 보였다.
 * 뉴스 데이터에만 그런 줄이 250개라 데이터를 일일이 고칠 규모가 아니라 표시 쪽에서 푼다.
 *
 * 굵게가 아닌 조각은 그대로 Linkify로 넘긴다 — 굵게를 넣느라 링크·이메일·전화 감지를 잃으면 안 된다.
 * linkify=false는 원래 링크를 걸지 않던 자리(표 셀·벼룩 상세)의 모양을 그대로 두기 위한 것이다.
 */
export function renderInline(text: string, linkify = true): ReactNode {
  if (!text.includes("**")) return linkify ? <Linkify text={text} /> : text;
  // 짝이 맞는 **...**만 잘라낸다. 짝이 없는 별표는 원문 그대로 남는다(원문을 함부로 지우지 않는다).
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (!part) return null;
    if (BOLD_LINE.test(part)) {
      return <strong key={i} className="font-bold">{part.slice(2, -2)}</strong>;
    }
    return <Fragment key={i}>{linkify ? <Linkify text={part} /> : part}</Fragment>;
  });
}

export function renderMarkdown(fullContent: string): ReactNode {
  const allLines = fullContent.split("\n");
  return allLines.map((line, i) => {
    if (BOLD_LINE.test(line)) {
      return (
        <p key={i} className="font-bold text-[0.9rem] mt-5 mb-2 text-[#181614]">
          {line.slice(2, -2)}
        </p>
      );
    }
    if (line.startsWith("- ")) {
      return (
        <li key={i} className="text-[0.85rem] text-[#181614] leading-relaxed ml-4 list-disc">
          {renderInline(line.slice(2))}
        </li>
      );
    }
    if (line.startsWith("|") && line.endsWith("|")) {
      if (line.includes("---")) return null;
      const cells = line.split("|").filter((c) => c.trim());
      const isHeader = allLines[i + 1]?.includes("---");
      return (
        <div
          key={i}
          className={`flex gap-3 text-[0.82rem] py-[6px] border-b border-black/[0.05] ${
            isHeader ? "font-bold bg-[#F5F3EE] px-2 rounded-t-lg" : "px-2"
          }`}
        >
          {cells.map((c, j) => (
            // 셀은 원래 링크를 걸지 않았으므로 굵게만 처리한다(표의 기존 모양 유지).
            <span key={j} className="flex-1 min-w-0">{renderInline(c.trim(), false)}</span>
          ))}
        </div>
      );
    }
    if (line.trim() === "") return <br key={i} />;
    return (
      <p key={i} className="text-[0.85rem] text-[#181614] leading-relaxed">
        {renderInline(line)}
      </p>
    );
  }).map((node, i) => <Fragment key={i}>{node}</Fragment>);
}
