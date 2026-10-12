'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CreditCard, FileText, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Order } from '@/types';

export default function CheckoutPage() {
  const { items, subtotal, discount, shipping, tax, total, clearCart } = useCart();
  const { user, addOrder } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    company: user?.company || '',
    country: 'United States',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || 'GA',
    zip: user?.address?.zip || '',
    phone: user?.phone || '',
    email: user?.email || '',
    orderNotes: '',
    paymentMethod: 'cc',
    poNumber: '',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '•••',
    termsAccepted: false,
  });

  const [orderComplete, setOrderComplete] = useState<Order | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert('Please agree to the research terms and conditions to proceed.');
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      const orderNum = 'RP-' + Math.floor(100000 + Math.random() * 900000);
      const newOrder: Order = {
        id: 'ord_' + Date.now(),
        orderNumber: orderNum,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        status: 'Processing',
        items: [...items],
        subtotal,
        discount,
        tax,
        shipping,
        total,
        billingAddress: {
          name: `${formData.firstName} ${formData.lastName}`,
          company: formData.company,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          country: formData.country,
        },
        shippingAddress: {
          name: `${formData.firstName} ${formData.lastName}`,
          company: formData.company,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          country: formData.country,
        },
        paymentMethod: formData.paymentMethod === 'cc' ? 'Credit Card' : `Institutional PO (${formData.poNumber || 'Pending'})`,
      };

      addOrder(newOrder);
      clearCart();
      setOrderComplete(newOrder);
      setSubmitting(false);
    }, 1200);
  };

  if (orderComplete) {
    return (
      <div className="site-container py-16">
        <div className="max-w-2xl mx-auto bg-white border border-gray-200 p-8 text-center shadow-sm">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-brand-charcoal mb-2 font-display">
            Thank You for Your Order!
          </h1>
          <p className="text-gray-600 text-sm mb-6">
            Your order has been received and is currently being processed by the rPeptide fulfillment laboratory.
          </p>

          <div className="bg-gray-50 p-6 border border-gray-200 text-left text-sm space-y-3 mb-8">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Order Number:</span>
              <span className="font-bold font-mono text-brand-blue">{orderComplete.orderNumber}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Date:</span>
              <span className="font-semibold">{orderComplete.date}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Total:</span>
              <span className="font-bold text-brand-blue text-base">${orderComplete.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Payment Method:</span>
              <span className="font-semibold">{orderComplete.paymentMethod}</span>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <Link
              href="/my-account"
              className="btn-hollow text-xs uppercase tracking-wider py-3 px-6"
            >
              View Order History
            </Link>
            <Link
              href="/products"
              className="btn-primary text-xs uppercase tracking-wider py-3 px-6"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="site-container py-20 text-center">
        <h2 className="text-2xl font-bold text-brand-charcoal mb-4">No items to checkout</h2>
        <p className="text-sm text-gray-600 mb-6">Your shopping cart is currently empty.</p>
        <Link href="/products" className="btn-primary text-xs uppercase tracking-wider py-3 px-6">
          Return to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="site-container py-12">
      <div className="before-palace-order text-xs sm:text-sm mb-8">
        <p>rPeptide products are for research purposes only. Not for human consumption.</p>
      </div>

      <h1 className="text-3xl font-bold text-brand-charcoal font-display mb-8">Checkout</h1>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Billing and Shipping Form */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <h2 className="text-xl font-bold text-brand-charcoal border-b pb-3 mb-6">
              Billing &amp; Shipping Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase mb-1">
                  First Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2.5 text-sm focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">
                  Last Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2.5 text-sm focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase mb-1">
                  Institution / Company / Lab Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="company"
                  required
                  placeholder="e.g. Stanford University Dept. of Biochemistry"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2.5 text-sm focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase mb-1">
                  Country / Region <span className="text-red-600">*</span>
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2.5 text-sm focus:outline-none focus:border-brand-blue bg-white"
                >
                  <option value="United States">United States (US)</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Germany">Germany</option>
                  <option value="Japan">Japan</option>
                  <option value="Switzerland">Switzerland</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase mb-1">
                  Street Address <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="street"
                  required
                  placeholder="House/Building number and street name"
                  value={formData.street}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2.5 text-sm focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">
                  Town / City <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2.5 text-sm focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">
                  State / Province <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2.5 text-sm focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">
                  ZIP / Postal Code <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="zip"
                  required
                  value={formData.zip}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2.5 text-sm focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">
                  Phone <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2.5 text-sm focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase mb-1">
                  Email Address <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2.5 text-sm focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase mb-1">
                  Order Notes (Optional)
                </label>
                <textarea
                  name="orderNotes"
                  rows={3}
                  placeholder="Notes about your delivery, cold pack specifications, or PO details."
                  value={formData.orderNotes}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2.5 text-sm focus:outline-none focus:border-brand-blue"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Order Review & Payment */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#f8f9fa] border border-gray-200 p-6">
            <h3 className="font-bold text-lg text-brand-charcoal border-b pb-3 mb-4">
              Your Order
            </h3>

            {/* Item list */}
            <div className="space-y-3 text-sm divide-y divide-gray-200 pb-4 border-b">
              {items.map(item => (
                <div key={item.id} className="pt-2 flex justify-between items-start">
                  <div>
                    <span className="font-semibold text-brand-charcoal">{item.name}</span>
                    <span className="text-xs text-gray-500 block">
                      {item.size ? `Size: ${item.size} × ` : ''}{item.quantity}
                    </span>
                  </div>
                  <span className="font-medium text-gray-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Subtotal, tax, shipping, total */}
            <div className="space-y-2 text-sm text-gray-700 py-4 border-b">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-700">
                  <span>Discount</span>
                  <span className="font-semibold">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold">
                  {shipping === 0 ? 'Free Shipping' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax (7%)</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-brand-charcoal pt-2 border-t">
                <span>Total</span>
                <span className="text-xl text-brand-blue">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="py-4 space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider block text-brand-charcoal">
                Payment Method
              </label>

              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 border bg-white cursor-pointer hover:border-brand-blue">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cc"
                    checked={formData.paymentMethod === 'cc'}
                    onChange={handleInputChange}
                    className="text-brand-blue"
                  />
                  <CreditCard className="w-4 h-4 text-brand-blue" />
                  <span className="text-xs font-semibold">Credit Card / Corporate Card</span>
                </label>

                {formData.paymentMethod === 'cc' && (
                  <div className="p-3 bg-gray-100 border text-xs space-y-2">
                    <input
                      type="text"
                      placeholder="Card Number"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData(p => ({ ...p, cardNumber: e.target.value }))}
                      className="w-full border p-2 bg-white"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={formData.cardExp}
                        onChange={(e) => setFormData(p => ({ ...p, cardExp: e.target.value }))}
                        className="w-full border p-2 bg-white"
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        value={formData.cardCvc}
                        onChange={(e) => setFormData(p => ({ ...p, cardCvc: e.target.value }))}
                        className="w-full border p-2 bg-white"
                      />
                    </div>
                  </div>
                )}

                <label className="flex items-center gap-3 p-3 border bg-white cursor-pointer hover:border-brand-blue">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="po"
                    checked={formData.paymentMethod === 'po'}
                    onChange={handleInputChange}
                    className="text-brand-blue"
                  />
                  <FileText className="w-4 h-4 text-brand-blue" />
                  <span className="text-xs font-semibold">Institutional Purchase Order (PO)</span>
                </label>

                {formData.paymentMethod === 'po' && (
                  <div className="p-3 bg-gray-100 border text-xs space-y-2">
                    <p className="text-gray-600">Enter your institution&rsquo;s PO reference number for NET 30 invoicing:</p>
                    <input
                      type="text"
                      placeholder="PO Number (e.g. PO-89211)"
                      value={formData.poNumber}
                      onChange={(e) => setFormData(p => ({ ...p, poNumber: e.target.value }))}
                      className="w-full border p-2 bg-white"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="pt-2 pb-4 text-xs">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleInputChange}
                  className="mt-0.5 text-brand-blue"
                />
                <span className="text-gray-600">
                  I understand that rPeptide products are exclusively for <strong>in vitro / research use only</strong> and agree to the <Link href="/resources/terms-conditions" className="text-brand-blue underline">terms and conditions</Link>.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full btn-primary text-xs uppercase tracking-wider py-4 font-bold flex items-center justify-center gap-2"
            >
              {submitting ? (
                <span>Processing Order...</span>
              ) : (
                <>
                  <span>Place Order</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-4">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <span>256-Bit SSL Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
