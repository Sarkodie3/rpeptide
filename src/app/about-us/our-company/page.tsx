import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Company | rPeptide Biotech Supplier USA',
  description: 'Learn about rPeptide, our mission, core values, and dedication to Alzheimer’s and neurodegenerative research.',
};

export default function OurCompanyPage() {
  return (
    <div className="w-full bg-white pb-16">
      {/* Hero Header */}
      <header className="relative w-full h-56 md:h-72 bg-brand-charcoal overflow-hidden flex items-center justify-center">
        <Image
          src="/assets/images/banner-welcome-color.jpg"
          alt="Our Company"
          fill
          priority
          className="object-cover object-center brightness-75"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-display drop-shadow-md">
            Our Company
          </h1>
        </div>
      </header>

      {/* Subnav */}
      <nav className="bg-[#e9ecef] border-b border-gray-300 py-2.5 px-4">
        <div className="site-container flex items-center space-x-4 text-xs sm:text-sm font-semibold">
          <Link
            href="/about-us/our-company"
            className="py-1 px-3 bg-brand-blue text-white rounded"
          >
            Our Company
          </Link>
          <Link
            href="/about-us/contact-information"
            className="py-1 px-3 text-brand-charcoal hover:text-brand-blue hover:bg-white rounded transition-colors"
          >
            Contact Information
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="site-container py-12 max-w-4xl">
        <section className="space-y-6 text-sm text-gray-700 leading-relaxed mb-12">
          <h2 className="text-2xl font-bold text-brand-charcoal border-b pb-2">
            Mission Statement
          </h2>
          <p className="text-base text-gray-800 leading-relaxed">
            <strong>R&amp;D starts at rPeptide</strong> &ndash; Whether it be to fill a research gap or have a scientific breakthrough, we are all striving towards a better tomorrow together. We are committed to helping scientists and researchers all over the world by providing high-quality products and exceptional service for Alzheimer&rsquo;s, Parkinson&rsquo;s, and other neurodegenerative research.
          </p>

          <h2 className="text-2xl font-bold text-brand-charcoal border-b pb-2 pt-6">
            Values
          </h2>
          <p className="text-sm text-gray-700">
            Our core values represent our foundational force:
          </p>
          <ul className="space-y-3 pl-2">
            <li>
              <strong className="text-brand-blue">Integrity</strong> &ndash; Staying true to who we are and our work ethic ensures that we produce the best quality products.
            </li>
            <li>
              <strong className="text-brand-blue">Understanding</strong> &ndash; Learning more about each other helps us provide the service our customers deserve.
            </li>
            <li>
              <strong className="text-brand-blue">Curiosity</strong> &ndash; Staying curious and always learning about our customer&rsquo;s needs and the latest research is our path to innovation.
            </li>
            <li>
              <strong className="text-brand-blue">Shared Vision</strong> &ndash; Uniting our passions and skills to provide our customers with everything they need to lead us to a healthier and brighter future.
            </li>
          </ul>
        </section>

        {/* Corporate Address & Operating Hours */}
        <section className="bg-gray-50 border border-gray-200 p-8 text-sm text-gray-700 space-y-4">
          <h3 className="font-bold text-lg text-brand-charcoal mb-2">rPeptide Facility &amp; Headquarters</h3>
          <p>
            <strong>rPeptide</strong><br />
            1050 Barber Creek<br />
            Bldg. 300, Suite 103<br />
            Watkinsville, GA 30677, USA
          </p>
          <p>
            Phone: <a href="tel:+3122862032" className="text-brand-blue">+3122862032</a><br />
            E-mail: <a href="mailto:Rpeptidessupport@gmail.com" className="text-brand-blue underline">Rpeptidessupport@gmail.com</a>
          </p>
          <p>
            <strong>Office Hours</strong><br />
            8am&mdash;5pm (EST) Monday&mdash;Friday
          </p>
        </section>
      </div>
    </div>
  );
}
