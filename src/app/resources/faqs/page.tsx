'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Plus, Minus } from 'lucide-react';
import faqsData from '@/data/faqs.json';

export default function FaqsPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'General-0': true,
  });

  const toggleItem = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full bg-white pb-16">
      {/* Hero Header */}
      <header className="relative w-full h-56 md:h-72 bg-brand-charcoal overflow-hidden flex items-center justify-center">
        <Image
          src="/assets/images/banner-welcome-color.jpg"
          alt="FAQs"
          fill
          priority
          className="object-cover object-center brightness-75"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-display drop-shadow-md">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg text-gray-200 mt-2 font-medium">
            Technical &amp; Ordering Support
          </p>
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
          <Link href="/resources/faqs" className="py-1 px-3 bg-brand-blue text-white rounded">
            FAQs
          </Link>
          <Link href="/resources/ordering" className="py-1 px-3 text-brand-charcoal hover:text-brand-blue hover:bg-white rounded transition-colors">
            Ordering Overview
          </Link>
          <Link href="/resources/terms-conditions" className="py-1 px-3 text-brand-charcoal hover:text-brand-blue hover:bg-white rounded transition-colors">
            Terms of Use
          </Link>
        </div>
      </nav>

      {/* Quick Category Anchors */}
      <div className="site-container py-8">
        <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-gray-200">
          <span className="text-xs font-bold uppercase text-gray-500 mr-2">Jump to category:</span>
          {faqsData.map(sec => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              className="text-xs font-semibold py-1.5 px-3 bg-gray-100 hover:bg-brand-blue hover:text-white rounded text-brand-charcoal transition-colors"
            >
              {sec.category}
            </a>
          ))}
        </div>

        {/* FAQ Sections */}
        <div className="space-y-12 pt-8 max-w-4xl">
          {faqsData.map(section => (
            <section key={section.id} id={section.id} className="scroll-mt-20">
              <h2 className="text-2xl font-bold text-brand-blue pb-3 border-b-2 border-brand-blue mb-6">
                {section.category}
              </h2>

              <div className="space-y-3">
                {section.items.map((item, idx) => {
                  const itemKey = `${section.category}-${idx}`;
                  const isOpen = !!openItems[itemKey];

                  return (
                    <div
                      key={idx}
                      className="border border-gray-200 bg-white overflow-hidden shadow-sm transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => toggleItem(itemKey)}
                        className="w-full py-4 px-6 text-left font-semibold text-sm sm:text-base text-brand-charcoal flex justify-between items-center hover:bg-gray-50 transition-colors"
                      >
                        <span className="pr-4">{item.question}</span>
                        <span className="flex-shrink-0 text-brand-blue">
                          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                        </span>
                      </button>

                      {isOpen && (
                        <div
                          className="px-6 pb-6 pt-2 text-sm text-gray-700 leading-relaxed border-t border-gray-100 bg-gray-50/50"
                          dangerouslySetInnerHTML={{ __html: item.answer }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
