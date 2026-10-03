'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ExternalLink, 
  Maximize2, 
  RefreshCw, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  Monitor,
  Smartphone
} from 'lucide-react';

export default function DomaFabricatorsPreview() {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  const [iframeKey, setIframeKey] = useState(0);

  return (
    <div className="min-h-screen bg-[#070a10] text-gray-100 flex flex-col font-sans selection:bg-[#FF1901] selection:text-white">
      {/* Top Pixzora Showcase Bar */}
      <header className="bg-[#111622] border-b border-white/10 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs z-50 sticky top-0">
        <div className="flex items-center gap-3">
          <Link href="/#templates" className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors font-medium">
            ← Back to Pixzora
          </Link>
          <span className="text-gray-600">|</span>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-gray-300 font-semibold">Live Client Showcase:</span>
            <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 font-mono text-[11px]">
              https://doma-fabricators.netlify.app/
            </span>
          </div>
        </div>

        {/* Viewport switchers & Actions */}
        <div className="flex items-center gap-3">
          {/* Device toggle */}
          <div className="hidden sm:flex items-center rounded-lg bg-black/40 border border-white/10 p-0.5">
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                deviceMode === 'desktop' 
                  ? 'bg-orange-500 text-white shadow-sm' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              Desktop
            </button>
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                deviceMode === 'mobile' 
                  ? 'bg-orange-500 text-white shadow-sm' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              Mobile
            </button>
          </div>

          <button
            onClick={() => setIframeKey(k => k + 1)}
            title="Reload Demo"
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          <a
            href="https://doma-fabricators.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 text-xs font-medium transition-all"
          >
            <span>Open Original Site</span>
            <ExternalLink className="w-3 h-3 text-orange-400" />
          </a>

          <Link
            href="/onboarding?template=doma-fabricators"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-[#FF1901] hover:from-orange-600 hover:to-red-700 text-white font-bold text-xs shadow-md shadow-orange-900/30 transition-all"
          >
            <span>Get Similar Site @ ₹299/mo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Floating Badge Explaining Authenticity */}
      <div className="bg-gradient-to-r from-orange-950/40 via-black to-slate-900 border-b border-orange-500/20 px-4 py-1.5 text-center text-[11px] text-orange-300 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-orange-400" />
        <span>Real Industrial Client Project: <strong>DOMA Fabricators (Pithampur, MP)</strong> — 100% Custom Engineered by Pixzora</span>
      </div>

      {/* Embedded Live Netlify Website */}
      <div className="flex-1 flex items-center justify-center p-2 sm:p-4 bg-[#05070c]">
        <div 
          className={`w-full h-[88vh] min-h-[700px] rounded-2xl overflow-hidden border border-white/15 bg-black shadow-2xl transition-all duration-300 ${
            deviceMode === 'mobile' ? 'max-w-[420px] max-h-[850px] border-orange-500/30 shadow-orange-900/20' : 'max-w-[100%]'
          }`}
        >
          {/* Simulated Browser Address Pill */}
          <div className="h-9 bg-[#0e131f] border-b border-white/10 px-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
            </div>
            
            <div className="px-4 py-0.5 rounded-full bg-black/50 border border-white/10 text-[11px] text-gray-300 font-mono flex items-center gap-2">
              <span className="text-emerald-400 text-xs">🔒</span>
              <span>https://doma-fabricators.netlify.app/</span>
            </div>

            <a
              href="https://doma-fabricators.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Actual Live Website Iframe */}
          <iframe
            key={iframeKey}
            src="https://doma-fabricators.netlify.app/"
            title="DOMA Fabricators - Industrial Steel Fabrication & Erection"
            className="w-full h-[calc(100%-36px)] border-0 bg-white"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
          />
        </div>
      </div>
    </div>
  );
}
