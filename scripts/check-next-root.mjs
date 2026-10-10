import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const required = ["package.json", "app/page.tsx", "app/layout.tsx", "next.config.ts", "scripts/prepare-standalone.mjs"];
const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
const pkgPath = path.join(root, "package.json");
let hasNext = false;
try {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  hasNext = Boolean(pkg.dependencies?.next || pkg.devDependencies?.next);
} catch {
  // The detailed missing-file message below will explain the root problem.
}
if (!hasNext) missing.push("package.json dependency: next");

if (missing.length) {
  console.error("\n[Railway preflight] Next.js project root is incomplete.");
  console.error(`Working directory: ${root}`);
  console.error(`Missing requirements: ${missing.join(", ")}`);
  console.error("Required top-level layout: package.json, next.config.ts, app/page.tsx, app/layout.tsx, scripts/prepare-standalone.mjs");
  console.error("On Railway, set Root Directory to the folder containing these files, then commit and deploy this project's files.");
  process.exit(1);
}
console.log(`[Railway preflight] Next.js project root verified: ${root}`);
console.log(`[Railway preflight] App Router entry: ${path.join(root, "app")}`);
