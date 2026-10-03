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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-sky-600/5 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/80 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-slate-700/60 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" /> Proven Bespoke Web Engineering
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Custom Architecture. <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-300 to-indigo-300">Live Client Proof.</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            From heavy industrial manufacturers to high-converting direct-to-consumer stores. We architect and maintain production systems starting at ₹299/mo flat.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'All Industries' },
              { id: 'industrial', label: 'Industrial & B2B' },
              { id: 'ecommerce', label: 'E-Commerce & Store' },
              { id: 'service', label: 'Services & Clinics' },
              { id: 'portfolio', label: 'Creators & Portfolios' },
              { id: 'restaurant', label: 'Cafes & Dining' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/25'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
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
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 relative flex flex-col justify-between glass-panel border-slate-800/80 bg-slate-900/40 ${
                  isSelected
                    ? 'border-sky-500/80 shadow-xl shadow-sky-500/10 ring-1 ring-sky-500/40 bg-slate-900/90 scale-[1.02]'
                    : 'glass-panel-hover'
                }`}
              >
                {/* Badge */}
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-slate-800/80 text-sky-300 border border-slate-700/60">
                    {template.badge}
                  </span>
                  <div className="text-slate-400">
                    {template.category === 'industrial' && <Factory className="w-4 h-4 text-orange-400" />}
                    {template.category === 'ecommerce' && <ShoppingBag className="w-4 h-4 text-emerald-400" />}
                    {template.category === 'service' && <Briefcase className="w-4 h-4 text-sky-400" />}
                    {template.category === 'portfolio' && <Camera className="w-4 h-4 text-indigo-400" />}
                    {template.category === 'restaurant' && <Utensils className="w-4 h-4 text-amber-400" />}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{template.name}</h3>
                  <p className="text-xs text-sky-400 font-medium mb-3">{template.tagline}</p>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{template.description}</p>

                  <div className="space-y-2 mb-6">
                    {template.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Footer */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <Link
                    href={`/preview/${template.id}`}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Live Demo
                    <ExternalLink className="w-3 h-3" />
                  </Link>

                  <Link
                    href={`/onboarding?template=${template.id}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sky-500/15 text-sky-300 hover:bg-sky-500 hover:text-slate-950 text-xs font-semibold transition-all"
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
        <div className="mt-14 glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800/90 bg-slate-900/60 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
            <div>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <h4 className="text-lg font-bold text-white">
                  Live View: <span className="text-sky-400">{activePreview.name}</span>
                </h4>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Connected Sandbox: <code className="text-slate-300 bg-black/40 px-2 py-0.5 rounded border border-slate-800">https://demo-{activePreview.id}.pixzora.pages.dev</code>
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Link
                href={`/preview/${activePreview.id}`}
                target="_blank"
                className="px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700/60 flex items-center gap-2 transition-all"
              >
                Open Fullscreen
                <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
              </Link>
              <Link
                href={`/onboarding?template=${activePreview.id}`}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-300 hover:to-blue-500 text-slate-950 text-xs font-bold shadow-md shadow-sky-500/20 transition-all flex items-center gap-2"
              >
                Deploy Similar @ ₹299/mo
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
