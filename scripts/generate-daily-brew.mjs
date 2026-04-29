#!/usr/bin/env node
/**
 * Daily Brew Generator
 * Fetches VoIP/IT headlines from industry sources, calls Claude,
 * and prepends a new blog post to app/data/daily-brew-posts.json.
 *
 * Run:  node scripts/generate-daily-brew.mjs
 * Env:  ANTHROPIC_API_KEY required
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Writes to DRAFTS — a separate publish workflow moves drafts → posts at 9 AM ET
const DATA_FILE  = path.join(__dirname, "../app/data/daily-brew-drafts.json");

// ─── Sources ──────────────────────────────────────────────────────────────────
// type: "rss"  → parse as RSS/Atom XML
// type: "html" → scrape <h2>/<h3> headlines from the page
const SOURCES = [
  { name: "Nextiva Blog",          type: "rss",  url: "https://www.nextiva.com/blog/feed/" },
  { name: "Bleeping Computer VoIP",type: "rss",  url: "https://www.bleepingcomputer.com/tag/voip/feed/" },
  { name: "Tom's Hardware",        type: "rss",  url: "https://www.tomshardware.com/feeds/all" },
  { name: "ZDNet Networking",      type: "rss",  url: "https://www.zdnet.com/topic/networking/rss.xml" },
  { name: "PR Newswire Telecom",   type: "rss",  url: "https://www.prnewswire.com/rss/news-releases-list.rss" },
  { name: "TMCnet VoIP",           type: "html", url: "https://www.tmcnet.com/voip/" },
  { name: "OnSIP Resources",       type: "html", url: "https://www.onsip.com/resources-library" },
  { name: "VoiceNext Blog",        type: "html", url: "https://www.voicenext.com/blog/" },
  { name: "VoIP Mechanic News",    type: "html", url: "https://www.voipmechanic.com/voip-news.htm" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function cleanText(str) {
  return str
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g,  "&")
    .replace(/&lt;/g,   "<")
    .replace(/&gt;/g,   ">")
    .replace(/&quot;/g, '"')
    .replace(/&#\d+;/g, "")
    .replace(/&[a-z]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTag(xml, tag) {
  const rx = new RegExp(
    `<${tag}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`, "i"
  );
  const m = rx.exec(xml);
  return m ? cleanText(m[1]) : "";
}

function parseRSS(xml) {
  const items = [];
  const rx = /<item[\s>]([\s\S]*?)<\/item>/gi;
  let m;
  while ((m = rx.exec(xml)) !== null) {
    const title = extractTag(m[1], "title");
    const desc  = extractTag(m[1], "description");
    if (title && title.length > 10) {
      const snippet = desc ? ` — ${desc.slice(0, 100)}` : "";
      items.push(`${title}${snippet}`);
    }
  }
  return items.slice(0, 8);
}

function parseHTML(html) {
  const headlines = new Set();
  const rx = /<h[123][^>]*>([\s\S]*?)<\/h[123]>/gi;
  let m;
  while ((m = rx.exec(html)) !== null) {
    const text = cleanText(m[1]);
    if (text.length > 20 && text.length < 160) headlines.add(text);
  }
  return [...headlines].slice(0, 8);
}

async function fetchWithTimeout(url, ms = 12000) {
  const ac    = new AbortController();
  const timer = setTimeout(() => ac.abort(), ms);
  try {
    const r = await fetch(url, {
      signal:  ac.signal,
      headers: { "User-Agent": "NeedIT-DailyBrew/1.0 (+https://needitconsulting.com)" },
    });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return await r.text();
  } finally {
    clearTimeout(timer);
  }
}

function toSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60)
    .replace(/-+$/, "");
}

function estimateReadTime(content) {
  const words = content
    .map((b) => (b.type === "list" ? b.items.join(" ") : b.text || ""))
    .join(" ")
    .split(/\s+/).length;
  return `${Math.max(2, Math.round(words / 200))} min read`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("❌  ANTHROPIC_API_KEY is not set.");
    process.exit(1);
  }

  // Today's formatted date
  const today   = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });

  // Load existing posts — skip if today's already there
  let existingPosts = [];
  try {
    existingPosts = JSON.parse(await fs.readFile(DATA_FILE, "utf8"));
  } catch { /* file may not exist yet */ }

  if (existingPosts.some((p) => p.date === dateStr)) {
    console.log(`✓  Daily Brew already exists for ${dateStr}. Nothing to do.`);
    return;
  }

  // Collect headlines from all sources
  console.log("\n📡  Collecting headlines…\n");
  const allHeadlines = [];

  for (const src of SOURCES) {
    try {
      process.stdout.write(`  ${src.name}… `);
      const text  = await fetchWithTimeout(src.url);
      const items = src.type === "rss" ? parseRSS(text) : parseHTML(text);
      console.log(`${items.length} headlines`);
      allHeadlines.push(...items.map((h) => `[${src.name}] ${h}`));
    } catch (err) {
      console.log(`skipped (${err.message})`);
    }
  }

  if (allHeadlines.length < 5) {
    console.error("\n❌  Fewer than 5 headlines collected — not enough signal. Aborting.");
    process.exit(1);
  }

  console.log(`\n✓  ${allHeadlines.length} headlines collected.\n`);

  // Build prompt
  const headlineBlock = allHeadlines.slice(0, 40).join("\n");
  const prompt = `You are Intecha, NeedIT Consulting's AI consultant mascot. You are sassy, confident, occasionally petty about bad IT decisions, but always genuinely knowledgeable and useful. You cut through vendor marketing fluff and give small business owners real, actionable advice. You speak in plain language, name names, and have strong opinions.

You're writing today's "Daily Brew" — a sharp morning-read (600–800 words) about the most interesting VoIP or business IT story from the past 24 hours.

Today's top headlines from VoIP and IT industry sources:
${headlineBlock}

Pick the SINGLE most newsworthy or interesting topic. Write the Daily Brew post from your perspective: what's happening, why it matters to small businesses, and what they should actually do about it. Be specific. Be opinionated. Don't be generic.

Return ONLY a valid JSON object — no markdown code fences, no explanation, nothing before or after the JSON:
{
  "title": "Punchy, opinionated headline that would make someone stop scrolling",
  "excerpt": "One-sentence hook that makes someone want to read this over morning coffee",
  "topic": "The core topic in 3–5 words",
  "content": [
    {"type": "p", "text": "Opening paragraph — jump straight in, no throat-clearing"},
    {"type": "h2", "text": "Section heading"},
    {"type": "p", "text": "..."},
    {"type": "list", "items": ["specific point", "specific point", "specific point"]},
    {"type": "callout", "text": "A bold stat, key fact, or claim worth highlighting"},
    {"type": "tip", "label": "Intecha's Take", "text": "Direct, opinionated advice for the small business owner reading this"},
    {"type": "h2", "text": "Another section if needed"},
    {"type": "p", "text": "..."}
  ]
}

Rules:
- Block types: p, h2, h3, list (with items array), callout, tip (with label and text)
- 7–10 content blocks total
- No filler, no generic "in conclusion", no "it remains to be seen"
- Write like you've seen this pattern a hundred times and you're done watching businesses get burned by it`;

  // Call Claude
  console.log("🤖  Calling Claude API…");
  let rawResponse;
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method:  "POST",
      headers: {
        "x-api-key":         apiKey,
        "anthropic-version": "2023-06-01",
        "content-type":      "application/json",
      },
      body: JSON.stringify({
        model:      "claude-haiku-4-5-20251001",
        max_tokens: 4000,
        messages:   [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`${res.status} — ${err}`);
    }

    const data = await res.json();
    rawResponse = data.content[0].text.trim();
  } catch (err) {
    console.error("❌  Claude API failed:", err.message);
    process.exit(1);
  }

  // Strip markdown fences if Claude wrapped it anyway
  rawResponse = rawResponse
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();

  // Parse
  let generated;
  try {
    generated = JSON.parse(rawResponse);
  } catch (err) {
    console.error("❌  Could not parse Claude's response as JSON.");
    console.error("    First 500 chars:", rawResponse.slice(0, 500));
    process.exit(1);
  }

  // Build full post object
  const dateSlug = today.toISOString().slice(0, 10);
  const post = {
    slug:     `daily-brew-${toSlug(generated.title)}-${dateSlug}`,
    title:    generated.title,
    excerpt:  generated.excerpt,
    category: "Daily Brew",
    date:     dateStr,
    readTime: estimateReadTime(generated.content),
    content:  generated.content,
  };

  // Prepend to file
  const updated = [post, ...existingPosts];
  await fs.writeFile(DATA_FILE, JSON.stringify(updated, null, 2) + "\n", "utf8");

  console.log(`\n✅  Daily Brew published!`);
  console.log(`    Title:    "${post.title}"`);
  console.log(`    Slug:     ${post.slug}`);
  console.log(`    Date:     ${post.date}`);
  console.log(`    ReadTime: ${post.readTime}`);
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
