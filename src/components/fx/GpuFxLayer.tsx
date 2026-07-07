import { WebGLBackground } from "@/components/fx/WebGLBackground";
import { WebGPUBackground } from "@/components/fx/WebGPUBackground";
import { usePerformanceTier } from "@/lib/performance";
import { useState } from "react";

type GpuFxLayerProps = {
  variant?: "hero" | "subtle";
};

/** WebGPU with WebGL fallback — only loaded when perf tier allows GPU FX */
export function GpuFxLayer({ variant = "hero" }: GpuFxLayerProps) {
  const [useWebGL, setUseWebGL] = useState(false);
  const { borderBlink } = usePerformanceTier();
  const particleCount = variant === "hero" ? 64 : 32;

  return (
    <div className="perf-gpu-layer absolute inset-0">
      {!useWebGL ? (
        <WebGPUBackground onFallback={() => setUseWebGL(true)} />
      ) : (
        <WebGLBackground particleCount={particleCount} />
      )}
      {borderBlink ? (
        <div className="absolute inset-0 border border-sky-400/10 border-blink opacity-40 rounded-none" />
      ) : null}
    </div>
  );
}
