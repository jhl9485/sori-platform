import type { Metadata } from "next";
import { JOBS } from "@/data/jobs";
import { salaryText } from "@/lib/jobStatus";
import JobDetailClient from "./JobDetailClient";

// 상세 화면 본체는 "use client"라 generateMetadata를 붙일 수 없다(서버 전용 기능).
// 그래서 이 얇은 서버 페이지가 제목·설명만 만들고, 화면은 클라이언트 쪽에 넘긴다.
export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const job = JOBS.find((j) => j.id === params.id);
  // 사용자가 올린 공고는 localStorage에만 있어 서버에서 찾을 수 없다.
  // 못 찾아도 404로 만들지 않고 일반 제목으로 빠진다(화면은 클라이언트가 정상 렌더).
  if (!job) return { title: "채용" }; // layout의 template("%s · SORI")이 붙여주므로 여기서 SORI를 또 쓰지 않는다

  const title = `${job.title} · ${job.company}`;
  // 연봉 표기는 목록·상세와 같은 규칙을 쓰려고 salaryText()를 재사용한다.
  const description = `${job.location} · ${job.jobType} · ${salaryText(job.salary)} · ${job.description}`.slice(0, 150);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function Page({ params }: { params: { id: string } }) {
  return <JobDetailClient params={params} />;
}
