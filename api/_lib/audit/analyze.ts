import { auditPage, auditSiteFiles, categoryScores, scoreChecks } from "./checks.js";
import type { ActionItem, AIPlatform, AuditCheck, PageAuditResult, PlatformScore, SiteAuditReport, SiteFileSnapshot } from "./types.js";

export { CATEGORY_LABELS, PILLAR_DESCRIPTIONS, scoreChecks, categoryScores } from "./checks.js";
export { parseHtmlSnapshot } from "./extract.js";
export { auditPage, auditSiteFiles } from "./checks.js";

function summarize(checks: AuditCheck[]) {
  return {
    pass: checks.filter((c) => c.status === "pass").length,
    warn: checks.filter((c) => c.status === "warn").length,
    fail: checks.filter((c) => c.status === "fail").length,
    info: checks.filter((c) => c.status === "info").length,
  };
}

const PLATFORM_CONFIG: { platform: AIPlatform; label: string; checkIds: string[] }[] = [
  {
    platform: "google",
    label: "Google Search & AI Overviews",
    checkIds: ["https-ok", "https", "indexable", "title-ok", "desc-ok", "sitemap-present", "prerender-ok", "csr-shell", "faq-schema-ok", "faq-schema", "org-schema-ok", "website-schema-ok", "jsonld-present"],
  },
  {
    platform: "chatgpt",
    label: "ChatGPT & SearchGPT",
    checkIds: ["llms-present", "llms-missing", "bot-chatgpt-user-allowed", "prerender-ok", "csr-shell", "faq-visible", "org-schema-ok", "sameas-ok", "knowsabout-ok", "jsonld-present"],
  },
  {
    platform: "perplexity",
    label: "Perplexity AI",
    checkIds: ["bot-perplexitybot-allowed", "llms-present", "faq-visible", "question-headings-ok", "prerender-ok", "content-ok", "llms-full-present"],
  },
  {
    platform: "claude",
    label: "Claude (Anthropic)",
    checkIds: ["bot-claudebot-allowed", "llms-present", "org-schema-ok", "contact-schema-ok", "trust-pages", "jsonld-present"],
  },
  {
    platform: "gemini",
    label: "Gemini & Google SGE",
    checkIds: ["bot-google-extended-allowed", "faq-schema-ok", "website-schema-ok", "question-headings-ok", "llms-full-present", "jsonld-present"],
  },
];

function computePlatformScores(allChecks: AuditCheck[]): PlatformScore[] {
  const byId = new Map(allChecks.map((c) => [c.id, c]));
  return PLATFORM_CONFIG.map(({ platform, label, checkIds }) => {
    const relevant = checkIds.map((id) => byId.get(id)).filter(Boolean) as AuditCheck[];
    const score = relevant.length ? scoreChecks(relevant) : scoreChecks(allChecks.filter((c) => c.platform?.includes(platform)));
    const fails = relevant.filter((c) => c.status === "fail" || c.status === "warn").length;
    const summary = fails === 0 ? "Strong readiness for AI citation and indexing." : `${fails} signal(s) need attention for this platform.`;
    return { platform, label, score, summary };
  });
}

function buildActionPlan(issues: AuditCheck[]): ActionItem[] {
  const severityOrder = { critical: 0, warning: 1, notice: 2 };
  return issues
    .filter((c) => c.status === "fail" || c.status === "warn")
    .sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity] || b.weight - a.weight)
    .slice(0, 20)
    .map((c, i) => ({
      priority: i + 1,
      severity: c.severity,
      title: c.title,
      recommendation: c.recommendation ?? c.detail,
      fixSnippet: c.fixSnippet,
      category: c.category,
      pagePath: c.pagePath,
      impact: c.severity === "critical" ? "high" : c.severity === "warning" ? "medium" : "low",
    }));
}

export function buildReport(
  targetUrl: string,
  pageResults: PageAuditResult[],
  siteFiles: SiteFileSnapshot,
  sitemapUrls: string[],
  scanDurationMs: number,
): SiteAuditReport {
  const baseUrl = (() => {
    try {
      const u = new URL(targetUrl);
      return `${u.protocol}//${u.host}`;
    } catch {
      return targetUrl;
    }
  })();
  const domain = (() => {
    try {
      return new URL(targetUrl).hostname;
    } catch {
      return targetUrl;
    }
  })();

  const siteChecks = auditSiteFiles(baseUrl, siteFiles, sitemapUrls);
  const allChecks = [...siteChecks, ...pageResults.flatMap((p) => p.checks)];
  const issues = allChecks.filter((c) => c.status === "fail" || c.status === "warn");
  const cats = categoryScores(allChecks);
  const pageAvg = pageResults.length ? Math.round(pageResults.reduce((s, p) => s + p.score, 0) / pageResults.length) : 0;
  const siteScore = scoreChecks(siteChecks);
  const overallScore = Math.round(pageAvg * 0.72 + siteScore * 0.28);
  const seoCats: (keyof typeof cats)[] = ["seo", "technical", "content"];
  const geoCats: (keyof typeof cats)[] = ["geo", "schema", "trust"];
  const seoScore = Math.round(seoCats.reduce((s, k) => s + cats[k], 0) / seoCats.length);
  const geoScore = Math.round(geoCats.reduce((s, k) => s + cats[k], 0) / geoCats.length);
  const wordsAnalyzed = pageResults.reduce((s, p) => s + p.snapshot.wordCount, 0);
  const schemaTypes = new Set(pageResults.flatMap((p) => p.snapshot.schemaTypes));

  return {
    generatedAt: new Date().toISOString(),
    targetUrl,
    baseUrl,
    domain,
    overallScore,
    seoScore,
    geoScore,
    summary: summarize(allChecks),
    categoryScores: cats,
    platformScores: computePlatformScores(allChecks),
    metrics: {
      pagesScanned: pageResults.length,
      totalChecks: allChecks.length,
      wordsAnalyzed,
      schemaTypeCount: schemaTypes.size,
      scanDurationMs,
      htmlSizeKb: Math.round(pageResults.reduce((s, p) => s + p.snapshot.htmlSizeBytes, 0) / 1024),
    },
    siteChecks,
    pages: pageResults,
    issues,
    actionPlan: buildActionPlan(issues),
    sitemapUrls,
  };
}

export function parseSitemapUrls(xml: string): string[] {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((m) => m[1].trim());
}

export function pageResultFromSnapshot(snapshot: import("./types").PageSnapshot): PageAuditResult {
  const checks = auditPage(snapshot);
  return { snapshot, checks, score: scoreChecks(checks) };
}
