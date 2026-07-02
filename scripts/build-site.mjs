import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteUrl = "https://jtaccountancy.co.uk";
const phone = "01482 957317";
const email = "jordan@jtaccountancy.co.uk";
const address = "66 Bond Street, Hull, HU1 3EN";
const googleMapsUrl = "https://www.google.com/maps/place/JT+Accountancy+Services+Limited/data=!4m2!3m1!1s0x0:0x4c7b94c6f526f020";
const googleMapEmbedUrl = "https://www.google.com/maps?q=JT%20Accountancy%20Services%20Limited%2066%20Bond%20Street%20Hull%20HU1%203EN&output=embed";
const openingHours = [
  ["Monday", "8:30 AM - 5:00 PM"],
  ["Tuesday", "8:30 AM - 5:00 PM"],
  ["Wednesday", "8:30 AM - 5:00 PM"],
  ["Thursday", "8:30 AM - 5:00 PM"],
  ["Friday", "8:30 AM - 5:00 PM"]
];

const openingHoursSpecification = openingHours.map(([day]) => ({
  "@type": "OpeningHoursSpecification",
  dayOfWeek: day,
  opens: "08:30",
  closes: "17:00"
}));

const services = [
  {
    slug: "limited-company-accounts",
    title: "Limited Company Accounts",
    summary: "Year-end accounts, Companies House filing, Corporation Tax returns and clear director guidance for small limited companies.",
    keywords: "limited company accounts Hull, company accountant Hull",
    image: "/assets/jt-branded-office.jpeg",
    includes: ["Statutory accounts", "Corporation Tax return", "Director salary and dividend planning", "Companies House filing reminders", "Plain-English tax review"],
    audience: "Owner-managed companies, contractors, consultants and growing local businesses that want accounts handled accurately without losing sight of cash flow."
  },
  {
    slug: "sole-trader-accounts",
    title: "Sole Trader Accounts",
    summary: "Straightforward annual accounts and self assessment support for sole traders, freelancers and self-employed people.",
    keywords: "sole trader accountant Hull, self employed accountant Hull",
    image: "/assets/jt-phone-call.jpeg",
    includes: ["Income and expense review", "Self assessment preparation", "Allowable expense guidance", "Payment on account planning", "Simple record keeping advice"],
    audience: "Self-employed people who need their figures organised, deadlines covered and tax explained clearly."
  },
  {
    slug: "management-accounts",
    title: "Management Accounts",
    summary: "Regular reporting that shows how the business is performing before the year end arrives.",
    keywords: "management accounts Hull, business accountant Hull",
    image: "/assets/jt-bond-street-team.jpeg",
    includes: ["Monthly or quarterly profit reports", "Cash-flow commentary", "VAT and payroll checks", "Director-level review", "Action points for the next period"],
    audience: "Business owners who want reliable numbers for decisions, funding conversations or steady growth."
  },
  {
    slug: "bookkeeping",
    title: "Bookkeeping",
    summary: "Accurate bookkeeping support that keeps your records tidy, current and ready for tax, VAT and management reporting.",
    keywords: "bookkeeper Hull, bookkeeping services Hull",
    image: "/assets/jt-desk-work.jpeg",
    includes: ["Sales and purchase records", "Bank reconciliation", "Cloud software support", "Receipt and expense organisation", "Regular tidy-up reviews"],
    audience: "Businesses that want clean records without spending evenings catching up on admin."
  },
  {
    slug: "vat-returns",
    title: "VAT Returns",
    summary: "VAT return preparation and submission, with checks for common issues before the return goes to HMRC.",
    keywords: "VAT returns Hull, VAT accountant Hull",
    image: "/assets/jt-accounts-work.jpeg",
    includes: ["VAT return preparation", "Making Tax Digital support", "Input and output VAT checks", "Flat rate and standard scheme review", "HMRC submission reminders"],
    audience: "VAT-registered businesses that want accurate returns and fewer surprises."
  },
  {
    slug: "payroll",
    title: "Payroll",
    summary: "Payroll processing for small employers, covering payslips, RTI submissions, starters, leavers and pension duties.",
    keywords: "payroll services Hull, small business payroll Hull",
    image: "/assets/jt-office-admin.jpeg",
    includes: ["Weekly or monthly payroll", "Payslips and payroll reports", "RTI submissions", "Starter and leaver processing", "Workplace pension coordination"],
    audience: "Small employers that need payroll handled reliably and on time."
  },
  {
    slug: "personal-tax-returns",
    title: "Personal Tax Returns",
    summary: "Self assessment returns for directors, landlords, sole traders and individuals with additional income.",
    keywords: "personal tax return Hull, self assessment Hull",
    image: "/assets/jt-client-support.jpeg",
    includes: ["Income source review", "Tax return preparation", "Relief and allowance checks", "HMRC submission", "Tax payment planning"],
    audience: "Individuals who want their return done properly and submitted before the deadline pressure begins."
  },
  {
    slug: "company-tax-returns",
    title: "Company Tax Returns",
    summary: "Corporation Tax return preparation alongside your company accounts, with clear explanations of what is due and when.",
    keywords: "company tax return Hull, corporation tax accountant Hull",
    image: "/assets/jt-office-director.jpeg",
    includes: ["Corporation Tax computation", "CT600 submission", "Capital allowance review", "Director tax considerations", "Payment deadline reminders"],
    audience: "Limited companies that need compliant filing and practical tax planning."
  },
  {
    slug: "partnership-accounts",
    title: "Partnership Accounts",
    summary: "Accounts and partnership tax return support for trading partnerships and family-run businesses.",
    keywords: "partnership accounts Hull, partnership tax return Hull",
    image: "/assets/jt-planning-meeting.jpeg",
    includes: ["Partnership accounts", "Profit share calculations", "Partnership tax return", "Partner self assessment links", "Record keeping guidance"],
    audience: "Partnerships that need clean accounts and joined-up tax return handling for each partner."
  },
  {
    slug: "company-formations",
    title: "Company Formations",
    summary: "Company setup support, including basic structure guidance and the first accounting deadlines to keep on the radar.",
    keywords: "company formation Hull, start a limited company Hull",
    image: "/assets/jt-bond-street-team.jpeg",
    includes: ["Company setup guidance", "Companies House registration support", "Director and shareholder basics", "First tax deadline checklist", "Bookkeeping setup advice"],
    audience: "New businesses deciding whether a limited company is the right structure."
  },
  {
    slug: "cis-returns",
    title: "CIS Returns",
    summary: "Construction Industry Scheme return support for contractors and subcontractors.",
    keywords: "CIS returns Hull, construction accountant Hull",
    image: "/assets/jt-company-tax.jpeg",
    includes: ["Monthly CIS return preparation", "Subcontractor verification guidance", "Deduction statements", "CIS record checks", "Tax return coordination"],
    audience: "Construction businesses that need CIS handled accurately month by month."
  },
  {
    slug: "tax-planning",
    title: "Tax Planning",
    summary: "Personal and business tax planning before key deadlines, so decisions are made while there is still time to act.",
    keywords: "tax planning Hull, personal tax planning Hull",
    image: "/assets/jt-tax-planning.jpeg",
    includes: ["Pre-year-end tax review", "Director remuneration planning", "Personal tax allowance review", "Dividend and pension considerations", "Practical next steps"],
    audience: "Business owners and individuals who want proactive guidance rather than last-minute filing."
  }
];

const serviceInternalLinks = {
  "limited-company-accounts": [
    ["Company Tax Returns", "/services/company-tax-returns/"],
    ["Bookkeeping", "/services/bookkeeping/"],
    ["Payroll", "/services/payroll/"],
    ["VAT Returns", "/services/vat-returns/"]
  ],
  "sole-trader-accounts": [
    ["Personal Tax Returns", "/services/personal-tax-returns/"],
    ["Bookkeeping", "/services/bookkeeping/"],
    ["Tax Planning", "/services/tax-planning/"]
  ],
  payroll: [
    ["Bookkeeping", "/services/bookkeeping/"],
    ["Limited Company Accounts", "/services/limited-company-accounts/"]
  ],
  "vat-returns": [
    ["Bookkeeping", "/services/bookkeeping/"],
    ["Management Accounts", "/services/management-accounts/"]
  ],
  "company-formations": [
    ["Limited Company Accounts", "/services/limited-company-accounts/"],
    ["Bookkeeping", "/services/bookkeeping/"],
    ["Payroll", "/services/payroll/"]
  ]
};

const locations = [
  {
    slug: "accountants-hull",
    title: "We serve Hull",
    place: "Hull",
    summary: "Local accountancy, tax and bookkeeping support for sole traders, limited companies and small employers across Hull.",
    angle: "Hull businesses often need a mix of year-end compliance, VAT, payroll and practical advice that fits around day-to-day trading. JT Accountancy provides direct support from a Hull-based accountant who keeps communication clear and deadlines visible."
  },
  {
    slug: "accountants-kirk-ella",
    title: "We serve Kirk Ella",
    place: "Kirk Ella",
    summary: "Friendly accounting support for businesses and individuals in Kirk Ella and the surrounding villages.",
    angle: "JT Accountancy supports Kirk Ella directors, landlords, consultants, sole traders and family businesses that want a Hull accountant with clear communication and practical tax advice."
  },
  {
    slug: "accountants-beverley",
    title: "We serve Beverley",
    place: "Beverley",
    summary: "Accounts, self assessment, VAT and payroll services for small businesses around Beverley.",
    angle: "For Beverley business owners, the focus is simple: tidy records, accurate returns and useful advice before decisions become urgent. JT Accountancy supports both established businesses and new ventures."
  },
  {
    slug: "accountants-cottingham",
    title: "We serve Cottingham",
    place: "Cottingham",
    summary: "Personal tax, bookkeeping and company accounts support for clients in Cottingham.",
    angle: "Cottingham clients can access flexible accountancy support without the formality of a large firm. The service is built around clear answers, reliable filing and practical tax planning."
  },
  {
    slug: "accountants-hessle",
    title: "We serve Hessle",
    place: "Hessle",
    summary: "Accounts, bookkeeping, VAT and tax return support for small businesses and individuals in Hessle.",
    angle: "JT Accountancy supports Hessle business owners, directors, landlords and self-employed clients who want clear advice, tidy records and dependable filing support from a Hull-based practice."
  },
  {
    slug: "accountants-anlaby",
    title: "We serve Anlaby",
    place: "Anlaby",
    summary: "Accounts, bookkeeping, payroll and tax return support for small businesses and individuals in Anlaby.",
    angle: "Anlaby clients can work with JT Accountancy for year-end accounts, self assessment, payroll, VAT and bookkeeping without needing a large firm. Support is available from the Hull office or remotely."
  },
  {
    slug: "accountants-willerby",
    title: "We serve Willerby",
    place: "Willerby",
    summary: "Friendly accountancy and tax support for directors, sole traders, landlords and employers in Willerby.",
    angle: "JT Accountancy supports Willerby clients who want practical help with accounts, tax returns, payroll, VAT and record keeping, with clear communication from Jordan and the team."
  },
  {
    slug: "accountants-kingswood",
    title: "We serve Kingswood",
    place: "Kingswood",
    summary: "Local accounts, VAT, payroll, bookkeeping and self assessment support for clients in Kingswood.",
    angle: "For Kingswood business owners and individuals, JT Accountancy provides straightforward accounting support from Hull, helping clients keep records tidy and deadlines under control."
  },
  {
    slug: "accountants-east-yorkshire",
    title: "We serve East Yorkshire",
    place: "East Yorkshire",
    summary: "Accountancy services for small businesses and self-employed clients throughout East Yorkshire.",
    angle: "JT Accountancy works with clients across East Yorkshire, supporting businesses that need dependable compliance and a responsive point of contact throughout the year."
  }
];

const blogPosts = [
  {
    slug: "can-you-employ-your-children-and-claim-tax-relief",
    title: "Can you employ your children and claim tax relief?",
    date: "2026-05-13",
    category: "Tax planning",
    summary: "Yes, but the work must be genuine, the pay must be reasonable and child employment rules still apply.",
    image: "/assets/jt.jpg",
    fact: { title: "Quick answer", text: "Yes, but only where the work is genuine, the pay is reasonable and child employment rules are followed." },
    sidebar: { title: "Need tax advice?", text: "Speak to JT Accountancy before setting up wages for a family member.", button: "Ask about tax advice" },
    sources: {
      text: "For the current child employment rules, check GOV.UK and Hull City Council. For family salary tax treatment, keep records and make sure pay is realistic for the work done.",
      links: [
        { label: "GOV.UK child employment guidance", href: "https://www.gov.uk/child-employment" },
        { label: "Hull child employment guidance", href: "https://www.hull.gov.uk/safeguarding/child-employment" }
      ]
    },
    body: `<p>Can you employ your children in your business and get tax relief on the wages? In principle, yes. The key point is that the arrangement must be real...</p>`
  },
  {
    slug: "holding-companies-for-tax-efficiency",
    title: "Holding companies for tax efficiency",
    date: "2026-04-29",
    category: "Tax planning",
    summary: "In the UK, using a holding company structure can be a powerful way to manage profits, protect assets, and reduce personal tax exposure.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=900&q=80",
    fact: { title: "Smart planning", text: "Floating dividends to a holding company tax-free helps reinvest into other ventures and protect business assets." },
    sidebar: { title: "Scaling up?", text: "If you're building multiple income streams, a holding company could be a strategy worth understanding.", button: "Discuss structures" },
    sources: {
      text: "For more information on corporate structures and share exchanges, see the official HMRC and GOV.UK guidance.",
      links: [
        { label: "GOV.UK Corporation Tax guidance", href: "https://www.gov.uk/corporation-tax" },
        { label: "HMRC Share for share exchange info", href: "https://www.gov.uk/guidance/capitals-gains-tax-share-reorganisation-and-takeovers" }
      ]
    },
    body: `
      <p><strong>In the UK, using a holding company structure can be a powerful way to manage profits, protect assets, and reduce personal tax exposure.</strong></p>
      <p>Instead of drawing dividends personally (and triggering higher-rate personal tax), you can <strong>‘float’ dividends up to your holding company tax-free</strong> - keeping the funds within your corporate group. From there, you can:</p>
      <ul class="feature-list">
        <li><strong>Reinvest into other ventures</strong> - use pre-tax (personal) funds to start or buy other businesses.</li>
        <li><strong>Lend back to your trading company</strong> - provide working capital to your original business without personal tax leak.</li>
        <li><strong>Build wealth under a more tax-efficient structure</strong> - such as purchasing commercial property or making other group-level investments.</li>
      </ul>
      <h2>Asset Protection & Ring-Fencing</h2>
      <p>One of the most significant advantages of a holding company is asset protection. By moving excess cash or high-value assets (like property or intellectual property) out of the trading company and into the holding company, you "ring-fence" them. If the trading company ever faces legal trouble or financial difficulty, the assets held in the holding company are generally protected from the trading company's creditors.</p>
      <h2>Planning for a Future Exit</h2>
      <p>If you eventually plan to sell your trading company, a holding company structure can be incredibly beneficial. Under the <strong>Substantial Shareholdings Exemption (SSE)</strong>, a holding company can often sell the shares in its trading subsidiary completely <strong>tax-free</strong>, provided certain conditions are met. This allows you to keep the full sale proceeds within the group to reinvest, rather than paying Capital Gains Tax personally.</p>
      <p>It’s not about avoiding tax - it’s about <strong>planning smarter, staying compliant, and structuring your business for long-term growth.</strong></p>
      <p>Even if you’re trading company is already up and running, you could still potentially <strong>transfer the shares to a holding company</strong> on the assumption you receive clearance from HMRC to execute a share for share exchange.</p>
    `
  },
  {
    slug: "making-tax-digital-for-sole-traders-and-landlords",
    title: "Making Tax Digital for sole traders and landlords",
    date: "2026-04-23",
    category: "Tax compliance",
    summary: "If you’re a sole trader or landlord with turnover of £50,000 or more, the way you file your tax return is changing from 6 April 2026.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80",
    fact: { title: "MTD 2026", text: "Starting April 2026, quarterly updates and digital-only filing will be mandatory for sole traders and landlords over £50k turnover." },
    sidebar: { title: "Unsure about MTD?", text: "Don't wait until the deadline. Speak to us about MTD-compliant software and how to prepare.", button: "Ask about MTD" },
    sources: {
      text: "Read the official HMRC rules on Making Tax Digital for Income Tax and check the list of compatible software.",
      links: [
        { label: "GOV.UK MTD for Income Tax guidance", href: "https://www.gov.uk/guidance/using-software-to-send-income-tax-updates" },
        { label: "HMRC Find software for MTD", href: "https://www.gov.uk/guidance/find-software-thats-compatible-with-making-tax-digital-for-income-tax" }
      ]
    },
    body: `
      <p><strong>If you’re a sole trader or landlord with turnover of £50,000 or more, the way you file your tax return is changing from 6 April 2026.</strong></p>
      <p>HMRC is bringing in <strong>Making Tax Digital (MTD)</strong> as part of their plan to modernize the tax system. This isn't just a change in how you send data; it's a change in how you must keep your records.</p>
      <h2>The Rollout Timeline</h2>
      <ul class="feature-list">
        <li><strong>April 2026:</strong> Mandatory for those with a total business and/or property income over £50,000.</li>
        <li><strong>April 2027:</strong> Mandatory for those with a total business and/or property income over £30,000.</li>
      </ul>
      <h2>What MTD Means for You</h2>
      <div class="info-grid">
        <div class="info-card">
          <h3>1. Digital Record Keeping</h3>
          <p>You must keep digital records of all your business transactions. Paper-only records or simple spreadsheets may no longer be enough unless they can "bridge" to HMRC's systems.</p>
        </div>
        <div class="info-card">
          <h3>2. Quarterly Updates</h3>
          <p>You’ll need to <strong>submit your income and expenses every 3 months</strong>. This gives you a more real-time view of your tax position.</p>
        </div>
        <div class="info-card">
          <h3>3. Final Declaration</h3>
          <p>At the end of the tax year you’ll still send a final declaration, confirming the full year’s figures - similar to today’s tax return, but <strong>fully digital</strong>.</p>
        </div>
      </div>
      <h2>How to Prepare Now</h2>
      <p>Moving to MTD doesn't have to be stressful if you start early. We recommend:</p>
      <ul class="check-list">
        <li><strong>Review your turnover:</strong> Check if you meet the £50k or £30k thresholds based on your current tax returns.</li>
        <li><strong>Choose MTD-compliant software:</strong> Start using cloud accounting software (like Xero or QuickBooks) now to get used to digital record keeping.</li>
        <li><strong>Separate business and personal banking:</strong> This makes digital record keeping much cleaner and faster.</li>
      </ul>
      <p><strong>You will need to have MTD compliant software in order to prepare and submit your quarterly returns.</strong></p>
      <p>If you’re unsure how this may affect you, don’t hesitate to contact us. ✉️</p>
    `
  }
];

const testimonials = [
  {
    quote: "I would highly recommend JT Accountancy Services to anyone who needs a fast and professional service. The lads are very friendly.",
    name: "Sam Llad"
  },
  {
    quote: "Jordan is an excellent accountant - professional, knowledgeable, and genuinely easy to work with. He explains things clearly and always makes the process stress-free.",
    name: "Vinny Hutson"
  },
  {
    quote: "Best accountants around! Smashing job every time. No job is too big or too small, and they're always happy to help. Jordan and the team are amazing.",
    name: "Olivia and Matty"
  },
  {
    quote: "I have had only good experiences with the team at JT Accountancy. Very responsive, helpful and friendly. I couldn't recommend them enough.",
    name: "Owen Taylor"
  },
  {
    quote: "Really happy with the service from JT Accountancy. They made sorting my tax return super easy and took all the stress out of it.",
    name: "James Haigh"
  },
  {
    quote: "Jordan and his team are so helpful and actually care about our business. Highly recommended.",
    name: "Marissa Spencer"
  },
  {
    quote: "Jordan has been great throughout the full process. Always gets back to you and gives updates all the time.",
    name: "Shaun Butler"
  }
];

const nav = [
  ["/about/", "About"],
  ["/services/", "Services"],
  ["/blog/", "Blog"],
  ["/contact/", "Contact"]
];

const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}[char]));

const url = (pathName) => `${siteUrl}${pathName}`;
const starIcons = `<i class="fa-solid fa-star" aria-hidden="true"></i><i class="fa-solid fa-star" aria-hidden="true"></i><i class="fa-solid fa-star" aria-hidden="true"></i><i class="fa-solid fa-star" aria-hidden="true"></i><i class="fa-solid fa-star" aria-hidden="true"></i>`;
const inlineLinks = (items) => items.map(([label, href]) => `<a href="${href}">${esc(label)}</a>`).join(", ");
const initials = (name) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
const serviceImageAlt = (service) => `JT Accountancy team supporting ${service.title.toLowerCase()} clients in Hull`;
const absoluteImage = (src) => src.startsWith("http") ? src : `${siteUrl}${src}`;
const siteImage = `${siteUrl}/assets/jt-bond-street-team.jpeg`;

function metaDescription(text) {
  const clean = String(text).replace(/\s+/g, " ").trim();
  if (clean.length <= 155) return clean;
  return `${clean.slice(0, 152).replace(/\s+\S*$/, "")}...`;
}

function breadcrumbSchema(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        item: url(item.href || "/")
      }))
    ]
  };
}

function faqSchema(faqs) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer
      }
    }))
  };
}

function localBusinessSchema(location) {
  return {
    "@type": ["LocalBusiness", "AccountingService"],
    "@id": `${siteUrl}/locations/${location.slug}/#business`,
    name: `JT Accountancy - ${location.place}`,
    url: url(`/locations/${location.slug}/`),
    telephone: phone,
    email,
    image: `${siteUrl}/assets/logo.webp`,
    priceRange: "GBP",
    address: {
      "@type": "PostalAddress",
      streetAddress: "66 Bond Street",
      addressLocality: "Hull",
      postalCode: "HU1 3EN",
      addressCountry: "GB"
    },
    areaServed: {
      "@type": "Place",
      name: location.place
    },
    parentOrganization: {
      "@type": ["LocalBusiness", "AccountingService"],
      name: "JT Accountancy",
      url: siteUrl
    },
    openingHoursSpecification
  };
}

function layout({ title, description, pathName, body, schema = [] }) {
  const current = pathName.split("/")[1];
  const pageDescription = metaDescription(description);
  const schemas = {
    "@context": "https://schema.org",
    "@graph": [
    {
      "@type": ["LocalBusiness", "AccountingService"],
      "@id": `${siteUrl}/#business`,
      name: "JT Accountancy",
      url: siteUrl,
      telephone: phone,
      email,
      image: `${siteUrl}/assets/logo.webp`,
      logo: `${siteUrl}/assets/logo.webp`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "66 Bond Street",
        addressLocality: "Hull",
        postalCode: "HU1 3EN",
        addressCountry: "GB"
      },
      areaServed: ["Hull", "Kirk Ella", "Beverley", "Cottingham", "Hessle", "Anlaby", "Willerby", "Kingswood", "East Yorkshire"],
      founder: "Jordan Taylor",
      priceRange: "GBP",
      openingHoursSpecification
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "JT Accountancy",
      url: siteUrl,
      publisher: { "@id": `${siteUrl}/#business` }
    },
    ...schema
    ]
  };

  return `<!doctype html>
<html lang="en-GB">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(pageDescription)}">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="${url(pathName)}">
  <link rel="icon" type="image/png" href="/favicon.png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <meta name="theme-color" content="#214760">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(pageDescription)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url(pathName)}">
  <meta property="og:image" content="${siteImage}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(pageDescription)}">
  <meta name="twitter:image" content="${siteImage}">
  <link rel="stylesheet" href="/assets/icons.css">
  <link rel="stylesheet" href="/assets/styles.css">
  <script type="application/ld+json">${JSON.stringify(schemas)}</script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-SFBVHJBN28"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-SFBVHJBN28');
  </script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="/" aria-label="JT Accountancy home">
        <img class="brand-logo" src="/assets/logo.webp" alt="JT Accountancy">
      </a>
      <button class="nav-toggle" type="button" aria-label="Open navigation" aria-expanded="false" data-nav-toggle>
        <span></span><span></span><span></span>
      </button>
      <nav class="site-nav" aria-label="Main navigation" data-nav-menu>
        ${nav.map(([href, label]) => `<a href="${href}" ${href.includes(`/${current}/`) ? 'aria-current="page"' : ""}>${label}</a>`).join("")}
        <a class="button" href="tel:${phone.replaceAll(" ", "")}"><i class="fa-solid fa-phone" aria-hidden="true"></i> Call ${phone}</a>
      </nav>
    </div>
  </header>
  <main id="main">${body}</main>
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-grid">
        <div>
          <h2>JT Accountancy</h2>
          <p>Clean, practical accountancy and tax support from Jordan Taylor for small businesses, sole traders and individuals in Hull and East Yorkshire.</p>
        </div>
        <div>
          <h3>Services</h3>
          ${services.map((service) => `<a href="/services/${service.slug}/">${service.title}</a>`).join("")}
        </div>
        <div>
          <h3>Service areas</h3>
          ${locations.map((location) => `<a href="/locations/${location.slug}/">${location.place}</a>`).join("")}
        </div>
        <div>
          <h3>Contact</h3>
          <a href="tel:${phone.replaceAll(" ", "")}"><i class="fa-solid fa-phone" aria-hidden="true"></i> ${phone}</a>
          <a href="mailto:${email}"><i class="fa-solid fa-envelope" aria-hidden="true"></i> ${email}</a>
          <p><i class="fa-solid fa-location-dot" aria-hidden="true"></i> ${address}</p>
          <p><i class="fa-regular fa-clock" aria-hidden="true"></i> Mon-Fri: 8:30 AM - 5:00 PM</p>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; <span data-year></span> JT Accountancy. All rights reserved.</span>
        <span>Web design in Hull by <a href="https://swift7.co.uk" target="_blank" rel="noopener">Swift7</a>.</span>
      </div>
    </div>
  </footer>
  <script src="/assets/main.js" defer></script>
</body>
</html>`;
}

function serviceCards(items = services) {
  return `<div class="grid cards-3">${items.map((service) => `
    <article class="card service-card service-card-${esc(service.slug)}">
      <div class="card-media"><img src="${esc(service.image)}" alt="${esc(serviceImageAlt(service))}"></div>
      <h3>${esc(service.title)}</h3>
      <p>${esc(service.summary)}</p>
      <a class="text-link" href="/services/${service.slug}/">View service <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
    </article>`).join("")}</div>`;
}

function locationCards() {
  return `<div class="grid location-grid">${locations.map((location) => `
    <a class="location-card" href="/locations/${location.slug}/">
      <span>${esc(location.place)}</span>
      <h3>${esc(location.title)}</h3>
      <p>${esc(location.summary)}</p>
      <strong>View local page <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></strong>
    </a>`).join("")}</div>`;
}

function blogCards() {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return `<div class="grid cards-3 blog-card-grid">${blogPosts.slice(0, 3).map((post) => `
    <article class="card service-card blog-card">
      <div class="card-media"><img src="${esc(post.image)}" alt="${esc(post.title)}"></div>
      <p class="eyebrow">${esc(post.category)}</p>
      <h3>${esc(post.title)}</h3>
      <p class="muted blog-date">${formatDate(post.date)}</p>
      <p>${esc(post.summary)}</p>
      <a class="text-link" href="/blog/${post.slug}/">Read article <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
    </article>`).join("")}</div>`;
}

function serviceSummaryStrip() {
  return `<div class="service-summary-strip">
    <div>
      <strong>Accounts</strong>
      <span>Annual accounts, Companies House filings and clear year-end support.</span>
    </div>
    <div>
      <strong>Tax</strong>
      <span>Personal, partnership and company tax returns handled before deadlines bite.</span>
    </div>
    <div>
      <strong>Bookkeeping</strong>
      <span>Practical record keeping that keeps VAT, payroll and accounts moving.</span>
    </div>
  </div>`;
}

function breadcrumbTrail(items) {
  return `<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a>${items.map((item) => item.href ? ` <span aria-hidden="true">/</span> <a href="${item.href}">${esc(item.label)}</a>` : ` <span aria-hidden="true">/</span> <strong>${esc(item.label)}</strong>`).join("")}</nav>`;
}

function pageHero({ eyebrow, title, summary, fact, breadcrumbs }) {
  const trail = breadcrumbs || [{ label: eyebrow }];
  return `<section class="page-hero">
    <div class="section-inner">
      <div class="page-hero-copy">
        ${breadcrumbTrail(trail)}
        <p class="eyebrow">${esc(eyebrow)}</p>
        <h1>${esc(title)}</h1>
        <p class="page-summary">${esc(summary)}</p>
      </div>
      <aside class="fact-box page-hero-fact">
        <h2>${esc(fact.title)}</h2>
        <p>${esc(fact.text)}</p>
        <a class="button" href="/contact/"><i class="fa-solid fa-arrow-right" aria-hidden="true"></i> ${esc(fact.cta || "Contact JT Accountancy")}</a>
      </aside>
    </div>
  </section>`;
}

function contactHero() {
  return `<section class="page-hero contact-hero">
    <div class="section-inner">
      <div>
        ${breadcrumbTrail([{ label: "Contact" }])}
        <p class="eyebrow">Contact</p>
        <h1>Speak to Jordan about your accounts.</h1>
        <p class="page-summary">Call the Hull office, email Jordan or send a short message. You will get a clear reply on what records are needed and what happens next.</p>
        <div class="section-actions">
          <a class="button" href="tel:${phone.replaceAll(" ", "")}"><i class="fa-solid fa-phone" aria-hidden="true"></i> Call ${phone}</a>
          <a class="button secondary" href="mailto:${email}"><i class="fa-solid fa-envelope" aria-hidden="true"></i> Email Jordan</a>
        </div>
      </div>
      <aside class="contact-summary-card">
        <h2>Contact details</h2>
        <ul class="contact-list">
          <li><i class="fa-solid fa-phone" aria-hidden="true"></i><span><strong>Phone</strong><a href="tel:${phone.replaceAll(" ", "")}">${phone}</a></span></li>
          <li><i class="fa-solid fa-envelope" aria-hidden="true"></i><span><strong>Email</strong><a href="mailto:${email}">${email}</a></span></li>
          <li><i class="fa-solid fa-location-dot" aria-hidden="true"></i><span><strong>Office</strong>${address}</span></li>
          <li><i class="fa-regular fa-clock" aria-hidden="true"></i><span><strong>Hours</strong>Monday to Friday, 8:30 AM - 5:00 PM</span></li>
        </ul>
      </aside>
    </div>
  </section>`;
}

function cta() {
  return `<section class="section navy cta-section">
    <div class="section-inner">
      <div class="cta-band">
        <div>
          <p class="eyebrow">Talk to Jordan</p>
          <h2>Need a hand with your accounts?</h2>
          <p>Call the Hull office or email a short summary of what you need. Jordan will let you know what records are needed and what happens next.</p>
        </div>
        <div class="section-actions">
          <a class="button" href="tel:${phone.replaceAll(" ", "")}"><i class="fa-solid fa-phone" aria-hidden="true"></i> Call ${phone}</a>
          <a class="button secondary" href="mailto:${email}"><i class="fa-solid fa-envelope" aria-hidden="true"></i> Email JT Accountancy</a>
        </div>
      </div>
    </div>
  </section>`;
}

function faqSection() {
  const faqs = [
    ["Do I need to be based in Hull?", "No. Many clients are local to Hull and East Yorkshire, but records can also be sent remotely if that is easier."],
    ["Can JT Accountancy take over from my current accountant?", "Yes. Jordan can explain what is needed and contact your previous accountant for the usual professional clearance once you are ready to move."],
    ["What should I send first?", "Start with the basics: what you need help with, your deadline if you know it, and any recent accounts, tax returns, bookkeeping records or HMRC letters."],
    ["Do you work with both companies and sole traders?", "Yes. JT Accountancy supports limited companies, sole traders, partnerships, landlords and personal tax clients."],
    ["Can you help if I am behind with accounts or tax?", "Yes. Get in touch as soon as you can. Jordan will look at what is outstanding and help you deal with the most urgent deadlines first."]
  ];

  return `<section class="section faq-section">
    <div class="section-inner faq-wrap">
      <div>
        <p class="eyebrow">FAQ</p>
        <h2>Common questions.</h2>
        <p>Quick answers before you call or email the office.</p>
      </div>
      <div class="faq-list">
        ${faqs.map(([question, answer]) => `<details><summary>${esc(question)}</summary><p>${esc(answer)}</p></details>`).join("")}
      </div>
    </div>
  </section>`;
}

function contactOptions() {
  return `<div class="contact-options" aria-label="Contact options">
    <a class="contact-option" href="tel:${phone.replaceAll(" ", "")}">
      <i class="fa-solid fa-phone" aria-hidden="true"></i>
      <strong>Call the office</strong>
      <span>${phone}</span>
    </a>
    <a class="contact-option" href="mailto:${email}">
      <i class="fa-solid fa-envelope" aria-hidden="true"></i>
      <strong>Email Jordan</strong>
      <span>${email}</span>
    </a>
    <a class="contact-option" href="${googleMapsUrl}" target="_blank" rel="noopener">
      <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
      <strong>Visit Bond Street</strong>
      <span>66 Bond Street, Hull</span>
    </a>
  </div>`;
}

function serviceNextSteps(service) {
  const related = serviceInternalLinks[service.slug] || services
    .filter((item) => item.slug !== service.slug)
    .slice(0, 3)
    .map((item) => [item.title, `/services/${item.slug}/`]);

  return `<div class="next-step-panel">
    <div>
      <p class="eyebrow">Often handled together</p>
      <h2>Useful next steps</h2>
      <p>Most accounts jobs touch another deadline. These are the pages clients commonly need next.</p>
    </div>
    <div class="next-step-links">
      ${related.slice(0, 3).map(([label, href]) => `<a href="${href}">${esc(label)} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>`).join("")}
      <a href="/contact/">Ask about ${esc(service.title)} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
    </div>
  </div>`;
}

const serviceFaqBySlug = {
  "limited-company-accounts": [
    ["When are limited company accounts due?", "Companies House accounts are usually due 9 months after the company year end. Corporation Tax is usually due 9 months and 1 day after the period ends."],
    ["Can you file both Companies House accounts and the CT600?", "Yes. JT Accountancy can prepare the year-end accounts, Corporation Tax calculation and CT600 so the filings match."]
  ],
  "sole-trader-accounts": [
    ["Do sole traders need full accounts?", "You usually need reliable profit figures for your Self Assessment tax return. Jordan can turn your records into the figures needed for HMRC."],
    ["Can you help with payment on account?", "Yes. JT Accountancy can explain what payments on account mean and help you plan for the January and July tax payments."]
  ],
  "management-accounts": [
    ["How often should management accounts be prepared?", "Monthly or quarterly usually works best, depending on how quickly you need figures for decisions, cash flow or funding conversations."],
    ["What do management accounts show?", "They can show profit, costs, cash-flow pressure, VAT and payroll checks, and the areas that need attention before the year end."]
  ],
  bookkeeping: [
    ["Can you tidy up old bookkeeping?", "Yes. JT Accountancy can review the records, reconcile the bank and sort missing receipts or unclear transactions before accounts or VAT returns are prepared."],
    ["Do I need cloud bookkeeping software?", "Not always, but it often makes the process easier. Jordan can advise on a practical setup for the size of the business."]
  ],
  "vat-returns": [
    ["Can you submit VAT returns through Making Tax Digital?", "Yes. JT Accountancy can prepare and submit VAT returns using MTD-compatible records."],
    ["Can you check which VAT scheme I should use?", "Yes. Jordan can review whether the standard, flat rate or another VAT approach is suitable for the business."]
  ],
  payroll: [
    ["Can you run monthly payroll for a small team?", "Yes. JT Accountancy can handle payslips, payroll reports, RTI submissions, starters, leavers and pension admin for small employers."],
    ["Do directors need payroll?", "Often, yes. Director salary planning can be part of payroll and wider company tax planning."]
  ],
  "personal-tax-returns": [
    ["Who needs a personal tax return?", "Directors, landlords, sole traders and people with untaxed income often need to complete Self Assessment."],
    ["Can you deal with HMRC on my behalf?", "Yes. Once authorised, JT Accountancy can deal with HMRC for the relevant tax return work."]
  ],
  "company-tax-returns": [
    ["Is the company tax return separate from the accounts?", "Yes. The CT600 is the Corporation Tax return, but it is prepared from the company accounts and tax calculation."],
    ["Can you help reduce Corporation Tax legally?", "Yes. Jordan can check expenses, capital allowances and director planning points before the return is filed."]
  ],
  "partnership-accounts": [
    ["Do partnerships need a separate tax return?", "Yes. A partnership return is usually needed, and each partner may also need their own Self Assessment return."],
    ["Can you split profits between partners?", "Yes. JT Accountancy can prepare the partnership accounts and calculate profit shares for the partners."]
  ],
  "company-formations": [
    ["Can you set up the limited company for me?", "Yes. JT Accountancy can help with formation and explain the first accounting, tax and bookkeeping deadlines."],
    ["Should I be a sole trader or limited company?", "That depends on profit, risk, admin and tax position. Jordan can talk through the pros and cons before you decide."]
  ],
  "cis-returns": [
    ["When are CIS returns due?", "Monthly CIS returns are usually due by the 19th after the tax month ends."],
    ["Can you help verify subcontractors?", "Yes. JT Accountancy can advise on verification, deduction statements and monthly CIS record keeping."]
  ],
  "tax-planning": [
    ["When should tax planning be done?", "Before the year end is usually best, because there is still time to make decisions rather than just report what already happened."],
    ["Can tax planning cover both business and personal tax?", "Yes. Director salary, dividends, pension contributions, allowances and personal income can be reviewed together."]
  ]
};

function serviceFaqs(service) {
  return [
    ...(serviceFaqBySlug[service.slug] || []),
    [`Do I need ${service.title.toLowerCase()}?`, `If the records, deadlines or tax questions are taking time away from running things, it is worth getting help before the deadline gets close.`],
    ["Can JT Accountancy work with my existing records?", "Yes. Jordan can look at what you already have, point out any gaps and explain what is needed to finish the work properly."],
    ["How do I get started?", "Call or email Jordan with the basics. He will confirm what records are needed and whether a meeting, phone call or remote handover makes most sense."]
  ];
}

function localServiceLinks(place) {
  const localLinks = [
    ["Limited company accounts", "limited-company-accounts"],
    ["Sole trader accounts", "sole-trader-accounts"],
    ["Bookkeeping", "bookkeeping"],
    ["VAT returns", "vat-returns"],
    ["Payroll", "payroll"],
    ["Personal tax returns", "personal-tax-returns"]
  ];

  return `<div class="local-links" aria-label="Local service links">
    ${localLinks.map(([label, slug]) => `<a href="/services/${slug}/"><span>${esc(label)}</span><strong>${esc(label)} in ${esc(place)}</strong></a>`).join("")}
  </div>`;
}

const home = layout({
  title: "JT Accountancy | Accountant in Hull for Small Businesses",
  description: "JT Accountancy in Hull provides accounts, bookkeeping, payroll, VAT and tax return support for small businesses, sole traders and individuals.",
  pathName: "/",
  body: `<section class="hero">
    <div class="hero-inner">
      <div>
        <h1>Welcome to JT Accountancy</h1>
        <p class="hero-subtitle">Certified accountants with a straight-talking approach.</p>
        <p class="hero-copy">At JT Accountancy, we provide clear, reliable, and tax-efficient advice tailored to your business. We believe accounting should be straightforward, which is why we explain things in plain English without the confusing accountancy jargon.</p>
        <div class="hero-actions">
          <a class="button" href="/contact/"><i class="fa-regular fa-calendar-check" aria-hidden="true"></i> Book a free initial chat</a>
          <a class="button secondary" href="/services/"><i class="fa-solid fa-list-check" aria-hidden="true"></i> Explore services</a>
        </div>
        <a class="hero-rating" href="${googleMapsUrl}" target="_blank" rel="noopener" aria-label="View JT Accountancy Google reviews">
          <span class="google-mark" aria-hidden="true"><img src="/assets/google.png" alt=""></span>
          <strong>5.0</strong>
          <span class="google-stars" aria-hidden="true">${starIcons}</span>
          <span>66 Google reviews</span>
        </a>
      </div>
    </div>
  </section>
  <section class="trust-strip" aria-label="Key services">
    <div class="section-inner">
      <a class="trust-item" href="/services/limited-company-accounts/"><strong>Accounts</strong><span>Company, partnership and sole trader accounts.</span></a>
      <a class="trust-item" href="/services/personal-tax-returns/"><strong>Tax</strong><span>Personal, partnership and company tax returns.</span></a>
      <a class="trust-item" href="/services/payroll/"><strong>Payroll</strong><span>Reliable payroll and employer support.</span></a>
      <a class="trust-item" href="/services/vat-returns/"><strong>VAT</strong><span>MTD-ready VAT return support.</span></a>
    </div>
  </section>
  <section class="section">
    <div class="section-inner">
      <div class="section-head">
        <div>
          <p class="eyebrow">Accountancy services</p>
          <h2>Accounts, tax, payroll and VAT.</h2>
        </div>
        <p>Start with the work you need now, then add <a href="/services/bookkeeping/">bookkeeping</a>, <a href="/services/payroll/">payroll</a>, <a href="/services/vat-returns/">VAT returns</a> or <a href="/services/tax-planning/">tax planning</a> when it becomes useful.</p>
      </div>
      ${serviceCards(services.slice(0, 6))}
      <div class="section-actions"><a class="button secondary" href="/services/"><i class="fa-solid fa-table-cells-large" aria-hidden="true"></i> View all services</a></div>
    </div>
  </section>
  <section class="section alt">
    <div class="section-inner split">
      <div>
        <p class="eyebrow">About JT Accountancy</p>
          <h2>Personal support from Jordan Taylor.</h2>
        <p>JT Accountancy was founded in June 2022 by Jordan Taylor; a local, certified, well-known accountant with over a decade of experience in the accountancy profession. Jordan has built a reputation for providing an excellent service to all clients, regardless of whether they are a multi-million pound turnover corporate client or an individual personal tax client.</p>
        <p>Over the last few years, Jordan has grown the practice to a team of 8 talented, hard working professionals. Clients deal directly with Jordan and the team for accurate work, clear replies and no last-minute rush around deadlines.</p>
        <div class="section-actions"><a class="button" href="/about/"><i class="fa-solid fa-user-tie" aria-hidden="true"></i> Meet JT Accountancy</a></div>
      </div>
      <div class="portrait"><img src="/assets/jt-jordan-desk.jpeg" alt="Jordan Taylor working at the JT Accountancy office in Hull"></div>
    </div>
  </section>
  <section class="section navy reviews-section">
    <div class="section-inner">
      <div class="section-head quote-head">
        <div>
          <p class="eyebrow">Client feedback</p>
          <h2>What our clients say.</h2>
        </div>
        <a class="google-rating" href="${googleMapsUrl}" target="_blank" rel="noopener" aria-label="View JT Accountancy Google reviews">
          <span class="google-mark" aria-hidden="true"><img src="/assets/google.png" alt=""></span>
          <span class="google-score">5.0</span>
          <span class="google-stars" aria-hidden="true">${starIcons}</span>
          <span class="google-review-count">66 Google reviews</span>
        </a>
      </div>
      <div class="quote-grid">
        ${testimonials.slice(0, 6).map((item) => `<figure class="quote"><div class="stars" aria-label="5 star review">${starIcons}</div><blockquote>${esc(item.quote)}</blockquote><figcaption><span class="review-avatar"><img src="/assets/google.png" alt="Google" style="width: 24px; height: 24px;"></span><span><cite>${esc(item.name)}</cite><small>Google Review</small></span></figcaption></figure>`).join("")}
      </div>
      <div class="section-actions review-actions">
        <a class="button secondary" href="${googleMapsUrl}" target="_blank" rel="noopener"><i class="fa-brands fa-google" aria-hidden="true"></i> Read all Google reviews <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
      </div>
    </div>
  </section>
  <section class="section navy blog-section">
    <div class="section-inner">
      <div class="section-head quote-head" style="grid-template-columns: 1fr; text-align: center;">
        <div>
          <p class="eyebrow">News & Insights</p>
          <h2>Latest from JT Accountancy</h2>
          <p style="max-width: 800px; margin: 20px auto 0;">We're constantly keeping up-to-date with the latest tax and accountancy news, monitoring latest technology and of course getting involved with all things Hull!</p>
        </div>
      </div>
      ${blogCards()}
      <div class="section-actions review-actions">
        <a class="button secondary" href="/blog/"><i class="fa-solid fa-newspaper" aria-hidden="true"></i> View all articles</a>
      </div>
    </div>
  </section>
  ${faqSection()}
  ${cta()}`
});

const about = layout({
  title: "About JT Accountancy | Jordan Taylor, Accountant in Hull",
  description: "Learn about JT Accountancy in Hull, run by Jordan Taylor and supporting small businesses, sole traders and personal tax clients.",
  pathName: "/about/",
  body: `${pageHero({
    eyebrow: "About",
    title: "A local accountant you can actually speak to.",
    summary: "JT Accountancy is run by Jordan Taylor in Hull, supporting small businesses, sole traders, landlords and personal tax clients with clear advice and reliable deadlines.",
    fact: { title: "Based in Hull", text: "Office on Bond Street, with remote support available when it is easier." }
  })}
  <section class="section">
    <div class="section-inner split">
      <div class="prose">
        <p class="eyebrow">The practice</p>
        <h2>Clear accounts, plain English replies and no deadline drama.</h2>
        <p>JT Accountancy was founded in June 2022 by Jordan Taylor, a local certified accountant with over a decade of experience in practice. The firm has grown into a team of 8, working with clients who want accurate accounts, straightforward tax advice and someone sensible to call when questions come up.</p>
        <p>The approach is simple: understand what you need, explain the next step, then keep the work moving. No mystery, no unnecessary jargon, and no leaving everything until the last minute.</p>
        <div class="about-points">
          <div><strong>Direct</strong><span>Speak to Jordan and the team, not a faceless helpdesk.</span></div>
          <div><strong>Practical</strong><span>Advice is based around what needs doing now and what can wait.</span></div>
          <div><strong>Local</strong><span>Based on Bond Street in Hull, with remote support available.</span></div>
        </div>
        <h2>Who we work with</h2>
        <ul class="feature-list">
          <li><a href="/services/limited-company-accounts/">Limited company directors</a> who need accounts, Corporation Tax and practical planning.</li>
          <li><a href="/services/sole-trader-accounts/">Sole traders and freelancers</a> who want self assessment handled accurately.</li>
          <li>Partnerships that need joined-up accounts and tax return support.</li>
          <li>Small employers who want <a href="/services/payroll/">payroll</a> and pension admin handled reliably.</li>
          <li>Individuals with rental income, side income or other <a href="/services/personal-tax-returns/">self assessment</a> needs.</li>
        </ul>
      </div>
      <div class="portrait"><img src="/assets/jt-office-director.jpeg" alt="Jordan Taylor at the JT Accountancy office in Hull"></div>
    </div>
  </section>
  <section class="section alt">
    <div class="section-inner">
      <div class="section-head">
        <div>
          <p class="eyebrow">Bond Street office</p>
          <h2>A visible local practice in Hull.</h2>
        </div>
        <p>The office is located on Bond Street in Hull City Centre, providing easy access to clients from all over the city.</p>
      </div>
      <div class="office-feature">
        <div class="office-image">
          <img src="/assets/jt-bond-street-team.jpeg" alt="JT Accountancy team outside the Bond Street office in Hull">
        </div>
        <div class="office-copy">
          <p class="eyebrow">Visit or work remotely</p>
          <h3>66 Bond Street, Hull</h3>
          <p>We welcome all our clients to pop in at a mutually convenient time for a catch up and a brew! Alternatively, call for quick questions or work remotely when that is easier.</p>
          <ul class="feature-list compact-list">
            <li>Office appointments available Monday to Friday.</li>
            <li>Support for accounts, tax returns, VAT, payroll and bookkeeping.</li>
            <li>Remote service available for clients across the UK.</li>
          </ul>
          <a class="text-link" href="/contact/">Contact JT Accountancy <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
        </div>
      </div>
    </div>
  </section>
  ${cta()}`
});

const servicesIndex = layout({
  title: "Accountancy Services in Hull | JT Accountancy",
  description: "Explore JT Accountancy services in Hull including company accounts, sole trader accounts, bookkeeping, VAT, payroll and tax planning.",
  pathName: "/services/",
  body: `${pageHero({
    eyebrow: "Services",
    title: "Accounts, tax and payroll support without the fuss.",
    summary: "Choose the service you need now, or speak to Jordan if you are not sure where to start. JT Accountancy helps with annual accounts, tax returns, bookkeeping, VAT and payroll.",
    fact: { title: "Start where you are", text: "Bring the records you have. Jordan will explain what is missing and what needs doing first." }
  })}
  <section class="section services-intro">
    <div class="section-inner">
      ${serviceSummaryStrip()}
    </div>
  </section>
  <section class="section">
    <div class="section-inner">
      <div class="section-head compact-head">
        <div>
          <p class="eyebrow">What we handle</p>
          <h2>Core services.</h2>
        </div>
        <p>Most clients start with accounts or tax returns, then add bookkeeping, VAT, payroll or planning as the business grows.</p>
      </div>
      ${serviceCards()}
    </div>
  </section>
  ${cta()}`
});

const locationsIndex = layout({
  title: "Accountants in Hull and East Yorkshire | JT Accountancy",
  description: "JT Accountancy supports clients in Hull, Kirk Ella, Beverley, Cottingham, Hessle and East Yorkshire with accounting and tax services.",
  pathName: "/locations/",
  body: `${pageHero({
    eyebrow: "Locations",
    title: "Accountants across Hull and East Yorkshire.",
    summary: "JT Accountancy works from Hull with local businesses, sole traders, landlords and individuals across East Yorkshire.",
    fact: { title: "Hull office", text: "Meet at Bond Street, call the office or send records remotely." }
  })}
  <section class="section">
    <div class="section-inner">
      ${locationCards()}
    </div>
  </section>
  ${cta()}`
});

const blogIndex = layout({
  title: "Accountancy Blog | JT Accountancy Hull",
  description: "Read practical accountancy, tax, payroll and bookkeeping articles from JT Accountancy for small businesses and individuals in Hull.",
  pathName: "/blog/",
  body: `${pageHero({
    eyebrow: "Blog",
    title: "Useful notes on tax, accounts and business admin.",
    summary: "Short, practical articles from JT Accountancy for small businesses, directors, sole traders and personal tax clients.",
    fact: { title: "A quick note", text: "These articles are general guidance. Ask Jordan before making tax or payroll decisions." }
  })}
  <section class="section blog-index-section">
    <div class="section-inner">
      <div class="section-head compact-head">
        <div>
          <p class="eyebrow">Latest articles</p>
          <h2>Plain English guidance.</h2>
        </div>
        <p>No filler. Just useful answers to the questions clients ask around accounts, tax returns, payroll and planning.</p>
      </div>
      ${blogCards()}
    </div>
  </section>
  ${cta()}`
});

const contact = layout({
  title: "Contact JT Accountancy | Accountant in Hull",
  description: "Contact JT Accountancy in Hull to discuss accounts, tax returns, VAT, payroll, bookkeeping or practical support for your business.",
  pathName: "/contact/",
  body: `${contactHero()}
  <section class="section alt contact-main-section">
    <div class="section-inner contact-grid">
      <div class="card">
        <div class="contact-photo"><img src="/assets/jt-phone-call.jpeg" alt="JT Accountancy team member speaking with a client by phone"></div>
        <p class="eyebrow">Send a message</p>
        <h2>Tell us what you need help with.</h2>
        <p>Share what you need help with, whether it is a tax return, limited company accounts, payroll, VAT, bookkeeping or a new business setup.</p>
        <ul class="check-list">
          <li>Your deadline, if you know it</li>
          <li>The service you need help with</li>
          <li>Whether your records are already prepared</li>
        </ul>
      </div>
      <form class="card form" action="https://api.web3forms.com/submit" method="POST">
        <h2>Enquiry form</h2>
        <input type="hidden" name="access_key" value="bb006b3c-616a-4761-9f1c-db830e94fe39">
        <input type="hidden" name="subject" value="New Enquiry from JT Accountancy">
        <input type="hidden" name="from_name" value="JT Accountancy Website">
        <label>Name <input name="name" autocomplete="name" required></label>
        <label>Email <input type="email" name="email" autocomplete="email" required></label>
        <label>Service <select name="service">${services.map((service) => `<option>${esc(service.title)}</option>`).join("")}</select></label>
        <label>Message <textarea name="message" required></textarea></label>
        <button class="button" type="submit"><i class="fa-solid fa-paper-plane" aria-hidden="true"></i> Send enquiry</button>
      </form>
    </div>
  </section>
  <section class="section">
    <div class="section-inner">
      <div class="section-head">
        <div>
          <p class="eyebrow">Find us</p>
          <h2>JT Accountancy on Bond Street.</h2>
        </div>
        <p>Visit the Hull office or use the map to plan your route to 66 Bond Street, Hull, HU1 3EN.</p>
      </div>
      <div class="hours-strip" aria-label="Opening hours">
        ${openingHours.map(([day, hours]) => `<div><i class="fa-regular fa-clock" aria-hidden="true"></i><strong>${day}</strong><span>${hours}</span></div>`).join("")}
      </div>
      <div class="map-embed">
        <iframe title="Google Map showing JT Accountancy Services Limited in Hull" src="${googleMapEmbedUrl}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <div class="section-actions">
        <a class="button secondary" href="${googleMapsUrl}" target="_blank" rel="noopener"><i class="fa-solid fa-map-location-dot" aria-hidden="true"></i> Open in Google Maps</a>
      </div>
    </div>
  </section>`
});

function servicePage(service) {
  const relatedLinks = serviceInternalLinks[service.slug] || [];
  const relatedParagraph = relatedLinks.length
    ? `<p>This work often connects with ${inlineLinks(relatedLinks)}, depending on how your records, filings and tax position fit together.</p>`
    : "";
  const faq = serviceFaqs(service);
  return layout({
    title: `${service.title} in Hull | JT Accountancy`,
    description: `${service.title} in Hull from JT Accountancy, with clear support from Jordan Taylor for small businesses and individuals.`,
    pathName: `/services/${service.slug}/`,
    schema: [
      {
        "@type": "Service",
        "@id": `${siteUrl}/services/${service.slug}/#service`,
        name: service.title,
        provider: { "@id": `${siteUrl}/#business` },
        areaServed: ["Hull", "East Yorkshire"],
        description: service.summary,
        url: url(`/services/${service.slug}/`)
      },
      faqSchema(faq),
      breadcrumbSchema([{ label: "Services", href: "/services/" }, { label: service.title, href: `/services/${service.slug}/` }])
    ],
    body: `${pageHero({
      eyebrow: "Service",
      title: service.title,
      summary: service.summary,
      fact: { title: "Ideal for", text: service.audience },
      breadcrumbs: [{ label: "Services", href: "/services/" }, { label: service.title }]
    })}
    <section class="section service-page-section">
      <div class="section-inner content-grid service-layout">
        <article class="prose service-detail">
          <div class="service-intro-panel">
            <p class="eyebrow">How it works</p>
            <h2>Clear support from first record to final filing.</h2>
            <div class="service-intro-copy">
              <p>${esc(service.audience)} Jordan will confirm what is needed, check the figures and keep you updated before anything is filed.</p>
              <p>${esc(service.title)} work is available for clients in <a href="/locations/accountants-hull/">Hull</a> and across <a href="/locations/accountants-east-yorkshire/">East Yorkshire</a>, with remote working available when it suits better.</p>
              <p>Most clients want the same thing: tidy records, no missed dates and a straight answer when they ask a question.</p>
              ${relatedParagraph}
            </div>
          </div>
          <div class="service-includes-panel">
            <div>
              <p class="eyebrow">Included</p>
              <h2>What JT Accountancy can handle.</h2>
            </div>
            <ul class="feature-list">${service.includes.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
          </div>
          <div class="service-proof-panel">
            <p class="eyebrow">Why clients choose JT</p>
            <h2>Reliable deadlines, direct contact and plain English answers.</h2>
            <p>You work directly with Jordan Taylor and the team. Deadlines are tracked, questions are answered and the work is explained in normal language.</p>
          </div>
          ${serviceNextSteps(service)}
          <div class="service-faq">
            <h2>Common questions</h2>
            <div class="faq-list">
              ${faq.map(([q, a], index) => `<details${index === 0 ? " open" : ""}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}
            </div>
          </div>
        </article>
        <aside class="sidebar service-sidebar">
          <div class="fact-box service-contact-card">
            <h2>Need help?</h2>
            <p>Call ${phone} or send a message to arrange a free initial consultation.</p>
            <a class="button" href="/contact/"><i class="fa-regular fa-calendar-check" aria-hidden="true"></i> Contact JT Accountancy</a>
            <a class="text-link" href="tel:${phone.replaceAll(" ", "")}"><i class="fa-solid fa-phone" aria-hidden="true"></i> ${phone}</a>
          </div>
          <nav class="card mini-nav" aria-label="Other services">
            <h3>Related services</h3>
            ${services.filter((item) => item.slug !== service.slug).slice(0, 6).map((item) => `<a href="/services/${item.slug}/">${esc(item.title)}</a>`).join("")}
          </nav>
        </aside>
      </div>
    </section>
    ${cta()}`
  });
}

function blogPage(post) {
  return layout({
    title: `${post.title} | JT Accountancy`,
    description: `${post.summary} Read practical tax and accountancy guidance from JT Accountancy in Hull.`,
    pathName: `/blog/${post.slug}/`,
    schema: [{
      "@type": "BlogPosting",
      "@id": `${siteUrl}/blog/${post.slug}/#article`,
      headline: post.title,
      description: post.summary,
      datePublished: post.date,
      dateModified: post.date,
      mainEntityOfPage: url(`/blog/${post.slug}/`),
      author: { "@id": `${siteUrl}/#business` },
      publisher: {
        "@type": "Organization",
        "@id": `${siteUrl}/#publisher`,
        name: "JT Accountancy",
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/assets/logo.webp`
        }
      },
      image: absoluteImage(post.image)
    }, breadcrumbSchema([{ label: "Blog", href: "/blog/" }, { label: post.title, href: `/blog/${post.slug}/` }])],
    body: `${pageHero({
      eyebrow: post.category,
      title: post.title,
      summary: post.summary,
      fact: post.fact,
      breadcrumbs: [{ label: "Blog", href: "/blog/" }, { label: post.title }]
    })}
    <section class="section">
      <div class="section-inner content-grid">
        <article class="prose blog-post">
          <img class="blog-hero-image" src="${esc(post.image)}" alt="${esc(`${post.title} article from JT Accountancy`)}">
          ${post.body}
          <div class="card source-note">
            <h3>Related accountancy help</h3>
            <a class="text-link" href="/services/tax-planning/">Tax planning in Hull <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
            <a class="text-link" href="/services/personal-tax-returns/">Personal tax returns <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
            <a class="text-link" href="/locations/accountants-hull/">Accountants in Hull <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
          </div>
          <div class="card source-note">
            <h3>Useful sources</h3>
            <p>${esc(post.sources.text)}</p>
            ${post.sources.links.map((link) => `<a class="text-link" href="${link.href}" target="_blank" rel="noopener">${esc(link.label)} <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>`).join("")}
          </div>
        </article>
        <aside class="sidebar">
          <div class="fact-box">
            <h2>${esc(post.sidebar.title)}</h2>
            <p>${esc(post.sidebar.text)}</p>
            <a class="button" href="/contact/"><i class="fa-solid fa-arrow-right" aria-hidden="true"></i> ${esc(post.sidebar.button)}</a>
          </div>
          <nav class="card mini-nav" aria-label="More articles">
            <h3>More from the blog</h3>
            ${blogPosts.filter((item) => item.slug !== post.slug).map((item) => `<a href="/blog/${item.slug}/">${esc(item.title)}</a>`).join("") || `<a href="/services/tax-planning/">Tax Planning</a><a href="/services/payroll/">Payroll</a>`}
          </nav>
        </aside>
      </div>
    </section>
    ${cta()}`
  });
}

function locationPage(location) {
  const place = esc(location.place);
  const seoTitle = `Accountants in ${location.place}`;
  return layout({
    title: `${seoTitle} | JT Accountancy`,
    description: `${seoTitle} from JT Accountancy, supporting local businesses, sole traders and personal tax clients from the Hull office.`,
    pathName: `/locations/${location.slug}/`,
    schema: [
      localBusinessSchema(location),
      breadcrumbSchema([{ label: "Locations", href: "/locations/" }, { label: seoTitle, href: `/locations/${location.slug}/` }])
    ],
    body: `${pageHero({
      eyebrow: "Location",
      title: location.title,
      summary: location.summary,
      fact: { title: "Local service area", text: `Accountancy support for clients in ${location.place} and nearby areas.` },
      breadcrumbs: [{ label: "Locations", href: "/locations/" }, { label: location.title }]
    })}
    <section class="section">
      <div class="section-inner content-grid">
        <article class="prose">
          <h2>Accountancy support in ${esc(location.place)}</h2>
          <p>${esc(location.angle)}</p>
          <p>Services include <a href="/services/limited-company-accounts/">limited company accounts in ${place}</a>, <a href="/services/sole-trader-accounts/">sole trader accounts in ${place}</a>, <a href="/services/personal-tax-returns/">personal tax returns in ${place}</a>, <a href="/services/vat-returns/">VAT returns in ${place}</a>, <a href="/services/payroll/">payroll support in ${place}</a>, <a href="/services/bookkeeping/">bookkeeping in ${place}</a>, partnership accounts, CIS returns and tax planning.</p>
          <h2>Services available locally</h2>
          ${localServiceLinks(location.place)}
          <ul class="feature-list">${services.slice(0, 8).map((service) => `<li><a href="/services/${service.slug}/">${esc(service.title)}</a> - ${esc(service.summary)}</li>`).join("")}</ul>
          <h2>A clear process</h2>
          <p>Start by calling or emailing Jordan with the basics. JT Accountancy will confirm what records are needed and how the work can be handled.</p>
        </article>
        <aside class="sidebar">
          <div class="fact-box">
            <h2>Based near ${esc(location.place)}</h2>
            <p>${address}</p>
            <a class="button" href="/contact/"><i class="fa-regular fa-calendar-check" aria-hidden="true"></i> Arrange a consultation</a>
          </div>
          <nav class="card mini-nav" aria-label="Nearby locations">
            <h3>Nearby areas</h3>
            ${locations.filter((item) => item.slug !== location.slug).map((item) => `<a href="/locations/${item.slug}/">${esc(item.place)}</a>`).join("")}
          </nav>
        </aside>
      </div>
    </section>
    ${cta()}`
  });
}

const pages = [
  ["/index.html", home],
  ["/about/index.html", about],
  ["/services/index.html", servicesIndex],
  ["/locations/index.html", locationsIndex],
  ["/blog/index.html", blogIndex],
  ["/contact/index.html", contact],
  ...services.map((service) => [`/services/${service.slug}/index.html`, servicePage(service)]),
  ...locations.map((location) => [`/locations/${location.slug}/index.html`, locationPage(location)]),
  ...blogPosts.map((post) => [`/blog/${post.slug}/index.html`, blogPage(post)])
];

await Promise.all([
  rm(path.join(root, "about"), { recursive: true, force: true }),
  rm(path.join(root, "services"), { recursive: true, force: true }),
  rm(path.join(root, "locations"), { recursive: true, force: true }),
  rm(path.join(root, "blog"), { recursive: true, force: true }),
  rm(path.join(root, "contact"), { recursive: true, force: true })
]);

for (const [file, content] of pages) {
  const fullPath = path.join(root, file);
  await mkdir(path.dirname(fullPath), { recursive: true });
  await writeFile(fullPath, content);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(([file]) => {
  const pathName = file.replace(/index\.html$/, "");
  return `  <url><loc>${url(pathName)}</loc></url>`;
}).join("\n")}
</urlset>
`;

await writeFile(path.join(root, "sitemap.xml"), sitemap);
await writeFile(path.join(root, "robots.txt"), `User-agent: *
Allow: /
Sitemap: ${siteUrl}/sitemap.xml
`);

await writeFile(path.join(root, ".htaccess"), `RewriteEngine On
RewriteCond %{HTTP_HOST} ^www\\.jtaccountancy\\.co\\.uk$ [NC]
RewriteRule ^(.*)$ https://jtaccountancy.co.uk/$1 [R=301,L]

Redirect 301 /ourservices /services/
Redirect 301 /aboutus /about/
Redirect 301 /contactus /contact/
Redirect 301 /our-services /services/
Redirect 301 /contact-us /contact/
`);

await writeFile(path.join(root, "README.md"), `# JT Accountancy website redesign

Static HTML website for JT Accountancy.

## Commands

- \`npm run build\` regenerates the HTML pages from \`scripts/build-site.mjs\`.
- \`npm run dev\` serves the site locally at \`http://127.0.0.1:8088\`.

## Pages

- Home, about, services index, locations index and contact page.
- Individual service pages for ${services.length} accountancy services.
- Individual location pages for ${locations.map((location) => location.place).join(", ")}.
`);

console.log(`Generated ${pages.length} pages`);
