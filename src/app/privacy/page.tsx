import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보 처리방침",
  description: "SORI 개인정보 처리방침",
};

const SECTIONS: { h: string; body: string[] }[] = [
  {
    h: "1. 수집하는 정보",
    body: [
      "회원가입 시: 이름(닉네임), 이메일, 비자 상태.",
      "서비스 이용 시: 작성한 글·댓글, 저장·좋아요 표시, 알림 설정 등 이용 기록.",
    ],
  },
  {
    h: "2. 현재 데이터 저장 방식 (중요)",
    body: [
      "본 서비스는 현재 시범(MVP) 단계로, 이용자가 입력·생성한 정보는 이용자 본인의 기기(브라우저 저장소, localStorage)에만 저장됩니다.",
      "즉, 현 단계에서는 위 정보가 당사 서버로 전송·수집되지 않으며, 비밀번호는 어디에도 저장되지 않습니다.",
      "기기의 브라우저 데이터를 삭제하거나 설정에서 '데이터 초기화'를 실행하면 해당 정보는 즉시 삭제됩니다.",
    ],
  },
  {
    h: "3. 이용 목적",
    body: [
      "회원 식별 및 커뮤니티 활동(글·댓글·저장) 제공, 서비스 개선을 위해 사용됩니다.",
      "정식 서비스 전환 시 서버 저장·동기화가 도입되면, 변경 사항을 사전에 고지하고 별도 동의를 받습니다.",
    ],
  },
  {
    h: "4. 제3자 제공",
    body: ["이용자의 개인정보를 제3자에게 판매하거나 제공하지 않습니다."],
  },
  {
    h: "5. 이용자의 권리",
    body: [
      "이용자는 언제든지 본인 정보를 조회·수정하거나, 설정 화면의 '모든 로컬 데이터 초기화'를 통해 삭제할 수 있습니다.",
    ],
  },
  {
    h: "6. 쿠키 및 로컬 저장소",
    body: [
      "로그인 상태 유지와 이용 편의를 위해 브라우저 로컬 저장소(localStorage)를 사용합니다.",
      "광고·추적 목적의 제3자 쿠키는 사용하지 않습니다.",
    ],
  },
  {
    h: "7. 문의",
    body: ["개인정보 관련 문의는 서비스 내 고객센터를 통해 접수할 수 있습니다."],
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#F5F3EE] py-8 px-5">
      <div className="max-w-[640px] mx-auto">
        <Link href="/" className="text-[0.8rem] text-[#888070] hover:text-[#181614]">
          ← 홈으로
        </Link>
        <div className="bg-white rounded-[16px] border border-black/[0.08] p-6 mt-3">
          <h1 className="text-[1.2rem] font-bold text-[#181614]">개인정보 처리방침</h1>
          <p className="text-[0.72rem] text-[#888070] mt-1 mb-5">최종 업데이트: 2026년 7월</p>
          <div className="space-y-5">
            {SECTIONS.map((s) => (
              <section key={s.h}>
                <h2 className="text-[0.9rem] font-bold text-[#181614] mb-1.5">{s.h}</h2>
                {s.body.map((p, i) => (
                  <p key={i} className="text-[0.82rem] text-[#3A3630] leading-relaxed mb-1">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
          <p className="text-[0.72rem] text-[#C0BBB0] mt-6 pt-4 border-t border-black/[0.06] leading-relaxed">
            본 방침은 표준 템플릿을 기반으로 현재 서비스의 데이터 처리 방식을 반영한 것입니다. 정식 출시(서버 도입) 전 법률 검토를 거쳐 최종본을 확정할 예정입니다.
          </p>
        </div>
      </div>
    </main>
  );
}
