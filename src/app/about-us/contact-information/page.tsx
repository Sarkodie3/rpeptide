'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactInformationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    subject: 'General Technical Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          organization: '',
          subject: 'General Technical Inquiry',
          message: '',
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white pb-16">
      {/* Hero Header */}
      <header className="relative w-full h-56 md:h-72 bg-brand-charcoal overflow-hidden flex items-center justify-center">
        <Image
          src="/assets/images/banner-welcome-color.jpg"
          alt="Contact Us"
          fill
          priority
          className="object-cover object-center brightness-75"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-display drop-shadow-md">
            Contact Us
          </h1>
        </div>
      </header>

      {/* Subnav */}
      <nav className="bg-[#e9ecef] border-b border-gray-300 py-2.5 px-4">
        <div className="site-container flex items-center space-x-4 text-xs sm:text-sm font-semibold">
          <Link
            href="/about-us/our-company"
            className="py-1 px-3 text-brand-charcoal hover:text-brand-blue hover:bg-white rounded transition-colors"
          >
            Our Company
          </Link>
          <Link
            href="/about-us/contact-information"
            className="py-1 px-3 bg-brand-blue text-white rounded"
          >
            Contact Information
          </Link>
        </div>
      </nav>

      {/* Intro */}
      <div className="site-container pt-12 pb-6 text-center">
        <h2 className="text-2xl font-bold text-brand-charcoal">
          Thank you for your interest in rPeptide.
        </h2>
      </div>

      {/* Two Column Layout */}
      <div className="site-container py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column: Direct Contact Info */}
          <div className="p-8 bg-gray-50 border border-gray-200 text-center md:text-left space-y-5 text-sm text-gray-700">
            <div>
              <p className="font-bold text-base text-brand-charcoal">rPeptide</p>
              <p>1050 Barber Creek</p>
              <p>Bldg. 300, Suite 103</p>
              <p>Watkinsville, GA 30677, USA</p>
            </div>

            <div className="pt-2 border-t border-gray-200 space-y-1">
              <p>Phone: <a href="tel:6787530747" className="text-brand-blue">678.753.0747</a></p>
              <p>Toll Free: <a href="tel:8667530747" className="text-brand-blue">866.753.0747</a></p>
              <p>Fax: 678.753.0746</p>
              <p>E-mail: <a href="mailto:sales@rpeptide.com" className="text-brand-blue font-semibold">sales@rpeptide.com</a></p>
            </div>

            <div className="pt-2 border-t border-gray-200">
              <p className="font-semibold text-brand-charcoal">Technical Questions &amp; Quotations</p>
              <p className="text-xs text-gray-600 mt-1">
                For all quotations and custom synthesis requests, please email us directly at <a href="mailto:sales@rpeptide.com" className="text-brand-blue underline">sales@rpeptide.com</a> or use the inquiry form.
              </p>
            </div>

            <div className="pt-2 border-t border-gray-200">
              <p><strong>Office Hours</strong></p>
              <p>8am&mdash;5pm (EST) Monday&mdash;Friday</p>
            </div>

            <div className="pt-4 text-xs text-brand-blue font-medium italic">
              <p>rPeptide products are for research purposes only.</p>
              <p>Not for human consumption.</p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="p-8 bg-white border border-gray-200 shadow-sm">
            <h3 className="font-bold text-lg text-brand-charcoal mb-4">
              Send Us a Message
            </h3>

            {submitted ? (
              <div className="p-6 bg-green-50 border border-green-200 text-green-800 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
                <h4 className="font-bold text-base">Message Sent Successfully!</h4>
                <p className="text-sm">
                  Thank you for reaching out to rPeptide. A technical specialist will review your request and contact you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-semibold text-brand-blue underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">
                    Your Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                    className="w-full border border-gray-300 p-2.5 text-sm focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                      className="w-full border border-gray-300 p-2.5 text-sm focus:outline-none focus:border-brand-blue"
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
                      className="w-full border border-gray-300 p-2.5 text-sm focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1">
                    Institution / University / Company
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData(p => ({ ...p, organization: e.target.value }))}
                    className="w-full border border-gray-300 p-2.5 text-sm focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1">
                    Inquiry Type
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData(p => ({ ...p, subject: e.target.value }))}
                    className="w-full border border-gray-300 p-2.5 text-sm focus:outline-none focus:border-brand-blue bg-white"
                  >
                    <option value="General Technical Inquiry">General Technical Inquiry</option>
                    <option value="Custom Peptide Quote">Custom Peptide Quote</option>
                    <option value="Bulk Order Inquiry">Bulk Order Inquiry</option>
                    <option value="Existing Order Status">Existing Order Status</option>
                    <option value="Certificate of Analysis (COA) Request">Certificate of Analysis (COA) Request</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1">
                    Your Message / Specifications <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details about your peptide sequence, purity requirements, quantity, or questions..."
                    value={formData.message}
                    onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                    className="w-full border border-gray-300 p-2.5 text-sm focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary text-xs uppercase tracking-wider py-3 px-8 flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? 'Sending...' : 'Submit Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
