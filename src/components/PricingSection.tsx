'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, ShieldCheck, Zap, HelpCircle, ArrowRight, CreditCard } from 'lucide-react';

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-[#06090f] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/80 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-slate-700/60 shadow-sm">
            <Zap className="w-3.5 h-3.5" /> Transparent Pricing Architecture
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Production Website & Ops for <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-300 to-indigo-300">₹299/Month Flat</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            No capital expenditure. No ₹25,000 upfront agency invoices. Fully automated bank billing with zero lock-in contracts.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 mt-8 shadow-inner">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Subscription
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                billingCycle === 'yearly'
                  ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Annual Billing
              <span className="text-[10px] bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-full font-bold">
                2 Mo Free + Free .com Domain
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Standard ₹299/mo Plan */}
          <div className="rounded-3xl p-8 glass-panel border border-sky-500/40 relative flex flex-col justify-between shadow-2xl shadow-sky-500/5 bg-slate-900/60 ring-1 ring-sky-500/30">
            <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-md">
              Enterprise Managed
            </div>

            <div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">Pixzora Managed Tier</h3>
                <p className="text-xs text-slate-400">Complete design, hosting, edge CDN & ongoing maintenance</p>
              </div>

              {/* Price display */}
              <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-slate-800">
                <span className="text-5xl font-extrabold text-white">
                  {billingCycle === 'monthly' ? '₹299' : '₹2,990'}
                </span>
                <span className="text-sm text-slate-400">
                  {billingCycle === 'monthly' ? '/ month' : '/ year (save ₹600)'}
                </span>
              </div>

              {/* AutoPay highlight */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-sky-500/20 mb-6 flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="text-sky-300 font-semibold mb-0.5">NPCI Approved UPI AutoPay / eMandate</p>
                  <p className="text-slate-400">
                    Automated bank deduction via PhonePe, GPay, Paytm, or Netbanking. Zero manual hassle every 30 days. Cancel anytime with 1-click.
                  </p>
                </div>
              </div>

              {/* Feature Checklist */}
              <ul className="space-y-3.5 mb-8 text-sm text-slate-300">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>100% Turnkey Setup:</strong> Complete custom site built by engineers</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>Unlimited Edge Bandwidth:</strong> High-speed Cloudflare global delivery</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>Complimentary Subdomain:</strong> <code>yourbrand.pages.dev</code> with SSL</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>Continuous Maintenance:</strong> Content & product updates handled</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>Air-Gapped Isolation:</strong> Isolated tenant database on Supabase</span>
                </li>
              </ul>
            </div>

            <Link
              href="/onboarding"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-300 hover:to-blue-500 text-slate-950 font-bold text-sm text-center shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center gap-2 group"
            >
              Start Managed Subscription
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Card 2: FAQ & Guarantee Box */}
          <div className="rounded-3xl p-8 glass-panel border border-slate-800/80 bg-slate-900/40 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <HelpCircle className="w-4 h-4" /> Clear Answers
              </div>
              <h3 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h3>

              <div className="space-y-6 text-xs text-gray-300">
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">How does the ₹299 AutoPay work?</h4>
                  <p className="text-gray-400 leading-relaxed">
                    During checkout, you authorize a recurring eMandate/UPI AutoPay with Razorpay using GPay, PhonePe, or Cards. Your ₹299 gets automatically deducted each month. You can pause or cancel anytime with zero lock-in period.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-white text-sm mb-1">Is hosting truly free of cost for commercial use?</h4>
                  <p className="text-gray-400 leading-relaxed">
                    Yes! We host your website on Cloudflare Pages and Vercel edge networks, which offer free commercial deployment tiers with unlimited fast bandwidth, SSL certificates, and 99.99% uptime.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-white text-sm mb-1">Can I use my existing domain name?</h4>
                  <p className="text-gray-400 leading-relaxed">
                    Absolutely. You get a free subdomain (e.g. <code>mybrand.pages.dev</code>) instantly, and if you already own a <code>.com</code> or <code>.in</code> domain, we map it to your website at ₹0 extra charge.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-white text-sm mb-1">What if another client's website gets attacked?</h4>
                  <p className="text-gray-400 leading-relaxed">
                    Impossible to affect you. Unlike old shared cPanel hosts where 1 site can compromise all sites, each Pixzora website runs in its own isolated static container and isolated database space.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Satisfaction Guarantee</span>
              </div>
              <span className="text-[11px] text-gray-400">Instant Setup in 24 Hrs</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
