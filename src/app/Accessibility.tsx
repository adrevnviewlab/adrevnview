import { SiteLayout } from "@/app/components/SiteLayout";
import { SeoHead } from "@/components/seo/SeoHead";
import { PAGES } from "@/lib/seo/siteConfig";

export default function Accessibility() {
  return (
    <SiteLayout mainClassName="px-6 py-12">
      <SeoHead title={PAGES.accessibility.title} description={PAGES.accessibility.description} path={PAGES.accessibility.path} />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold tracking-tight mb-6" style={{ fontFamily: "Manrope, sans-serif" }}>
          Accessibility Statement
        </h1>
        <p className="text-slate-400 text-sm mb-10">Last updated: 2026-07-02</p>

        <div className="space-y-8 text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "Manrope, sans-serif" }}>Our commitment</h2>
            <p>
              Adrevnview is committed to providing an accessible experience for all visitors. We aim to design and build interfaces that are
              usable with assistive technologies and a wide range of devices.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "Manrope, sans-serif" }}>Accessibility practices</h2>
            <ul className="space-y-2 list-disc pl-6">
              <li>Semantic headings and readable content structure</li>
              <li>Keyboard navigable interactive elements</li>
              <li>Color contrast considerations where possible</li>
              <li>Descriptive labels and alt text for key images</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "Manrope, sans-serif" }}>Feedback</h2>
            <p>
              If you experience any accessibility issues on this site, please contact us at{" "}
              <a className="text-violet-300 hover:text-violet-200" href="mailto:hello@adrevnview.com">
                hello@adrevnview.com
              </a>{" "}
              and we’ll work to address the issue.
            </p>
          </section>
        </div>
      </div>
    </SiteLayout>
  );
}
