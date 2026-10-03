'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Factory, 
  Flame, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Wrench, 
  Layers, 
  Clock, 
  Award,
  Send,
  ExternalLink
} from 'lucide-react';

export default function DomaFabricatorsPreview() {
  const [rfqSubmitted, setRfqSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    service: 'Piping Works (SS & MS)',
    tonnage: '',
    details: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRfqSubmitted(true);
    // Build direct WhatsApp message
    const msg = `*RFQ Enquiry for DOMA Fabricators*%0A%0A*Name:* ${encodeURIComponent(formData.name)}%0A*Company:* ${encodeURIComponent(formData.company)}%0A*Phone:* ${encodeURIComponent(formData.phone)}%0A*Service:* ${encodeURIComponent(formData.service)}%0A*Estimated Tonnage/Scope:* ${encodeURIComponent(formData.tonnage)}%0A*Details:* ${encodeURIComponent(formData.details)}`;
    window.open(`https://wa.me/919098789399?text=${msg}`, '_blank');
    setTimeout(() => setRfqSubmitted(false), 4000);
  };

  const services = [
    {
      icon: Layers,
      title: 'Piping Works (SS & MS)',
      desc: 'High-pressure process piping, utility networks, steam, chemical transfer, and dairy/pharma lines with 100% NDT/radiography compliance.',
      tags: ['IBR Compliant', 'TIG / ARC', 'SS 304/316', 'CS ASTM A106']
    },
    {
      icon: Factory,
      title: 'Heavy Structural Fabrication',
      desc: 'Precision industrial PEB sheds, EOT crane gantries, conveyor galleries, pipe racks, and multi-tier equipment staging towers.',
      tags: ['Up to 500 MT', 'IS 2062 Gr. B', 'CNC Profiling', 'Blasting & Epoxy']
    },
    {
      icon: Flame,
      title: 'Tanks, Silos & Pressure Vessels',
      desc: 'API 650 storage tanks, vertical/horizontal grain silos, jacketed mixing vessels, and high-temp stacks/chimneys.',
      tags: ['API 650 / ASME', 'Hydro-Tested', 'Bulk Storage', 'Corrosion Shield']
    },
    {
      icon: Wrench,
      title: 'Plant Equipment Erection',
      desc: 'End-to-end mechanical erection, laser alignment, grouting, and turnkey commissioning of heavy mills, heat exchangers & pumps.',
      tags: ['Precision Alignment', 'Heavy Rigging', 'Safe Shutdowns', 'Turnkey']
    }
  ];

  const clientSegments = [
    'Automotive & Ancillary Plants',
    'Pharma & Chemical Process Units',
    'Steel Mills & Foundry Works',
    'Cement, Power & Agro Processing',
    'Food & Beverage Breweries'
  ];

  return (
    <div className="min-h-screen bg-[#0a0d14] text-gray-100 font-sans selection:bg-[#ff3b19] selection:text-white">
      {/* Subdomain Notice Bar */}
      <div className="bg-[#1c0f08] border-b border-orange-500/20 px-4 py-2 text-center text-xs flex flex-wrap items-center justify-between text-orange-300 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span>Client Site: <strong>domafabricators.pages.dev</strong></span>
          <span className="hidden sm:inline text-gray-500">|</span>
          <span className="hidden sm:inline text-gray-400">Custom Engineering Showcase</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-gray-400">Custom Built via Pixzora @ ₹299/mo</span>
          <Link 
            href="/onboarding?template=doma-fabricators" 
            className="bg-[#ff3b19] hover:bg-orange-600 text-white px-3 py-1 rounded font-bold text-[11px] transition-colors"
          >
            Launch Similar B2B Site
          </Link>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0d121c]/95 backdrop-blur-md border-b border-white/5 px-4 sm:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff3b19] to-orange-700 flex items-center justify-center text-white shadow-lg shadow-orange-900/30">
            <Factory className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl text-white tracking-wider uppercase">DOMA</span>
              <span className="text-xs font-semibold text-orange-400 tracking-widest uppercase">Fabricators</span>
            </div>
            <p className="text-[10px] text-gray-400 font-medium">Pithampur Industrial Area, MP • Est. 1999</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-xs text-gray-300 font-medium">
          <div className="flex items-center gap-1.5 text-gray-300">
            <Award className="w-4 h-4 text-orange-400" />
            <span>ISO 45001 & 9001 Standards</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Zero-Accident Safety Record</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="tel:+919098789399"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-semibold transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-orange-400" />
            <span className="hidden sm:inline">+91 90987 89399</span>
            <span className="sm:hidden">Call</span>
          </a>
          <a
            href="#rfq-section"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#ff3b19] hover:bg-orange-600 text-white text-xs font-bold shadow-lg shadow-orange-900/40 transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Request RFQ</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-8 pt-16 pb-20 max-w-7xl mx-auto overflow-hidden">
        {/* Flame Background Glow */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-orange-600/10 blur-[140px] rounded-full pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-bold uppercase tracking-wider mb-5 border border-orange-500/20">
              <Flame className="w-3.5 h-3.5 text-[#ff3b19]" />
              Heavy Industrial Fabrication & Mechanical Erection
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight tracking-tight mb-6">
              Engineering Par Excellence for <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-[#ff3b19] to-amber-400">Mega Industrial Plants</span>.
            </h1>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
              Equipped with 25+ years of shopfloor expertise in Pithampur. We deliver certified structural steel fabrication, high-pressure piping networks, storage tank farms, and turn-key mechanical erection for heavy process industries.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10 mb-8">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">25+</div>
                <div className="text-[11px] text-gray-400 uppercase font-semibold">Years Active</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-orange-400">500+</div>
                <div className="text-[11px] text-gray-400 uppercase font-semibold">Projects Executed</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">100+</div>
                <div className="text-[11px] text-gray-400 uppercase font-semibold">Industrial Plants</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">100%</div>
                <div className="text-[11px] text-gray-400 uppercase font-semibold">NDT / Hydro Rate</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#rfq-section"
                className="px-6 py-3.5 rounded-xl bg-[#ff3b19] hover:bg-orange-600 text-white font-bold text-sm shadow-xl shadow-orange-900/50 flex items-center gap-2 transition-all"
              >
                <span>Submit Tender / RFQ</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919098789399?text=Hello%20DOMA%20Fabricators,%20we%20have%20an%20industrial%20fabrication%20requirement."
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-sm flex items-center gap-2 transition-all"
              >
                <span>WhatsApp Technical Team</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick RFQ Lead Card */}
          <div id="rfq-section" className="lg:col-span-5">
            <div className="rounded-3xl p-6 sm:p-8 bg-slate-900/90 border border-orange-500/30 shadow-2xl relative">
              <div className="absolute top-0 right-8 -translate-y-1/2 px-3 py-1 bg-gradient-to-r from-orange-500 to-[#ff3b19] rounded-full text-[10px] font-black tracking-widest uppercase text-white shadow-md">
                Fast Quotation Engine
              </div>

              <h2 className="text-xl font-bold text-white mb-1">Request Tender / Quotation</h2>
              <p className="text-xs text-gray-400 mb-6">Receive preliminary engineering estimates within 24 hours.</p>

              {rfqSubmitted ? (
                <div className="py-12 text-center">
                  <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Inquiry Forwarded!</h4>
                  <p className="text-xs text-gray-300 max-w-xs mx-auto">
                    Opening WhatsApp to connect you directly with DOMA Fabricators' engineering team at Pithampur.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider block mb-1">Contact Person</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rajesh Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider block mb-1">Company / Plant</label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Mahle / Eicher"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider block mb-1">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98XXX XXXXX"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider block mb-1">Primary Scope</label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-orange-500 transition-colors"
                      >
                        <option value="Piping Works (SS & MS)">Piping Works (SS & MS)</option>
                        <option value="Heavy Structural Fabrication">Heavy Structural Fabrication</option>
                        <option value="Tanks & Silos">Tanks, Silos & Reactors</option>
                        <option value="Equipment Erection">Equipment Erection & Rigging</option>
                        <option value="Annual Plant Maintenance">Annual Plant Maintenance</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider block mb-1">Estimated Tonnage / Pipe Dia / Schedule</label>
                    <input
                      type="text"
                      value={formData.tonnage}
                      onChange={(e) => setFormData({ ...formData, tonnage: e.target.value })}
                      placeholder="e.g. 80 MT Structural steel, 4-inch SS316 piping, 60 days"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider block mb-1">Brief Specification / Drawing Notes</label>
                    <textarea
                      rows={3}
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      placeholder="Mention drawing availability, location (e.g. Pithampur Sector 1/2/3, Dewas, Sanwer Road) and testing specs..."
                      className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-[#ff3b19] hover:from-orange-600 hover:to-orange-700 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-900/40 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Tender Inquiry</span>
                  </button>

                  <p className="text-[10px] text-center text-gray-400">
                    Direct engineering response from DOMA Fabricators Pithampur Works.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section className="px-4 sm:px-8 py-20 bg-slate-950/80 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400">Core Capabilities</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-2 mb-4">Precision Engineering Offerings</h2>
            <p className="text-gray-400 text-sm">
              From heavy fabrication shops in Sector 1 Pithampur to on-site mechanical installation teams with full safety PPE protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div 
                  key={idx} 
                  className="rounded-2xl p-6 sm:p-8 bg-white/[0.02] border border-white/10 hover:border-orange-500/40 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center mb-6 group-hover:bg-[#ff3b19] group-hover:text-white transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{srv.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">{srv.desc}</p>
                  
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                    {srv.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-2.5 py-1 rounded-md bg-white/5 text-[11px] font-medium text-gray-300 border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="px-4 sm:px-8 py-16 bg-[#0a0d14] border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400">Client Sectors</span>
            <h3 className="text-2xl font-black text-white mt-1">Proven in India's Toughest Industrial Hubs</h3>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {clientSegments.map((sector, i) => (
              <span key={i} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-200">
                • {sector}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop Location & Direct Contact Footer */}
      <footer className="bg-black/90 border-t border-white/10 px-4 sm:px-8 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-black text-lg text-white tracking-wider uppercase">DOMA FABRICATORS</span>
            </div>
            <p className="text-xs text-gray-400 max-w-sm leading-relaxed mb-4">
              Leader in structural steel fabrication, high-pressure piping, and turn-key equipment erection across Central India.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified under ISO 9001:2015 & ISO 45001:2018</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Works & Head Office</h4>
            <div className="space-y-2 text-xs text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>Sector 1, Industrial Area, Pithampur, District Dhar, Madhya Pradesh - 454775</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500 shrink-0" />
                <span>Mon - Sat: 8:30 AM – 7:30 PM</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Tenders & Engineering</h4>
            <div className="space-y-2 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <a href="tel:+919098789399" className="hover:text-white transition-colors">+91 90987 89399</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <a href="mailto:domafabricators@gmail.com" className="hover:text-white transition-colors">domafabricators@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>© {new Date().getFullYear()} DOMA Fabricators. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <span>Showcase simulated by</span>
            <Link href="/" className="text-cyan-400 font-semibold hover:underline">Pixzora</Link>
            <span>— Custom B2B Websites @ ₹299/mo</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
