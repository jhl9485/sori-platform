"use client";

import { useEffect, useState } from "react";

const READ_KEY = "sori_read_notifications";
const isBrowser = typeof window !== "undefined";

function readSet(): Set<string> {
  if (!isBrowser) return new Set();
  try {
    const raw = localStorage.getItem(READ_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

function writeSet(s: Set<string>): void {
  if (!isBrowser) return;
  try {
    localStorage.setItem(READ_KEY, JSON.stringify(Array.from(s)));
    window.dispatchEvent(new StorageEvent("storage", { key: READ_KEY }));
  } catch {}
}

export function useReadNotifications() {
  const [read, setRead] = useState<Set<string>>(new Set());

  useEffect(() => {
    setRead(readSet());
    const handler = (e: StorageEvent) => {
      if (e.key === READ_KEY) setRead(readSet());
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const markRead = (id: string) => {
    const next = new Set(read);
    next.add(id);
    writeSet(next);
    setRead(next);
  };

  const markAllRead = (ids: string[]) => {
    const next = new Set(read);
    ids.forEach((id) => next.add(id));
    writeSet(next);
    setRead(next);
  };

  return { read, markRead, markAllRead };
}

// 안 읽음 카운트만 필요한 곳용 (TopNav, BottomNav)
export function useUnreadCount(totalIds: string[]): number {
  const { read } = useReadNotifications();
  return totalIds.filter((id) => !read.has(id)).length;
}
