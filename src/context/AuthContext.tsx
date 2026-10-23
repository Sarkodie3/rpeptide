'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Order } from '@/types';

interface AuthContextType {
  user: User | null;
  orders: Order[];
  login: (usernameOrEmail: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (data: Partial<User> & { password: string }) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  addOrder: (order: Order) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('rpeptide_user');
      if (savedUser) setUser(JSON.parse(savedUser));

      const savedOrders = localStorage.getItem('rpeptide_orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));
    } catch (e) {
      console.error('Error loading auth from localStorage', e);
    }
  }, []);

  const login = async (usernameOrEmail: string, password: string) => {
    if (!usernameOrEmail || !password) {
      return { success: false, message: 'Please enter both username/email and password.' };
    }
    // Check saved users or create session
    const currentUser: User = {
      id: 'usr_' + Date.now(),
      username: usernameOrEmail.split('@')[0],
      email: usernameOrEmail.includes('@') ? usernameOrEmail : `${usernameOrEmail}@research.org`,
      firstName: 'Dr. Researcher',
      lastName: 'Client',
      company: 'Biotech Labs Inc.',
      phone: '+3122862032',
      address: {
        street: '100 Research Parkway, Suite 200',
        city: 'Watkinsville',
        state: 'GA',
        zip: '30677',
        country: 'United States',
      },
    };
    setUser(currentUser);
    localStorage.setItem('rpeptide_user', JSON.stringify(currentUser));
    return { success: true, message: 'Signed in successfully.' };
  };

  const register = async (data: Partial<User> & { password: string }) => {
    if (!data.email || !data.password) {
      return { success: false, message: 'Please provide email and password.' };
    }
    const newUser: User = {
      id: 'usr_' + Date.now(),
      username: data.username || data.email.split('@')[0],
      email: data.email,
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      company: data.company || '',
      phone: data.phone || '',
      address: data.address,
    };
    setUser(newUser);
    localStorage.setItem('rpeptide_user', JSON.stringify(newUser));
    return { success: true, message: 'Account registered successfully.' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rpeptide_user');
  };

  const addOrder = (order: Order) => {
    setOrders(prev => {
      const updated = [order, ...prev];
      localStorage.setItem('rpeptide_orders', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, orders, login, register, logout, addOrder }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
