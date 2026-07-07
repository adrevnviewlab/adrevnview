import { Link } from "react-router";
import { Logo } from "@/components/Logo";
import { FOOTER_LINKS, getServicePath } from "@/lib/content/services";
import { FOOTER_INDUSTRY_LINKS } from "@/lib/content/navigation";

export function SiteFooter() {
  return (
    <footer className="bg-[#040712] border-t border-violet-900/20 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 mb-16">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Logo className="mb-4" iconClassName="h-8 w-7" textClassName="h-5 w-auto" />
            <p className="text-slate-500 text-sm leading-relaxed mb-5" style={{ fontFamily: "Inter, sans-serif" }}>
              Premium web design agency for B2B, B2C & enterprise brands.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider" style={{ fontFamily: "Manrope, sans-serif" }}>
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={getServicePath(link.slug)}
                      className="text-slate-500 text-sm hover:text-slate-300 transition-colors"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                {title === "Marketing" ? (
                  <li>
                    <Link
                      to="/geo-report"
                      className="text-violet-400 text-sm hover:text-violet-300 transition-colors font-medium"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Free GEO Report →
                    </Link>
                  </li>
                ) : null}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider" style={{ fontFamily: "Manrope, sans-serif" }}>
              Industries
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_INDUSTRY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-slate-500 text-sm hover:text-slate-300 transition-colors"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-violet-900/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
            © {new Date().getFullYear()} Adrevnview. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/work" className="text-slate-600 text-sm hover:text-slate-400 transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>
              Case Studies
            </Link>
            <Link to="/privacy" className="text-slate-600 text-sm hover:text-slate-400 transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>
              Privacy Policy
            </Link>
            <Link to="/accessibility" className="text-slate-600 text-sm hover:text-slate-400 transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>
              Accessibility
            </Link>
            <Link to="/contact" className="text-slate-600 text-sm hover:text-slate-400 transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>
              Contact
            </Link>
            <Link to="/geo-report" className="text-slate-600 text-sm hover:text-slate-400 transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>
              GEO Report
            </Link>
            <a href="/sitemap.xml" className="text-slate-600 text-sm hover:text-slate-400 transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
