'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, ShoppingBag, Menu, X, ChevronDown, ChevronRight, User as UserIcon } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { total, itemCount } = useCart();
  const { user, logout } = useAuth();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});

  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const handleMouseEnter = (name: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const toggleMobileSubmenu = (key: string) => {
    setMobileExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 z-50">
      {/* 1. Ancillary Top Bar */}
      <div className="bg-brand-blue-dark text-white text-xs border-b border-white/10">
        <div className="site-container flex justify-end items-center h-8 gap-6">
          {user ? (
            <div className="flex items-center gap-3">
              <Link href="/my-account" className="flex items-center gap-1 hover:text-brand-gold transition-colors">
                <UserIcon className="w-3.5 h-3.5" />
                <span>Hi, {user.username}</span>
              </Link>
              <span>|</span>
              <button onClick={logout} className="hover:text-brand-gold transition-colors">
                Log Out
              </button>
            </div>
          ) : (
            <Link href="/my-account" className="hover:text-brand-gold transition-colors font-medium">
              Sign In
            </Link>
          )}

          <Link
            href="/cart"
            className="flex items-center gap-1.5 hover:text-brand-gold transition-colors font-semibold"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>${total.toFixed(2)}</span>
            <span className="bg-brand-gold text-brand-charcoal text-[10px] font-bold px-1.5 py-0.2 rounded-full">
              {itemCount}
            </span>
          </Link>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className={`w-full bg-white transition-all duration-200 ${isSticky ? 'sticky top-0 shadow-md z-40' : ''}`}>
        <div className="site-container flex items-center justify-between py-3.5">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/assets/images/logo-rpeptide.png"
              alt="rPeptide Logo"
              width={185}
              height={48}
              priority
              className="h-10 md:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Global Menu */}
          <nav className="hidden lg:flex items-center space-x-7 font-semibold text-[15px] text-brand-charcoal">
            {/* Products Mega Menu */}
            <div
              className="relative py-3 cursor-pointer"
              onMouseEnter={() => handleMouseEnter('products')}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/products"
                className={`flex items-center gap-1 hover:text-brand-blue transition-colors ${
                  activeDropdown === 'products' ? 'text-brand-blue' : ''
                }`}
              >
                Products
                <ChevronDown className="w-4 h-4 opacity-70" />
              </Link>

              {/* Mega Dropdown Pane */}
              {activeDropdown === 'products' && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-full w-[850px] bg-white shadow-2xl border-t-2 border-brand-blue p-6 z-50 grid grid-cols-3 gap-6 text-sm"
                  onMouseEnter={() => handleMouseEnter('products')}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Col 1 */}
                  <div className="space-y-4">
                    <div>
                      <Link href="/products/antibodies" className="font-bold text-brand-blue hover:underline block text-base mb-1">
                        Antibodies
                      </Link>
                      <ul className="space-y-1 text-gray-600 pl-2">
                        <li><Link href="/products/beta-amyloid-antibodies" className="hover:text-brand-blue">Beta-Amyloid Antibodies</Link></li>
                        <li><Link href="/products/synuclein-antibodies" className="hover:text-brand-blue">Synuclein</Link></li>
                        <li><Link href="/products/tau-antibodies" className="hover:text-brand-blue">Tau</Link></li>
                      </ul>
                    </div>

                    <div>
                      <Link href="/products/peptides" className="font-bold text-brand-blue hover:underline block text-base mb-1">
                        Peptides
                      </Link>
                      <ul className="space-y-1 text-gray-600 pl-2">
                        <li><Link href="/products/peptides" className="hover:text-brand-blue">Amylin</Link></li>
                        <li><Link href="/products/peptides" className="hover:text-brand-blue">Amyloid Precursor Protein</Link></li>
                        <li><Link href="/products/peptides" className="hover:text-brand-blue">Beta-Amyloid</Link></li>
                      </ul>
                    </div>
                  </div>

                  {/* Col 2 */}
                  <div className="space-y-4">
                    <div>
                      <Link href="/products/proteins" className="font-bold text-brand-blue hover:underline block text-base mb-1">
                        Proteins
                      </Link>
                      <ul className="space-y-1 text-gray-600 pl-2">
                        <li><Link href="/products/proteins" className="hover:text-brand-blue">Apolipoprotein</Link></li>
                        <li><Link href="/products/proteins" className="hover:text-brand-blue">Chemokine</Link></li>
                        <li><Link href="/products/proteins" className="hover:text-brand-blue">Calmodulin</Link></li>
                        <li><Link href="/products/proteins" className="hover:text-brand-blue">Human Plasma Proteins</Link></li>
                        <li><Link href="/products/proteins" className="hover:text-brand-blue">Surfactants</Link></li>
                        <li><Link href="/products/proteins" className="hover:text-brand-blue">Synuclein</Link></li>
                        <li><Link href="/products/proteins" className="hover:text-brand-blue">Tau</Link></li>
                        <li><Link href="/products/proteins" className="hover:text-brand-blue">Tubulin</Link></li>
                      </ul>
                    </div>
                  </div>

                  {/* Col 3 */}
                  <div className="space-y-4">
                    <div>
                      <Link href="/products/preformed-fibrils" className="font-bold text-brand-blue hover:underline block text-base mb-1">
                        Preformed Fibrils
                      </Link>
                      <ul className="space-y-1 text-gray-600 pl-2">
                        <li><Link href="/products/preformed-fibrils" className="hover:text-brand-blue">Beta-Amyloid Fibrils</Link></li>
                        <li><Link href="/products/preformed-fibrils" className="hover:text-brand-blue">Synuclein Fibrils</Link></li>
                        <li><Link href="/products/preformed-fibrils" className="hover:text-brand-blue">Tau Fibrils</Link></li>
                      </ul>
                    </div>

                    <div>
                      <Link href="/products/kits" className="font-bold text-brand-blue hover:underline block text-base mb-1">
                        Kits
                      </Link>
                      <ul className="space-y-1 text-gray-600 pl-2">
                        <li><Link href="/products/kits" className="hover:text-brand-blue">Beta-Amyloid</Link></li>
                        <li><Link href="/products/kits" className="hover:text-brand-blue">Tau</Link></li>
                      </ul>
                    </div>

                    <div>
                      <Link href="/products/coronavirus-research-tools" className="font-bold text-brand-blue hover:underline block text-base mb-1">
                        Coronavirus Tools
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div
              className="relative py-3 cursor-pointer"
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/services"
                className={`flex items-center gap-1 hover:text-brand-blue transition-colors ${
                  activeDropdown === 'services' ? 'text-brand-blue' : ''
                }`}
              >
                Services
                <ChevronDown className="w-4 h-4 opacity-70" />
              </Link>
              {activeDropdown === 'services' && (
                <div
                  className="absolute left-0 top-full w-64 bg-white shadow-xl border-t-2 border-brand-blue p-3 z-50 text-sm space-y-1"
                  onMouseEnter={() => handleMouseEnter('services')}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link href="/services/contract-services" className="block p-2 hover:bg-gray-50 hover:text-brand-blue">
                    Custom Peptides & Proteins
                  </Link>
                  <Link href="/services/custom-projects" className="block p-2 hover:bg-gray-50 hover:text-brand-blue">
                    Lab Services
                  </Link>
                  <Link href="/services/bulk-production-requests" className="block p-2 hover:bg-gray-50 hover:text-brand-blue">
                    Bulk Quote
                  </Link>
                  <Link href="/services/amino-acid-codes" className="block p-2 hover:bg-gray-50 hover:text-brand-blue">
                    Amino Acid Codes
                  </Link>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div
              className="relative py-3 cursor-pointer"
              onMouseEnter={() => handleMouseEnter('resources')}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/resources"
                className={`flex items-center gap-1 hover:text-brand-blue transition-colors ${
                  activeDropdown === 'resources' ? 'text-brand-blue' : ''
                }`}
              >
                Resources
                <ChevronDown className="w-4 h-4 opacity-70" />
              </Link>
              {activeDropdown === 'resources' && (
                <div
                  className="absolute left-0 top-full w-64 bg-white shadow-xl border-t-2 border-brand-blue p-3 z-50 text-sm space-y-1"
                  onMouseEnter={() => handleMouseEnter('resources')}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link href="/resources/citations" className="block p-2 hover:bg-gray-50 hover:text-brand-blue">
                    Citations
                  </Link>
                  <Link href="/resources/blogs" className="block p-2 hover:bg-gray-50 hover:text-brand-blue">
                    Blogs
                  </Link>
                  <Link href="/resources/international-distributors" className="block p-2 hover:bg-gray-50 hover:text-brand-blue">
                    International Distributors
                  </Link>
                  <Link href="/resources/faqs" className="block p-2 hover:bg-gray-50 hover:text-brand-blue">
                    FAQs
                  </Link>
                  <Link href="/resources/ordering" className="block p-2 hover:bg-gray-50 hover:text-brand-blue">
                    Ordering Overview
                  </Link>
                  <Link href="/resources/terms-conditions" className="block p-2 hover:bg-gray-50 hover:text-brand-blue">
                    Terms of Use
                  </Link>
                </div>
              )}
            </div>

            {/* About Dropdown */}
            <div
              className="relative py-3 cursor-pointer"
              onMouseEnter={() => handleMouseEnter('about')}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/about-us/our-company"
                className={`flex items-center gap-1 hover:text-brand-blue transition-colors ${
                  activeDropdown === 'about' ? 'text-brand-blue' : ''
                }`}
              >
                About
                <ChevronDown className="w-4 h-4 opacity-70" />
              </Link>
              {activeDropdown === 'about' && (
                <div
                  className="absolute left-0 top-full w-56 bg-white shadow-xl border-t-2 border-brand-blue p-3 z-50 text-sm space-y-1"
                  onMouseEnter={() => handleMouseEnter('about')}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link href="/about-us/our-company" className="block p-2 hover:bg-gray-50 hover:text-brand-blue">
                    Our Company
                  </Link>
                  <Link href="/about-us/contact-information" className="block p-2 hover:bg-gray-50 hover:text-brand-blue">
                    Contact Information
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Desktop Search Bar */}
          <div className="hidden lg:block w-64">
            <form onSubmit={handleSearchSubmit} className="flex border border-gray-300 overflow-hidden">
              <input
                type="text"
                placeholder="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-1.5 text-sm focus:outline-none focus:border-brand-blue"
              />
              <button
                type="submit"
                aria-label="Search"
                className="bg-brand-blue hover:bg-brand-blue-hover text-white px-3 flex items-center justify-center transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link href="/cart" className="relative p-1.5 text-brand-charcoal">
              <ShoppingBag className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-gold text-brand-charcoal text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile menu"
              className="p-1.5 text-brand-charcoal focus:outline-none"
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Off-Canvas Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Close Button */}
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <span className="font-bold text-lg text-brand-charcoal">Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-gray-500 hover:text-black"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="flex border border-gray-300 mb-6">
                <input
                  type="text"
                  placeholder="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 text-sm focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-brand-blue text-white px-3 flex items-center justify-center"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>

              {/* Vertical Accordion Menu */}
              <ul className="space-y-2 text-brand-charcoal font-medium">
                {/* Products */}
                <li className="border-b pb-2">
                  <div
                    className="flex justify-between items-center py-2 cursor-pointer"
                    onClick={() => toggleMobileSubmenu('products')}
                  >
                    <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="font-bold text-brand-blue">
                      Products
                    </Link>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded['products'] ? 'rotate-180' : ''}`} />
                  </div>
                  {mobileExpanded['products'] && (
                    <ul className="pl-4 space-y-2 text-sm text-gray-600 mt-1">
                      <li><Link href="/products/antibodies" onClick={() => setMobileMenuOpen(false)}>Antibodies</Link></li>
                      <li><Link href="/products/peptides" onClick={() => setMobileMenuOpen(false)}>Peptides</Link></li>
                      <li><Link href="/products/proteins" onClick={() => setMobileMenuOpen(false)}>Proteins</Link></li>
                      <li><Link href="/products/neurodegenerative-related-compounds" onClick={() => setMobileMenuOpen(false)}>Neurodegenerative Compounds</Link></li>
                      <li><Link href="/products/coronavirus-research-tools" onClick={() => setMobileMenuOpen(false)}>Coronavirus Research Tools</Link></li>
                      <li><Link href="/products/kits" onClick={() => setMobileMenuOpen(false)}>Kits</Link></li>
                      <li><Link href="/products/preformed-fibrils" onClick={() => setMobileMenuOpen(false)}>Preformed Fibrils</Link></li>
                    </ul>
                  )}
                </li>

                {/* Services */}
                <li className="border-b pb-2">
                  <div
                    className="flex justify-between items-center py-2 cursor-pointer"
                    onClick={() => toggleMobileSubmenu('services')}
                  >
                    <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="font-bold">
                      Services
                    </Link>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded['services'] ? 'rotate-180' : ''}`} />
                  </div>
                  {mobileExpanded['services'] && (
                    <ul className="pl-4 space-y-2 text-sm text-gray-600 mt-1">
                      <li><Link href="/services/contract-services" onClick={() => setMobileMenuOpen(false)}>Custom Peptides & Proteins</Link></li>
                      <li><Link href="/services/custom-projects" onClick={() => setMobileMenuOpen(false)}>Lab Services</Link></li>
                      <li><Link href="/services/bulk-production-requests" onClick={() => setMobileMenuOpen(false)}>Bulk Quote</Link></li>
                      <li><Link href="/services/amino-acid-codes" onClick={() => setMobileMenuOpen(false)}>Amino Acid Codes</Link></li>
                    </ul>
                  )}
                </li>

                {/* Resources */}
                <li className="border-b pb-2">
                  <div
                    className="flex justify-between items-center py-2 cursor-pointer"
                    onClick={() => toggleMobileSubmenu('resources')}
                  >
                    <Link href="/resources" onClick={() => setMobileMenuOpen(false)} className="font-bold">
                      Resources
                    </Link>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded['resources'] ? 'rotate-180' : ''}`} />
                  </div>
                  {mobileExpanded['resources'] && (
                    <ul className="pl-4 space-y-2 text-sm text-gray-600 mt-1">
                      <li><Link href="/resources/citations" onClick={() => setMobileMenuOpen(false)}>Citations</Link></li>
                      <li><Link href="/resources/blogs" onClick={() => setMobileMenuOpen(false)}>Blogs</Link></li>
                      <li><Link href="/resources/international-distributors" onClick={() => setMobileMenuOpen(false)}>International Distributors</Link></li>
                      <li><Link href="/resources/faqs" onClick={() => setMobileMenuOpen(false)}>FAQs</Link></li>
                      <li><Link href="/resources/ordering" onClick={() => setMobileMenuOpen(false)}>Ordering Overview</Link></li>
                      <li><Link href="/resources/terms-conditions" onClick={() => setMobileMenuOpen(false)}>Terms of Use</Link></li>
                    </ul>
                  )}
                </li>

                {/* About */}
                <li className="border-b pb-2">
                  <div
                    className="flex justify-between items-center py-2 cursor-pointer"
                    onClick={() => toggleMobileSubmenu('about')}
                  >
                    <Link href="/about-us/our-company" onClick={() => setMobileMenuOpen(false)} className="font-bold">
                      About
                    </Link>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded['about'] ? 'rotate-180' : ''}`} />
                  </div>
                  {mobileExpanded['about'] && (
                    <ul className="pl-4 space-y-2 text-sm text-gray-600 mt-1">
                      <li><Link href="/about-us/our-company" onClick={() => setMobileMenuOpen(false)}>Our Company</Link></li>
                      <li><Link href="/about-us/contact-information" onClick={() => setMobileMenuOpen(false)}>Contact Information</Link></li>
                    </ul>
                  )}
                </li>

                <li className="py-2">
                  <Link href="/my-account" onClick={() => setMobileMenuOpen(false)} className="font-bold block text-brand-blue">
                    Sign In / My Account
                  </Link>
                </li>
              </ul>
            </div>

            {/* Bottom Contact Phone */}
            <div className="pt-6 border-t text-xs text-gray-500">
              <p className="font-semibold text-brand-charcoal">rPeptide Technical Support</p>
              <p>Phone: 866.753.0747</p>
              <p>Email: sales@rpeptide.com</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
