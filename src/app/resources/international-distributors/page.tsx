import React from 'react';
import Link from 'next/link';
import { Globe, MapPin, ExternalLink, Mail, Phone } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'International Distributors | Global Partners | rPeptide',
  description: 'Find authorized rPeptide distributors and regional sales representatives across Europe, Asia, Japan, Canada, and Australia.',
};

const DISTRIBUTORS = [
  {
    region: 'Europe (UK, Germany, France, Switzerland)',
    partners: [
      {
        name: '2BScientific Ltd',
        country: 'United Kingdom & European Union',
        phone: '+44 (0) 1869 238033',
        email: 'sales@2bscientific.com',
        web: 'https://www.2bscientific.com',
      },
      {
        name: 'Biocat GmbH',
        country: 'Germany, Austria, Switzerland',
        phone: '+49 6221 71429 0',
        email: 'info@biocat.com',
        web: 'https://www.biocat.com',
      },
      {
        name: 'Ozyme',
        country: 'France',
        phone: '+33 1 34 60 61 80',
        email: 'contact@ozyme.fr',
        web: 'https://www.ozyme.fr',
      },
    ],
  },
  {
    region: 'Asia & Pacific Rim',
    partners: [
      {
        name: 'Cosmo Bio Co., Ltd.',
        country: 'Japan',
        phone: '+81-3-5632-9610',
        email: 'export@cosmobio.co.jp',
        web: 'https://www.cosmobio.co.jp',
      },
      {
        name: 'Funakoshi Co., Ltd.',
        country: 'Japan',
        phone: '+81-3-5684-1620',
        email: 'reagent@funakoshi.co.jp',
        web: 'https://www.funakoshi.co.jp',
      },
      {
        name: 'Bio-Gene Technology Ltd',
        country: 'China & Hong Kong',
        phone: '+852 2646 6101',
        email: 'info@bio-gene.com.hk',
        web: 'https://www.bio-gene.com.hk',
      },
      {
        name: 'United Biologics',
        country: 'Australia & New Zealand',
        phone: '+61 2 9888 7700',
        email: 'orders@unitedbiologics.com.au',
        web: 'https://www.unitedbiologics.com.au',
      },
    ],
  },
  {
    region: 'Canada & Latin America',
    partners: [
      {
        name: 'Cedarlane Laboratories',
        country: 'Canada',
        phone: '1-800-268-5058',
        email: 'custserv@cedarlanelabs.com',
        web: 'https://www.cedarlanelabs.com',
      },
    ],
  },
];

export default function InternationalDistributorsPage() {
  return (
    <div className="w-full bg-white pb-16">
      <header className="relative w-full h-48 md:h-60 bg-brand-charcoal overflow-hidden flex items-center justify-center">
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-display drop-shadow-md">
            International Distributors
          </h1>
          <p className="text-base sm:text-lg text-gray-200 mt-2 font-medium">
            Authorized Worldwide Distribution Network
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
          <Link href="/resources/international-distributors" className="py-1 px-3 bg-brand-blue text-white rounded">
            International Distributors
          </Link>
          <Link href="/resources/faqs" className="py-1 px-3 text-brand-charcoal hover:text-brand-blue hover:bg-white rounded transition-colors">
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

      <div className="site-container py-12 max-w-4xl space-y-12">
        <div>
          <h2 className="text-2xl font-bold text-brand-charcoal mb-4">
            Global Representation &amp; Local Currency Ordering
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Researchers located outside the United States can purchase directly from rPeptide or through our official international distributor partners below. Our distributors handle local importation, customs clearance, and refrigerated cold-chain courier transport.
          </p>
        </div>

        <div className="space-y-10">
          {DISTRIBUTORS.map((group, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="text-xl font-bold text-brand-blue border-b-2 border-brand-blue pb-2 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                <span>{group.region}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {group.partners.map((partner, pIdx) => (
                  <div key={pIdx} className="p-6 bg-gray-50 border border-gray-200 space-y-2 text-xs text-gray-700">
                    <h4 className="font-bold text-base text-brand-charcoal">{partner.name}</h4>
                    <p className="flex items-center gap-1.5 text-gray-500">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{partner.country}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                      <span>{partner.phone}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-gray-400" />
                      <a href={`mailto:${partner.email}`} className="text-brand-blue hover:underline">
                        {partner.email}
                      </a>
                    </p>
                    <div className="pt-2">
                      <a
                        href={partner.web}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-brand-blue hover:underline"
                      >
                        <span>Visit Website</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-blue-50 border border-blue-200 text-center text-xs text-gray-700 space-y-2">
          <p className="font-bold text-brand-charcoal text-sm">Don&rsquo;t see your country listed?</p>
          <p>
            rPeptide ships directly to universities and laboratories worldwide via FedEx Priority International Cold-Chain.
          </p>
          <p>
            Contact <a href="mailto:Rpeptidessupport@gmail.com" className="text-brand-blue underline font-semibold">Rpeptidessupport@gmail.com</a> or call <a href="tel:+3122862032" className="text-brand-blue font-semibold">+3122862032</a> for international shipping rates.
          </p>
        </div>
      </div>
    </div>
  );
}
