import React from 'react';
import ProductCatalog from '@/components/ProductCatalog';
import { getAllProducts } from '@/lib/products';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products | Recombinant Peptides, Proteins & Antibodies | rPeptide',
  description: 'Explore the full catalog of research peptides, recombinant proteins, preformed fibrils, and antibodies from rPeptide.',
};

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const allProducts = getAllProducts();
  const search = searchParams?.search || '';

  return (
    <ProductCatalog
      initialProducts={allProducts}
      categoryTitle="All Products"
      categorySlug="all"
      categoryDescription="rPeptide provides reliable, high-quality recombinant peptides, proteins, antibodies, and fibrils to advance Alzheimer’s and neurodegenerative disease research worldwide."
      bannerImage="/assets/images/product-page-peptides.jpg"
      initialSearch={search}
    />
  );
}
