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
    <div className="min-h-screen bg-[#090d16] text-white selection:bg-cyan-500 selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-28 overflow-hidden">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-cyan-600/20 via-indigo-600/20 to-purple-600/20 blur-[140px] pointer-events-none -z-10 rounded-full" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500/10 blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm font-medium text-gray-300 mb-8 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-cyan-400 font-semibold">Pixzora</span>
            <span className="text-gray-500">|</span>
            <span>100% Done-For-You Custom Website at just ₹299/month</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-5xl mx-auto leading-[1.1] mb-6">
            Hum Banayenge Aapki Custom Website Sirf{' '}
            <span className="gradient-text underline decoration-cyan-500/30 decoration-wavy">
              ₹299 / Month
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
            Aap sirf requirements bataiye, hum complete custom website banakar live denge. <strong className="text-white font-semibold">Zero Hosting Cost</strong>, Free <code>pages.dev</code> Subdomain, aur zero domain charges.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
            <Link
              href="/onboarding"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-500 text-black font-extrabold text-base shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
            >
              Launch Website @ ₹299/mo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="#templates"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-base border border-white/10 backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              Explore Templates
            </Link>
          </div>

          {/* Quick Stats / Trust Signals */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-white/10 text-left">
            <div className="glass-panel p-4 rounded-2xl">
              <div className="text-2xl font-black text-cyan-400 flex items-center gap-1">
                ₹0 <span className="text-xs text-gray-400 font-normal">Setup Fee</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">No ₹25,000 agency costs</p>
            </div>

            <div className="glass-panel p-4 rounded-2xl">
              <div className="text-2xl font-black text-emerald-400 flex items-center gap-1">
                Free <span className="text-xs text-gray-400 font-normal">Hosting</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Cloudflare Edge unlimited</p>
            </div>

            <div className="glass-panel p-4 rounded-2xl">
              <div className="text-2xl font-black text-purple-400 flex items-center gap-1">
                100% <span className="text-xs text-gray-400 font-normal">AutoPay</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Automated bank deduction</p>
            </div>

            <div className="glass-panel p-4 rounded-2xl">
              <div className="text-2xl font-black text-amber-400 flex items-center gap-1">
                0 <span className="text-xs text-gray-400 font-normal">Cross-Site Risk</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Air-gapped tenant sandbox</p>
            </div>
          </div>

        </div>
      </section>

      {/* Feature Highlights: Why PixoraPlan @ ₹299 */}
      <section id="features" className="py-20 bg-[#070b13] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Everything Your Business Needs to Thrive Online
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Designed specifically for merchants, clinics, freelancers, and businesses who want an elite online store or portfolio without spending thousands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel rounded-2xl p-8 border border-white/5 relative group hover:border-cyan-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-6">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Free Domain & Edge Hosting</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Receive an instant free subdomain (e.g. <code>yourname.pixoraplan.com</code>) with free SSL and edge CDN speed. Easily link your custom <code>.com</code> or <code>.in</code> whenever you choose.
              </p>
            </div>

            <div className="glass-panel rounded-2xl p-8 border border-white/5 relative group hover:border-purple-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Seamless UPI AutoPay</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                No need to scan manual QR codes or transfer money every month. Automated eMandate deducts ₹299 automatically from your bank on the 30th day. Cancel anytime in 1-click.
              </p>
            </div>

            <div className="glass-panel rounded-2xl p-8 border border-white/5 relative group hover:border-emerald-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Hacker-Proof Isolation</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Even if 1 website on the internet gets attacked, your website, customer database, and orders remain 100% impenetrable thanks to our stateless Jamstack container architecture.
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
      <footer className="py-12 border-t border-white/10 bg-[#060911] text-xs text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg gradient-accent flex items-center justify-center text-white font-bold text-xs">
              P
            </div>
            <span className="font-bold text-white text-sm">PixoraPlan</span>
            <span>— The ₹299/mo Website-as-a-Service Platform</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="#templates" className="hover:text-cyan-400 transition-colors">Templates</Link>
            <Link href="#security" className="hover:text-cyan-400 transition-colors">Security</Link>
            <Link href="#pricing" className="hover:text-cyan-400 transition-colors">Pricing</Link>
            <Link href="/admin" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">Admin Portal</Link>
          </div>

          <p>© {new Date().getFullYear()} PixoraPlan Technologies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
