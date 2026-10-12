'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag, Check, AlertCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    discount,
    couponCode,
    applyCoupon,
    removeCoupon,
    shipping,
    tax,
    total,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; isError: boolean } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponMsg({ text: res.message, isError: !res.success });
    if (res.success) setInputCoupon('');
  };

  if (items.length === 0) {
    return (
      <div className="site-container py-20 text-center">
        <div className="max-w-md mx-auto bg-gray-50 border border-gray-200 p-10">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-brand-charcoal mb-2">Your Cart is Currently Empty</h2>
          <p className="text-sm text-gray-600 mb-8">
            Before proceeding to checkout you must add some products to your shopping cart.
          </p>
          <Link
            href="/products"
            className="btn-primary text-xs uppercase tracking-wider py-3.5 px-8 inline-block"
          >
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="site-container py-12">
      <div className="before-palace-order text-xs sm:text-sm mb-8">
        <p>rPeptide products are for research purposes only. Not for human consumption.</p>
      </div>

      <h1 className="text-3xl font-bold text-brand-charcoal font-display mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart Items Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="overflow-x-auto border border-gray-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#f2f1f1] text-brand-charcoal text-xs uppercase font-bold border-b border-gray-200">
                <tr>
                  <th className="py-3.5 px-4">Product</th>
                  <th className="py-3.5 px-4 text-center">Price</th>
                  <th className="py-3.5 px-4 text-center">Quantity</th>
                  <th className="py-3.5 px-4 text-right">Subtotal</th>
                  <th className="py-3.5 px-3 text-center">Remove</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div>
                          <Link href={`/product/${item.slug}`} className="font-semibold text-brand-charcoal hover:text-brand-blue">
                            {item.name}
                          </Link>
                          <div className="text-xs text-gray-500 font-mono mt-0.5">
                            SKU: {item.sku} {item.size && `| Size: ${item.size}`}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-center font-medium">
                      ${item.price.toFixed(2)}
                    </td>

                    <td className="py-4 px-4 text-center">
                      <div className="inline-flex items-center border border-gray-300">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-right font-bold text-brand-blue">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>

                    <td className="py-4 px-3 text-center">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Coupon Code & Clear Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2">
            <form onSubmit={handleApplyCoupon} className="flex gap-2 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Coupon code (e.g. RESEARCH10)"
                value={inputCoupon}
                onChange={(e) => setInputCoupon(e.target.value)}
                className="border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-brand-blue w-60"
              />
              <button
                type="submit"
                className="bg-[#5c6873] hover:bg-brand-charcoal text-white text-xs font-bold uppercase tracking-wider px-4 py-2"
              >
                Apply Coupon
              </button>
            </form>

            <button
              onClick={clearCart}
              className="text-xs text-gray-500 hover:text-red-600 underline font-medium self-end sm:self-auto"
            >
              Clear Cart
            </button>
          </div>

          {couponMsg && (
            <div
              className={`p-3 text-xs flex items-center gap-2 border ${
                couponMsg.isError
                  ? 'bg-red-50 text-red-700 border-red-200'
                  : 'bg-green-50 text-green-700 border-green-200'
              }`}
            >
              {couponMsg.isError ? <AlertCircle className="w-4 h-4" /> : <Check className="w-4 h-4" />}
              <span>{couponMsg.text}</span>
            </div>
          )}

          {couponCode && (
            <div className="flex items-center justify-between p-3 bg-brand-gold/10 border border-brand-gold text-xs text-brand-charcoal">
              <span className="font-semibold">Active Coupon: {couponCode}</span>
              <button onClick={removeCoupon} className="text-red-600 hover:underline">
                Remove
              </button>
            </div>
          )}
        </div>

        {/* Cart Totals Summary */}
        <div className="bg-[#f8f9fa] border border-gray-200 p-6 h-fit">
          <h3 className="font-bold text-lg text-brand-charcoal border-b pb-3 mb-4">Cart Totals</h3>

          <div className="space-y-3 text-sm text-gray-700 pb-6 border-b">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-green-700">
                <span>Discount ({couponCode})</span>
                <span className="font-semibold">-${discount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-semibold">
                {shipping === 0 ? <span className="text-green-700">Free (Over $500)</span> : `$${shipping.toFixed(2)}`}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Estimated Tax (7%)</span>
              <span className="font-semibold">${tax.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-between py-4 text-base font-bold text-brand-charcoal">
            <span>Total</span>
            <span className="text-xl text-brand-blue">${total.toFixed(2)}</span>
          </div>

          <Link
            href="/checkout"
            className="w-full btn-primary text-xs uppercase tracking-wider py-3.5 px-4 flex items-center justify-center gap-2 mt-4"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <p className="text-[11px] text-gray-500 text-center mt-4">
            Institutional POs and Credit Cards accepted.
          </p>
        </div>
      </div>
    </div>
  );
}
