import { runFullAudit } from "../src/lib/seo/report/runAudit";

const MAX_PAGES = 8;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

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

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...CORS_HEADERS,
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed. Use POST." }, 405);
  }

  let body: { url?: string };
  try {
    body = (await request.json()) as { url?: string };
  } catch {
    return jsonResponse({ error: "Invalid JSON body." }, 400);
  }

  const rawUrl = body.url;
  if (!rawUrl || typeof rawUrl !== "string") {
    return jsonResponse({ error: "Missing url in request body." }, 400);
  }

  const url = normalizeInput(rawUrl);
  if (!isValidAuditUrl(url)) {
    return jsonResponse({ error: "Invalid or disallowed URL." }, 400);
  }

  try {
    const report = await runFullAudit(url, { maxPages: MAX_PAGES });
    return jsonResponse(report);
  } catch (err) {
    console.error("[seo-audit] failed:", err);
    const message = err instanceof Error ? err.message : "Audit failed";
    return jsonResponse({ error: message }, 500);
  }
}
