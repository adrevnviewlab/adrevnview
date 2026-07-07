import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { ArrowRight, Star, MapPin, Phone, Mail, Play, Check, ChevronDown, Dumbbell, Sparkles, Search, Globe } from "lucide-react";
import { GoogleNfcSection } from "@/app/components/nfc/GoogleNfcSection";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import { FxBackground } from "@/components/fx/FxBackground";
import { SpringAnchor, SpringLink, SpringPressable } from "@/components/SpringButton";
import { SpringCard, SpringCardLink } from "@/components/SpringCard";
import { SeoHead } from "@/components/seo/SeoHead";
import { DEFAULT_SEO, PAGES } from "@/lib/seo/siteConfig";
import { getServicePath } from "@/lib/content/services";
import { VISIBLE_HOME_FAQ } from "@/lib/seo/structuredData";
import { CLIENTS, getClientPath, getPortfolioByCategory, PORTFOLIO_TABS, type ClientCategory } from "@/lib/content/clients";

// ─── Data ───────────────────────────────────────────────────────────────────

const MARQUEE_CLIENTS = [...CLIENTS.map((c) => c.name), ...CLIENTS.map((c) => c.name)];

const HOME_SERVICE_LINKS: Record<string, string> = {
  "Custom Web Design": "custom-web-design",
  "Web Development & Integrations": "react-development",
  "eCommerce Design & Dev": "shopify-development",
  "Branding & Brand Identity": "brand-identity",
  "SEO & Digital Marketing": "seo-services",
  "Website Redesign": "website-redesign",
};

const SERVICES = [
  {
    icon: "✦",
    title: "Custom Web Design",
    desc: "Bespoke, conversion-focused designs built around your brand strategy and business goals.",
  },
  {
    icon: "⬡",
    title: "Web Development & Integrations",
    desc: "Full-stack development with seamless CRM, ERP, and third-party platform integrations.",
  },
  {
    icon: "◈",
    title: "eCommerce Design & Dev",
    desc: "High-performance online stores that convert browsers into buyers at scale.",
  },
  {
    icon: "◉",
    title: "Branding & Brand Identity",
    desc: "Logos, visual systems, and brand guidelines that make enterprises unforgettable.",
  },
  {
    icon: "⊕",
    title: "SEO & Digital Marketing",
    desc: "Data-driven campaigns that compound organic traffic and maximize ROI.",
  },
  {
    icon: "◫",
    title: "Website Redesign",
    desc: "Strategic redesigns that modernize your digital presence without losing SEO equity.",
  },
];

const PORTFOLIO = getPortfolioByCategory();

const PROCESS = [
  { n: "01", title: "Web Strategy", desc: "We align on goals, audience, and KPIs before any pixel is placed — strategy first, always." },
  { n: "02", title: "Planning & IA", desc: "Sitemaps, user flows, and content architecture that guide every design decision downstream." },
  { n: "03", title: "Messaging", desc: "Brand voice, value propositions, and copy hierarchy crafted to convert." },
  { n: "04", title: "Wireframes", desc: "Low-fidelity blueprints validated with stakeholders before visual design begins." },
  { n: "05", title: "Design & Dev", desc: "Pixel-perfect execution in both design and code — no handoff gaps." },
  { n: "06", title: "QA & Testing", desc: "Cross-browser, cross-device quality assurance with performance benchmarks." },
  { n: "07", title: "Launch & Growth", desc: "Post-launch monitoring, SEO optimization, and ongoing performance reporting." },
];

const STATS = [
  { value: "12+", label: "Years in Business" },
  { value: "10+", label: "Live Client Platforms" },
  { value: "5★", label: "Client & Google Rating" },
  { value: "#1", label: "Top Digital Agency — Clutch 2025" },
];

const TESTIMONIALS = [
  {
    quote: "Adrevnview built our entire video intelligence platform — interactive player, GEO engine, and SaaS billing. It's become our primary growth driver.",
    name: "Platform Team",
    title: "Tagizo · tagizo.com",
    url: "https://tagizo.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format",
  },
  {
    quote: "They designed the Ax Lab ecosystem — product pages, brand system, and multiple SaaS launches under one cohesive identity. Precision at every layer.",
    name: "Axstart Team",
    title: "Ax Lab · axstart.com",
    url: "https://axstart.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format",
  },
  {
    quote: "Our multi-agent AI workspace needed to feel premium and technical. Adrevnview nailed the command-surface UX and docs site that converts engineers.",
    name: "Product Lead",
    title: "Cizher · cizher.com",
    url: "https://cizher.com",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&auto=format",
  },
  {
    quote: "Scaling in Malaysia meant compliance complexity we couldn't handle alone. Payrowl's site now wins trust with every international lead we speak to.",
    name: "Operations Director",
    title: "Payrowl · payrowl.com",
    url: "https://payrowl.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format",
  },
  {
    quote: "Xeark needed a digital presence that matched our knowledge exploration engine — clean, scalable, and built for long-term growth.",
    name: "Founder",
    title: "Xeark · xeark.com",
    url: "https://www.xeark.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format",
  },
  {
    quote: "The mesh network command center Adrevnview built gives us a unified view of nodes, relays, and services — enterprise infrastructure UI done right.",
    name: "Network Team",
    title: "AXNET · axearth.com",
    url: "https://axearth.com",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&auto=format",
  },
  {
    quote: "Heritage craftsmanship deserves a beautiful storefront. Mishi.es captures our brand story and drives apparel and decor sales across Europe.",
    name: "Studio Team",
    title: "Mishi · mishi.es",
    url: "https://mishi.es",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&auto=format",
  },
  {
    quote: "Crocherish needed an online home as warm as our handmade pieces. The storefront showcases our crochet collections and drives steady orders.",
    name: "Studio Founder",
    title: "Crocherish · crocherish.com",
    url: "https://crocherish.com",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&auto=format",
  },
];

const AWARDS = [
  "IMA Award of Excellence",
  "Awwwards Site of the Day",
  "Horizon Interactive Gold",
  "Marcom Platinum Award",
  "W3 Award Gold",
  "Clutch Top Agency 2025",
];

const MEDIA = ["Tech Brief", "Digital Weekly", "Business Pulse", "Market Insider", "Innovation Today", "Agency Watch"];

const LOCATIONS = [
  {
    city: "Austin",
    tag: "HQ",
    address: "1200 Innovation Blvd, Suite 400, Austin, TX 78701",
    phone: "(512) 555-0147",
    img: "https://images.unsplash.com/photo-1531218150217-54595bc2c934?w=700&h=420&fit=crop&auto=format",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function GradientText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`bg-gradient-to-r from-sky-400 via-sky-400 to-cyan-400 bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
}

function MarqueeLogos() {
  return (
    <div className="relative overflow-hidden py-8 border-y border-sky-900/20">
      <div className="flex animate-marquee whitespace-nowrap">
        {MARQUEE_CLIENTS.map((c, i) => (
          <span
            key={i}
            className="mx-10 text-muted-foreground font-bold text-lg tracking-widest uppercase hover:text-foreground/80 transition-colors cursor-default"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            {c}
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      <FxBackground variant="hero" />
      {/* Background glow — skipped on reduced/basic via perf tier CSS */}
      <div className="absolute inset-0 pointer-events-none perf-heavy-blur">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-sky-700/10 blur-[120px]" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-600/8 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-sky-600/8 blur-[80px]" />
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(14,165,233,1) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        {/* Award badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary text-secondary-foreground text-xs font-medium mb-8" style={{ fontFamily: "Inter, sans-serif" }}>
          <Star className="w-3.5 h-3.5 fill-sky-400 text-sky-400" />
          Top Digital Agency 2025 — Clutch
          <Star className="w-3.5 h-3.5 fill-sky-400 text-sky-400" />
        </div>

        <h1 data-speakable="true" className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-foreground leading-[1.05] tracking-tight mb-6" style={{ fontFamily: "Manrope, sans-serif" }}>
          Premium{" "}
          <GradientText>Web Design</GradientText>
          <br />
          Agency
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
          For <span className="text-foreground font-medium">B2B, B2C & Enterprise Brands</span>
        </p>
        <p data-geo-chunk="summary" className="text-base text-muted-foreground max-w-xl mx-auto mb-12" style={{ fontFamily: "Inter, sans-serif" }}>
          We craft brand strategy, custom websites, and performance digital marketing that drive measurable growth.
        </p>

        {/* Gym owners promo */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-500/25 bg-card/60 text-foreground/90 text-sm font-semibold backdrop-blur-sm">
            <Dumbbell className="w-4 h-4 text-sky-300" />
            Gym owners: automate ops + lead gen with <span className="text-foreground">Matflow</span>
            <Sparkles className="w-4 h-4 text-cyan-300" />
          </div>
          <p className="text-muted-foreground text-sm mt-3 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            Member portal + backend processing + gym ops management, plus lead generation and SEO tools — built to help gyms grow and retain members.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
            <SpringAnchor
              href="https://mymatflow.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm hover:from-emerald-400 hover:to-teal-400 transition-all shadow-xl shadow-emerald-900/30 gap-2"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              See Matflow <ArrowRight className="w-4 h-4" />
            </SpringAnchor>
            <SpringAnchor
              href="#contact"
              className="px-7 py-3 rounded-full border border-sky-500/30 text-foreground font-semibold text-sm hover:bg-sky-900/20 transition-all gap-2"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Get a Demo
            </SpringAnchor>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-muted-foreground text-sm ml-1" style={{ fontFamily: "Inter, sans-serif" }}>5 Star Client & Google Reviews</span>
          </div>
          <div className="w-px h-5 bg-sky-900/50 hidden sm:block" />
          <div className="text-muted-foreground text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
            <span className="text-foreground font-medium">10+</span> Live Client Platforms
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <SpringLink to="/contact" className="px-8 py-4 rounded-full bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-bold text-base hover:from-sky-500 hover:to-cyan-500 transition-all shadow-xl shadow-sky-900/50 gap-2" style={{ fontFamily: "Manrope, sans-serif" }}>
            Request a Quote <ArrowRight className="w-4 h-4" />
          </SpringLink>
          <SpringLink to="/work" className="px-8 py-4 rounded-full border border-sky-500/30 text-foreground font-semibold text-base hover:bg-sky-900/20 transition-all gap-2" style={{ fontFamily: "Manrope, sans-serif" }}>
            <Play className="w-4 h-4 fill-current" /> See Our Work
          </SpringLink>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <section className="bg-card border-y border-sky-900/20 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-4xl font-extrabold text-foreground mb-1" style={{ fontFamily: "Manrope, sans-serif" }}>
              <GradientText>{s.value}</GradientText>
            </div>
            <div className="text-sm text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function GeoReportPromo() {
  return (
    <section className="px-6 py-6">
      <div className="max-w-7xl mx-auto">
        <SpringCardLink
          to="/geo-report"
          className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border bg-card px-6 py-5 hover:border-sky-500/40 hover:bg-secondary/60 transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-1" style={{ fontFamily: "Inter, sans-serif" }}>
                Free Tool
              </p>
              <h2 className="text-lg font-bold text-foreground mb-1" style={{ fontFamily: "Manrope, sans-serif" }}>
                SEO & GEO Report Generator
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xl" style={{ fontFamily: "Inter, sans-serif" }}>
                Analyze any URL with 45+ checks — Google, ChatGPT, Perplexity, Claude & Gemini readiness. Semrush-grade audit, instant results.
              </p>
            </div>
          </div>
          <span
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-sky-600 to-cyan-600 text-white text-sm font-semibold shrink-0 group-hover:from-sky-500 group-hover:to-cyan-500 transition-all"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            <Search className="w-4 h-4" />
            Run Free Scan
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </SpringCardLink>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 max-w-2xl">
          <p className="text-sky-400 text-sm font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: "Inter, sans-serif" }}>What We Do</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight" style={{ fontFamily: "Manrope, sans-serif" }}>
            Full-Service Digital<br /><GradientText>Agency Solutions</GradientText>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((svc) => (
            <SpringCardLink
              key={svc.title}
              to={getServicePath(HOME_SERVICE_LINKS[svc.title] ?? "custom-web-design")}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-sky-500/40 transition-all duration-300 hover:bg-secondary/40 block"
            >
              <div className="text-3xl text-sky-400 mb-5 group-hover:text-sky-300 transition-colors">{svc.icon}</div>
              <h3 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: "Manrope, sans-serif" }}>{svc.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6" style={{ fontFamily: "Inter, sans-serif" }}>{svc.desc}</p>
              <span className="flex items-center gap-2 text-sky-400 text-sm font-semibold group-hover:gap-3 transition-all" style={{ fontFamily: "Manrope, sans-serif" }}>
                Learn More <ArrowRight className="w-4 h-4" />
              </span>
            </SpringCardLink>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioSection() {
  const [activeTab, setActiveTab] = useState<ClientCategory>("Featured");

  return (
    <section className="py-28 px-6 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-sky-400 text-sm font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: "Inter, sans-serif" }}>Our Work</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground" style={{ fontFamily: "Manrope, sans-serif" }}>
              <GradientText>Award-Winning</GradientText><br />Case Studies
            </h2>
          </div>
          <div className="flex gap-1 p-1 rounded-full border border-sky-900/30 bg-background">
            {PORTFOLIO_TABS.map((tab) => (
              <SpringPressable
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-sky-600 to-cyan-600 text-white shadow-lg shadow-sky-900/40"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                {tab}
              </SpringPressable>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PORTFOLIO[activeTab].map((item) => (
            <SpringCard
              key={item.slug}
              className="group rounded-2xl overflow-hidden border border-border hover:border-sky-500/40 transition-all bg-card"
            >
              <div className="relative overflow-hidden h-64">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-sky-600/80 backdrop-blur-sm text-white text-xs font-semibold" style={{ fontFamily: "Manrope, sans-serif" }}>{item.tag}</span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-emerald-600/80 backdrop-blur-sm text-white text-xs font-semibold" style={{ fontFamily: "Manrope, sans-serif" }}>{item.metric}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "Manrope, sans-serif" }}>{item.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5" style={{ fontFamily: "Inter, sans-serif" }}>{item.shortDescription}</p>
                <div className="flex gap-3">
                  <Link
                    to={getClientPath(item.slug)}
                    className="px-5 py-2 rounded-full bg-gradient-to-r from-sky-600 to-cyan-600 text-white text-sm font-semibold hover:from-sky-500 hover:to-cyan-500 transition-all"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    View Case Study
                  </Link>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 rounded-full border border-sky-500/30 text-foreground/80 text-sm font-semibold hover:bg-sky-900/20 transition-all"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    Launch Website
                  </a>
                </div>
              </div>
            </SpringCard>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-sky-500/30 text-foreground font-semibold hover:bg-secondary transition-all"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            View All Case Studies <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section className="py-28 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <p className="text-sky-400 text-sm font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: "Inter, sans-serif" }}>How We Work</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-6" style={{ fontFamily: "Manrope, sans-serif" }}>
            Our 7-Step <GradientText>Design Process</GradientText>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            Every project follows a rigorous, battle-tested process that eliminates guesswork and guarantees results from strategy through launch and beyond.
          </p>
        </div>

        <div className="space-y-3">
          {PROCESS.map((step, i) => (
            <SpringCard
              key={step.n}
              className={`rounded-xl border transition-all duration-300 cursor-pointer ${
                expanded === i
                  ? "border-sky-600/50 bg-secondary"
                  : "border-sky-900/20 bg-card hover:border-sky-800/30"
              }`}
              onClick={() => setExpanded(expanded === i ? null : i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setExpanded(expanded === i ? null : i);
                }
              }}
            >
              <div className="flex items-center gap-4 px-6 py-4">
                <span className="text-sky-500 font-bold text-sm w-8 shrink-0" style={{ fontFamily: "Manrope, sans-serif" }}>{step.n}</span>
                <span className="text-foreground font-semibold flex-1" style={{ fontFamily: "Manrope, sans-serif" }}>{step.title}</span>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expanded === i ? "rotate-180" : ""}`} />
              </div>
              {expanded === i && (
                <div className="px-6 pb-5 pl-[4.5rem]">
                  <p className="text-muted-foreground text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{step.desc}</p>
                </div>
              )}
            </SpringCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const t = TESTIMONIALS[active];

  return (
    <section className="py-28 px-6 bg-card">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sky-400 text-sm font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: "Inter, sans-serif" }}>Client Stories</p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-16" style={{ fontFamily: "Manrope, sans-serif" }}>
          What Our <GradientText>Clients Say</GradientText>
        </h2>

        <div className="relative">
          <div className="text-[8rem] leading-none text-sky-900/30 font-serif absolute -top-4 left-0 select-none">"</div>
          <blockquote className="text-xl md:text-2xl text-foreground/90 leading-relaxed font-light mb-10 relative z-10" style={{ fontFamily: "Inter, sans-serif" }}>
            "{t.quote}"
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-sky-600/50" />
            <div className="text-left">
              <div className="text-foreground font-semibold" style={{ fontFamily: "Manrope, sans-serif" }}>{t.name}</div>
              {t.url ? (
                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 text-sm hover:text-sky-300 transition-colors"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {t.title}
                </a>
              ) : (
                <div className="text-muted-foreground text-sm" style={{ fontFamily: "Inter, sans-serif" }}>{t.title}</div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-10">
          {TESTIMONIALS.map((_, i) => (
            <SpringPressable
              key={i}
              onClick={() => setActive(i)}
              className={`transition-all rounded-full ${i === active ? "w-8 h-2 bg-sky-500" : "w-2 h-2 bg-sky-900/60 hover:bg-sky-700/60"}`}
              aria-label={`Show testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AwardsSection() {
  const [tab, setTab] = useState<"Awards" | "Media" | "Expertise">("Awards");

  return (
    <section className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sky-400 text-sm font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: "Inter, sans-serif" }}>Recognition</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground" style={{ fontFamily: "Manrope, sans-serif" }}>
            Industry <GradientText>Awards & Recognition</GradientText>
          </h2>
        </div>

        <div className="flex justify-center gap-1 p-1 rounded-full border border-sky-900/30 bg-card w-fit mx-auto mb-12">
          {(["Awards", "Media", "Expertise"] as const).map((t) => (
            <SpringPressable
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                tab === t ? "bg-gradient-to-r from-sky-600 to-cyan-600 text-white" : "text-muted-foreground hover:text-foreground"
              }`}
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              {t}
            </SpringPressable>
          ))}
        </div>

        {tab === "Awards" && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {AWARDS.map((award) => (
              <SpringCard key={award} className="flex items-center gap-3 p-5 rounded-xl bg-card border border-sky-900/20 hover:border-sky-600/30 transition-all">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-600 to-cyan-600 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-foreground" />
                </div>
                <span className="text-foreground/90 text-sm font-medium" style={{ fontFamily: "Inter, sans-serif" }}>{award}</span>
              </SpringCard>
            ))}
          </div>
        )}

        {tab === "Media" && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {MEDIA.map((m) => (
              <SpringCard key={m} className="flex items-center justify-center p-8 rounded-xl bg-card border border-sky-900/20 hover:border-sky-600/30 transition-all">
                <span className="text-foreground/90 font-bold text-lg" style={{ fontFamily: "Manrope, sans-serif" }}>{m}</span>
              </SpringCard>
            ))}
          </div>
        )}

        {tab === "Expertise" && (
          <div className="flex flex-wrap justify-center gap-3">
            {["Custom Web Design", "UX/UI Design", "Web Development", "React Development", "eCommerce", "Shopify", "WordPress", "Webflow", "SEO", "PPC", "Social Media Marketing", "Brand Identity", "Logo Design", "Content Strategy", "Email Marketing", "Conversion Optimization", "Analytics & Reporting", "ADA Compliance", "Web Accessibility", "CRO"].map((tag) => (
              <span key={tag} className="px-4 py-2 rounded-full border border-border bg-secondary text-secondary-foreground text-sm font-medium" style={{ fontFamily: "Inter, sans-serif" }}>{tag}</span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function LocationsSection() {
  const [activeCity, setActiveCity] = useState(0);
  const loc = LOCATIONS[activeCity];

  return (
    <section className="py-28 px-6 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sky-400 text-sm font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: "Inter, sans-serif" }}>Where We Are</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground" style={{ fontFamily: "Manrope, sans-serif" }}>
            Our <GradientText>Office Locations</GradientText>
          </h2>
        </div>

        <div className="flex justify-center gap-1 p-1 rounded-full border border-sky-900/30 bg-background w-fit mx-auto mb-10">
          {LOCATIONS.map((l, i) => (
            <SpringPressable
              key={l.city}
              onClick={() => setActiveCity(i)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCity === i ? "bg-gradient-to-r from-sky-600 to-cyan-600 text-white" : "text-muted-foreground hover:text-foreground"
              }`}
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              {l.city}
              {l.tag && <span className="ml-1 text-xs text-sky-300">{l.tag}</span>}
            </SpringPressable>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="rounded-2xl overflow-hidden h-72 bg-sky-900/20">
            <img src={loc.img} alt={loc.city} className="w-full h-full object-cover" />
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-foreground" style={{ fontFamily: "Manrope, sans-serif" }}>{loc.city} Office</h3>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-sky-400 mt-0.5 shrink-0" />
              <span className="text-foreground/80 text-base" style={{ fontFamily: "Inter, sans-serif" }}>{loc.address}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-sky-400 shrink-0" />
              <a href={`tel:${loc.phone}`} className="text-foreground/80 text-base hover:text-foreground transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>{loc.phone}</a>
            </div>
            <SpringPressable className="mt-4 px-7 py-3 rounded-full bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-semibold hover:from-sky-500 hover:to-cyan-500 transition-all" style={{ fontFamily: "Manrope, sans-serif" }}>
              Get Directions
            </SpringPressable>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeFaqSection() {
  return (
    <section className="py-28 px-6 bg-card border-y border-sky-900/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sky-400 text-sm font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
            FAQ
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground" style={{ fontFamily: "Manrope, sans-serif" }}>
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground text-sm mt-4" style={{ fontFamily: "Inter, sans-serif" }}>
            Clear, direct answers so Google and humans can understand what we do.
          </p>
        </div>

        <div className="space-y-3">
          {VISIBLE_HOME_FAQ.map((item) => (
            <details
              key={item.question}
              className="group rounded-xl border border-sky-900/20 bg-background hover:border-sky-600/30 transition-all"
            >
              <summary
                className="cursor-pointer list-none px-6 py-4 flex items-center justify-between gap-4"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                <h2 className="text-foreground font-semibold text-base m-0">{item.question}</h2>
                <span className="text-sky-400 group-open:rotate-180 transition-transform">⌄</span>
              </summary>
              <div className="px-6 pb-5 -mt-1">
                <p className="text-muted-foreground text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                  {item.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", message: "" });

  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <p className="text-sky-400 text-sm font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: "Inter, sans-serif" }}>Get Started</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-6" style={{ fontFamily: "Manrope, sans-serif" }}>
            Ready to Grow <br /><GradientText>Your Business?</GradientText>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-8" style={{ fontFamily: "Inter, sans-serif" }}>
            Tell us about your project. Our team will review your inquiry and schedule a discovery call within one business day.
          </p>
          <div className="space-y-4">
            {[
              { icon: Phone, text: "(512) 555-0147" },
              { icon: Mail, text: "hello@adrevnview.com" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sky-900/40 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-sky-400" />
                </div>
                <span className="text-foreground/80" style={{ fontFamily: "Inter, sans-serif" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-sky-900/20 rounded-2xl p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {(["name", "company"] as const).map((field) => (
              <div key={field}>
                <label className="block text-sm text-muted-foreground mb-2 capitalize" style={{ fontFamily: "Inter, sans-serif" }}>{field}</label>
                <input
                  type="text"
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  placeholder={field === "name" ? "Alex Chen" : "Northgate Labs"}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-sky-900/30 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-sky-500/60 transition-colors"
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {(["email", "phone"] as const).map((field) => (
              <div key={field}>
                <label className="block text-sm text-muted-foreground mb-2 capitalize" style={{ fontFamily: "Inter, sans-serif" }}>{field}</label>
                <input
                  type={field === "email" ? "email" : "tel"}
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  placeholder={field === "email" ? "alex@northgatelabs.com" : "(555) 000-0000"}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-sky-900/30 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-sky-500/60 transition-colors"
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
              </div>
            ))}
          </div>
          <div className="mb-6">
            <label className="block text-sm text-muted-foreground mb-2" style={{ fontFamily: "Inter, sans-serif" }}>Project Details</label>
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell us about your project goals, timeline, and budget..."
              className="w-full px-4 py-3 rounded-xl bg-background border border-sky-900/30 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-sky-500/60 transition-colors resize-none"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
          </div>
          <SpringPressable className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-bold text-base hover:from-sky-500 hover:to-cyan-500 transition-all shadow-xl shadow-sky-900/40" style={{ fontFamily: "Manrope, sans-serif" }}>
            Request a Quote — Free Consultation
          </SpringPressable>
        </div>
      </div>
    </section>
  );
}

// ─── Marquee animation ───────────────────────────────────────────────────────

const marqueeStyle = `
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.animate-marquee {
  animation: marquee 30s linear infinite;
}
`;

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      <SeoHead
        title={PAGES.home.title}
        description={PAGES.home.description}
        path={PAGES.home.path}
        keywords={DEFAULT_SEO.keywords}
      />
      <style>{marqueeStyle}</style>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative" style={{ fontFamily: "Inter, sans-serif" }}>
        <SiteHeader />
        <Hero />
        <MarqueeLogos />
        <StatsBar />
        <GeoReportPromo />
        <ServicesSection />
        <GoogleNfcSection />
        <PortfolioSection />
        <ProcessSection />
        <TestimonialsSection />
        <AwardsSection />
        <LocationsSection />
        <HomeFaqSection />
        <ContactSection />
        <SiteFooter />
      </div>
    </>
  );
}
