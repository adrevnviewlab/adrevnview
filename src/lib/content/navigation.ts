import { getServicePath, NAV_SERVICE_LINKS } from "@/lib/content/services";

export const INDUSTRY_SLUGS: Record<string, string> = {
  Healthcare: "healthcare",
  "eCommerce/Retail": "ecommerce",
  Manufacturing: "manufacturing",
  "Real Estate": "real-estate",
  Legal: "legal",
  "Financial Services": "financial",
  "Technology/SaaS": "technology",
};

export type NavSubLink = { label: string; href: string };

export type NavLink = {
  label: string;
  href?: string;
  sub?: NavSubLink[];
};

export const NAV_LINKS: NavLink[] = [
  {
    label: "Services",
    sub: NAV_SERVICE_LINKS.map((s) => ({ label: s.label, href: getServicePath(s.slug) })),
  },
  {
    label: "Work",
    sub: [
      { label: "Case Studies", href: "/work" },
      { label: "B2B Projects", href: "/work#b2b" },
      { label: "B2C Projects", href: "/work#b2c" },
      { label: "eCommerce Projects", href: "/work#ecommerce" },
    ],
  },
  {
    label: "Industries",
    sub: Object.entries(INDUSTRY_SLUGS).map(([label, slug]) => ({
      label,
      href: `/industries/${slug}`,
    })),
  },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/work" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_INDUSTRY_LINKS = Object.entries(INDUSTRY_SLUGS).map(([label, slug]) => ({
  label,
  href: `/industries/${slug}`,
}));
