"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { JobType, VisaType } from "@/data/jobs";
import { updateUserItem } from "@/lib/userContent";

const DRAFT_KEY = "sori_jobs_draft";
const SAVED_KEY = "sori_user_jobs";

interface RawJob {
  id: string;
  company: string;
  title: string;
  jobType: JobType;
  visaSponsored: boolean;
  visaType: VisaType;
  salary: string;
  location: string;
  koreanRequired: boolean;
  tags: string[];
  deadline: string;
  description: string;
  requirements: string[];
  preferred: string[];
  benefits: string[];
  createdAt: string;
}

const JOB_TYPES: JobType[] = ["정규직", "계약직", "파트타임", "인턴"];
const VISA_TYPES: VisaType[] = ["EP", "S-Pass", "WP", "무관"];

const COMMON_AREAS = [
  "One-North", "Tanjong Pagar", "Raffles Place", "Marina Bay", "Orchard",
  "Bugis", "Jurong East", "Buona Vista", "Changi", "재택근무 가능",
];

const COMMON_TAGS = [
  "React", "Python", "Java", "TypeScript", "AWS",
  "회계", "마케팅", "디자인", "영업", "한식 조리",
  "통번역", "교사", "물류", "고객응대", "운전",
];

function JobsWriteInner() {
  const router = useRouter();
  const sp = useSearchParams();
  const editId = sp.get("edit") || "";
  const isEditMode = !!editId;

  const [hydrated, setHydrated] = useState(false);
  const [restored, setRestored] = useState(false);

  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [jobType, setJobType] = useState<JobType>("정규직");
  const [visaSponsored, setVisaSponsored] = useState(true);
  const [visaType, setVisaType] = useState<VisaType>("EP");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [location, setLocation] = useState("");
  const [koreanRequired, setKoreanRequired] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [preferred, setPreferred] = useState("");
  const [benefits, setBenefits] = useState("");

  useEffect(() => {
    try {
      if (isEditMode) {
        const raw = localStorage.getItem(SAVED_KEY);
        if (raw) {
          const arr = JSON.parse(raw) as RawJob[];
          const t = arr.find((x) => x.id === editId);
          if (t) {
            setCompany(t.company || "");
            setTitle(t.title || "");
            setJobType(t.jobType || "정규직");
            setVisaSponsored(t.visaSponsored ?? true);
            setVisaType(t.visaType || "EP");
            // salary "$min ~ $max" 형태 파싱
            const m = (t.salary || "").match(/\$([0-9,]+)\s*~\s*\$([0-9,]+)/);
            if (m) {
              setSalaryMin(m[1].trim());
              setSalaryMax(m[2].trim());
            }
            setLocation(t.location || "");
            setKoreanRequired(!!t.koreanRequired);
            setTags(t.tags || []);
            setDeadline(t.deadline || "");
            setDescription(t.description || "");
            setRequirements((t.requirements || []).join("\n"));
            setPreferred((t.preferred || []).join("\n"));
            setBenefits((t.benefits || []).join("\n"));
          }
        }
        setHydrated(true);
        return;
      }

      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        if (d.company || d.title || d.description) {
          setCompany(d.company || "");
          setTitle(d.title || "");
          setJobType(d.jobType || "정규직");
          setVisaSponsored(d.visaSponsored ?? true);
          setVisaType(d.visaType || "EP");
          setSalaryMin(d.salaryMin || "");
          setSalaryMax(d.salaryMax || "");
          setLocation(d.location || "");
          setKoreanRequired(!!d.koreanRequired);
          setTags(d.tags || []);
          setDeadline(d.deadline || "");
          setDescription(d.description || "");
          setRequirements(d.requirements || "");
          setPreferred(d.preferred || "");
          setBenefits(d.benefits || "");
          setRestored(true);
        }
      }
    } catch {}
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hydrated || isEditMode) return;
    if (!company && !title && !description) {
      localStorage.removeItem(DRAFT_KEY);
      return;
    }
    try {
      localStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({
          company, title, jobType, visaSponsored, visaType, salaryMin, salaryMax,
          location, koreanRequired, tags, deadline, description,
          requirements, preferred, benefits,
        })
      );
    } catch {}
  }, [hydrated, isEditMode, company, title, jobType, visaSponsored, visaType, salaryMin, salaryMax,
      location, koreanRequired, tags, deadline, description, requirements, preferred, benefits]);

  const canSubmit =
    company.trim() && title.trim() && location.trim() && description.trim() &&
    salaryMin.trim() && salaryMax.trim();

  const toggleTag = (t: string) => {
    setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  };

  const submit = () => {
    if (!canSubmit) return;

    if (isEditMode) {
      const patch = {
        company: company.trim(), title: title.trim(),
        jobType, visaSponsored, visaType,
        salary: `$${salaryMin.trim()} ~ $${salaryMax.trim()}`,
        location: location.trim(), koreanRequired, tags,
        deadline: deadline.trim(),
        description: description.trim(),
        requirements: requirements.split("\n").map((s) => s.trim()).filter(Boolean),
        preferred: preferred.split("\n").map((s) => s.trim()).filter(Boolean),
        benefits: benefits.split("\n").map((s) => s.trim()).filter(Boolean),
      };
      const ok = updateUserItem<RawJob>(SAVED_KEY, editId, patch);
      if (!ok) {
        alert("수정 실패: 공고를 찾을 수 없거나 저장 공간이 부족합니다.");
        return;
      }
      alert("✅ 공고가 수정되었습니다!");
      router.push(`/jobs/${editId}`);
      return;
    }

    const newItem = {
      id: `user-job-${Date.now()}`,
      company: company.trim(), title: title.trim(),
      jobType, visaSponsored, visaType,
      salary: `$${salaryMin.trim()} ~ $${salaryMax.trim()}`,
      location: location.trim(), koreanRequired, tags,
      deadline: deadline.trim(),
      description: description.trim(),
      requirements: requirements.split("\n").map((s) => s.trim()).filter(Boolean),
      preferred: preferred.split("\n").map((s) => s.trim()).filter(Boolean),
      benefits: benefits.split("\n").map((s) => s.trim()).filter(Boolean),
      createdAt: new Date().toISOString(),
    };
    try {
      const raw = localStorage.getItem(SAVED_KEY);
      const arr = raw ? (JSON.parse(raw) as unknown[]) : [];
      arr.unshift(newItem);
      localStorage.setItem(SAVED_KEY, JSON.stringify(arr));
      localStorage.removeItem(DRAFT_KEY);
    } catch (err) {
      console.error("공고 저장 실패:", err);
      alert("등록 실패: 저장 공간이 부족합니다.\n마이페이지에서 옛 공고를 삭제 후 다시 시도해주세요.");
      return;
    }
    alert("✅ 공고가 등록되었습니다!");
    router.push("/jobs");
  };

  const discardDraft = () => {
    setCompany(""); setTitle(""); setJobType("정규직");
    setVisaSponsored(true); setVisaType("EP");
    setSalaryMin(""); setSalaryMax(""); setLocation("");
    setKoreanRequired(false); setTags([]); setDeadline("");
    setDescription(""); setRequirements(""); setPreferred(""); setBenefits("");
    setRestored(false);
    localStorage.removeItem(DRAFT_KEY);
  };

  return (
    <div className="max-w-[480px] mx-auto min-h-screen bg-white shadow-[0_0_60px_rgba(0,0,0,0.12)]">
      {/* 헤더 */}
      <div className="sticky top-0 z-50 bg-white border-b border-black/[0.08] px-4 h-[56px] flex items-center justify-between">
        <button onClick={() => router.back()} className="text-[0.9rem] text-[#888070]" aria-label="닫기">✕</button>
        <span className="text-[0.9rem] font-bold">{isEditMode ? "공고 수정" : "채용 공고 등록"}</span>
        <button
          onClick={submit}
          disabled={!canSubmit}
          className={`text-[0.85rem] font-bold px-3 py-1 rounded-full transition-colors ${
            canSubmit ? "bg-[#2B7A50] text-white" : "bg-[#F0EDE8] text-[#888070]"
          }`}
        >
          {isEditMode ? "수정" : "등록"}
        </button>
      </div>

      {restored && (
        <div className="mx-4 mt-3 bg-[#EBF0FB] border border-[#2050A0]/20 rounded-[10px] px-3 py-2 flex items-center gap-2">
          <span className="text-sm">📝</span>
          <span className="text-[0.75rem] text-[#2050A0] flex-1">작성 중이던 공고를 복원했어요</span>
          <button onClick={discardDraft} className="text-[0.72rem] text-[#888070] hover:text-[#D04020]">
            지우기
          </button>
        </div>
      )}

      <div className="px-4 py-4 pb-32 space-y-6">
        {/* 1. 회사 & 직무 */}
        <section>
          <SectionTitle index="1" title="회사 & 직무" required />
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="회사명 (예: Samsung Electronics SG)"
            className="w-full bg-[#F5F3EE] rounded-[10px] px-4 py-3 text-[0.88rem] outline-none placeholder:text-[#C0BBB0] mb-2"
          />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="직무 제목 (예: Senior Software Engineer)"
            className="w-full bg-[#F5F3EE] rounded-[10px] px-4 py-3 text-[0.88rem] font-bold outline-none placeholder:text-[#C0BBB0] placeholder:font-normal"
          />
        </section>

        {/* 2. 고용 형태 */}
        <section>
          <SectionTitle index="2" title="고용 형태" required />
          <div className="grid grid-cols-4 gap-2">
            {JOB_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setJobType(t)}
                className={`py-2 rounded-[10px] text-[0.78rem] font-medium border-2 transition-all ${
                  jobType === t
                    ? "border-[#2B7A50] bg-[#EBF5F0] text-[#2B7A50]"
                    : "border-black/[0.08] bg-white text-[#888070]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </section>

        {/* 3. 비자 */}
        <section>
          <SectionTitle index="3" title="비자 종류 / 스폰서" required />
          <div className="grid grid-cols-4 gap-2 mb-2">
            {VISA_TYPES.map((v) => (
              <button
                key={v}
                onClick={() => setVisaType(v)}
                className={`py-2 rounded-[10px] text-[0.78rem] font-medium border-2 transition-all ${
                  visaType === v
                    ? "border-[#2050A0] bg-[#EBF0FB] text-[#2050A0]"
                    : "border-black/[0.08] bg-white text-[#888070]"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          <button
            onClick={() => setVisaSponsored(!visaSponsored)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-[10px] border-2 transition-all ${
              visaSponsored
                ? "border-[#2050A0] bg-[#EBF0FB]"
                : "border-black/[0.08] bg-white"
            }`}
          >
            <span className="text-[0.82rem] font-medium text-left flex-1">
              비자 스폰서 제공
              <span className="block text-[0.68rem] text-[#888070] font-normal">
                회사에서 EP/S-Pass 등 비자 신청·스폰서 지원
              </span>
            </span>
            <span className={`inline-block w-10 h-6 rounded-full flex-shrink-0 transition-colors relative ${
              visaSponsored ? "bg-[#2050A0]" : "bg-[#C0BBB0]"
            }`}>
              <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                visaSponsored ? "translate-x-4" : "translate-x-0"
              }`} />
            </span>
          </button>
        </section>

        {/* 4. 급여 */}
        <section>
          <SectionTitle index="4" title="월 급여 (SGD)" required />
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[0.85rem] font-bold text-[#D04020] pointer-events-none">$</span>
              <input
                type="text"
                value={salaryMin}
                onChange={(e) => setSalaryMin(e.target.value)}
                placeholder="최소 (6,000)"
                className="w-full bg-[#F5F3EE] rounded-[10px] pl-7 pr-3 py-3 text-[0.88rem] font-bold outline-none placeholder:text-[#C0BBB0] placeholder:font-normal"
              />
            </div>
            <span className="text-[#888070]">~</span>
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[0.85rem] font-bold text-[#D04020] pointer-events-none">$</span>
              <input
                type="text"
                value={salaryMax}
                onChange={(e) => setSalaryMax(e.target.value)}
                placeholder="최대 (9,000)"
                className="w-full bg-[#F5F3EE] rounded-[10px] pl-7 pr-3 py-3 text-[0.88rem] font-bold outline-none placeholder:text-[#C0BBB0] placeholder:font-normal"
              />
            </div>
          </div>
          <p className="text-[0.68rem] text-[#888070] mt-1">
            💡 2026년 EP 최저 기준은 SGD 6,000 (금융권 6,600)입니다.
          </p>
        </section>

        {/* 5. 근무지 */}
        <section>
          <SectionTitle index="5" title="근무지" required />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="예: One-North · Buona Vista"
            className="w-full bg-[#F5F3EE] rounded-[10px] px-4 py-3 text-[0.85rem] outline-none placeholder:text-[#C0BBB0] mb-2"
          />
          <div className="flex flex-wrap gap-[5px]">
            {COMMON_AREAS.map((a) => (
              <button
                key={a}
                onClick={() => setLocation(a)}
                className="text-[0.7rem] rounded-full px-3 py-[4px] border bg-white text-[#888070] border-black/[0.08] hover:border-[#2B7A50] hover:text-[#2B7A50]"
              >
                {a}
              </button>
            ))}
          </div>
        </section>

        {/* 6. 한국어 */}
        <section>
          <SectionTitle index="6" title="한국어 필수 여부" />
          <button
            onClick={() => setKoreanRequired(!koreanRequired)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-[10px] border-2 transition-all ${
              koreanRequired
                ? "border-[#D04020] bg-[#FBF0EC]"
                : "border-black/[0.08] bg-white"
            }`}
          >
            <span className="text-[0.82rem] font-medium text-left flex-1">
              🇰🇷 한국어 필수
              <span className="block text-[0.68rem] text-[#888070] font-normal">
                업무에 한국어 사용이 필수인지 여부
              </span>
            </span>
            <span className={`inline-block w-10 h-6 rounded-full flex-shrink-0 transition-colors relative ${
              koreanRequired ? "bg-[#D04020]" : "bg-[#C0BBB0]"
            }`}>
              <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                koreanRequired ? "translate-x-4" : "translate-x-0"
              }`} />
            </span>
          </button>
        </section>

        {/* 7. 기술/직무 키워드 */}
        <section>
          <SectionTitle index="7" title="기술 / 직무 키워드" />
          <div className="flex flex-wrap gap-2 mb-2">
            {COMMON_TAGS.map((t) => {
              const sel = tags.includes(t);
              return (
                <button
                  key={t}
                  onClick={() => toggleTag(t)}
                  className={`text-[0.72rem] rounded-full px-3 py-[5px] border transition-colors ${
                    sel
                      ? "bg-[#181614] text-white border-[#181614]"
                      : "bg-white text-[#888070] border-black/[0.08] hover:border-black/[0.15]"
                  }`}
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {sel ? "✓ " : ""}{t}
                </button>
              );
            })}
          </div>
          <p className="text-[0.68rem] text-[#888070]">자유롭게 여러 개 선택할 수 있어요.</p>
        </section>

        {/* 8. 마감일 */}
        <section>
          <SectionTitle index="8" title="지원 마감일" />
          <input
            type="text"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            placeholder="예: 2026-06-30 또는 채용시까지"
            className="w-full bg-[#F5F3EE] rounded-[10px] px-4 py-3 text-[0.85rem] outline-none placeholder:text-[#C0BBB0]"
          />
        </section>

        {/* 9. 직무 설명 */}
        <section>
          <SectionTitle index="9" title="직무 설명" required />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            placeholder="어떤 일을 하게 되는지, 팀 구성, 업무 범위 등을 적어주세요."
            className="w-full bg-[#F5F3EE] rounded-[10px] px-4 py-3 text-[0.85rem] leading-relaxed outline-none placeholder:text-[#C0BBB0] resize-none"
          />
        </section>

        {/* 10. 자격 요건 */}
        <section>
          <SectionTitle index="10" title="자격 요건" />
          <textarea
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            rows={5}
            placeholder={`줄 단위로 한 항목씩 적어주세요.\n\n예시:\n경력 3년 이상\nReact / TypeScript 실무 경험\n영어 비즈니스 커뮤니케이션 가능`}
            className="w-full bg-[#F5F3EE] rounded-[10px] px-4 py-3 text-[0.85rem] leading-relaxed outline-none placeholder:text-[#C0BBB0] resize-none"
          />
        </section>

        {/* 11. 우대 사항 */}
        <section>
          <SectionTitle index="11" title="우대 사항 (선택)" />
          <textarea
            value={preferred}
            onChange={(e) => setPreferred(e.target.value)}
            rows={4}
            placeholder="줄 단위로 한 항목씩"
            className="w-full bg-[#F5F3EE] rounded-[10px] px-4 py-3 text-[0.85rem] leading-relaxed outline-none placeholder:text-[#C0BBB0] resize-none"
          />
        </section>

        {/* 12. 복지 */}
        <section>
          <SectionTitle index="12" title="복지 / 혜택 (선택)" />
          <textarea
            value={benefits}
            onChange={(e) => setBenefits(e.target.value)}
            rows={4}
            placeholder={`예시:\n연간 성과급 1~4개월\n의료보험 + 치과보험\n유연근무제 (주 2회 재택)`}
            className="w-full bg-[#F5F3EE] rounded-[10px] px-4 py-3 text-[0.85rem] leading-relaxed outline-none placeholder:text-[#C0BBB0] resize-none"
          />
        </section>

        <div className="bg-[#FBF5E8] border border-[#E8D090] rounded-[10px] p-3 flex items-start gap-2">
          <span className="text-sm">💡</span>
          <p className="text-[0.72rem] text-[#B07010] leading-relaxed">
            허위 공고·차별 표현(연령/성별/국적 등)은 사전 고지 없이 삭제됩니다.
            지원자 응대 및 비자 처리 책임은 등록 회사에 있습니다.
          </p>
        </div>

        {hydrated && (company || title || description) && (
          <div className="text-center text-[0.7rem] text-[#C0BBB0]">💾 자동 저장 중</div>
        )}
      </div>
    </div>
  );
}

export default function JobsWritePage() {
  return (
    <Suspense fallback={<div className="p-6 text-[#888070]">불러오는 중…</div>}>
      <JobsWriteInner />
    </Suspense>
  );
}

function SectionTitle({ index, title, required }: { index: string; title: string; required?: boolean }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <span
        className="w-5 h-5 rounded-full bg-[#181614] text-white text-[0.62rem] font-bold flex items-center justify-center"
        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
      >
        {index}
      </span>
      <span className="text-[0.88rem] font-bold">{title}</span>
      {required && <span className="text-[#D04020] text-[0.78rem]">*</span>}
    </div>
  );
}
