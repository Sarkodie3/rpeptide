import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Custom Peptides & Proteins | Contract Services | rPeptide',
  description: 'Custom recombinant peptide and protein synthesis, expression, fermentation, and uniform C13 / N15 isotopic labeling services from rPeptide.',
};

export default function ContractServicesPage() {
  return (
    <div className="w-full bg-white pb-16">
      {/* Hero Header */}
      <header className="relative w-full h-56 md:h-72 bg-brand-charcoal overflow-hidden flex items-center justify-center">
        <Image
          src="/assets/images/adobestock_285273048-scaled.jpeg"
          alt="Custom Peptides & Proteins"
          fill
          priority
          className="object-cover object-center brightness-75"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-display drop-shadow-md">
            Custom Peptides &amp; Proteins
          </h1>
          <p className="text-base sm:text-lg text-gray-200 mt-2 font-medium">
            Expression, Labeling, Recombinant, Synthetic
          </p>
        </div>
      </header>

      {/* Subnav */}
      <nav className="bg-[#e9ecef] border-b border-gray-300 py-2.5 px-4 overflow-x-auto">
        <div className="site-container flex items-center space-x-4 text-xs sm:text-sm font-semibold whitespace-nowrap">
          <Link
            href="/services/contract-services"
            className="py-1 px-3 bg-brand-blue text-white rounded"
          >
            Custom Peptides &amp; Proteins
          </Link>
          <Link
            href="/services/custom-projects"
            className="py-1 px-3 text-brand-charcoal hover:text-brand-blue hover:bg-white rounded transition-colors"
          >
            Lab Services
          </Link>
          <Link
            href="/services/bulk-production-requests"
            className="py-1 px-3 text-brand-charcoal hover:text-brand-blue hover:bg-white rounded transition-colors"
          >
            Bulk Quote
          </Link>
          <Link
            href="/services/amino-acid-codes"
            className="py-1 px-3 text-brand-charcoal hover:text-brand-blue hover:bg-white rounded transition-colors"
          >
            Amino Acid Codes
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="site-container py-12 max-w-4xl space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-brand-charcoal mb-4">
            Custom Peptides &amp; Proteins
          </h2>
          <p className="text-base text-gray-700 leading-relaxed mb-6">
            rPeptide has years of expertise and proprietary technology that allows us to skillfully produce peptides and proteins that are difficult to express or purify. We can customize products for you whether they be native sequences, mutations, or isotopically labeled.
          </p>

          <h3 className="text-lg font-bold text-brand-charcoal mb-3">
            Services Available:
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700 leading-relaxed">
            <li><strong>DNA Preparations, Cloning, Mutagenesis</strong> &ndash; Custom molecular biology engineering</li>
            <li><strong>Protein Expression</strong> &ndash; Including process development and scale-up</li>
            <li><strong>Fermentation</strong> &ndash; High-density bacterial cultures and optimized yields</li>
            <li><strong>Downstream Processing</strong> &ndash; Column chromatography, HPLC, mass-spec validation</li>
            <li><strong>Recombinant Labeled Peptides Service</strong> &ndash; N15, C13, FITC, and Biotin labeling</li>
            <li><strong>Unpurified Peptides and Proteins</strong> &ndash; For bulk industrial screening applications</li>
          </ul>
        </div>

        <div className="p-8 bg-blue-50 border border-blue-200">
          <h3 className="font-bold text-lg text-brand-charcoal mb-2">Request a Confidential Custom Quote</h3>
          <p className="text-sm text-gray-700 leading-relaxed mb-6">
            rPeptide will take on your contract research projects from start to finish. Contact us with your target specifications, sequence, purity requirements, and desired quantity. We will respond with a custom quote within 24&ndash;72 business hours.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/services/bulk-production-requests"
              className="btn-primary text-xs uppercase tracking-wider py-3 px-6"
            >
              Request Custom Quote Online
            </Link>
            <a
              href="mailto:Rpeptidessupport@gmail.com?subject=Custom%20Product%20Quote%20Request"
              className="btn-hollow text-xs uppercase tracking-wider py-3 px-6"
            >
              Email Rpeptidessupport@gmail.com
            </a>
          </div>

          <p className="text-xs text-gray-500 italic mt-4">
            All projects are carried out in a collaborative manner and complete confidentiality is assured under NDA.
          </p>
        </div>

        <div className="text-xs text-brand-blue font-semibold italic text-center pt-4">
          <p>rPeptide products are for research purposes only. Not for human consumption.</p>
        </div>
      </div>
    </div>
  );
}
