import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Research Blog & Technical Bulletins | rPeptide',
  description: 'Technical bulletins, peptide preparation protocols, and latest scientific updates from rPeptide scientists.',
};

const ARTICLES = [
  {
    title: 'Choosing the Optimal Counter-Ion for Beta-Amyloid: TFA vs HCl vs NH4OH',
    date: 'February 18, 2026',
    author: 'rPeptide Scientific Team',
    category: 'Technical Guide',
    excerpt: 'Counter-ions play a pivotal role in the monomeric stability, aggregation propensity, and cellular cytotoxicity of synthetic and recombinant Beta-Amyloid peptides in biophysical research.',
    slug: 'choosing-optimal-counter-ion-beta-amyloid',
  },
  {
    title: 'Standardized Sonication Protocols for Alpha-Synuclein Preformed Fibrils (PFFs)',
    date: 'January 14, 2026',
    author: 'Dr. Evelyn Reed',
    category: 'Protocols',
    excerpt: 'Detailed parameters for water-bath sonication to achieve consistent fibril fragment length distributions (20–50 nm) for in vitro seeding and primary neuronal culture uptake.',
    slug: 'sonication-protocols-alpha-synuclein-pffs',
  },
  {
    title: 'Recombinant Uniform N15 and C13 Isotopic Labeling for High-Resolution NMR',
    date: 'November 29, 2025',
    author: 'rPeptide Analytical Services',
    category: 'Biochemical Synthesis',
    excerpt: 'How uniform >98% isotopic incorporation is verified through mass spectrometry and 2D HSQC NMR spectra for intrinsically disordered neurodegenerative proteins.',
    slug: 'recombinant-isotopic-labeling-nmr',
  },
];

export default function BlogsPage() {
  return (
    <div className="w-full bg-white pb-16">
      <header className="relative w-full h-48 md:h-60 bg-brand-charcoal overflow-hidden flex items-center justify-center">
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-display drop-shadow-md">
            Scientific Blogs &amp; News
          </h1>
          <p className="text-base sm:text-lg text-gray-200 mt-2 font-medium">
            Technical Insights from Peptide Research Chemists
          </p>
        </div>
      </header>

      {/* Subnav */}
      <nav className="bg-[#e9ecef] border-b border-gray-300 py-2.5 px-4 overflow-x-auto">
        <div className="site-container flex items-center space-x-4 text-xs sm:text-sm font-semibold whitespace-nowrap">
          <Link href="/resources/citations" className="py-1 px-3 text-brand-charcoal hover:text-brand-blue hover:bg-white rounded transition-colors">
            Citations
          </Link>
          <Link href="/resources/blogs" className="py-1 px-3 bg-brand-blue text-white rounded">
            Blogs
          </Link>
          <Link href="/resources/international-distributors" className="py-1 px-3 text-brand-charcoal hover:text-brand-blue hover:bg-white rounded transition-colors">
            International Distributors
          </Link>
          <Link href="/resources/faqs" className="py-1 px-3 text-brand-charcoal hover:text-brand-blue hover:bg-white rounded transition-colors">
            FAQs
          </Link>
          <Link href="/resources/ordering" className="py-1 px-3 text-brand-charcoal hover:text-brand-blue hover:bg-white rounded transition-colors">
            Ordering Overview
          </Link>
          <Link href="/resources/terms-conditions" className="py-1 px-3 text-brand-charcoal hover:text-brand-blue hover:bg-white rounded transition-colors">
            Terms of Use
          </Link>
        </div>
      </nav>

      <div className="site-container py-12 max-w-4xl space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((art, idx) => (
            <article key={idx} className="border border-gray-200 bg-white flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="p-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200 inline-block mb-3">
                  {art.category}
                </span>
                <h3 className="font-bold text-base text-brand-charcoal hover:text-brand-blue transition-colors mb-3 leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  {art.excerpt}
                </p>
              </div>

              <div className="p-6 pt-0 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 mt-auto">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{art.date}</span>
                </div>
                <span className="font-semibold text-brand-blue hover:underline cursor-pointer flex items-center gap-1">
                  Read Article &rarr;
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
