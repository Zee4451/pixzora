'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  MessageSquare, 
  Star, 
  Plus, 
  Check, 
  ArrowLeft,
  Truck,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  image: string;
  badge?: string;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Glow Radiance Vitamin C Serum (30ml)',
    price: 649,
    originalPrice: 999,
    rating: 4.9,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 2,
    name: 'Hydra-Boost Barrier Repair Gel Cream',
    price: 499,
    originalPrice: 799,
    rating: 4.8,
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1608248597359-bbad20a23336?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 3,
    name: 'Matte Invisible Sunscreen Gel SPF 50+',
    price: 599,
    originalPrice: 850,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 4,
    name: 'Exfoliating AHA BHA Peeling Solution',
    price: 549,
    originalPrice: 899,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&auto=format&fit=crop&q=60'
  }
];

export default function StoreExpressDemo() {
  const [cart, setCart] = useState<{ [id: number]: number }>({ 1: 1 });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const addToCart = (id: number) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    const product = PRODUCTS.find(p => p.id === Number(id));
    return sum + (product ? product.price * qty : 0);
  }, 0);

  const handleWhatsAppCheckout = () => {
    setOrderPlaced(true);
    setTimeout(() => setOrderPlaced(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#070b13] text-gray-100 font-sans selection:bg-emerald-500 selection:text-black">
      
      {/* Client Subdomain Simulation Banner */}
      <div className="bg-emerald-950/60 border-b border-emerald-500/20 px-4 py-2 text-center text-xs flex items-center justify-between text-emerald-300">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Client Site: <strong>auraskincare.pixoraplan.com</strong></span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-gray-400">Powered by PixoraPlan @ ₹299/mo</span>
          <Link href="/onboarding?template=store-express" className="bg-emerald-400 text-black px-2.5 py-0.5 rounded font-bold text-[10px]">
            Use This Template
          </Link>
        </div>
      </div>

      {/* Store Header */}
      <header className="sticky top-0 z-40 bg-[#090e1a]/90 backdrop-blur-md border-b border-white/5 px-4 sm:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-black font-extrabold text-sm">
            A
          </div>
          <span className="font-extrabold text-lg text-white tracking-tight">Aura Skincare</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold hover:border-emerald-400 transition-colors">
              <ShoppingBag className="w-4 h-4 text-emerald-400" />
              <span>Cart ({totalItems})</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative px-4 sm:px-8 py-12 max-w-6xl mx-auto">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-emerald-900/40 via-slate-900 to-slate-950 border border-emerald-500/20 relative overflow-hidden">
          <div className="max-w-xl">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
              Direct WhatsApp & UPI Ordering
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4">
              Clean, Organic Skincare Backed by Science.
            </h1>
            <p className="text-sm text-gray-300 mb-6">
              100% Vegan, Cruelty-free formulas designed for radiant Indian skin. Free delivery across India on orders above ₹499.
            </p>
            <div className="flex items-center gap-3">
              <a href="#catalog" className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all">
                Shop Catalog
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Grid */}
      <section id="catalog" className="px-4 sm:px-8 py-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Featured Products</h2>
            <p className="text-xs text-gray-400">Order directly to merchant WhatsApp with 1-click</p>
          </div>
          <span className="text-xs text-emerald-400 font-semibold">{PRODUCTS.length} Products</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map(product => {
            const countInCart = cart[product.id] || 0;
            return (
              <div key={product.id} className="rounded-2xl bg-white/5 border border-white/5 p-4 flex flex-col justify-between hover:border-emerald-500/30 transition-all">
                <div>
                  <div className="relative h-48 rounded-xl overflow-hidden bg-slate-900 mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    {product.badge && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-emerald-500 text-black text-[10px] font-bold">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-amber-400 text-xs mb-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="font-bold">{product.rating}</span>
                  </div>

                  <h3 className="font-bold text-sm text-white mb-2 line-clamp-2">{product.name}</h3>
                </div>

                <div>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-lg font-black text-white">₹{product.price}</span>
                    <span className="text-xs text-gray-500 line-through">₹{product.originalPrice}</span>
                  </div>

                  <button
                    onClick={() => addToCart(product.id)}
                    className="w-full py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-300 hover:text-black font-bold text-xs border border-emerald-500/20 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    {countInCart > 0 ? `Added (${countInCart})` : 'Add to Cart'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Floating Checkout Bar */}
      {totalItems > 0 && (
        <div className="fixed bottom-6 inset-x-4 max-w-md mx-auto z-50">
          <div className="rounded-2xl p-4 bg-slate-900/95 backdrop-blur-md border border-emerald-500/40 shadow-2xl flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-400">{totalItems} items in cart</div>
              <div className="text-lg font-black text-emerald-400">Total: ₹{totalPrice}</div>
            </div>

            <button
              onClick={handleWhatsAppCheckout}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-black" />
              {orderPlaced ? 'Redirecting to WhatsApp...' : 'Order on WhatsApp'}
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-white/5 text-center text-xs text-gray-500">
        <p>© 2026 Aura Skincare. All rights reserved.</p>
        <p className="mt-1">Hosted on Cloudflare Pages via PixoraPlan</p>
      </footer>
    </div>
  );
}
