import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { build } from "./build";

const DIST_DIR = path.join(process.cwd(), "dist");
const PORT = 3000;

// SSE クライアント管理
const clients = new Set<http.ServerResponse>();

function broadcast() {
  for (const res of clients) {
    res.write("data: reload\n\n");
  }
}

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json",
  ".xml": "application/xml",
};

const RELOAD_SCRIPT = `<script>new EventSource('/sse').onmessage=()=>location.reload()</script>`;

const server = http.createServer((req, res) => {
  const url = (req.url ?? "/").split("?")[0];

  // SSE エンドポイント
  if (url === "/sse") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });
    res.write(": ping\n\n");
    clients.add(res);
    req.on("close", () => clients.delete(res));
    return;
  }

  // ファイルパスを解決
  let filePath = path.join(DIST_DIR, url.endsWith("/") ? `${url}index.html` : url);

  // ディレクトリの場合は index.html を探す
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }

  // ファイルが存在しない場合は 404 を返す
  if (!fs.existsSync(filePath)) {
    filePath = path.join(DIST_DIR, "404.html");
  }

  const ext = path.extname(filePath);
  const mime = MIME[ext] ?? "application/octet-stream";

  try {
    const body = fs.readFileSync(filePath);
    res.writeHead(200, { "Content-Type": mime });
    if (mime.startsWith("text/html")) {
      res.end(body.toString().replace("</body>", `${RELOAD_SCRIPT}</body>`));
    } else {
      res.end(body);
    }
  } catch {
    res.writeHead(500);
    res.end("Internal Server Error");
  }
});

server.listen(PORT, () => {
  console.log(`Dev server: http://localhost:${PORT}`);
});

// ファイル変更の監視とリビルド
let debounce: ReturnType<typeof setTimeout> | null = null;

function scheduleRebuild(changed: string) {
  if (debounce) clearTimeout(debounce);
  debounce = setTimeout(() => {
    console.log(`Changed: ${changed} — rebuilding...`);
    try {
      build();
      broadcast();
    } catch (err) {
      console.error("Build failed:", err);
    }
  }, 150);
}

const WATCH_PATHS = [
  path.join(process.cwd(), "posts"),
  path.join(process.cwd(), "style.css"),
  path.join(process.cwd(), "variables.css"),
];

for (const p of WATCH_PATHS) {
  if (fs.existsSync(p)) {
    fs.watch(p, { recursive: true }, (_evt, filename) => {
      scheduleRebuild(filename ?? p);
    });
  }
}

// 初回ビルド
console.log("Building...");
build();
console.log("Watching for changes...");
