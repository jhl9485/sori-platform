// 이 탭에서 "처음 열린 화면"이 어디였는지 기억한다.
//
// 왜 필요한가: 공유 링크를 새 탭에 붙여넣고 들어오면 뒤로 갈 앱 내 기록이 없다.
// 그 상태에서 router.back()을 하면 빈 화면(about:blank)으로 앱 밖에 떨어진다.
//
// window.history.length 로는 구분할 수 없다 — 새 탭에서도 초기 빈 문서 때문에 2가 나온다.
// 그래서 "처음 열린 화면과 지금 화면이 다른가"로 판단한다. 다르면 앱 안에서 이동해 온 것이다.
const ENTRY_KEY = "sori_nav_entry";

/** 탭에서 처음 연 화면을 한 번만 기록한다. (여러 번 호출해도 안전) */
export function markNavEntry(pathname: string) {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(ENTRY_KEY) === null) {
      sessionStorage.setItem(ENTRY_KEY, pathname);
    }
  } catch {}
}

/** 앱 안에서 이동해 왔는가 = 뒤로 가도 앱 밖으로 나가지 않는가 */
export function hasInAppHistory(pathname: string) {
  if (typeof window === "undefined") return false;
  try {
    const entry = sessionStorage.getItem(ENTRY_KEY);
    return entry !== null && entry !== pathname;
  } catch {
    return false;
  }
}
