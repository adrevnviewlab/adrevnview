import { parse, type HTMLElement } from "node-html-parser";
import {
  collectSchemaTypes,
  countFaqPairs,
  hasSchemaType,
  hasSearchActionSchema,
  orgEntitySignals,
} from "./schemaUtils.js";
import type { PageSnapshot } from "./types.js";

function htmlByteSize(html: string): number {
  return Buffer.byteLength(html, "utf8");
}

function metaContent(root: HTMLElement, name: string, attr: "name" | "property" = "name"): string {
  const el = root.querySelector(`meta[${attr}="${name}"]`);
  return el?.getAttribute("content")?.trim() ?? "";
}

export function parseHtmlSnapshot(html: string, url: string): PageSnapshot {
  const root = parse(html);
  const path = new URL(url).pathname || "/";
  const title = root.querySelector("title")?.text?.trim() ?? "";
  const canonical = root.querySelector('link[rel="canonical"]')?.getAttribute("href")?.trim() ?? "";
  const h1Texts = root.querySelectorAll("h1").map((el) => el.text.trim()).filter(Boolean);
  const h2Texts = root.querySelectorAll("h2").map((el) => el.text.trim()).filter(Boolean);
  const questionHeadings = root
    .querySelectorAll("h2, h3")
    .filter((el) => /\?/.test(el.text)).length;
  const images = root.querySelectorAll("img");
  const jsonLdBlocks: unknown[] = [];
  for (const script of root.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      jsonLdBlocks.push(JSON.parse(script.text.trim()));
    } catch {
      jsonLdBlocks.push({ __parseError: true });
    }
  }
  const rootEl = root.querySelector("#root");
  const body = root.querySelector("body");
  const bodyText = body?.text.replace(/\s+/g, " ").trim() ?? "";
  const wordCount = bodyText ? bodyText.split(/\s+/).filter(Boolean).length : 0;
  const host = new URL(url).host;
  let internalLinkCount = 0;
  let externalLinkCount = 0;
  for (const a of root.querySelectorAll("a[href]")) {
    const href = a.getAttribute("href") ?? "";
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
    try {
      const linkHost = new URL(href, url).host;
      if (linkHost === host) internalLinkCount++;
      else externalLinkCount++;
    } catch {
      internalLinkCount++;
    }
  }
  const schemaTypes = collectSchemaTypes(jsonLdBlocks);
  const orgSignals = orgEntitySignals(jsonLdBlocks);
  const faqItems = root.querySelectorAll("[itemtype*='FAQPage'] details, .faq-item, [data-faq]").length;
  const visibleFaqItems = faqItems || (body?.innerHTML.match(/<h[23][^>]*>[^<]*\?/gi) ?? []).length;
  const htmlSizeBytes = htmlByteSize(html);

  return {
    url,
    path,
    title,
    metaDescription: metaContent(root, "description"),
    canonical,
    robots: metaContent(root, "robots"),
    keywords: metaContent(root, "keywords"),
    author: metaContent(root, "author"),
    viewport: metaContent(root, "viewport"),
    charset: root.querySelector("meta[charset]")?.getAttribute("charset")?.trim() ?? "",
    themeColor: metaContent(root, "theme-color"),
    h1Texts,
    h2Texts,
    h3Count: root.querySelectorAll("h3").length,
    questionHeadings,
    imagesTotal: images.length,
    imagesMissingAlt: images.filter((img) => !(img.getAttribute("alt") ?? "").trim()).length,
    imagesMissingDimensions: images.filter((img) => !img.getAttribute("width") && !img.getAttribute("height")).length,
    jsonLdBlocks,
    schemaTypes,
    faqSchemaPairs: countFaqPairs(jsonLdBlocks),
    orgHasSameAs: orgSignals.hasSameAs,
    orgHasContact: orgSignals.hasContact,
    orgHasKnowsAbout: orgSignals.hasKnowsAbout,
    ogTitle: metaContent(root, "og:title", "property"),
    ogDescription: metaContent(root, "og:description", "property"),
    ogImage: metaContent(root, "og:image", "property"),
    ogUrl: metaContent(root, "og:url", "property"),
    twitterCard: metaContent(root, "twitter:card"),
    bodyTextLength: bodyText.length,
    wordCount,
    rootContentLength: rootEl?.innerHTML.length ?? body?.innerHTML.length ?? 0,
    hasSpeakable: Boolean(root.querySelector("[data-speakable], [itemprop='speakable']")),
    hasFaqHeading: /frequently asked|faq/i.test(bodyText),
    visibleFaqItems,
    hasGeoChunk: Boolean(root.querySelector('[data-geo-chunk="summary"]')),
    internalLinkCount,
    externalLinkCount,
    htmlLang: root.querySelector("html")?.getAttribute("lang")?.trim() ?? "",
    isHttps: url.startsWith("https://"),
    scriptCount: root.querySelectorAll("script").length,
    stylesheetCount: root.querySelectorAll('link[rel="stylesheet"]').length,
    htmlSizeBytes,
    hasLlmsLink: Boolean(root.querySelector('link[href*="llms.txt"]')),
    hasSitemapLink: Boolean(root.querySelector('link[rel="sitemap"]')),
    hasBreadcrumbSchema: hasSchemaType(jsonLdBlocks, "BreadcrumbList"),
    hasWebSiteSchema: hasSchemaType(jsonLdBlocks, "WebSite"),
    hasSearchAction: hasSearchActionSchema(jsonLdBlocks),
  };
}
