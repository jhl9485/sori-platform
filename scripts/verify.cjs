// 빌드 무결성을 안전하게 검증한다.
// - dev 서버를 죽이고 .next 정리 후 next build 실행 (충돌 방지)
// - 빌드 후 .next는 production 산출물 상태로 남음 → 이어서 npm run dev를 호출하면
//   dev 모드와 충돌할 수 있으므로 자동으로 .next를 다시 정리하고 안내.
// - dev 워크플로우와 build 검증 워크플로우를 명확히 분리하기 위한 헬퍼.
const { execSync, spawnSync } = require("child_process");
const path = require("path");

const scriptsDir = __dirname;
const projectDir = path.resolve(scriptsDir, "..");

function run(label, cmd, args) {
  console.log(`\n=== ${label} ===`);
  const r = spawnSync(cmd, args, { cwd: projectDir, stdio: "inherit", shell: true });
  if (r.status !== 0) {
    console.error(`[verify] "${label}" failed (exit ${r.status})`);
    process.exit(r.status || 1);
  }
}

// 1) 좀비 dev 서버 + .next 캐시 정리
run("dev 서버 정리", "node", [path.join("scripts", "kill-port.cjs"), "3000"]);
run(".next 캐시 정리", "node", [path.join("scripts", "clean.cjs")]);

// 2) 타입체크 + lint + 빌드
run("타입 체크 (tsc)", "npx", ["tsc", "--noEmit"]);
run("lint (next lint)", "npx", ["next", "lint", "--max-warnings", "0"]);
run("빌드 (next build)", "npx", ["next", "build"]);

// 3) build 산출물 정리 (dev와 충돌 방지)
console.log("\n=== build 산출물 정리 (dev 모드와 분리) ===");
run("최종 .next 정리", "node", [path.join("scripts", "clean.cjs")]);

console.log("\n✅ verify 완료. 이제 npm run dev로 깨끗하게 dev 서버를 시작할 수 있어요.");
