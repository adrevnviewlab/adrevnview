import { useState } from "react";
import { Star, Wifi } from "lucide-react";
import { SpringPressable } from "@/components/SpringButton";

type NfcReviewCardProps = {
  size?: "sm" | "md" | "lg";
  flippable?: boolean;
  glowing?: boolean;
  showControls?: boolean;
  className?: string;
};

const SIZES = {
  sm: "w-52 h-[8.5rem]",
  md: "w-72 h-[11.5rem]",
  lg: "w-80 h-[12.75rem]",
};

function QrPattern() {
  const cells = [
    [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
    [1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0],
    [1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1],
    [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
    [1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0],
    [0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1],
    [1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1],
    [0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0],
    [1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1],
    [0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0],
  ];

  return (
    <div className="grid grid-cols-12 gap-[2px] p-2 bg-white rounded-lg">
      {cells.flat().map((filled, i) => (
        <div
          key={i}
          className={`aspect-square rounded-[1px] ${filled ? "bg-slate-900" : "bg-white"}`}
        />
      ))}
    </div>
  );
}

function NfcChip() {
  return (
    <div className="absolute top-5 left-5 w-10 h-8 rounded-md bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 shadow-inner border border-amber-500/50 overflow-hidden">
      <div className="absolute inset-1 grid grid-cols-3 grid-rows-2 gap-px opacity-60">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-amber-800/30 rounded-[1px]" />
        ))}
      </div>
    </div>
  );
}

function NfcWaves({ active }: { active?: boolean }) {
  return (
    <div className="relative flex items-center justify-center w-14 h-14">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`absolute rounded-full border-2 border-sky-400/60 ${
            active ? "animate-nfc-pulse" : "opacity-40"
          }`}
          style={{
            width: `${(i + 1) * 18}px`,
            height: `${(i + 1) * 18}px`,
            animationDelay: `${i * 0.35}s`,
          }}
        />
      ))}
      <div className="relative z-10 w-9 h-9 rounded-full bg-gradient-to-br from-sky-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-sky-900/50">
        <Wifi className="w-4 h-4 text-white rotate-90" />
      </div>
    </div>
  );
}

function CardFront({ size, tapping }: { size: "sm" | "md" | "lg"; tapping?: boolean }) {
  const compact = size === "sm";

  return (
    <div className="absolute inset-0 rounded-2xl overflow-hidden backface-hidden bg-gradient-to-br from-[#0f1535] via-[#121a42] to-[#1a1040] border border-sky-500/30 shadow-2xl shadow-sky-950/60">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.4),transparent_50%)]" />
      <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-cyan-500/10 blur-2xl" />

      <div className={`relative h-full flex flex-col justify-between ${compact ? "p-4" : "p-6"}`}>
        <div className="flex items-start justify-between">
          <NfcChip />
          <div className={`text-right ${compact ? "mt-1" : ""}`}>
            <div className="flex justify-end gap-0.5 mb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`${compact ? "w-2.5 h-2.5" : "w-3.5 h-3.5"} fill-amber-400 text-amber-400`} />
              ))}
            </div>
            <p className={`text-sky-200 font-medium ${compact ? "text-[9px]" : "text-xs"}`} style={{ fontFamily: "Manrope, sans-serif" }}>
              Google Reviews
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <NfcWaves active={tapping} />
          <p className={`font-bold text-white tracking-wide ${compact ? "text-sm" : "text-lg"}`} style={{ fontFamily: "Manrope, sans-serif" }}>
            Tap to Review
          </p>
          <p className={`text-sky-200/75 text-center ${compact ? "text-[9px] max-w-[9rem]" : "text-xs max-w-[12rem]"}`}>
            Hold your phone near the card
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className={`text-sky-300 font-semibold ${compact ? "text-[8px]" : "text-[10px]"} tracking-widest uppercase`}>
            Adrevnview
          </span>
          <div className={`flex gap-1 ${compact ? "text-[8px]" : "text-[10px]"} text-sky-200/70`}>
            <span>NFC</span>
            <span>·</span>
            <span>QR</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardBack({ size }: { size: "sm" | "md" | "lg" }) {
  const compact = size === "sm";

  return (
    <div className="absolute inset-0 rounded-2xl overflow-hidden backface-hidden bg-gradient-to-br from-[#0a0e24] via-[#0d1230] to-[#14102e] border border-sky-500/20 shadow-2xl shadow-black/60 [transform:rotateY(180deg)]">
      <div className={`relative h-full flex flex-col items-center justify-center ${compact ? "p-4 gap-2" : "p-6 gap-3"}`}>
        <div className={compact ? "w-24" : "w-32"}>
          <QrPattern />
        </div>
        <p className={`text-sky-200/75 text-center ${compact ? "text-[9px]" : "text-xs"}`}>
          Scan if NFC is unavailable
        </p>
        <div className={`flex items-center gap-2 ${compact ? "text-[8px]" : "text-[10px]"} text-sky-300/80`}>
          <Wifi className={`${compact ? "w-2.5 h-2.5" : "w-3 h-3"} rotate-90`} />
          <span>Pre-programmed to your review page</span>
        </div>
      </div>
    </div>
  );
}

export function NfcReviewCard({
  size = "lg",
  flippable = true,
  glowing = true,
  showControls = true,
  className = "",
}: NfcReviewCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [tapping, setTapping] = useState(false);

  const handleClick = () => {
    if (!flippable) return;
    setFlipped((f) => !f);
  };

  const handleTapDemo = () => {
    setTapping(true);
    window.setTimeout(() => setTapping(false), 2000);
  };

  return (
    <div className={`relative ${className}`}>
      {glowing && (
        <div className="absolute inset-0 rounded-3xl bg-sky-600/25 blur-3xl scale-110 pointer-events-none" />
      )}

      <div
        className={`relative ${SIZES[size]} cursor-pointer select-none`}
        style={{ perspective: "1200px" }}
        onClick={handleClick}
        onKeyDown={(e) => e.key === "Enter" && handleClick()}
        role={flippable ? "button" : undefined}
        tabIndex={flippable ? 0 : undefined}
        aria-label={flippable ? "Flip NFC review card" : "NFC review card"}
      >
        <div
          className="relative w-full h-full transition-transform duration-700 ease-in-out"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          <CardFront size={size} tapping={tapping} />
          <CardBack size={size} />
        </div>
      </div>

      {flippable && showControls && (
        <div className="mt-4 flex flex-col items-center gap-2">
          <SpringPressable
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleTapDemo();
            }}
            className="px-4 py-1.5 rounded-full border border-sky-500/40 bg-sky-950/60 text-sky-100 text-xs font-semibold hover:bg-sky-900/70 transition-colors"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Simulate NFC tap
          </SpringPressable>
          <p className="text-muted-foreground text-xs">Click card to flip · Tap button to animate</p>
        </div>
      )}
    </div>
  );
}
