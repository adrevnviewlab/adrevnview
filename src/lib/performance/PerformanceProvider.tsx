import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { assessFromNavigation, assessSync, sampleFps, tierFromFps } from "./assess";
import {
  capabilitiesForTier,
  minPerfTier,
  type PerfCapabilities,
  type PerfDowngradeReason,
  type PerfTier,
} from "./tiers";

type PerformanceContextValue = PerfCapabilities & {
  reasons: PerfDowngradeReason[];
  ready: boolean;
};

const PerformanceContext = createContext<PerformanceContextValue>({
  ...capabilitiesForTier("basic"),
  reasons: [],
  ready: false,
});

function applyTierToDocument(tier: PerfTier) {
  document.documentElement.dataset.perfTier = tier;
}

export function PerformanceProvider({ children }: { children: ReactNode }) {
  const initial = assessSync();
  const [tier, setTier] = useState<PerfTier>(initial.tier);
  const [reasons, setReasons] = useState<PerfDowngradeReason[]>(initial.reasons);
  const [ready, setReady] = useState(false);
  const tierRef = useRef(tier);
  tierRef.current = tier;

  const downgrade = useCallback((next: PerfTier, reason: PerfDowngradeReason) => {
    setTier((prev) => {
      const merged = minPerfTier(prev, next);
      if (merged !== prev) {
        setReasons((r) => (r.includes(reason) ? r : [...r, reason]));
        tierRef.current = merged;
      }
      return merged;
    });
  }, []);

  useEffect(() => {
    applyTierToDocument(tier);
  }, [tier]);

  useEffect(() => {
    applyTierToDocument(initial.tier);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const runPostLoad = async () => {
      const nav = assessFromNavigation();
      if (nav) {
        for (const reason of nav.reasons) {
          downgrade(nav.tier, reason);
        }
      }

      if (!cancelled && tierRef.current !== "basic") {
        const fps = await sampleFps(1200);
        if (cancelled) return;
        const fpsResult = tierFromFps(fps);
        if (fpsResult) downgrade(fpsResult.tier, fpsResult.reason);
      }

      if (!cancelled) setReady(true);
    };

    if (document.readyState === "complete") {
      void runPostLoad();
    } else {
      window.addEventListener("load", () => void runPostLoad(), { once: true });
    }

    type Conn = EventTarget & {
      addEventListener(type: "change", listener: () => void): void;
      removeEventListener(type: "change", listener: () => void): void;
    };
    const conn = (navigator as Navigator & { connection?: Conn }).connection;
    const onConnectionChange = () => {
      const sync = assessSync();
      downgrade(sync.tier, sync.reasons[0] ?? "slow-network");
    };
    conn?.addEventListener("change", onConnectionChange);

    return () => {
      cancelled = true;
      conn?.removeEventListener("change", onConnectionChange);
    };
  }, [downgrade]);

  const value = useMemo(
    () => ({
      ...capabilitiesForTier(tier),
      reasons,
      ready,
    }),
    [tier, reasons, ready],
  );

  return <PerformanceContext.Provider value={value}>{children}</PerformanceContext.Provider>;
}

export function usePerformanceTier() {
  return useContext(PerformanceContext);
}
