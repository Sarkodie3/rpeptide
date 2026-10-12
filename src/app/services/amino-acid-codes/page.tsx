import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Amino Acid Codes Reference Chart | rPeptide',
  description: 'Complete reference table of single-letter and three-letter amino acid codes, molecular weights, and classifications from rPeptide.',
};

const AMINO_ACIDS = [
  { name: 'Alanine', three: 'Ala', one: 'A', mw: '89.09', prop: 'Aliphatic, hydrophobic' },
  { name: 'Arginine', three: 'Arg', one: 'R', mw: '174.20', prop: 'Basic, positively charged' },
  { name: 'Asparagine', three: 'Asn', one: 'N', mw: '132.12', prop: 'Polar, uncharged' },
  { name: 'Aspartic Acid', three: 'Asp', one: 'D', mw: '133.10', prop: 'Acidic, negatively charged' },
  { name: 'Cysteine', three: 'Cys', one: 'C', mw: '121.16', prop: 'Thiol, disulfide bonds' },
  { name: 'Glutamic Acid', three: 'Glu', one: 'E', mw: '147.13', prop: 'Acidic, negatively charged' },
  { name: 'Glutamine', three: 'Gln', one: 'Q', mw: '146.15', prop: 'Polar, uncharged' },
  { name: 'Glycine', three: 'Gly', one: 'G', mw: '75.07', prop: 'Small, non-polar' },
  { name: 'Histidine', three: 'His', one: 'H', mw: '155.16', prop: 'Basic, aromatic' },
  { name: 'Isoleucine', three: 'Ile', one: 'I', mw: '131.18', prop: 'Aliphatic, hydrophobic' },
  { name: 'Leucine', three: 'Leu', one: 'L', mw: '131.18', prop: 'Aliphatic, hydrophobic' },
  { name: 'Lysine', three: 'Lys', one: 'K', mw: '146.19', prop: 'Basic, positively charged' },
  { name: 'Methionine', three: 'Met', one: 'M', mw: '149.21', prop: 'Hydrophobic, thioether' },
  { name: 'Phenylalanine', three: 'Phe', one: 'F', mw: '165.19', prop: 'Aromatic, hydrophobic' },
  { name: 'Proline', three: 'Pro', one: 'P', mw: '115.13', prop: 'Cyclic, conformational rigid' },
  { name: 'Serine', three: 'Ser', one: 'S', mw: '105.09', prop: 'Polar, hydroxylated' },
  { name: 'Threonine', three: 'Thr', one: 'T', mw: '119.12', prop: 'Polar, hydroxylated' },
  { name: 'Tryptophan', three: 'Trp', one: 'W', mw: '204.23', prop: 'Aromatic, indole' },
  { name: 'Tyrosine', three: 'Tyr', one: 'Y', mw: '181.19', prop: 'Aromatic, phenolic' },
  { name: 'Valine', three: 'Val', one: 'V', mw: '117.15', prop: 'Aliphatic, hydrophobic' },
];

export default function AminoAcidCodesPage() {
  return (
    <div className="w-full bg-white pb-16">
      {/* Hero Header */}
      <header className="relative w-full h-56 md:h-72 bg-brand-charcoal overflow-hidden flex items-center justify-center">
        <Image
          src="/assets/images/banner-contract-services-miscroscope.jpg"
          alt="Amino Acid Codes"
          fill
          priority
          className="object-cover object-center brightness-75"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-display drop-shadow-md">
            Amino Acid Codes
          </h1>
          <p className="text-base sm:text-lg text-gray-200 mt-2 font-medium">
            Standard Nomenclature &amp; Reference Guide
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
            className="py-1 px-3 bg-brand-blue text-white rounded"
          >
            Amino Acid Codes
          </Link>
        </div>
      </nav>

      <div className="site-container py-12 max-w-4xl">
        <h2 className="text-2xl font-bold text-brand-charcoal mb-4">
          Standard 20 Amino Acid Code Reference Chart
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed mb-8">
          The table below provides standard IUPAC abbreviations, molecular weights, and biochemical characteristics for the 20 primary proteinogenic amino acids used in rPeptide peptide synthesis and sequencing.
        </p>

        <div className="overflow-x-auto border border-gray-200 shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#28479e] text-white text-xs uppercase font-bold">
              <tr>
                <th className="py-3 px-4">Amino Acid</th>
                <th className="py-3 px-4 text-center">3-Letter Code</th>
                <th className="py-3 px-4 text-center">1-Letter Code</th>
                <th className="py-3 px-4 text-right">Mol. Wt. (Da)</th>
                <th className="py-3 px-4">Properties</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {AMINO_ACIDS.map((aa, idx) => (
                <tr key={aa.one} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-3 px-4 font-semibold text-brand-charcoal">{aa.name}</td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-gray-700">{aa.three}</td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-brand-blue text-base">{aa.one}</td>
                  <td className="py-3 px-4 text-right font-mono text-gray-600">{aa.mw}</td>
                  <td className="py-3 px-4 text-xs text-gray-600">{aa.prop}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
