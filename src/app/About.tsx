import { Link } from "react-router";
import { SiteLayout } from "@/app/components/SiteLayout";
import { SeoHead } from "@/components/seo/SeoHead";
import { PAGES } from "@/lib/seo/siteConfig";

export default function About() {
  return (
    <SiteLayout mainClassName="px-6 py-12">
      <SeoHead title={PAGES.about.title} description={PAGES.about.description} path={PAGES.about.path} />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold tracking-tight mb-6" style={{ fontFamily: "Manrope, sans-serif" }}>
          About Adrevnview
        </h1>
        <p className="text-slate-300 text-lg leading-relaxed mb-10">
          Adrevnview is a premium full-service digital agency. We design and build high-performance websites and product experiences for
          growth-focused brands — with SEO and Generative Engine Optimization (GEO) built in from day one.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-violet-900/20 bg-[#0d1128] p-7">
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "Manrope, sans-serif" }}>What we do</h2>
            <ul className="space-y-2 text-slate-300 text-sm leading-relaxed">
              <li>Custom web design and conversion-focused UX</li>
              <li>Full-stack development and integrations</li>
              <li>Brand identity systems</li>
              <li>SEO strategy and implementation</li>
              <li>GEO: schema, content structure, and AI discoverability</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-violet-900/20 bg-[#0d1128] p-7">
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "Manrope, sans-serif" }}>How we work</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              We combine strategy, design, and engineering into one delivery flow. Every build ships with measurable foundations: clean
              information architecture, performance, analytics-ready structure, and schema markup that helps search engines and AI systems
              understand what you do.
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-violet-900/20 bg-[#0d1128] p-7">
          <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "Manrope, sans-serif" }}>Contact</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Email: <a className="text-violet-300 hover:text-violet-200" href="mailto:hello@adrevnview.com">hello@adrevnview.com</a>
            <br />
            Phone: <a className="text-violet-300 hover:text-violet-200" href="tel:5125550147">(512) 555-0147</a>
          </p>
          <Link
            to="/contact"
            className="inline-block mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 font-semibold text-sm"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Request a consultation
          </Link>
        </div>
      </div>
    </SiteLayout>
  );
}
