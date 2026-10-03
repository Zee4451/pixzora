import Link from 'next/link';
import { Globe, Shield, Sparkles, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#06090f]/85 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-all">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Pix<span className="text-sky-400">zora</span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20">
                ₹299/mo
              </span>
            </span>
            <span className="text-[11px] text-slate-400">Managed Web Infrastructure • Zero Hosting Cost</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link href="#features" className="hover:text-sky-400 transition-colors">
            Benefits
          </Link>
          <Link href="#templates" className="hover:text-sky-400 transition-colors">
            Showcase
          </Link>
          <Link href="#security" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-emerald-400" />
            Security
          </Link>
          <Link href="#pricing" className="hover:text-sky-400 transition-colors">
            Pricing
          </Link>
          <Link href="/zero-cost-guide" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-xs bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
            ₹0 Cost Architecture
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/onboarding"
            className="inline-flex items-center justify-center px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-300 hover:to-blue-500 text-slate-950 shadow-md shadow-sky-500/20 active:scale-95 transition-all gap-2"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
