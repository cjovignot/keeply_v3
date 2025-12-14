#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/* --------------------------------------------------
 * Résolution des chemins (ESM-safe)
 * -------------------------------------------------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const manifestPath = path.resolve(
  __dirname,
  "../../public/manifest.webmanifest"
);

/* --------------------------------------------------
 * Lecture manifest
 * -------------------------------------------------- */
if (!fs.existsSync(manifestPath)) {
  console.warn("⚠️ manifest.webmanifest introuvable");
  process.exit(0);
}

const raw = fs.readFileSync(manifestPath, "utf-8");
let manifest;

try {
  manifest = JSON.parse(raw);
} catch (e) {
  console.error("❌ manifest.webmanifest invalide (JSON)");
  process.exit(1);
}

/* --------------------------------------------------
 * Gestion start_url
 * -------------------------------------------------- */
const currentStartUrl = manifest.start_url || "/";
const url = new URL(currentStartUrl, "https://dummy.local");

const paramKey = url.searchParams.has("pwa")
  ? "pwa"
  : url.searchParams.has("v")
  ? "v"
  : "pwa";

const currentVersion = parseInt(url.searchParams.get(paramKey) || "0", 10);
const nextVersion = currentVersion + 1;

console.log("currentURL", currentStartUrl);
console.log("currentVersion", currentVersion);
console.log("nextVersion", nextVersion);

url.searchParams.set(paramKey, nextVersion.toString());

const newStartUrl = url.pathname + "?" + url.searchParams.toString();
manifest.start_url = newStartUrl;

/* --------------------------------------------------
 * Écriture manifest (formaté)
 * -------------------------------------------------- */
fs.writeFileSync(
  manifestPath,
  JSON.stringify(manifest, null, 2) + "\n",
  "utf-8"
);

console.log(`🚀 start_url mis à jour : ${currentStartUrl} → ${newStartUrl}`);
