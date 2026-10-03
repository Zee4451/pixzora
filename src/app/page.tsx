import Link from 'next/link';
import Navbar from '@/components/Navbar';
import TemplateShowcase from '@/components/TemplateShowcase';
import SecuritySection from '@/components/SecuritySection';
import PricingSection from '@/components/PricingSection';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Globe2, 
  RefreshCw, 
  Users, 
  TrendingUp, 
  CheckCircle2,
  Lock,
  ChevronRight
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#06090f] text-slate-100 selection:bg-sky-500 selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-28 overflow-hidden">
        {/* Ambient Subtle Lighting (No harsh or playful glows) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-sky-500/10 via-blue-600/5 to-transparent blur-[120px] pointer-events-none -z-10 rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Top Institutional Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-xs sm:text-sm font-medium text-slate-300 mb-8 shadow-sm backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sky-400 font-semibold">Enterprise Managed Service</span>
            <span className="text-slate-600">•</span>
            <span>Bespoke Custom Websites at ₹299/month</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.12] mb-6">
            Enterprise-Grade Websites. Built Custom.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-300 to-indigo-300">
              ₹299 / Month Flat.
            </span>
          </h1>

          {/* Subtitle with High-Trust Psychological Anchoring */}
          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
            You provide business requirements — our engineering team designs, develops, and manages your web infrastructure. Zero upfront setup charges, zero hosting bills, and 99.99% uptime on global edge networks.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
            <Link
              href="/onboarding"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-300 hover:to-blue-500 text-slate-950 font-bold text-base shadow-xl shadow-sky-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
            >
              Get Started for ₹299/mo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="#templates"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-base border border-slate-700/60 backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              Explore Live Showcase
            </Link>
          </div>

          {/* Trust Guarantees Grid (Psychological Risk Reversal) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-slate-800/80 text-left">
            <div className="glass-panel p-5 rounded-2xl border-slate-800/80 bg-slate-900/50">
              <div className="text-2xl font-black text-white flex items-center gap-1.5">
                ₹0 <span className="text-xs text-slate-400 font-normal">CapEx</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Zero ₹25k agency fees</p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border-slate-800/80 bg-slate-900/50">
              <div className="text-2xl font-black text-sky-400 flex items-center gap-1.5">
                100% <span className="text-xs text-slate-400 font-normal">Managed</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Free edge hosting & SSL</p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border-slate-800/80 bg-slate-900/50">
              <div className="text-2xl font-black text-emerald-400 flex items-center gap-1.5">
                AutoPay <span className="text-xs text-slate-400 font-normal">Ready</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Official UPI / Bank eMandate</p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border-slate-800/80 bg-slate-900/50">
              <div className="text-2xl font-black text-indigo-300 flex items-center gap-1.5">
                Air-Gapped <span className="text-xs text-slate-400 font-normal">Safety</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Zero cross-site intrusion risk</p>
            </div>
          </div>

        </div>
      </section>

      {/* Feature Highlights: Why Pixzora @ ₹299 */}
      <section id="features" className="py-24 bg-[#080d17] border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-400">Institutional Infrastructure</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4">
              Everything Your Business Needs to Dominate Online
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Built for businesses, manufacturers, clinics, and professional sellers who demand reliability, speed, and zero maintenance friction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel rounded-2xl p-8 border-slate-800/80 hover:border-sky-500/40 transition-all bg-slate-900/40">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-6 border border-sky-500/20">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Edge CDN & Managed Domain</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Deploy instantly with a complimentary fast edge subdomain (e.g. <code>yourbrand.pages.dev</code>) and auto-provisioned SSL. Connect your custom <code>.com</code> or <code>.in</code> domain seamlessly at any time.
              </p>
            </div>

            <div className="glass-panel rounded-2xl p-8 border-slate-800/80 hover:border-emerald-500/40 transition-all bg-slate-900/40">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6 border border-emerald-500/20">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Automated UPI eMandate</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                No manual reminders or transfer hassles. Enjoy transparent, automated monthly subscriptions via NPCI-approved UPI AutoPay (PhonePe, GPay, Paytm) with 1-click self-serve cancellation.
              </p>
            </div>

            <div className="glass-panel rounded-2xl p-8 border-slate-800/80 hover:border-indigo-500/40 transition-all bg-slate-900/40">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-6 border border-indigo-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Air-Gapped Tenant Sandbox</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Unlike legacy shared cPanel hosting where one infected site jeopardizes neighbors, Pixzora isolates each business in a stateless edge sandbox with Row-Level Security.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Templates */}
      <TemplateShowcase />

      {/* Security Deep Dive */}
      <SecuritySection />

      {/* Pricing & FAQ */}
      <PricingSection />

      {/* Footer */}
      <footer className="py-14 border-t border-slate-800/80 bg-[#05070c] text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-slate-950 font-black text-xs shadow-sm">
              P
            </div>
            <div>
              <span className="font-bold text-white text-sm">Pixzora</span>
              <span className="text-slate-500 ml-2">• Fully Managed Production Web Platform</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-slate-400 font-medium">
            <Link href="#features" className="hover:text-sky-400 transition-colors">Features</Link>
            <Link href="#templates" className="hover:text-sky-400 transition-colors">Showcase</Link>
            <Link href="#security" className="hover:text-sky-400 transition-colors">Security</Link>
            <Link href="#pricing" className="hover:text-sky-400 transition-colors">Pricing</Link>
          </div>

          <p className="text-slate-500">© {new Date().getFullYear()} Pixzora Technologies. Engineered for Reliability.</p>
        </div>
      </footer>
    </div>
  );
}
