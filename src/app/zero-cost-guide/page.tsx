import Navbar from '@/components/Navbar';
import { Shield, Sparkles, CheckCircle2, DollarSign, Cloud, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ZeroCostBlueprintPage() {
  return (
    <div className="min-h-screen bg-[#090d16] text-white">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-500/20">
            <DollarSign className="w-3.5 h-3.5" /> ₹0 Initial Investment Blueprint
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            How PixoraPlan Operates at <span className="gradient-text">100% Free Initial Cost</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg">
            You don&apos;t need to spend a single rupee to start. From hosting to databases, subdomains, and payments, every component runs on generous free commercial tiers until you generate revenue.
          </p>
        </div>

        {/* 4 Pillars of Zero-Cost Execution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          {/* Pillar 1: Hosting */}
          <div className="glass-panel rounded-2xl p-6 border border-emerald-500/30">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Hosting & Bandwidth</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-xs">₹0 / month</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Cloudflare Pages & Vercel Free Tiers</h3>
            <p className="text-xs text-gray-300 leading-relaxed mb-4">
              Cloudflare Pages provides <strong>unlimited free bandwidth</strong>, 500 builds per month, and free global SSL certificates with 300+ edge locations. No server rent, no cPanel licenses, no VPS charges.
            </p>
            <div className="p-3 rounded-xl bg-white/5 text-xs text-gray-400 space-y-1">
              <div>✓ Unlimited monthly page views</div>
              <div>✓ Automatic SSL HTTPS certificates</div>
              <div>✓ Enterprise DDoS & bot protection</div>
            </div>
          </div>

          {/* Pillar 2: Subdomains */}
          <div className="glass-panel rounded-2xl p-6 border border-cyan-500/30">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Domains & URLs</span>
              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold text-xs">₹0 / client</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Free Unlimited Subdomains</h3>
            <p className="text-xs text-gray-300 leading-relaxed mb-4">
              You provide every client their own branded address like <code>clientname.pixoraplan.com</code>. Cloudflare DNS handles unlimited subdomains for free. Clients can also point their own existing domains for ₹0.
            </p>
            <div className="p-3 rounded-xl bg-white/5 text-xs text-gray-400 space-y-1">
              <div>✓ Zero domain registration fee needed</div>
              <div>✓ Wildcard SSL support included</div>
              <div>✓ Instant instant provisioning</div>
            </div>
          </div>

          {/* Pillar 3: Payments & Collections */}
          <div className="glass-panel rounded-2xl p-6 border border-purple-500/30">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Recurring Collections</span>
              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold text-xs">₹0 Upfront</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Direct UPI QR + Razorpay AutoPay</h3>
            <p className="text-xs text-gray-300 leading-relaxed mb-4">
              In the initial phase, you can accept payments via direct UPI QR directly to your personal/business UPI ID with <strong>0% payment gateway cut</strong> and zero signup charges. When ready, switch on Razorpay AutoPay.
            </p>
            <div className="p-3 rounded-xl bg-white/5 text-xs text-gray-400 space-y-1">
              <div>✓ No minimum balance required</div>
              <div>✓ Instant money into your bank account</div>
              <div>✓ Ready for 100+ clients</div>
            </div>
          </div>

          {/* Pillar 4: Security Isolation */}
          <div className="glass-panel rounded-2xl p-6 border border-amber-500/30">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Security & Isolation</span>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-xs">₹0 Maintenance</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Stateless Edge Containers</h3>
            <p className="text-xs text-gray-300 leading-relaxed mb-4">
              Because client sites are compiled into static assets and deployed to independent edge buckets, there are no Linux servers to patch, no PHP malware cleanups, and no firewall hardware to purchase.
            </p>
            <div className="p-3 rounded-xl bg-white/5 text-xs text-gray-400 space-y-1">
              <div>✓ 100% immune to neighbor site cross-hacking</div>
              <div>✓ Automatic updates without downtime</div>
              <div>✓ Instant kill-switch toggle in your admin panel</div>
            </div>
          </div>

        </div>

        {/* Financial Flow Projection (₹0 Cost) */}
        <div className="glass-panel rounded-3xl p-8 border border-white/10 mb-12">
          <h3 className="text-2xl font-bold text-white mb-6">Financial Growth Path (₹0 Expense)</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
              <span className="text-xs text-gray-400 uppercase font-semibold">10 Clients</span>
              <div className="text-3xl font-black text-cyan-400 mt-2">₹2,990 / mo</div>
              <p className="text-[11px] text-emerald-400 mt-1 font-semibold">Hosting cost: ₹0 (100% Profit)</p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
              <span className="text-xs text-gray-400 uppercase font-semibold">50 Clients</span>
              <div className="text-3xl font-black text-purple-400 mt-2">₹14,950 / mo</div>
              <p className="text-[11px] text-emerald-400 mt-1 font-semibold">Hosting cost: ₹0 (100% Profit)</p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
              <span className="text-xs text-emerald-300 uppercase font-bold">100 Clients (Goal)</span>
              <div className="text-3xl font-black text-emerald-400 mt-2">₹29,900 / mo</div>
              <p className="text-[11px] text-emerald-300 mt-1 font-semibold">Hosting cost: ₹0 (Pure MRR)</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-sm shadow-xl shadow-cyan-500/25 transition-all"
          >
            Launch Your First Client Onboarding
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
