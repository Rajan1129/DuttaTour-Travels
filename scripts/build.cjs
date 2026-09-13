const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const clientDist = path.join(rootDir, "client", "dist");
const rootDist = path.join(rootDir, "dist");

console.log("==> Building client with Vite...");
execSync("npm run build --workspace=client", {
  cwd: rootDir,
  stdio: "inherit",
});

if (!fs.existsSync(clientDist)) {
  console.error("ERROR: client/dist was not created by Vite!");
  process.exit(1);
}

console.log("==> Mirroring client/dist to root dist...");
fs.cpSync(clientDist, rootDist, { recursive: true, force: true });

const rootIndex = path.join(rootDist, "index.html");
if (fs.existsSync(rootIndex)) {
  const stat = fs.statSync(rootIndex);
  console.log(`==> SUCCESS: dist/index.html verified (${stat.size} bytes).`);
  console.log("==> Both ./dist and ./client/dist are ready for deployment.");
} else {
  console.error("ERROR: Failed to mirror build to root dist!");
  process.exit(1);
}
