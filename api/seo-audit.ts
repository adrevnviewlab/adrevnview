import type { VercelRequest, VercelResponse } from "@vercel/node";
import { runFullAudit } from "../src/lib/seo/report/runAudit";

const MAX_PAGES = 8;

function normalizeInput(raw: string): string {
  let url = raw.trim();
  if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
  return url;
}

function isValidAuditUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) return false;
    const host = parsed.hostname;
    if (host === "localhost" || host === "127.0.0.1" || host.endsWith(".local")) return false;
    return true;
  } catch {
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body ?? {};
  const rawUrl = body.url;

  if (!rawUrl || typeof rawUrl !== "string") {
    return res.status(400).json({ error: "Missing url in request body." });
  }

  const url = normalizeInput(rawUrl);
  if (!isValidAuditUrl(url)) {
    return res.status(400).json({ error: "Invalid or disallowed URL." });
  }

  try {
    const report = await runFullAudit(url, { maxPages: MAX_PAGES });
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json(report);
  } catch (err) {
    console.error("[seo-audit] failed:", err);
    const message = err instanceof Error ? err.message : "Audit failed";
    return res.status(500).json({ error: message });
  }
}
