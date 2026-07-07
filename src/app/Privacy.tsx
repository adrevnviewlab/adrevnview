import { SiteLayout } from "@/app/components/SiteLayout";
import { SeoHead } from "@/components/seo/SeoHead";
import { PAGES, SITE_URL } from "@/lib/seo/siteConfig";

export default function Privacy() {
  return (
    <SiteLayout mainClassName="px-6 py-12">
      <SeoHead title={PAGES.privacy.title} description={PAGES.privacy.description} path={PAGES.privacy.path} />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold tracking-tight mb-6" style={{ fontFamily: "Manrope, sans-serif" }}>
          Privacy Policy
        </h1>
        <p className="text-slate-400 text-sm mb-10">Last updated: 2026-07-02</p>

        <div className="space-y-8 text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "Manrope, sans-serif" }}>Overview</h2>
            <p>
              This Privacy Policy describes how Adrevnview (“we”, “us”) handles personal information on {SITE_URL}. If you contact us, we
              may receive information you choose to provide (like your name, company, email, phone number, and project details).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "Manrope, sans-serif" }}>Information you provide</h2>
            <p>
              When you submit a form or email us, we may collect the information you provide so we can respond and deliver requested
              services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "Manrope, sans-serif" }}>Analytics & cookies</h2>
            <p>
              We may use privacy-friendly analytics to understand website usage (pages viewed, device type, approximate location). If we use
              cookies, they are used to improve performance and measure engagement, not to sell personal data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "Manrope, sans-serif" }}>Data retention</h2>
            <p>
              We retain contact inquiries and business communications only as long as needed to respond, provide services, and maintain
              reasonable business records.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "Manrope, sans-serif" }}>Contact</h2>
            <p>
              Privacy questions:{" "}
              <a className="text-violet-300 hover:text-violet-200" href="mailto:hello@adrevnview.com">
                hello@adrevnview.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </SiteLayout>
  );
}
