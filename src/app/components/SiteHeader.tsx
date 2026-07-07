import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { SpringButton, SpringNavLink } from "@/components/SpringButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MusicToggle } from "@/components/MusicToggle";
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent ${
        scrolled ? "bg-background/90 backdrop-blur-md border-border py-3" : "bg-transparent py-5"
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
                  className="flex items-center gap-1 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary/60"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  type="button"
                  className="flex items-center gap-1 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary/60"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {link.label}
                  {link.sub?.length ? <ChevronDown className="w-3.5 h-3.5 opacity-60" /> : null}
                </button>
              )}
              {link.sub?.length && activeDropdown === link.label ? (
                <div className="absolute top-full left-0 mt-1 w-52 bg-card border border-border rounded-xl shadow-2xl shadow-black/20 overflow-hidden border-blink-once">
                  {link.sub.map((s) => (
                    <Link
                      key={s.label}
                      to={s.href}
                      className="block w-full text-left px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
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
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            (512) 555-0147
          </a>
          <MusicToggle />
          <ThemeToggle />
          <SpringNavLink to="/contact" size="sm" className="rounded-full px-5 py-2.5 text-sm font-semibold" style={{ fontFamily: "Manrope, sans-serif" }}>
            Request a Quote
          </SpringNavLink>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <MusicToggle />
          <ThemeToggle />
          <button type="button" className="text-foreground" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="lg:hidden bg-card border-t border-border px-6 py-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
          {NAV_LINKS.map((link) =>
            link.sub?.length ? (
              <div key={link.label} className="mb-4">
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-2" style={{ fontFamily: "Inter, sans-serif" }}>
                  {link.label}
                </p>
                <div className="space-y-1 pl-2 border-l border-border">
                  {link.sub.map((s) => (
                    <Link
                      key={s.label}
                      to={s.href}
                      onClick={() => setOpen(false)}
                      className="block text-muted-foreground hover:text-foreground text-sm py-1.5"
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
                className="block text-muted-foreground hover:text-foreground text-base py-2"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {link.label}
              </Link>
            ) : null,
          )}
          <SpringNavLink to="/contact" onClick={() => setOpen(false)} className="w-full mt-4 rounded-full font-semibold" style={{ fontFamily: "Manrope, sans-serif" }}>
            Request a Quote
          </SpringNavLink>
        </div>
      ) : null}
    </nav>
  );
}
