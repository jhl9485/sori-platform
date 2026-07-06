import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관",
  description: "SORI 서비스 이용약관",
};

const SECTIONS: { h: string; body: string[] }[] = [
  {
    h: "제1조 (목적)",
    body: [
      "본 약관은 SORI(이하 '서비스')가 제공하는 싱가포르 한인 커뮤니티 관련 제반 서비스의 이용 조건 및 절차, 이용자와 운영자의 권리·의무·책임사항을 규정함을 목적으로 합니다.",
    ],
  },
  {
    h: "제2조 (서비스의 내용)",
    body: [
      "서비스는 싱가포르 거주 한인을 위한 뉴스, 커뮤니티 게시판, 한인 업소록, 부동산, 벼룩시장, 구인구직 등의 정보를 제공합니다.",
      "서비스에 게시되는 뉴스 요약·정보는 참고용이며, 정확성·최신성을 보장하지 않습니다. 중요한 결정은 반드시 원문 출처나 공식 기관을 통해 확인하시기 바랍니다.",
    ],
  },
  {
    h: "제3조 (회원가입 및 계정)",
    body: [
      "이용자는 서비스가 정한 절차에 따라 회원가입을 신청할 수 있으며, 운영자는 이를 승낙함으로써 회원 자격을 부여합니다.",
      "이용자는 본인의 계정 정보를 관리할 책임이 있으며, 타인에게 계정을 양도·대여할 수 없습니다.",
    ],
  },
  {
    h: "제4조 (이용자의 의무 · 금지행위)",
    body: [
      "이용자는 다음 행위를 하여서는 안 됩니다.",
      "· 허위 정보 등록, 타인 사칭, 타인의 개인정보 무단 수집·게시",
      "· 욕설·비방·차별·혐오·음란물 등 부적절한 콘텐츠 게시",
      "· 스팸·광고성 도배, 사기·불법 거래 유도",
      "· 서비스 운영을 방해하거나 시스템에 무단 접근하는 행위",
      "운영자는 위반 게시물을 사전 통지 없이 삭제하거나 이용을 제한할 수 있습니다.",
    ],
  },
  {
    h: "제5조 (게시물의 권리와 책임)",
    body: [
      "이용자가 작성한 게시물의 저작권은 작성자에게 있습니다.",
      "게시물로 인해 발생하는 법적 책임은 작성자 본인에게 있으며, 운영자는 이에 대해 책임지지 않습니다.",
      "운영자는 서비스 운영·홍보를 위해 게시물을 서비스 내에서 노출·게재할 수 있습니다.",
    ],
  },
  {
    h: "제6조 (서비스의 변경 및 중단)",
    body: [
      "본 서비스는 현재 시범(MVP) 단계로, 기능·내용이 사전 통지 없이 변경되거나 일시 중단될 수 있습니다.",
      "운영자는 서비스 제공과 관련하여 발생한 손해에 대해 고의 또는 중대한 과실이 없는 한 책임을 지지 않습니다.",
    ],
  },
  {
    h: "제7조 (약관의 변경)",
    body: [
      "운영자는 관련 법령을 위반하지 않는 범위에서 본 약관을 변경할 수 있으며, 변경 시 서비스 내 공지합니다.",
    ],
  },
  {
    h: "제8조 (문의)",
    body: ["서비스 이용 관련 문의는 서비스 내 고객센터를 통해 접수할 수 있습니다."],
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#F5F3EE] py-8 px-5">
      <div className="max-w-[640px] mx-auto">
        <Link href="/" className="text-[0.8rem] text-[#888070] hover:text-[#181614]">
          ← 홈으로
        </Link>
        <div className="bg-white rounded-[16px] border border-black/[0.08] p-6 mt-3">
          <h1 className="text-[1.2rem] font-bold text-[#181614]">이용약관</h1>
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
            본 약관은 싱가포르 한인 커뮤니티 서비스에 맞춘 표준 템플릿입니다. 정식 출시 전 법률 전문가의 검토를 거쳐 최종본을 확정할 예정입니다.
          </p>
        </div>
      </div>
    </main>
  );
}
