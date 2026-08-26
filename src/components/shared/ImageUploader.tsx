"use client";

import { useRef, useState } from "react";
import { toast } from "@/components/shared/Feedback";

interface Props {
  images: string[];               // base64 data URL 배열
  onChange: (next: string[]) => void;
  max?: number;                   // 최대 사진 수 (기본 5)
}

const DEFAULT_MAX = 5;
const MAX_WIDTH = 1200;           // 가로 픽셀 한도 (리사이즈)
const JPEG_QUALITY = 0.78;        // 압축 품질

// 파일 → 리사이즈된 base64 (JPEG)
function fileToCompressedDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const scale = img.width > MAX_WIDTH ? MAX_WIDTH / img.width : 1;
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("canvas 2d unavailable"));
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", JPEG_QUALITY));
      };
      img.onerror = () => reject(new Error("이미지 로딩 실패"));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("파일 읽기 실패"));
    reader.readAsDataURL(file);
  });
}

export default function ImageUploader({ images, onChange, max = DEFAULT_MAX }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  // 큰 사진은 압축(리사이즈)에 몇 초가 걸리는데 아무 표시가 없어 멈춘 것처럼 보였다.
  // 압축이 도는 동안 + 버튼을 "압축 중"으로 바꿔 진행 중임을 알린다.
  const [busy, setBusy] = useState(false);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const remaining = max - images.length;
    // 예전에는 자리가 없거나 초과분이 있으면 말없이 버려서, 고른 사진이 왜 안 올라왔는지 알 수 없었다.
    if (remaining <= 0) {
      toast(`사진은 최대 ${max}장까지예요. 먼저 한 장을 지워주세요.`);
      return;
    }
    const picked = Array.from(files);
    const slice = picked.slice(0, remaining);
    const dropped = picked.length - slice.length;

    setBusy(true);
    try {
      const newDataUrls = await Promise.all(slice.map(fileToCompressedDataUrl));
      onChange([...images, ...newDataUrls]);
      if (dropped > 0) {
        toast(`사진은 최대 ${max}장까지예요. ${slice.length}장만 올리고 ${dropped}장은 제외했어요.`);
      }
    } catch (err) {
      console.error(err);
      toast("이미지를 불러오는 데 문제가 생겼어요. 다른 파일로 시도해주세요.");
    } finally {
      setBusy(false);
    }
  };

  const removeAt = (idx: number) => {
    onChange(images.filter((_, i) => i !== idx));
  };

  const slots = Array.from({ length: max }, (_, i) => images[i]);

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files);
          // 같은 파일 다시 선택 가능하도록 reset
          if (inputRef.current) inputRef.current.value = "";
        }}
      />
      <div className="grid grid-cols-5 gap-2">
        {slots.map((src, i) => {
          if (src) {
            return (
              <div key={i} className="relative aspect-square rounded-[10px] overflow-hidden border border-black/[0.08] bg-[#F5F3EE]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`사진 ${i + 1}`} className="w-full h-full object-cover" />
                {i === 0 && (
                  <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[0.55rem] font-bold px-[5px] py-[1px] rounded">
                    대표
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => removeAt(i)}
                  className="absolute top-1 right-1 w-5 h-5 bg-black/70 text-white rounded-full flex items-center justify-center text-[0.65rem] hover:bg-[#D04020]"
                  aria-label={`사진 ${i + 1} 삭제`}
                >
                  ✕
                </button>
              </div>
            );
          }
          // 첫 빈 슬롯에만 + 버튼 활성
          const isFirstEmpty = images.length === i;
          return (
            <button
              key={i}
              type="button"
              disabled={!isFirstEmpty || busy}
              onClick={() => inputRef.current?.click()}
              className={`aspect-square rounded-[10px] flex flex-col items-center justify-center border-2 border-dashed transition-colors ${
                isFirstEmpty
                  ? "border-black/[0.15] bg-[#F5F3EE] hover:border-[#D04020] hover:text-[#D04020] text-[#888070]"
                  : "border-black/[0.06] bg-[#F9F8F4] text-[#C0BBB0]"
              }`}
            >
              <span className={`text-xl ${isFirstEmpty && busy ? "animate-pulse" : ""}`}>
                {isFirstEmpty && busy ? "⏳" : "📷"}
              </span>
              {isFirstEmpty && (
                <span className="text-[0.6rem] mt-[2px] font-medium">
                  {busy ? "압축 중" : `${images.length}/${max}`}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <p className="text-[0.68rem] text-[#888070] mt-2" aria-live="polite">
        {busy
          ? "⏳ 사진을 줄이는 중이에요… 잠시만 기다려주세요."
          : `💡 첫 사진이 대표 이미지가 되어요. 최대 ${max}장 · 자동 리사이즈/압축`}
      </p>
    </div>
  );
}
