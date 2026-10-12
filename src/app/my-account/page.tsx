'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Lock, Mail, Building, Phone, Package, LogOut, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function MyAccountPage() {
  const { user, orders, login, register, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [accountView, setAccountView] = useState<'orders' | 'profile'>('orders');

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [regData, setRegData] = useState({
    username: '',
    email: '',
    company: '',
    phone: '',
    password: '',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const res = await login(loginEmail, loginPass);
    if (!res.success) {
      setErrorMsg(res.message);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const res = await register(regData);
    if (!res.success) {
      setErrorMsg(res.message);
    }
  };

  // If user is logged in, show customer dashboard
  if (user) {
    return (
      <div className="site-container py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-gray-200 gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-brand-charcoal font-display">My Account</h1>
            <p className="text-sm text-gray-600 mt-1">
              Welcome back, <strong className="text-brand-blue">{user.firstName || user.username}</strong> ({user.company || 'Institution Client'})
            </p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600 hover:text-red-800 border border-red-200 px-4 py-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex space-x-6 border-b border-gray-200 mb-8 text-sm font-bold uppercase tracking-wider">
          <button
            onClick={() => setAccountView('orders')}
            className={`pb-3 flex items-center gap-2 transition-colors ${
              accountView === 'orders'
                ? 'border-b-2 border-brand-blue text-brand-blue'
                : 'text-gray-500 hover:text-brand-charcoal'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setAccountView('profile')}
            className={`pb-3 flex items-center gap-2 transition-colors ${
              accountView === 'profile'
                ? 'border-b-2 border-brand-blue text-brand-blue'
                : 'text-gray-500 hover:text-brand-charcoal'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Account Details</span>
          </button>
        </div>

        {/* View: Orders */}
        {accountView === 'orders' && (
          <div>
            {orders.length === 0 ? (
              <div className="p-12 text-center bg-gray-50 border border-gray-200">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-brand-charcoal mb-1">No Orders Found</h3>
                <p className="text-sm text-gray-500 mb-6">You have not placed any orders with this account yet.</p>
                <Link href="/products" className="btn-primary text-xs uppercase tracking-wider">
                  Browse Catalog
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b pb-4 mb-4 gap-2">
                      <div>
                        <span className="font-mono font-bold text-brand-blue text-base">
                          Order #{order.orderNumber}
                        </span>
                        <span className="text-xs text-gray-500 block sm:inline sm:ml-3">
                          Placed on {order.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="bg-blue-50 text-brand-blue text-xs font-bold px-2.5 py-1 uppercase rounded">
                          {order.status}
                        </span>
                        <span className="font-bold text-base text-brand-charcoal">
                          ${order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-gray-700">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between py-1 border-b border-gray-100 last:border-0">
                          <div>
                            <span className="font-medium">{item.name}</span>
                            <span className="text-xs text-gray-500 block">
                              SKU: {item.sku} {item.size && `| Size: ${item.size}`} × {item.quantity}
                            </span>
                          </div>
                          <span className="font-semibold text-gray-800">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-3 border-t text-xs text-gray-500 flex justify-between">
                      <span>Payment: {order.paymentMethod}</span>
                      <span>Delivery: Expedited Cold-Pack Shipping</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* View: Profile */}
        {accountView === 'profile' && (
          <div className="max-w-xl bg-gray-50 border border-gray-200 p-8">
            <h3 className="font-bold text-lg text-brand-charcoal mb-4">Institutional Profile</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div><strong>Name:</strong> {user.firstName} {user.lastName}</div>
              <div><strong>Username:</strong> {user.username}</div>
              <div><strong>Email:</strong> {user.email}</div>
              <div><strong>Institution:</strong> {user.company || 'Not specified'}</div>
              <div><strong>Phone:</strong> {user.phone || 'Not specified'}</div>
              {user.address && (
                <div>
                  <strong>Registered Lab Address:</strong><br />
                  {user.address.street}<br />
                  {user.address.city}, {user.address.state} {user.address.zip}<br />
                  {user.address.country}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Not logged in: Show Login / Register Tabs
  return (
    <div className="site-container py-16">
      <div className="max-w-md mx-auto bg-white border border-gray-200 shadow-sm p-8">
        <h1 className="text-2xl font-bold text-center text-brand-charcoal mb-6 font-display">
          rPeptide Customer Portal
        </h1>

        {/* Tabs */}
        <div className="grid grid-cols-2 border-b border-gray-200 mb-6 text-sm font-bold uppercase tracking-wider text-center">
          <button
            onClick={() => { setActiveTab('login'); setErrorMsg(''); }}
            className={`pb-3 transition-colors ${
              activeTab === 'login'
                ? 'border-b-2 border-brand-blue text-brand-blue'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setActiveTab('register'); setErrorMsg(''); }}
            className={`pb-3 transition-colors ${
              activeTab === 'register'
                ? 'border-b-2 border-brand-blue text-brand-blue'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Register
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs">
            {errorMsg}
          </div>
        )}

        {/* Login Form */}
        {activeTab === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase mb-1">
                Username or Email <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="name@university.edu"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full border border-gray-300 p-2.5 text-sm pl-9 focus:outline-none focus:border-brand-blue"
                />
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase mb-1">
                Password <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  className="w-full border border-gray-300 p-2.5 text-sm pl-9 focus:outline-none focus:border-brand-blue"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-600">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="text-brand-blue" defaultChecked />
                <span>Remember me</span>
              </label>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Please contact sales@rpeptide.com for password resets.'); }} className="text-brand-blue hover:underline">
                Lost password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full btn-primary text-xs uppercase tracking-wider py-3 font-bold mt-2"
            >
              Sign In
            </button>
          </form>
        )}

        {/* Register Form */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase mb-1">
                Username <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={regData.username}
                onChange={(e) => setRegData(p => ({ ...p, username: e.target.value }))}
                className="w-full border border-gray-300 p-2.5 text-sm focus:outline-none focus:border-brand-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase mb-1">
                Institutional Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                required
                value={regData.email}
                onChange={(e) => setRegData(p => ({ ...p, email: e.target.value }))}
                className="w-full border border-gray-300 p-2.5 text-sm focus:outline-none focus:border-brand-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase mb-1">
                Organization / Lab Name
              </label>
              <input
                type="text"
                placeholder="e.g. Johns Hopkins Medical Labs"
                value={regData.company}
                onChange={(e) => setRegData(p => ({ ...p, company: e.target.value }))}
                className="w-full border border-gray-300 p-2.5 text-sm focus:outline-none focus:border-brand-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase mb-1">
                Password <span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                required
                value={regData.password}
                onChange={(e) => setRegData(p => ({ ...p, password: e.target.value }))}
                className="w-full border border-gray-300 p-2.5 text-sm focus:outline-none focus:border-brand-blue"
              />
            </div>

            <button
              type="submit"
              className="w-full btn-gold text-xs uppercase tracking-wider py-3 font-bold mt-2"
            >
              Register Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
