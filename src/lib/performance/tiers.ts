export type PerfTier = "full" | "reduced" | "basic";

export const PERF_TIER_RANK: Record<PerfTier, number> = {
  basic: 0,
  reduced: 1,
  full: 2,
};

export function minPerfTier(a: PerfTier, b: PerfTier): PerfTier {
  return PERF_TIER_RANK[a] <= PERF_TIER_RANK[b] ? a : b;
}

/** Core Web Vitals / load-time thresholds (ms) and runtime targets */
export const PERF_BENCHMARKS = {
  /** Total load event end — good ≤ 2.5s, poor > 4s, critical > 6s */
  loadMs: { good: 2500, poor: 4000, critical: 6000 },
  /** DOM content loaded */
  domContentLoadedMs: { good: 1800, poor: 3000, critical: 5000 },
  /** First-frame FPS sample over ~1.5s */
  fps: { good: 55, poor: 45, critical: 30 },
  deviceMemoryGb: { low: 4, critical: 2 },
  hardwareConcurrency: { low: 4, critical: 2 },
} as const;

export type PerfCapabilities = {
  tier: PerfTier;
  /** WebGPU / WebGL canvas backgrounds */
  gpuFx: boolean;
  /** Motion spring hover/tap on buttons */
  springMotion: boolean;
  /** Border blink outline animations */
  borderBlink: boolean;
  /** Large CSS blur glow layers */
  heavyBlur: boolean;
  /** CSS marquee / infinite animations */
  cssMotion: boolean;
};

export function capabilitiesForTier(tier: PerfTier): PerfCapabilities {
  switch (tier) {
    case "full":
      return {
        tier,
        gpuFx: true,
        springMotion: true,
        borderBlink: true,
        heavyBlur: true,
        cssMotion: true,
      };
    case "reduced":
      return {
        tier,
        gpuFx: false,
        springMotion: true,
        borderBlink: false,
        heavyBlur: false,
        cssMotion: true,
      };
    case "basic":
      return {
        tier,
        gpuFx: false,
        springMotion: false,
        borderBlink: false,
        heavyBlur: false,
        cssMotion: false,
      };
  }
}

export type PerfDowngradeReason =
  | "save-data"
  | "slow-network"
  | "reduced-motion"
  | "low-memory"
  | "low-cpu"
  | "slow-load"
  | "slow-dom"
  | "low-fps"
  | "gpu-unavailable";
