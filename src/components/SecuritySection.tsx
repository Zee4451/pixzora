import { Shield, Lock, Server, Cpu, Database, CheckCircle2 } from 'lucide-react';

export default function SecuritySection() {
  return (
    <section id="security" className="py-24 relative bg-[#070b13] border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/80 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-500/20 shadow-sm">
            <Shield className="w-3.5 h-3.5" /> Total Tenant Isolation Protocol
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Zero Cross-Site Intrusion Risk. <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300">100% Air-Gapped.</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Say goodbye to shared WordPress vulnerabilities. Pixzora runs on an immutable edge architecture where every client exists inside an isolated cryptographic sandbox.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Old Risky Way (cPanel/Shared WordPress) */}
          <div className="rounded-2xl p-8 bg-red-950/20 border border-red-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-sm">
                ✕
              </span>
              <div>
                <h3 className="text-lg font-bold text-white">Traditional Shared Hosting (cPanel / WordPress)</h3>
                <p className="text-xs text-red-300">High Cross-Contamination Risk</p>
              </div>
            </div>

            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold shrink-0 mt-0.5">•</span>
                <span><strong>Single Shared PHP Server:</strong> A vulnerable plugin on Site A allows hackers to run scripts accessing `/public_html` of all neighbor websites.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold shrink-0 mt-0.5">•</span>
                <span><strong>Symlink Exploits:</strong> Hackers traverse directory trees and steal MySQL database passwords of other businesses on the same server.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold shrink-0 mt-0.5">•</span>
                <span><strong>DDoS Domino Effect:</strong> If one site gets hit with high traffic or attacks, every single website on the shared machine crashes.</span>
              </li>
            </ul>
          </div>

          {/* Pixzora Isolated Edge Architecture */}
          <div className="rounded-2xl p-8 bg-emerald-950/20 border border-emerald-500/30 relative overflow-hidden shadow-xl shadow-emerald-500/5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                ✓
              </span>
              <div>
                <h3 className="text-lg font-bold text-white">Pixzora Zero-Trust Edge Isolation</h3>
                <p className="text-xs text-emerald-300">Air-Gapped & Immutable Static Architecture</p>
              </div>
            </div>

            <ul className="space-y-4 text-sm text-gray-200">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Stateless Jamstack Code:</strong> Client sites are compiled into static assets served globally via Cloudflare Pages edge nodes. No PHP or Python runtime to hijack.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Independent Deployment Buckets:</strong> Every website lives in its own cryptographically isolated sandbox. Cross-directory hopping is technically impossible.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Database Row-Level Security (RLS):</strong> API tokens are strictly scoped to one specific tenant UUID. Site A cannot query Site B under any circumstance.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Cloudflare Enterprise DDoS Shield:</strong> Automatic Layer 3/4/7 DDoS mitigation, auto-renewing SSL certificates, and bot challenge protection.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* 4 Pillars of Pixzora Security */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel rounded-2xl p-6 border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">Scoped API Tokens</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Every client's frontend only carries read-only, origin-restricted tokens. Admin endpoints require 2FA and cryptographic JWT authentication.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
              <Server className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">Zero Shared OS</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Websites do not share a common Linux user, memory pool, or filesystem. Cloudflare Edge isolates each bundle across 300+ global data centers.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
              <Database className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">PostgreSQL RLS</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Orders, inquiries, and customer data are locked with database-level policies. Even if a client injects SQL, queries cannot cross their tenant boundary.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
              <Cpu className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">Auto-Kill Switch</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              If any unusual anomaly or attack pattern is detected on a client's site, our admin panel can instantly quarantine the domain in 1-click without affecting the platform.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
