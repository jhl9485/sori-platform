"use client";

import { useEffect, useState } from "react";

export interface JobAnswer {
  content: string;
  createdAt: string;
}

export interface JobQuestion {
  id: string;
  author: string;
  avatarChar: string;
  content: string;
  createdAt: string;
  /** 공고 작성자만 달 수 있다. 없으면 아직 미답변. */
  answer?: JobAnswer;
}

// { [공고id]: JobQuestion[] } — 백엔드가 없어 이 브라우저에만 저장된다.
const KEY = "sori_job_questions";

type QuestionMap = Record<string, JobQuestion[]>;

function read(): QuestionMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY);
    const obj = raw ? JSON.parse(raw) : {};
    return obj && typeof obj === "object" ? obj : {};
  } catch {
    return {};
  }
}

function write(map: QuestionMap): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(map));
    window.dispatchEvent(new StorageEvent("storage", { key: KEY }));
  } catch {
    /* quota 초과 등 무시 */
  }
}

export function useJobQuestions(jobId: string): JobQuestion[] {
  const [list, setList] = useState<JobQuestion[]>([]);

  useEffect(() => {
    const refresh = () => setList(read()[jobId] ?? []);
    refresh();
    const handler = (e: StorageEvent) => { if (e.key === KEY) refresh(); };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [jobId]);

  return list;
}

export function addQuestion(jobId: string, q: JobQuestion): void {
  const map = read();
  map[jobId] = [...(map[jobId] ?? []), q];
  write(map);
}

export function removeQuestion(jobId: string, questionId: string): void {
  const map = read();
  const next = (map[jobId] ?? []).filter((q) => q.id !== questionId);
  if (next.length > 0) map[jobId] = next;
  else delete map[jobId];
  write(map);
}

/** 답변 등록/수정 — 호출 측에서 공고 작성자인지 반드시 확인할 것 */
export function answerQuestion(jobId: string, questionId: string, content: string): void {
  const map = read();
  map[jobId] = (map[jobId] ?? []).map((q) =>
    q.id === questionId ? { ...q, answer: { content, createdAt: new Date().toISOString() } } : q
  );
  write(map);
}
