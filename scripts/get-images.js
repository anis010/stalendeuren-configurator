const https = require("https");
const fs = require("fs");
const path = require("path");

const outDir = path.join(__dirname, "..", "public", "images");

const images = [
  {
    // Wide cinematic hero shot from homepage
    url: "https://static.aluwdoors.com/site/uploads/2025/07/01.jpg",
    name: "hero.jpg",
  },
  {
    // Stalen taatsdeur in brons - portrait shot
    url: "https://static.aluwdoors.com/site/uploads/2025/08/Stalen-dubbele-taatsdeur-in-het-brons-368x460.jpg",
    name: "taats.jpg",
  },
  {
    // Zwarte stalen scharnierdeur - portrait shot
    url: "https://static.aluwdoors.com/site/uploads/2025/07/Zwarte-stalen-scharnierdeur-1-768x960.jpg",
    name: "scharnier.jpg",
  },
  {
    // Bronzen schuifdeur (paneel/fixed panel) from homepage
    url: "https://static.aluwdoors.com/site/uploads/2025/10/Bronzen-schuifdeur-tussen-woonkamer-en-keuken-1.jpg",
    name: "paneel.jpg",
  },
  {
    // Interior shot for about section
    url: "https://static.aluwdoors.com/site/uploads/2025/07/02.jpg",
    name: "about.jpg",
  },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        Accept: "image/*,*/*",
        Referer: "https://www.aluwdoors.com/",
      },
    };

    https
      .get(options, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          download(res.headers.location, dest).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on("finish", () => {
          file.close();
          const size = fs.statSync(dest).size;
          console.log(
            `  OK: ${path.basename(dest).padEnd(16)} ${(size / 1024).toFixed(0).padStart(5)} KB`
          );
          resolve();
        });
      })
      .on("error", reject);
  });
}

async function main() {
  console.log("Downloading images from aluwdoors.com...\n");
  for (const img of images) {
    const dest = path.join(outDir, img.name);
    try {
      await download(img.url, dest);
    } catch (err) {
      console.log(`  FAIL: ${img.name} - ${err.message}`);
    }
  }
  console.log("\nDone.");
}

main();
