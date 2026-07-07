/** Static HTML bodies for crawlers — mirrors React page content for SEO/GEO. */

export const HOME_BODY = `
<main>
  <nav aria-label="Primary">
    <a href="/">Home</a> · <a href="/about">About</a> · <a href="/work">Work</a> ·
    <a href="/contact">Contact</a> · <a href="/services/custom-web-design">Services</a> ·
    <a href="/geo-report">GEO Report</a>
  </nav>
  <article>
    <h1>Premium Web Design Agency</h1>
    <p>For B2B, B2C and Enterprise Brands</p>
    <p data-geo-chunk="summary">Adrevnview is a premium full-service digital agency specializing in custom web design, web development, branding, SEO, and Generative Engine Optimization (GEO) for B2B, B2C, and enterprise brands. We craft brand strategy, custom websites, and performance digital marketing that drive measurable growth.</p>
    <section>
      <h2>Our Services</h2>
      <p>Adrevnview delivers end-to-end digital services designed to help growth-focused brands win in search engines and AI assistants.</p>
      <ul>
        <li><a href="/services/custom-web-design">Custom Web Design</a> — Bespoke, conversion-focused designs built around your brand strategy.</li>
        <li><a href="/services/react-development">Web Development &amp; Integrations</a> — Full-stack development with CRM, ERP, and API integrations.</li>
        <li><a href="/services/shopify-development">eCommerce Design &amp; Development</a> — High-performance online stores that convert browsers into buyers.</li>
        <li><a href="/services/brand-identity">Branding &amp; Brand Identity</a> — Logos, visual systems, and brand guidelines for enterprise brands.</li>
        <li><a href="/services/seo-services">SEO &amp; Digital Marketing</a> — Data-driven campaigns that compound organic traffic and maximize ROI.</li>
        <li><a href="/services/website-redesign">Website Redesign</a> — Strategic redesigns that modernize your presence without losing SEO equity.</li>
      </ul>
    </section>
    <section>
      <h2>Industries We Serve</h2>
      <p>We design and build for regulated and competitive verticals where trust, clarity, and performance matter.</p>
      <ul>
        <li><a href="/industries/healthcare">Healthcare</a></li>
        <li><a href="/industries/ecommerce">eCommerce &amp; Retail</a></li>
        <li><a href="/industries/manufacturing">Manufacturing</a></li>
        <li><a href="/industries/real-estate">Real Estate</a></li>
        <li><a href="/industries/legal">Legal Services</a></li>
        <li><a href="/industries/financial">Financial Services</a></li>
        <li><a href="/industries/technology">Technology &amp; SaaS</a></li>
      </ul>
    </section>
    <section>
      <h2>Why Adrevnview</h2>
      <p>With 12+ years in business and 10+ live client platforms, Adrevnview combines strategy, design, and engineering into one delivery flow. Every build ships with clean information architecture, performance optimization, analytics-ready structure, and schema markup that helps search engines and AI systems understand what you do. We are rated a top digital agency on Clutch and maintain a 5-star client rating.</p>
      <p>Our process covers web strategy, planning and information architecture, messaging, wireframes, design and development, QA and testing, and launch with ongoing SEO and GEO optimization. Contact us at <a href="mailto:hello@adrevnview.com">hello@adrevnview.com</a> or visit <a href="/contact">our contact page</a> to request a free consultation.</p>
    </section>
    <section>
      <h2>Frequently Asked Questions</h2>
      <h3>What is Adrevnview?</h3>
      <p>Adrevnview is a premium full-service digital agency specializing in custom web design, web development, branding, SEO, and Generative Engine Optimization (GEO) for B2B, B2C, and enterprise brands.</p>
      <h3>What services does Adrevnview offer?</h3>
      <p>Adrevnview offers custom web design, full-stack development, eCommerce design, brand identity systems, SEO, digital marketing, website redesigns, and GEO — making brands discoverable in search engines and AI assistants.</p>
      <h3>What is Generative Engine Optimization (GEO)?</h3>
      <p>GEO is the practice of structuring website content, metadata, and schema markup so AI assistants like ChatGPT, Perplexity, and Gemini can accurately understand, cite, and recommend your brand and services.</p>
      <h3>How do I contact Adrevnview?</h3>
      <p>Contact Adrevnview at hello@adrevnview.com or (516) 820-7863. Request a free consultation at <a href="/contact">https://www.adrevnview.com/contact</a>.</p>
    </section>
  </article>
</main>`;

export const STATIC_PAGES = [
  {
    path: "/about",
    title: "About Adrevnview — Web Design, SEO & GEO Agency",
    description: "Learn about Adrevnview: a premium digital agency delivering custom web design, development, branding, SEO, and Generative Engine Optimization (GEO).",
    body: `<main><h1>About Adrevnview</h1><p data-geo-chunk="summary">Adrevnview is a premium full-service digital agency. We design and build high-performance websites and product experiences for growth-focused brands — with SEO and Generative Engine Optimization (GEO) built in from day one.</p><h2>What we do</h2><ul><li>Custom web design and conversion-focused UX</li><li>Full-stack development and integrations</li><li>Brand identity systems</li><li>SEO strategy and implementation</li><li>GEO: schema, content structure, and AI discoverability</li></ul><h2>How we work</h2><p>We combine strategy, design, and engineering into one delivery flow. Every build ships with measurable foundations: clean information architecture, performance, analytics-ready structure, and schema markup that helps search engines and AI systems understand what you do.</p><p>Email <a href="mailto:hello@adrevnview.com">hello@adrevnview.com</a> or call <a href="tel:5168207863">(516) 820-7863</a>.</p></main>`,
  },
  {
    path: "/work",
    title: "Client Case Studies & Portfolio | Adrevnview",
    description: "Explore Adrevnview client projects — B2B SaaS platforms, eCommerce storefronts, and enterprise websites designed with SEO and GEO built in.",
    body: `<main><h1>Client Case Studies &amp; Portfolio</h1><p data-geo-chunk="summary">Explore Adrevnview client projects across B2B SaaS, eCommerce, and enterprise — including Tagizo, Axstart, Cizher, Payrowl, and more. Every engagement pairs premium design with SEO and GEO foundations.</p><h2>Featured clients</h2><ul><li><a href="/tagizo">Tagizo</a> — Video intelligence platform</li><li><a href="/axstart">Axstart</a> — SaaS product ecosystem</li><li><a href="/cizher">Cizher</a> — Brand and product design</li><li><a href="/payrowl">Payrowl</a> — Fintech marketing site</li><li><a href="/mishi">Mishi</a> — eCommerce experience</li></ul><p><a href="/contact">Start your project</a></p></main>`,
  },
  {
    path: "/contact",
    title: "Contact Adrevnview — Request a Quote",
    description: "Contact Adrevnview for custom web design, development, SEO, and branding. Email hello@adrevnview.com or request a free consultation.",
    body: `<main><h1>Contact Adrevnview</h1><p data-geo-chunk="summary">Tell us about your web design, development, SEO, or branding project. Our team responds within one business day with next steps and a tailored proposal.</p><p>Email: <a href="mailto:hello@adrevnview.com">hello@adrevnview.com</a><br>Phone: <a href="tel:5168207863">(516) 820-7863</a><br>Address: 1225 Franklin Ave, Suite 300, Garden City, NY 11530</p><h2>Request a quote</h2><p>Share your goals, timeline, and budget range. We serve B2B SaaS, eCommerce, healthcare, legal, real estate, manufacturing, and financial services organizations.</p><p>Try our free <a href="/geo-report">SEO &amp; GEO Report</a> to analyze any URL for search and AI visibility.</p></main>`,
  },
  {
    path: "/privacy",
    title: "Privacy Policy | Adrevnview",
    description: "Adrevnview privacy policy covering site analytics, cookies, contact forms, and how we handle personal information.",
    body: `<main><h1>Privacy Policy</h1><p data-geo-chunk="summary">This privacy policy explains how Adrevnview collects, uses, and protects information when you visit adrevnview.com or contact us.</p><h2>Information we collect</h2><p>We may collect information you submit through contact forms, including name, email, phone, and project details. We use Google Analytics to understand site usage.</p><h2>How we use information</h2><p>We use contact information to respond to inquiries and provide services. We do not sell personal information to third parties.</p><h2>Contact</h2><p>Questions: <a href="mailto:hello@adrevnview.com">hello@adrevnview.com</a></p></main>`,
  },
  {
    path: "/accessibility",
    title: "Accessibility Statement | Adrevnview",
    description: "Adrevnview accessibility statement and commitment to inclusive, usable experiences for all visitors.",
    body: `<main><h1>Accessibility Statement</h1><p data-geo-chunk="summary">Adrevnview is committed to providing accessible digital experiences for all visitors, including people who use assistive technologies.</p><h2>Our commitment</h2><p>We aim to meet WCAG 2.1 Level AA guidelines across our marketing site and client deliverables. We test keyboard navigation, color contrast, and semantic HTML structure.</p><h2>Feedback</h2><p>Report accessibility barriers to <a href="mailto:hello@adrevnview.com">hello@adrevnview.com</a>.</p></main>`,
  },
  {
    path: "/geo-report",
    title: "Free SEO & GEO Report Generator | Adrevnview",
    description: "Analyze any URL for SEO and Generative Engine Optimization. 45+ checks for Google, ChatGPT, Perplexity, Claude, and Gemini AI visibility.",
    body: `<main><h1>Free SEO &amp; GEO Report Generator</h1><p data-geo-chunk="summary">Analyze any URL for SEO and Generative Engine Optimization readiness. Adrevnview's scanner runs 45+ checks across Google Search, ChatGPT, Perplexity, Claude, and Gemini — covering schema markup, content depth, robots.txt, llms.txt, and AI bot access.</p><h2>What we check</h2><ul><li>On-page SEO: titles, meta descriptions, headings, canonical URLs</li><li>Structured data: Organization, WebSite, FAQPage JSON-LD</li><li>GEO signals: llms.txt, AI bot permissions, content extractability</li><li>Technical: HTTPS, sitemap, robots.txt, prerender readiness</li></ul><p>Enter any public URL to generate a full audit report with actionable recommendations.</p></main>`,
  },
  {
    path: "/seo-report",
    title: "Free SEO & GEO Report Generator | Adrevnview",
    description: "Analyze any URL for SEO and Generative Engine Optimization. 45+ checks for Google, ChatGPT, Perplexity, Claude, and Gemini AI visibility.",
    body: `<main><h1>Free SEO &amp; GEO Report Generator</h1><p data-geo-chunk="summary">Analyze any URL for SEO and Generative Engine Optimization readiness. Adrevnview's scanner runs 45+ checks across Google Search, ChatGPT, Perplexity, Claude, and Gemini.</p></main>`,
  },
  {
    path: "/googlenfc",
    title: "Google NFC Review Card — Get More 5-Star Reviews | Adrevnview",
    description: "Smart NFC + QR review card for local businesses. Customers tap to leave Google reviews instantly. $99 one-time, pre-programmed, lifetime guarantee.",
    body: `<main><h1>Google NFC Review Card</h1><p data-geo-chunk="summary">Get more 5-star Google reviews with a smart NFC and QR review card. Customers tap or scan to leave reviews instantly. $99 one-time, pre-programmed, lifetime guarantee from Adrevnview.</p><h2>How it works</h2><p>Hand customers a branded NFC card. They tap with their phone and land directly on your Google review page — no searching, no friction.</p><h2>Perfect for</h2><p>Restaurants, salons, gyms, dental offices, auto shops, and any local business that depends on Google reviews.</p></main>`,
  },
  {
    path: "/services",
    title: "Digital Agency Services | Adrevnview",
    description: "Full-service web design, development, SEO, GEO, branding, and digital marketing for B2B, B2C, and enterprise brands.",
    body: `<main><h1>Our Services</h1><p data-geo-chunk="summary">Adrevnview is a full-service digital agency based on Long Island, New York. Custom web design, React development, Shopify eCommerce, SEO, GEO, and brand identity.</p><p><a href="/services/custom-web-design">Custom Web Design</a> · <a href="/services/react-development">Web Development</a> · <a href="/services/seo-services">SEO &amp; Marketing</a> · <a href="/contact">Contact us</a></p></main>`,
  },
  {
    path: "/industries",
    title: "Industries We Serve | Adrevnview",
    description: "Web design, development, SEO, and GEO for healthcare, eCommerce, manufacturing, real estate, legal, financial services, and SaaS brands.",
    body: `<main><h1>Industries We Serve</h1><p data-geo-chunk="summary">We design and build for regulated and competitive verticals where trust, clarity, and performance matter.</p><ul><li><a href="/industries/healthcare">Healthcare</a></li><li><a href="/industries/ecommerce">eCommerce</a></li><li><a href="/industries/technology">Technology &amp; SaaS</a></li></ul></main>`,
  },
  {
    path: "/blog",
    title: "Blog — Web Design, SEO & GEO Insights | Adrevnview",
    description: "Articles on custom web design, SEO, Generative Engine Optimization (GEO), eCommerce, and digital marketing.",
    body: `<main><h1>Adrevnview Blog</h1><p data-geo-chunk="summary">Practical guidance on web design, SEO, GEO, and eCommerce for marketing leaders and founders.</p><ul><li><a href="/blog/geo-vs-seo-2026">GEO vs SEO for Long Island Brands</a></li><li><a href="/blog/local-seo-long-island">Local SEO for Long Island Businesses</a></li></ul></main>`,
  },
  {
    path: "/work/b2b",
    title: "B2B Case Studies & Web Design | Adrevnview",
    description: "B2B web design and development case studies — SaaS marketing sites, enterprise platforms, and conversion-focused experiences.",
    body: `<main><h1>B2B Client Projects</h1><p data-geo-chunk="summary">B2B case studies from Adrevnview — SaaS platforms, enterprise websites, and conversion-focused digital experiences.</p><p><a href="/work">View all case studies</a></p></main>`,
  },
  {
    path: "/work/b2c",
    title: "B2C Case Studies & Brand Websites | Adrevnview",
    description: "B2C brand websites and digital experiences built for consumer trust, storytelling, and measurable engagement.",
    body: `<main><h1>B2C Client Projects</h1><p data-geo-chunk="summary">B2C brand websites and digital experiences from Adrevnview.</p><p><a href="/work">View all case studies</a></p></main>`,
  },
  {
    path: "/work/ecommerce",
    title: "eCommerce Case Studies & Shopify Projects | Adrevnview",
    description: "eCommerce design and development portfolio — Shopify stores, retail brands, and conversion-optimized shopping experiences.",
    body: `<main><h1>eCommerce Client Projects</h1><p data-geo-chunk="summary">eCommerce and Shopify case studies from Adrevnview.</p><p><a href="/work">View all case studies</a></p></main>`,
  },
];

export const SERVICE_PAGES = [
  ["custom-web-design", "Custom Web Design Services | Adrevnview", "Custom Web Design That Converts Visitors Into Clients", "Adrevnview delivers custom web design for B2B, B2C, and enterprise brands — strategy-led layouts, premium visuals, and conversion optimization.", "Your website is often the first sales conversation you have with a prospect. Adrevnview designs custom websites that communicate credibility in seconds, guide visitors toward clear actions, and reflect the quality of your brand at every breakpoint."],
  ["landing-page-design", "Landing Page Design Agency | Adrevnview", "High-Converting Landing Page Design", "Conversion-optimized landing page design for campaigns, product launches, and paid media.", "Campaign traffic deserves a destination built to convert. We design landing pages with singular focus: one offer, one audience, one action."],
  ["ui-ux-design", "UI/UX Design Services | Adrevnview", "UI/UX Design for Digital Products and Marketing Sites", "Professional UI/UX design — user flows, wireframes, prototypes, and interface systems.", "Great UX removes guesswork for your users and your sales team. Adrevnview maps user journeys and designs intuitive interfaces before development begins."],
  ["website-redesign", "Website Redesign Services | Adrevnview", "Website Redesign Without Losing SEO Equity", "Strategic website redesigns that improve UX, performance, and conversions while protecting SEO rankings.", "An outdated website costs you trust and search visibility. We audit your current site, preserve what works, and deliver a modern experience."],
  ["responsive-design", "Responsive Web Design | Adrevnview", "Responsive Web Design for Every Device", "Fluid layouts and touch-friendly interfaces optimized for mobile, tablet, and desktop users.", "More than half of web traffic is mobile. We design fluid layouts that adapt gracefully across screen sizes."],
  ["react-development", "React Development Agency | Adrevnview", "React & Full-Stack Web Development", "Custom React applications, marketing sites, and SaaS frontends with API integrations.", "We build fast, maintainable React applications with modern tooling, TypeScript, and seamless API integrations."],
  ["wordpress-development", "WordPress Development | Adrevnview", "WordPress Development & Custom Themes", "Custom WordPress themes and plugins for content-rich marketing sites.", "WordPress powers millions of sites. We build custom themes optimized for performance, security, and editor experience."],
  ["shopify-development", "Shopify Development Agency | Adrevnview", "Shopify Store Design & Development", "High-converting Shopify stores with custom themes and conversion optimization.", "We design and develop Shopify stores that showcase products beautifully and streamline checkout."],
  ["webflow-development", "Webflow Development | Adrevnview", "Webflow Design & Development", "Pixel-perfect Webflow sites with CMS collections and client-friendly editing.", "Webflow bridges design freedom and maintainability. We build Webflow sites your team can update without developers."],
  ["api-integrations", "API Integrations | Adrevnview", "API Integrations & Automation", "Connect your website to CRMs, payment systems, marketing tools, and custom backends.", "We integrate Stripe, HubSpot, Salesforce, and custom APIs so your site works with your existing stack."],
  ["seo-services", "SEO Services Agency | Adrevnview", "SEO Services That Compound Organic Traffic", "Technical SEO, on-page optimization, content strategy, and local SEO from Adrevnview.", "SEO is a compounding asset. We audit technical foundations, optimize on-page signals, and build content strategies that grow organic traffic."],
  ["ppc-advertising", "PPC Advertising Agency | Adrevnview", "PPC Advertising & Paid Media Management", "Google Ads, Meta, and LinkedIn campaigns with landing pages built to convert.", "Paid media needs tight alignment between ads and landing pages. We manage campaigns and build pages that maximize ROAS."],
  ["social-media-marketing", "Social Media Marketing | Adrevnview", "Social Media Marketing & Content", "Brand-aligned social content and paid social campaigns for B2B and B2C brands.", "We create social content systems that reinforce your brand and drive traffic to high-intent pages."],
  ["email-marketing", "Email Marketing Agency | Adrevnview", "Email Marketing & Automation", "Newsletter design, drip campaigns, and marketing automation setup.", "Email remains one of the highest-ROI channels. We design templates and automation flows that nurture leads."],
  ["content-strategy", "Content Strategy Services | Adrevnview", "Content Strategy for SEO & GEO", "Editorial calendars, topic clusters, and answer-first content for search and AI visibility.", "Content strategy aligns what you publish with what buyers and AI systems need to understand your expertise."],
  ["logo-design", "Logo Design Agency | Adrevnview", "Professional Logo Design", "Distinctive logo design that works across digital and print applications.", "Your logo is the anchor of your visual identity. We design marks that are memorable, scalable, and on-brand."],
  ["brand-identity", "Brand Identity Design | Adrevnview", "Brand Identity Systems", "Complete visual identity: logos, color palettes, typography, and brand applications.", "Brand identity is more than a logo. We build cohesive visual systems that scale across every touchpoint."],
  ["brand-strategy", "Brand Strategy Consulting | Adrevnview", "Brand Strategy & Positioning", "Market positioning, messaging frameworks, and competitive differentiation.", "Strategy precedes design. We define positioning and messaging that guides every creative decision."],
  ["visual-design-systems", "Visual Design Systems | Adrevnview", "Visual Design Systems & Component Libraries", "Figma libraries, design tokens, and documented patterns for consistent brand execution.", "Design systems keep teams aligned as products and marketing sites grow."],
  ["brand-guidelines", "Brand Guidelines Development | Adrevnview", "Brand Guidelines and Style Guides", "Comprehensive brand books documenting logo usage, tone, and visual standards.", "Brand guidelines protect your investment in identity and ensure partners represent you correctly."],
];

export const INDUSTRY_PAGES = [
  ["healthcare", "Healthcare Web Design", "HIPAA-aware websites and patient-focused digital experiences for healthcare providers and med-tech brands.", "Healthcare organizations need websites that build trust, communicate compliance, and make it easy for patients to take action."],
  ["ecommerce", "eCommerce & Retail Web Design", "High-converting online stores and retail brand websites built for scale.", "Retail brands compete on experience as much as price. We design eCommerce sites optimized for product discovery and mobile checkout."],
  ["manufacturing", "Manufacturing & Industrial Web Design", "B2B websites that communicate capability, certifications, and technical credibility.", "Manufacturing buyers research suppliers online before making contact. We build industrial websites that showcase capabilities and case studies."],
  ["real-estate", "Real Estate Web Design", "Property marketing sites, broker platforms, and lead-generation experiences for real estate.", "Real estate is visual and local. We design property marketing sites and lead capture funnels optimized for local SEO."],
  ["legal", "Legal Services Web Design", "Authoritative law firm websites that establish expertise and convert consultations.", "Law firms need websites that communicate authority and make it effortless to book consultations."],
  ["financial", "Financial Services Web Design", "Compliant, trustworthy websites for fintech, advisors, and financial institutions.", "Financial services websites must balance compliance, clarity, and conversion at every step."],
  ["technology", "Technology & SaaS Web Design", "Product-led websites for SaaS companies, dev tools, and technology brands.", "SaaS buyers evaluate your product through your website before they sign up. We design product-led marketing sites with clear value props and GEO-ready structure."],
];

export const BLOG_PAGES = [
  ["geo-vs-seo-2026", "GEO vs SEO for Long Island Brands | Adrevnview Blog", "GEO vs SEO: What Long Island Brands Need in 2026", "Learn how GEO works alongside SEO for Long Island and New York brands."],
  ["conversion-focused-web-design", "Conversion-Focused Web Design Patterns | Adrevnview Blog", "5 Conversion Patterns We Use on Every Homepage", "Five homepage conversion patterns for B2B and enterprise websites."],
  ["shopify-speed-checklist", "Shopify Performance Checklist | Adrevnview Blog", "Shopify Speed Checklist for eCommerce Brands", "Technical checklist for faster Shopify storefronts."],
  ["local-seo-long-island", "Local SEO for Long Island Businesses | Adrevnview Blog", "Local SEO Playbook for Long Island Businesses", "Local SEO strategies for Long Island businesses and the NYC metro."],
];

export const CLIENT_PAGES = [
  ["tagizo", "Tagizo", "Video intelligence platform built by Adrevnview — interactive player, GEO engine, and SaaS billing."],
  ["axstart", "Axstart", "Ax Lab ecosystem — product pages, brand system, and multiple SaaS launches under one cohesive identity."],
  ["cizher", "Cizher", "Brand and product design for Cizher — premium digital presence and conversion-focused UX."],
  ["payrowl", "Payrowl", "Fintech marketing site with product-led design and trust-building content architecture."],
  ["xeark", "Xeark", "Technology brand website with SEO-optimized product marketing pages."],
  ["axnet", "Axnet", "Enterprise networking brand site with technical credibility and lead generation flows."],
  ["mishi", "Mishi", "eCommerce experience design with mobile-first product discovery and checkout optimization."],
  ["crocherish", "Crocherish", "Retail brand website with visual storytelling and eCommerce integration."],
  ["ecmmaandfitness", "ECMMA & Fitness", "Fitness brand digital presence with class scheduling and member engagement features."],
  ["kfc-ny", "KFC NY", "Regional franchise marketing site with local SEO and promotional campaign landing pages."],
];
