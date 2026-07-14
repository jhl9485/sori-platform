"use client";

import { useEffect, useState } from "react";

// ─────────── Toast (인앱 알림) ───────────
export function toast(message: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("sori-toast", { detail: message }));
}

interface ToastItem {
  id: number;
  msg: string;
}

export function ToastHost() {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    const h = (e: Event) => {
      const msg = (e as CustomEvent).detail as string;
      const id = Date.now() + Math.random();
      setItems((t) => [...t, { id, msg }]);
      window.setTimeout(() => setItems((t) => t.filter((x) => x.id !== id)), 2600);
    };
    window.addEventListener("sori-toast", h);
    return () => window.removeEventListener("sori-toast", h);
  }, []);

  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-[calc(88px+env(safe-area-inset-bottom))] md:bottom-8 z-[120] flex flex-col items-center gap-2 pointer-events-none">
      {items.map((t) => (
        <div
          key={t.id}
          className="animate-fade-up bg-[#181614] text-white text-[0.82rem] font-medium px-4 py-2.5 rounded-full shadow-[0_6px_20px_rgba(0,0,0,0.25)] max-w-[85vw] text-center whitespace-pre-wrap"
        >
          {t.msg}
        </div>
      ))}
    </div>
  );
}

// ─────────── Confirm (인앱 확인창) ───────────
interface ConfirmOpts {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
}

let confirmResolver: ((v: boolean) => void) | null = null;

export function confirmDialog(opts: ConfirmOpts): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  return new Promise((resolve) => {
    confirmResolver = resolve;
    window.dispatchEvent(new CustomEvent("sori-confirm", { detail: opts }));
  });
}

export function ConfirmHost() {
  const [opts, setOpts] = useState<ConfirmOpts | null>(null);

  useEffect(() => {
    const h = (e: Event) => setOpts((e as CustomEvent).detail as ConfirmOpts);
    window.addEventListener("sori-confirm", h);
    return () => window.removeEventListener("sori-confirm", h);
  }, []);

  const close = (v: boolean) => {
    setOpts(null);
    confirmResolver?.(v);
    confirmResolver = null;
  };

  if (!opts) return null;

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/40 px-6" onClick={() => close(false)}>
      <div className="w-full max-w-[300px] bg-white rounded-[16px] overflow-hidden shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="px-5 pt-5 pb-4 text-center">
          {opts.title && <div className="text-[0.95rem] font-bold mb-1">{opts.title}</div>}
          <div className="text-[0.85rem] text-[#3A3630] leading-relaxed whitespace-pre-wrap">{opts.message}</div>
        </div>
        <div className="flex border-t border-black/[0.07]">
          <button
            onClick={() => close(false)}
            className="flex-1 py-3 text-[0.85rem] text-[#888070] hover:bg-[#F5F3EE] transition-colors"
          >
            {opts.cancelText || "취소"}
          </button>
          <button
            onClick={() => close(true)}
            className={`flex-1 py-3 text-[0.85rem] font-semibold border-l border-black/[0.07] transition-colors ${
              opts.danger ? "text-[#D04020] hover:bg-[#FBF0EC]" : "text-[#2050A0] hover:bg-[#EBF0FB]"
            }`}
          >
            {opts.confirmText || "확인"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────── Report (신고 사유 선택) ───────────
const REPORT_REASONS = ["욕설·비방", "스팸·광고", "음란·혐오", "허위 정보", "기타"];
let reportResolver: ((v: string | null) => void) | null = null;

export function reportDialog(): Promise<string | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  return new Promise((resolve) => {
    reportResolver = resolve;
    window.dispatchEvent(new CustomEvent("sori-report"));
  });
}

export function ReportHost() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setOpen(true);
    window.addEventListener("sori-report", h);
    return () => window.removeEventListener("sori-report", h);
  }, []);

  const pick = (reason: string | null) => {
    setOpen(false);
    reportResolver?.(reason);
    reportResolver = null;
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[130] flex items-end sm:items-center justify-center bg-black/40 sm:px-6" onClick={() => pick(null)}>
      <div className="w-full sm:max-w-[320px] bg-white rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="px-5 pt-4 pb-2 text-center">
          <div className="text-[0.95rem] font-bold">신고 사유를 선택해 주세요</div>
          <div className="text-[0.72rem] text-[#888070] mt-1">선택하면 접수되고, 검토 후 조치됩니다.</div>
        </div>
        <div>
          {REPORT_REASONS.map((r) => (
            <button
              key={r}
              onClick={() => pick(r)}
              className="w-full px-5 py-3 text-[0.85rem] text-center hover:bg-[#F5F3EE] transition-colors border-t border-black/[0.05]"
            >
              {r}
            </button>
          ))}
        </div>
        <button
          onClick={() => pick(null)}
          className="w-full px-5 py-3 text-[0.85rem] font-medium text-[#888070] border-t border-black/[0.08] hover:bg-[#F5F3EE] transition-colors"
        >
          취소
        </button>
      </div>
    </div>
  );
}
