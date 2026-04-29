#!/usr/bin/env node
/**
 * Daily Brew Publisher
 * Moves the most recent draft from daily-brew-drafts.json
 * into daily-brew-posts.json so Vercel picks it up and deploys.
 *
 * Run:  node scripts/publish-daily-brew.mjs
 * Called by the daily-brew-publish GitHub Actions workflow at 9 AM ET.
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname  = path.dirname(fileURLToPath(import.meta.url));
const DRAFTS_FILE = path.join(__dirname, "../app/data/daily-brew-drafts.json");
const POSTS_FILE  = path.join(__dirname, "../app/data/daily-brew-posts.json");

async function main() {
  // Load drafts
  let drafts = [];
  try {
    drafts = JSON.parse(await fs.readFile(DRAFTS_FILE, "utf8"));
  } catch {
    console.error("❌  Could not read daily-brew-drafts.json");
    process.exit(1);
  }

  if (drafts.length === 0) {
    console.log("⚠️   No drafts found — nothing to publish today.");
    process.exit(0);
  }

  // The most recent draft is always first (we prepend on write)
  const draft = drafts[0];

  // Load existing published posts
  let posts = [];
  try {
    posts = JSON.parse(await fs.readFile(POSTS_FILE, "utf8"));
  } catch { /* first run, file may not exist */ }

  // Skip if already published (guard against double-runs)
  if (posts.some((p) => p.slug === draft.slug)) {
    console.log(`✓  "${draft.title}" is already published. Nothing to do.`);
    process.exit(0);
  }

  // Prepend draft to published posts
  const updated = [draft, ...posts];
  await fs.writeFile(POSTS_FILE, JSON.stringify(updated, null, 2) + "\n", "utf8");

  // Remove the draft that just went live (keep the rest)
  const remainingDrafts = drafts.slice(1);
  await fs.writeFile(DRAFTS_FILE, JSON.stringify(remainingDrafts, null, 2) + "\n", "utf8");

  console.log(`✅  Published: "${draft.title}"`);
  console.log(`    Date:      ${draft.date}`);
  console.log(`    Slug:      ${draft.slug}`);
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
