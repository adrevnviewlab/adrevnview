import { Link, useParams } from "react-router";
import { SiteLayout } from "@/app/components/SiteLayout";
import { SeoHead } from "@/components/seo/SeoHead";

const INDUSTRIES: Record<string, { title: string; description: string; intro: string; solutions: string[] }> = {
  healthcare: {
    title: "Healthcare Web Design",
    description: "HIPAA-aware websites and patient-focused digital experiences for healthcare providers and med-tech brands.",
    intro: "Healthcare organizations need websites that build trust, communicate compliance, and make it easy for patients to take action. Adrevnview designs accessible, secure, and conversion-focused healthcare web experiences.",
    solutions: ["Patient portal UX", "Provider directory sites", "Med-tech product marketing", "Accessibility (WCAG) compliance", "Local SEO for practices"],
  },
  ecommerce: {
    title: "eCommerce & Retail Web Design",
    description: "High-converting online stores and retail brand websites built for scale.",
    intro: "Retail brands compete on experience as much as price. We design eCommerce sites and retail marketing pages optimized for product discovery, mobile checkout, and repeat purchases.",
    solutions: ["Shopify store design", "Product page optimization", "Brand storytelling", "Email capture and retention", "Performance optimization"],
  },
  manufacturing: {
    title: "Manufacturing & Industrial Web Design",
    description: "B2B websites that communicate capability, certifications, and technical credibility.",
    intro: "Manufacturing buyers research suppliers online before ever making contact. We build industrial websites that showcase capabilities, certifications, and case studies in formats engineers and procurement teams trust.",
    solutions: ["Capability showcase pages", "RFQ and lead forms", "Technical documentation hubs", "Multi-location presence", "SEO for industrial keywords"],
  },
  "real-estate": {
    title: "Real Estate Web Design",
    description: "Property marketing sites, broker platforms, and lead-generation experiences for real estate.",
    intro: "Real estate is visual and local. We design property marketing sites, broker platforms, and IDX-integrated experiences that capture leads and showcase listings beautifully on every device.",
    solutions: ["Property listing UX", "Agent profile systems", "Lead capture funnels", "Local SEO optimization", "Virtual tour integration"],
  },
  legal: {
    title: "Legal Services Web Design",
    description: "Authoritative law firm websites that establish expertise and convert consultations.",
    intro: "Law firms need websites that communicate authority and make it effortless to book consultations. We design practice-area pages, attorney profiles, and content structures that support SEO and client trust.",
    solutions: ["Practice area pages", "Attorney bio templates", "Consultation booking flows", "Content marketing hubs", "Local search optimization"],
  },
  financial: {
    title: "Financial Services Web Design",
    description: "Compliant, trustworthy websites for fintech, advisors, and financial institutions.",
    intro: "Financial services websites must balance compliance, clarity, and conversion. We design fintech marketing sites and advisory firm web experiences that build confidence at every step.",
    solutions: ["Product marketing pages", "Compliance-ready layouts", "Client portal UX", "Thought leadership content", "Secure form handling"],
  },
  technology: {
    title: "Technology & SaaS Web Design",
    description: "Product-led websites for SaaS companies, dev tools, and technology brands.",
    intro: "SaaS buyers evaluate your product through your website before they ever sign up. We design product-led marketing sites with clear value props, interactive demos, and documentation structures optimized for SEO and GEO.",
    solutions: ["Product marketing sites", "Pricing page optimization", "Developer documentation", "GEO and schema markup", "Conversion funnel design"],
  },
};

export default function IndustryPage() {
  const { slug = "" } = useParams();
  const industry = INDUSTRIES[slug];

  if (!industry) {
    return (
      <SiteLayout mainClassName="px-6 py-20 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Industry not found</h1>
        <Link to="/" className="text-violet-400">← Home</Link>
      </SiteLayout>
    );
  }

  const path = `/industries/${slug}`;
  return (
    <SiteLayout mainClassName="px-6 py-12">
      <SeoHead title={`${industry.title} | Adrevnview`} description={industry.description} path={path} />
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-6" style={{ fontFamily: "Manrope, sans-serif" }}>{industry.title}</h1>
        <p data-geo-chunk="summary" className="text-slate-400 text-lg mb-10 leading-relaxed">{industry.intro}</p>
        <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>How we help</h2>
        <ul className="space-y-2 mb-10">
          {industry.solutions.map((s) => (
            <li key={s} className="text-slate-300 text-sm">• {s}</li>
          ))}
        </ul>
        <Link to="/contact" className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 font-semibold">
          Request a consultation
        </Link>
      </div>
    </SiteLayout>
  );
}
