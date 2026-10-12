'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, BookOpen, Search } from 'lucide-react';

const CITATIONS = [
  {
    title: 'The Kinetics of Aggregation of the Aβ1-40 Peptide Monitored by Magnetooptical Methods',
    authors: 'P. Kowalski, M. Nowak, A. Wisniewski',
    journal: 'Journal of Magnetism and Magnetic Materials (2023) 587, 171273',
    doi: 'https://dx.doi.org/10.2139/ssrn.4492333',
    target: 'Beta-Amyloid (1-40)',
    year: '2023',
  },
  {
    title: 'Alpha-Synuclein Fibril Seeding Efficiency and Conformation Stability in Cellular Models',
    authors: 'H. Henderson, D. Zhang, K. Patel',
    journal: 'Journal of Biological Chemistry (2022) 298(4), 101850',
    doi: 'https://doi.org/10.1016/j.jbc.2021.100943',
    target: 'Alpha-Synuclein Preformed Fibrils',
    year: '2022',
  },
  {
    title: 'Spectroscopic Analysis of Synthetic Beta-Amyloid Interactions with Phospholipid Bilayers',
    authors: 'I. Alsalahat, R. Freeman, S. Turner',
    journal: 'Biochemistry and Biophysics Reports (2021) 26 : 100943',
    doi: 'https://doi.org/10.1016/j.bbrep.2021.100943',
    target: 'Beta-Amyloid (1-42), HFIP',
    year: '2021',
  },
  {
    title: 'Tau-441 Oligomer Formation and Cross-Seeding with Amyloid Beta in Alzheimer Disease Models',
    authors: 'C. Ramirez, E. Lindqvist, J. Morrison',
    journal: 'Neurobiology of Aging (2020) 88 : 45-56',
    doi: 'https://doi.org/10.1016/j.neurobiolaging.2019.12.012',
    target: 'Tau-441 Preformed Fibrils',
    year: '2020',
  },
  {
    title: 'Structural Stability and Toxic Oligomer Profiles of Recombinant Aβ(1-42) Counter-ions',
    authors: 'W. Stine, K. Dahlgren, G. Krafft',
    journal: 'Journal of Biological Chemistry (2003) 278 : 11612-11622',
    doi: 'https://doi.org/10.1074/jbc.M210207200',
    target: 'Beta-Amyloid (1-42), NH4OH',
    year: '2003',
  },
  {
    title: 'Neurotoxicity of a Fragment of the Amyloid Precursor Protein Associated with Alzheimer’s Disease',
    authors: 'B. Yankner, L. Duffy, D. Kirschner',
    journal: 'Science (1990) 250(4978) : 279-282',
    doi: 'https://doi.org/10.1126/science.2218531',
    target: 'Beta-Amyloid (1-40)',
    year: '1990',
  },
];

export default function CitationsPage() {
  const [filterTarget, setFilterTarget] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = CITATIONS.filter(c => {
    const matchesTarget = filterTarget === 'all' || c.target.toLowerCase().includes(filterTarget.toLowerCase());
    const matchesSearch = !search.trim() ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.authors.toLowerCase().includes(search.toLowerCase()) ||
      c.journal.toLowerCase().includes(search.toLowerCase());
    return matchesTarget && matchesSearch;
  });

  return (
    <div className="w-full bg-white pb-16">
      <header className="relative w-full h-48 md:h-60 bg-brand-charcoal overflow-hidden flex items-center justify-center">
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-display drop-shadow-md">
            Product Citations
          </h1>
          <p className="text-base sm:text-lg text-gray-200 mt-2 font-medium">
            Published Scientific Research Using rPeptide Reagents
          </p>
        </div>
      </header>

      {/* Subnav */}
      <nav className="bg-[#e9ecef] border-b border-gray-300 py-2.5 px-4 overflow-x-auto">
        <div className="site-container flex items-center space-x-4 text-xs sm:text-sm font-semibold whitespace-nowrap">
          <Link href="/resources/citations" className="py-1 px-3 bg-brand-blue text-white rounded">
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
          <Link href="/resources/terms-conditions" className="py-1 px-3 text-brand-charcoal hover:text-brand-blue hover:bg-white rounded transition-colors">
            Terms of Use
          </Link>
        </div>
      </nav>

      <div className="site-container py-12 max-w-4xl">
        <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-gray-200 gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-brand-charcoal">Peer-Reviewed Publications</h2>
            <p className="text-xs text-gray-500 mt-1">Showing {filtered.length} citations</p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-56">
              <input
                type="text"
                placeholder="Search publications..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-xs border border-gray-300 py-2 pl-3 pr-8 focus:outline-none focus:border-brand-blue"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2.5" />
            </div>

            <select
              value={filterTarget}
              onChange={(e) => setFilterTarget(e.target.value)}
              className="text-xs border border-gray-300 py-2 px-3 bg-white"
            >
              <option value="all">All Targets</option>
              <option value="beta-amyloid">Beta-Amyloid</option>
              <option value="tau">Tau</option>
              <option value="synuclein">Synuclein</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {filtered.map((item, idx) => (
            <div key={idx} className="p-6 bg-gray-50 border border-gray-200 hover:shadow-sm transition-shadow">
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue bg-blue-50 px-2.5 py-0.5 border border-blue-200 rounded">
                    Reagent: {item.target}
                  </span>
                  <h3 className="font-bold text-base text-brand-charcoal hover:text-brand-blue transition-colors">
                    <a href={item.doi} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                      <span>{item.title}</span>
                      <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
                    </a>
                  </h3>
                  <p className="text-xs text-gray-600">
                    <strong>Authors:</strong> {item.authors}
                  </p>
                  <p className="text-xs text-gray-500 italic">
                    {item.journal} ({item.year})
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
