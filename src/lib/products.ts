import { Product, Category } from '@/types';
import productsData from '@/data/normalized_products.json';
import categoriesData from '@/data/categories.json';

const products = productsData as unknown as Product[];
const categories = categoriesData as unknown as Category[];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductById(id: number): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  if (!categorySlug || categorySlug === 'all') return products;
  return products.filter(p => 
    p.categories.some(c => c.slug.toLowerCase() === categorySlug.toLowerCase())
  );
}

export function searchProducts(query: string): Product[] {
  if (!query.trim()) return products;
  const q = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(q) || 
    p.sku.toLowerCase().includes(q) || 
    p.shortDescription.toLowerCase().includes(q) ||
    p.categories.some(c => c.name.toLowerCase().includes(q))
  );
}

export function getCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug.toLowerCase() === slug.toLowerCase());
}

export function getFeaturedProducts(limit = 4): Product[] {
  const featured = products.filter(p => p.featured);
  if (featured.length >= limit) return featured.slice(0, limit);
  return products.slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const catSlugs = product.categories.map(c => c.slug);
  return products
    .filter(p => p.id !== product.id && p.categories.some(c => catSlugs.includes(c.slug)))
    .slice(0, limit);
}
