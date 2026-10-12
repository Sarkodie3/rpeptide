import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | rPeptide',
  description: 'rPeptide privacy policy regarding customer data, order transactions, and communications.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="site-container py-16 max-w-3xl space-y-6 text-sm text-gray-700 leading-relaxed">
      <h1 className="text-3xl font-bold text-brand-charcoal font-display mb-6">Privacy Policy</h1>
      <p>
        At rPeptide, we are committed to safeguarding the confidentiality and privacy of our academic, clinical, and corporate customers.
      </p>

      <h2 className="text-xl font-bold text-brand-charcoal pt-4 border-b pb-2">Information We Collect</h2>
      <p>
        When you create an account, purchase products, or request quotations, we collect information necessary to fulfill transactions and comply with biological material shipping regulations, including your name, institutional email, shipping address, telephone, and billing details.
      </p>

      <h2 className="text-xl font-bold text-brand-charcoal pt-4 border-b pb-2">Use of Information</h2>
      <p>
        We do not sell, rent, or trade your personal or institutional information to third parties. Information is used strictly for processing order deliveries, providing Certificates of Analysis (COA), issuing invoices, and communicating critical product updates.
      </p>

      <h2 className="text-xl font-bold text-brand-charcoal pt-4 border-b pb-2">Data Security</h2>
      <p>
        All web transmissions involving payment or customer credentials use industry-standard Transport Layer Security (TLS 1.3) encryption.
      </p>

      <div className="pt-6 border-t text-xs text-gray-500">
        <p>If you have questions regarding our privacy practices, please contact <a href="mailto:sales@rpeptide.com" className="text-brand-blue underline">sales@rpeptide.com</a>.</p>
      </div>
    </div>
  );
}
