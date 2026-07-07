import { ArrowRight, Check, Zap } from "lucide-react";
import { SpringAnchor } from "@/components/SpringButton";
import { NfcTapDemo } from "./NfcTapDemo";
import "./nfc-animations.css";

export function GoogleNfcSection() {
  return (
    <section className="py-28 px-6 bg-card border-y border-sky-900/20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-sky-700/8 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-600/8 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-secondary text-secondary-foreground text-xs font-medium mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
              <Zap className="w-3.5 h-3.5" /> New Product · $99 one-time
            </div>

            <p className="text-sky-400 text-sm font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
              Google NFC Review Card
            </p>

            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-6" style={{ fontFamily: "Manrope, sans-serif" }}>
              Turn Every Happy Customer Into a{" "}
              <span className="bg-gradient-to-r from-sky-400 via-sky-400 to-cyan-400 bg-clip-text text-transparent">
                5-Star Review
              </span>
            </h2>

            <p className="text-muted-foreground text-base leading-relaxed mb-8" style={{ fontFamily: "Inter, sans-serif" }}>
              One tap on our smart NFC card sends customers straight to your Google review page. No app, no friction — just more reviews on autopilot. Try the interactive demo.
            </p>

            <ul className="space-y-3 mb-10">
              {[
                "NFC tap + QR code fallback",
                "Pre-programmed to your Google Business",
                "Works with all modern smartphones",
                "Lifetime guarantee · Free shipping",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-foreground/80" style={{ fontFamily: "Inter, sans-serif" }}>
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <SpringAnchor
                href="/googlenfc#buy"
                className="gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-bold text-base hover:from-sky-500 hover:to-cyan-500 transition-all shadow-xl shadow-sky-900/50"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Get Your Card — $99 <ArrowRight className="w-4 h-4" />
              </SpringAnchor>
              <SpringAnchor
                href="/googlenfc"
                className="gap-2 px-8 py-4 rounded-full border border-sky-500/30 text-foreground font-semibold text-base hover:bg-sky-900/20 transition-all"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                View Full Product Page
              </SpringAnchor>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <NfcTapDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
