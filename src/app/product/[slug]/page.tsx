'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ChevronRight, Check, ShoppingBag, Plus, Minus, FileText, ExternalLink, ShieldCheck } from 'lucide-react';
import { getProductBySlug, getRelatedProducts } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';
import { ProductVariation } from '@/types';

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);
  const { addItem } = useCart();

  if (!product) {
    notFound();
  }

  const variations = product.variations || [];
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(
    variations.length > 0 ? variations[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'references' | 'publications'>('details');

  const related = useMemo(() => getRelatedProducts(product, 4), [product]);

  const currentPrice = selectedVariation ? selectedVariation.price : product.price;
  const currentSku = selectedVariation ? selectedVariation.sku : product.sku;

  const handleAddToCart = () => {
    addItem(
      {
        id: `${product.id}-${selectedVariation ? selectedVariation.id : 'base'}`,
        productId: product.id,
        variationId: selectedVariation?.id,
        name: product.name,
        slug: product.slug,
        sku: currentSku,
        size: selectedVariation?.size,
        price: currentPrice,
        image: product.images[0]?.src,
      },
      quantity
    );

    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 5000);
  };

  const primaryCategory = product.categories[0] || { name: 'Peptides', slug: 'peptides' };

  return (
    <div className="w-full bg-white pb-16">
      {/* 1. Breadcrumbs */}
      <div className="bg-[#f8f9fa] border-b border-gray-200 py-3 text-xs text-gray-500">
        <div className="site-container flex items-center space-x-2">
          <Link href="/" className="hover:text-brand-blue">Home</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <Link href="/products" className="hover:text-brand-blue">Products</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <Link href={`/products/${primaryCategory.slug}`} className="hover:text-brand-blue">
            {primaryCategory.name}
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-brand-charcoal font-semibold truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      <div className="site-container pt-8">
        {/* Research Warning Notice */}
        <div className="before-palace-order text-xs sm:text-sm">
          <p>rPeptide products are for research purposes only. Not for human consumption.</p>
        </div>

        {/* Added to cart banner alert */}
        {addedNotice && (
          <div className="mb-6 p-4 bg-green-50 border border-green-300 flex items-center justify-between text-green-800 text-sm">
            <div className="flex items-center gap-2 font-medium">
              <Check className="w-5 h-5 text-green-600" />
              <span>&ldquo;{product.name}&rdquo; ({selectedVariation?.size || 'Standard'}) was added to your cart.</span>
            </div>
            <Link
              href="/cart"
              className="bg-brand-blue text-white text-xs font-bold uppercase tracking-wider px-4 py-2 hover:bg-brand-blue-hover"
            >
              View Cart
            </Link>
          </div>
        )}

        {/* 2. Top Product Summary: Image & Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-12 border-b border-gray-200">
          {/* Left: Product Image / Scientific Brand Graphic */}
          <div className="flex flex-col items-center justify-center p-8 bg-gray-50 border border-gray-200">
            <div className="relative w-full max-w-sm h-72 sm:h-80 flex items-center justify-center">
              {product.images && product.images[0] ? (
                <Image
                  src={product.images[0].src}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="text-center p-6 bg-white border border-gray-300 w-full h-full flex flex-col justify-center items-center shadow-sm">
                  <Image
                    src="/assets/images/logo-rpeptide.png"
                    alt="rPeptide"
                    width={180}
                    height={50}
                    className="mb-4"
                  />
                  <div className="font-mono text-xs text-gray-600 font-semibold">{currentSku}</div>
                  <div className="text-sm font-semibold text-brand-blue mt-1">High-Purity Recombinant</div>
                </div>
              )}
            </div>
            <span className="text-[11px] text-gray-400 mt-4 tracking-wider uppercase">
              Batch Tested &bull; Purity Guaranteed &bull; Fast US & Worldwide Dispatch
            </span>
          </div>

          {/* Right: Title, SKU, Swatches, Add to Cart */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono font-semibold text-gray-500 uppercase tracking-wider block mb-1">
                SKU: <span className="text-brand-charcoal">{currentSku}</span>
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-brand-charcoal font-display">
                {product.name}
              </h1>
            </div>

            {/* Price display */}
            <div className="text-2xl font-bold text-brand-blue">
              ${currentPrice.toFixed(2)}
            </div>

            {/* Short Description */}
            {product.shortDescription && (
              <div
                className="text-sm text-gray-700 leading-relaxed border-t border-b border-gray-100 py-3"
                dangerouslySetInnerHTML={{ __html: product.shortDescription }}
              />
            )}

            {/* Variation Selection (Sizes) */}
            {variations.length > 0 && (
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                  Size: <span className="text-brand-blue">{selectedVariation?.size}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {variations.map((v) => {
                    const isSelected = selectedVariation?.id === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariation(v)}
                        className={`swatch-btn ${isSelected ? 'active' : ''}`}
                      >
                        {v.size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <div className="flex items-center border border-gray-300 w-32 justify-between">
                <button
                  type="button"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-semibold text-sm px-2">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="btn-primary text-xs uppercase tracking-wider py-3 px-8 flex items-center justify-center gap-2 flex-grow sm:flex-grow-0"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
            </div>

            {/* In Stock & Fast Shipping Badges */}
            <div className="pt-4 flex flex-col gap-2 text-xs text-gray-600 border-t border-gray-100">
              <div className="flex items-center gap-1.5 text-green-700 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>In Stock &ndash; Ships within 24-48 business hours</span>
              </div>
              <p>Categories: {product.categories.map(c => c.name).join(', ')}</p>
            </div>
          </div>
        </div>

        {/* 3. Detailed Tabs / Accordion */}
        <div className="py-12 border-b border-gray-200">
          <div className="flex border-b border-gray-200 mb-8 space-x-6 text-sm font-bold uppercase tracking-wider">
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-3 transition-colors ${
                activeTab === 'details'
                  ? 'border-b-2 border-brand-blue text-brand-blue'
                  : 'text-gray-500 hover:text-brand-charcoal'
              }`}
            >
              Product Details
            </button>
            <button
              onClick={() => setActiveTab('references')}
              className={`pb-3 transition-colors ${
                activeTab === 'references'
                  ? 'border-b-2 border-brand-blue text-brand-blue'
                  : 'text-gray-500 hover:text-brand-charcoal'
              }`}
            >
              References
            </button>
            <button
              onClick={() => setActiveTab('publications')}
              className={`pb-3 transition-colors ${
                activeTab === 'publications'
                  ? 'border-b-2 border-brand-blue text-brand-blue'
                  : 'text-gray-500 hover:text-brand-charcoal'
              }`}
            >
              Publications
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'details' && (
            <div className="space-y-6 text-sm">
              <div className="bg-gray-50 p-6 border border-gray-200">
                <h4 className="font-bold text-base text-brand-charcoal mb-4">Specifications</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                  <div><strong>Physical State:</strong> {product.physicalState || 'White lyophilized powder'}</div>
                  <div><strong>Temperature Storage:</strong> {product.storageTemp || '-20°C'}</div>
                  <div><strong>Temperature Shipping:</strong> {product.shippingTemp || 'Ambient'}</div>
                  <div><strong>Source:</strong> {product.source || 'Recombinant. Expressed in E. coli'}</div>
                  <div><strong>Purity:</strong> {product.purity || '>97% by Mass Spec.'}</div>
                  <div><strong>Molecular Mass:</strong> {product.molecularMass || 'Theoretical'}</div>
                </div>
              </div>

              {/* Amino Acid Sequence */}
              <div>
                <h4 className="font-bold text-base text-brand-charcoal mb-2">Amino Acid Sequence</h4>
                <div className="sequence font-mono text-xs md:text-sm">
                  {product.sequence || 'D A E F R H D S G Y E V H H Q K L V F F A E D V G S N K G A I I G L M V G G V V'}
                </div>
              </div>

              {/* Detailed Description */}
              {product.description && (
                <div className="prose max-w-none text-gray-700 leading-relaxed pt-4">
                  <h4 className="font-bold text-base text-brand-charcoal mb-2">Description & Background</h4>
                  <div dangerouslySetInnerHTML={{ __html: product.description }} />
                </div>
              )}
            </div>
          )}

          {activeTab === 'references' && (
            <div className="space-y-3 text-sm text-gray-700">
              <h4 className="font-bold text-base text-brand-charcoal mb-3">Key Literature References</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Yankner, B., et al., (1990) <em>Neurotoxicity of beta-amyloid in cell culture</em>, Science, 250 : 279-282</li>
                <li>Stine, W., et al., (2003) <em>In vitro characterization of conditions for amyloid-beta peptide oligomerization</em>, J. Biol. Chem, 278 : 11612-11622</li>
                <li>Frank, R., et al., (2003) <em>Mechanisms of beta-amyloid peptide aggregation and neurodegeneration</em>, Neurobiology of Aging, 24 : 521-536</li>
                <li>Alsalahat, I., et al., (2021) <em>Spectroscopic analysis of synthetic peptide interactions</em>, Biochemistry and Biophysics Reports, 26 : 100943</li>
              </ul>
            </div>
          )}

          {activeTab === 'publications' && (
            <div className="space-y-4 text-sm text-gray-700">
              <h4 className="font-bold text-base text-brand-charcoal mb-3">Recent Research Citing rPeptide</h4>
              <div className="p-4 bg-gray-50 border border-gray-200">
                <a
                  href="https://dx.doi.org/10.2139/ssrn.4492333"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-brand-blue hover:underline flex items-center gap-1.5"
                >
                  <span>The Kinetics of Aggregation of the Aβ1-40 Peptide Monitored by Magnetooptical Methods</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <p className="text-xs text-gray-500 mt-1">
                  <em>Journal of Magnetism and Magnetic Materials</em> (2023) 587, 171273
                </p>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200">
                <a
                  href="https://doi.org/10.1016/j.jbc.2021.100943"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-brand-blue hover:underline flex items-center gap-1.5"
                >
                  <span>Alpha-Synuclein Fibril Seeding Efficiency and Conformation Stability in Cellular Models</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <p className="text-xs text-gray-500 mt-1">
                  <em>Journal of Biological Chemistry</em> (2022) 298(4), 101850
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 4. Related Products */}
        {related.length > 0 && (
          <div className="pt-12">
            <h3 className="font-bold text-2xl text-brand-charcoal mb-8">Related Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {related.map(r => (
                <ProductCard key={r.id} product={r} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
