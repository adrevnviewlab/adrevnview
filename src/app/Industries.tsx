import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/app/components/SiteLayout";
import { SeoHead } from "@/components/seo/SeoHead";
import { SpringCardLink } from "@/components/SpringCard";
import { FOOTER_INDUSTRY_LINKS } from "@/lib/content/navigation";

const INDUSTRY_COPY: Record<string, string> = {
  Healthcare: "HIPAA-aware websites and patient-focused experiences for providers and med-tech brands.",
  "eCommerce/Retail": "High-converting online stores and retail brand sites built for scale.",
  Manufacturing: "B2B industrial websites that communicate capability and technical credibility.",
  "Real Estate": "Property marketing sites, broker platforms, and lead-generation funnels.",
  Legal: "Authoritative law firm websites that establish expertise and convert consultations.",
  "Financial Services": "Compliant, trustworthy sites for fintech, advisors, and financial institutions.",
  "Technology/SaaS": "Product-led websites for SaaS companies, dev tools, and technology brands.",
};

export default function Industries() {
  return (
    <SiteLayout mainClassName="px-6 py-12">
      <SeoHead
        title="Industries We Serve | Adrevnview"
        description="Web design, development, SEO, and GEO for healthcare, eCommerce, manufacturing, real estate, legal, financial services, and SaaS brands."
        path="/industries"
      />

      <div className="max-w-5xl mx-auto">
        <p className="text-sky-400 text-sm font-semibold tracking-widest uppercase mb-4">Vertical Expertise</p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6" style={{ fontFamily: "Manrope, sans-serif" }}>
          Industries We Serve
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed mb-12 max-w-3xl" data-geo-chunk="summary">
          We design and build for regulated and competitive verticals where trust, clarity, and performance matter — from Long Island local businesses to national SaaS platforms.
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          {FOOTER_INDUSTRY_LINKS.map(({ label, href }) => (
            <SpringCardLink
              key={href}
              to={href}
              className="group block rounded-xl border border-border bg-card p-6 hover:border-sky-500/40 transition-all"
            >
              <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-sky-300 transition-colors" style={{ fontFamily: "Manrope, sans-serif" }}>
                {label}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{INDUSTRY_COPY[label]}</p>
              <span className="inline-flex items-center gap-1 text-sky-400 text-sm font-semibold">
                View industry page <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </SpringCardLink>
          ))}
        </div>

        <p className="text-muted-foreground text-sm mt-10">
          <Link to="/contact" className="text-sky-400 hover:text-sky-300">
            Contact us
          </Link>{" "}
          about your industry-specific project.
        </p>
      </div>
    </SiteLayout>
  );
}
