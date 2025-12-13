#!/usr/bin/env node

import fs from "fs";
import path from "path";

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
