import { useState } from "react";
import { Star, Zap, Shield, RefreshCw, Smartphone, Check, ArrowRight, ChevronDown } from "lucide-react";
import { NfcReviewCard } from "@/app/components/nfc/NfcReviewCard";
import { NfcTapDemo } from "@/app/components/nfc/NfcTapDemo";
import { SeoHead } from "@/components/seo/SeoHead";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SpringCard } from "@/components/SpringCard";
import { SpringPressable } from "@/components/SpringButton";
import { PAGES } from "@/lib/seo/siteConfig";
import "@/app/components/nfc/nfc-animations.css";

const FEATURES = [
  {
    icon: Smartphone,
    title: "Tap to Review",
    desc: "Customers simply tap their phone to your card and are instantly taken to your Google review page — no app needed.",
  },
  {
    icon: Zap,
    title: "Instant Setup",
    desc: "Pre-programmed and ready to use right out of the box. Place it on your counter and start collecting reviews today.",
  },
  {
    icon: RefreshCw,
    title: "Works with Any Smartphone",
    desc: "Compatible with all modern iOS and Android devices. NFC is standard on every phone made after 2018.",
  },
  {
    icon: Shield,
    title: "Lifetime Guarantee",
    desc: "Built to last. Your card is waterproof, scratch-resistant, and backed by our no-questions-asked replacement policy.",
  },
];

const FAQS = [
  {
    q: "Do I need an app or account to use this?",
    a: "No. The card is pre-programmed to your Google Business profile. Your customers just tap — no app, no login, no friction.",
  },
  {
    q: "What phones are compatible?",
    a: "All iPhones from XS and later, and virtually every Android phone from 2018 onwards. The QR code on the back is a universal fallback for older devices.",
  },
  {
    q: "How long does shipping take?",
    a: "Standard shipping is 3–5 business days. Express 1–2 day options are available at checkout.",
  },
  {
    q: "Can I change the Google Business it links to?",
    a: "Yes — reach out to us after purchase with your Google Business URL and we will program it before shipping.",
  },
  {
    q: "What if my card stops working?",
    a: "We offer a lifetime guarantee. If your card ever fails, we will replace it free of charge.",
  },
];

const REVIEWS = [
  {
    name: "James R.",
    biz: "Lakeside Barbers, Hicksville",
    stars: 5,
    text: "Got 40 new Google reviews in the first month. Customers love how easy it is — they just tap and go. Best $99 I've ever spent on marketing.",
  },
  {
    name: "Maria T.",
    biz: "Bloom Nail Studio, Dallas",
    stars: 5,
    text: "I was skeptical at first but this thing works like magic. My Google rating went from 4.1 to 4.8 in two months. Incredible.",
  },
  {
    name: "David K.",
    biz: "Morning Brew Café, Garden City",
    stars: 5,
    text: "Dead simple setup, zero maintenance, and the reviews just keep coming in. Every small business owner needs one of these.",
  },
];

function StarRow({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-sky-900/20 rounded-xl overflow-hidden cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between px-6 py-4 bg-card hover:bg-secondary transition-colors">
        <span className="text-foreground font-semibold text-sm pr-4" style={{ fontFamily: "Manrope, sans-serif" }}>{q}</span>
        <ChevronDown className={`w-4 h-4 text-sky-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </div>
      {open && (
        <div className="px-6 py-4 bg-muted border-t border-sky-900/20">
          <p className="text-muted-foreground text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{a}</p>
        </div>
      )}
    </div>
  );
}

export default function GoogleNFC() {
  const [qty, setQty] = useState(1);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden" style={{ fontFamily: "Inter, sans-serif" }}>
      <SeoHead
        title={PAGES.googleNfc.title}
        description={PAGES.googleNfc.description}
        path={PAGES.googleNfc.path}
        keywords="Google NFC review card, NFC review card, get more Google reviews, local business reviews, QR review card"
      />

      {/* ── Nav ── */}
      <nav className="border-b border-sky-900/20 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto gap-3">
        <Logo iconClassName="h-7 w-6" textClassName="h-5 w-auto" />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <SpringPressable
          onClick={() => document.getElementById("buy")?.scrollIntoView({ behavior: "smooth" })}
          className="px-5 py-2 rounded-full bg-gradient-to-r from-sky-600 to-cyan-600 text-white text-sm font-semibold hover:from-sky-500 hover:to-cyan-500 transition-all"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          Buy Now — $99
        </SpringPressable>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-secondary text-secondary-foreground text-xs font-medium mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
            <Zap className="w-3.5 h-3.5" /> NFC + QR · Works instantly · No app needed
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight mb-6" style={{ fontFamily: "Manrope, sans-serif" }}>
            Get More{" "}
            <span className="bg-gradient-to-r from-sky-400 via-sky-400 to-cyan-400 bg-clip-text text-transparent">
              Google Reviews
            </span>{" "}
            on Autopilot
          </h1>

          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            One tap. Your customer lands directly on your Google review page. Our smart NFC card sits on your counter and turns every happy visitor into a 5-star review — effortlessly.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            {["Works with all smartphones", "Pre-programmed for you", "QR code fallback included", "Lifetime guarantee"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-foreground/80">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                {item}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <StarRow />
            <span className="text-muted-foreground text-sm">4.9 · 200+ happy businesses</span>
          </div>
        </div>

        <NfcTapDemo />
      </section>

      {/* ── Social proof bar ── */}
      <div className="bg-card border-y border-sky-900/20 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-10 text-center">
          {[
            { val: "200+", label: "Businesses Using It" },
            { val: "4.9★", label: "Average Rating" },
            { val: "10k+", label: "Reviews Generated" },
            { val: "$99", label: "One-Time Price" },
          ].map(({ val, label }) => (
            <div key={label}>
              <div className="text-3xl font-extrabold bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent" style={{ fontFamily: "Manrope, sans-serif" }}>{val}</div>
              <div className="text-muted-foreground text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Interactive card showcase ── */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-sky-400 text-sm font-semibold tracking-widest uppercase mb-3">The Product</p>
          <h2 className="text-4xl font-extrabold text-foreground mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>
            A card built for{" "}
            <span className="bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">real counters</span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            Premium NFC chip on the front, scannable QR on the back. Waterproof, scratch-resistant, and programmed to your Google review page before it ships.
          </p>
          <ul className="space-y-3">
            {[
              "NFC tap opens your review page instantly",
              "QR code on the back for older phones",
              "Embossed chip + matte finish",
              "Fits standard card stands and holders",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-foreground/80">
                <div className="w-5 h-5 rounded-full bg-sky-900/50 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-sky-400" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center">
          <NfcReviewCard size="lg" flippable glowing />
        </div>
      </section>

      {/* ── Features ── */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <p className="text-sky-400 text-sm font-semibold tracking-widest uppercase mb-3">Why It Works</p>
          <h2 className="text-4xl font-extrabold text-foreground" style={{ fontFamily: "Manrope, sans-serif" }}>
            The Simplest Way to Boost <br />
            <span className="bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">Your Online Reputation</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <SpringCard key={title} className="p-7 rounded-2xl bg-card border border-sky-900/20 hover:border-sky-600/40 transition-all">
              <div className="w-11 h-11 rounded-xl bg-sky-900/40 flex items-center justify-center mb-5">
                <Icon className="w-5 h-5 text-sky-400" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2" style={{ fontFamily: "Manrope, sans-serif" }}>{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </SpringCard>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-card border-y border-sky-900/20 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <p className="text-sky-400 text-sm font-semibold tracking-widest uppercase mb-3">Setup in 3 Steps</p>
          <h2 className="text-4xl font-extrabold text-foreground" style={{ fontFamily: "Manrope, sans-serif" }}>Up and Running in Minutes</h2>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { n: "01", title: "Order Your Card", desc: "Complete your purchase and provide your Google Business profile URL during checkout." },
            { n: "02", title: "We Program It", desc: "We link the NFC chip and QR code directly to your Google review page, then ship it to you." },
            { n: "03", title: "Place & Collect", desc: "Put the card on your counter, desk, or table. Customers tap or scan and leave reviews instantly." },
          ].map(({ n, title, desc }) => (
            <div key={n} className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-600 to-cyan-600 flex items-center justify-center mx-auto mb-5">
                <span className="text-foreground font-bold text-lg" style={{ fontFamily: "Manrope, sans-serif" }}>{n}</span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2" style={{ fontFamily: "Manrope, sans-serif" }}>{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <p className="text-sky-400 text-sm font-semibold tracking-widest uppercase mb-3">Testimonials</p>
          <h2 className="text-4xl font-extrabold text-foreground" style={{ fontFamily: "Manrope, sans-serif" }}>Real Results from Real Businesses</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map(({ name, biz, stars, text }) => (
            <div key={name} className="p-7 rounded-2xl bg-card border border-sky-900/20">
              <StarRow count={stars} />
              <p className="text-foreground/80 text-sm leading-relaxed mt-4 mb-5">"{text}"</p>
              <div>
                <div className="text-foreground font-semibold text-sm" style={{ fontFamily: "Manrope, sans-serif" }}>{name}</div>
                <div className="text-muted-foreground text-xs mt-0.5">{biz}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Buy Now ── */}
      <section id="buy" className="bg-card border-y border-sky-900/20 py-24 px-6">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-sky-400 text-sm font-semibold tracking-widest uppercase mb-3">Get Yours Today</p>
          <h2 className="text-4xl font-extrabold text-foreground mb-3" style={{ fontFamily: "Manrope, sans-serif" }}>
            One Card. One Payment.
            <br />
            <span className="bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">Reviews Forever.</span>
          </h2>
          <p className="text-muted-foreground text-sm mb-10">No subscriptions. No monthly fees. Just one smart card working for you every day.</p>

          <div className="rounded-2xl border border-sky-600/40 bg-background p-8 mb-6">
            <div className="flex justify-center mb-4">
              <NfcReviewCard size="sm" flippable glowing={false} showControls={false} />
            </div>
            <p className="text-muted-foreground text-xs mb-6">Tap card above to preview front & back</p>

            <div className="text-5xl font-extrabold text-foreground mb-1" style={{ fontFamily: "Manrope, sans-serif" }}>$99</div>
            <div className="text-muted-foreground text-sm mb-8">One-time payment · Free shipping</div>

            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-muted-foreground text-sm">Quantity</span>
              <div className="flex items-center gap-3 border border-sky-900/30 rounded-full px-2 py-1">
                <SpringPressable
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-sky-400 hover:bg-sky-900/40 transition-colors font-bold text-lg"
                >−</SpringPressable>
                <span className="text-foreground font-semibold w-6 text-center" style={{ fontFamily: "Manrope, sans-serif" }}>{qty}</span>
                <SpringPressable
                  onClick={() => setQty(qty + 1)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-sky-400 hover:bg-sky-900/40 transition-colors font-bold text-lg"
                >+</SpringPressable>
              </div>
              <span className="text-muted-foreground text-sm font-semibold">${(99 * qty).toLocaleString()} total</span>
            </div>

            <SpringPressable
              className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-bold text-lg hover:from-sky-500 hover:to-cyan-500 transition-all shadow-xl shadow-sky-900/50 gap-2"
              style={{ fontFamily: "Manrope, sans-serif" }}
              onClick={() => alert("Payment coming soon — check back shortly!")}
            >
              Buy Now — ${(99 * qty).toLocaleString()} <ArrowRight className="w-5 h-5" />
            </SpringPressable>

            <p className="text-muted-foreground text-xs mt-4">Secure checkout · SSL encrypted · Lifetime guarantee</p>
          </div>

          <div className="flex flex-wrap justify-center gap-5 text-muted-foreground text-xs">
            {["✓ Pre-programmed & ready to use", "✓ QR code fallback included", "✓ Free shipping", "✓ Lifetime guarantee"].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-2xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <p className="text-sky-400 text-sm font-semibold tracking-widest uppercase mb-3">FAQ</p>
          <h2 className="text-4xl font-extrabold text-foreground" style={{ fontFamily: "Manrope, sans-serif" }}>Common Questions</h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq) => (
            <FAQItem key={faq.q} {...faq} />
          ))}
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <div className="bg-gradient-to-r from-sky-900/40 to-cyan-900/40 border-t border-sky-700/30 py-16 px-6 text-center">
        <h2 className="text-3xl font-extrabold text-foreground mb-3" style={{ fontFamily: "Manrope, sans-serif" }}>
          Start collecting reviews today
        </h2>
        <p className="text-muted-foreground text-sm mb-8">Join 200+ businesses growing their Google reputation with one smart card.</p>
        <SpringPressable
          onClick={() => document.getElementById("buy")?.scrollIntoView({ behavior: "smooth" })}
          className="px-10 py-4 rounded-full bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-bold text-base hover:from-sky-500 hover:to-cyan-500 transition-all shadow-xl shadow-sky-900/50"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          Get Your NFC Card — $99
        </SpringPressable>
      </div>

      <footer className="bg-muted border-t border-sky-900/20 py-6 px-6 text-center">
        <p className="text-muted-foreground text-xs">© {new Date().getFullYear()} Adrevnview. All rights reserved.</p>
      </footer>
    </div>
  );
}
