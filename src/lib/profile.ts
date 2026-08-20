"use client";

import { useEffect, useState, useCallback } from "react";

export interface UserProfile {
  name: string;
  visa: string;        // "EP" | "S-Pass" | "DP" | "PR" | "시민권" | "WH" | "방문" 등
  yearsInSG: string;   // "3년차"
  area: string;        // "Tanjong Pagar"
  avatarChar: string;  // 한 글자
}

const KEY = "sori_user_profile";

const DEFAULT_PROFILE: UserProfile = {
  name: "김싱가해",
  visa: "EP",
  yearsInSG: "3년차",
  area: "Tanjong Pagar",
  avatarChar: "김",
};

function read(): UserProfile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch {}
  return DEFAULT_PROFILE;
}

export function useProfile() {
  const [profile, setProfileState] = useState<UserProfile>(DEFAULT_PROFILE);

  useEffect(() => {
    setProfileState(read());
    const handler = (e: StorageEvent) => { if (e.key === KEY) setProfileState(read()); };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  // 저장(localStorage 쓰기 + storage 이벤트 발송)은 setProfileState 업데이터 "밖"에서 한다.
  // 업데이터 안에서 이벤트를 쏘면 렌더 도중 이 키를 듣는 다른 컴포넌트의 setState가 연쇄로 일어나
  // "Cannot update a component while rendering a different component" 경고가 난다.
  // prev 대신 read()로 localStorage를 직접 읽으므로, 하이드레이션 전에 호출돼도
  // 기본값이 저장돼 있던 프로필을 덮어쓰지 않는다.
  const setProfile = useCallback((next: Partial<UserProfile>) => {
    const merged = { ...read(), ...next };
    setProfileState(merged);
    try {
      localStorage.setItem(KEY, JSON.stringify(merged));
      window.dispatchEvent(new StorageEvent("storage", { key: KEY }));
    } catch {}
  }, []);

  return { profile, setProfile };
}
