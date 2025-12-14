#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/* --------------------------------------------------
 * Résolution des chemins (ESM-safe)
 * -------------------------------------------------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const indexPath = path.resolve(__dirname, "../../index.html");
const splashDir = path.resolve(__dirname, "../../public/splash");

/* --------------------------------------------------
 * Lire tous les fichiers splash versionnés
 * -------------------------------------------------- */
const splashFiles = fs
  .readdirSync(splashDir)
  .filter((f) => f.endsWith(".png") && /-v\d+/.test(f));

if (splashFiles.length === 0) {
  console.warn("⚠️ Aucun splash screen versionné trouvé dans", splashDir);
  process.exit(0);
}

/* --------------------------------------------------
 * Détecter la dernière version
 * -------------------------------------------------- */
const versionRegex = /-v(\d+)\.png$/;
let maxVersion = 0;

splashFiles.forEach((f) => {
  const match = f.match(versionRegex);
  if (match) {
    const v = parseInt(match[1], 10);
    if (v > maxVersion) maxVersion = v;
  }
});

const newVersion = maxVersion;
console.log(`ℹ Dernière version détectée : v${newVersion}`);

/* --------------------------------------------------
 * Lire index.html
 * -------------------------------------------------- */
let indexContent = fs.readFileSync(indexPath, "utf-8");

/* --------------------------------------------------
 * Détecter la section iOS Splash Screens
 * -------------------------------------------------- */
const splashSectionRegex =
  /(<!-- 🍎 iOS Splash Screens -->)([\s\S]*?)(<!-- 🔐 Google OAuth -->)/i;
const match = indexContent.match(splashSectionRegex);

if (!match) {
  console.warn(
    "⚠️ Impossible de détecter la section iOS Splash Screens dans index.html"
  );
  process.exit(0);
}

const splashStart = match[1];
const splashEnd = match[3];

/* --------------------------------------------------
 * Mapper les fichiers splash existants pour créer les nouveaux liens
 * -------------------------------------------------- */
const splashLinks = [
  {
    name: "iphone-750x1334",
    media:
      "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
  },
  {
    name: "iphone-828x1792",
    media:
      "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
  },
  {
    name: "iphone-1170x2532",
    media:
      "(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
  },
  {
    name: "iphone-1179x2556",
    media:
      "(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
  },
  {
    name: "iphone-1290x2796",
    media:
      "(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
  },
  {
    name: "ipad-1668x2388",
    media:
      "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
  },
  {
    name: "ipad-2048x2732",
    media:
      "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
  },
];

// Générer les liens mis à jour avec la dernière version
let newLinks = splashLinks
  .map((s) => {
    const file = `${s.name}-v${newVersion}.png`;
    return `    <link\n      rel="apple-touch-startup-image"\n      href="/splash/${file}"\n      media="${s.media}"\n    />`;
  })
  .join("\n\n");

// Conserver le format et indentation actuelle
const updatedSection = `${splashStart}\n\n${newLinks}\n\n${splashEnd}`;

/* --------------------------------------------------
 * Remplacer la section dans index.html
 * -------------------------------------------------- */
indexContent = indexContent.replace(splashSectionRegex, updatedSection);

/* --------------------------------------------------
 * Écrire le fichier mis à jour
 * -------------------------------------------------- */
fs.writeFileSync(indexPath, indexContent, "utf-8");
console.log(`✅ index.html mis à jour avec les splashs version v${newVersion}`);
