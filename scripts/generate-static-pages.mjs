/**
 * Generates static HTML files for every route after Vite build.
 * No Playwright required — reliable on Vercel serverless builds.
 */
import fs from "node:fs/promises";
import path from "node:path";

import {
  BLOG_PAGES,
  CLIENT_PAGES,
  HOME_BODY,
  INDUSTRY_PAGES,
  SERVICE_PAGES,
  STATIC_PAGES,
} from "./static-page-content.mjs";

const DIST = path.join(process.cwd(), "dist");
const SITE = "https://www.adrevnview.com";

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function setMeta(html, { title, description, canonical }) {
  let out = html;
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`);
  out = out.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${escapeHtml(description)}"`,
  );
  out = out.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${canonical}"`);
  out = out.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${escapeHtml(title)}"`);
  out = out.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${escapeHtml(description)}"`,
  );
  out = out.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${canonical}"`);
  out = out.replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${escapeHtml(title)}"`);
  out = out.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${escapeHtml(description)}"`,
  );
  return out;
}

function injectRoot(html, body) {
  if (html.includes('<div id="root"></div>')) {
    return html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  }
  return html.replace(/<div id="root">[\s\S]*?<\/div>\s*(?=<script)/, `<div id="root">${body}</div>\n      `);
}

async function writeRoute(baseHtml, routePath, meta, body) {
  const canonical = routePath === "/" ? `${SITE}/` : `${SITE}${routePath}`;
  const html = injectRoot(setMeta(baseHtml, { ...meta, canonical }), body);
  const outDir = routePath === "/" ? DIST : path.join(DIST, routePath.replace(/^\//, ""));
  const outFile = routePath === "/" ? path.join(DIST, "index.html") : path.join(outDir, "index.html");
  if (routePath !== "/") await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(outFile, html, "utf8");
  const size = Buffer.byteLength(html, "utf8");
  console.log(`[static-pages] ✓ ${routePath || "/"} (${size.toLocaleString()} bytes)`);
}

async function main() {
  const baseHtml = await fs.readFile(path.join(DIST, "index.html"), "utf8");

  await writeRoute(
    baseHtml,
    "/",
    {
      title: "Adrevnview — Premium Web Design Agency | SEO & GEO",
      description:
        "Adrevnview is a premium web design agency for B2B, B2C, and enterprise brands. Custom websites, branding, SEO, and Generative Engine Optimization (GEO).",
    },
    HOME_BODY,
  );

  for (const page of STATIC_PAGES) {
    await writeRoute(baseHtml, page.path, { title: page.title, description: page.description }, page.body);
  }

  for (const [slug, title, headline, description, intro] of SERVICE_PAGES) {
    const route = `/services/${slug}`;
    const body = `<main><h1>${headline}</h1><p data-geo-chunk="summary">${intro}</p><p>${description}</p><p><a href="/contact">Request a consultation</a> for ${headline.toLowerCase()}.</p></main>`;
    await writeRoute(baseHtml, route, { title, description }, body);
  }

  for (const [slug, title, description, intro] of INDUSTRY_PAGES) {
    const route = `/industries/${slug}`;
    const body = `<main><h1>${title}</h1><p data-geo-chunk="summary">${intro}</p><p>${description}</p><p><a href="/contact">Request a consultation</a></p></main>`;
    await writeRoute(baseHtml, route, { title: `${title} | Adrevnview`, description }, body);
  }

  for (const [slug, title, headline, description] of BLOG_PAGES) {
    const route = `/blog/${slug}`;
    const body = `<main><h1>${headline}</h1><p data-geo-chunk="summary">${description}</p><p><a href="/blog">Back to blog</a> · <a href="/contact">Contact Adrevnview</a></p></main>`;
    await writeRoute(baseHtml, route, { title, description }, body);
  }

  for (const [slug, name, description] of CLIENT_PAGES) {
    const route = `/${slug}`;
    const body = `<main><h1>${name}</h1><p data-geo-chunk="summary">${description}</p><p>Case study by <a href="/">Adrevnview</a> — custom web design, development, SEO, and GEO.</p><p><a href="/work">View all work</a></p></main>`;
    await writeRoute(
      baseHtml,
      route,
      { title: `${name} Case Study | Adrevnview`, description },
      body,
    );
  }

  console.log("[static-pages] Done — all routes have crawler-visible HTML.");
}

main().catch((err) => {
  console.error("[static-pages] Failed:", err);
  process.exit(1);
});
