import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/app/components/SiteLayout";
import { SeoHead } from "@/components/seo/SeoHead";
import { SpringCardLink } from "@/components/SpringCard";
import { FOOTER_LINKS, getServicePath, SERVICES } from "@/lib/content/services";

export default function Services() {
  return (
    <SiteLayout mainClassName="px-6 py-12">
      <SeoHead
        title="Digital Agency Services | Adrevnview"
        description="Full-service web design, development, SEO, GEO, branding, and digital marketing for B2B, B2C, and enterprise brands on Long Island and nationwide."
        path="/services"
      />

      <div className="max-w-7xl mx-auto">
        <p className="text-sky-400 text-sm font-semibold tracking-widest uppercase mb-4">What We Do</p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6" style={{ fontFamily: "Manrope, sans-serif" }}>
          Our Services
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed mb-14 max-w-3xl" data-geo-chunk="summary">
          Adrevnview is a full-service digital agency based on Long Island, New York. From custom web design and React development to SEO, GEO, and brand identity — every engagement ships with performance and discoverability built in.
        </p>

        {Object.entries(FOOTER_LINKS).map(([category, links]) => (
          <section key={category} className="mb-14">
            <h2 className="text-2xl font-bold text-foreground mb-6" style={{ fontFamily: "Manrope, sans-serif" }}>
              {category}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {links.map(({ label, slug }) => {
                const service = SERVICES.find((s) => s.slug === slug);
                return (
                  <SpringCardLink
                    key={slug}
                    to={getServicePath(slug)}
                    className="group block rounded-xl border border-border bg-card p-6 hover:border-sky-500/40 transition-all"
                  >
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-sky-300 transition-colors" style={{ fontFamily: "Manrope, sans-serif" }}>
                      {label}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {service?.description ?? `Learn about ${label.toLowerCase()} from Adrevnview.`}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sky-400 text-sm font-semibold">
                      Learn more <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </SpringCardLink>
                );
              })}
            </div>
          </section>
        ))}

        <p className="text-muted-foreground text-sm">
          Not sure where to start?{" "}
          <Link to="/contact" className="text-sky-400 hover:text-sky-300">
            Request a free consultation
          </Link>
        </p>
      </div>
    </SiteLayout>
  );
}
