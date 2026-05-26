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

  const setProfile = useCallback((next: Partial<UserProfile>) => {
    setProfileState((prev) => {
      const merged = { ...prev, ...next };
      try {
        localStorage.setItem(KEY, JSON.stringify(merged));
        window.dispatchEvent(new StorageEvent("storage", { key: KEY }));
      } catch {}
      return merged;
    });
  }, []);

  return { profile, setProfile };
}
