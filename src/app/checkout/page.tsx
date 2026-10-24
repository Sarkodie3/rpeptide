'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  CheckCircle,
  ShieldCheck,
  ArrowRight,
  Copy,
  Check,
  Coins,
  Smartphone,
  DollarSign,
  AlertCircle,
  Mail,
  Loader2
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Order } from '@/types';

type PaymentMethodType = 'crypto' | 'cashapp' | 'applepay';
type CryptoType = 'BTC' | 'ETH' | 'USDT';

interface CryptoWalletInfo {
  name: string;
  network: string;
  address: string;
  exchangeRate: number; // USD per coin
  symbol: string;
}

const CRYPTO_WALLETS: Record<CryptoType, CryptoWalletInfo> = {
  BTC: {
    name: 'Bitcoin',
    network: 'Bitcoin Native SegWit',
    address: 'bc1q9v8y5ywnw6897z55g4v7jex9a89wq4z9x7l6e2',
    exchangeRate: 67500,
    symbol: 'BTC',
  },
  ETH: {
    name: 'Ethereum',
    network: 'Ethereum (ERC-20)',
    address: '0x71C83D4829392eFE4249a8B89C33887198aB1556',
    exchangeRate: 3500,
    symbol: 'ETH',
  },
  USDT: {
    name: 'Tether USDT',
    network: 'TRC-20 (Tron)',
    address: 'TYDhs8Pq65eK9b2uQW3t5N1Z8mF4yA3vB8',
    exchangeRate: 1,
    symbol: 'USDT',
  },
};

const CASHAPP_TAG = '$RPeptideOrders';

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
    paymentMethod: 'crypto' as PaymentMethodType,
    cryptoCoin: 'BTC' as CryptoType,
    cryptoTxid: '',
    cashAppTag: '',
    applePayPhone: '',
    termsAccepted: false,
  });

  const [orderComplete, setOrderComplete] = useState<Order | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert('Please agree to the research terms and conditions to proceed.');
      return;
    }

    setSubmitting(true);

    const orderNum = 'RP-' + Math.floor(100000 + Math.random() * 900000);

    let paymentMethodDisplay = 'CRYPTO';
    let paymentDetailsProvided = '';
    if (formData.paymentMethod === 'crypto') {
      paymentMethodDisplay = `CRYPTO (${formData.cryptoCoin}${formData.cryptoTxid ? ` - TXID: ${formData.cryptoTxid.slice(0, 10)}...` : ''})`;
      paymentDetailsProvided = `Selected Coin: ${formData.cryptoCoin} (${CRYPTO_WALLETS[formData.cryptoCoin].name}). Network: ${CRYPTO_WALLETS[formData.cryptoCoin].network}. Customer TXID / Hash: ${formData.cryptoTxid || 'Awaiting wallet invoice from support'}`;
    } else if (formData.paymentMethod === 'cashapp') {
      paymentMethodDisplay = `CASHAPP (${formData.cashAppTag ? formData.cashAppTag : CASHAPP_TAG})`;
      paymentDetailsProvided = `Customer Cashtag: ${formData.cashAppTag || 'Awaiting Cash App payment link from support'}. Store Cashtag: ${CASHAPP_TAG}`;
    } else if (formData.paymentMethod === 'applepay') {
      paymentMethodDisplay = `APPLE PAY (${formData.applePayPhone ? formData.applePayPhone : 'Mobile / Touch ID'})`;
      paymentDetailsProvided = `Customer Apple Pay Contact: ${formData.applePayPhone || 'Device Touch/Face ID'}. Awaiting Apple Pay invoice from support`;
    }

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
      paymentMethod: paymentMethodDisplay,
    };

    // Forward complete order information directly to support email: Rpeptidessupport@gmail.com
    try {
      await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderNumber: orderNum,
          customerName: `${formData.firstName} ${formData.lastName}`,
          customerEmail: formData.email,
          phone: formData.phone,
          company: formData.company,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          country: formData.country,
          shippingAddress: newOrder.shippingAddress,
          paymentMethod: paymentMethodDisplay,
          paymentDetails: paymentDetailsProvided,
          items: items.map(item => ({
            id: String(item.id),
            name: item.name,
            size: item.size || 'Standard',
            price: item.price,
            quantity: item.quantity,
          })),
          subtotal,
          shipping,
          tax,
          total,
          orderNotes: formData.orderNotes,
        }),
      });
    } catch (err) {
      console.error('Error dispatching order notification to support email:', err);
    }

    addOrder(newOrder);
    clearCart();
    setOrderComplete(newOrder);
    setSubmitting(false);
  };

  if (orderComplete) {
    const emailSubject = encodeURIComponent(`rPeptide Order Payment - ${orderComplete.orderNumber}`);
    const emailBody = encodeURIComponent(
      `Hello rPeptide Support Team,\n\nI just placed order ${orderComplete.orderNumber} on rPeptide.com for a total of $${orderComplete.total.toFixed(2)}.\n\nMy selected payment method is: ${orderComplete.paymentMethod}.\n\nPlease review my order and email me the payment instructions / custom invoice so I can complete payment.\n\nThank you!\n${orderComplete.billingAddress?.name || ''}`
    );

    return (
      <div className="site-container py-16">
        <div className="max-w-2xl mx-auto bg-white border border-gray-200 p-8 text-center shadow-sm">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-brand-charcoal mb-2 font-display">
            Thank You for Your Order!
          </h1>
          <p className="text-gray-600 text-sm mb-6">
            Your order has been recorded and submitted for fulfillment review.
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
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Selected Payment Method:</span>
              <span className="font-semibold text-brand-charcoal">{orderComplete.paymentMethod}</span>
            </div>

            <div className="pt-3 text-xs text-gray-700 leading-relaxed bg-blue-50 border border-blue-200 p-4 rounded space-y-2">
              <p className="font-bold text-brand-blue flex items-center gap-1.5 text-sm">
                <Mail className="w-4 h-4 text-brand-blue" />
                <span>Next Step: Order Review &amp; Payment Details</span>
              </p>
              <p>
                Your complete order details have been forwarded directly to our support desk at <strong className="text-brand-charcoal">Rpeptidessupport@gmail.com</strong>.
              </p>
              <p>
                Our billing and lab team will review your order items and email you shortly at <strong className="text-brand-charcoal">{formData.email || 'your registered email'}</strong> with the official invoice and custom transfer instructions for your selected payment method (<strong>{orderComplete.paymentMethod}</strong>).
              </p>
              <div className="pt-2 border-t border-blue-200">
                <a
                  href={`mailto:Rpeptidessupport@gmail.com?subject=${emailSubject}&body=${emailBody}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-blue hover:text-brand-charcoal underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Click here to email Rpeptidessupport@gmail.com directly about this order</span>
                </a>
              </div>
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

  const activeWallet = CRYPTO_WALLETS[formData.cryptoCoin];
  const cryptoAmount = (total / activeWallet.exchangeRate).toFixed(activeWallet.symbol === 'BTC' ? 6 : activeWallet.symbol === 'ETH' ? 5 : 2);

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
                  placeholder="John"
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
                  placeholder="Doe"
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
                  <option value="Australia">Australia</option>
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
                  placeholder="+1 (555) 000-0000"
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
                  placeholder="client@university.edu"
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

        {/* Right: Order Review & Payment Methods */}
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
                Select Preferred Payment Method
              </label>
              <p className="text-[11px] text-gray-500 leading-normal">
                Select your preferred payment channel. Once you place the order, our order desk (<strong className="text-brand-charcoal">Rpeptidessupport@gmail.com</strong>) will receive your requisition and email you the payment details / invoice directly.
              </p>

              <div className="space-y-3">
                {/* 1. CRYPTO */}
                <div className={`border transition-all ${formData.paymentMethod === 'crypto' ? 'border-brand-blue bg-blue-50/20 shadow-sm' : 'border-gray-200 bg-white'}`}>
                  <label className="flex items-center justify-between p-3.5 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="crypto"
                        checked={formData.paymentMethod === 'crypto'}
                        onChange={handleInputChange}
                        className="text-brand-blue"
                      />
                      <div className="flex items-center gap-2">
                        <Coins className="w-5 h-5 text-amber-600" />
                        <span className="font-bold text-sm text-brand-charcoal">CRYPTO</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                      BTC / ETH / USDT
                    </span>
                  </label>

                  {formData.paymentMethod === 'crypto' && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200 text-xs space-y-3">
                      <div>
                        <span className="font-semibold text-gray-700 block mb-1.5">Choose Coin:</span>
                        <div className="grid grid-cols-3 gap-2">
                          {(['BTC', 'ETH', 'USDT'] as CryptoType[]).map(coin => (
                            <button
                              key={coin}
                              type="button"
                              onClick={() => setFormData(p => ({ ...p, cryptoCoin: coin }))}
                              className={`py-2 px-2 text-center font-bold text-xs border rounded transition-colors ${
                                formData.cryptoCoin === coin
                                  ? 'bg-brand-blue text-white border-brand-blue'
                                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                              }`}
                            >
                              {coin}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="p-3 bg-white border border-gray-200 rounded space-y-2">
                        <div className="flex justify-between items-center text-[11px] text-gray-500">
                          <span>Network: <strong className="text-gray-800">{activeWallet.network}</strong></span>
                          <span>Amount: <strong className="text-brand-blue font-mono">{cryptoAmount} {activeWallet.symbol}</strong></span>
                        </div>

                        <div>
                          <span className="text-[11px] font-semibold text-gray-600 block mb-1">
                            Deposit Wallet Address:
                          </span>
                          <div className="flex items-center bg-gray-100 p-2 rounded border border-gray-200 gap-2">
                            <span className="font-mono text-[11px] text-gray-800 break-all flex-grow select-all">
                              {activeWallet.address}
                            </span>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(activeWallet.address, 'crypto')}
                              className="bg-white hover:bg-gray-200 border px-2.5 py-1 text-[11px] font-semibold rounded flex items-center gap-1 flex-shrink-0"
                            >
                              {copiedKey === 'crypto' ? (
                                <>
                                  <Check className="w-3 h-3 text-green-600" />
                                  <span className="text-green-700">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3 text-gray-500" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                          Transaction Hash / TXID (Optional for faster release)
                        </label>
                        <input
                          type="text"
                          placeholder="Paste blockchain transaction hash..."
                          value={formData.cryptoTxid}
                          onChange={(e) => setFormData(p => ({ ...p, cryptoTxid: e.target.value }))}
                          className="w-full border border-gray-300 p-2 text-xs bg-white focus:outline-none focus:border-brand-blue"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. CASHAPP */}
                <div className={`border transition-all ${formData.paymentMethod === 'cashapp' ? 'border-brand-blue bg-blue-50/20 shadow-sm' : 'border-gray-200 bg-white'}`}>
                  <label className="flex items-center justify-between p-3.5 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cashapp"
                        checked={formData.paymentMethod === 'cashapp'}
                        onChange={handleInputChange}
                        className="text-brand-blue"
                      />
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-[#00D632] rounded-full flex items-center justify-center text-white font-bold text-xs">
                          $
                        </div>
                        <span className="font-bold text-sm text-brand-charcoal">CASHAPP</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-800 px-2 py-0.5 rounded">
                      Instant Mobile Pay
                    </span>
                  </label>

                  {formData.paymentMethod === 'cashapp' && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200 text-xs space-y-3">
                      <div className="p-3 bg-white border border-gray-200 rounded space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Send Payment To:</span>
                          <span className="font-bold text-sm text-brand-blue">{CASHAPP_TAG}</span>
                        </div>
                        <div className="flex items-center justify-between bg-gray-100 p-2 rounded text-xs">
                          <span className="font-mono text-gray-800">Cashtag: <strong>{CASHAPP_TAG}</strong></span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(CASHAPP_TAG, 'cashapp')}
                            className="bg-white hover:bg-gray-200 border px-2.5 py-1 text-[11px] font-semibold rounded flex items-center gap-1"
                          >
                            {copiedKey === 'cashapp' ? (
                              <>
                                <Check className="w-3 h-3 text-green-600" />
                                <span className="text-green-700">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3 text-gray-500" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <div className="text-[11px] text-gray-500 leading-relaxed pt-1">
                          1. Open Cash App on your device.<br />
                          2. Send <strong>${total.toFixed(2)}</strong> to <strong>{CASHAPP_TAG}</strong>.<br />
                          3. In the memo / note field, enter your name: <strong>{formData.firstName || 'Client'} - Order</strong>.
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                          Your $Cashtag (for verification)
                        </label>
                        <input
                          type="text"
                          placeholder="$YourUsername"
                          value={formData.cashAppTag}
                          onChange={(e) => setFormData(p => ({ ...p, cashAppTag: e.target.value }))}
                          className="w-full border border-gray-300 p-2 text-xs bg-white focus:outline-none focus:border-brand-blue"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. APPLE PAY */}
                <div className={`border transition-all ${formData.paymentMethod === 'applepay' ? 'border-brand-blue bg-blue-50/20 shadow-sm' : 'border-gray-200 bg-white'}`}>
                  <label className="flex items-center justify-between p-3.5 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="applepay"
                        checked={formData.paymentMethod === 'applepay'}
                        onChange={handleInputChange}
                        className="text-brand-blue"
                      />
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-5 h-5 text-gray-800" />
                        <span className="font-bold text-sm text-brand-charcoal">APPLE PAY</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-black text-white px-2.5 py-0.5 rounded">
                      Apple Pay
                    </span>
                  </label>

                  {formData.paymentMethod === 'applepay' && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200 text-xs space-y-3">
                      <div className="p-3 bg-white border border-gray-200 rounded space-y-2 text-center">
                        <div className="inline-flex items-center justify-center bg-black text-white px-4 py-2 rounded font-semibold text-sm gap-2 mx-auto">
                          <span>Pay with Apple Pay</span>
                        </div>
                        <p className="text-[11px] text-gray-600 leading-relaxed pt-1">
                          When you submit this order, you will be prompted on your Apple device or Safari browser to confirm with Touch ID, Face ID, or passcode.
                        </p>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                          Apple Pay Contact Phone / Apple ID
                        </label>
                        <input
                          type="text"
                          placeholder="+1 (555) 000-0000 or appleid@icloud.com"
                          value={formData.applePayPhone}
                          onChange={(e) => setFormData(p => ({ ...p, applePayPhone: e.target.value }))}
                          className="w-full border border-gray-300 p-2 text-xs bg-white focus:outline-none focus:border-brand-blue"
                        />
                      </div>
                    </div>
                  )}
                </div>
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
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting Order to Support Desk...</span>
                </>
              ) : (
                <>
                  <span>
                    Place Order &bull; Request {formData.paymentMethod === 'crypto' ? 'Crypto' : formData.paymentMethod === 'cashapp' ? 'Cash App' : 'Apple Pay'} Invoice
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-4">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <span>256-Bit SSL Encrypted Checkout &bull; Verified Gateway</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
