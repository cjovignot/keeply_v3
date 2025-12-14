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
 * Pré-releases (état de la version) :
 *
 * -alpha       : Version expérimentale / interne
 * -beta        : Version fonctionnelle mais instable
 * -rc          : Release candidate (quasi finale)
 *
 * Exemples :
 *   [FEATURE-ALPHA] → 1.4.0-alpha.1
 *   [FIX-ALPHA]     → 1.4.0-alpha.2
 *   [CHORE-ALPHA]   → 1.4.0-alpha.3
 *   [FEATURE-BETA]  → 1.4.0-beta.1
 *   [RELEASE]       → 1.4.0
 *
 * Règle fondamentale :
 * - Le TYPE (FEATURE, FIX…) décide du bump numérique
 * - Le SUFFIXE (alpha, beta, rc) décide de l’état de la version
 *
 * ============================================================
 */

// ------------------------------------------------------------
// Chemins
// ------------------------------------------------------------

const PACKAGE_PATH = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  "../../package.json"
);

const COMMIT_MSG_PATH = path.resolve(".git/COMMIT_EDITMSG");

// ------------------------------------------------------------
// Lecture du message de commit
// ------------------------------------------------------------

const commitMsg = fs.readFileSync(COMMIT_MSG_PATH, "utf-8").trim();

const commitMatch = commitMsg.match(/^\[([A-Z]+)(?:-([A-Z]+))?\]/i);

if (!commitMatch) {
  console.log("ℹ️ Commit sans niveau reconnu → pas de bump");
  process.exit(0);
}

const level = commitMatch[1].toUpperCase();
const channel = commitMatch[2]?.toLowerCase() ?? null;

// ------------------------------------------------------------
// Mapping niveau → type de bump
// ------------------------------------------------------------

const bumpMap = {
  BREAKING: "major",
  FEATURE: "minor",
  FIX: "patch",
  HOTFIX: "patch",
  REFACTOR: "patch",
  PERF: "patch",
};

const bumpType = bumpMap[level] ?? null;

// ------------------------------------------------------------
// Lecture et parsing de la version actuelle
// ------------------------------------------------------------

const pkg = JSON.parse(fs.readFileSync(PACKAGE_PATH, "utf-8"));

const versionMatch = pkg.version.match(
  /^(\d+)\.(\d+)\.(\d+)(?:-(alpha|beta|rc)\.(\d+))?$/
);

if (!versionMatch) {
  console.error(`❌ Version invalide dans package.json : ${pkg.version}`);
  process.exit(1);
}

let major = Number(versionMatch[1]);
let minor = Number(versionMatch[2]);
let patch = Number(versionMatch[3]);
let currentChannel = versionMatch[4] ?? null;
let prereleaseNumber = Number(versionMatch[5] ?? 0);

// ------------------------------------------------------------
// Bump numérique (si applicable)
// ------------------------------------------------------------

if (bumpType) {
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

  // Changement de version → reset du pré-release
  prereleaseNumber = 0;
  currentChannel = null;
}

// ------------------------------------------------------------
// Gestion des pré-releases
// ------------------------------------------------------------

if (channel) {
  if (currentChannel === channel) {
    prereleaseNumber++;
  } else {
    currentChannel = channel;
    prereleaseNumber = 1;
  }
}

// ------------------------------------------------------------
// Construction de la nouvelle version
// ------------------------------------------------------------

let newVersion = `${major}.${minor}.${patch}`;

if (currentChannel) {
  newVersion += `-${currentChannel}.${prereleaseNumber}`;
}

pkg.version = newVersion;

// ------------------------------------------------------------
// Écriture
// ------------------------------------------------------------

fs.writeFileSync(PACKAGE_PATH, JSON.stringify(pkg, null, 2) + "\n");

console.log(`🚀 Version bump → ${newVersion}`);
