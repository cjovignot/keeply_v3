#!/usr/bin/env node

import fs from "fs";
import path from "path";

/**
 * ============================================================
 * 📚 Système de versioning automatique basé sur les commits
 * ============================================================
 *
 * 🔰 Règle générale
 * Chaque commit doit commencer par l’un des formats suivants :
 *
 *    [TYPE]
 *    [TYPE-SUFFIXE]
 *
 * Le TYPE détermine le bump de version.
 * Le SUFFIXE (alpha/beta/rc) détermine l’état de pré-release.
 *
 * ------------------------------------------------------------
 * 🎯 TYPES de commit (et impact sur la version)
 * ------------------------------------------------------------
 *
 * [BREAKING]     → bump MAJOR (X.0.0)
 * [FEATURE]      → bump MINOR (x.X.0)
 * [FIX]          → bump PATCH (x.x.X)
 * [HOTFIX]       → bump PATCH
 * [REFACTOR]     → bump PATCH
 * [PERF]         → bump PATCH
 *
 * Types sans bump numérique :
 * [DOCS]         → documentation uniquement
 * [TEST]         → tests uniquement
 * [CHORE]        → maintenance / config
 * [STYLE]        → formatage / lint
 *
 * ------------------------------------------------------------
 * 🔀 Gestion des pré-releases
 * ------------------------------------------------------------
 *
 * Un commit peut ajouter un suffixe :
 *
 *    -ALPHA  → version expérimentale
 *    -BETA   → version instable mais testable
 *    -RC     → pré-release candidate
 *
 * Le suffixe s’ajoute après la version :
 *    1.4.0-alpha.1
 *    1.4.0-beta.1
 *    1.4.0-rc.1
 *
 * Règles :
 * - Si le TYPE provoque un bump, le compteur pré-release repart à 0.
 * - Si un suffixe est répété (ex: deux commits en ALPHA), alors .X est incrémenté.
 * - Changer de suffixe repart à .1.
 * - Un commit sans suffixe génère une version stable (ex: 1.4.0).
 *
 * ------------------------------------------------------------
 * 🧮 Exemples pratiques
 * ------------------------------------------------------------
 *
 * Version actuelle : 1.3.2
 *
 *  - [FEATURE] Ajout du mode sombre
 *        → 1.4.0
 *
 *  - [FEATURE-ALPHA] Ajout du mode sombre
 *        → 1.4.0-alpha.1
 *
 *  - [FIX-ALPHA] Correction d’un bug dans la feature
 *        → 1.4.0-alpha.2
 *
 *  - [FIX-BETA] Correction sur la version beta
 *        → 1.4.0-beta.1
 *
 *  - [BREAKING] Refonte de l’API
 *        → 2.0.0
 *
 *  - [CHORE-BETA] Mise à jour CI
 *        → 1.4.0-beta.2 (pas de bump numérique)
 *
 * ------------------------------------------------------------
 * 📌 Récapitulatif visuel
 * ------------------------------------------------------------
 *
 * TYPE → bump
 * SUFFIXE → état de la version
 *
 * BREAKING      → MAJOR
 * FEATURE       → MINOR
 * FIX / HOTFIX /
 * REFACTOR / PERF → PATCH
 *
 * DOCS / TEST / CHORE / STYLE → aucun bump
 *
 * Pré-releases possibles : -alpha.X / -beta.X / -rc.X
 *
 * ------------------------------------------------------------
 * À retenir :
 * - TYPE = impact du commit
 * - SUFFIXE = état de release
 * - Commits sans TYPE reconnu = aucun bump
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
