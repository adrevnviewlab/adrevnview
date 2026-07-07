import type { ClientCategory } from "@/lib/content/clients";

export const WORK_CATEGORY_SLUGS = {
  b2b: "B2B",
  b2c: "B2C",
  ecommerce: "eCommerce",
  featured: "Featured",
} as const satisfies Record<string, ClientCategory>;

export type WorkCategorySlug = keyof typeof WORK_CATEGORY_SLUGS;

export function workCategoryFromSlug(slug: string): ClientCategory | null {
  return WORK_CATEGORY_SLUGS[slug as WorkCategorySlug] ?? null;
}

export function workCategorySlug(category: ClientCategory): WorkCategorySlug {
  const entry = Object.entries(WORK_CATEGORY_SLUGS).find(([, value]) => value === category);
  return (entry?.[0] ?? "featured") as WorkCategorySlug;
}

export const WORK_CATEGORY_META: Record<
  WorkCategorySlug,
  { title: string; description: string; headline: string }
> = {
  featured: {
    headline: "Featured Client Projects",
    title: "Featured Case Studies | Adrevnview",
    description:
      "Highlighted Adrevnview client projects — SaaS platforms, brand ecosystems, and high-impact digital launches.",
  },
  b2b: {
    headline: "B2B Client Projects",
    title: "B2B Case Studies & Web Design | Adrevnview",
    description:
      "B2B web design and development case studies — SaaS marketing sites, enterprise platforms, and conversion-focused experiences.",
  },
  b2c: {
    headline: "B2C Client Projects",
    title: "B2C Case Studies & Brand Websites | Adrevnview",
    description:
      "B2C brand websites and digital experiences built for consumer trust, storytelling, and measurable engagement.",
  },
  ecommerce: {
    headline: "eCommerce Client Projects",
    title: "eCommerce Case Studies & Shopify Projects | Adrevnview",
    description:
      "eCommerce design and development portfolio — Shopify stores, retail brands, and conversion-optimized shopping experiences.",
  },
};
