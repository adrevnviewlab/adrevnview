import { CLIENTS, getClientPath, isClientPath } from "@/lib/content/clients";
import { ORG, SITE_URL } from "./siteConfig";

type FaqItem = { question: string; answer: string };

const SERVICES = [
  "Custom Web Design",
  "Web Development & Integrations",
  "eCommerce Design & Development",
  "Branding & Brand Identity",
  "SEO & Digital Marketing",
  "Generative Engine Optimization (GEO)",
  "Website Redesign",
];

const CLIENT_PROJECTS = CLIENTS.map((client) => ({
  name: client.name,
  url: client.url,
  description: client.shortDescription,
  caseStudyUrl: `${SITE_URL}${getClientPath(client.slug)}`,
}));

const HOME_FAQ: FaqItem[] = [
  {
    question: "What is Adrevnview?",
    answer:
      "Adrevnview is a premium full-service digital agency specializing in custom web design, web development, branding, SEO, and Generative Engine Optimization (GEO) for B2B, B2C, and enterprise brands.",
  },
  {
    question: "What services does Adrevnview offer?",
    answer:
      "Adrevnview offers custom web design, full-stack development, eCommerce design, brand identity systems, SEO, digital marketing, website redesigns, and GEO — making brands discoverable in search engines and AI assistants.",
  },
  {
    question: "What is Generative Engine Optimization (GEO)?",
    answer:
      "GEO is the practice of structuring website content, metadata, and schema markup so AI assistants (ChatGPT, Perplexity, Gemini) can accurately understand, cite, and recommend your brand and services.",
  },
  {
    question: "Who does Adrevnview work with?",
    answer:
      "Adrevnview works with B2B SaaS companies, eCommerce brands, healthcare, legal, real estate, manufacturing, and enterprise organizations that need high-performance websites and measurable digital growth.",
  },
  {
    question: "How do I contact Adrevnview?",
    answer:
      "Contact Adrevnview at hello@adrevnview.com or (516) 555-0147. Request a free consultation at https://www.adrevnview.com/contact.",
  },
];

const NFC_FAQ: FaqItem[] = [
  {
    question: "What is the Adrevnview Google NFC Review Card?",
    answer:
      "It is a physical NFC and QR-enabled card that sends customers directly to your Google Business review page with one tap — no app required.",
  },
  {
    question: "How much does the Google NFC review card cost?",
    answer: "The card is a one-time purchase of $99 with free shipping and a lifetime guarantee.",
  },
  {
    question: "What phones work with the NFC review card?",
    answer:
      "All modern iPhones (XS and later) and Android phones from 2018 onwards. Older devices can scan the QR code on the back.",
  },
];

export const VISIBLE_HOME_FAQ: FaqItem[] = HOME_FAQ;

function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${SITE_URL}/#organization`,
    name: ORG.name,
    legalName: ORG.legalName,
    url: ORG.url,
    logo: ORG.logo,
    image: ORG.logo,
    description:
      "Premium web design agency delivering custom websites, branding, SEO, and Generative Engine Optimization for B2B, B2C, and enterprise brands.",
    email: ORG.email,
    telephone: ORG.phone,
    foundingDate: ORG.foundingDate,
    address: {
      "@type": "PostalAddress",
      ...ORG.address,
    },
    areaServed: ["United States", "Europe", "Global"],
    sameAs: ORG.sameAs,
    knowsAbout: ORG.knowsAbout,
    founder: {
      "@type": "Person",
      name: "Muneeb Ahmed",
      email: ORG.email,
      worksFor: { "@id": `${SITE_URL}/#organization` },
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: ORG.email,
      telephone: ORG.phone,
      availableLanguage: ["English"],
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Agency Services",
      itemListElement: SERVICES.map((name, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: {
          "@type": "Service",
          name,
          provider: { "@id": `${SITE_URL}/#organization` },
        },
      })),
    },
  };
}

function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: ORG.name,
    url: SITE_URL,
    description: "Premium web design agency — custom websites, SEO, and GEO.",
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

function webPageSchema(path: string, title: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}${path}#webpage`,
    url: `${SITE_URL}${path}`,
    name: title,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "[data-speakable='true']", "meta[name='description']"],
    },
  };
}

function faqSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

function portfolioSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Adrevnview Client Projects",
    description: "Selected websites and platforms designed and built by Adrevnview.",
    itemListElement: CLIENT_PROJECTS.map((project, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: project.name,
        url: project.caseStudyUrl,
        sameAs: project.url,
        description: project.description,
        creator: { "@id": `${SITE_URL}/#organization` },
      },
    })),
  };
}

function caseStudySchema(slug: string) {
  const client = CLIENTS.find((c) => c.slug === slug);
  if (!client) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}${getClientPath(slug)}#article`,
    headline: client.seoTitle,
    description: client.seoDescription,
    url: `${SITE_URL}${getClientPath(slug)}`,
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    about: {
      "@type": "Organization",
      name: client.name,
      url: client.url,
    },
    mentions: {
      "@type": "WebSite",
      name: client.name,
      url: client.url,
    },
    inLanguage: "en-US",
  };
}

function productSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}/googlenfc#product`,
    name: "Google NFC Review Card",
    description:
      "NFC and QR-enabled review card that sends customers directly to your Google Business review page. Pre-programmed, no app required.",
    brand: { "@type": "Organization", "@id": `${SITE_URL}/#organization` },
    offers: {
      "@type": "Offer",
      price: "99.00",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/googlenfc`,
      priceValidityDate: "2027-12-31",
    },
  };
}

export function getStructuredData(path: string, title: string, description: string) {
  const graphs = [
    organizationSchema(),
    websiteSchema(),
    webPageSchema(path, title, description),
    portfolioSchema(),
  ];

  if (path === "/") {
    graphs.push(faqSchema(HOME_FAQ));
  }

  if (path === "/googlenfc") {
    graphs.push(faqSchema(NFC_FAQ));
    graphs.push(productSchema());
  }

  if (isClientPath(path)) {
    const slug = path.replace(/^\//, "");
    const caseStudy = caseStudySchema(slug);
    if (caseStudy) graphs.push(caseStudy);
  }

  return {
    "@context": "https://schema.org",
    "@graph": graphs,
  };
}
