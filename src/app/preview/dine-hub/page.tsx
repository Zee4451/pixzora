'use client';

import Link from 'next/link';
import { Utensils, Clock, MapPin, Phone, MessageSquare } from 'lucide-react';

export default function DineHubDemo() {
  return (
    <div className="min-h-screen bg-[#0d0905] text-gray-100 font-sans selection:bg-amber-500 selection:text-black">
      {/* Subdomain Notice */}
      <div className="bg-amber-950/60 border-b border-amber-500/20 px-4 py-2 text-center text-xs flex items-center justify-between text-amber-300">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>Client Site: <strong>rusticcrust.pixoraplan.com</strong></span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-gray-400">Powered by PixoraPlan @ ₹299/mo</span>
          <Link href="/onboarding?template=dine-hub" className="bg-amber-500 text-black px-2.5 py-0.5 rounded font-bold text-[10px]">
            Use This Template
          </Link>
        </div>
      </div>

      <header className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Utensils className="w-5 h-5 text-amber-500" />
          <span className="font-extrabold text-lg text-white">The Rustic Crust Cafe</span>
        </div>
        <a
          href="https://wa.me/919723456789"
          className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-1.5"
        >
          <MessageSquare className="w-3.5 h-3.5 fill-black" />
          Reserve Table
        </a>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Artisanal Wood-Fired Kitchen</span>
          <h1 className="text-3xl sm:text-5xl font-black text-white mt-2 mb-4">Handcrafted Neapolitan Pizzas & Brews</h1>
          <p className="text-xs sm:text-sm text-gray-400 max-w-lg mx-auto">
            48-hour fermented sourdough bases, San Marzano tomatoes, and fresh Fior di Latte mozzarella.
          </p>
        </div>

        {/* Digital Menu */}
        <h2 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-2">Chef&apos;s Signature Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'Classic Margherita Bufala', price: '₹420', desc: 'San Marzano DOP sauce, buffalo mozzarella, fresh basil, extra virgin olive oil.' },
            { name: 'Truffle Wild Mushroom', price: '₹550', desc: 'Portobello & shiitake mushrooms, truffle crema, roasted garlic, thyme.' },
            { name: 'Smoked Pepperoni Piccante', price: '₹590', desc: 'Spicy artisanal pepperoni, hot honey drizzle, aged parmesan.' },
            { name: 'Burrata & Pesto Genovese', price: '₹520', desc: 'Creamy burrata center, pine nut pesto, blistered cherry tomatoes.' },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 flex justify-between items-start">
              <div>
                <h3 className="font-bold text-sm text-white">{item.name}</h3>
                <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
              </div>
              <span className="text-sm font-extrabold text-amber-400 shrink-0 ml-4">{item.price}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
