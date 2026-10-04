'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
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
  Lock,
  Copy,
  Clock,
  AlertCircle
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
    autoPayMethod: 'direct_upi_qr',
  });

  const [isSubdomainAvailable, setIsSubdomainAvailable] = useState<boolean | null>(null);
  const [isCheckingDomain, setIsCheckingDomain] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [mandateSuccess, setMandateSuccess] = useState(false);
  const [activationMode, setActivationMode] = useState<'instant' | 'pending_verification'>('pending_verification');

  // Multi-UPI Support
  const upiList = [
    { label: 'PhonePe / YBL', id: process.env.NEXT_PUBLIC_UPI_PRIMARY || '6265413244-3@ybl' },
    { label: 'Google Pay / SBI', id: process.env.NEXT_PUBLIC_UPI_SECONDARY || 'abzeeshankhan30-2@oksbi' },
    { label: 'Paytm UPI', id: process.env.NEXT_PUBLIC_UPI_TERTIARY || '6265413244@ptyes' }
  ];
  const [selectedUpi, setSelectedUpi] = useState(upiList[0].id);
  const [utrNumber, setUtrNumber] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [razorpayPaymentId, setRazorpayPaymentId] = useState('');
  const [razorpayWindowOpened, setRazorpayWindowOpened] = useState(false);

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

  // 1. DIRECT UPI QR WITH 12-DIGIT UTR SUBMISSION (LOCKED UNTIL ADMIN VERIFIED)
  const handleUpiPaymentSubmit = async () => {
    const cleanUtr = utrNumber.trim().replace(/[^0-9]/g, '');
    if (!cleanUtr || cleanUtr.length < 8) {
      alert('Please enter a valid 12-digit UPI Reference / UTR Number from your payment app (GPay/PhonePe/Paytm).');
      return;
    }

    setIsProcessingPayment(true);

    try {
      const cleanSlug = formData.subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '');
      const mappedType = formData.category === 'restaurant' ? 'restaurant' : formData.category === 'service' ? 'services' : formData.category === 'portfolio' ? 'portfolio' : 'ecommerce';

      // Insert tenant with status: 'inactive' (Pending Approval) so nobody gets a free domain!
      const ownerLabel = formData.ownerName 
        ? `${formData.ownerName} [UPI UTR: ${cleanUtr}]` 
        : `[UPI UTR: ${cleanUtr}]`;

      const { data: tenantData, error: tenantError } = await supabase.from('tenants').insert([
        {
          name: formData.businessName,
          slug: cleanSlug,
          business_type: mappedType,
          owner_name: ownerLabel,
          phone: formData.phone,
          email: formData.email,
          monthly_price: 299,
          status: 'inactive', // LOCKED UNTIL ADMIN APPROVES
          subscription_status: 'due',
        }
      ]).select().single();

      if (tenantError) {
        throw new Error(tenantError.message);
      }

      // Record transaction details in tenant_settings
      if (tenantData) {
        await supabase.from('tenant_settings').insert([
          {
            tenant_id: tenantData.id,
            theme_color: '#06b6d4',
            whatsapp_number: formData.phone,
            upi_id: selectedUpi,
            social_links: {
              payment_mode: 'direct_upi_qr',
              utr_number: cleanUtr,
              receiver_upi: selectedUpi,
              verification_status: 'pending_approval'
            }
          }
        ]);
      }

      setActivationMode('pending_verification');
      setMandateSuccess(true);
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    } catch (err: any) {
      console.error('Payment submission error:', err);
      alert('Error submitting payment details: ' + (err.message || 'Please try again.'));
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // 2. RAZORPAY SUBSCRIPTION LINK & ONLINE GATEWAY (UPI AUTOPAY / RECURRING)
  const handleRazorpayCheckout = async () => {
    const subLink = process.env.NEXT_PUBLIC_RAZORPAY_SUBSCRIPTION_LINK || 'https://rzp.io/rzp/e5rMWCK';
    const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

    // A. If direct Razorpay Subscription Link is active (https://rzp.io/rzp/e5rMWCK)
    if (subLink) {
      window.open(subLink, '_blank');
      setRazorpayWindowOpened(true);
      return;
    }

    // B. Standard SDK modal fallback if Key ID provided
    if (!razorpayKey) {
      alert('Please use the Direct UPI QR option or contact admin.');
      setFormData(prev => ({ ...prev, autoPayMethod: 'direct_upi_qr' }));
      return;
    }

    if (typeof window === 'undefined' || !(window as any).Razorpay) {
      alert('Razorpay SDK is loading. Please try in a moment.');
      return;
    }

    setIsProcessingPayment(true);

    const options = {
      key: razorpayKey,
      amount: 299 * 100, // ₹299 in paise
      currency: 'INR',
      name: 'Pixzora Platform',
      description: `Monthly Subscription for ${formData.businessName} (${formData.subdomain}.pages.dev)`,
      image: '/favicon.ico',
      prefill: {
        name: formData.ownerName || formData.businessName,
        email: formData.email,
        contact: formData.phone,
      },
      theme: {
        color: '#06b6d4',
      },
      handler: async function (response: any) {
        try {
          const cleanSlug = formData.subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '');
          const mappedType = formData.category === 'restaurant' ? 'restaurant' : formData.category === 'service' ? 'services' : formData.category === 'portfolio' ? 'portfolio' : 'ecommerce';

          const ownerLabel = formData.ownerName 
            ? `${formData.ownerName} [Razorpay: ${response.razorpay_payment_id}]` 
            : `[Razorpay: ${response.razorpay_payment_id}]`;

          // Verified payment! Activate domain immediately
          const { data: tenantData, error: tenantError } = await supabase.from('tenants').insert([
            {
              name: formData.businessName,
              slug: cleanSlug,
              business_type: mappedType,
              owner_name: ownerLabel,
              phone: formData.phone,
              email: formData.email,
              monthly_price: 299,
              status: 'active',
              subscription_status: 'active',
            }
          ]).select().single();

          if (tenantError) throw tenantError;

          if (tenantData) {
            await supabase.from('tenant_settings').insert([
              {
                tenant_id: tenantData.id,
                theme_color: '#06b6d4',
                whatsapp_number: formData.phone,
                social_links: {
                  payment_mode: 'razorpay',
                  payment_id: response.razorpay_payment_id,
                  verification_status: 'auto_verified'
                }
              }
            ]);
          }

          setActivationMode('instant');
          setMandateSuccess(true);
          confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        } catch (err: any) {
          console.error('Error saving tenant post-payment:', err);
          alert('Payment succeeded with ID: ' + response.razorpay_payment_id);
        } finally {
          setIsProcessingPayment(false);
        }
      },
      modal: {
        ondismiss: function () {
          setIsProcessingPayment(false);
          alert('Payment was not completed. No domain has been reserved or created.');
        }
      }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  const handleRazorpayPaidConfirmation = async () => {
    const cleanPayId = razorpayPaymentId.trim();
    if (!cleanPayId || cleanPayId.length < 5) {
      alert('Please enter your Razorpay Payment ID or Transaction Reference (shown on Razorpay receipt screen).');
      return;
    }

    setIsProcessingPayment(true);
    try {
      const cleanSlug = formData.subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '');
      const mappedType = formData.category === 'restaurant' ? 'restaurant' : formData.category === 'service' ? 'services' : formData.category === 'portfolio' ? 'portfolio' : 'ecommerce';

      const ownerLabel = formData.ownerName 
        ? `${formData.ownerName} [Razorpay: ${cleanPayId}]` 
        : `[Razorpay: ${cleanPayId}]`;

      await supabase.from('tenants').insert([
        {
          name: formData.businessName,
          slug: cleanSlug,
          business_type: mappedType,
          owner_name: ownerLabel,
          phone: formData.phone,
          email: formData.email,
          monthly_price: 299,
          status: 'inactive', // Locked until verified
          subscription_status: 'due',
        }
      ]);

      setActivationMode('pending_verification');
      setMandateSuccess(true);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch (err: any) {
      console.error('Error confirming Razorpay payment:', err);
      alert('Error logging payment: ' + err.message);
    } finally {
      setIsProcessingPayment(false);
    }
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

        {/* STEP 3: Payment & Mandate Gate */}
        {step === 3 && (
          <div className="glass-panel rounded-3xl p-8 border border-white/10 shadow-2xl">
            {/* Razorpay Checkout Script */}
            <Script 
              src="https://checkout.razorpay.com/v1/checkout.js" 
              strategy="lazyOnload" 
            />

            {!mandateSuccess ? (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Activate Your Store (₹299/mo)</h2>
                    <p className="text-xs text-gray-400">Complete payment to lock and activate your isolated domain</p>
                  </div>
                </div>

                {/* Plan Summary Card */}
                <div className="rounded-2xl p-6 bg-slate-900/80 border border-white/10 mb-8 space-y-3">
                  <div className="flex items-center justify-between text-sm pb-3 border-b border-white/10">
                    <span className="text-gray-400">Business Service:</span>
                    <span className="font-semibold text-white">{formData.businessName || 'Your Business Website'}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm pb-3 border-b border-white/10">
                    <span className="text-gray-400">Reserved Domain:</span>
                    <span className="font-mono text-cyan-400">
                      https://{formData.subdomain || 'mybrand'}.pages.dev
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm pb-3 border-b border-white/10">
                    <span className="text-gray-400">Hosting, SSL & DDoS Protection:</span>
                    <span className="text-emerald-400 font-semibold">100% Free Included</span>
                  </div>
                  <div className="flex items-center justify-between text-base pt-1">
                    <span className="font-bold text-white">Monthly Cost:</span>
                    <div className="text-right">
                      <span className="text-2xl font-black text-cyan-400">₹299</span>
                      <span className="text-xs text-gray-400"> / month</span>
                    </div>
                  </div>
                </div>

                {/* Payment Mode Selector */}
                <div className="mb-6">
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3">
                    Select Payment Method
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                          Direct UPI QR (GPay / PhonePe / Paytm)
                        </span>
                        {formData.autoPayMethod === 'direct_upi_qr' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      </div>
                      <p className="text-[11px] text-gray-400">Scan QR, enter 12-digit UTR ref, and activate site</p>
                    </div>

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
                          Razorpay Gateway (Cards / NetBanking / UPI)
                        </span>
                        {formData.autoPayMethod === 'upi_autopay' && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                      </div>
                      <p className="text-[11px] text-gray-400">Instant automated checkout with payment receipt</p>
                    </div>
                  </div>
                </div>

                {/* Option A: Direct UPI QR with UTR submission */}
                {formData.autoPayMethod === 'direct_upi_qr' ? (
                  <div className="space-y-6 mb-8">
                    {/* Choose which UPI ID to pay to */}
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                        Step 1: Choose Your Preferred UPI Receiver
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
                        {upiList.map((item, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setSelectedUpi(item.id)}
                            className={`p-3 rounded-xl border text-left transition-all ${
                              selectedUpi === item.id
                                ? 'bg-emerald-500/20 border-emerald-400 text-white font-bold'
                                : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/20 text-xs'
                            }`}
                          >
                            <div className="text-[10px] text-gray-400 uppercase">{item.label}</div>
                            <div className="font-mono text-xs truncate mt-0.5">{item.id}</div>
                          </button>
                        ))}
                      </div>

                      {/* Dynamic QR Code & Copy UPI Box */}
                      <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex flex-col sm:flex-row items-center gap-6">
                        <div className="p-3 bg-white rounded-xl shadow-lg shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=${encodeURIComponent(selectedUpi)}%26pn=Pixzora%26am=299%26cu=INR`}
                            alt="UPI QR Code"
                            className="w-32 h-32"
                          />
                        </div>
                        <div className="text-xs text-gray-300 space-y-2 text-center sm:text-left flex-1">
                          <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px] uppercase">
                            Official Pixzora Merchant QR
                          </div>
                          <p className="font-bold text-white text-base">Pay ₹299 using Any UPI App</p>
                          <p className="text-gray-400">
                            Scan the QR code or copy the UPI ID below into Google Pay, PhonePe, Paytm or BHIM to pay ₹299.
                          </p>
                          <div className="flex flex-wrap items-center gap-2 pt-1">
                            <span className="font-mono text-cyan-300 text-xs bg-black/60 px-3 py-1.5 rounded-lg border border-white/10 select-all">
                              {selectedUpi}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(selectedUpi);
                                setCopiedUpi(true);
                                setTimeout(() => setCopiedUpi(false), 2000);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1 border border-white/10 transition-all"
                            >
                              <Copy className="w-3.5 h-3.5" />
                              {copiedUpi ? 'Copied!' : 'Copy UPI ID'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Step 2: Mandatory 12-digit UTR Input */}
                    <div className="p-5 rounded-2xl bg-slate-900 border border-amber-500/40 space-y-3">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                        <label className="text-xs font-bold text-white uppercase tracking-wider">
                          Step 2: Enter 12-Digit UPI Reference / UTR Number (Mandatory)
                        </label>
                      </div>
                      <p className="text-xs text-gray-400">
                        After completing the ₹299 payment, your UPI app will display a <strong>12-digit UTR / UPI Ref ID</strong> (e.g. <code>427189283719</code>). Enter it here to verify your domain:
                      </p>
                      <input
                        type="text"
                        maxLength={16}
                        placeholder="e.g. 427189283719"
                        value={utrNumber}
                        onChange={(e) => setUtrNumber(e.target.value.replace(/[^0-9]/g, ''))}
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-amber-400 text-base font-mono tracking-widest"
                      />
                      <div className="text-[11px] text-gray-500 flex items-center gap-1.5">
                        <Lock className="w-3 h-3 text-cyan-400" />
                        <span>Stores without valid verified payment remain locked to prevent domain abuse.</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Option B: Razorpay Online Payment Gateway */
                  <div className="space-y-4 mb-8">
                    <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex items-start gap-3">
                      <Lock className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                      <div className="text-xs text-gray-300 space-y-1">
                        <p className="font-bold text-white">NPCI & RBI Compliant Recurring Subscription</p>
                        <p>
                          Supports GPay, PhonePe, Paytm (on mobile) and Visa, Mastercard, RuPay cards. Subscriptions are billed automatically @ ₹299/mo with zero setup cost.
                        </p>
                      </div>
                    </div>

                    {!razorpayWindowOpened ? (
                      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center space-y-3">
                        <p className="text-xs text-gray-300">
                          Click below to open the secure Razorpay Subscription checkout window.
                        </p>
                        <button
                          type="button"
                          onClick={handleRazorpayCheckout}
                          className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all inline-flex items-center gap-2 cursor-pointer"
                        >
                          <CreditCard className="w-4 h-4" />
                          Open ₹299 Razorpay Subscription Window
                        </button>
                        <p className="text-[11px] text-gray-400">
                          Note: If paying from laptop, ensure your card has online recurring/eMandate enabled, or open on mobile to use UPI.
                        </p>
                      </div>
                    ) : (
                      /* Post-click verification prompt: No fake success until ID entered! */
                      <div className="p-5 rounded-2xl bg-slate-900 border border-cyan-500/40 space-y-4">
                        <div className="flex items-center gap-2 text-cyan-400">
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="text-xs font-bold uppercase tracking-wider">
                            Razorpay Window Opened in New Tab
                          </span>
                        </div>
                        <p className="text-xs text-gray-300">
                          Complete your subscription setup in the Razorpay tab. Once finished, enter your <strong>Razorpay Payment ID / Subscription ID</strong> below to lock your domain:
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            placeholder="e.g. pay_XXXXX or sub_XXXXX"
                            value={razorpayPaymentId}
                            onChange={(e) => setRazorpayPaymentId(e.target.value)}
                            className="flex-1 px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white placeholder-gray-500 text-xs font-mono focus:outline-none focus:border-cyan-400"
                          />
                          <button
                            type="button"
                            onClick={handleRazorpayPaidConfirmation}
                            disabled={isProcessingPayment || !razorpayPaymentId.trim()}
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-black font-bold text-xs disabled:opacity-40 cursor-pointer"
                          >
                            Verify & Reserve Domain
                          </button>
                        </div>
                        <div className="flex items-center justify-between text-[11px] pt-1 border-t border-white/5">
                          <span className="text-gray-400">Did the window not open?</span>
                          <button
                            type="button"
                            onClick={handleRazorpayCheckout}
                            className="text-cyan-400 hover:underline font-semibold"
                          >
                            Click to Re-open Razorpay
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Submit / Pay Button */}
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <button
                    onClick={() => setStep(2)}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>

                  {formData.autoPayMethod === 'direct_upi_qr' && (
                    <button
                      onClick={handleUpiPaymentSubmit}
                      disabled={isProcessingPayment || !utrNumber || utrNumber.length < 8}
                      className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-500 text-black font-extrabold text-sm flex items-center gap-2 shadow-xl shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:hover:scale-100 cursor-pointer"
                    >
                      {isProcessingPayment ? (
                        <>
                          <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          Verifying Payment...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          Submit UTR & Reserve Domain
                        </>
                      )}
                    </button>
                  )}
                </div>
              </>
            ) : (
              /* Success / Pending Confirmation */
              <div className="text-center py-8">
                {activationMode === 'instant' ? (
                  <>
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6 ring-8 ring-emerald-500/10">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-white mb-2">Payment Verified & Activated!</h2>
                    <p className="text-sm text-gray-300 max-w-md mx-auto mb-6">
                      Your ₹299 payment has been verified. Your dedicated store is provisioned at:
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-6 ring-8 ring-amber-500/10">
                      <Clock className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-white mb-2">Payment Logged — Awaiting Verification!</h2>
                    <p className="text-sm text-gray-300 max-w-md mx-auto mb-4">
                      Thank you! Reference <span className="font-mono text-amber-400 font-bold">{utrNumber || razorpayPaymentId}</span> has been securely recorded.
                    </p>
                    <p className="text-xs text-gray-400 max-w-md mx-auto mb-6">
                      Your subdomain is <strong>reserved exclusively for you</strong>. Our administrator will verify the deposit and activate your store within 15–30 minutes.
                    </p>
                  </>
                )}

                <div className="inline-block p-4 rounded-2xl bg-slate-900 border border-cyan-500/30 font-mono text-cyan-400 text-base font-bold mb-8">
                  https://{formData.subdomain || 'mybrand'}.pages.dev
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto text-left text-xs mb-8">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-gray-400 block">Payment Reference</span>
                    <span className="font-mono text-white">
                      {utrNumber ? `UPI UTR: ${utrNumber}` : razorpayPaymentId ? `Razorpay: ${razorpayPaymentId}` : 'Under Review'}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-gray-400 block">Store Status</span>
                    <span className={activationMode === 'instant' ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                      {activationMode === 'instant' ? 'Active & Live' : 'Pending Verification'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={`https://wa.me/916265413244?text=${encodeURIComponent(
                      utrNumber 
                        ? `Hi Pixzora, I have submitted payment with UPI UTR: ${utrNumber} for my store https://${formData.subdomain}.pages.dev. Please verify and activate.`
                        : `Hi Pixzora, I have authorized subscription on Razorpay with Ref: ${razorpayPaymentId || 'LIVE'} for my store https://${formData.subdomain}.pages.dev. Please verify and activate.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Notify Admin on WhatsApp</span>
                  </a>

                  <Link
                    href={`/preview/${formData.selectedTemplate}`}
                    target="_blank"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 transition-all"
                  >
                    Preview Template
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
        Loading Pixzora Onboarding...
      </div>
    }>
      <OnboardingContent />
    </Suspense>
  );
}
