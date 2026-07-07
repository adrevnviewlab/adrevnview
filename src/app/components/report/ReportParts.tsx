import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Download,
  FileJson,
  Globe,
  Printer,
  Search,
  Sparkles,
  XCircle,
} from "lucide-react";
import { SpringPressable } from "@/components/SpringButton";
import type { AuditCheck, CheckCategory, IssueSeverity, SiteAuditReport } from "@/lib/seo/report/types";
import { CATEGORY_LABELS } from "@/lib/seo/report/checks";

const SEVERITY_STYLES: Record<IssueSeverity, string> = {
  critical: "bg-red-500/15 text-red-300 border-red-500/40",
  warning: "bg-amber-500/15 text-amber-300 border-amber-500/40",
  notice: "bg-sky-500/15 text-sky-300 border-sky-500/40",
};

const PLATFORM_ICONS: Record<string, string> = {
  google: "G",
  chatgpt: "C",
  perplexity: "P",
  claude: "A",
  gemini: "G+",
};

export function ScoreGauge({ score, label, sub }: { score: number; label: string; sub?: string }) {
  const pct = Math.min(100, Math.max(0, score));
  const color = pct >= 80 ? "#34d399" : pct >= 60 ? "#fbbf24" : "#f87171";
  const r = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={r} fill="none" stroke="var(--muted)" strokeWidth="10" />
          <circle
            cx="60"
            cy="60"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold tabular-nums" style={{ fontFamily: "Manrope, sans-serif" }}>
            {score}
          </span>
          <span className="text-xs text-muted-foreground">/ 100</span>
        </div>
      </div>
      <p className="text-sm font-semibold mt-2 text-foreground/90">{label}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function MetricsBar({ report }: { report: SiteAuditReport }) {
  const items = [
    { label: "Checks run", value: report.metrics.totalChecks },
    { label: "Pages scanned", value: report.metrics.pagesScanned },
    { label: "Words analyzed", value: report.metrics.wordsAnalyzed.toLocaleString() },
    { label: "Schema types", value: report.metrics.schemaTypeCount },
    { label: "Scan time", value: `${(report.metrics.scanDurationMs / 1000).toFixed(1)}s` },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
      {items.map((item) => (
        <div key={item.label} className="rounded-xl border border-sky-900/20 bg-secondary px-4 py-3 text-center">
          <p className="text-lg font-bold text-foreground">{item.value}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

export function PlatformCards({ report }: { report: SiteAuditReport }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {report.platformScores.map((p) => (
        <div key={p.platform} className="rounded-xl border border-sky-900/20 bg-card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-sky-600/20 border border-sky-500/30 flex items-center justify-center text-sm font-bold text-sky-300">
              {PLATFORM_ICONS[p.platform]}
            </div>
            <div>
              <p className="font-semibold text-sm">{p.label}</p>
              <p className="text-2xl font-bold">{p.score}<span className="text-sm text-muted-foreground font-normal">/100</span></p>
            </div>
          </div>
          <div className="h-1.5 rounded-full bg-background overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-600 to-cyan-500 transition-all duration-700"
              style={{ width: `${p.score}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{p.summary}</p>
        </div>
      ))}
    </div>
  );
}

export function PillarGrid({ report }: { report: SiteAuditReport }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {(Object.entries(report.categoryScores) as [CheckCategory, number][]).map(([cat, score]) => (
        <div key={cat} className="rounded-xl border border-sky-900/20 bg-card p-4">
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs text-muted-foreground leading-snug pr-2">{CATEGORY_LABELS[cat]}</p>
            <span className="text-lg font-bold tabular-nums shrink-0">{score}</span>
          </div>
          <div className="h-1 rounded-full bg-background">
            <div className="h-full rounded-full bg-sky-500" style={{ width: `${score}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function IssueTable({ issues, filter }: { issues: AuditCheck[]; filter: "all" | IssueSeverity }) {
  const filtered = useMemo(
    () => (filter === "all" ? issues : issues.filter((i) => i.severity === filter)),
    [issues, filter],
  );
  if (filtered.length === 0) return <p className="text-muted-foreground text-sm py-8 text-center">No issues in this category.</p>;
  return (
    <div className="space-y-2">
      {filtered.map((issue) => (
        <div key={`${issue.id}-${issue.pagePath}`} className={`rounded-xl border px-4 py-3 ${SEVERITY_STYLES[issue.severity]}`}>
          <div className="flex items-start gap-3">
            {issue.severity === "critical" ? (
              <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
            ) : issue.severity === "warning" ? (
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 opacity-60" />
            )}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-sm">{issue.title}</span>
                <span className="text-[10px] uppercase tracking-wider opacity-60 px-1.5 py-0.5 rounded border border-current">
                  {CATEGORY_LABELS[issue.category]}
                </span>
                {issue.pagePath && (
                  <span className="text-[10px] font-mono opacity-50">{issue.pagePath}</span>
                )}
              </div>
              <p className="text-sm opacity-85 mt-1">{issue.detail}</p>
              {issue.recommendation && (
                <p className="text-xs mt-2 opacity-75 border-l-2 border-current pl-2">{issue.recommendation}</p>
              )}
              {issue.fixSnippet && (
                <pre className="text-[11px] mt-2 p-2 rounded bg-black/30 overflow-x-auto font-mono opacity-90">{issue.fixSnippet}</pre>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ActionPlanList({ report }: { report: SiteAuditReport }) {
  if (report.actionPlan.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Sparkles className="w-8 h-8 mx-auto mb-3 text-emerald-400" />
        <p>No critical fixes needed — strong SEO/GEO foundation.</p>
      </div>
    );
  }
  return (
    <ol className="space-y-4">
      {report.actionPlan.map((item) => (
        <li key={item.priority} className="rounded-xl border border-sky-900/20 bg-card p-5">
          <div className="flex items-start gap-4">
            <span className="w-8 h-8 rounded-full bg-sky-600/30 border border-sky-500/40 flex items-center justify-center text-sm font-bold shrink-0">
              {item.priority}
            </span>
            <div>
              <div className="flex flex-wrap gap-2 items-center mb-1">
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${SEVERITY_STYLES[item.severity]}`}>
                  {item.severity}
                </span>
                <span className="text-[10px] text-muted-foreground uppercase">Impact: {item.impact}</span>
                {item.pagePath && <span className="text-[10px] font-mono text-muted-foreground">{item.pagePath}</span>}
              </div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.recommendation}</p>
              {item.fixSnippet && (
                <pre className="text-xs mt-3 p-3 rounded-lg bg-background border border-sky-900/20 font-mono text-sky-200 overflow-x-auto">
                  {item.fixSnippet}
                </pre>
              )}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function PageCards({ report }: { report: SiteAuditReport }) {
  return (
    <div className="space-y-4">
      {report.pages.map((page) => {
        const fails = page.checks.filter((c) => c.status === "fail").length;
        const warns = page.checks.filter((c) => c.status === "warn").length;
        return (
          <details key={page.snapshot.path} className="rounded-xl border border-sky-900/20 bg-card group">
            <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none">
              <div className="flex items-center gap-3 min-w-0">
                <ChevronDown className="w-4 h-4 text-muted-foreground group-open:rotate-180 transition-transform shrink-0" />
                <div className="min-w-0">
                  <p className="font-semibold font-mono text-sm">{page.snapshot.path}</p>
                  <p className="text-xs text-muted-foreground truncate">{page.snapshot.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-4">
                <span className="text-xs text-muted-foreground">{page.snapshot.wordCount} words</span>
                {fails > 0 && <span className="text-xs text-red-400">{fails} critical</span>}
                {warns > 0 && <span className="text-xs text-amber-400">{warns} warnings</span>}
                <span className="text-lg font-bold">{page.score}</span>
              </div>
            </summary>
            <div className="px-5 pb-5 border-t border-sky-900/15 pt-4 space-y-2">
              {page.checks
                .filter((c) => c.status !== "pass")
                .map((c) => (
                  <div key={c.id} className={`text-sm rounded-lg border px-3 py-2 ${SEVERITY_STYLES[c.severity]}`}>
                    <span className="font-medium">{c.title}</span>
                    {c.detail && <span className="opacity-75"> — {c.detail}</span>}
                  </div>
                ))}
              {page.checks.every((c) => c.status === "pass") && (
                <p className="text-sm text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> All checks passed on this page.
                </p>
              )}
            </div>
          </details>
        );
      })}
    </div>
  );
}

export const SCAN_STEPS = [
  "Resolving domain & fetching robots.txt",
  "Parsing sitemap.xml & llms.txt",
  "Crawling pages & extracting metadata",
  "Running 45+ SEO & GEO checks",
  "Scoring AI platform readiness",
  "Building action plan",
];

export function ScanProgress({ step, progress }: { step: number; progress: number }) {
  return (
    <div className="rounded-2xl border border-sky-900/25 bg-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-5 h-5 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-sky-300">{SCAN_STEPS[step] ?? "Finalizing…"}</p>
      </div>
      <div className="h-2 rounded-full bg-background overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-sky-600 to-cyan-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-2">{progress}% complete</p>
    </div>
  );
}

export function ExportBar({
  report,
  onExportMd,
  onExportJson,
  onPrint,
}: {
  report: SiteAuditReport;
  onExportMd: () => void;
  onExportJson: () => void;
  onPrint: () => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <SpringPressable onClick={onExportMd} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-sky-900/30 hover:bg-white/5 text-sm">
        <Download className="w-4 h-4" /> Markdown Report
      </SpringPressable>
      <SpringPressable onClick={onExportJson} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-sky-900/30 hover:bg-white/5 text-sm">
        <FileJson className="w-4 h-4" /> JSON Data
      </SpringPressable>
      <SpringPressable onClick={onPrint} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-sky-900/30 hover:bg-white/5 text-sm">
        <Printer className="w-4 h-4" /> Print / PDF
      </SpringPressable>
    </div>
  );
}

export function ScannerHero({
  url,
  onUrlChange,
  onScan,
  loading,
  scanStep,
  scanProgress,
}: {
  url: string;
  onUrlChange: (v: string) => void;
  onScan: () => void;
  loading: boolean;
  scanStep: number;
  scanProgress: number;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-sky-900/30 bg-gradient-to-br from-card to-background p-8 mb-8">
      <div className="absolute top-0 right-0 w-64 h-64 bg-sky-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="relative">
        <div className="flex items-center gap-2 text-sky-400 text-sm font-medium mb-3">
          <Globe className="w-4 h-4" />
          45+ checks · Google · ChatGPT · Perplexity · Claude · Gemini
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2" style={{ fontFamily: "Manrope, sans-serif" }}>
          SEO & GEO Report Generator
        </h1>
        <p className="text-muted-foreground mb-6 max-w-xl text-sm leading-relaxed">
          Semrush-grade site audit for search engines and AI assistants. Analyze any public URL for metadata, schema,
          llms.txt, crawler access, content citability, and E-E-A-T signals.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={url}
              onChange={(e) => onUrlChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !loading && onScan()}
              placeholder="Enter any URL (e.g. https://example.com)"
              className="w-full rounded-xl bg-background border border-sky-900/40 pl-11 pr-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-sky-500/60"
            />
          </div>
          <SpringPressable
            onClick={onScan}
            disabled={loading || !url.trim()}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-semibold hover:from-sky-500 hover:to-cyan-500 disabled:opacity-50 transition-all shrink-0"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            {loading ? "Scanning…" : "Run Scan"}
          </SpringPressable>
        </div>
        {loading && <div className="mt-6"><ScanProgress step={scanStep} progress={scanProgress} /></div>}
      </div>
    </div>
  );
}
