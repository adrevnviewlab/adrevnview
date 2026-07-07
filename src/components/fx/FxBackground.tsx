import { Suspense, lazy } from "react";
import { StaticBackground } from "@/components/fx/StaticBackground";
import { StreetViewBackground } from "@/components/fx/StreetViewBackground";
import { usePerformanceTier } from "@/lib/performance";

const GpuFxLayer = lazy(() =>
  import("@/components/fx/GpuFxLayer").then((m) => ({ default: m.GpuFxLayer })),
);

type FxBackgroundProps = {
  className?: string;
  variant?: "hero" | "subtle" | "streetview";
};

export function FxBackground({ className = "", variant = "hero" }: FxBackgroundProps) {
  const { gpuFx, ready, tier } = usePerformanceTier();

  if (variant === "streetview") {
    const quality = tier === "full" ? "full" : tier === "reduced" ? "reduced" : "static";
    return (
      <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
        <StreetViewBackground quality={quality} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90" />
      </div>
    );
  }

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
