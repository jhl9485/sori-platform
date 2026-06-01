// `.next` 빌드 캐시와 webpack 캐시를 완전 삭제한다.
// dev 서버 화면이 깨지거나 MODULE_NOT_FOUND가 보이면 `npm run clean` → `npm run dev`로 복구.
// 의존성 0, win/mac/linux 호환.
const fs = require("fs");
const path = require("path");

const targets = [
  path.resolve(__dirname, "..", ".next"),
  path.resolve(__dirname, "..", "node_modules", ".cache"),
];

for (const target of targets) {
  if (!fs.existsSync(target)) {
    console.log(`[clean] skip (not exists): ${path.relative(process.cwd(), target)}`);
    continue;
  }
  try {
    fs.rmSync(target, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 });
    console.log(`[clean] removed: ${path.relative(process.cwd(), target)}`);
  } catch (err) {
    console.warn(`[clean] failed to remove ${target}:`, err.message);
  }
}

console.log("[clean] done. 다음번 dev/build에서 캐시가 새로 만들어집니다.");
