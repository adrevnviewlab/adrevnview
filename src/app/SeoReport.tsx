import { useCallback, useState } from "react";
import { SeoHead } from "@/components/seo/SeoHead";
import { SpringPressable } from "@/components/SpringButton";
import { Logo } from "@/components/Logo";
import { MusicToggle } from "@/components/MusicToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { IssueSeverity, SiteAuditReport } from "@/lib/seo/report/types";
import { downloadText, formatReportHtml, formatReportJson, formatReportMarkdown } from "@/lib/seo/report/formatReport";
import {
  ActionPlanList,
  ExportBar,
  IssueTable,
  MetricsBar,
  PageCards,
  PillarGrid,
  PlatformCards,
  ScannerHero,
  ScoreGauge,
  SCAN_STEPS,
} from "@/app/components/report/ReportParts";

type Tab = "overview" | "issues" | "pages" | "platforms" | "actions";

async function auditViaApi(url: string): Promise<SiteAuditReport> {
  let res: Response;
  try {
    res = await fetch("/api/seo-audit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
  } catch {
    throw new Error("Network error — could not reach the audit API. Check your connection and try again.");
  }

  const text = await res.text();
  let payload: { error?: string } & Partial<SiteAuditReport> = {};
  try {
    payload = JSON.parse(text) as typeof payload;
  } catch {
    if (text.includes("FUNCTION_INVOCATION_FAILED")) {
      throw new Error("Audit server failed to start. The API function may need redeploying on Vercel.");
    }
    throw new Error(res.ok ? "Invalid response from audit API." : `Audit API error (${res.status}): ${text.slice(0, 120)}`);
  }

  if (!res.ok) {
    throw new Error(payload.error ?? `Audit API failed (${res.status})`);
  }
  return payload as SiteAuditReport;
}

async function runAuditWithProgress(
  url: string,
  onProgress: (step: number, pct: number) => void,
): Promise<SiteAuditReport> {
  const normalized = url.startsWith("http") ? url : `https://${url}`;
  let step = 0;
  let pct = 5;
  onProgress(step, pct);

  const progressTimer = window.setInterval(() => {
    step = Math.min(step + 1, SCAN_STEPS.length - 2);
    pct = Math.min(pct + 8, 92);
    onProgress(step, pct);
  }, 1500);

  try {
    const report = await auditViaApi(normalized);
    onProgress(SCAN_STEPS.length - 1, 100);
    return report;
  } finally {
    window.clearInterval(progressTimer);
  }
}

export default function SeoReport() {
  const [url, setUrl] = useState("");
  const [report, setReport] = useState<SiteAuditReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("overview");
  const [issueFilter, setIssueFilter] = useState<"all" | IssueSeverity>("all");
  const [scanStep, setScanStep] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);

  const runScan = useCallback(async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError("");
    setReport(null);
    setScanStep(0);
    setScanProgress(0);
    try {
      const result = await runAuditWithProgress(url.trim(), (step, pct) => {
        setScanStep(step);
        setScanProgress(pct);
      });
      setReport(result);
      setTab("overview");
    } catch (e) {
      setError(
        e instanceof Error
          ? `${e.message} — The audit runs on our server. Check that /api/seo-audit is deployed and reachable.`
          : "Scan failed.",
      );
    } finally {
      setLoading(false);
    }
  }, [url]);

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: "overview", label: "Overview" },
    { id: "issues", label: "Issues", count: report?.issues.length },
    { id: "actions", label: "Action Plan", count: report?.actionPlan.length },
    { id: "platforms", label: "AI Platforms" },
    { id: "pages", label: "Pages", count: report?.pages.length },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
      <SeoHead
        title="Free SEO & GEO Report Generator | Adrevnview"
        description="Analyze any URL for SEO and Generative Engine Optimization. 45+ checks across Google, ChatGPT, Perplexity, Claude, and Gemini readiness."
        path="/geo-report"
      />

      <header className="border-b border-sky-900/20 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <Logo iconClassName="h-7 w-6" textClassName="h-5 w-auto" />
          <div className="flex items-center gap-2">
            <MusicToggle />
            <ThemeToggle />
            <span className="text-xs text-muted-foreground hidden sm:inline">{SCAN_STEPS.length} scan phases · {report ? `${report.metrics.totalChecks} checks` : "ready"}</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <ScannerHero
          url={url}
          onUrlChange={setUrl}
          onScan={runScan}
          loading={loading}
          scanStep={scanStep}
          scanProgress={scanProgress}
        />

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 px-4 py-3 text-sm mb-6">{error}</div>
        )}

        {report && (
          <>
            <div className="rounded-2xl border border-sky-900/25 bg-card p-6 sm:p-8 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Audit target</p>
                  <p className="font-semibold text-lg break-all">{report.targetUrl}</p>
                  <p className="text-muted-foreground text-xs mt-1">
                    {new Date(report.generatedAt).toLocaleString()} · {report.domain}
                  </p>
                </div>
                <div className="flex flex-wrap gap-8 justify-center">
                  <ScoreGauge score={report.overallScore} label="Overall" sub="Health score" />
                  <ScoreGauge score={report.seoScore} label="SEO" sub="Search engines" />
                  <ScoreGauge score={report.geoScore} label="GEO" sub="AI visibility" />
                </div>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex gap-4 text-sm">
                  <span className="text-emerald-400">✓ {report.summary.pass} passed</span>
                  <span className="text-amber-400">⚠ {report.summary.warn} warnings</span>
                  <span className="text-red-400">✕ {report.summary.fail} critical</span>
                </div>
                <ExportBar
                  report={report}
                  onExportMd={() => downloadText(`seo-geo-${report.domain}-${Date.now()}.md`, formatReportMarkdown(report), "text/markdown")}
                  onExportJson={() => downloadText(`seo-geo-${report.domain}-${Date.now()}.json`, formatReportJson(report), "application/json")}
                  onPrint={() => {
                    const w = window.open("", "_blank");
                    if (w) {
                      w.document.write(formatReportHtml(report));
                      w.document.close();
                      w.print();
                    }
                  }}
                />
              </div>
            </div>

            <div className="mb-6">
              <MetricsBar report={report} />
            </div>

            <div className="flex gap-1 overflow-x-auto border-b border-sky-900/20 mb-6 pb-px">
              {tabs.map((t) => (
                <SpringPressable
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`px-4 py-2.5 text-sm font-medium rounded-t-lg whitespace-nowrap transition-colors ${
                    tab === t.id
                      ? "bg-card text-sky-300 border border-sky-900/30 border-b-transparent -mb-px"
                      : "text-muted-foreground hover:text-foreground/80"
                  }`}
                >
                  {t.label}
                  {t.count !== undefined && (
                    <span className="ml-1.5 text-xs opacity-60">({t.count})</span>
                  )}
                </SpringPressable>
              ))}
            </div>

            {tab === "overview" && (
              <div className="space-y-8">
                <section>
                  <h2 className="text-lg font-bold mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>
                    Pillar Scores
                  </h2>
                  <PillarGrid report={report} />
                </section>
                <section>
                  <h2 className="text-lg font-bold mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>
                    Top Issues
                  </h2>
                  <IssueTable issues={report.issues.slice(0, 8)} filter="all" />
                </section>
              </div>
            )}

            {tab === "issues" && (
              <div>
                <div className="flex gap-2 mb-4">
                  {(["all", "critical", "warning", "notice"] as const).map((f) => (
                    <SpringPressable
                      key={f}
                      onClick={() => setIssueFilter(f)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize ${
                        issueFilter === f ? "bg-sky-600/30 text-sky-200" : "text-muted-foreground hover:text-foreground/80"
                      }`}
                    >
                      {f}
                    </SpringPressable>
                  ))}
                </div>
                <IssueTable issues={report.issues} filter={issueFilter} />
              </div>
            )}

            {tab === "actions" && <ActionPlanList report={report} />}
            {tab === "platforms" && <PlatformCards report={report} />}
            {tab === "pages" && <PageCards report={report} />}
          </>
        )}

        {!report && !loading && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-sm">No telemetry yet. Drop a URL above to ignite the scanner.</p>
          </div>
        )}
      </main>
    </div>
  );
}
