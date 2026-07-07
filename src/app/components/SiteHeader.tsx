import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { NAV_LINKS } from "@/lib/content/navigation";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#06091a]/95 backdrop-blur-md border-b border-violet-900/30 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Logo />

        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => (link.sub?.length ? setActiveDropdown(link.label) : undefined)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {link.href ? (
                <Link
                  to={link.href}
                  className="flex items-center gap-1 px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors rounded-md hover:bg-white/5"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  type="button"
                  className="flex items-center gap-1 px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors rounded-md hover:bg-white/5"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {link.label}
                  {link.sub?.length ? <ChevronDown className="w-3.5 h-3.5 opacity-60" /> : null}
                </button>
              )}
              {link.sub?.length && activeDropdown === link.label ? (
                <div className="absolute top-full left-0 mt-1 w-52 bg-[#0d1128] border border-violet-900/30 rounded-xl shadow-2xl shadow-black/60 overflow-hidden">
                  {link.sub.map((s) => (
                    <Link
                      key={s.label}
                      to={s.href}
                      className="block w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-violet-900/30 transition-colors"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:5125550147"
            className="text-sm text-slate-400 hover:text-white transition-colors"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            (512) 555-0147
          </a>
          <Link
            to="/contact"
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold hover:from-violet-500 hover:to-indigo-500 transition-all shadow-lg shadow-violet-900/40"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Request a Quote
          </Link>
        </div>

        <button type="button" className="lg:hidden text-white" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open ? (
        <div className="lg:hidden bg-[#0d1128] border-t border-violet-900/20 px-6 py-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
          {NAV_LINKS.map((link) =>
            link.sub?.length ? (
              <div key={link.label} className="mb-4">
                <p className="text-slate-500 text-xs uppercase tracking-wider mb-2" style={{ fontFamily: "Inter, sans-serif" }}>
                  {link.label}
                </p>
                <div className="space-y-1 pl-2 border-l border-violet-900/30">
                  {link.sub.map((s) => (
                    <Link
                      key={s.label}
                      to={s.href}
                      onClick={() => setOpen(false)}
                      className="block text-slate-300 hover:text-white text-sm py-1.5"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : link.href ? (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setOpen(false)}
                className="block text-slate-300 hover:text-white text-base py-2"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {link.label}
              </Link>
            ) : null,
          )}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-4 block w-full text-center px-5 py-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Request a Quote
          </Link>
        </div>
      ) : null}
    </nav>
  );
}
