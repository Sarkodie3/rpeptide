import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { CreditCard, Truck, ShieldAlert, FileText, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ordering Overview | How to Order Research Peptides | rPeptide',
  description: 'Ordering instructions, purchase order guidelines, international cold-chain shipping, and payment terms for rPeptide research reagents.',
};

export default function OrderingOverviewPage() {
  return (
    <div className="w-full bg-white pb-16">
      <header className="relative w-full h-48 md:h-60 bg-brand-charcoal overflow-hidden flex items-center justify-center">
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-display drop-shadow-md">
            Ordering Overview
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
          <Link href="/resources/ordering" className="py-1 px-3 bg-brand-blue text-white rounded">
            Ordering Overview
          </Link>
          <Link href="/resources/terms-conditions" className="py-1 px-3 text-brand-charcoal hover:text-brand-blue hover:bg-white rounded transition-colors">
            Terms of Use
          </Link>
        </div>
      </nav>

      <div className="site-container py-12 max-w-4xl space-y-10 text-sm text-gray-700 leading-relaxed">
        <div>
          <h2 className="text-2xl font-bold text-brand-charcoal mb-4">How to Order from rPeptide</h2>
          <p className="text-base text-gray-800 leading-relaxed">
            We strive to make purchasing research reagents seamless and fast. You can order online directly with a credit card, or submit formal institutional purchase orders via email or telephone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 p-6 bg-gray-50">
            <CreditCard className="w-8 h-8 text-brand-blue mb-3" />
            <h3 className="font-bold text-base text-brand-charcoal mb-2">1. Online Web Store</h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Browse our catalog of over 360 catalog items. Add items to cart, select desired aliquots (0.5 mg, 1.0 mg), and checkout via our secure SSL-encrypted portal using Visa, MasterCard, or American Express.
            </p>
            <Link href="/products" className="text-xs font-bold text-brand-blue underline">
              Browse Catalog &rarr;
            </Link>
          </div>

          <div className="border border-gray-200 p-6 bg-gray-50">
            <FileText className="w-8 h-8 text-brand-blue mb-3" />
            <h3 className="font-bold text-base text-brand-charcoal mb-2">2. Institutional Purchase Orders</h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Universities, research hospitals, and approved corporate labs can purchase using standard purchase orders with NET 30 payment terms. Send your PO to <a href="mailto:sales@rpeptide.com" className="text-brand-blue underline">sales@rpeptide.com</a>.
            </p>
            <span className="text-xs font-bold text-brand-charcoal">PO Fax: 678.753.0746</span>
          </div>
        </div>

        <div className="space-y-4 border-t pt-8">
          <h3 className="text-xl font-bold text-brand-charcoal flex items-center gap-2">
            <Truck className="w-6 h-6 text-brand-blue" />
            <span>Shipping &amp; Delivery Conditions</span>
          </h3>
          <p>
            Most in-stock catalog products ship within 24 to 48 business hours of order confirmation.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-gray-600">
            <li><strong>Domestic Shipping (USA):</strong> Standard delivery via FedEx Priority Overnight. Most stable lyophilized peptides ship at ambient temperature or on blue ice. Preformed fibrils ship on dry ice.</li>
            <li><strong>International Shipping:</strong> Worldwide express delivery with complete customs commercial invoice and Certificate of Origin documentation.</li>
            <li><strong>Dry Ice Shipments:</strong> Products requiring strict continuous frozen chain (e.g. fibrils, preformed aggregates) incur a flat cold-chain refrigerant fee.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
