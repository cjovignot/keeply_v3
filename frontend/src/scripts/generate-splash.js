import sharp from "sharp";
import fs from "fs";
import path from "path";
import { readFileSync } from "fs";

const pkg = JSON.parse(
  readFileSync(new URL("../../package.json", import.meta.url))
);

const appVersion = `version ${pkg.version}`;

const logoPath = "./assets/logo.png";
const outputDir = "../public/splash/";

const colors = {
  top: "#020617", // très sombre
  upper: "#030712", // slate-950
  lower: "#0f172a", // slate-900
  bottom: "#020617", // retour sombre
};

const logoScale = 0.8; // % de la largeur écran

// Tailles iOS principales (portrait)
const screens = [
  { name: "iphone-750x1334", width: 750, height: 1334 },
  { name: "iphone-828x1792", width: 828, height: 1792 },
  { name: "iphone-1170x2532", width: 1170, height: 2532 },
  { name: "iphone-1179x2556", width: 1179, height: 2556 },
  { name: "iphone-1290x2796", width: 1290, height: 2796 },
  { name: "ipad-1668x2388", width: 1668, height: 2388 },
  { name: "ipad-2048x2732", width: 2048, height: 2732 },
];

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function createSplash({ name, width, height }) {
  const logo = sharp(logoPath);
  const logoMeta = await logo.metadata();

  const logoWidth = Math.round(width * logoScale);
  const logoHeight = Math.round(logoWidth * (logoMeta.height / logoMeta.width));

  const gradientSvg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>

    <!-- Gradient principal -->
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${colors.top}" />
      <stop offset="35%" stop-color="${colors.upper}" />
      <stop offset="70%" stop-color="${colors.lower}" />
      <stop offset="100%" stop-color="${colors.bottom}" />
    </linearGradient>

    <!-- Vignette -->
    <radialGradient id="vignette" cx="50%" cy="45%" r="70%">
      <stop offset="60%" stop-color="rgba(0,0,0,0)" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.35)" />
    </radialGradient>

  </defs>

  <!-- Fond -->
  <rect width="100%" height="100%" fill="url(#bg)" />
  <rect width="100%" height="100%" fill="url(#vignette)" />

  <!-- Version -->
  <text
    x="50%"
    y="${height - Math.round(height * 0.05)}"
    text-anchor="middle"
    fill="#ffdd0076"
    font-size="${Math.round(height * 0.018)}"
    font-family="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    letter-spacing="1"
  >
    ${appVersion}
  </text>

</svg>
`;

  const background = sharp(Buffer.from(gradientSvg));

  const resizedLogo = await logo.resize(logoWidth).toBuffer();

  await background
    .composite([
      {
        input: resizedLogo,
        top: Math.round(height / 2 - logoHeight / 2),
        left: Math.round(width / 2 - logoWidth / 2),
      },
    ])
    .png()
    .toFile(path.join(outputDir, `${name}.png`));

  console.log(`✔ ${name}.png généré`);
}

(async () => {
  for (const screen of screens) {
    await createSplash(screen);
  }
})();
