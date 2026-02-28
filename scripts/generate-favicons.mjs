import { readFile, writeFile, mkdir } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const src = join(root, "public", "parbhat-favicon.png");
const appDir = join(root, "src", "app");

const sizes = [
  [16, "icon1.png"],
  [32, "icon2.png"],
  [48, "icon3.png"],
];

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.warn("Installing sharp for image resizing...");
  const { execSync } = await import("child_process");
  execSync("npm install sharp --save-dev", { cwd: root, stdio: "inherit" });
  sharp = (await import("sharp")).default;
}

const buffer = await readFile(src);
for (const [size, name] of sizes) {
  const out = join(appDir, name);
  await sharp(buffer).resize(size, size).png().toFile(out);
  console.log(`Created ${name} (${size}x${size})`);
}

const appleOut = join(appDir, "apple-icon.png");
await sharp(buffer).resize(180, 180).png().toFile(appleOut);
console.log("Updated apple-icon.png (180x180)");

console.log("Done. Favicons will appear crisp in browser tabs.");
