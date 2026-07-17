"use client";

import { Fragment } from "react";
import { telHref, urlHref } from "@/lib/contact";

// 텍스트 안의 URL·이메일·전화(국제표기 +) 를 찾아 클릭 가능한 링크로 바꾼다.
// 오탐을 피하려고 전화는 '+'로 시작하는 국제표기만 링크화한다(가격·날짜·수량과 헷갈리지 않게).
const TOKEN =
  /([\w.+-]+@[a-z0-9-]+(?:\.[a-z]{2,})+|(?:https?:\/\/|www\.)[^\s<>()]+|(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:com|net|org|sg|kr|io|co|app|shop|store)(?:\.[a-z]{2})?(?:\/[^\s<>()]*)?|\+\d[\d\s-]{6,}\d)/gi;

const linkCls = "text-[#2050A0] underline underline-offset-2 break-all hover:text-[#D04020]";

function renderToken(tok: string, key: number) {
  if (tok.includes("@")) {
    return <a key={key} href={`mailto:${tok}`} className={linkCls}>{tok}</a>;
  }
  if (tok.startsWith("+")) {
    return <a key={key} href={telHref(tok)} className={linkCls}>{tok}</a>;
  }
  return (
    <a key={key} href={urlHref(tok)} target="_blank" rel="noopener noreferrer" className={linkCls}>
      {tok}
    </a>
  );
}

/** 텍스트를 받아 URL/이메일/전화를 링크로 변환해 렌더. 링크가 없으면 원문 그대로. */
export default function Linkify({ text }: { text: string }) {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(text)) !== null) {
    if (m.index > last) nodes.push(<Fragment key={key++}>{text.slice(last, m.index)}</Fragment>);
    nodes.push(renderToken(m[0], key++));
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(<Fragment key={key++}>{text.slice(last)}</Fragment>);
  return <>{nodes}</>;
}
