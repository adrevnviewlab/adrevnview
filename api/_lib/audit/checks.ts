import type { AuditCheck, CheckCategory, CheckStatus, IssueSeverity, PageSnapshot, SiteFileSnapshot } from "./types.js";

export const CATEGORY_LABELS: Record<CheckCategory, string> = {
  seo: "On-Page SEO",
  geo: "GEO & AI Visibility",
  schema: "Structured Data",
  content: "Content & Citability",
  technical: "Technical SEO",
  trust: "E-E-A-T & Trust",
  performance: "Performance Signals",
};

export const PILLAR_DESCRIPTIONS: Record<CheckCategory, string> = {
  seo: "Title tags, meta descriptions, canonical URLs, headings, and social metadata.",
  geo: "AI crawler access, llms.txt, citation readiness, and answer-first content.",
  schema: "JSON-LD entity graphs, FAQPage, Organization, Product, and WebSite markup.",
  content: "Word depth, question headings, FAQ coverage, and internal linking.",
  technical: "HTTPS, prerender/SSR, lang attribute, image accessibility, crawlability.",
  trust: "About, privacy, accessibility pages, author signals, and contact transparency.",
  performance: "HTML weight, asset counts, and render-blocking resource hints.",
};

function toSeverity(status: CheckStatus): IssueSeverity {
  if (status === "fail") return "critical";
  if (status === "warn") return "warning";
  return "notice";
}

export function makeCheck(
  id: string,
  category: CheckCategory,
  status: CheckStatus,
  title: string,
  detail: string,
  opts?: { recommendation?: string; fixSnippet?: string; weight?: number; pagePath?: string; platform?: AuditCheck["platform"] },
): AuditCheck {
  return {
    id,
    category,
    status,
    severity: toSeverity(status),
    title,
    detail,
    recommendation: opts?.recommendation,
    fixSnippet: opts?.fixSnippet,
    weight: opts?.weight ?? 1,
    pagePath: opts?.pagePath,
    platform: opts?.platform,
  };
}

export function scoreChecks(checks: AuditCheck[]): number {
  let earned = 0;
  let possible = 0;
  for (const c of checks) {
    if (c.status === "info") continue;
    possible += c.weight;
    if (c.status === "pass") earned += c.weight;
    else if (c.status === "warn") earned += c.weight * 0.55;
  }
  return possible === 0 ? 100 : Math.round((earned / possible) * 100);
}

export function categoryScores(allChecks: AuditCheck[]): Record<CheckCategory, number> {
  const categories = Object.keys(CATEGORY_LABELS) as CheckCategory[];
  return Object.fromEntries(categories.map((cat) => [cat, scoreChecks(allChecks.filter((c) => c.category === cat))])) as Record<
    CheckCategory,
    number
  >;
}

export function auditPage(snapshot: PageSnapshot): AuditCheck[] {
  const c = (id: string, category: CheckCategory, status: CheckStatus, title: string, detail: string, opts?: Parameters<typeof makeCheck>[4]) =>
    makeCheck(id, category, status, title, detail, { ...opts, pagePath: snapshot.path });

  const checks: AuditCheck[] = [];
  const types = snapshot.schemaTypes;
  const isHome = snapshot.path === "/" || snapshot.path === "";
  const isTrust = ["/privacy", "/accessibility", "/about"].includes(snapshot.path);

  // ── On-Page SEO ──
  if (!snapshot.isHttps) checks.push(c("https", "seo", "fail", "Site not served over HTTPS", "URL uses HTTP.", { recommendation: "Enable TLS/HTTPS across all pages.", weight: 2, platform: ["google", "chatgpt", "perplexity"] }));
  else checks.push(c("https-ok", "seo", "pass", "HTTPS enabled", snapshot.url.split("/")[0], { weight: 1 }));

  if (!snapshot.title) checks.push(c("title-missing", "seo", "fail", "Missing title tag", "No <title> element.", { recommendation: "Add a unique 30–60 character title with primary keyword + brand.", weight: 3, platform: ["google"] }));
  else if (snapshot.title.length < 30) checks.push(c("title-short", "seo", "warn", "Title tag too short", `${snapshot.title.length} chars — "${snapshot.title}"`, { recommendation: "Expand to 30–60 characters.", weight: 1.5 }));
  else if (snapshot.title.length > 60) checks.push(c("title-long", "seo", "warn", "Title may truncate in SERPs", `${snapshot.title.length} characters.`, { weight: 1 }));
  else checks.push(c("title-ok", "seo", "pass", "Title tag optimized", `${snapshot.title.length} chars`, { weight: 1 }));

  if (!snapshot.metaDescription) checks.push(c("desc-missing", "seo", "fail", "Missing meta description", "No meta description.", { recommendation: "Write a 120–160 char description with a clear value proposition.", weight: 2.5, platform: ["google"] }));
  else if (snapshot.metaDescription.length < 120) checks.push(c("desc-short", "seo", "warn", "Meta description under 120 chars", `${snapshot.metaDescription.length} chars.`, { recommendation: "Expand to 120–160 characters for better CTR.", weight: 1 }));
  else if (snapshot.metaDescription.length > 160) checks.push(c("desc-long", "seo", "warn", "Meta description may truncate", `${snapshot.metaDescription.length} chars.`, { weight: 1 }));
  else checks.push(c("desc-ok", "seo", "pass", "Meta description length", `${snapshot.metaDescription.length} chars`, { weight: 1 }));

  if (!snapshot.canonical) checks.push(c("canonical-missing", "seo", "warn", "Missing canonical URL", "No rel=canonical.", { recommendation: `Add <link rel="canonical" href="${snapshot.url}" />`, fixSnippet: `<link rel="canonical" href="${snapshot.url}" />`, weight: 1.5 }));
  else checks.push(c("canonical-ok", "seo", "pass", "Canonical URL", snapshot.canonical, { weight: 1 }));

  if (/noindex/i.test(snapshot.robots)) checks.push(c("noindex", "seo", "warn", "Page blocked from indexing", snapshot.robots, { recommendation: "Use index,follow on public pages.", weight: 2 }));
  else checks.push(c("indexable", "seo", "pass", "Indexable page", snapshot.robots || "index (default)", { weight: 1, platform: ["google"] }));

  if (snapshot.h1Texts.length === 0) checks.push(c("h1-missing", "seo", "fail", "Missing H1 heading", "No H1 found.", { recommendation: "Add one H1 that states the page's primary topic.", weight: 2.5, platform: ["google", "chatgpt", "perplexity"] }));
  else if (snapshot.h1Texts.length > 1) checks.push(c("h1-multiple", "seo", "warn", "Multiple H1 tags", `${snapshot.h1Texts.length} H1 elements.`, { weight: 1 }));
  else checks.push(c("h1-ok", "seo", "pass", "Single H1 present", `"${snapshot.h1Texts[0]}"`, { weight: 1 }));

  if (!snapshot.viewport) checks.push(c("viewport-missing", "seo", "warn", "Missing viewport meta", "Mobile usability signal missing.", { recommendation: 'Add <meta name="viewport" content="width=device-width, initial-scale=1" />', weight: 1 }));
  else checks.push(c("viewport-ok", "seo", "pass", "Viewport meta present", snapshot.viewport, { weight: 0.5 }));

  if (!snapshot.ogTitle || !snapshot.ogDescription) checks.push(c("og-incomplete", "seo", "warn", "Open Graph incomplete", "Missing og:title or og:description.", { recommendation: "Add full Open Graph tags for social and AI link previews.", weight: 1 }));
  else checks.push(c("og-ok", "seo", "pass", "Open Graph tags", snapshot.ogTitle, { weight: 1 }));

  if (!snapshot.ogImage) checks.push(c("og-image-missing", "seo", "warn", "Missing og:image", "No social preview image (1200×630 recommended).", { recommendation: "Add og:image for richer link previews in social and AI UIs.", weight: 1.5 }));
  else checks.push(c("og-image-ok", "seo", "pass", "og:image configured", snapshot.ogImage, { weight: 1 }));

  if (!snapshot.twitterCard) checks.push(c("twitter-missing", "seo", "info", "No Twitter/X card meta", "twitter:card not set.", { recommendation: "Add twitter:card summary_large_image.", weight: 0.5 }));
  else checks.push(c("twitter-ok", "seo", "pass", "Twitter card meta", snapshot.twitterCard, { weight: 0.5 }));

  // ── Schema ──
  if (snapshot.jsonLdBlocks.length === 0) checks.push(c("jsonld-missing", "schema", "fail", "No JSON-LD structured data", "Zero schema.org blocks.", { recommendation: "Publish Organization + WebSite + WebPage JSON-LD graph.", weight: 3, platform: ["google", "chatgpt", "gemini"] }));
  else if (snapshot.jsonLdBlocks.some((b) => b && typeof b === "object" && "__parseError" in (b as object))) checks.push(c("jsonld-invalid", "schema", "fail", "Invalid JSON-LD syntax", "Parse error in structured data.", { recommendation: "Validate JSON-LD with Google Rich Results Test.", weight: 2.5 }));
  else checks.push(c("jsonld-present", "schema", "pass", "JSON-LD present", `${snapshot.jsonLdBlocks.length} block(s), ${types.length} types`, { weight: 1 }));

  if (!types.some((t) => ["Organization", "ProfessionalService"].includes(t))) checks.push(c("org-schema", "schema", "warn", "Organization schema missing", "No Organization/ProfessionalService entity.", { recommendation: "Add Organization with name, url, logo, sameAs, contactPoint.", weight: 2, platform: ["google", "chatgpt", "claude"] }));
  else checks.push(c("org-schema-ok", "schema", "pass", "Organization entity", types.filter((t) => ["Organization", "ProfessionalService"].includes(t)).join(", "), { weight: 1 }));

  if (!snapshot.orgHasSameAs && types.some((t) => ["Organization", "ProfessionalService"].includes(t))) checks.push(c("sameas-missing", "schema", "warn", "Organization missing sameAs", "No external profile links in schema.", { recommendation: "Add sameAs with LinkedIn, GitHub, and authoritative profiles.", weight: 1, platform: ["chatgpt", "perplexity"] }));
  else if (snapshot.orgHasSameAs) checks.push(c("sameas-ok", "schema", "pass", "sameAs profiles linked", "Organization references external entities.", { weight: 1 }));

  if (!snapshot.orgHasContact && types.some((t) => ["Organization", "ProfessionalService"].includes(t))) checks.push(c("contact-schema-missing", "schema", "warn", "No contact in Organization schema", "Missing email/telephone/contactPoint.", { recommendation: "Add contactPoint with email and phone.", weight: 1, platform: ["google", "claude"] }));
  else if (snapshot.orgHasContact) checks.push(c("contact-schema-ok", "schema", "pass", "Contact info in schema", "Email/phone/contactPoint found.", { weight: 1 }));

  if (!snapshot.hasWebSiteSchema) checks.push(c("website-schema", "schema", "warn", "WebSite schema missing", "No WebSite entity in graph.", { recommendation: "Add WebSite with publisher link to Organization @id.", weight: 1.5, platform: ["google", "gemini"] }));
  else checks.push(c("website-schema-ok", "schema", "pass", "WebSite schema", "WebSite entity detected.", { weight: 1 }));

  if (isHome && !types.includes("FAQPage")) checks.push(c("faq-schema", "schema", "warn", "FAQPage schema missing", "Homepage lacks FAQ structured data.", { recommendation: "Add FAQPage with 5+ Question/Answer pairs matching visible FAQ.", weight: 2, platform: ["google", "chatgpt", "perplexity", "gemini"] }));
  else if (types.includes("FAQPage")) {
    if (snapshot.faqSchemaPairs < 3) checks.push(c("faq-schema-thin", "schema", "warn", "FAQPage has fewer than 3 Q&As", `${snapshot.faqSchemaPairs} pairs in schema.`, { recommendation: "Add at least 5 high-intent Q&A pairs.", weight: 1.5 }));
    else checks.push(c("faq-schema-ok", "schema", "pass", "FAQPage schema", `${snapshot.faqSchemaPairs}+ Q&A pairs`, { weight: 1.5, platform: ["google", "chatgpt"] }));
  }

  if (snapshot.path.includes("nfc") || snapshot.path.includes("product")) {
    if (!types.includes("Product")) checks.push(c("product-schema", "schema", "warn", "Product schema missing on product page", "No Product/Offer markup.", { recommendation: "Add Product + Offer with price, availability, description.", weight: 2 }));
    else checks.push(c("product-schema-ok", "schema", "pass", "Product schema present", "Product entity found.", { weight: 1 }));
  }

  if (!snapshot.hasBreadcrumbSchema && !isHome) checks.push(c("breadcrumb-missing", "schema", "info", "No BreadcrumbList schema", "Optional for inner pages.", { recommendation: "Add BreadcrumbList for navigation context.", weight: 0.5 }));
  else if (snapshot.hasBreadcrumbSchema) checks.push(c("breadcrumb-ok", "schema", "pass", "BreadcrumbList schema", "Breadcrumb markup found.", { weight: 0.5 }));

  // ── GEO ──
  if (snapshot.rootContentLength < 500) checks.push(c("csr-shell", "geo", "fail", "JavaScript-only content shell", `#root has only ${snapshot.rootContentLength} chars — crawlers may see empty page.`, { recommendation: "Prerender or SSR key routes. Run: npm run build with prerender.", weight: 3, platform: ["google", "chatgpt", "perplexity", "claude", "gemini"] }));
  else checks.push(c("prerender-ok", "geo", "pass", "Server-rendered / prerendered HTML", `${snapshot.rootContentLength.toLocaleString()} chars in DOM.`, { weight: 2, platform: ["google", "chatgpt", "perplexity"] }));

  if (isHome && !snapshot.hasFaqHeading && snapshot.visibleFaqItems < 3) checks.push(c("faq-visible-missing", "geo", "warn", "No visible FAQ section", "Homepage lacks question-answer content.", { recommendation: "Add FAQ section with 5+ questions matching FAQPage schema.", weight: 2, platform: ["chatgpt", "perplexity", "gemini"] }));
  else if (snapshot.hasFaqHeading || snapshot.visibleFaqItems >= 3) checks.push(c("faq-visible", "geo", "pass", "Visible FAQ content", `${snapshot.visibleFaqItems || "FAQ"} items detected.`, { weight: 1.5, platform: ["chatgpt", "perplexity"] }));

  if (snapshot.questionHeadings < 2 && isHome) checks.push(c("question-headings", "geo", "warn", "Few question-style headings", `${snapshot.questionHeadings} H2/H3 with "?".`, { recommendation: "Use question-format H2s with direct answers below (GEO best practice).", weight: 1.5, platform: ["chatgpt", "perplexity", "gemini"] }));
  else if (snapshot.questionHeadings >= 2) checks.push(c("question-headings-ok", "geo", "pass", "Question-format headings", `${snapshot.questionHeadings} question-style headings.`, { weight: 1 }));

  if (!snapshot.hasGeoChunk && isHome) checks.push(c("geo-chunk-missing", "geo", "info", "No GEO summary chunk", 'Missing data-geo-chunk="summary".', { recommendation: "Mark hero summary paragraph for AI extraction.", weight: 0.5 }));
  else if (snapshot.hasGeoChunk) checks.push(c("geo-chunk", "geo", "pass", "GEO summary chunk marked", 'data-geo-chunk="summary" present.', { weight: 0.5 }));

  if (snapshot.hasSpeakable) checks.push(c("speakable", "geo", "pass", "Speakable markup", "Voice/AI snippet markers found.", { weight: 0.5 }));
  else if (isHome) checks.push(c("speakable-missing", "geo", "info", "No speakable markup", "Optional voice search optimization.", { weight: 0.5 }));

  if (!snapshot.hasLlmsLink && isHome) checks.push(c("llms-link-missing", "geo", "info", "No llms.txt link in <head>", "Optional discovery hint.", { recommendation: '<link rel="alternate" type="text/plain" href="/llms.txt" />', weight: 0.5 }));

  if (!snapshot.orgHasKnowsAbout && isHome) checks.push(c("knowsabout-missing", "geo", "warn", "Organization missing knowsAbout", "AI can't map your service taxonomy.", { recommendation: "Add knowsAbout array with your core services in Organization schema.", weight: 1.5, platform: ["chatgpt", "claude"] }));
  else if (snapshot.orgHasKnowsAbout) checks.push(c("knowsabout-ok", "geo", "pass", "knowsAbout taxonomy", "Service topics declared in schema.", { weight: 1 }));

  // ── Content ──
  if (snapshot.wordCount < 150 && !isTrust) checks.push(c("thin-content", "content", "fail", "Thin content", `~${snapshot.wordCount} words.`, { recommendation: "Target 300+ words on key pages with answer-first paragraphs.", weight: 2, platform: ["google", "chatgpt"] }));
  else if (snapshot.wordCount < 300 && !isTrust) checks.push(c("content-moderate", "content", "warn", "Moderate content depth", `~${snapshot.wordCount} words.`, { recommendation: "Expand with FAQs, proof points, and service details.", weight: 1 }));
  else checks.push(c("content-ok", "content", "pass", "Content depth", `~${snapshot.wordCount.toLocaleString()} words`, { weight: 1 }));

  if (snapshot.h2Texts.length === 0 && !isTrust) checks.push(c("headings-flat", "content", "warn", "No H2 subheadings", "Flat heading structure.", { recommendation: "Add H2 sections for each major topic/service.", weight: 1 }));
  else if (snapshot.h2Texts.length > 0) checks.push(c("headings-ok", "content", "pass", "Heading hierarchy", `${snapshot.h2Texts.length} H2, ${snapshot.h3Count} H3`, { weight: 1 }));

  if (snapshot.internalLinkCount < 3 && isHome) checks.push(c("internal-links-low", "content", "warn", "Low internal linking", `${snapshot.internalLinkCount} internal links.`, { recommendation: "Link to key service, product, and trust pages from homepage.", weight: 1 }));
  else if (snapshot.internalLinkCount >= 3) checks.push(c("internal-links-ok", "content", "pass", "Internal link structure", `${snapshot.internalLinkCount} internal links`, { weight: 0.5 }));

  // ── Technical ──
  if (!snapshot.htmlLang) checks.push(c("lang-missing", "technical", "warn", "Missing html lang", 'No lang attribute.', { recommendation: 'Set <html lang="en">.', weight: 1 }));
  else checks.push(c("lang-ok", "technical", "pass", "HTML lang attribute", snapshot.htmlLang, { weight: 0.5 }));

  if (snapshot.imagesMissingAlt > 0) checks.push(c("alt-missing", "technical", "warn", "Images missing alt text", `${snapshot.imagesMissingAlt}/${snapshot.imagesTotal} without alt.`, { recommendation: "Add descriptive alt to all content images.", weight: 1 }));
  else if (snapshot.imagesTotal > 0) checks.push(c("alt-ok", "technical", "pass", "Image alt attributes", `All ${snapshot.imagesTotal} images have alt.`, { weight: 0.5 }));

  if (snapshot.imagesMissingDimensions > 0 && snapshot.imagesTotal > 0) checks.push(c("img-dimensions", "performance", "warn", "Images missing width/height", `${snapshot.imagesMissingDimensions}/${snapshot.imagesTotal} — causes CLS.`, { recommendation: "Set explicit width and height on images.", weight: 1 }));
  else if (snapshot.imagesTotal > 0) checks.push(c("img-dimensions-ok", "performance", "pass", "Image dimensions set", "Width/height present on images.", { weight: 0.5 }));

  // ── Performance ──
  if (snapshot.htmlSizeBytes > 150_000) checks.push(c("html-heavy", "performance", "warn", "Large HTML payload", `${Math.round(snapshot.htmlSizeBytes / 1024)} KB HTML.`, { recommendation: "Prune inline styles, split routes, enable compression.", weight: 1 }));
  else checks.push(c("html-size-ok", "performance", "pass", "HTML payload size", `${Math.round(snapshot.htmlSizeBytes / 1024)} KB`, { weight: 0.5 }));

  if (snapshot.scriptCount > 15) checks.push(c("scripts-heavy", "performance", "warn", "High script count", `${snapshot.scriptCount} script tags.`, { recommendation: "Bundle JS, defer non-critical scripts.", weight: 1 }));
  else checks.push(c("scripts-ok", "performance", "pass", "Script count", `${snapshot.scriptCount} scripts`, { weight: 0.5 }));

  // ── Trust ──
  if (isTrust) checks.push(c("trust-page", "trust", "pass", "E-E-A-T trust page", `${snapshot.path} strengthens credibility.`, { weight: 1, platform: ["google", "claude"] }));
  if (snapshot.author) checks.push(c("author-meta", "trust", "pass", "Author meta tag", snapshot.author, { weight: 0.5 }));

  return checks;
}

export function auditSiteFiles(baseUrl: string, files: SiteFileSnapshot, auditedUrls: string[]): AuditCheck[] {
  const checks: AuditCheck[] = [];
  const origin = baseUrl.replace(/\/$/, "");
  const mk = (id: string, category: CheckCategory, status: CheckStatus, title: string, detail: string, opts?: Parameters<typeof makeCheck>[4]) =>
    makeCheck(id, category, status, title, detail, opts);

  if (!files.robotsTxt) {
    checks.push(mk("robots-missing", "technical", "fail", "robots.txt not found", "Could not fetch /robots.txt.", { recommendation: "Publish robots.txt at domain root.", weight: 2.5, platform: ["google", "chatgpt", "perplexity"] }));
  } else {
    checks.push(mk("robots-present", "technical", "pass", "robots.txt accessible", `${files.robotsTxt.split("\n").filter(Boolean).length} lines`, { weight: 1 }));
    if (/Sitemap:\s*\S+/i.test(files.robotsTxt)) checks.push(mk("robots-sitemap", "seo", "pass", "Sitemap declared in robots.txt", "Sitemap directive found.", { weight: 1 }));
    else checks.push(mk("robots-sitemap-missing", "seo", "warn", "No Sitemap in robots.txt", "Missing Sitemap: directive.", { recommendation: `Sitemap: ${origin}/sitemap.xml`, fixSnippet: `Sitemap: ${origin}/sitemap.xml`, weight: 1 }));

    const aiBots = [
      { name: "GPTBot", block: true },
      { name: "CCBot", block: true },
      { name: "ChatGPT-User", block: false },
      { name: "PerplexityBot", block: false },
      { name: "Google-Extended", block: false },
      { name: "ClaudeBot", block: false },
      { name: "Claude-Web", block: false },
    ];
    for (const bot of aiBots) {
      const re = new RegExp(`User-agent:\\s*${bot.name}`, "i");
      if (!re.test(files.robotsTxt)) {
        if (!bot.block) checks.push(mk(`bot-${bot.name.toLowerCase()}-missing`, "geo", "info", `No explicit rule for ${bot.name}`, "Consider adding Allow directive.", { weight: 0.3, platform: ["chatgpt", "perplexity", "claude", "gemini"] }));
      } else if (bot.block && new RegExp(`User-agent:\\s*${bot.name}[\\s\\S]*?Disallow:\\s*/`, "im").test(files.robotsTxt)) {
        checks.push(mk(`bot-${bot.name.toLowerCase()}-blocked`, "geo", "pass", `${bot.name} blocked (training)`, "Scraper disallowed — good GEO hygiene.", { weight: 0.5 }));
      } else if (!bot.block) {
        checks.push(mk(`bot-${bot.name.toLowerCase()}-allowed`, "geo", "pass", `${bot.name} allowed`, "Citation bot can access content.", { weight: 0.5, platform: ["chatgpt", "perplexity", "claude", "gemini"] }));
      }
    }
  }

  if (!files.sitemapXml) checks.push(mk("sitemap-missing", "seo", "fail", "sitemap.xml not found", "No XML sitemap.", { recommendation: "Publish sitemap.xml with all indexable URLs.", weight: 2.5, platform: ["google"] }));
  else {
    const locs = [...files.sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((m) => m[1].trim());
    checks.push(mk("sitemap-present", "seo", "pass", "sitemap.xml present", `${locs.length} URLs indexed in sitemap.`, { weight: 1.5 }));
    const missing = auditedUrls.filter((u) => !locs.some((loc) => loc.replace(/\/$/, "") === u.replace(/\/$/, "")));
    if (missing.length) checks.push(mk("sitemap-gap", "seo", "warn", "Audited URLs missing from sitemap", missing.map((u) => new URL(u).pathname).join(", "), { weight: 1 }));
  }

  if (!files.llmsTxt) checks.push(mk("llms-missing", "geo", "fail", "llms.txt not found", "No LLM reference file.", { recommendation: "Publish /llms.txt with brand, services, products, and key URLs.", weight: 2.5, platform: ["chatgpt", "claude", "perplexity"] }));
  else {
    checks.push(mk("llms-present", "geo", "pass", "llms.txt present", `${files.llmsTxt.length.toLocaleString()} bytes`, { weight: 2, platform: ["chatgpt", "claude"] }));
    const sections = ["## About", "## Services", "## Products", "## Key Pages"].filter((s) => files.llmsTxt!.includes(s));
    if (sections.length < 3) checks.push(mk("llms-structure", "geo", "warn", "llms.txt structure incomplete", `Found: ${sections.join(", ") || "minimal"}`, { recommendation: "Include About, Services, Products, and Key Pages sections.", weight: 1 }));
    else checks.push(mk("llms-structure-ok", "geo", "pass", "llms.txt well-structured", sections.join(", "), { weight: 1 }));
  }

  if (!files.llmsFullTxt) checks.push(mk("llms-full-missing", "geo", "warn", "llms-full.txt not found", "No deep GEO reference.", { recommendation: "Add llms-full.txt with 15+ Q&A blocks for AI citation.", weight: 1.5, platform: ["chatgpt", "perplexity", "gemini"] }));
  else {
    const qaCount = (files.llmsFullTxt.match(/^###\s*Q\d+:/gm) ?? []).length;
    if (qaCount < 10) checks.push(mk("llms-full-thin", "geo", "warn", "llms-full.txt has few Q&As", `${qaCount} Q&A blocks (target 15+).`, { weight: 1 }));
    else checks.push(mk("llms-full-present", "geo", "pass", "llms-full.txt comprehensive", `${qaCount} Q&A blocks`, { weight: 1.5, platform: ["chatgpt", "perplexity"] }));
  }

  const trustPaths = ["/about", "/privacy", "/accessibility"];
  const auditedPaths = auditedUrls.map((u) => { try { return new URL(u).pathname; } catch { return u; } });
  const missingTrust = trustPaths.filter((p) => !auditedPaths.includes(p) && !files.sitemapXml?.includes(p));
  if (missingTrust.length === 0) checks.push(mk("trust-pages", "trust", "pass", "E-E-A-T trust pages in sitemap", "/about, /privacy, /accessibility", { weight: 1.5, platform: ["google", "claude"] }));
  else missingTrust.forEach((p) => checks.push(mk(`trust-${p}`, "trust", "warn", `Trust page missing: ${p}`, "Not in audit scope or sitemap.", { recommendation: `Create and sitemap ${p}`, weight: 1 })));

  return checks;
}
