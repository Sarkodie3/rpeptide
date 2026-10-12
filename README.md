# rPeptide Website Reconstruction

A modern, high-fidelity reconstruction of the [rPeptide](https://www.rpeptide.com) corporate and e-commerce web platform.

This codebase restores the full visual identity, user experience, navigation structure, product catalog, and interactive workflows of the live reference website, engineered on a modern Next.js + React + Tailwind CSS architecture.

---

## 1. Architectural Overview & Forensic Comparison

| Aspect | Original Implementation | Reconstructed Implementation |
|---|---|---|
| **Core Framework** | WordPress 7.1.3 + Timber/Twig | **Next.js 14+ (App Router)** + React 18 |
| **Language** | PHP 8.x + jQuery 3.7.1 | **TypeScript 5.5** + Modern ES6+ |
| **CSS & Grid** | Zurb Foundation 6 (Sass/SCSS) | **Tailwind CSS 3.4** configured with Foundation grid tokens |
| **E-Commerce** | WooCommerce 11.1.2 + Woo Variation Swatches | **Custom React E-Commerce Engine** with Cart & Auth Contexts |
| **Catalog Filtering** | FacetWP 4.5 (AJAX) | **Client-side Faceted Filter Engine** (instant responsiveness) |
| **Data Layer** | MySQL database | **Normalized, strongly-typed JSON dataset** (368 products, 55 categories) |
| **SEO & Schemas** | Yoast SEO Premium | Built-in Next.js App Router **Metadata API & JSON-LD Organization schema** |

---

## 2. Key Features & Page Inventory

### 2.1 Navigation & Global Components
- **Sticky Ancillary & Main Header**: Includes user account link, live shopping bag amount (`$0.00`) and counter pill, desktop search input, and mobile off-canvas drawer.
- **Mega Dropdown Menu**: Multi-column desktop mega menu for **Products** (Antibodies, Peptides, Proteins, Neurodegenerative Compounds, Coronavirus Tools, Kits, Preformed Fibrils), plus dropdowns for **Services**, **Resources**, and **About**.
- **Global Footer**: Comprehensive mini-map directory, direct contact details (phone, fax, email), social channels (LinkedIn, X/Twitter, YouTube, Bluesky), interactive newsletter subscription form, and research disclaimer.

### 2.2 Product Catalogue & Filtering
- **Route `/products` & `/products/[category]`**:
  - Full catalog of 368 authentic products extracted from the reference site.
  - Subcategory pill navigation and category hero banner with official copy.
  - Multi-faceted filter sidebar: keyword search, category hierarchy with item counts, size checkboxes (`0.5 mg`, `1.0 mg`), price range buckets, and clear all filters.
  - Sorting: Default order, popularity, latest, price low-to-high, price high-to-low, and featured.
  - 4-column product card grid matching WooCommerce styling.
  - Pagination controls.

### 2.3 Product Detail Template (`/product/[slug]`)
- Breadcrumb navigation (`Home / Products / Category / Product`).
- SKU badge and dynamic price ranges (`$120.00 – $200.00`).
- Interactive Size Swatches (`0.5 mg`, `1.0 mg`) updating price and SKU in real time.
- Quantity selector and Add to Cart action with toast alert.
- Biological Sequence Viewer with monospace formatting.
- Tabbed accordions: **Product Details** (physical state, storage temp, shipping temp, source, purity, molecular mass), **References** (peer-reviewed scientific literature), and **Publications** (articles citing rPeptide).
- Related products recommendation grid.

### 2.4 E-Commerce Flow: Cart & Checkout
- **Cart (`/cart`)**: Line items list, size badge, SKU, price, quantity increment/decrement, remove item, active coupon code support (`RESEARCH10` for 10% off, `WELCOME15` for 15% off), tax/shipping calculations, and research disclaimer.
- **Checkout (`/checkout`)**: Full billing/shipping address form, order review table, payment method selector (Credit/Corporate Card or Institutional PO with NET 30 invoicing terms), terms acceptance, and instant order generation with receipt summary.

### 2.5 Customer Portal (`/my-account`)
- Tabbed authentication: Sign In and Registration forms.
- Customer Dashboard displaying placed orders, order status (`Processing`), items, and institutional profile address.

### 2.6 Services & Technical Resources
- `/services/contract-services`: Custom peptide & protein synthesis capabilities and quote inquiry.
- `/services/custom-projects`: Laboratory characterization and assay services.
- `/services/bulk-production-requests`: Detailed quotation form with sequence, quantity, purity, and isotopic labeling parameters.
- `/services/amino-acid-codes`: 20 standard amino acid reference table with 1-letter, 3-letter codes, and molecular weights.
- `/resources/faqs`: 49 categorized questions across General, Ordering, Beta-Amyloids, Taus, Synucleins, and Fibrils with interactive toggles.
- `/resources/citations`: Searchable database of peer-reviewed journal citations.
- `/resources/blogs`: Technical articles and sonication/counter-ion protocols.
- `/resources/international-distributors`: Global partner directory for Europe, Asia, Japan, Canada, and Australia.
- `/resources/ordering`: Ordering instructions, cold-chain shipment terms, and return policy.
- `/resources/terms-conditions` & `/privacy`: Research Use Only disclaimer and terms of use.
- `/sitemap`: HTML directory linking to all site pages and categories.

---

## 3. Project Directory Structure

```
rpeptides/
├── public/
│   └── assets/
│       └── images/               # Recovered logos, hero banners, and category cards
├── src/
│   ├── app/
│   │   ├── about-us/             # Company overview & Contact Information
│   │   ├── api/                  # Backend endpoints (/api/contact)
│   │   ├── cart/                 # Shopping Cart page
│   │   ├── checkout/             # Multi-step Checkout page
│   │   ├── my-account/           # Customer Portal & Auth
│   │   ├── privacy/              # Privacy Policy
│   │   ├── product/[slug]/       # Dynamic Product Detail template
│   │   ├── products/             # Main Catalog & [category] archive
│   │   ├── resources/            # FAQs, Citations, Blogs, Distributors, Ordering, Terms
│   │   ├── services/             # Contract Services, Lab Projects, Bulk Quote, Amino Acids
│   │   ├── sitemap/              # HTML Sitemap
│   │   ├── globals.css           # Tailwind base + rPeptide Foundation classes
│   │   ├── layout.tsx            # Root layout with Header, Footer, JSON-LD, Contexts
│   │   └── page.tsx              # Homepage
│   ├── components/
│   │   ├── Footer.tsx            # Global Footer & Newsletter form
│   │   ├── Header.tsx            # Sticky header, Mega Menu, and off-canvas drawer
│   │   ├── HeroSlider.tsx        # Homepage 3-slide carousel
│   │   ├── ProductCard.tsx       # WooCommerce style catalog card
│   │   └── ProductCatalog.tsx    # Faceted catalog with filtering & pagination
│   ├── context/
│   │   ├── AuthContext.tsx       # Authentication & order persistence
│   │   └── CartContext.tsx       # Shopping cart state & coupon engine
│   ├── data/
│   │   ├── categories.json       # 55 category taxonomy hierarchy
│   │   ├── faqs.json             # 49 extracted FAQ questions & answers
│   │   └── normalized_products.json # 368 normalized products with specifications
│   ├── lib/
│   │   └── products.ts           # Product queries & search helper functions
│   └── types/
│       └── index.ts              # TypeScript interfaces (Product, Variation, CartItem, Order, User)
├── next.config.mjs               # Next.js configuration & image domains
├── package.json                  # Dependencies & build scripts
├── postcss.config.js             # PostCSS Tailwind plugins
├── tailwind.config.ts            # Design tokens (brand colors, Foundation breakpoints)
└── tsconfig.json                 # TypeScript compiler configuration
```

---

## 4. Getting Started

### Prerequisites
- **Node.js**: v18.17.0 or newer (v20+ recommended)
- **npm**: v9+ or newer

### Installation
Dependencies are already configured and installed in the workspace:
```bash
npm install
```

### Running Locally
To launch the development server with Hot Module Reloading:
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:3000
```

### Production Build & Launch
To verify the production build and run the optimized server:
```bash
npm run build
npm run start
```

---

## 5. Design Tokens & Palette Reference

- **Brand Blue**: `#28479E` (Primary navigation, buttons, category links)
- **Brand Dark Blue**: `#14244F` (Ancillary top bar, dark headers)
- **Accent Gold**: `#DDAC40` (Hero CTAs, research warning banners, badges)
- **Gold Hover**: `#C29022`
- **Charcoal Text**: `#2B2C23` / `#313131`
- **Light Gray Background**: `#F2F1F1` / `#F8F9FA`
- **Border Gray**: `#D2DAF3` / `#E5E7EB`
- **Typography**: `"Open Sans"`, `"Kamerik 105"`, `"Sorts Mill Goudy"`
- **Container Max-Width**: `75rem` (`1200px`)
