import { Link, useParams } from "react-router";
import { ArrowRight, Check } from "lucide-react";
import { SiteLayout } from "@/app/components/SiteLayout";
import { SeoHead } from "@/components/seo/SeoHead";
import { SERVICE_BY_SLUG } from "@/lib/content/services";
import { SITE_URL } from "@/lib/seo/siteConfig";

export default function ServicePage() {
  const { slug = "" } = useParams();
  const service = SERVICE_BY_SLUG[slug];

  if (!service) {
    return (
      <SiteLayout mainClassName="px-6 py-20 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Service not found</h1>
        <Link to="/" className="text-violet-400 hover:text-violet-300">← Back to home</Link>
      </SiteLayout>
    );
  }

  const path = `/services/${slug}`;

  return (
    <SiteLayout mainClassName="px-6 py-12">
      <SeoHead title={service.seoTitle} description={service.seoDescription} path={path} />

      <div className="max-w-5xl mx-auto">
        <p className="text-violet-400 text-xs font-semibold tracking-widest uppercase mb-3">{service.category.replace("-", " ")}</p>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6" style={{ fontFamily: "Manrope, sans-serif" }}>{service.headline}</h1>
        <p data-geo-chunk="summary" className="text-slate-400 text-lg leading-relaxed mb-10 max-w-3xl">{service.intro}</p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>What you get</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {service.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2 text-slate-300 text-sm">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />{b}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>Our process</h2>
          <ol className="space-y-3">
            {service.process.map((step, i) => (
              <li key={step} className="flex gap-4 rounded-xl border border-violet-900/20 bg-[#0d1128] px-5 py-4">
                <span className="text-violet-400 font-bold">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-slate-300 text-sm">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {service.faq.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "Manrope, sans-serif" }}>Frequently asked questions</h2>
            <div className="space-y-4">
              {service.faq.map((item) => (
                <div key={item.question} className="rounded-xl border border-violet-900/20 bg-[#0d1128] p-5">
                  <h3 className="font-semibold text-white mb-2">{item.question}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="rounded-2xl border border-violet-500/25 bg-gradient-to-r from-violet-950/50 to-indigo-950/40 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "Manrope, sans-serif" }}>Ready to start?</h2>
            <p className="text-slate-400 text-sm">Request a free consultation for {service.title.toLowerCase()}.</p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 font-semibold shrink-0"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Get a quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <p className="text-slate-600 text-xs mt-8">
          <Link to="/work" className="hover:text-slate-400">View case studies</Link>
          {" · "}
          <Link to="/geo-report" className="hover:text-slate-400">Free GEO report</Link>
          {" · "}
          <a href={SITE_URL} className="hover:text-slate-400">adrevnview.com</a>
        </p>
      </div>
    </SiteLayout>
  );
}
