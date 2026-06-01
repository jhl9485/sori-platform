"use client";

import { useEffect, useState } from "react";

/**
 * 클라이언트 hydration이 끝났는지 알려주는 훅.
 *
 * 사용자 글 등 localStorage에 의존하는 데이터는 useEffect 이후에만 채워지므로,
 * 첫 렌더에서 데이터 없음을 근거로 notFound()를 호출하면 영구히 404 segment로
 * 라우팅되어 돌아오지 못한다. hydrated가 true가 될 때까지 스켈레톤을 보여주고
 * 이후에만 not-found 처리하는 패턴에 사용.
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return hydrated;
}
