'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Dumbbell, 
  Clock, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Calendar,
  MessageSquare,
  ShieldCheck,
  Star
} from 'lucide-react';

export default function ServiceFlowDemo() {
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeadSubmitted(true);
    setTimeout(() => setLeadSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#070d18] text-gray-100 font-sans selection:bg-blue-500 selection:text-white">
      {/* Subdomain Notice */}
      <div className="bg-blue-950/60 border-b border-blue-500/20 px-4 py-2 text-center text-xs flex items-center justify-between text-blue-300">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span>Client Site: <strong>vanguardgym.pixoraplan.com</strong></span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-gray-400">Powered by PixoraPlan @ ₹299/mo</span>
          <Link href="/onboarding?template=service-flow" className="bg-blue-500 text-white px-2.5 py-0.5 rounded font-bold text-[10px]">
            Use This Template
          </Link>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#091122]/90 backdrop-blur-md border-b border-white/5 px-4 sm:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold text-sm">
            <Dumbbell className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-lg text-white tracking-tight">Vanguard Fitness</span>
        </div>

        <a
          href="tel:+919811122334"
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-semibold hover:bg-blue-600 hover:text-white transition-all"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call Now</span>
        </a>
      </header>

      {/* Hero */}
      <section className="px-4 sm:px-8 py-16 max-w-5xl mx-auto text-center">
        <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-500/20">
          Premier Strength & Conditioning Facility
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight mb-6">
          Transform Your Body. Elevate Your Mind.
        </h1>
        <p className="text-gray-400 text-base max-w-2xl mx-auto mb-8">
          Personal coaching, Olympic lifting, and functional HIIT classes in Mumbai. Book your free 1-day pass today.
        </p>

        {/* Lead Capture Form */}
        <div className="max-w-md mx-auto rounded-2xl p-6 bg-slate-900/90 border border-white/10 shadow-2xl">
          <h3 className="font-bold text-base text-white mb-2">Claim Free 1-Day Trial Pass</h3>
          <p className="text-xs text-gray-400 mb-4">Direct confirmation sent to your WhatsApp</p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              required
              placeholder="Your Full Name"
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
            <input
              type="tel"
              required
              placeholder="WhatsApp Mobile Number"
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              {leadSubmitted ? 'Pass Reserved! Check WhatsApp' : 'Get Free Trial Pass'}
            </button>
          </form>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 sm:px-8 py-12 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Training Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Personal Training', price: '₹4,999/mo', desc: '1-on-1 dedicated coach with nutrition and bi-weekly DEXA scans.' },
            { title: 'CrossFit & HIIT', price: '₹2,999/mo', desc: 'High intensity functional group workouts with Olympic barbell stations.' },
            { title: 'Open Gym Access', price: '₹1,499/mo', desc: 'Unlimited access 6AM - 11PM with locker and shower amenities.' },
          ].map((item, i) => (
            <div key={i} className="rounded-2xl p-6 bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all">
              <h3 className="font-bold text-lg text-white mb-1">{item.title}</h3>
              <div className="text-blue-400 font-extrabold text-sm mb-3">{item.price}</div>
              <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-white/5 text-center text-xs text-gray-500">
        <p>© 2026 Vanguard Fitness. All rights reserved.</p>
        <p className="mt-1">Built with PixoraPlan @ ₹299/mo</p>
      </footer>
    </div>
  );
}
