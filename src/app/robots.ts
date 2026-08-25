import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * 검색엔진 크롤러 규칙(/robots.txt).
 *
 * 기본은 전체 허용이다. 다만 아래 두 종류는 막는다:
 *  - 개인 화면 (/my, /notifications) — 남의 검색 결과에 뜰 내용이 아니다.
 *  - 작성·인증 화면 (/write, 각 게시판의 write, /business/apply, /login, /signup)
 *    — 빈 입력 폼이라 검색 결과에 떠도 아무 쓸모가 없다.
 *
 * ⚠️ 이 목록은 sitemap.ts에서 빼둔 경로와 같아야 한다. 한쪽만 고치면
 *    "sitemap에는 있는데 robots가 막는" 모순이 생겨 검색엔진이 경고를 띄운다.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/my",
        "/notifications",
        "/login",
        "/signup",
        "/write",
        "/business/write",
        "/business/apply",
        "/jobs/write",
        "/realty/write",
        "/flea/write",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
