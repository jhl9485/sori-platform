"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { useProfile } from "@/lib/profile";

const INPUT_CLS =
  "w-full bg-[#F5F3EE] rounded-[10px] px-4 py-3 text-[0.9rem] outline-none placeholder:text-[#C0BBB0] focus:ring-2 focus:ring-[#D04020]/25 transition";

const VISA_OPTIONS = ["EP", "S-Pass", "DP", "PR", "시민권", "WH", "방문", "기타"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const { setProfile } = useProfile();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [visa, setVisa] = useState("EP");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  const clearError = () => setError("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("이름(닉네임)을 입력해 주세요.");
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError("올바른 이메일 형식을 입력해 주세요.");
      return;
    }
    if (password.length < 6) {
      setError("비밀번호는 6자 이상이어야 해요.");
      return;
    }
    if (password !== confirm) {
      setError("비밀번호가 일치하지 않아요.");
      return;
    }
    if (!agree) {
      setError("이용약관·개인정보 처리방침에 동의해 주세요.");
      return;
    }
    const trimmedName = name.trim();
    // 프로필에도 반영 → 마이페이지·글 작성 시 자동 사용
    setProfile({ name: trimmedName, visa, avatarChar: trimmedName.charAt(0) });
    signup({ name: trimmedName, email: email.trim(), visa });
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-[#F5F3EE] flex flex-col items-center justify-center px-5 py-10">
      <div className="w-full max-w-sm">
        {/* 로고 */}
        <div className="text-center mb-7">
          <div className="text-[2rem] font-extrabold tracking-tight text-[#D04020]">SORI</div>
          <p className="text-[0.8rem] text-[#888070] mt-1">싱가포르 한인 커뮤니티</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-[16px] border border-black/[0.08] p-5 space-y-3.5"
        >
          <h1 className="text-[1.05rem] font-bold">회원가입</h1>

          <div>
            <label className="block text-[0.78rem] text-[#888070] mb-1.5">이름 (닉네임)</label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                clearError();
              }}
              placeholder="예: 김싱가"
              className={INPUT_CLS}
              maxLength={20}
            />
          </div>

          <div>
            <label className="block text-[0.78rem] text-[#888070] mb-1.5">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearError();
              }}
              placeholder="you@example.com"
              className={INPUT_CLS}
              autoComplete="email"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[0.78rem] text-[#888070] mb-1.5">비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearError();
                }}
                placeholder="6자 이상"
                className={INPUT_CLS}
                autoComplete="new-password"
              />
            </div>
            <div>
              <label className="block text-[0.78rem] text-[#888070] mb-1.5">비밀번호 확인</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => {
                  setConfirm(e.target.value);
                  clearError();
                }}
                placeholder="다시 입력"
                className={INPUT_CLS}
                autoComplete="new-password"
              />
            </div>
          </div>

          <div>
            <label className="block text-[0.78rem] text-[#888070] mb-1.5">비자 상태</label>
            <select
              value={visa}
              onChange={(e) => setVisa(e.target.value)}
              className={INPUT_CLS + " appearance-none cursor-pointer"}
            >
              {VISA_OPTIONS.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-start gap-2 pt-0.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => {
                setAgree(e.target.checked);
                clearError();
              }}
              className="mt-0.5 accent-[#D04020] w-4 h-4"
            />
            <span className="text-[0.76rem] text-[#888070] leading-snug">
              이용약관 및 개인정보 처리방침에 동의합니다.
            </span>
          </label>

          {error && <p className="text-[0.78rem] text-[#D04020]">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 rounded-[10px] bg-[#D04020] text-white text-[0.9rem] font-semibold hover:bg-[#B83818] transition-colors"
          >
            가입하고 시작하기
          </button>
        </form>

        <p className="text-center text-[0.82rem] text-[#888070] mt-5">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="text-[#D04020] font-semibold">
            로그인
          </Link>
        </p>

        <p className="text-center text-[0.68rem] text-[#C0BBB0] mt-4 leading-relaxed">
          데모 버전입니다. 입력하신 정보는 이 기기에만 저장되며,
          <br />
          실제 계정 생성은 백엔드 연동 후 지원돼요.
        </p>
      </div>
    </main>
  );
}
