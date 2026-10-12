'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white border border-gray-200 p-5 flex flex-col justify-between hover:shadow-md transition-shadow text-center min-h-[220px]">
      <div>
        <span className="text-xs text-gray-500 font-mono tracking-wider block mb-1">
          {product.sku}
        </span>
        <h3 className="text-base font-semibold text-brand-charcoal hover:text-brand-blue transition-colors line-clamp-2 mb-3">
          <Link href={`/product/${product.slug}`}>
            {product.name}
          </Link>
        </h3>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col items-center">
        <div className="text-sm font-semibold text-gray-800 mb-3">
          {product.formattedPrice}
        </div>

        <Link
          href={`/product/${product.slug}`}
          className="w-full bg-[#5c6873] hover:bg-brand-blue text-white text-xs font-semibold uppercase tracking-wider py-2 px-4 transition-colors text-center"
        >
          View
        </Link>
      </div>
    </div>
  );
}
