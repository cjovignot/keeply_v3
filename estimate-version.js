#!/usr/bin/env node

import { execSync } from "child_process";

// Mapping niveau → bump
const bumpMap = {
  BREAKING: "major",
  FEATURE: "minor",
  FIX: "patch",
  HOTFIX: "patch",
  REFACTOR: "patch",
  PERF: "patch",
};

// Version de départ
let major = 0;
let minor = 0;
let patch = 0;

// Récupérer tous les commits
const log = execSync('git log --pretty=format:"%s"', { encoding: "utf-8" });
const commits = log.split("\n");

// Parcourir les commits
commits.forEach((commit) => {
  const match = commit.match(/^\[([\w-]+)\]/);
  if (!match) return;

  let [level, preRelease] = match[1].toUpperCase().split("-");

  const bumpType = bumpMap[level];
  if (!bumpType) return;

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
});

// Afficher la version estimée
console.log(`Version estimée : ${major}.${minor}.${patch}`);
