'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Twitter, Youtube, Send, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#1e2d42] text-white pt-12 border-t-4 border-brand-gold">
      {/* 1. Mini-Map Section */}
      <div className="site-container pb-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Products Column */}
          <div>
            <h4 className="text-white font-bold text-base uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              <Link href="/products" className="hover:text-brand-gold transition-colors">Products</Link>
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/products/antibodies" className="hover:text-brand-gold">Antibodies</Link></li>
              <li><Link href="/products/peptides" className="hover:text-brand-gold">Peptides</Link></li>
              <li><Link href="/products/proteins" className="hover:text-brand-gold">Proteins</Link></li>
              <li><Link href="/products/neurodegenerative-related-compounds" className="hover:text-brand-gold">Neurodegenerative</Link></li>
              <li><Link href="/products/coronavirus-research-tools" className="hover:text-brand-gold">Coronavirus Tools</Link></li>
              <li><Link href="/products/kits" className="hover:text-brand-gold">Kits</Link></li>
              <li><Link href="/products/preformed-fibrils" className="hover:text-brand-gold">Preformed Fibrils</Link></li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-white font-bold text-base uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              <Link href="/services" className="hover:text-brand-gold transition-colors">Services</Link>
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/services/contract-services" className="hover:text-brand-gold">Custom Peptides & Proteins</Link></li>
              <li><Link href="/services/custom-projects" className="hover:text-brand-gold">Lab Services</Link></li>
              <li><Link href="/services/bulk-production-requests" className="hover:text-brand-gold">Bulk Quote</Link></li>
              <li><Link href="/services/amino-acid-codes" className="hover:text-brand-gold">Amino Acid Codes</Link></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-white font-bold text-base uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              <Link href="/resources" className="hover:text-brand-gold transition-colors">Resources</Link>
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/resources/citations" className="hover:text-brand-gold">Citations</Link></li>
              <li><Link href="/resources/blogs" className="hover:text-brand-gold">Blogs</Link></li>
              <li><Link href="/resources/international-distributors" className="hover:text-brand-gold">International Distributors</Link></li>
              <li><Link href="/resources/faqs" className="hover:text-brand-gold">FAQs</Link></li>
              <li><Link href="/resources/ordering" className="hover:text-brand-gold">Ordering Overview</Link></li>
              <li><Link href="/resources/terms-conditions" className="hover:text-brand-gold">Terms of Use</Link></li>
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h4 className="text-white font-bold text-base uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              <Link href="/about-us/our-company" className="hover:text-brand-gold transition-colors">About</Link>
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/about-us/our-company" className="hover:text-brand-gold">Our Company</Link></li>
              <li><Link href="/about-us/contact-information" className="hover:text-brand-gold">Contact Information</Link></li>
              <li><Link href="/my-account" className="hover:text-brand-gold">Customer Portal</Link></li>
            </ul>
          </div>

          {/* Contact Info & Socials */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <Image
                src="/assets/images/logo-rpeptide-white.png"
                alt="rPeptide Logo"
                width={150}
                height={40}
                className="h-9 w-auto object-contain mb-3"
              />
            </div>
            <address className="not-italic text-sm text-gray-300 space-y-1 mb-4">
              <p><strong>ph:</strong> <a href="tel:+3122862032" className="hover:text-brand-gold">+3122862032</a></p>
              <p><strong>e:</strong> <a href="mailto:Rpeptidessupport@gmail.com" className="hover:text-brand-gold">Rpeptidessupport@gmail.com</a></p>
            </address>

            <h5 className="text-white font-semibold text-xs uppercase tracking-wider mb-2">Follow Us</h5>
            <div className="flex items-center space-x-3 text-gray-400">
              <a
                href="https://www.linkedin.com/company/rpeptide"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/rPeptideLLC"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCQTENfrm1pfxw26rfiAl9CA/feed"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="hover:text-white transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://bsky.app/profile/rpeptide.bsky.social"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Bluesky"
                className="hover:text-white transition-colors text-xs font-bold px-1.5 py-0.5 border border-gray-400 rounded"
              >
                BSKY
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Newsletter Signup Section */}
      <div className="bg-[#15202f] py-8 border-t border-b border-white/5">
        <div className="site-container flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h5 className="text-white font-bold text-lg mb-1">Newsletter Signup</h5>
            <p className="text-sm text-gray-300">
              Subscribe to receive new product launches, research publications, and technical bulletins.
            </p>
          </div>

          {subscribed ? (
            <div className="flex items-center gap-2 text-brand-gold font-medium text-sm bg-white/5 px-4 py-2 border border-brand-gold/30">
              <CheckCircle2 className="w-4 h-4" />
              <span>Thank you for subscribing to rPeptide updates!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex w-full md:w-auto max-w-md">
              <input
                type="email"
                placeholder="email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2.5 bg-white text-brand-charcoal text-sm w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-brand-gold rounded-none"
              />
              <button
                type="submit"
                className="bg-brand-gold hover:bg-brand-gold-hover text-white font-semibold text-sm px-5 py-2.5 transition-colors whitespace-nowrap rounded-none flex items-center gap-1.5"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* 3. Copyright & Legal Disclosure */}
      <div className="site-container py-6 text-xs text-gray-400 flex flex-col md:flex-row items-center justify-between gap-3">
        <div>
          <span>&copy; 2026 rPeptide. </span>
          <span className="space-x-2">
            <Link href="/resources/faqs" className="hover:text-white underline">Sitemap</Link>
            <span>|</span>
            <Link href="/resources/terms-conditions" className="hover:text-white underline">Privacy</Link>
            <span>|</span>
            <Link href="/resources/terms-conditions" className="hover:text-white underline">Terms &amp; Conditions</Link>
          </span>
        </div>

        <div className="text-center md:text-right font-medium text-gray-300">
          <p>rPeptide products are for research purposes only. Not for human consumption.</p>
        </div>
      </div>
    </footer>
  );
}
