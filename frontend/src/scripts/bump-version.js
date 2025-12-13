#!/usr/bin/env node

import fs from "fs";
import { execSync } from "child_process";
import path from "path";

// chemin du package.json relatif au script
const PACKAGE_PATH = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  "../../package.json"
);

// Chemin du message de commit
const commitMsgPath = path.resolve(".git/COMMIT_EDITMSG");
const commitMsg = fs.readFileSync(commitMsgPath, "utf-8").trim();

// Extraire le niveau comme avant
const match = commitMsg.match(/^\[(\w+)\]/);
const level = match ? match[1].toUpperCase() : null;

// 3. Mapping niveau → type de bump
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

// 4. Lire package.json
const pkg = JSON.parse(fs.readFileSync(PACKAGE_PATH, "utf-8"));
let [major, minor, patch] = pkg.version.split(".").map(Number);

// 5. Incrémenter
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

const newVersion = `${major}.${minor}.${patch}`;
pkg.version = newVersion;

// 6. Écrire package.json
fs.writeFileSync(PACKAGE_PATH, JSON.stringify(pkg, null, 2) + "\n");

console.log(`🚀 Version bump → ${newVersion}`);
