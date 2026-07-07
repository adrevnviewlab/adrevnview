export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  seoTitle: string;
  seoDescription: string;
  body: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "geo-vs-seo-2026",
    title: "GEO vs SEO: What Long Island Brands Need in 2026",
    excerpt:
      "Search is changing fast. Here's how Generative Engine Optimization complements traditional SEO so AI assistants can cite your business accurately.",
    category: "GEO",
    date: "2026-06-12",
    readTime: "6 min read",
    seoTitle: "GEO vs SEO for Long Island Brands | Adrevnview Blog",
    seoDescription:
      "Learn how Generative Engine Optimization (GEO) works alongside SEO to help Long Island and New York brands get discovered in Google and AI assistants.",
    body: [
      "Traditional SEO still matters — rankings, backlinks, and technical health remain foundations for organic growth. But AI assistants now answer buyer questions before users ever click a result.",
      "GEO (Generative Engine Optimization) structures your content, schema, and llms.txt so models like ChatGPT, Perplexity, and Gemini can extract accurate facts about your services, location, and differentiators.",
      "For Long Island service businesses and B2B brands, the winning playbook combines both: strong on-page SEO for Google, plus extractable summaries, FAQ schema, and clear entity signals for AI citation.",
    ],
  },
  {
    slug: "conversion-focused-web-design",
    title: "5 Conversion Patterns We Use on Every Homepage",
    excerpt:
      "Premium design should drive pipeline, not just win awards. These layout patterns consistently lift consultation requests for B2B sites.",
    category: "Web Design",
    date: "2026-05-28",
    readTime: "5 min read",
    seoTitle: "Conversion-Focused Web Design Patterns | Adrevnview Blog",
    seoDescription:
      "Five homepage conversion patterns Adrevnview uses on B2B and enterprise websites to turn visitors into qualified leads.",
    body: [
      "Hero clarity beats cleverness: one headline, one audience, one primary CTA above the fold.",
      "Social proof near the decision point — logos, ratings, and case study links placed where hesitation happens.",
      "Service cards that speak outcomes, not deliverables. Buyers care about pipeline, revenue, and risk reduction.",
      "FAQ sections structured for humans and machines — they reduce sales friction and feed GEO-ready extractable answers.",
      "Persistent contact paths: header phone, sticky mobile CTA, and a low-friction quote form on every key page.",
    ],
  },
  {
    slug: "shopify-speed-checklist",
    title: "Shopify Speed Checklist for eCommerce Brands",
    excerpt:
      "Slow stores lose carts. Use this technical checklist before your next campaign push.",
    category: "eCommerce",
    date: "2026-05-10",
    readTime: "4 min read",
    seoTitle: "Shopify Performance Checklist | Adrevnview Blog",
    seoDescription:
      "A practical Shopify performance checklist — image optimization, app audits, and theme hygiene for faster storefronts.",
    body: [
      "Audit third-party apps monthly. Unused scripts are the most common cause of mobile slowdowns on Shopify stores.",
      "Serve hero and collection images in modern formats with explicit dimensions to prevent layout shift.",
      "Limit custom fonts to two weights and preload only what's needed for the first screen.",
      "Use collection-level metadata and internal links so Google understands category intent without duplicate thin pages.",
    ],
  },
  {
    slug: "local-seo-long-island",
    title: "Local SEO Playbook for Long Island Businesses",
    excerpt:
      "From Garden City to Hicksville — how to rank in the NYC metro without competing on generic national keywords.",
    category: "SEO",
    date: "2026-04-22",
    readTime: "7 min read",
    seoTitle: "Local SEO for Long Island Businesses | Adrevnview Blog",
    seoDescription:
      "Local SEO strategies for Long Island businesses — Google Business Profile, location pages, reviews, and neighborhood keyword targeting.",
    body: [
      "Build location-specific landing pages when you serve multiple towns — each page should have unique copy, testimonials, and contact details.",
      "Align NAP (name, address, phone) across your website, Google Business Profile, and major directories.",
      "Review velocity matters for local pack rankings. NFC review cards and post-service email flows help sustainable growth.",
      "Publish content that answers hyper-local questions: service area pages, commute-friendly scheduling, and community involvement.",
    ],
  },
];

export const BLOG_BY_SLUG = Object.fromEntries(BLOG_POSTS.map((p) => [p.slug, p])) as Record<string, BlogPost>;

export function getBlogPath(slug: string): string {
  return `/blog/${slug}`;
}
