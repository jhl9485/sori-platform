// 지정한 포트를 점유한 프로세스를 강제 종료한다.
// next dev 시작 전에 좀비 서버를 정리하는 용도. (windows/mac/linux 호환)
const { execSync } = require("child_process");

const port = process.argv[2] || "3000";

function killWindows(port) {
  let out = "";
  try {
    out = execSync(`netstat -ano | findstr LISTENING | findstr :${port}`, { stdio: ["ignore", "pipe", "ignore"] }).toString();
  } catch {
    return [];
  }
  const pids = [
    ...new Set(
      out
        .split("\n")
        .map((l) => l.trim().split(/\s+/).pop())
        .filter((p) => /^\d+$/.test(p))
    ),
  ];
  for (const pid of pids) {
    try {
      execSync(`taskkill /F /T /PID ${pid}`, { stdio: "ignore" });
      console.log(`[kill-port] killed PID ${pid} on :${port}`);
    } catch {}
  }
  return pids;
}

function killUnix(port) {
  try {
    const out = execSync(`lsof -ti :${port}`, { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
    if (!out) return [];
    const pids = out.split("\n").filter(Boolean);
    for (const pid of pids) {
      try {
        execSync(`kill -9 ${pid}`, { stdio: "ignore" });
        console.log(`[kill-port] killed PID ${pid} on :${port}`);
      } catch {}
    }
    return pids;
  } catch {
    return [];
  }
}

const killed = process.platform === "win32" ? killWindows(port) : killUnix(port);
if (killed.length === 0) {
  console.log(`[kill-port] :${port} clear`);
}
