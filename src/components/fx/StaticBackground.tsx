import { usePerformanceTier } from "@/lib/performance";

type StaticBackgroundProps = {
  className?: string;
  variant?: "hero" | "subtle";
};

/** CSS-only background — zero GPU cost */
export function StaticBackground({ className = "", variant = "hero" }: StaticBackgroundProps) {
  const { heavyBlur } = usePerformanceTier();
  const intensity = variant === "hero" ? "opacity-100" : "opacity-70";

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div
        className={`absolute inset-0 bg-gradient-to-br from-sky-500/10 via-cyan-400/5 to-background dark:from-sky-400/10 dark:via-cyan-500/5 ${intensity}`}
      />
      {heavyBlur ? (
        <>
          <div className="perf-heavy-blur absolute top-1/4 left-1/3 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl" />
          <div className="perf-heavy-blur absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />
        </>
      ) : null}
    </div>
  );
}
