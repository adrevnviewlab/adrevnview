import { Link, useParams } from "react-router";
import { ArrowRight, Check } from "lucide-react";
import { SiteLayout } from "@/app/components/SiteLayout";
import { SeoHead } from "@/components/seo/SeoHead";
import { SpringCard } from "@/components/SpringCard";
import { SpringLink } from "@/components/SpringButton";
import { SERVICE_BY_SLUG } from "@/lib/content/services";
import { SITE_URL } from "@/lib/seo/siteConfig";

export default function ServicePage() {
  const { slug = "" } = useParams();
  const service = SERVICE_BY_SLUG[slug];

  if (!service) {
    return (
      <SiteLayout mainClassName="px-6 py-20 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Service not found</h1>
        <Link to="/" className="text-sky-400 hover:text-sky-300">← Back to home</Link>
      </SiteLayout>
    );
  }

  const path = `/services/${slug}`;

  return (
    <SiteLayout mainClassName="px-6 py-12">
      <SeoHead title={service.seoTitle} description={service.seoDescription} path={path} />

      <div className="max-w-5xl mx-auto">
        <p className="text-sky-400 text-xs font-semibold tracking-widest uppercase mb-3">{service.category.replace("-", " ")}</p>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6" style={{ fontFamily: "Manrope, sans-serif" }}>{service.headline}</h1>
        <p data-geo-chunk="summary" className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-3xl">{service.intro}</p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>What you get</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {service.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2 text-foreground/80 text-sm">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />{b}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>Our process</h2>
          <ol className="space-y-3">
            {service.process.map((step, i) => (
              <li key={step} className="flex gap-4 rounded-xl border border-sky-900/20 bg-card px-5 py-4">
                <span className="text-sky-400 font-bold">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-foreground/80 text-sm">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {service.faq.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "Manrope, sans-serif" }}>Frequently asked questions</h2>
            <div className="space-y-4">
              {service.faq.map((item) => (
                <div key={item.question} className="rounded-xl border border-sky-900/20 bg-card p-5">
                  <h3 className="font-semibold text-foreground mb-2">{item.question}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <SpringCard className="rounded-2xl border border-border bg-card p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: "Manrope, sans-serif" }}>Ready to start?</h2>
            <p className="text-muted-foreground text-sm">Request a free consultation for {service.title.toLowerCase()}.</p>
          </div>
          <SpringLink
            to="/contact"
            className="gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-semibold shrink-0"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Get a quote <ArrowRight className="w-4 h-4" />
          </SpringLink>
        </SpringCard>

        <p className="text-muted-foreground text-xs mt-8">
          <Link to="/work" className="hover:text-muted-foreground">View case studies</Link>
          {" · "}
          <Link to="/geo-report" className="hover:text-muted-foreground">Free GEO report</Link>
          {" · "}
          <a href={SITE_URL} className="hover:text-muted-foreground">adrevnview.com</a>
        </p>
      </div>
    </SiteLayout>
  );
}
