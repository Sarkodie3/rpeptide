export interface ProductVariation {
  id: number;
  sku: string;
  size: string;
  price: number; // in dollars, e.g. 120.00
  formattedPrice: string;
  inStock: boolean;
}

export interface ProductAttribute {
  id: number;
  name: string;
  slug: string;
  options: string[];
}

export interface ProductImage {
  id: number;
  src: string;
  alt: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  sku: string;
  type: string; // 'variable' | 'simple'
  price: number; // base or min price
  priceRange?: {
    min: number;
    max: number;
  };
  formattedPrice: string;
  shortDescription: string;
  description: string;
  categories: {
    id: number;
    name: string;
    slug: string;
  }[];
  tags?: {
    id: number;
    name: string;
    slug: string;
  }[];
  images: ProductImage[];
  attributes?: ProductAttribute[];
  variations?: ProductVariation[];
  featured?: boolean;
  inStock: boolean;
  sequence?: string;
  physicalState?: string;
  storageTemp?: string;
  shippingTemp?: string;
  source?: string;
  purity?: string;
  molecularMass?: string;
  references?: string[];
  publications?: {
    title: string;
    url: string;
    citation: string;
  }[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  parent: number;
  count: number;
}

export interface CartItem {
  id: string; // productId-variationId
  productId: number;
  variationId?: number;
  name: string;
  slug: string;
  sku: string;
  size?: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'Processing' | 'Completed' | 'Pending';
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  billingAddress: any;
  shippingAddress: any;
  paymentMethod: string;
}
