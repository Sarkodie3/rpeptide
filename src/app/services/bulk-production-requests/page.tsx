'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function BulkProductionRequestsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    targetName: '',
    sequence: '',
    quantity: '100 mg',
    purity: '>95%',
    labeling: 'None',
    timeline: 'Standard (3-4 weeks)',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="w-full bg-white pb-16">
      {/* Hero Header */}
      <header className="relative w-full h-56 md:h-72 bg-brand-charcoal overflow-hidden flex items-center justify-center">
        <Image
          src="/assets/images/banner-contract-services-miscroscope.jpg"
          alt="Bulk Production Requests"
          fill
          priority
          className="object-cover object-center brightness-75"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-display drop-shadow-md">
            Bulk Production Requests
          </h1>
          <p className="text-base sm:text-lg text-gray-200 mt-2 font-medium">
            Custom Synthesis &amp; Large-Scale Reagent Quotations
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
            className="py-1 px-3 bg-brand-blue text-white rounded"
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

      <div className="site-container py-12 max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-brand-charcoal mb-2">
            Request a Bulk or Custom Synthesis Quote
          </h2>
          <p className="text-sm text-gray-600 max-w-xl mx-auto">
            Please fill out the form below with your target parameters. Our production chemists will provide a formal quotation within 24 to 48 business hours.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 bg-green-50 border border-green-200 text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto" />
            <h3 className="text-xl font-bold text-green-900">Quotation Request Received</h3>
            <p className="text-sm text-green-800 max-w-md mx-auto">
              Thank you, <strong>{formData.name}</strong>. A dedicated project manager from our production lab will review your sequence and email a quotation to <strong>{formData.email}</strong>.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="btn-primary text-xs uppercase tracking-wider py-2.5 px-6 mt-4"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-gray-50 border border-gray-200 p-8 space-y-6 shadow-sm">
            <h3 className="font-bold text-base text-brand-charcoal border-b pb-2">
              1. Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase mb-1">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                  className="w-full border border-gray-300 p-2.5 text-sm bg-white focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">
                  Institutional Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                  className="w-full border border-gray-300 p-2.5 text-sm bg-white focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                  className="w-full border border-gray-300 p-2.5 text-sm bg-white focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">
                  Institution / Organization <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.organization}
                  onChange={(e) => setFormData(p => ({ ...p, organization: e.target.value }))}
                  className="w-full border border-gray-300 p-2.5 text-sm bg-white focus:outline-none focus:border-brand-blue"
                />
              </div>
            </div>

            <h3 className="font-bold text-base text-brand-charcoal border-b pb-2 pt-4">
              2. Target Product Specifications
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase mb-1">
                  Target Product Name / Identifier <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Beta-Amyloid (1-42) A2V Mutant"
                  value={formData.targetName}
                  onChange={(e) => setFormData(p => ({ ...p, targetName: e.target.value }))}
                  className="w-full border border-gray-300 p-2.5 text-sm bg-white focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">
                  Amino Acid Sequence (Single-letter code)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. DAEFRHDSGYEVHHQKLVFFAEDVGSNKGAIIGLMVGGVV"
                  value={formData.sequence}
                  onChange={(e) => setFormData(p => ({ ...p, sequence: e.target.value }))}
                  className="w-full border border-gray-300 p-2.5 text-sm font-mono bg-white focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Quantity</label>
                  <select
                    value={formData.quantity}
                    onChange={(e) => setFormData(p => ({ ...p, quantity: e.target.value }))}
                    className="w-full border border-gray-300 p-2.5 text-sm bg-white"
                  >
                    <option value="10 mg">10 mg</option>
                    <option value="50 mg">50 mg</option>
                    <option value="100 mg">100 mg</option>
                    <option value="500 mg">500 mg</option>
                    <option value="1 Gram">1 Gram</option>
                    <option value="5 Grams+">5 Grams+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Purity Level</label>
                  <select
                    value={formData.purity}
                    onChange={(e) => setFormData(p => ({ ...p, purity: e.target.value }))}
                    className="w-full border border-gray-300 p-2.5 text-sm bg-white"
                  >
                    <option value="Crude / Unpurified">Crude / Unpurified</option>
                    <option value=">85%">&gt;85%</option>
                    <option value=">90%">&gt;90%</option>
                    <option value=">95%">&gt;95%</option>
                    <option value=">98%">&gt;98%</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Isotopic Labeling</label>
                  <select
                    value={formData.labeling}
                    onChange={(e) => setFormData(p => ({ ...p, labeling: e.target.value }))}
                    className="w-full border border-gray-300 p-2.5 text-sm bg-white"
                  >
                    <option value="None">None (Unlabeled)</option>
                    <option value="Uniform N15">Uniform N15</option>
                    <option value="Uniform C13">Uniform C13</option>
                    <option value="Dual C13 & N15">Dual C13 &amp; N15</option>
                    <option value="Biotinylated">Biotinylated</option>
                    <option value="FITC Labeled">FITC Labeled</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">
                  Additional Requirements / Buffer / Delivery Schedule
                </label>
                <textarea
                  rows={3}
                  placeholder="Include any specific counter-ion preferences (TFA, HCl, NH4OH), aliquoting sizes, or desired lead times."
                  value={formData.notes}
                  onChange={(e) => setFormData(p => ({ ...p, notes: e.target.value }))}
                  className="w-full border border-gray-300 p-2.5 text-sm bg-white focus:outline-none focus:border-brand-blue"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary text-xs uppercase tracking-wider py-4 font-bold flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Submitting Request...' : 'Submit Bulk Quote Request'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
