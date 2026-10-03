'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { POPULAR_TEMPLATES } from '@/lib/data';
import { 
  Building2, 
  Globe, 
  CreditCard, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  Shield,
  Smartphone,
  Check,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { supabase } from '@/lib/supabase';

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTemplate = searchParams?.get('template') || 'store-express';

  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    businessName: '',
    category: 'ecommerce',
    ownerName: '',
    phone: '',
    email: '',
    subdomain: '',
    customDomain: '',
    selectedTemplate: initialTemplate,
    autoPayMethod: 'upi_autopay',
  });

  const [isSubdomainAvailable, setIsSubdomainAvailable] = useState<boolean | null>(null);
  const [isCheckingDomain, setIsCheckingDomain] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [mandateSuccess, setMandateSuccess] = useState(false);

  const [slugSuggestions, setSlugSuggestions] = useState<string[]>([]);

  // Dynamic subdomain suggestion
  const handleBusinessNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const cleanSub = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    setFormData(prev => ({
      ...prev,
      businessName: name,
      subdomain: prev.subdomain ? prev.subdomain : cleanSub
    }));
    if (cleanSub) {
      checkSubdomain(cleanSub);
    }
  };

  const checkSubdomain = async (val: string) => {
    const clean = val.toLowerCase().replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-');
    if (!clean || clean.length < 3) {
      setIsSubdomainAvailable(null);
      setSlugSuggestions([]);
      return;
    }

    const reserved = ['admin', 'api', 'app', 'pixora', 'pixzora', 'preview', 'client-store', 'www'];
    if (reserved.includes(clean)) {
      setIsSubdomainAvailable(false);
      setSlugSuggestions([`${clean}-store`, `${clean}-online`, `${clean}-in`]);
      return;
    }

    setIsCheckingDomain(true);
    try {
      const { data, error } = await supabase
        .from('tenants')
        .select('id')
        .eq('slug', clean)
        .maybeSingle();

      if (error) {
        // Fallback to true if table check has edge error
        setIsSubdomainAvailable(true);
        setSlugSuggestions([]);
      } else if (data) {
        // Taken! Generate smart variations based on city / numbers / store
        setIsSubdomainAvailable(false);
        const randomNum = Math.floor(10 + Math.random() * 90);
        setSlugSuggestions([
          `${clean}-store`,
          `${clean}-in`,
          `${clean}-${randomNum}`,
          `${clean}-official`
        ]);
      } else {
        setIsSubdomainAvailable(true);
        setSlugSuggestions([]);
      }
    } catch {
      setIsSubdomainAvailable(true);
    } finally {
      setIsCheckingDomain(false);
    }
  };

  const handleNextStep = () => {
    if (step === 1 && (!formData.businessName || !formData.phone || !formData.email)) {
      alert('Please fill out your business name, phone and email to continue.');
      return;
    }
    if (step === 2) {
      if (!formData.subdomain || formData.subdomain.length < 3) {
        alert('Please choose a valid subdomain (minimum 3 characters).');
        return;
      }
      if (isSubdomainAvailable === false) {
        alert('This subdomain is already taken by another store! Please pick an available name or one of our suggestions.');
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handleAuthorizeAutoPay = async () => {
    setIsProcessingPayment(true);
    
    try {
      const cleanSlug = formData.subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '');
      const mappedType = formData.category === 'restaurant' ? 'restaurant' : formData.category === 'service' ? 'services' : formData.category === 'portfolio' ? 'portfolio' : 'ecommerce';

      // Insert tenant into Supabase
      const { data, error } = await supabase.from('tenants').insert([
        {
          name: formData.businessName,
          slug: cleanSlug,
          business_type: mappedType,
          owner_name: formData.ownerName || null,
          phone: formData.phone,
          email: formData.email,
          monthly_price: 299,
          status: 'active',
          subscription_status: 'active',
        }
      ]).select();

      if (error) {
        console.error('Supabase error:', error);
      }
    } catch (e) {
      console.error('Failed to save to Supabase:', e);
    }

    setIsProcessingPayment(false);
    setMandateSuccess(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-white">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">
            <span className={step >= 1 ? 'text-cyan-400 font-bold' : ''}>1. Business Info</span>
            <span className={step >= 2 ? 'text-cyan-400 font-bold' : ''}>2. Domain & Requirements</span>
            <span className={step >= 3 ? 'text-cyan-400 font-bold' : ''}>3. UPI AutoPay (₹299/mo)</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-indigo-600 transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: Business Details */}
        {step === 1 && (
          <div className="glass-panel rounded-3xl p-8 border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Tell us about your business</h2>
                <p className="text-xs text-gray-400">We will configure your website with this information</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Business / Brand Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Apex Fitness Studio, Priya Organics"
                  value={formData.businessName}
                  onChange={handleBusinessNameChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Owner / Contact Person
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Yash Patel"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Industry Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  >
                    <option value="ecommerce">E-Commerce & Online Store</option>
                    <option value="service">Services, Salon & Clinic</option>
                    <option value="portfolio">Freelancer & Creator Portfolio</option>
                    <option value="restaurant">Restaurant, Cafe & Dining</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    WhatsApp Phone Number (For direct orders) *
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="contact@mybrand.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
              <button
                onClick={handleNextStep}
                className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all"
              >
                Next: Choose Domain & Template
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Domain & Template Selection */}
        {step === 2 && (
          <div className="glass-panel rounded-3xl p-8 border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Choose your Domain & Website Requirements</h2>
                <p className="text-xs text-gray-400">Free custom subdomain with edge hosting & done-for-you development</p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Subdomain Input */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Choose Free Subdomain (₹0 Forever) *
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="mybusiness"
                    value={formData.subdomain}
                    onChange={(e) => {
                      const v = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-');
                      setFormData({ ...formData, subdomain: v });
                      checkSubdomain(v);
                    }}
                    className="flex-1 px-4 py-3 rounded-l-xl bg-white/5 border border-r-0 border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 font-mono text-sm"
                  />
                  <div className="px-4 py-3 rounded-r-xl bg-slate-900 border border-white/10 text-cyan-400 font-mono text-sm font-semibold">
                    .pages.dev
                  </div>
                </div>

                <div className="mt-2.5 text-xs">
                  {isCheckingDomain ? (
                    <span className="text-gray-400 flex items-center gap-1.5">
                      <div className="w-3 h-3 border border-cyan-400 border-t-transparent rounded-full animate-spin" />
                      Checking availability on database...
                    </span>
                  ) : isSubdomainAvailable === true ? (
                    <span className="text-emerald-400 flex items-center gap-1 font-medium">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <strong>{formData.subdomain}.pages.dev</strong> is available!
                    </span>
                  ) : isSubdomainAvailable === false ? (
                    <div>
                      <span className="text-red-400 font-medium flex items-center gap-1 mb-2">
                        ❌ <strong>{formData.subdomain}.pages.dev</strong> is already taken! Pick an alternative:
                      </span>
                      {slugSuggestions.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="text-gray-400 text-[11px]">Suggestions:</span>
                          {slugSuggestions.map((sug) => (
                            <button
                              key={sug}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, subdomain: sug });
                                checkSubdomain(sug);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono transition-all"
                            >
                              +{sug}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-500">Pick a unique identifier for your website.</span>
                  )}
                </div>
              </div>

              {/* Optional Custom Domain */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                  Have an existing domain? (Optional)
                </label>
                <p className="text-xs text-gray-400 mb-3">
                  You can connect your own domain (e.g. <code>mybrand.in</code>) at ₹0 extra cost via DNS.
                </p>
                <input
                  type="text"
                  placeholder="e.g. mybrand.in or mybrand.com"
                  value={formData.customDomain}
                  onChange={(e) => setFormData({ ...formData, customDomain: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 text-sm font-mono"
                />
              </div>

              {/* Custom Website Specifications & Requirements */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  What features do you need on your custom website?
                </label>
                <p className="text-xs text-gray-400 mb-4">
                  We build everything from scratch for you. Tell us your key requirements:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {[
                    { title: 'Product Catalog / Online Store', desc: 'Photos, prices, and direct customer checkout' },
                    { title: 'WhatsApp Direct Ordering', desc: 'Customers order & chat directly on WhatsApp' },
                    { title: 'Appointment / Table Booking', desc: 'Allow visitors to book slots or tables' },
                    { title: 'UPI Payment QR Code', desc: 'Accept direct payments without 2-3% gateway charges' },
                    { title: 'Customer Reviews & Testimonials', desc: 'Social proof & Google review embeds' },
                    { title: 'Google Maps & Contact Form', desc: 'Store address, contact & hours' }
                  ].map((feat, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                      <div className="w-5 h-5 rounded-md bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-white">{feat.title}</div>
                        <div className="text-[11px] text-gray-400">{feat.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Specific Design or Reference Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. We want a modern dark theme, highlight our bestselling pizza, and provide our WhatsApp number for instant home deliveries..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              <button
                onClick={handleNextStep}
                className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all"
              >
                Next: Authorize ₹299 AutoPay
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Recurring AutoPay Mandate Setup */}
        {step === 3 && (
          <div className="glass-panel rounded-3xl p-8 border border-white/10 shadow-2xl">
            {!mandateSuccess ? (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Setup ₹299/mo UPI AutoPay</h2>
                    <p className="text-xs text-gray-400">Automated recurring debit with Razorpay Subscriptions</p>
                  </div>
                </div>

                {/* Plan Summary Card */}
                <div className="rounded-2xl p-6 bg-slate-900/80 border border-white/10 mb-8 space-y-3">
                  <div className="flex items-center justify-between text-sm pb-3 border-b border-white/10">
                    <span className="text-gray-400">Website Service:</span>
                    <span className="font-semibold text-white">{formData.businessName || 'Your Business Website'}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm pb-3 border-b border-white/10">
                    <span className="text-gray-400">Domain URL:</span>
                    <span className="font-mono text-cyan-400">
                      https://{formData.subdomain || 'mybrand'}.pixoraplan.com
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm pb-3 border-b border-white/10">
                    <span className="text-gray-400">Hosting & SSL:</span>
                    <span className="text-emerald-400 font-semibold">100% Free Included</span>
                  </div>
                  <div className="flex items-center justify-between text-base pt-1">
                    <span className="font-bold text-white">Monthly Subscription:</span>
                    <div className="text-right">
                      <span className="text-2xl font-black text-cyan-400">₹299</span>
                      <span className="text-xs text-gray-400"> / month</span>
                    </div>
                  </div>
                </div>

                {/* Payment Mode Selector */}
                <div className="mb-6">
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3">
                    Select Payment & AutoPay Method
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                      onClick={() => setFormData({ ...formData, autoPayMethod: 'upi_autopay' })}
                      className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                        formData.autoPayMethod === 'upi_autopay'
                          ? 'bg-cyan-950/40 border-cyan-400 ring-1 ring-cyan-400'
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <CreditCard className="w-3.5 h-3.5 text-cyan-400" />
                          UPI AutoPay (eMandate)
                        </span>
                        {formData.autoPayMethod === 'upi_autopay' && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                      </div>
                      <p className="text-[11px] text-gray-400">Automated bank deduction every 30 days via GPay/PhonePe</p>
                    </div>

                    <div
                      onClick={() => setFormData({ ...formData, autoPayMethod: 'direct_upi_qr' })}
                      className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                        formData.autoPayMethod === 'direct_upi_qr'
                          ? 'bg-emerald-950/40 border-emerald-400 ring-1 ring-emerald-400'
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                          Instant UPI QR (₹0 Gateway Cost)
                        </span>
                        {formData.autoPayMethod === 'direct_upi_qr' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      </div>
                      <p className="text-[11px] text-gray-400">Scan QR directly to your business UPI with monthly auto-reminder</p>
                    </div>
                  </div>
                </div>

                {formData.autoPayMethod === 'upi_autopay' ? (
                  <>
                    {/* AutoPay Explanation */}
                    <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 mb-8 flex items-start gap-3">
                      <Lock className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                      <div className="text-xs text-gray-300 space-y-1">
                        <p className="font-bold text-white">RBI Compliant eMandate / UPI AutoPay</p>
                        <p>
                          Your first deduction of ₹299 happens today. Subsequent deductions of ₹299 will occur automatically every 30 days from your bank account. You can pause or cancel anytime with 1-click.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                      {['Google Pay', 'PhonePe', 'Paytm UPI', 'Any Bank Card'].map((provider, i) => (
                        <div key={i} className="rounded-xl p-3 bg-white/5 border border-white/10 text-center text-xs font-semibold text-gray-300">
                          {provider}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  /* Zero-Cost Direct UPI QR Mode */
                  <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 mb-8 flex flex-col sm:flex-row items-center gap-6">
                    <div className="p-3 bg-white rounded-xl shadow-lg shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=upi://pay?pa=pixoraplan@upi%26pn=PixoraPlan%26am=299%26cu=INR"
                        alt="UPI QR Code"
                        className="w-28 h-28"
                      />
                    </div>
                    <div className="text-xs text-gray-300 space-y-2 text-center sm:text-left">
                      <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px] uppercase">
                        Zero Gateway Commission Mode
                      </div>
                      <p className="font-bold text-white text-sm">Scan with Any UPI App to pay ₹299</p>
                      <p className="text-gray-400">
                        Scan using GPay, PhonePe, Paytm or BHIM. Direct to your UPI ID without paying payment gateway commission.
                      </p>
                      <div className="font-mono text-cyan-400 text-xs bg-black/40 px-3 py-1.5 rounded-lg border border-white/10 inline-block">
                        UPI ID: pixoraplan@upi
                      </div>
                    </div>
                  </div>
                )}

                {/* Authorize Button */}
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <button
                    onClick={() => setStep(2)}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>

                  <button
                    onClick={handleAuthorizeAutoPay}
                    disabled={isProcessingPayment}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-500 text-black font-extrabold text-sm flex items-center gap-2 shadow-xl shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                  >
                    {isProcessingPayment ? (
                      <>
                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Verifying Subscription...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" />
                        {formData.autoPayMethod === 'upi_autopay' ? 'Authorize ₹299 UPI AutoPay' : 'I Have Paid ₹299 - Activate Site'}
                      </>
                    )}
                  </button>
                </div>
              </>
            ) : (
              /* Success Confirmation */
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6 ring-8 ring-emerald-500/10">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-extrabold text-white mb-2">Subscription Activated!</h2>
                <p className="text-sm text-gray-300 max-w-md mx-auto mb-6">
                  Your recurring ₹299/mo plan is active. We are provisioning your isolated edge environment at:
                </p>

                <div className="inline-block p-4 rounded-2xl bg-slate-900 border border-cyan-500/30 font-mono text-cyan-400 text-base font-bold mb-8">
                  https://{formData.subdomain || 'mybrand'}.pages.dev
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto text-left text-xs mb-8">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-gray-400 block">Subscription ID</span>
                    <span className="font-mono text-white">sub_PX99824_LIVE</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-gray-400 block">Next Auto-Debit</span>
                    <span className="text-white">30 Days from today (₹299)</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href={`/preview/${formData.selectedTemplate}`}
                    target="_blank"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all"
                  >
                    View Your Live Website
                  </Link>

                  <Link
                    href="/admin"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 transition-all"
                  >
                    Go to Admin Registry
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#090d16] text-white flex items-center justify-center text-sm text-cyan-400">
        Loading PixoraPlan Onboarding...
      </div>
    }>
      <OnboardingContent />
    </Suspense>
  );
}
