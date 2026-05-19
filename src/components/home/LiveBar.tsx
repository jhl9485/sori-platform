const chips = [
  { dot: true, text: "지금 SGD $1 = ₩1,048" },
  { dot: false, text: "🌤 34°C 습도 78%" },
  { dot: false, text: "🚇 MRT 정상 운행" },
  { dot: false, text: "📢 한인회 6월 행사" },
];

export default function LiveBar() {
  return (
    <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide">
      {chips.map((chip, i) => (
        <div
          key={i}
          className="flex-shrink-0 bg-white border border-black/[0.08] rounded-full px-3 py-[5px] text-[0.75rem] flex items-center gap-[5px] whitespace-nowrap text-[#181614]"
        >
          {chip.dot && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#2B7A50] animate-pulse-dot" />
          )}
          {chip.text}
        </div>
      ))}
    </div>
  );
}
