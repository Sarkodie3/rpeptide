import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sitemap | rPeptide',
  description: 'Complete directory index of pages and product categories on rPeptide.com.',
};

export default function SitemapPage() {
  return (
    <div className="site-container py-16 max-w-4xl space-y-8 text-sm text-gray-700">
      <h1 className="text-3xl font-bold text-brand-charcoal font-display mb-6">Website Sitemap</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-brand-blue border-b pb-2">Products &amp; Categories</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li><Link href="/products" className="hover:text-brand-blue font-semibold">All Products Catalog</Link></li>
            <li><Link href="/products/antibodies" className="hover:text-brand-blue">Antibodies</Link></li>
            <li><Link href="/products/peptides" className="hover:text-brand-blue">Peptides (Beta-Amyloid, Amylin, APP)</Link></li>
            <li><Link href="/products/proteins" className="hover:text-brand-blue">Proteins (Synuclein, Tau, Apolipoprotein)</Link></li>
            <li><Link href="/products/preformed-fibrils" className="hover:text-brand-blue">Preformed Fibrils (PFFs)</Link></li>
            <li><Link href="/products/kits" className="hover:text-brand-blue">ELISA &amp; Assay Kits</Link></li>
            <li><Link href="/products/coronavirus-research-tools" className="hover:text-brand-blue">Coronavirus Research Tools</Link></li>
            <li><Link href="/products/neurodegenerative-related-compounds" className="hover:text-brand-blue">Neurodegenerative Related Compounds</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-brand-blue border-b pb-2">Services</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li><Link href="/services/contract-services" className="hover:text-brand-blue font-semibold">Custom Peptides &amp; Proteins</Link></li>
            <li><Link href="/services/custom-projects" className="hover:text-brand-blue">Laboratory &amp; Analytical Testing Services</Link></li>
            <li><Link href="/services/bulk-production-requests" className="hover:text-brand-blue">Bulk Quotation Request Form</Link></li>
            <li><Link href="/services/amino-acid-codes" className="hover:text-brand-blue">Amino Acid Codes Reference Chart</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-brand-blue border-b pb-2">Resources</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li><Link href="/resources/citations" className="hover:text-brand-blue font-semibold">Peer-Reviewed Citations Database</Link></li>
            <li><Link href="/resources/blogs" className="hover:text-brand-blue">Scientific Blogs &amp; Protocols</Link></li>
            <li><Link href="/resources/international-distributors" className="hover:text-brand-blue">International Distributors</Link></li>
            <li><Link href="/resources/faqs" className="hover:text-brand-blue">Frequently Asked Questions (FAQs)</Link></li>
            <li><Link href="/resources/ordering" className="hover:text-brand-blue">Ordering Overview &amp; PO Terms</Link></li>
            <li><Link href="/resources/terms-conditions" className="hover:text-brand-blue">Terms &amp; Conditions</Link></li>
            <li><Link href="/privacy" className="hover:text-brand-blue">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-brand-blue border-b pb-2">Customer &amp; Orders</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li><Link href="/my-account" className="hover:text-brand-blue font-semibold">Customer Account &amp; Order History</Link></li>
            <li><Link href="/cart" className="hover:text-brand-blue">Shopping Cart</Link></li>
            <li><Link href="/checkout" className="hover:text-brand-blue">Checkout</Link></li>
            <li><Link href="/about-us/our-company" className="hover:text-brand-blue">Our Company &amp; Values</Link></li>
            <li><Link href="/about-us/contact-information" className="hover:text-brand-blue">Contact Information</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
