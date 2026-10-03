'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, ShieldCheck, Zap, HelpCircle, ArrowRight, CreditCard } from 'lucide-react';

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-cyan-500/20">
            <Zap className="w-3.5 h-3.5" /> 100% Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            A Complete Online Presence for <span className="gradient-text">₹299/Month</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            No massive upfront design agencies charging ₹25,000+. Zero hidden server fees. Recurring bank deduction via automated UPI AutoPay.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-white/5 border border-white/10 mt-8">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly Subscription
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                billingCycle === 'yearly'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Annual Plan
              <span className="text-[10px] bg-emerald-500 text-black px-2 py-0.5 rounded-full font-bold">
                2 Mo Free + Free .com Domain
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Standard ₹299/mo Plan */}
          <div className="rounded-3xl p-8 glass-panel border border-cyan-500/30 relative flex flex-col justify-between shadow-2xl shadow-cyan-500/10 ring-1 ring-cyan-500/30">
            <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black text-xs font-bold uppercase tracking-wider shadow-md">
              Most Popular
            </div>

            <div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">Pixzora Launchpad</h3>
                <p className="text-xs text-gray-400">Everything needed to establish, run, and scale your brand</p>
              </div>

              {/* Price display */}
              <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-white/10">
                <span className="text-5xl font-black text-white">
                  {billingCycle === 'monthly' ? '₹299' : '₹2,990'}
                </span>
                <span className="text-sm text-gray-400">
                  {billingCycle === 'monthly' ? '/ month' : '/ year (save ₹600)'}
                </span>
              </div>

              {/* AutoPay highlight */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/20 mb-6 flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="text-cyan-200 font-semibold mb-0.5">UPI AutoPay / eMandate Enabled</p>
                  <p className="text-gray-400">
                    Recurring auto-debit directly via PhonePe, GPay, Paytm, or Netbanking. Zero manual hassle every 30 days. Cancel anytime.
                  </p>
                </div>
              </div>

              {/* Feature Checklist */}
              <ul className="space-y-3.5 mb-8 text-sm text-gray-300">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>100% Done-For-You Setup:</strong> Hum complete website banakar live denge</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>Zero Hosting Charges:</strong> Cloudflare Edge Hosting (unlimited bandwidth free)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>Free Official Subdomain:</strong> <code>yourbrand.pages.dev</code> included</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>Custom E-Commerce & WhatsApp Orders:</strong> Direct payment & delivery alerts</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>Continuous Maintenance:</strong> Content updates, menu & product changes included</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>Bank-Grade Security & Isolation:</strong> Dedicated database partitioning via Supabase</span>
                </li>
              </ul>
            </div>

            <Link
              href="/onboarding"
              className="w-full py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-sm text-center shadow-lg shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 group"
            >
              Start ₹299/mo Subscription
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Card 2: FAQ & Guarantee Box */}
          <div className="rounded-3xl p-8 glass-panel border border-white/10 flex flex-col justify-between">
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
