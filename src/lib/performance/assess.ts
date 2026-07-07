import {
  PERF_BENCHMARKS,
  type PerfDowngradeReason,
  type PerfTier,
  minPerfTier,
} from "./tiers";

type NetworkInformation = EventTarget & {
  effectiveType?: string;
  saveData?: boolean;
  downlink?: number;
};

function getConnection(): NetworkInformation | undefined {
  return (navigator as Navigator & { connection?: NetworkInformation }).connection;
}

/** Instant checks before heavy assets mount */
export function assessSync(): { tier: PerfTier; reasons: PerfDowngradeReason[] } {
  const reasons: PerfDowngradeReason[] = [];
  let tier: PerfTier = "full";

  if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    reasons.push("reduced-motion");
    tier = minPerfTier(tier, "basic");
  }

  const conn = getConnection();
  if (conn?.saveData) {
    reasons.push("save-data");
    tier = minPerfTier(tier, "basic");
  }

  const effectiveType = conn?.effectiveType ?? "";
  if (effectiveType === "slow-2g" || effectiveType === "2g") {
    reasons.push("slow-network");
    tier = minPerfTier(tier, "basic");
  } else if (effectiveType === "3g") {
    reasons.push("slow-network");
    tier = minPerfTier(tier, "reduced");
  } else if (typeof conn?.downlink === "number" && conn.downlink < 1.5) {
    reasons.push("slow-network");
    tier = minPerfTier(tier, "reduced");
  }

  const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (deviceMemory !== undefined) {
    if (deviceMemory <= PERF_BENCHMARKS.deviceMemoryGb.critical) {
      reasons.push("low-memory");
      tier = minPerfTier(tier, "basic");
    } else if (deviceMemory <= PERF_BENCHMARKS.deviceMemoryGb.low) {
      reasons.push("low-memory");
      tier = minPerfTier(tier, "reduced");
    }
  }

  const cores = navigator.hardwareConcurrency;
  if (cores !== undefined) {
    if (cores <= PERF_BENCHMARKS.hardwareConcurrency.critical) {
      reasons.push("low-cpu");
      tier = minPerfTier(tier, "basic");
    } else if (cores <= PERF_BENCHMARKS.hardwareConcurrency.low) {
      reasons.push("low-cpu");
      tier = minPerfTier(tier, "reduced");
    }
  }

  return { tier, reasons };
}

/** Post-load navigation timing */
export function assessFromNavigation(): { tier: PerfTier; reasons: PerfDowngradeReason[] } | null {
  const [nav] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
  if (!nav || nav.loadEventEnd <= 0) return null;

  const reasons: PerfDowngradeReason[] = [];
  let tier: PerfTier = "full";

  const loadMs = nav.loadEventEnd - nav.startTime;
  const dclMs = nav.domContentLoadedEventEnd - nav.startTime;

  if (loadMs > PERF_BENCHMARKS.loadMs.critical) {
    reasons.push("slow-load");
    tier = minPerfTier(tier, "basic");
  } else if (loadMs > PERF_BENCHMARKS.loadMs.poor) {
    reasons.push("slow-load");
    tier = minPerfTier(tier, "reduced");
  } else if (loadMs > PERF_BENCHMARKS.loadMs.good) {
    reasons.push("slow-load");
    tier = minPerfTier(tier, "reduced");
  }

  if (dclMs > PERF_BENCHMARKS.domContentLoadedMs.critical) {
    reasons.push("slow-dom");
    tier = minPerfTier(tier, "basic");
  } else if (dclMs > PERF_BENCHMARKS.domContentLoadedMs.poor) {
    reasons.push("slow-dom");
    tier = minPerfTier(tier, "reduced");
  }

  if (reasons.length === 0) return null;
  return { tier, reasons };
}

/** Lightweight FPS sample — skips work on basic tier callers */
export function sampleFps(durationMs = 1500): Promise<number> {
  return new Promise((resolve) => {
    const frames: number[] = [];
    let last = performance.now();
    let raf = 0;
    const start = last;

    const tick = (now: number) => {
      const delta = now - last;
      if (delta > 0) frames.push(1000 / delta);
      last = now;
      if (now - start < durationMs) {
        raf = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(raf);
        if (frames.length === 0) resolve(60);
        else resolve(frames.reduce((a, b) => a + b, 0) / frames.length);
      }
    };

    raf = requestAnimationFrame(tick);
  });
}

export function tierFromFps(fps: number): { tier: PerfTier; reason: PerfDowngradeReason } | null {
  if (fps < PERF_BENCHMARKS.fps.critical) return { tier: "basic", reason: "low-fps" };
  if (fps < PERF_BENCHMARKS.fps.poor) return { tier: "reduced", reason: "low-fps" };
  return null;
}
