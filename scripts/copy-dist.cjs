const fs = require("fs");
const path = require("path");

const clientDist = path.resolve(__dirname, "../client/dist");
const rootDist = path.resolve(__dirname, "../dist");

try {
  if (fs.existsSync(clientDist)) {
    fs.cpSync(clientDist, rootDist, { recursive: true, force: true });
    console.log("==> [copy-dist] Copied client/dist to root dist successfully!");
  } else {
    console.warn("==> [copy-dist] Warning: client/dist not found yet.");
  }
} catch (err) {
  console.error("==> [copy-dist] Error copying dist:", err);
}
