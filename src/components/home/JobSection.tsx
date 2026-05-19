const jobs = [
  {
    emoji: "🏢",
    bg: "bg-[#EBF0FB]",
    title: "마케팅 매니저",
    company: "ABC Korea Pte Ltd",
    tags: [
      { label: "EP 스폰서", style: "bg-[#EBF0FB] text-[#2050A0] border-[rgba(32,80,160,0.15)]" },
      { label: "한국어 必", style: "bg-[#FBF0EC] text-[#D04020] border-[rgba(208,64,32,0.15)]" },
      { label: "$6K~8K", style: "bg-[#F5F3EE] text-[#888070] border-black/[0.08]" },
    ],
  },
  {
    emoji: "💻",
    bg: "bg-[#EBF5F0]",
    title: "풀스택 개발자",
    company: "Tech Startup SG",
    tags: [
      { label: "EP 스폰서", style: "bg-[#EBF0FB] text-[#2050A0] border-[rgba(32,80,160,0.15)]" },
      { label: "React/Node", style: "bg-[#F5F3EE] text-[#888070] border-black/[0.08]" },
      { label: "$8K~12K", style: "bg-[#F5F3EE] text-[#888070] border-black/[0.08]" },
    ],
  },
  {
    emoji: "🍽️",
    bg: "bg-[#FBF0EC]",
    title: "한식 조리사",
    company: "강남부식 Pte Ltd",
    tags: [
      { label: "S-Pass", style: "bg-[#F5F3EE] text-[#888070] border-black/[0.08]" },
      { label: "한국어 必", style: "bg-[#FBF0EC] text-[#D04020] border-[rgba(208,64,32,0.15)]" },
      { label: "$3.5K~4K", style: "bg-[#F5F3EE] text-[#888070] border-black/[0.08]" },
    ],
  },
];

export default function JobSection() {
  return (
    <section className="mt-1">
      <div className="h-px bg-black/[0.08] mx-4 mb-5" />
      <div className="flex justify-between items-center px-4 pb-[10px]">
        <h2 className="text-base font-bold tracking-tight">최신 채용공고</h2>
        <button className="text-[0.78rem] text-[#D04020] font-medium">전체보기</button>
      </div>
      <div className="flex gap-[10px] px-4 pb-[10px] overflow-x-auto scrollbar-hide">
        {jobs.map((job) => (
          <div
            key={job.title}
            className="flex-shrink-0 w-[220px] bg-white rounded-[14px] border border-black/[0.08] p-[14px] cursor-pointer hover:-translate-y-0.5 transition-transform"
          >
            <div
              className={`w-9 h-9 rounded-[10px] flex items-center justify-center text-[1.1rem] mb-2 ${job.bg}`}
            >
              {job.emoji}
            </div>
            <div className="text-[0.85rem] font-bold mb-[2px]">{job.title}</div>
            <div className="text-[0.75rem] text-[#888070] mb-2">{job.company}</div>
            <div className="flex flex-wrap gap-1">
              {job.tags.map((tag) => (
                <span
                  key={tag.label}
                  className={`text-[0.68rem] border rounded-[6px] px-[7px] py-[2px] ${tag.style}`}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
