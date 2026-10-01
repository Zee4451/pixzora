import Link from 'next/link';
import { Globe, Shield, Sparkles, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#090d16]/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
              Pix<span className="text-cyan-400">zora</span>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                ₹299/mo
              </span>
            </span>
            <span className="text-xs text-gray-400">Zero Hosting Cost • Bank AutoPay</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link href="#features" className="hover:text-cyan-400 transition-colors">
            Why ₹299?
          </Link>
          <Link href="#templates" className="hover:text-cyan-400 transition-colors">
            Custom Work
          </Link>
          <Link href="#security" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
            <Shield className="w-4 h-4 text-emerald-400" />
            Security & Isolation
          </Link>
          <Link href="#pricing" className="hover:text-cyan-400 transition-colors">
            Pricing & AutoPay
          </Link>
          <Link href="/zero-cost-guide" className="hover:text-emerald-400 transition-colors flex items-center gap-1 text-xs bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
            ₹0 Cost Strategy
          </Link>
          <Link href="/admin" className="hover:text-purple-400 transition-colors flex items-center gap-1.5 text-xs bg-purple-500/10 px-3 py-1.5 rounded-lg border border-purple-500/20">
            <LayoutDashboard className="w-3.5 h-3.5 text-purple-400" />
            Admin Portal (100+ Sites)
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/onboarding"
            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-xl group bg-gradient-to-br from-cyan-500 via-indigo-500 to-purple-600 group-hover:from-cyan-500 group-hover:to-purple-600 hover:text-white text-white shadow-lg shadow-cyan-500/25 active:scale-95 transition-all"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-[#090d16] rounded-[10px] group-hover:bg-opacity-0 flex items-center gap-2 font-semibold">
              <Sparkles className="w-4 h-4 text-cyan-400 group-hover:text-white" />
              Get Your Website
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
