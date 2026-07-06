"use client";

import { useEffect, useState, useCallback } from "react";

// ⚠️ MVP 목(mock) 인증: 백엔드가 없으므로 실제 비밀번호 검증은 하지 않는다.
// 로그인/가입 상태와 기본 계정 정보만 localStorage에 저장한다.
// (비밀번호는 저장하지 않는다 — 로컬 저장은 보안상 위험하므로 데모에서도 저장 금지.)

export interface Account {
  name: string;
  email: string;
  visa: string;
  loggedIn: boolean;
}

const KEY = "sori_auth";

const EMPTY: Account = { name: "", email: "", visa: "", loggedIn: false };

function read(): Account {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...EMPTY, ...JSON.parse(raw) };
  } catch {
    /* 파싱 실패 시 빈 계정 */
  }
  return EMPTY;
}

function persist(acc: Account) {
  try {
    localStorage.setItem(KEY, JSON.stringify(acc));
    // 같은 탭의 다른 useAuth 인스턴스도 갱신되도록 수동 dispatch
    window.dispatchEvent(new StorageEvent("storage", { key: KEY }));
  } catch {
    /* quota 등 무시 */
  }
}

export function useAuth() {
  const [account, setAccount] = useState<Account>(EMPTY);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setAccount(read());
    setHydrated(true);
    const handler = (e: StorageEvent) => {
      if (e.key === KEY) setAccount(read());
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const signup = useCallback((data: { name: string; email: string; visa: string }) => {
    const acc: Account = { name: data.name, email: data.email, visa: data.visa, loggedIn: true };
    persist(acc);
    setAccount(acc);
  }, []);

  const login = useCallback((email: string) => {
    setAccount((prev) => {
      const acc: Account = { ...prev, email: email || prev.email, loggedIn: true };
      persist(acc);
      return acc;
    });
  }, []);

  const logout = useCallback(() => {
    setAccount((prev) => {
      const acc: Account = { ...prev, loggedIn: false };
      persist(acc);
      return acc;
    });
  }, []);

  return { account, isAuthed: account.loggedIn, hydrated, signup, login, logout };
}
