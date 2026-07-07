import { SpringPressable } from "@/components/SpringButton";
import { Mail, MapPin, Phone } from "lucide-react";
import { SiteLayout } from "@/app/components/SiteLayout";
import { SeoHead } from "@/components/seo/SeoHead";
import { ORG, PAGES } from "@/lib/seo/siteConfig";

const FAQ = [
  {
    question: "How do I request a project quote?",
    answer: "Fill out the contact form below or email hello@adrevnview.com with your project scope, timeline, and budget range. We respond within one business day.",
  },
  {
    question: "What industries does Adrevnview serve?",
    answer: "We work with B2B SaaS, eCommerce, healthcare, legal, real estate, manufacturing, financial services, and enterprise organizations.",
  },
  {
    question: "Do you offer free SEO and GEO audits?",
    answer: "Yes. Use our free GEO Report tool at /geo-report to analyze any URL for SEO and AI visibility readiness.",
  },
];

export default function Contact() {
  return (
    <SiteLayout mainClassName="px-6 py-12">
      <SeoHead title="Contact Adrevnview — Request a Quote" description={PAGES.contact.description} path="/contact" />

      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>Contact Adrevnview</h1>
        <p data-geo-chunk="summary" className="text-muted-foreground text-lg mb-10 max-w-2xl leading-relaxed">
          Tell us about your web design, development, SEO, or branding project. Our team will respond within one business day with next steps and a tailored proposal.
        </p>

        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-sky-400 mt-1" />
              <div>
                <p className="font-semibold">Email</p>
                <a href={`mailto:${ORG.email}`} className="text-sky-400 hover:text-sky-300">{ORG.email}</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-sky-400 mt-1" />
              <div>
                <p className="font-semibold">Phone</p>
                <a href={`tel:${ORG.phone}`} className="text-sky-400 hover:text-sky-300">{ORG.phoneDisplay}</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-sky-400 mt-1" />
              <div>
                <p className="font-semibold">Long Island Office</p>
                <p className="text-muted-foreground text-sm">{ORG.address.streetAddress}, {ORG.address.addressLocality}, {ORG.address.addressRegion} {ORG.address.postalCode}</p>
              </div>
            </div>
          </div>

          <form className="rounded-2xl border border-sky-900/25 bg-card p-6 space-y-4" id="contact-form">
            <div>
              <label className="text-sm text-muted-foreground block mb-1">Name</label>
              <input className="w-full px-4 py-3 rounded-xl bg-background border border-sky-900/30 text-foreground text-sm" placeholder="Your name" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground block mb-1">Email</label>
              <input type="email" className="w-full px-4 py-3 rounded-xl bg-background border border-sky-900/30 text-foreground text-sm" placeholder="you@company.com" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground block mb-1">Project details</label>
              <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-background border border-sky-900/30 text-foreground text-sm resize-none" placeholder="Goals, timeline, budget…" />
            </div>
            <SpringPressable type="button" className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-semibold" style={{ fontFamily: "Manrope, sans-serif" }}>
              Send message
            </SpringPressable>
          </form>
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "Manrope, sans-serif" }}>Common questions</h2>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <div key={item.question} className="rounded-xl border border-sky-900/20 bg-card p-5">
                <h3 className="font-semibold mb-2">{item.question}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
