'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Filter, SlidersHorizontal, ChevronRight, X } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

interface ProductCatalogProps {
  initialProducts: Product[];
  categoryTitle?: string;
  categorySlug?: string;
  categoryDescription?: string;
  bannerImage?: string;
  initialSearch?: string;
}

const CATEGORY_LINKS = [
  { name: 'Antibodies', slug: 'antibodies' },
  { name: 'Peptides', slug: 'peptides' },
  { name: 'Proteins', slug: 'proteins' },
  { name: 'Neurodegenerative Related Compounds', slug: 'neurodegenerative-related-compounds' },
  { name: 'Coronavirus Research Tools', slug: 'coronavirus-research-tools' },
  { name: 'Kits', slug: 'kits' },
  { name: 'Preformed Fibrils', slug: 'preformed-fibrils' },
];

export default function ProductCatalog({
  initialProducts,
  categoryTitle = 'Products',
  categorySlug = 'all',
  categoryDescription = 'rPeptide provides reliable, high-quality recombinant peptides, proteins, and antibodies to advance Alzheimer’s and neurodegenerative disease research worldwide.',
  bannerImage = '/assets/images/product-page-peptides.jpg',
  initialSearch = '',
}: ProductCatalogProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('menu_order');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const pageSize = 20;

  // Extract all subcategories present in this product subset
  const availableSubcategories = useMemo(() => {
    const map = new Map<string, { name: string; count: number }>();
    initialProducts.forEach(p => {
      p.categories.forEach(c => {
        if (c.slug !== categorySlug) {
          const current = map.get(c.slug) || { name: c.name, count: 0 };
          map.set(c.slug, { name: c.name, count: current.count + 1 });
        }
      });
    });
    return Array.from(map.entries())
      .map(([slug, data]) => ({ slug, ...data }))
      .sort((a, b) => b.count - a.count);
  }, [initialProducts, categorySlug]);

  // Extract available sizes
  const availableSizes = useMemo(() => {
    const map = new Map<string, number>();
    initialProducts.forEach(p => {
      p.variations?.forEach(v => {
        if (v.size) {
          map.set(v.size, (map.get(v.size) || 0) + 1);
        }
      });
    });
    return Array.from(map.entries())
      .map(([size, count]) => ({ size, count }))
      .sort((a, b) => b.count - a.count);
  }, [initialProducts]);

  // Price range buckets
  const priceBuckets = [
    { label: 'Under $150', id: 'under_150', match: (p: number) => p < 150 },
    { label: '$150 – $300', id: '150_300', match: (p: number) => p >= 150 && p <= 300 },
    { label: '$300 – $600', id: '300_600', match: (p: number) => p > 300 && p <= 600 },
    { label: '$600 and above', id: 'above_600', match: (p: number) => p > 600 },
  ];

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Search query
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.categories.some(c => c.name.toLowerCase().includes(q))
      );
    }

    // Subcategory checkboxes
    if (selectedSubcategories.length > 0) {
      result = result.filter(p =>
        p.categories.some(c => selectedSubcategories.includes(c.slug))
      );
    }

    // Size checkboxes
    if (selectedSizes.length > 0) {
      result = result.filter(p =>
        p.variations?.some(v => selectedSizes.includes(v.size))
      );
    }

    // Price buckets
    if (selectedPriceRanges.length > 0) {
      result = result.filter(p => {
        return selectedPriceRanges.some(rId => {
          const bucket = priceBuckets.find(b => b.id === rId);
          return bucket ? bucket.match(p.price) : false;
        });
      });
    }

    // Sorting
    switch (sortBy) {
      case 'popularity':
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case 'date':
        result.sort((a, b) => b.id - a.id);
        break;
      case 'price':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'featured':
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      default:
        // menu_order
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [initialProducts, searchTerm, selectedSubcategories, selectedSizes, selectedPriceRanges, sortBy]);

  // Pagination calculation
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const displayedProducts = filteredProducts.slice(startIndex, startIndex + pageSize);

  const toggleSubcategory = (slug: string) => {
    setSelectedSubcategories(prev =>
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
    setCurrentPage(1);
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
    setCurrentPage(1);
  };

  const togglePriceRange = (id: string) => {
    setSelectedPriceRanges(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedSubcategories([]);
    setSelectedSizes([]);
    setSelectedPriceRanges([]);
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchTerm.trim() !== '' ||
    selectedSubcategories.length > 0 ||
    selectedSizes.length > 0 ||
    selectedPriceRanges.length > 0;

  return (
    <div className="w-full bg-white">
      {/* 1. Category Hero Banner */}
      <header className="relative w-full h-56 md:h-72 bg-brand-charcoal overflow-hidden flex items-center justify-center">
        <Image
          src={bannerImage}
          alt={categoryTitle}
          fill
          priority
          className="object-cover object-center brightness-75"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-display drop-shadow-md">
            {categoryTitle}
          </h1>
        </div>
      </header>

      {/* 2. Horizontal Subnav Menu */}
      <nav className="bg-[#e9ecef] border-b border-gray-300 py-2.5 px-4 overflow-x-auto">
        <div className="site-container flex items-center space-x-2 md:space-x-4 text-xs sm:text-sm font-semibold whitespace-nowrap">
          {CATEGORY_LINKS.map(cat => {
            const isActive = categorySlug === cat.slug;
            return (
              <Link
                key={cat.slug}
                href={`/products/${cat.slug}`}
                className={`py-1 px-3 transition-colors rounded ${
                  isActive
                    ? 'bg-brand-blue text-white'
                    : 'text-brand-charcoal hover:text-brand-blue hover:bg-white'
                }`}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* 3. Category Description (Blue Stak) */}
      <div className="blue-stak py-5 text-center px-4">
        <div className="site-container">
          <p className="text-sm md:text-base font-medium max-w-4xl mx-auto leading-relaxed">
            {categoryDescription}
          </p>
        </div>
      </div>

      {/* 4. Catalog Controls */}
      <div className="site-container py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between pb-4 border-b border-gray-200 gap-4">
          <p className="text-sm text-gray-600">
            Showing {totalItems > 0 ? `${startIndex + 1}–${Math.min(startIndex + pageSize, totalItems)}` : '0'} of {totalItems} results
          </p>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-brand-blue text-white px-4 py-2"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="sortby" className="text-xs text-gray-500 uppercase font-semibold hidden md:inline">
                Sort:
              </label>
              <select
                id="sortby"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs border border-gray-300 py-1.5 px-3 bg-white text-brand-charcoal focus:outline-none focus:border-brand-blue"
              >
                <option value="menu_order">Default sorting</option>
                <option value="popularity">Sort by popularity</option>
                <option value="date">Sort by latest</option>
                <option value="price">Sort by price: low to high</option>
                <option value="price-desc">Sort by price: high to low</option>
                <option value="featured">Featured</option>
              </select>
            </div>
          </div>
        </div>

        {/* 5. Main Content: Sidebar + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block space-y-8 pr-4">
            {/* Active filters badge & Reset */}
            {hasActiveFilters && (
              <div className="p-3 bg-gray-50 border border-gray-200 flex items-center justify-between">
                <span className="text-xs font-semibold text-brand-charcoal">Filters active</span>
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-brand-blue hover:underline flex items-center gap-1 font-semibold"
                >
                  <X className="w-3 h-3" />
                  Clear all
                </button>
              </div>
            )}

            {/* Keyword Search */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider text-brand-charcoal mb-3 border-b pb-2">
                Search Products
              </h4>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter keywords"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full text-xs border border-gray-300 py-2 pl-3 pr-8 focus:outline-none focus:border-brand-blue"
                />
                <Search className="w-4 h-4 text-gray-400 absolute right-2.5 top-2.5" />
              </div>
            </div>

            {/* Categories Facet */}
            {availableSubcategories.length > 0 && (
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider text-brand-charcoal mb-3 border-b pb-2">
                  Categories
                </h4>
                <div className="space-y-1.5 max-h-64 overflow-y-auto text-xs">
                  {availableSubcategories.map(cat => (
                    <label key={cat.slug} className="flex items-center justify-between hover:text-brand-blue cursor-pointer py-1">
                      <span className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedSubcategories.includes(cat.slug)}
                          onChange={() => toggleSubcategory(cat.slug)}
                          className="rounded text-brand-blue focus:ring-0"
                        />
                        <span>{cat.name}</span>
                      </span>
                      <span className="text-gray-400 text-[11px]">({cat.count})</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Size Facet */}
            {availableSizes.length > 0 && (
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider text-brand-charcoal mb-3 border-b pb-2">
                  Size
                </h4>
                <div className="space-y-1.5 text-xs">
                  {availableSizes.slice(0, 10).map(s => (
                    <label key={s.size} className="flex items-center justify-between hover:text-brand-blue cursor-pointer py-1">
                      <span className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedSizes.includes(s.size)}
                          onChange={() => toggleSize(s.size)}
                          className="rounded text-brand-blue focus:ring-0"
                        />
                        <span>{s.size}</span>
                      </span>
                      <span className="text-gray-400 text-[11px]">({s.count})</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Price Facet */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider text-brand-charcoal mb-3 border-b pb-2">
                Price
              </h4>
              <div className="space-y-1.5 text-xs">
                {priceBuckets.map(b => (
                  <label key={b.id} className="flex items-center gap-2 hover:text-brand-blue cursor-pointer py-1">
                    <input
                      type="checkbox"
                      checked={selectedPriceRanges.includes(b.id)}
                      onChange={() => togglePriceRange(b.id)}
                      className="rounded text-brand-blue focus:ring-0"
                    />
                    <span>{b.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Cards Grid */}
          <div className="lg:col-span-3">
            {displayedProducts.length === 0 ? (
              <div className="p-12 text-center bg-gray-50 border border-gray-200">
                <p className="text-base font-semibold text-gray-700 mb-2">No matching products found.</p>
                <p className="text-sm text-gray-500 mb-6">Try broadening your search term or clearing filters.</p>
                <button
                  onClick={clearAllFilters}
                  className="btn-primary text-xs uppercase tracking-wider"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {displayedProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center space-x-2 text-sm font-semibold">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => {
                      setCurrentPage(page);
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className={`w-9 h-9 border transition-colors ${
                      currentPage === page
                        ? 'bg-brand-blue text-white border-brand-blue'
                        : 'bg-[#f2f1f1] text-brand-charcoal hover:bg-gray-200 border-gray-300'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {currentPage < totalPages && (
                  <button
                    onClick={() => {
                      setCurrentPage(prev => Math.min(prev + 1, totalPages));
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className="h-9 px-3 border bg-[#f2f1f1] text-brand-charcoal hover:bg-gray-200 border-gray-300"
                  >
                    &gt;
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer for Filters */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileFilterOpen(false)} />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white p-6 shadow-2xl overflow-y-auto">
            <div className="flex justify-between items-center mb-6 border-b pb-3">
              <h3 className="font-bold text-lg text-brand-charcoal">Filter Products</h3>
              <button onClick={() => setMobileFilterOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Keyword Search */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase mb-2">Search</label>
              <input
                type="text"
                placeholder="Enter keywords"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs border border-gray-300 p-2"
              />
            </div>

            {/* Categories */}
            {availableSubcategories.length > 0 && (
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase mb-2">Categories</label>
                <div className="space-y-1 text-xs max-h-48 overflow-y-auto">
                  {availableSubcategories.map(c => (
                    <label key={c.slug} className="flex items-center gap-2 py-1">
                      <input
                        type="checkbox"
                        checked={selectedSubcategories.includes(c.slug)}
                        onChange={() => toggleSubcategory(c.slug)}
                      />
                      <span>{c.name} ({c.count})</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {availableSizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase mb-2">Sizes</label>
                <div className="space-y-1 text-xs">
                  {availableSizes.slice(0, 8).map(s => (
                    <label key={s.size} className="flex items-center gap-2 py-1">
                      <input
                        type="checkbox"
                        checked={selectedSizes.includes(s.size)}
                        onChange={() => toggleSize(s.size)}
                      />
                      <span>{s.size} ({s.count})</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full btn-primary text-xs uppercase tracking-wider mt-4"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
