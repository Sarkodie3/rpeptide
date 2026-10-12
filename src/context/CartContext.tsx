'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from '@/types';

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  couponCode: string;
  discount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('rpeptide_cart');
      if (saved) {
        setItems(JSON.parse(saved));
      }
      const savedCoupon = localStorage.getItem('rpeptide_coupon');
      if (savedCoupon) {
        const parsed = JSON.parse(savedCoupon);
        setCouponCode(parsed.code);
        setDiscountPercent(parsed.percent);
      }
    } catch (e) {
      console.error('Error loading cart from localStorage', e);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('rpeptide_cart', JSON.stringify(items));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [items]);

  const addItem = (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode('');
    setDiscountPercent(0);
    localStorage.removeItem('rpeptide_cart');
    localStorage.removeItem('rpeptide_coupon');
  };

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'RESEARCH10' || trimmed === 'RPEPTIDE10') {
      setCouponCode(trimmed);
      setDiscountPercent(10);
      localStorage.setItem('rpeptide_coupon', JSON.stringify({ code: trimmed, percent: 10 }));
      return { success: true, message: 'Coupon "10% Off Research Discount" applied successfully!' };
    } else if (trimmed === 'WELCOME15') {
      setCouponCode(trimmed);
      setDiscountPercent(15);
      localStorage.setItem('rpeptide_coupon', JSON.stringify({ code: trimmed, percent: 15 }));
      return { success: true, message: 'Coupon "15% Welcome Discount" applied successfully!' };
    }
    return { success: false, message: 'Invalid coupon code. Try RESEARCH10 or WELCOME15.' };
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountPercent(0);
    localStorage.removeItem('rpeptide_coupon');
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = Math.round((subtotal * (discountPercent / 100)) * 100) / 100;
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = Math.round(taxableAmount * 0.07 * 100) / 100; // 7% standard tax
  const shipping = items.length === 0 ? 0 : (subtotal > 500 ? 0 : 25.00); // Free shipping over $500
  const total = Math.max(0, Math.round((taxableAmount + tax + shipping) * 100) / 100);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        couponCode,
        discount,
        applyCoupon,
        removeCoupon,
        subtotal,
        tax,
        shipping,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
