import { Link, useParams } from "react-router";
import { ArrowRight, ExternalLink } from "lucide-react";
import { SiteLayout } from "@/app/components/SiteLayout";
import { SeoHead } from "@/components/seo/SeoHead";
import { SpringCard } from "@/components/SpringCard";
import { SpringLink } from "@/components/SpringButton";
import { PAGES } from "@/lib/seo/siteConfig";
import { CLIENTS, getClientPath, PORTFOLIO_TABS, type ClientCategory } from "@/lib/content/clients";
import {
  WORK_CATEGORY_META,
  WORK_CATEGORY_SLUGS,
  workCategoryFromSlug,
  type WorkCategorySlug,
} from "@/lib/content/workCategories";

function WorkPortfolio({ categoryFilter }: { categoryFilter: ClientCategory | null }) {
  const tabs = categoryFilter ? [categoryFilter] : PORTFOLIO_TABS;

  return (
    <>
      {!categoryFilter ? (
        <div className="flex flex-wrap gap-2 mb-12">
          {(Object.keys(WORK_CATEGORY_SLUGS) as WorkCategorySlug[]).map((slug) => (
            <SpringLink
              key={slug}
              to={slug === "featured" ? "/work" : `/work/${slug}`}
              className="px-4 py-2 rounded-full border border-border text-sm text-muted-foreground hover:text-foreground hover:border-sky-500/40"
            >
              {WORK_CATEGORY_META[slug].headline.replace(" Client Projects", "").replace("Featured ", "Featured")}
            </SpringLink>
          ))}
        </div>
      ) : null}

      {tabs.map((category) => {
        const clients = CLIENTS.filter((c) => c.category === category);
        if (clients.length === 0) return null;

        return (
          <section key={category} className="mb-16" id={category.toLowerCase()}>
            {!categoryFilter ? (
              <h2 className="text-2xl font-bold text-foreground mb-8" style={{ fontFamily: "Manrope, sans-serif" }}>
                {category === "Featured" ? "Featured Projects" : `${category} Projects`}
              </h2>
            ) : null}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {clients.map((client) => (
                <SpringCard
                  key={client.slug}
                  className="group rounded-2xl overflow-hidden border border-sky-900/20 hover:border-sky-600/40 transition-all bg-card"
                >
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={client.image}
                      alt={`${client.name} — ${client.tag}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                    <div className="absolute top-4 left-4">
                      <span
                        className="px-3 py-1 rounded-full bg-sky-600/80 backdrop-blur-sm text-white text-xs font-semibold"
                        style={{ fontFamily: "Manrope, sans-serif" }}
                      >
                        {client.tag}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: "Manrope, sans-serif" }}>
                      {client.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{client.shortDescription}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {client.services.slice(0, 3).map((service) => (
                        <span
                          key={service}
                          className="px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground text-xs border border-border"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Link
                        to={getClientPath(client.slug)}
                        className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-sky-600 to-cyan-600 text-white text-sm font-semibold hover:from-sky-500 hover:to-cyan-500 transition-all"
                        style={{ fontFamily: "Manrope, sans-serif" }}
                      >
                        Read Case Study <ArrowRight className="w-4 h-4" />
                      </Link>
                      <a
                        href={client.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2 rounded-full border border-sky-500/30 text-foreground/80 text-sm font-semibold hover:bg-sky-900/20 transition-all"
                        style={{ fontFamily: "Manrope, sans-serif" }}
                      >
                        Visit Site <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </SpringCard>
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}

export default function Work() {
  const { category: categorySlug } = useParams<{ category?: string }>();
  const categoryFilter = categorySlug ? workCategoryFromSlug(categorySlug) : null;

  if (categorySlug && !categoryFilter) {
    return (
      <SiteLayout mainClassName="px-6 py-20 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Portfolio category not found</h1>
        <Link to="/work" className="text-sky-400 hover:text-sky-300">
          View all case studies
        </Link>
      </SiteLayout>
    );
  }

  const meta = categorySlug && categoryFilter
    ? WORK_CATEGORY_META[categorySlug as WorkCategorySlug]
    : {
        title: PAGES.work.title,
        description: PAGES.work.description,
        headline: "Case Studies & Client Projects",
      };

  const path = categorySlug ? `/work/${categorySlug}` : PAGES.work.path;

  return (
    <SiteLayout mainClassName="px-6 py-12">
      <SeoHead title={meta.title} description={meta.description} path={path} />

      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <p className="text-sky-400 text-sm font-semibold tracking-widest uppercase mb-4">Client Work</p>
          <h1
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-6"
            style={{ fontFamily: "Manrope, sans-serif" }}
            data-speakable="true"
          >
            {meta.headline}
          </h1>
          <p className="text-foreground/80 text-lg leading-relaxed max-w-3xl" data-speakable="true">
            {categoryFilter
              ? meta.description
              : "Explore the websites, platforms, and digital experiences Adrevnview has designed and built for B2B SaaS, eCommerce, and enterprise brands. Each project ships with SEO and GEO foundations built in from day one."}
          </p>
          {categoryFilter ? (
            <Link to="/work" className="inline-block mt-4 text-sky-400 text-sm hover:text-sky-300">
              ← View all case studies
            </Link>
          ) : null}
        </div>

        <WorkPortfolio categoryFilter={categoryFilter} />
      </div>
    </SiteLayout>
  );
}
