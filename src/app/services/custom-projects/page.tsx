import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lab Services | Custom Research Projects | rPeptide',
  description: 'Specialized biochemical laboratory services, protein characterization, fibril formation monitoring, and quality assays by rPeptide.',
};

export default function LabServicesPage() {
  return (
    <div className="w-full bg-white pb-16">
      {/* Hero Header */}
      <header className="relative w-full h-56 md:h-72 bg-brand-charcoal overflow-hidden flex items-center justify-center">
        <Image
          src="/assets/images/banner-contract-services-miscroscope.jpg"
          alt="Lab Services"
          fill
          priority
          className="object-cover object-center brightness-75"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-display drop-shadow-md">
            Lab Services
          </h1>
          <p className="text-base sm:text-lg text-gray-200 mt-2 font-medium">
            Analytical Assays, Characterization &amp; Quality Control
          </p>
        </div>
      </header>

      {/* Subnav */}
      <nav className="bg-[#e9ecef] border-b border-gray-300 py-2.5 px-4 overflow-x-auto">
        <div className="site-container flex items-center space-x-4 text-xs sm:text-sm font-semibold whitespace-nowrap">
          <Link
            href="/services/contract-services"
            className="py-1 px-3 text-brand-charcoal hover:text-brand-blue hover:bg-white rounded transition-colors"
          >
            Custom Peptides &amp; Proteins
          </Link>
          <Link
            href="/services/custom-projects"
            className="py-1 px-3 bg-brand-blue text-white rounded"
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

      <div className="site-container py-12 max-w-4xl space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-brand-charcoal mb-4">
            Specialized Laboratory &amp; Analytical Testing Services
          </h2>
          <p className="text-base text-gray-700 leading-relaxed mb-6">
            In addition to product manufacturing, rPeptide provides contract analytical and testing services for biotechnology startups, pharmaceutical screening groups, and academic institutions worldwide.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="border border-gray-200 p-6 bg-gray-50">
              <h3 className="font-bold text-base text-brand-charcoal mb-2">Biophysical Characterization</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Circular dichroism (CD), dynamic light scattering (DLS), Thioflavin T (ThT) fluorescence kinetics, and transmission electron microscopy (TEM) validation of amyloid aggregates.
              </p>
            </div>

            <div className="border border-gray-200 p-6 bg-gray-50">
              <h3 className="font-bold text-base text-brand-charcoal mb-2">Mass Spectrometry &amp; Purity</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                MALDI-TOF, electrospray ionization (ESI-MS), and analytical RP-HPLC purity verification with comprehensive Certificates of Analysis.
              </p>
            </div>

            <div className="border border-gray-200 p-6 bg-gray-50">
              <h3 className="font-bold text-base text-brand-charcoal mb-2">Custom Aliquoting &amp; Lyophilization</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Precise micro-aliquoting down to 0.1 mg under temperature-controlled inert nitrogen environments to ensure monomer preservation.
              </p>
            </div>

            <div className="border border-gray-200 p-6 bg-gray-50">
              <h3 className="font-bold text-base text-brand-charcoal mb-2">Preformed Fibril Seeding Assays</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Standardized seeding reaction testing, sonication protocol optimization, and batch comparability assurance.
              </p>
            </div>
          </div>

          <div className="p-6 bg-blue-50 border border-blue-200 text-center space-y-4">
            <h3 className="font-bold text-lg text-brand-charcoal">Have a custom analytical project in mind?</h3>
            <p className="text-sm text-gray-700 max-w-xl mx-auto">
              Our scientific team can design a bespoke protocol tailored to your target protein, solubility requirements, and deadlines.
            </p>
            <Link
              href="/about-us/contact-information"
              className="btn-primary text-xs uppercase tracking-wider py-3 px-8 inline-block"
            >
              Discuss With Our Scientists
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
