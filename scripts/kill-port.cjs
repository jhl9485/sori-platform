// 지정한 포트를 점유한 프로세스를 강제 종료한다.
// next dev는 보통 부모(next/bin/next dev) + 워커(start-server.js)로 분리되어 동작하므로,
// 포트 점유 PID뿐 아니라 그 부모 PID와 자식 트리까지 모두 잡아야 좀비가 안 남는다.
// (windows/mac/linux 호환, 외부 의존성 0)

const { execSync } = require("child_process");

const port = process.argv[2] || "3000";

function safeExec(cmd) {
  try {
    return execSync(cmd, { stdio: ["ignore", "pipe", "ignore"] }).toString();
  } catch {
    return "";
  }
}

function getParentPidWin(pid) {
  const ps = `(Get-CimInstance Win32_Process -Filter "ProcessId=${pid}").ParentProcessId`;
  const out = safeExec(`powershell -NoProfile -Command "${ps}"`).trim();
  return /^\d+$/.test(out) && out !== "0" ? out : null;
}

function killWindows(port) {
  const out = safeExec(`netstat -ano | findstr LISTENING | findstr :${port}`);
  const directPids = [
    ...new Set(
      out
        .split("\n")
        .map((l) => l.trim().split(/\s+/).pop())
        .filter((p) => /^\d+$/.test(p))
    ),
  ];

  // 직접 점유한 PID들 + 그들의 부모 PID들 모두 수집
  const allPids = new Set(directPids);
  for (const pid of directPids) {
    const parent = getParentPidWin(pid);
    // PID 0, 4(System) 등 시스템 프로세스는 제외
    if (parent && Number(parent) > 100) allPids.add(parent);
  }

  for (const pid of allPids) {
    // /T 옵션: 자식 트리까지 함께 종료
    safeExec(`taskkill /F /T /PID ${pid}`);
    console.log(`[kill-port] killed PID ${pid} (and its children) on :${port}`);
  }

  return [...allPids];
}

function killUnix(port) {
  const out = safeExec(`lsof -ti :${port}`).trim();
  if (!out) return [];
  const pids = out.split("\n").filter(Boolean);
  // unix에서도 부모 PID 함께 잡기
  const allPids = new Set(pids);
  for (const pid of pids) {
    const ppidOut = safeExec(`ps -o ppid= -p ${pid}`).trim();
    if (/^\d+$/.test(ppidOut) && Number(ppidOut) > 1) allPids.add(ppidOut);
  }
  for (const pid of allPids) {
    safeExec(`kill -9 ${pid}`);
    console.log(`[kill-port] killed PID ${pid} on :${port}`);
  }
  return [...allPids];
}

const killed = process.platform === "win32" ? killWindows(port) : killUnix(port);
if (killed.length === 0) {
  console.log(`[kill-port] :${port} clear`);
}
