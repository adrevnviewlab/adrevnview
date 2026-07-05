import { Link } from "react-router";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { SeoHead } from "@/components/seo/SeoHead";
import { Logo } from "@/components/Logo";
import { PAGES } from "@/lib/seo/siteConfig";
import { CLIENTS, getClientPath, PORTFOLIO_TABS } from "@/lib/content/clients";

export default function Work() {
  return (
    <div className="min-h-screen bg-[#06091a] text-white" style={{ fontFamily: "Inter, sans-serif" }}>
      <SeoHead title={PAGES.work.title} description={PAGES.work.description} path={PAGES.work.path} />

      <header className="border-b border-violet-900/20 bg-[#06091a]/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <Logo iconClassName="h-7 w-6" textClassName="h-5 w-auto" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-14">
          <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-4">Client Work</p>
          <h1
            className="text-4xl md:text-5xl font-extrabold text-white mb-6"
            style={{ fontFamily: "Manrope, sans-serif" }}
            data-speakable="true"
          >
            Case Studies &amp; Client Projects
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-3xl" data-speakable="true">
            Explore the websites, platforms, and digital experiences Adrevnview has designed and built for B2B SaaS,
            eCommerce, and enterprise brands. Each project ships with SEO and GEO foundations built in from day one.
          </p>
        </div>

        {PORTFOLIO_TABS.map((category) => {
          const clients = CLIENTS.filter((c) => c.category === category);
          if (clients.length === 0) return null;

          return (
            <section key={category} className="mb-16" id={category.toLowerCase()}>
              <h2 className="text-2xl font-bold text-white mb-8" style={{ fontFamily: "Manrope, sans-serif" }}>
                {category === "Featured" ? "Featured Projects" : `${category} Projects`}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {clients.map((client) => (
                  <article
                    key={client.slug}
                    className="group rounded-2xl overflow-hidden border border-violet-900/20 hover:border-violet-600/40 transition-all bg-[#0d1128]"
                  >
                    <div className="relative overflow-hidden h-52">
                      <img
                        src={client.image}
                        alt={`${client.name} — ${client.tag}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1128] via-transparent to-transparent opacity-80" />
                      <div className="absolute top-4 left-4">
                        <span
                          className="px-3 py-1 rounded-full bg-violet-600/80 backdrop-blur-sm text-white text-xs font-semibold"
                          style={{ fontFamily: "Manrope, sans-serif" }}
                        >
                          {client.tag}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "Manrope, sans-serif" }}>
                        {client.name}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-4">{client.shortDescription}</p>
                      <div className="flex flex-wrap gap-2 mb-5">
                        {client.services.slice(0, 3).map((service) => (
                          <span
                            key={service}
                            className="px-2.5 py-1 rounded-full bg-violet-900/30 text-violet-300 text-xs"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <Link
                          to={getClientPath(client.slug)}
                          className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold hover:from-violet-500 hover:to-indigo-500 transition-all"
                          style={{ fontFamily: "Manrope, sans-serif" }}
                        >
                          Read Case Study <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a
                          href={client.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-2 rounded-full border border-violet-500/30 text-slate-300 text-sm font-semibold hover:bg-violet-900/20 transition-all"
                          style={{ fontFamily: "Manrope, sans-serif" }}
                        >
                          Visit Site <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
