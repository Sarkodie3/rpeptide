import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HeroSlider from '@/components/HeroSlider';
import ProductCard from '@/components/ProductCard';
import { getProductsByCategory, getAllProducts } from '@/lib/products';

export default function HomePage() {
  const allProducts = getAllProducts();
  const fibrils = getProductsByCategory('preformed-fibrils');
  const displayFibrils = fibrils.length > 0 ? fibrils.slice(0, 3) : allProducts.slice(0, 3);

  const featuredCategories = [
    {
      title: 'Beta-Amyloid Peptides',
      description: 'BA(1-40),NH4OH, BA(1-42),HFIP N15 BA(1-42)',
      image: '/assets/images/home-page-beta-amyloid.jpg',
      link: '/products/peptides',
      btnText: 'Shop Beta-Amyloid',
    },
    {
      title: 'Synuclein Proteins',
      description: 'A-Syn, N15 A-Syn, A-Syn, Mouse A-Syn Mutants',
      image: '/assets/images/home-page-synuclein-protiens.jpg',
      link: '/products/proteins',
      btnText: 'Shop Synuclein',
    },
    {
      title: 'Tau Proteins',
      description: 'Tau-441, Tau-352, C13 Tau-441, FITC Tau-441',
      image: '/assets/images/home-page-tau-proteins.jpg',
      link: '/products/proteins',
      btnText: 'Shop Tau',
    },
    {
      title: 'Contract Services',
      description: 'Custom Peptides & Proteins, Lab Services',
      image: '/assets/images/banner-contract-services-miscroscope.jpg',
      link: '/services/contract-services',
      btnText: 'View Services',
    },
  ];

  return (
    <div className="w-full">
      {/* 1. Hero Carousel */}
      <HeroSlider />

      {/* 2. Featured Categories */}
      <section className="py-14 bg-[#f2f1f1]">
        <div className="site-container">
          <h3 className="text-center font-bold text-2xl md:text-3xl text-brand-charcoal mb-10">
            Featured Categories
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((cat, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48 w-full bg-gray-100">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between text-center">
                  <div>
                    <h4 className="font-bold text-lg text-brand-charcoal mb-2">
                      {cat.title}
                    </h4>
                    <p className="text-xs text-gray-600 mb-6 min-h-[36px]">
                      {cat.description}
                    </p>
                  </div>
                  <Link
                    href={cat.link}
                    className="btn-hollow text-xs uppercase tracking-wider py-2.5 px-4 block w-full"
                  >
                    {cat.btnText}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Preformed Fibrils */}
      <section className="py-14 bg-white">
        <div className="site-container">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 pb-4 border-b border-gray-100">
            <h3 className="font-bold text-2xl text-brand-charcoal">
              Featured Preformed Fibrils
            </h3>
            <Link
              href="/products/preformed-fibrils"
              className="text-sm font-semibold text-brand-blue hover:underline mt-2 sm:mt-0"
            >
              view all Preformed Fibrils &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {displayFibrils.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Market Leading Biotechnology Supplier (Blue Stak) */}
      <section className="py-16 blue-stak">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative h-72 sm:h-96 w-full rounded overflow-hidden shadow-2xl">
              <Image
                src="/assets/images/technologist-industrial-machine-alt.webp"
                alt="Market leading biotechnology supplier"
                fill
                className="object-cover"
              />
            </div>

            {/* Copy */}
            <div className="text-white space-y-5">
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                Market leading biotechnology supplier
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-blue-100">
                rPeptide is a leading peptide and protein company in the USA, supplying high-quality reagents for Alzheimer’s, Parkinson’s, and neurodegenerative disease research worldwide. As a trusted biotech supplier, we provide recombinant peptides, proteins, antibodies, fibrils, and custom services to support academic and industry laboratories.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-blue-100">
                In addition, rPeptide offers a wide range of custom services, including molecular biology, protein expression and purification, and uniform C13 and N15 labeling of peptides and proteins.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-blue-100">
                Researchers looking to buy recombinant peptides, proteins, and research-grade reagents rely on rPeptide for purity, batch-to-batch consistency, and dependable long-term supply.
              </p>
              <p className="font-semibold text-white">
                rPeptide is your trusted R&amp;D partner.
              </p>

              {/* CTAs */}
              <div className="pt-4 flex flex-wrap gap-3">
                <Link
                  href="/resources/citations"
                  className="bg-brand-gold hover:bg-brand-gold-hover text-white text-xs font-bold uppercase tracking-wider py-3 px-6 transition-colors shadow"
                >
                  Publications
                </Link>
                <Link
                  href="/resources/blogs"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/30 text-xs font-bold uppercase tracking-wider py-3 px-6 transition-colors"
                >
                  Industry News
                </Link>
                <Link
                  href="/about-us/contact-information"
                  className="bg-brand-blue-dark hover:bg-black text-white text-xs font-bold uppercase tracking-wider py-3 px-6 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
