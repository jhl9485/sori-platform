"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth";

const INPUT_CLS =
  "w-full bg-[#F5F3EE] rounded-[10px] px-4 py-3 text-[0.9rem] outline-none placeholder:text-[#C0BBB0] focus:ring-2 focus:ring-[#D04020]/25 transition";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("이메일을 입력해 주세요.");
      return;
    }
    if (!password) {
      setError("비밀번호를 입력해 주세요.");
      return;
    }
    login(email.trim());
    router.push("/");
  };

  const social = (fallbackEmail: string) => {
    login(email.trim() || fallbackEmail);
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-[#F5F3EE] flex flex-col items-center justify-center px-5 py-10">
      <div className="w-full max-w-sm">
        {/* 로고 */}
        <div className="text-center mb-8">
          <div className="text-[2rem] font-extrabold tracking-tight text-[#D04020]">SORI</div>
          <p className="text-[0.8rem] text-[#888070] mt-1">싱가포르 한인 커뮤니티</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-[16px] border border-black/[0.08] p-5 space-y-3.5"
        >
          <h1 className="text-[1.05rem] font-bold">로그인</h1>

          <div>
            <label className="block text-[0.78rem] text-[#888070] mb-1.5">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="you@example.com"
              className={INPUT_CLS}
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-[0.78rem] text-[#888070] mb-1.5">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="비밀번호"
              className={INPUT_CLS}
              autoComplete="current-password"
            />
          </div>

          {error && <p className="text-[0.78rem] text-[#D04020]">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 rounded-[10px] bg-[#D04020] text-white text-[0.9rem] font-semibold hover:bg-[#B83818] transition-colors"
          >
            로그인
          </button>

          <div className="flex items-center gap-3 pt-1">
            <div className="flex-1 h-px bg-black/[0.08]" />
            <span className="text-[0.72rem] text-[#C0BBB0]">또는</span>
            <div className="flex-1 h-px bg-black/[0.08]" />
          </div>

          <button
            type="button"
            onClick={() => social("kakao@sori.sg")}
            className="w-full py-3 rounded-[10px] bg-[#FEE500] text-[#3C1E1E] text-[0.88rem] font-semibold hover:brightness-95 transition"
          >
            💬 카카오로 시작하기
          </button>
          <button
            type="button"
            onClick={() => social("google@sori.sg")}
            className="w-full py-3 rounded-[10px] bg-white border border-black/[0.12] text-[0.88rem] font-medium hover:bg-[#F5F3EE] transition"
          >
            Google로 시작하기
          </button>
        </form>

        <p className="text-center text-[0.82rem] text-[#888070] mt-5">
          아직 계정이 없으신가요?{" "}
          <Link href="/signup" className="text-[#D04020] font-semibold">
            회원가입
          </Link>
        </p>

        <p className="text-center text-[0.68rem] text-[#C0BBB0] mt-4 leading-relaxed">
          데모 버전입니다. 실제 인증·비밀번호 확인은 백엔드 연동 후 지원돼요.
        </p>

        <div className="text-center mt-3">
          <Link href="/" className="text-[0.75rem] text-[#888070] underline underline-offset-2">
            로그인 없이 둘러보기
          </Link>
        </div>
      </div>
    </main>
  );
}
