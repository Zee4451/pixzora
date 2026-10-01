'use client';

import Link from 'next/link';
import { Camera, Mail, ArrowUpRight } from 'lucide-react';

export default function CreatorLuxeDemo() {
  return (
    <div className="min-h-screen bg-[#06070a] text-gray-100 font-sans selection:bg-purple-500 selection:text-white">
      {/* Subdomain Notice */}
      <div className="bg-purple-950/60 border-b border-purple-500/20 px-4 py-2 text-center text-xs flex items-center justify-between text-purple-300">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          <span>Client Site: <strong>devlens.pixoraplan.com</strong></span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-gray-400">Powered by PixoraPlan @ ₹299/mo</span>
          <Link href="/onboarding?template=creator-luxe" className="bg-purple-500 text-white px-2.5 py-0.5 rounded font-bold text-[10px]">
            Use This Template
          </Link>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 p-0.5">
            <div className="w-full h-full rounded-full bg-[#06070a] flex items-center justify-center font-bold text-xl text-purple-400">
              DL
            </div>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">DevLens Architecture Studio</h1>
            <p className="text-xs text-gray-400">Minimalist Spatial & Interior Design • Bengaluru</p>
          </div>
        </div>

        <p className="text-base text-gray-300 leading-relaxed mb-12 max-w-2xl font-light">
          We craft contextual, sustainable residential sanctuaries and boutique hospitality spaces that bridge vernacular materials with contemporary minimalism.
        </p>

        {/* Selected Works */}
        <h2 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-6">Selected Architecture Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {[
            { title: 'The Monolith Villa', loc: 'Alibaug, MH', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=60' },
            { title: 'Courtyard House', loc: 'Coimbatore, TN', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&auto=format&fit=crop&q=60' },
            { title: 'Terra Loft', loc: 'Indiranagar, BLR', img: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600&auto=format&fit=crop&q=60' },
            { title: 'Pavilion by the Lake', loc: 'Udaipur, RJ', img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&auto=format&fit=crop&q=60' },
          ].map((work, i) => (
            <div key={i} className="group rounded-2xl overflow-hidden bg-white/5 border border-white/5 hover:border-purple-500/40 transition-all">
              <div className="h-56 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={work.img} alt={work.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-white">{work.title}</h3>
                  <span className="text-[11px] text-gray-400">{work.loc}</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="rounded-2xl p-8 bg-gradient-to-r from-purple-950/40 to-slate-900 border border-purple-500/20 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Have a project in mind?</h3>
          <p className="text-xs text-gray-400 mb-6">Currently accepting commissions for Q1 2027.</p>
          <a
            href="mailto:contact@devlens.design"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all"
          >
            <Mail className="w-3.5 h-3.5" />
            Book Architecture Consultation
          </a>
        </div>
      </main>
    </div>
  );
}
