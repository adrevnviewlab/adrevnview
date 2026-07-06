import { buildReport, pageResultFromSnapshot, parseSitemapUrls } from "./analyze.js";
import { parseHtmlSnapshot } from "./extract.js";
import type { SiteAuditReport, SiteFileSnapshot } from "./types.js";

export type AuditOptions = {
  maxPages?: number;
  routes?: string[];
};

async function fetchText(url: string, signal?: AbortSignal): Promise<string | null> {
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: signal ?? AbortSignal.timeout(20_000),
      headers: {
        "User-Agent": "Adrevnview-SEO-GEO-Audit/1.0",
        Accept: "text/html,application/xhtml+xml,text/plain,application/xml;q=0.9,*/*;q=0.8",
      },
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

function normalizeUrl(input: string): string {
  let url = input.trim();
  if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
  return url.replace(/\/$/, "") || url;
}

function baseFromUrl(url: string): string {
  const u = new URL(url);
  return `${u.protocol}//${u.host}`;
}

export async function runFullAudit(targetInput: string, options: AuditOptions = {}): Promise<SiteAuditReport> {
  const start = performance.now();
  const targetUrl = normalizeUrl(targetInput);
  const base = baseFromUrl(targetUrl);
  const maxPages = options.maxPages ?? 8;

  const [robotsTxt, sitemapXml, llmsTxt, llmsFullTxt] = await Promise.all([
    fetchText(`${base}/robots.txt`),
    fetchText(`${base}/sitemap.xml`),
    fetchText(`${base}/llms.txt`),
    fetchText(`${base}/llms-full.txt`),
  ]);

  const siteFiles: SiteFileSnapshot = { robotsTxt, sitemapXml, llmsTxt, llmsFullTxt };

  let routes: string[] = options.routes ?? [];
  if (sitemapXml) {
    routes = parseSitemapUrls(sitemapXml).map((u) => {
      try {
        return new URL(u).pathname || "/";
      } catch {
        return u;
      }
    });
  }
  if (routes.length === 0) {
    routes = [new URL(targetUrl).pathname || "/"];
  }
  routes = [...new Set(routes)].slice(0, maxPages);

  const sitemapUrls = routes.map((r) => `${base}${r.startsWith("/") ? r : `/${r}`}`);
  const pageResults = [];

  for (const route of routes) {
    const url = `${base}${route.startsWith("/") ? route : `/${route}`}`;
    const html = await fetchText(url);
    if (!html) continue;
    pageResults.push(pageResultFromSnapshot(parseHtmlSnapshot(html, url)));
  }

  if (pageResults.length === 0) {
    const html = await fetchText(targetUrl);
    if (html) {
      pageResults.push(pageResultFromSnapshot(parseHtmlSnapshot(html, targetUrl)));
    }
  }

  if (pageResults.length === 0) {
    throw new Error(
      "Could not fetch any pages from the target URL. The site may be blocking our crawler, require JavaScript rendering, or be temporarily unavailable.",
    );
  }

  const scanDurationMs = Math.round(performance.now() - start);
  return buildReport(targetUrl, pageResults, siteFiles, sitemapUrls, scanDurationMs);
}
