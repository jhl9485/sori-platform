import { Fragment, type ReactNode } from "react";

export function renderMarkdown(fullContent: string): ReactNode {
  const allLines = fullContent.split("\n");
  return allLines.map((line, i) => {
    if (line.startsWith("**") && line.endsWith("**") && line.length > 4) {
      return (
        <p key={i} className="font-bold text-[0.9rem] mt-5 mb-2 text-[#181614]">
          {line.replace(/\*\*/g, "")}
        </p>
      );
    }
    if (line.startsWith("- ")) {
      return (
        <li key={i} className="text-[0.85rem] text-[#181614] leading-relaxed ml-4 list-disc">
          {line.slice(2)}
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
            <span key={j} className="flex-1 min-w-0">{c.trim()}</span>
          ))}
        </div>
      );
    }
    if (line.trim() === "") return <br key={i} />;
    return (
      <p key={i} className="text-[0.85rem] text-[#181614] leading-relaxed">
        {line}
      </p>
    );
  }).map((node, i) => <Fragment key={i}>{node}</Fragment>);
}
