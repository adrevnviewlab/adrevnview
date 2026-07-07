import { useState } from "react";
import { Check, Star } from "lucide-react";
import { SpringPressable } from "@/components/SpringButton";
import { NfcReviewCard } from "./NfcReviewCard";

type DemoPhase = "idle" | "approaching" | "tapped" | "review";

const PHASE_COPY: Record<DemoPhase, string> = {
  idle: "Tap the button to see how it works",
  approaching: "Phone approaching card…",
  tapped: "NFC link opened!",
  review: "Customer leaves a 5-star review",
};

export function NfcTapDemo() {
  const [phase, setPhase] = useState<DemoPhase>("idle");
  const [reviewCount, setReviewCount] = useState(47);

  const runDemo = () => {
    if (phase !== "idle" && phase !== "review") return;

    setPhase("approaching");
    window.setTimeout(() => setPhase("tapped"), 900);
    window.setTimeout(() => {
      setPhase("review");
      setReviewCount((c) => c + 1);
    }, 1800);
    window.setTimeout(() => setPhase("idle"), 4500);
  };

  const isActive = phase === "approaching" || phase === "tapped";

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Status pill */}
      <div className="flex justify-center mb-6">
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-medium transition-all duration-500 ${
            phase === "review"
              ? "border-emerald-500/40 bg-emerald-900/20 text-emerald-300"
              : isActive
                ? "border-sky-500/50 bg-sky-600/15 text-sky-700 dark:text-sky-200"
                : "border-sky-900/30 bg-card text-muted-foreground"
          }`}
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {phase === "review" ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <span className={`w-2 h-2 rounded-full ${isActive ? "bg-sky-400 animate-pulse" : "bg-slate-600"}`} />
          )}
          {PHASE_COPY[phase]}
        </div>
      </div>

      {/* Scene */}
      <div className="relative h-[22rem] flex items-end justify-center pb-4">
        {/* Counter surface */}
        <div className="absolute bottom-0 left-0 right-0 h-24 rounded-2xl bg-gradient-to-t from-card to-secondary border border-sky-900/20" />

        {/* NFC Card */}
        <div
          className={`absolute bottom-10 z-10 transition-transform duration-700 ease-out ${
            phase === "approaching" ? "scale-105" : "scale-100"
          }`}
        >
          <NfcReviewCard size="sm" flippable={false} glowing={false} showControls={false} />
        </div>

        {/* Phone mockup */}
        <div
          className={`absolute z-20 transition-all duration-700 ease-out ${
            phase === "idle" || phase === "review"
              ? "bottom-32 right-4 translate-y-0 rotate-0 opacity-100"
              : phase === "approaching"
                ? "bottom-16 right-16 translate-y-2 -rotate-12 opacity-100"
                : "bottom-14 right-20 translate-y-0 -rotate-6 opacity-100"
          }`}
        >
          <PhoneMockup phase={phase} reviewCount={reviewCount} />
        </div>

        {/* Success burst */}
        {phase === "review" && (
          <div className="absolute bottom-36 left-1/2 -translate-x-1/2 z-30 animate-fade-up">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-600/90 text-white text-xs font-bold shadow-lg">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-white text-white" />
              ))}
              <span className="ml-1">+1 review</span>
            </div>
          </div>
        )}
      </div>

      <SpringPressable
        type="button"
        onClick={runDemo}
        disabled={isActive}
        className="w-full mt-2 py-3 rounded-xl border border-border bg-secondary text-secondary-foreground text-sm font-semibold hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        style={{ fontFamily: "Manrope, sans-serif" }}
      >
        {phase === "idle" || phase === "review" ? "▶ Try the tap demo" : "Demo running…"}
      </SpringPressable>
    </div>
  );
}

function PhoneMockup({ phase, reviewCount }: { phase: DemoPhase; reviewCount: number }) {
  const showReview = phase === "tapped" || phase === "review";

  return (
    <div className="w-36 rounded-[1.75rem] border-[3px] border-slate-700 bg-[#0a0e1a] shadow-2xl shadow-black/60 overflow-hidden">
      {/* Notch */}
      <div className="h-5 bg-[#0a0e1a] flex justify-center items-end pb-0.5">
        <div className="w-12 h-3 rounded-full bg-slate-800" />
      </div>

      {/* Screen */}
      <div className="px-2 pb-3 h-44">
        {showReview ? (
          <div className="h-full rounded-xl bg-white p-2.5 flex flex-col animate-fade-in">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 via-green-500 to-yellow-500 flex items-center justify-center text-[8px] font-bold text-foreground">
                G
              </div>
              <span className="text-[9px] font-semibold text-slate-800">Google Reviews</span>
            </div>
            <p className="text-[8px] text-slate-500 mb-2">Rate your experience</p>
            <div className="flex gap-0.5 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 transition-all duration-300 ${
                    phase === "review" ? "fill-amber-400 text-amber-400" : "text-slate-300"
                  }`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                />
              ))}
            </div>
            {phase === "review" && (
              <div className="mt-auto flex items-center gap-1 text-[8px] text-emerald-600 font-semibold">
                <Check className="w-3 h-3" />
                Review posted!
              </div>
            )}
          </div>
        ) : (
          <div className="h-full rounded-xl bg-[#12182e] flex flex-col items-center justify-center gap-2 p-3">
            <div className={`w-8 h-8 rounded-full border-2 border-dashed border-sky-500/50 flex items-center justify-center ${phase === "approaching" ? "animate-pulse" : ""}`}>
              <div className="w-3 h-3 rounded-full bg-sky-500/60" />
            </div>
            <p className="text-[8px] text-slate-400 text-center">
              {phase === "approaching" ? "Reading NFC…" : "Ready to tap"}
            </p>
          </div>
        )}
      </div>

      {/* Review counter */}
      <div className="px-2 pb-2">
        <div className="rounded-lg bg-[#12182e] px-2 py-1 flex items-center justify-between">
          <span className="text-[8px] text-slate-400">Total reviews</span>
          <span className="text-[10px] font-bold text-sky-300 tabular-nums">{reviewCount}</span>
        </div>
      </div>
    </div>
  );
}
