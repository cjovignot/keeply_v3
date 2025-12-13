#!/usr/bin/env node

import fs from "fs";
import path from "path";

/**
 * ============================================================
 * 📚 Documentation des niveaux de commit et versioning
 * ============================================================
 *
 * Niveaux principaux de commit :
 *
 * [BREAKING]   : Changement incompatible ou rupture d’API → bump MAJOR
 * [FEATURE]    : Nouvelle fonctionnalité compatible → bump MINOR
 * [FIX]        : Correction d’un bug → bump PATCH
 * [HOTFIX]     : Correction urgente en production → bump PATCH
 * [REFACTOR]   : Modification du code sans changement fonctionnel → bump PATCH
 * [PERF]       : Amélioration de performance → bump PATCH
 * [DOCS]       : Documentation uniquement → pas de bump
 * [TEST]       : Ajout ou modification de tests → pas de bump
 * [CHORE]      : Tâches diverses / config / scripts → pas de bump
 * [STYLE]      : Modifications de style / formatage → pas de bump
 *
 * Pré-releases (versions instables) :
 *
 * -alpha       : Version expérimentale / interne, tests en cours
 * -beta        : Version plus complète mais pas totalement stable
 * -rc (release candidate) : Version quasi finale, test avant release stable
 *
 * Exemples :
 *   [FEATURE-ALPHA] → incrémente MINOR + suffixe -alpha.N (ex: 1.2.0-alpha.1)
 *   [FIX-BETA]      → incrémente PATCH + suffixe -beta.N  (ex: 1.2.0-beta.1)
 *   [BREAKING-RC]   → incrémente MAJOR + suffixe -rc.N    (ex: 2.0.0-rc.1)
 *
 * Règles SemVer :
 *   MAJOR : changements incompatibles
 *   MINOR : nouvelles fonctionnalités compatibles
 *   PATCH : corrections ou améliorations mineures
 *
 * Bonnes pratiques :
 * - Toujours préfixer le message de commit avec le niveau [LEVEL]
 * - Ajouter un pré-release si la version est instable : [FEATURE-ALPHA]
 * - Ne pas mettre de pré-release pour DOCS, TEST, CHORE, STYLE
 * - Chaque type de pré-release a son compteur indépendant
 *   (ex: alpha.1 → alpha.2, beta.1 → beta.2)
 * - Une fois la version stable, retirer le suffixe pré-release
 *
 * ============================================================
 */

// ---------------------------
// Chemins
// ---------------------------

// chemin du package.json relatif au script
const PACKAGE_PATH = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  "../../package.json"
);

// chemin du message de commit
const commitMsgPath = path.resolve(".git/COMMIT_EDITMSG");
const commitMsg = fs.readFileSync(commitMsgPath, "utf-8").trim();

// ---------------------------
// Extraire niveau + pré-release
// ---------------------------

/**
 * Exemple de commit :
 * [FEATURE] ajout de la fonctionnalité
 * [FEATURE-ALPHA] test alpha
 * [FIX-BETA] correction beta
 */
const commitRegex = /^\[([\w-]+)\]/;
const match = commitMsg.match(commitRegex);
const levelRaw = match ? match[1].toUpperCase() : null;

if (!levelRaw) {
  console.log("ℹ️ Commit sans niveau reconnu → pas de bump");
  process.exit(0);
}

// Séparer le type de bump et le pré-release
let [level, preReleaseTag] = levelRaw.split("-");
preReleaseTag = preReleaseTag ? preReleaseTag.toLowerCase() : null;

// ---------------------------
// Mapping niveau → type de bump
// ---------------------------

const bumpMap = {
  BREAKING: "major",
  FEATURE: "minor",
  FIX: "patch",
  HOTFIX: "patch",
  REFACTOR: "patch",
  PERF: "patch",
};

const bumpType = bumpMap[level];

if (!bumpType) {
  console.log(`ℹ️ Commit "${level}" → pas de bump de version`);
  process.exit(0);
}

// ---------------------------
// Lire package.json
// ---------------------------

const pkg = JSON.parse(fs.readFileSync(PACKAGE_PATH, "utf-8"));
let version = pkg.version;

// Séparer version existante et pré-release existante
let [mainVersion, preRelease] = version.split("-");
let [major, minor, patch] = mainVersion.split(".").map(Number);

// ---------------------------
// Incrémenter version
// ---------------------------

switch (bumpType) {
  case "major":
    major++;
    minor = 0;
    patch = 0;
    break;
  case "minor":
    minor++;
    patch = 0;
    break;
  case "patch":
    patch++;
    break;
}

// ---------------------------
// Gérer pré-release
// ---------------------------

let preReleaseCounter = 1;

if (preReleaseTag) {
  if (preRelease && preRelease.startsWith(preReleaseTag)) {
    // Incrémenter le numéro existant
    const parts = preRelease.split(".");
    if (parts[1]) {
      preReleaseCounter = Number(parts[1]) + 1;
    }
  }
  preRelease = `${preReleaseTag}.${preReleaseCounter}`;
} else {
  preRelease = null; // pas de pré-release
}

// ---------------------------
// Construire nouvelle version
// ---------------------------

const newVersion = preRelease
  ? `${major}.${minor}.${patch}-${preRelease}`
  : `${major}.${minor}.${patch}`;
pkg.version = newVersion;

// ---------------------------
// Écrire package.json
// ---------------------------

fs.writeFileSync(PACKAGE_PATH, JSON.stringify(pkg, null, 2) + "\n");
console.log(`🚀 Version bump → ${newVersion}`);
