"use client";

// 등록 버튼이 회색으로 잠겨 있기만 하고 "무엇이 비었는지"는 아무 말이 없었다(기-27).
// 버튼은 h-[56px] 고정 헤더의 오른쪽 끝에 있어 그 옆에 글자를 넣을 자리가 없다.
// 그래서 헤더 바로 아래(top-[56px])에 함께 붙어 다니는 한 줄을 둔다 —
// 폼 아래쪽을 채우는 동안에도 계속 보여야 "왜 안 눌리지"가 풀리기 때문이다.
//
// 이 파일을 따로 둔 이유: 작성 화면이 5곳(커뮤니티·부동산·벼룩·채용·업소)이고 헤더 구조가 전부 같다.
// 각자 붙이면 문구와 모양이 곧 갈라진다. 한 부품으로 모아 5곳이 같은 말을 하게 한다.
//
// 넘겨받는 missing은 각 화면의 canSubmit과 같은 조건에서 뽑아야 한다.
// (호출부에서 canSubmit = missing.length === 0 으로 두면 둘이 어긋날 수 없다)

export default function MissingFieldsHint({ missing }: { missing: string[] }) {
  if (missing.length === 0) return null;

  return (
    <div className="sticky top-[56px] z-40 bg-[#FBF5E8] border-b border-[#E8D090] px-4 py-2">
      <p className="text-[0.72rem] text-[#B07010] leading-relaxed">
        아직 안 채운 곳: <strong>{missing.join(" · ")}</strong>
        <span className="text-[#B07010]/75"> — 다 채우면 오른쪽 위 버튼이 켜져요</span>
      </p>
    </div>
  );
}
