import { Link, useParams } from "react-router";
import { SiteLayout } from "@/app/components/SiteLayout";
import { SeoHead } from "@/components/seo/SeoHead";
import { SpringLink } from "@/components/SpringButton";
import { BLOG_BY_SLUG } from "@/lib/content/blog";

export default function BlogPost() {
  const { slug = "" } = useParams();
  const post = BLOG_BY_SLUG[slug];

  if (!post) {
    return (
      <SiteLayout mainClassName="px-6 py-20 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Article not found</h1>
        <Link to="/blog" className="text-sky-400 hover:text-sky-300">
          ← Back to blog
        </Link>
      </SiteLayout>
    );
  }

  const path = `/blog/${slug}`;

  return (
    <SiteLayout mainClassName="px-6 py-12">
      <SeoHead title={post.seoTitle} description={post.seoDescription} path={path} />

      <article className="max-w-3xl mx-auto">
        <Link to="/blog" className="text-sky-400 text-sm hover:text-sky-300 mb-6 inline-block">
          ← All articles
        </Link>
        <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-muted-foreground">
          <span className="px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">{post.category}</span>
          <span>{post.date}</span>
          <span>{post.readTime}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 leading-tight" style={{ fontFamily: "Manrope, sans-serif" }}>
          {post.title}
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed mb-10" data-geo-chunk="summary">
          {post.excerpt}
        </p>
        <div className="space-y-5 text-foreground/85 leading-relaxed">
          {post.body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-12 rounded-2xl border border-border bg-card p-8">
          <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "Manrope, sans-serif" }}>
            Want help implementing this?
          </h2>
          <p className="text-muted-foreground text-sm mb-4">Talk with our Long Island team about your website, SEO, or GEO goals.</p>
          <SpringLink to="/contact" className="inline-flex px-6 py-3 rounded-full bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-semibold text-sm">
            Request a consultation
          </SpringLink>
        </div>
      </article>
    </SiteLayout>
  );
}
