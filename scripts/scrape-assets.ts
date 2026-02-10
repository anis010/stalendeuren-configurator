/**
 * Scrape product images from proinn.nl for local development.
 *
 * Usage:  npx tsx scripts/scrape-assets.ts
 *
 * Downloads hero, product, and detail images into public/images/.
 * Falls back to placeholder files with instructions if scraping fails.
 */

import axios from "axios";
import * as cheerio from "cheerio";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const BASE = "https://www.proinn.nl";
const OUT_DIR = join(__dirname, "..", "public", "images");

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

const http = axios.create({
  headers: { "User-Agent": UA },
  timeout: 15_000,
  maxRedirects: 5,
});

// Ensure output directory exists
mkdirSync(OUT_DIR, { recursive: true });

// ─── Helpers ────────────────────────────────────────────────
function abs(url: string): string {
  if (url.startsWith("//")) return "https:" + url;
  if (url.startsWith("/")) return BASE + url;
  if (url.startsWith("http")) return url;
  return BASE + "/" + url;
}

async function download(url: string, filename: string): Promise<boolean> {
  const dest = join(OUT_DIR, filename);
  try {
    console.log(`  ↓ ${url}`);
    const res = await http.get(url, { responseType: "arraybuffer" });
    writeFileSync(dest, res.data);
    const kb = Math.round(Buffer.byteLength(res.data) / 1024);
    console.log(`  ✓ Saved ${filename} (${kb} KB)`);
    return true;
  } catch (err: any) {
    console.log(`  ✗ Failed: ${err.message}`);
    return false;
  }
}

function writePlaceholder(filename: string) {
  const dest = join(OUT_DIR, filename);
  if (!existsSync(dest)) {
    writeFileSync(
      dest,
      `Drag a real image here to replace this placeholder.\nExpected: ${filename}\nSource: ${BASE}\n`
    );
    console.log(`  → Created placeholder: ${filename}`);
  }
}

// Pick the largest image from a set of candidates (by URL heuristic or data-src)
function pickBest(srcs: string[]): string | undefined {
  // Prefer larger sizes: sort descending by any numeric dimension in URL
  return srcs.sort((a, b) => {
    const numA = [...a.matchAll(/(\d{3,4})/g)].map(Number).sort((x, y) => y - x)[0] ?? 0;
    const numB = [...b.matchAll(/(\d{3,4})/g)].map(Number).sort((x, y) => y - x)[0] ?? 0;
    return numB - numA;
  })[0];
}

// ─── Main ───────────────────────────────────────────────────
async function main() {
  console.log("Scraping proinn.nl for assets…\n");

  // ── Fetch homepage ──────────────────────────────────────
  let $home: cheerio.CheerioAPI;
  try {
    const { data } = await http.get(BASE);
    $home = cheerio.load(data);
    console.log("✓ Homepage loaded\n");
  } catch (err: any) {
    console.log(`✗ Could not load homepage: ${err.message}`);
    console.log("  Creating placeholder files instead.\n");
    ["hero.jpg", "taats.jpg", "scharnier.jpg", "paneel.jpg", "about.jpg"].forEach(writePlaceholder);
    return;
  }

  // ── Target 1: Hero / slider image ───────────────────────
  console.log("1) Hero image");
  let heroOk = false;
  // Look for common slider/banner patterns
  const heroSelectors = [
    ".hero img",
    ".banner img",
    ".slider img",
    ".swiper img",
    ".carousel img",
    '[class*="hero"] img',
    '[class*="banner"] img',
    '[class*="slider"] img',
    "header img",
    ".header-image img",
    // Lightspeed specific
    ".homepage-slider img",
    ".slideshow img",
    "#slideshow img",
    ".rslides img",
    // Fallback: first large image on page
  ];

  for (const sel of heroSelectors) {
    const imgs = $home(sel);
    if (imgs.length) {
      const srcs: string[] = [];
      imgs.each((_, el) => {
        const s = $home(el).attr("data-src") || $home(el).attr("src");
        if (s) srcs.push(abs(s));
      });
      const best = pickBest(srcs);
      if (best) {
        heroOk = await download(best, "hero.jpg");
        if (heroOk) break;
      }
    }
  }

  // Broader fallback: any large image
  if (!heroOk) {
    const allImgs: string[] = [];
    $home("img").each((_, el) => {
      const s = $home(el).attr("data-src") || $home(el).attr("src");
      if (s && !s.includes("logo") && !s.includes("icon") && !s.includes("svg")) {
        allImgs.push(abs(s));
      }
    });
    const best = pickBest(allImgs);
    if (best) heroOk = await download(best, "hero.jpg");
  }
  if (!heroOk) writePlaceholder("hero.jpg");

  // ── Target 2: Product images ────────────────────────────
  console.log("\n2) Product images");

  // Try to find product pages / links first
  const productKeywords: Record<string, string> = {
    "taats.jpg": "taats",
    "scharnier.jpg": "scharnier",
    "paneel.jpg": "paneel|vast",
  };

  // Collect all links + images from homepage
  const pageLinks: string[] = [];
  $home("a[href]").each((_, el) => {
    const href = $home(el).attr("href");
    if (href) pageLinks.push(abs(href));
  });

  for (const [filename, pattern] of Object.entries(productKeywords)) {
    let ok = false;
    const re = new RegExp(pattern, "i");

    // Check if any image on homepage matches
    const matchImgs: string[] = [];
    $home("img").each((_, el) => {
      const src = $home(el).attr("data-src") || $home(el).attr("src") || "";
      const alt = $home(el).attr("alt") || "";
      const title = $home(el).attr("title") || "";
      if (re.test(src) || re.test(alt) || re.test(title)) {
        matchImgs.push(abs(src));
      }
    });

    if (matchImgs.length) {
      const best = pickBest(matchImgs);
      if (best) ok = await download(best, filename);
    }

    // Try product listing pages
    if (!ok) {
      const productLinks = pageLinks.filter((l) => re.test(l));
      for (const link of productLinks.slice(0, 2)) {
        try {
          const { data: html } = await http.get(link);
          const $p = cheerio.load(html);
          const imgs: string[] = [];
          $p("img").each((_, el) => {
            const s = $p(el).attr("data-src") || $p(el).attr("src");
            if (s && !s.includes("logo") && !s.includes("icon")) {
              imgs.push(abs(s));
            }
          });
          const best = pickBest(imgs);
          if (best) {
            ok = await download(best, filename);
            if (ok) break;
          }
        } catch {
          // ignore page load failures
        }
      }
    }

    if (!ok) writePlaceholder(filename);
  }

  // ── Target 3: About / detail shot ─────────────────────
  console.log("\n3) About / detail image");
  let aboutOk = false;

  // Check common about pages
  const aboutLinks = pageLinks.filter(
    (l) => /over-ons|about|werkplaats|atelier|contact/i.test(l)
  );

  for (const link of aboutLinks.slice(0, 3)) {
    try {
      const { data: html } = await http.get(link);
      const $a = cheerio.load(html);
      const imgs: string[] = [];
      $a("img").each((_, el) => {
        const s = $a(el).attr("data-src") || $a(el).attr("src");
        if (s && !s.includes("logo") && !s.includes("icon")) {
          imgs.push(abs(s));
        }
      });
      const best = pickBest(imgs);
      if (best) {
        aboutOk = await download(best, "about.jpg");
        if (aboutOk) break;
      }
    } catch {
      // ignore
    }
  }

  // Fallback: grab a distinctive image from homepage
  if (!aboutOk) {
    const candidates: string[] = [];
    $home("img").each((_, el) => {
      const s = $home(el).attr("data-src") || $home(el).attr("src");
      if (s && !s.includes("logo") && !s.includes("icon") && !s.includes("svg")) {
        candidates.push(abs(s));
      }
    });
    // Skip first (likely hero), pick second
    if (candidates.length > 1) {
      aboutOk = await download(candidates[1], "about.jpg");
    }
  }

  if (!aboutOk) writePlaceholder("about.jpg");

  console.log("\n── Done ──");
}

main().catch(console.error);
