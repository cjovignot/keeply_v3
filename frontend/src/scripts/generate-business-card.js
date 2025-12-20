#!/usr/bin/env node

import sharp from "sharp";
import fs from "fs";
import path from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

/* --------------------------------------------------
 * Résolution des chemins (ESM)
 * -------------------------------------------------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* --------------------------------------------------
 * Lecture version depuis package.json
 * -------------------------------------------------- */
const pkgPath = path.resolve(__dirname, "../../package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
const appVersion = `version ${pkg.version}`;

/* --------------------------------------------------
 * Chemins assets
 * -------------------------------------------------- */
const logoPath = path.resolve(__dirname, "../assets/logo.png");
const QRCodePath = path.resolve(
  __dirname,
  "../assets/link_keeeply_transparent.png"
);

const outputDir = path.resolve(__dirname, "../../public/business-card");

if (!fs.existsSync(logoPath)) {
  console.warn("⚠️ Carte de visite skipped: logo.png introuvable");
  process.exit(0);
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

/* --------------------------------------------------
 * Dimensions carte de visite (85 × 55 mm @ 300 DPI)
 * -------------------------------------------------- */
const width = 1004;
const height = 650;

/* --------------------------------------------------
 * Style visuel
 * -------------------------------------------------- */
const colors = {
  top: "#020617",
  upper: "#030712",
  lower: "#0f172a",
  bottom: "#020617",
};

const borderColor = "#fdc700";
const borderWidth = 2;
const borderMargin = 50;

/* --------------------------------------------------
 * SVG du background commun (recto + verso)
 * -------------------------------------------------- */
function generateBackgroundSVG() {
  return `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${colors.top}" />
      <stop offset="35%" stop-color="${colors.upper}" />
      <stop offset="70%" stop-color="${colors.lower}" />
      <stop offset="100%" stop-color="${colors.bottom}" />
    </linearGradient>

    <radialGradient id="vignette" cx="50%" cy="45%" r="70%">
      <stop offset="60%" stop-color="rgba(0,0,0,0)" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.35)" />
    </radialGradient>
  </defs>

  <rect width="100%" height="100%" fill="url(#bg)" />
  <rect width="100%" height="100%" fill="url(#vignette)" />

  <rect 
    x="${borderMargin + borderWidth / 2}"
    y="${borderMargin + borderWidth / 2}"
    width="${width - 2 * borderMargin - borderWidth}"
    height="${height - 2 * borderMargin - borderWidth}"
    fill="none"
    stroke="${borderColor}"
    stroke-width="${borderWidth}"
    rx="0"
    ry="0"
  />
</svg>
`;
}

/* --------------------------------------------------
 * Génération du recto
 * -------------------------------------------------- */
async function createFront() {
  console.log("ℹ Génération du recto…");

  const bg = sharp(Buffer.from(generateBackgroundSVG()));

  const logo = sharp(logoPath);
  const meta = await logo.metadata();

  const targetWidth = Math.round(width * 0.6);
  const targetHeight = Math.round(targetWidth * (meta.height / meta.width));

  const resizedLogo = await logo.resize(targetWidth).toBuffer();

  const fileName = "business-card-front.png";

  await bg
    .composite([
      {
        input: resizedLogo,
        top: Math.round(height / 2 - targetHeight / 2),
        left: Math.round(width / 2 - targetWidth / 2),
      },
    ])
    .png()
    .toFile(path.join(outputDir, fileName));

  console.log(`✔ ${fileName} généré`);
}

/* --------------------------------------------------
 * Génération du verso
 * -------------------------------------------------- */
async function createBack() {
  console.log("ℹ Génération du verso…");

  const bg = sharp(Buffer.from(generateBackgroundSVG()));

  const qr = sharp(QRCodePath);
  const meta = await qr.metadata();

  const targetWidth = Math.round(width * 0.2);
  const targetHeight = Math.round(targetWidth * (meta.height / meta.width));

  const resizedQR = await qr.resize(targetWidth).toBuffer();

  const fileName = "business-card-back.png";

  await bg
    .composite([
      {
        input: resizedQR,
        top: Math.round(height / 2 - targetHeight / 2),
        left: Math.round(width / 2 - targetWidth / 2),
      },
    ])
    .png()
    .toFile(path.join(outputDir, fileName));

  console.log(`✔ ${fileName} généré`);
}

/* --------------------------------------------------
 * Exécution
 * -------------------------------------------------- */
(async () => {
  try {
    await createFront();
    await createBack();
    console.log("🎉 Carte de visite (recto + verso) générée !");
  } catch (err) {
    console.warn("⚠️ Échec génération business card:", err.message);
    process.exit(0);
  }
})();
