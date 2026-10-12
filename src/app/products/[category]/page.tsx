import React from 'react';
import { notFound } from 'next/navigation';
import ProductCatalog from '@/components/ProductCatalog';
import { getProductsByCategory, getCategoryBySlug, getAllProducts } from '@/lib/products';
import { Metadata } from 'next';

const CATEGORY_NAMES: Record<string, string> = {
  peptides: 'Peptides',
  antibodies: 'Antibodies',
  proteins: 'Proteins',
  'neurodegenerative-related-compounds': 'Neurodegenerative Related Compounds',
  'coronavirus-research-tools': 'Coronavirus Research Tools',
  kits: 'Kits',
  'preformed-fibrils': 'Preformed Fibrils',
  'beta-amyloid': 'Beta-Amyloid Peptides',
  synuclein: 'Synuclein Proteins',
  tau: 'Tau Proteins',
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  peptides: 'rPeptide provides reliable, high-quality recombinant peptides to advance Alzheimer’s and neurodegenerative disease research worldwide.',
  antibodies: 'Monoclonal and polyclonal antibodies targeting Beta-Amyloid, Synuclein, and Tau proteins for high-specificity immunoassay applications.',
  proteins: 'Ultra-pure recombinant proteins engineered for high reproducibility in neurodegenerative and biochemistry laboratories.',
  'preformed-fibrils': 'Quality-controlled preformed fibrils for in vitro and in vivo seeding experiments, aggregation kinetics, and toxicity studies.',
  kits: 'Specialized ELISA and assay kits calibrated for neurodegenerative biomarkers.',
  'coronavirus-research-tools': 'Validated research reagents for viral spike and nucleocapsid interaction assays.',
  'neurodegenerative-related-compounds': 'Small molecules and specialized ligands for neuropathological research.',
};

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const catName = CATEGORY_NAMES[params.category] || params.category.replace(/-/g, ' ').toUpperCase();
  return {
    title: `${catName} | Buy Research Peptides Online USA | rPeptide`,
    description: `Buy high-quality research ${catName} online from rPeptide. Shipping to USA and worldwide for biomedical and academic research.`,
  };
}

export default function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { search?: string };
}) {
  const categorySlug = params.category;
  let products = getProductsByCategory(categorySlug);

  // Fallback if empty
  if (products.length === 0) {
    const all = getAllProducts();
    products = all.filter(p =>
      p.categories.some(c => c.slug.includes(categorySlug) || categorySlug.includes(c.slug))
    );
    if (products.length === 0) products = all;
  }

  const categoryTitle = CATEGORY_NAMES[categorySlug] || categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const categoryDescription = CATEGORY_DESCRIPTIONS[categorySlug] || 'rPeptide supplies high-purity research reagents worldwide.';

  return (
    <ProductCatalog
      initialProducts={products}
      categoryTitle={categoryTitle}
      categorySlug={categorySlug}
      categoryDescription={categoryDescription}
      bannerImage="/assets/images/product-page-peptides.jpg"
      initialSearch={searchParams?.search || ''}
    />
  );
}
