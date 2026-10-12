import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use | Terms & Conditions | rPeptide',
  description: 'Terms of Use and conditions governing access to rPeptide.com, scientific reagents, and research services.',
};

export default function TermsConditionsPage() {
  return (
    <div className="w-full bg-white pb-16">
      <header className="relative w-full h-48 md:h-60 bg-brand-charcoal overflow-hidden flex items-center justify-center">
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-display drop-shadow-md">
            Terms of Use
          </h1>
        </div>
      </header>

      {/* Subnav */}
      <nav className="bg-[#e9ecef] border-b border-gray-300 py-2.5 px-4 overflow-x-auto">
        <div className="site-container flex items-center space-x-4 text-xs sm:text-sm font-semibold whitespace-nowrap">
          <Link href="/resources/citations" className="py-1 px-3 text-brand-charcoal hover:text-brand-blue hover:bg-white rounded transition-colors">
            Citations
          </Link>
          <Link href="/resources/blogs" className="py-1 px-3 text-brand-charcoal hover:text-brand-blue hover:bg-white rounded transition-colors">
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
          <Link href="/resources/terms-conditions" className="py-1 px-3 bg-brand-blue text-white rounded">
            Terms of Use
          </Link>
        </div>
      </nav>

      <div className="site-container py-12 max-w-4xl space-y-8 text-sm text-gray-700 leading-relaxed">
        <div className="before-palace-order text-xs sm:text-sm">
          <p>rPeptide products are for research purposes only. Not for human consumption.</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-brand-charcoal mb-4">Terms of Use &amp; Legal Notices</h2>
          <p className="mb-4">
            <strong>Please Read Carefully Before Using This Website:</strong>
          </p>
          <p className="mb-4">
            rPeptide, LLC maintains this site for information and communication purposes. This webpage contains the Terms of Use governing your access to and use of rPeptide.com (the &ldquo;Website&rdquo; or &ldquo;Site&rdquo;). If you do not accept these Terms of Use or you do not meet or comply with their provisions, you may not use the Website.
          </p>
          <p className="font-semibold text-brand-blue mb-4">
            Terms and Conditions are subject to change at any time without prior notice.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-bold text-base text-brand-charcoal mb-2">1. Research Use Only (RUO) Certification</h3>
            <p>
              All products sold by rPeptide, LLC are sold exclusively for laboratory research purposes only. They are not intended for human or animal clinical diagnostic or therapeutic purposes, nor are they intended for food, drug, or cosmetic use. The purchaser acknowledges that the products have not been tested for safety or efficacy in humans.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-base text-brand-charcoal mb-2">2. User Communications</h3>
            <p>
              E-mail submissions over the Internet may not be secure and are subject to the risk of interception by third parties. Please consider this fact before e-mailing any sensitive proprietary information. rPeptide, LLC shall not be subject to obligations of confidentiality regarding unsolicited submissions except as governed by mutual Non-Disclosure Agreements (NDAs).
            </p>
          </div>

          <div>
            <h3 className="font-bold text-base text-brand-charcoal mb-2">3. Copyrights and Trademarks</h3>
            <p>
              All materials at this Site, as well as the organization, layout, design tokens, logos, and technical sequence data, are copyrighted and protected by United States and international copyright laws. Any unauthorized commercial reproduction, redistribution, or modification is strictly prohibited.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-base text-brand-charcoal mb-2">4. Warranty &amp; Limitation of Liability</h3>
            <p>
              rPeptide warrants that products conform to the specifications and purity levels stated on the Certificate of Analysis (COA) at the time of shipment. In the event of a non-conforming batch reported within 30 days of receipt, rPeptide will replace the material or credit the purchase price at its sole discretion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
