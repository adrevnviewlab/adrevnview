import { Suspense, lazy } from "react";
import { StaticBackground } from "@/components/fx/StaticBackground";
import { usePerformanceTier } from "@/lib/performance";

const GpuFxLayer = lazy(() =>
  import("@/components/fx/GpuFxLayer").then((m) => ({ default: m.GpuFxLayer })),
);

type FxBackgroundProps = {
  className?: string;
  variant?: "hero" | "subtle";
};

export function FxBackground({ className = "", variant = "hero" }: FxBackgroundProps) {
  const { gpuFx, ready } = usePerformanceTier();

  if (!gpuFx) {
    return <StaticBackground className={className} variant={variant} />;
  }

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <StaticBackground variant={variant} />
      {ready ? (
        <Suspense fallback={null}>
          <GpuFxLayer variant={variant} />
        </Suspense>
      ) : null}
    </div>
  );
}
