import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { Menu, X, ChevronDown, ArrowRight, Star, MapPin, Phone, Mail, Play, Check, Dumbbell, Sparkles, Search, Globe } from "lucide-react";
import { GoogleNfcSection } from "@/app/components/nfc/GoogleNfcSection";
import { SeoHead } from "@/components/seo/SeoHead";
import { DEFAULT_SEO, PAGES } from "@/lib/seo/siteConfig";
import { Logo } from "@/components/Logo";
import { VISIBLE_HOME_FAQ } from "@/lib/seo/structuredData";
import { CLIENTS, getClientPath, getPortfolioByCategory, PORTFOLIO_TABS, type ClientCategory } from "@/lib/content/clients";

// ─── Data ───────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Services", sub: ["Custom Web Design", "Web Development", "eCommerce Design", "Branding & Identity", "SEO & Marketing", "Website Redesign"] },
  {
    label: "Work",
    sub: [
      { label: "Case Studies", href: "/work" },
      { label: "B2B Projects", href: "/work#b2b" },
      { label: "B2C Projects", href: "/work#b2c" },
      { label: "eCommerce Projects", href: "/work#ecommerce" },
    ],
  },
  { label: "Industries", sub: ["Healthcare", "eCommerce/Retail", "Manufacturing", "Real Estate", "Legal", "Financial Services", "Technology/SaaS"] },
  { label: "About", href: "/about" },
  { label: "Blog", sub: [] },
  { label: "Contact", sub: [] },
];

const MARQUEE_CLIENTS = [...CLIENTS.map((c) => c.name), ...CLIENTS.map((c) => c.name)];

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
    <span className={`bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#06091a]/95 backdrop-blur-md border-b border-violet-900/30 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Logo />

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.sub?.length ? setActiveDropdown(link.label) : undefined}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {"href" in link && link.href ? (
                <Link
                  to={link.href}
                  className="flex items-center gap-1 px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors rounded-md hover:bg-white/5"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  className="flex items-center gap-1 px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors rounded-md hover:bg-white/5"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {link.label}
                  {link.sub && link.sub.length > 0 && <ChevronDown className="w-3.5 h-3.5 opacity-60" />}
                </button>
              )}
              {link.sub && link.sub.length > 0 && activeDropdown === link.label && (
                <div className="absolute top-full left-0 mt-1 w-52 bg-[#0d1128] border border-violet-900/30 rounded-xl shadow-2xl shadow-black/60 overflow-hidden">
                  {link.sub.map((s) =>
                    typeof s === "string" ? (
                      <button
                        key={s}
                        className="block w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-violet-900/30 transition-colors"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {s}
                      </button>
                    ) : (
                      <Link
                        key={s.label}
                        to={s.href}
                        className="block w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-violet-900/30 transition-colors"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {s.label}
                      </Link>
                    ),
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:5125550147" className="text-sm text-slate-400 hover:text-white transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>
            (512) 555-0147
          </a>
          <button className="px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold hover:from-violet-500 hover:to-indigo-500 transition-all shadow-lg shadow-violet-900/40" style={{ fontFamily: "Manrope, sans-serif" }}>
            Request a Quote
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[#0d1128] border-t border-violet-900/20 px-6 py-6 space-y-4">
          {NAV_LINKS.map((link) => (
            <button key={link.label} className="block text-slate-300 hover:text-white text-base py-1 w-full text-left" style={{ fontFamily: "Inter, sans-serif" }}>
              {link.label}
            </button>
          ))}
          <button className="mt-4 w-full px-5 py-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold" style={{ fontFamily: "Manrope, sans-serif" }}>
            Request a Quote
          </button>
        </div>
      )}
    </nav>
  );
}

function MarqueeLogos() {
  return (
    <div className="relative overflow-hidden py-8 border-y border-violet-900/20">
      <div className="flex animate-marquee whitespace-nowrap">
        {MARQUEE_CLIENTS.map((c, i) => (
          <span
            key={i}
            className="mx-10 text-slate-500 font-bold text-lg tracking-widest uppercase hover:text-slate-300 transition-colors cursor-default"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            {c}
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#06091a] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#06091a] to-transparent" />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-violet-700/10 blur-[120px]" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-indigo-600/8 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-purple-600/8 blur-[80px]" />
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(124,92,252,1) 1px, transparent 1px), linear-gradient(90deg, rgba(124,92,252,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        {/* Award badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-900/20 text-violet-300 text-xs font-medium mb-8" style={{ fontFamily: "Inter, sans-serif" }}>
          <Star className="w-3.5 h-3.5 fill-violet-400 text-violet-400" />
          Top Digital Agency 2025 — Clutch
          <Star className="w-3.5 h-3.5 fill-violet-400 text-violet-400" />
        </div>

        <h1 data-speakable="true" className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.05] tracking-tight mb-6" style={{ fontFamily: "Manrope, sans-serif" }}>
          Premium{" "}
          <GradientText>Web Design</GradientText>
          <br />
          Agency
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-4 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
          For <span className="text-white font-medium">B2B, B2C & Enterprise Brands</span>
        </p>
        <p className="text-base text-slate-500 max-w-xl mx-auto mb-12" style={{ fontFamily: "Inter, sans-serif" }}>
          We craft brand strategy, custom websites, and performance digital marketing that drive measurable growth.
        </p>

        {/* Gym owners promo */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/25 bg-[#0d1128]/60 text-slate-200 text-sm font-semibold backdrop-blur-sm">
            <Dumbbell className="w-4 h-4 text-violet-300" />
            Gym owners: automate ops + lead gen with <span className="text-white">Matflow</span>
            <Sparkles className="w-4 h-4 text-indigo-300" />
          </div>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            Member portal + backend processing + gym ops management, plus lead generation and SEO tools — built to help gyms grow and retain members.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://mymatflow.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm hover:from-emerald-400 hover:to-teal-400 transition-all shadow-xl shadow-emerald-900/30 inline-flex items-center gap-2"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              See Matflow <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="px-7 py-3 rounded-full border border-violet-500/30 text-white font-semibold text-sm hover:bg-violet-900/20 transition-all inline-flex items-center gap-2"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Get a Demo
            </a>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-slate-400 text-sm ml-1" style={{ fontFamily: "Inter, sans-serif" }}>5 Star Client & Google Reviews</span>
          </div>
          <div className="w-px h-5 bg-violet-900/50 hidden sm:block" />
          <div className="text-slate-400 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
            <span className="text-white font-medium">10+</span> Live Client Platforms
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-base hover:from-violet-500 hover:to-indigo-500 transition-all shadow-xl shadow-violet-900/50 flex items-center gap-2" style={{ fontFamily: "Manrope, sans-serif" }}>
            Request a Quote <ArrowRight className="w-4 h-4" />
          </button>
          <button className="px-8 py-4 rounded-full border border-violet-500/30 text-white font-semibold text-base hover:bg-violet-900/20 transition-all flex items-center gap-2" style={{ fontFamily: "Manrope, sans-serif" }}>
            <Play className="w-4 h-4 fill-white" /> See Our Work
          </button>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <section className="bg-[#0d1128] border-y border-violet-900/20 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-4xl font-extrabold text-white mb-1" style={{ fontFamily: "Manrope, sans-serif" }}>
              <GradientText>{s.value}</GradientText>
            </div>
            <div className="text-sm text-slate-400" style={{ fontFamily: "Inter, sans-serif" }}>{s.label}</div>
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
        <Link
          to="/geo-report"
          className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-violet-500/25 bg-gradient-to-r from-violet-950/50 to-indigo-950/40 px-6 py-5 hover:border-violet-400/40 transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-violet-600/25 border border-violet-500/30 flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5 text-violet-300" />
            </div>
            <div>
              <p className="text-violet-400 text-xs font-semibold tracking-widest uppercase mb-1" style={{ fontFamily: "Inter, sans-serif" }}>
                Free Tool
              </p>
              <h2 className="text-lg font-bold text-white mb-1" style={{ fontFamily: "Manrope, sans-serif" }}>
                SEO & GEO Report Generator
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xl" style={{ fontFamily: "Inter, sans-serif" }}>
                Analyze any URL with 45+ checks — Google, ChatGPT, Perplexity, Claude & Gemini readiness. Semrush-grade audit, instant results.
              </p>
            </div>
          </div>
          <span
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold shrink-0 group-hover:from-violet-500 group-hover:to-indigo-500 transition-all"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            <Search className="w-4 h-4" />
            Run Free Scan
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </Link>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 max-w-2xl">
          <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: "Inter, sans-serif" }}>What We Do</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight" style={{ fontFamily: "Manrope, sans-serif" }}>
            Full-Service Digital<br /><GradientText>Agency Solutions</GradientText>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((svc) => (
            <div
              key={svc.title}
              className="group p-8 rounded-2xl bg-[#0d1128] border border-violet-900/20 hover:border-violet-600/40 transition-all duration-300 hover:bg-[#10163a] cursor-pointer"
            >
              <div className="text-3xl text-violet-400 mb-5 group-hover:text-violet-300 transition-colors">{svc.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "Manrope, sans-serif" }}>{svc.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6" style={{ fontFamily: "Inter, sans-serif" }}>{svc.desc}</p>
              <button className="flex items-center gap-2 text-violet-400 text-sm font-semibold group-hover:gap-3 transition-all" style={{ fontFamily: "Manrope, sans-serif" }}>
                Learn More <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioSection() {
  const [activeTab, setActiveTab] = useState<ClientCategory>("Featured");

  return (
    <section className="py-28 px-6 bg-[#0d1128]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: "Inter, sans-serif" }}>Our Work</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white" style={{ fontFamily: "Manrope, sans-serif" }}>
              <GradientText>Award-Winning</GradientText><br />Case Studies
            </h2>
          </div>
          <div className="flex gap-1 p-1 rounded-full border border-violet-900/30 bg-[#06091a]">
            {PORTFOLIO_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-900/40"
                    : "text-slate-400 hover:text-white"
                }`}
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PORTFOLIO[activeTab].map((item) => (
            <div key={item.slug} className="group rounded-2xl overflow-hidden border border-violet-900/20 hover:border-violet-600/40 transition-all bg-[#06091a]">
              <div className="relative overflow-hidden h-64">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06091a] via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-violet-600/80 backdrop-blur-sm text-white text-xs font-semibold" style={{ fontFamily: "Manrope, sans-serif" }}>{item.tag}</span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-emerald-600/80 backdrop-blur-sm text-white text-xs font-semibold" style={{ fontFamily: "Manrope, sans-serif" }}>{item.metric}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "Manrope, sans-serif" }}>{item.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-5" style={{ fontFamily: "Inter, sans-serif" }}>{item.shortDescription}</p>
                <div className="flex gap-3">
                  <Link
                    to={getClientPath(item.slug)}
                    className="px-5 py-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold hover:from-violet-500 hover:to-indigo-500 transition-all"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    View Case Study
                  </Link>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 rounded-full border border-violet-500/30 text-slate-300 text-sm font-semibold hover:bg-violet-900/20 transition-all"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    Launch Website
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-violet-500/30 text-violet-300 font-semibold hover:bg-violet-900/20 transition-all"
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
          <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: "Inter, sans-serif" }}>How We Work</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6" style={{ fontFamily: "Manrope, sans-serif" }}>
            Our 7-Step <GradientText>Design Process</GradientText>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            Every project follows a rigorous, battle-tested process that eliminates guesswork and guarantees results from strategy through launch and beyond.
          </p>
        </div>

        <div className="space-y-3">
          {PROCESS.map((step, i) => (
            <div
              key={step.n}
              className={`rounded-xl border transition-all duration-300 cursor-pointer ${
                expanded === i
                  ? "border-violet-600/50 bg-[#10163a]"
                  : "border-violet-900/20 bg-[#0d1128] hover:border-violet-800/30"
              }`}
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <div className="flex items-center gap-4 px-6 py-4">
                <span className="text-violet-500 font-bold text-sm w-8 shrink-0" style={{ fontFamily: "Manrope, sans-serif" }}>{step.n}</span>
                <span className="text-white font-semibold flex-1" style={{ fontFamily: "Manrope, sans-serif" }}>{step.title}</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${expanded === i ? "rotate-180" : ""}`} />
              </div>
              {expanded === i && (
                <div className="px-6 pb-5 pl-[4.5rem]">
                  <p className="text-slate-400 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{step.desc}</p>
                </div>
              )}
            </div>
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
    <section className="py-28 px-6 bg-[#0d1128]">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: "Inter, sans-serif" }}>Client Stories</p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-16" style={{ fontFamily: "Manrope, sans-serif" }}>
          What Our <GradientText>Clients Say</GradientText>
        </h2>

        <div className="relative">
          <div className="text-[8rem] leading-none text-violet-900/30 font-serif absolute -top-4 left-0 select-none">"</div>
          <blockquote className="text-xl md:text-2xl text-slate-200 leading-relaxed font-light mb-10 relative z-10" style={{ fontFamily: "Inter, sans-serif" }}>
            "{t.quote}"
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-violet-600/50" />
            <div className="text-left">
              <div className="text-white font-semibold" style={{ fontFamily: "Manrope, sans-serif" }}>{t.name}</div>
              {t.url ? (
                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-400 text-sm hover:text-violet-300 transition-colors"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {t.title}
                </a>
              ) : (
                <div className="text-slate-400 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>{t.title}</div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-10">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`transition-all rounded-full ${i === active ? "w-8 h-2 bg-violet-500" : "w-2 h-2 bg-violet-900/60 hover:bg-violet-700/60"}`}
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
          <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: "Inter, sans-serif" }}>Recognition</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white" style={{ fontFamily: "Manrope, sans-serif" }}>
            Industry <GradientText>Awards & Recognition</GradientText>
          </h2>
        </div>

        <div className="flex justify-center gap-1 p-1 rounded-full border border-violet-900/30 bg-[#0d1128] w-fit mx-auto mb-12">
          {(["Awards", "Media", "Expertise"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                tab === t ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white" : "text-slate-400 hover:text-white"
              }`}
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "Awards" && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {AWARDS.map((award) => (
              <div key={award} className="flex items-center gap-3 p-5 rounded-xl bg-[#0d1128] border border-violet-900/20 hover:border-violet-600/30 transition-all">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-200 text-sm font-medium" style={{ fontFamily: "Inter, sans-serif" }}>{award}</span>
              </div>
            ))}
          </div>
        )}

        {tab === "Media" && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {MEDIA.map((m) => (
              <div key={m} className="flex items-center justify-center p-8 rounded-xl bg-[#0d1128] border border-violet-900/20 hover:border-violet-600/30 transition-all">
                <span className="text-slate-200 font-bold text-lg" style={{ fontFamily: "Manrope, sans-serif" }}>{m}</span>
              </div>
            ))}
          </div>
        )}

        {tab === "Expertise" && (
          <div className="flex flex-wrap justify-center gap-3">
            {["Custom Web Design", "UX/UI Design", "Web Development", "React Development", "eCommerce", "Shopify", "WordPress", "Webflow", "SEO", "PPC", "Social Media Marketing", "Brand Identity", "Logo Design", "Content Strategy", "Email Marketing", "Conversion Optimization", "Analytics & Reporting", "ADA Compliance", "Web Accessibility", "CRO"].map((tag) => (
              <span key={tag} className="px-4 py-2 rounded-full border border-violet-700/30 bg-violet-900/20 text-violet-300 text-sm font-medium" style={{ fontFamily: "Inter, sans-serif" }}>{tag}</span>
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
    <section className="py-28 px-6 bg-[#0d1128]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: "Inter, sans-serif" }}>Where We Are</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white" style={{ fontFamily: "Manrope, sans-serif" }}>
            Our <GradientText>Office Locations</GradientText>
          </h2>
        </div>

        <div className="flex justify-center gap-1 p-1 rounded-full border border-violet-900/30 bg-[#06091a] w-fit mx-auto mb-10">
          {LOCATIONS.map((l, i) => (
            <button
              key={l.city}
              onClick={() => setActiveCity(i)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCity === i ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white" : "text-slate-400 hover:text-white"
              }`}
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              {l.city}
              {l.tag && <span className="ml-1 text-xs text-violet-300">{l.tag}</span>}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="rounded-2xl overflow-hidden h-72 bg-violet-900/20">
            <img src={loc.img} alt={loc.city} className="w-full h-full object-cover" />
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white" style={{ fontFamily: "Manrope, sans-serif" }}>{loc.city} Office</h3>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-violet-400 mt-0.5 shrink-0" />
              <span className="text-slate-300 text-base" style={{ fontFamily: "Inter, sans-serif" }}>{loc.address}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-violet-400 shrink-0" />
              <a href={`tel:${loc.phone}`} className="text-slate-300 text-base hover:text-white transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>{loc.phone}</a>
            </div>
            <button className="mt-4 px-7 py-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold hover:from-violet-500 hover:to-indigo-500 transition-all" style={{ fontFamily: "Manrope, sans-serif" }}>
              Get Directions
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeFaqSection() {
  return (
    <section className="py-28 px-6 bg-[#0d1128] border-y border-violet-900/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
            FAQ
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white" style={{ fontFamily: "Manrope, sans-serif" }}>
            Answers, upfront
          </h2>
          <p className="text-slate-400 text-sm mt-4" style={{ fontFamily: "Inter, sans-serif" }}>
            Clear, direct answers so Google and humans can understand what we do.
          </p>
        </div>

        <div className="space-y-3">
          {VISIBLE_HOME_FAQ.map((item) => (
            <details
              key={item.question}
              className="group rounded-xl border border-violet-900/20 bg-[#06091a] hover:border-violet-600/30 transition-all"
            >
              <summary
                className="cursor-pointer list-none px-6 py-4 flex items-center justify-between gap-4"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                <span className="text-white font-semibold">{item.question}</span>
                <span className="text-violet-400 group-open:rotate-180 transition-transform">⌄</span>
              </summary>
              <div className="px-6 pb-5 -mt-1">
                <p className="text-slate-400 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
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
          <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: "Inter, sans-serif" }}>Get Started</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6" style={{ fontFamily: "Manrope, sans-serif" }}>
            Ready to Grow <br /><GradientText>Your Business?</GradientText>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed mb-8" style={{ fontFamily: "Inter, sans-serif" }}>
            Tell us about your project. Our team will review your inquiry and schedule a discovery call within one business day.
          </p>
          <div className="space-y-4">
            {[
              { icon: Phone, text: "(512) 555-0147" },
              { icon: Mail, text: "hello@adrevnview.com" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-900/40 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-violet-400" />
                </div>
                <span className="text-slate-300" style={{ fontFamily: "Inter, sans-serif" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0d1128] border border-violet-900/20 rounded-2xl p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {(["name", "company"] as const).map((field) => (
              <div key={field}>
                <label className="block text-sm text-slate-400 mb-2 capitalize" style={{ fontFamily: "Inter, sans-serif" }}>{field}</label>
                <input
                  type="text"
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  placeholder={field === "name" ? "Alex Chen" : "Northgate Labs"}
                  className="w-full px-4 py-3 rounded-xl bg-[#06091a] border border-violet-900/30 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/60 transition-colors"
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {(["email", "phone"] as const).map((field) => (
              <div key={field}>
                <label className="block text-sm text-slate-400 mb-2 capitalize" style={{ fontFamily: "Inter, sans-serif" }}>{field}</label>
                <input
                  type={field === "email" ? "email" : "tel"}
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  placeholder={field === "email" ? "alex@northgatelabs.com" : "(555) 000-0000"}
                  className="w-full px-4 py-3 rounded-xl bg-[#06091a] border border-violet-900/30 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/60 transition-colors"
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
              </div>
            ))}
          </div>
          <div className="mb-6">
            <label className="block text-sm text-slate-400 mb-2" style={{ fontFamily: "Inter, sans-serif" }}>Project Details</label>
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell us about your project goals, timeline, and budget..."
              className="w-full px-4 py-3 rounded-xl bg-[#06091a] border border-violet-900/30 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/60 transition-colors resize-none"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
          </div>
          <button className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-base hover:from-violet-500 hover:to-indigo-500 transition-all shadow-xl shadow-violet-900/40" style={{ fontFamily: "Manrope, sans-serif" }}>
            Request a Quote — Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    {
      title: "Web Design",
      links: ["Custom Web Design", "Landing Page Design", "UI/UX Design", "Website Redesign", "Responsive Design"],
    },
    {
      title: "Development",
      links: ["React Development", "WordPress Development", "Shopify Development", "Webflow Development", "API Integrations"],
    },
    {
      title: "Marketing",
      links: ["SEO Services", "PPC Advertising", "Social Media Marketing", "Email Marketing", "Content Strategy", "Free GEO Report →"],
    },
    {
      title: "Branding",
      links: ["Logo Design", "Brand Identity", "Brand Strategy", "Visual Design Systems", "Brand Guidelines"],
    },
  ];

  return (
    <footer className="bg-[#040712] border-t border-violet-900/20 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Logo className="mb-4" iconClassName="h-8 w-7" textClassName="h-5 w-auto" />
            <p className="text-slate-500 text-sm leading-relaxed mb-5" style={{ fontFamily: "Inter, sans-serif" }}>
              Premium web design agency for B2B, B2C & enterprise brands.
            </p>
            <div className="flex gap-3">
              {["in", "ig"].map((s) => (
                <button key={s} className="w-9 h-9 rounded-lg bg-violet-900/30 text-violet-400 text-xs font-bold hover:bg-violet-700/30 transition-colors uppercase" style={{ fontFamily: "Manrope, sans-serif" }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider" style={{ fontFamily: "Manrope, sans-serif" }}>{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    {link.startsWith("Free GEO Report") ? (
                      <Link to="/geo-report" className="text-violet-400 text-sm hover:text-violet-300 transition-colors font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                        {link}
                      </Link>
                    ) : (
                      <button className="text-slate-500 text-sm hover:text-slate-300 transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>{link}</button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-violet-900/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
            © {new Date().getFullYear()} Adrevnview. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="/work" className="text-slate-600 text-sm hover:text-slate-400 transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>Case Studies</a>
            <a href="/privacy" className="text-slate-600 text-sm hover:text-slate-400 transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>Privacy Policy</a>
            <a href="/accessibility" className="text-slate-600 text-sm hover:text-slate-400 transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>Accessibility</a>
            <a href="/geo-report" className="text-slate-600 text-sm hover:text-slate-400 transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>GEO Report</a>
            <a href="/sitemap.xml" className="text-slate-600 text-sm hover:text-slate-400 transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
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
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden" style={{ fontFamily: "Inter, sans-serif" }}>
        <Nav />
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
        <Footer />
      </div>
    </>
  );
}
