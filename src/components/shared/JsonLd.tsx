// 구조화 데이터(JSON-LD)를 페이지에 심는 공용 부품.
// 검색엔진·AI가 읽는 "사실 표"라서 사람 눈에는 아무것도 보이지 않는다.
//
// "use client"를 붙이지 않는 이유: 상세 페이지의 얇은 서버 컴포넌트에서 그대로 써야 한다.
// 상태도 이벤트도 없으므로 클라이언트로 내려보낼 이유가 없다.
//
// ⚠️ 왜 "<"를 이스케이프하는가:
// JSON 문자열 안에 "</script>"라는 글자가 들어오면 브라우저는 거기서 <script>가 끝난 것으로
// 읽고, 뒤에 오는 내용을 HTML로 실행해버린다. 남이 쓴 글이 코드로 실행되는 통로가 된다.
// "<"를 \u003c로 바꾸면 JSON이 해석될 때는 그대로 "<"인데 태그는 닫히지 않는다.
// 지금 들어가는 값은 우리 시드 데이터뿐이지만, 나중에 사용자가 쓴 글이 들어와도
// 안전해야 하므로 부품 안에서 항상 걸어둔다.
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
