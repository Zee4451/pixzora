'use client';

import { useState } from 'react';
import Link from 'next/link';
import { POPULAR_TEMPLATES, WebsiteTemplate } from '@/lib/data';
import { 
  Sparkles, 
  ExternalLink, 
  CheckCircle2, 
  ShoppingBag, 
  Briefcase, 
  Camera, 
  Utensils, 
  Factory,
  ArrowRight,
  Eye
} from 'lucide-react';

export default function TemplateShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePreview, setActivePreview] = useState<WebsiteTemplate>(POPULAR_TEMPLATES[0]);

  const filteredTemplates = selectedCategory === 'all' 
    ? POPULAR_TEMPLATES 
    : POPULAR_TEMPLATES.filter(t => t.category === selectedCategory);

  return (
    <section id="templates" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-cyan-500/20">
            <Sparkles className="w-3.5 h-3.5" /> 100% Done-For-You Custom Websites
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            You Share Requirements. <span className="gradient-text">We Build It Custom.</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            No cookie-cutter templates. We design, code, and deploy a completely bespoke website tailored to your business, with free hosting & lifetime maintenance at ₹299/mo.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'All Designs' },
              { id: 'industrial', label: 'Industrial & B2B' },
              { id: 'ecommerce', label: 'E-Commerce & Store' },
              { id: 'service', label: 'Services & Clinics' },
              { id: 'portfolio', label: 'Creators & Portfolios' },
              { id: 'restaurant', label: 'Cafes & Dining' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-500 text-black font-semibold shadow-lg shadow-cyan-500/30'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => {
            const isSelected = activePreview.id === template.id;
            return (
              <div
                key={template.id}
                onClick={() => setActivePreview(template)}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 relative flex flex-col justify-between glass-panel ${
                  isSelected
                    ? 'border-cyan-400 shadow-xl shadow-cyan-500/10 bg-slate-900/90 ring-1 ring-cyan-500/50 scale-[1.02]'
                    : 'glass-panel-hover'
                }`}
              >
                {/* Badge */}
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    {template.badge}
                  </span>
                  <div className="text-gray-400">
                    {template.category === 'industrial' && <Factory className="w-4 h-4 text-amber-500" />}
                    {template.category === 'ecommerce' && <ShoppingBag className="w-4 h-4 text-emerald-400" />}
                    {template.category === 'service' && <Briefcase className="w-4 h-4 text-blue-400" />}
                    {template.category === 'portfolio' && <Camera className="w-4 h-4 text-purple-400" />}
                    {template.category === 'restaurant' && <Utensils className="w-4 h-4 text-amber-400" />}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{template.name}</h3>
                  <p className="text-xs text-gray-300 font-medium mb-3">{template.tagline}</p>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">{template.description}</p>

                  <div className="space-y-2 mb-6">
                    {template.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Footer */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <Link
                    href={`/preview/${template.id}`}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Live Demo
                    <ExternalLink className="w-3 h-3" />
                  </Link>

                  <Link
                    href={`/onboarding?template=${template.id}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-black text-xs font-semibold transition-all"
                  >
                    Select
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Interactive Preview Box */}
        <div className="mt-14 glass-panel rounded-3xl p-6 sm:p-8 border border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <h4 className="text-lg font-bold text-white">
                  Previewing: <span className="text-cyan-400">{activePreview.name}</span>
                </h4>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Subdomain: <code className="text-indigo-300 bg-white/5 px-2 py-0.5 rounded">mybrand.pixzora.pages.dev</code> (Free SSL + Edge Hosting included)
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Link
                href={`/preview/${activePreview.id}`}
                target="_blank"
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-medium border border-white/10 flex items-center gap-2 transition-all"
              >
                Open Fullscreen
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <Link
                href={`/onboarding?template=${activePreview.id}`}
                className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2"
              >
                Get this for ₹299/mo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Simulated Browser Frame */}
          <div className="mt-6 rounded-2xl overflow-hidden border border-white/10 bg-[#060911] shadow-2xl">
            {/* Browser top bar */}
            <div className="h-10 bg-[#0d1322] border-b border-white/10 px-4 flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="mx-auto w-full max-w-sm h-6 bg-black/40 rounded-md border border-white/5 flex items-center justify-center text-[11px] text-gray-400 font-mono">
                🔒 https://demo-{activePreview.id}.pixzora.pages.dev
              </div>
            </div>

            {/* Embedded Iframe / Live Preview */}
            <div className="relative h-[680px] sm:h-[780px] w-full bg-slate-950">
              <iframe
                src={`/preview/${activePreview.id}`}
                title={activePreview.name}
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
