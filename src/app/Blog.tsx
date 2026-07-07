import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/app/components/SiteLayout";
import { SeoHead } from "@/components/seo/SeoHead";
import { SpringCardLink } from "@/components/SpringCard";
import { BLOG_POSTS, getBlogPath } from "@/lib/content/blog";
import { PAGES } from "@/lib/seo/siteConfig";

export default function Blog() {
  return (
    <SiteLayout mainClassName="px-6 py-12">
      <SeoHead
        title="Blog — Web Design, SEO & GEO Insights | Adrevnview"
        description="Articles on custom web design, SEO, Generative Engine Optimization (GEO), eCommerce, and digital marketing for growth-focused brands."
        path="/blog"
      />

      <div className="max-w-5xl mx-auto">
        <p className="text-sky-400 text-sm font-semibold tracking-widest uppercase mb-4">Insights</p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6" style={{ fontFamily: "Manrope, sans-serif" }}>
          Adrevnview Blog
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed mb-12 max-w-3xl" data-geo-chunk="summary">
          Practical guidance on web design, SEO, GEO, and eCommerce — written for marketing leaders and founders on Long Island and beyond.
        </p>

        <div className="grid gap-6">
          {BLOG_POSTS.map((post) => (
            <SpringCardLink
              key={post.slug}
              to={getBlogPath(post.slug)}
              className="group block rounded-2xl border border-border bg-card p-7 hover:border-sky-500/40 transition-all"
            >
              <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-muted-foreground">
                <span className="px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">{post.category}</span>
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2 group-hover:text-sky-300 transition-colors" style={{ fontFamily: "Manrope, sans-serif" }}>
                {post.title}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{post.excerpt}</p>
              <span className="inline-flex items-center gap-2 text-sky-400 text-sm font-semibold">
                Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </SpringCardLink>
          ))}
        </div>

        <p className="text-muted-foreground text-sm mt-10">
          Ready to start a project?{" "}
          <Link to={PAGES.contact.path} className="text-sky-400 hover:text-sky-300">
            Contact Adrevnview
          </Link>
        </p>
      </div>
    </SiteLayout>
  );
}
