'use client';

import { useState, useEffect } from 'react';
import { supabase, Tenant, Product, TenantSettings } from '@/lib/supabase';
import { 
  ShoppingBag, 
  Phone, 
  MapPin, 
  Clock, 
  Check, 
  Plus, 
  Minus, 
  X, 
  MessageCircle, 
  QrCode, 
  Sparkles,
  ExternalLink,
  ShieldCheck,
  AlertOctagon
} from 'lucide-react';

interface ClientSiteProps {
  tenantSlug: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function DedicatedClientStore({ tenantSlug }: ClientSiteProps) {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [settings, setSettings] = useState<TenantSettings | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    async function loadClientData() {
      setLoading(true);
      try {
        // 1. Fetch Tenant by Slug
        const { data: tenantData } = await supabase
          .from('tenants')
          .select('*')
          .eq('slug', tenantSlug)
          .single();

        if (tenantData) {
          setTenant(tenantData);

          // 2. Fetch Settings
          const { data: settingsData } = await supabase
            .from('tenant_settings')
            .select('*')
            .eq('tenant_id', tenantData.id)
            .single();

          if (settingsData) {
            setSettings(settingsData);
          }

          // 3. Fetch Products
          const { data: productsData } = await supabase
            .from('products')
            .select('*')
            .eq('tenant_id', tenantData.id)
            .order('created_at', { ascending: false });

          if (productsData) {
            setProducts(productsData);
          }
        }
      } catch (err) {
        console.error('Error loading client store:', err);
      } finally {
        setLoading(false);
      }
    }

    if (tenantSlug) {
      loadClientData();
    }
  }, [tenantSlug]);

  // Cart operations (LocalStorage backed)
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // WhatsApp Order Submission (Zero-cost, direct connection)
  const handleWhatsAppCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !deliveryAddress) {
      alert('Please enter your Name, Phone and Delivery Address');
      return;
    }

    if (!tenant) return;

    // Optional: Log order in Supabase for admin tracking
    try {
      await supabase.from('orders').insert([
        {
          tenant_id: tenant.id,
          customer_name: customerName,
          customer_phone: customerPhone,
          customer_address: deliveryAddress,
          order_items: cart.map(item => ({
            product_id: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity
          })),
          total_amount: totalAmount,
          order_status: 'new',
          payment_status: 'pending'
        }
      ]);
    } catch (err) {
      console.error('Order logging error:', err);
    }

    // Format WhatsApp message
    const targetWhatsApp = settings?.whatsapp_number || tenant.phone;
    const cleanPhone = targetWhatsApp.replace(/[^0-9]/g, '');

    const itemsSummary = cart
      .map((item) => `• ${item.title} x ${item.quantity} = ₹${item.price * item.quantity}`)
      .join('%0A');

    const message = 
      `*🛒 NEW ORDER - ${tenant.name}*%0A%0A` +
      `*Customer Details:*%0A` +
      `Name: ${customerName}%0A` +
      `Phone: ${customerPhone}%0A` +
      `Address: ${deliveryAddress}%0A%0A` +
      `*Ordered Items:*%0A${itemsSummary}%0A%0A` +
      `*Total Amount: ₹${totalAmount}*%0A%0A` +
      `Please confirm order & share payment details. Thank you!`;

    const waUrl = `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${message}`;
    
    setOrderSuccess(true);
    setCart([]);
    window.open(waUrl, '_blank');
  };

  const categories = ['all', ...Array.from(new Set(products.map((p) => p.category || 'General')))];

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => (p.category || 'General') === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090d16] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-gray-400 font-mono">Loading store...</p>
        </div>
      </div>
    );
  }

  if (!tenant) {
    return (
      <div className="min-h-screen bg-[#090d16] text-white flex items-center justify-center p-4">
        <div className="glass-panel p-8 rounded-3xl border border-white/10 text-center max-w-md">
          <h2 className="text-xl font-bold text-white mb-2">Store Under Setup</h2>
          <p className="text-xs text-gray-400 mb-6">
            Website for <span className="text-cyan-400 font-mono">{tenantSlug}.pages.dev</span> is currently being custom-configured by Pixzora.
          </p>
          <a
            href="https://pixzora.pages.dev"
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs"
          >
            Visit Pixzora Platform
          </a>
        </div>
      </div>
    );
  }

  // Handle Suspended Tenant
  if (tenant.status === 'suspended') {
    return (
      <div className="min-h-screen bg-[#070a12] text-white flex items-center justify-center p-4">
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-red-500/30 text-center max-w-lg shadow-2xl shadow-red-500/10 backdrop-blur-xl bg-black/60">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-6 text-red-400 shadow-inner">
            <AlertOctagon className="w-8 h-8" />
          </div>
          <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-[11px] uppercase tracking-wider">
            Access Restricted
          </span>
          <h2 className="text-2xl font-black text-white mt-4 mb-2">
            Website Temporarily Suspended
          </h2>
          <p className="text-sm text-gray-300 mb-6 leading-relaxed">
            The website for <span className="text-white font-bold">{tenant.name}</span> (<span className="text-cyan-400 font-mono">{tenantSlug}.pages.dev</span>) has been temporarily placed on hold by the administrator.
          </p>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-gray-400 mb-6 text-left space-y-2">
            <div className="flex items-center gap-2 text-gray-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Are you the store owner?</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Please contact Pixzora Support or check your billing dashboard to reactivate your store services immediately.
            </p>
          </div>
          <a
            href="https://wa.me/916265413244?text=Hi%20Pixzora%2C%20my%20store%20is%20suspended.%20Need%20help%20reactivating%20it."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-500 text-white font-bold text-xs shadow-lg shadow-red-500/20 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Contact Pixzora Support</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070a12] text-white flex flex-col justify-between">
      {/* Client Brand Header */}
      <header className="sticky top-0 z-40 backdrop-blur-lg bg-[#070a12]/90 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-black font-black text-lg shadow-lg shadow-cyan-500/20">
              {tenant.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-black text-white">{tenant.name}</h1>
              <p className="text-[11px] text-gray-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Open for Orders
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Cart</span>
              {totalItemsCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-black text-white text-[10px] font-mono">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Catalog View */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex-1 w-full">
        {/* Banner Card */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 mb-10 relative overflow-hidden bg-gradient-to-r from-slate-900 via-[#0d1527] to-slate-900">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-cyan-400 mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Welcome to {tenant.name}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              Explore Our Fresh Collection & Order Directly
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mb-6">
              Browse products, add to cart, and get fast home delivery or pickup via WhatsApp checkout.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-300">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-cyan-400" /> {tenant.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Direct UPI / COD
              </span>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        {categories.length > 2 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="glass-panel p-12 rounded-3xl border border-white/5 text-center">
            <ShoppingBag className="w-10 h-10 text-gray-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">Catalog Being Updated</h3>
            <p className="text-xs text-gray-400">
              New products are being added to our store right now. Check back shortly!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="glass-panel rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between hover:border-cyan-500/40 transition-all group"
              >
                <div>
                  <div className="h-48 bg-slate-900 relative overflow-hidden flex items-center justify-center">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-500">
                        <ShoppingBag className="w-6 h-6" />
                      </div>
                    )}
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-bold text-gray-300 border border-white/10 uppercase">
                      {product.category || 'General'}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-white text-base mb-1">{product.title}</h3>
                    {product.description && (
                      <p className="text-xs text-gray-400 line-clamp-2 mb-3">
                        {product.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between">
                  <div>
                    <div className="text-lg font-black text-white">₹{product.price}</div>
                    {product.compare_price && (
                      <div className="text-xs text-gray-500 line-through">
                        ₹{product.compare_price}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 active:scale-95 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#0c1220] border-l border-white/10 h-full flex flex-col justify-between p-6 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-black text-white">Your Cart</h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-xs text-gray-400">Your cart is currently empty.</p>
                </div>
              ) : (
                <div className="space-y-4 mb-8">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-between"
                    >
                      <div>
                        <h4 className="font-bold text-white text-xs">{item.title}</h4>
                        <span className="text-xs text-cyan-400 font-semibold">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-bold w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-6 border-t border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-gray-400 font-semibold uppercase">Total Amount</span>
                  <span className="text-2xl font-black text-emerald-400">₹{totalAmount}</span>
                </div>

                <form onSubmit={handleWhatsAppCheckout} className="space-y-3">
                  <div>
                    <label className="text-[11px] text-gray-300 font-semibold block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-300 font-semibold block mb-1">Phone Number (For WhatsApp Updates) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9876543210"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-300 font-semibold block mb-1">Delivery Address *</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="House / Flat No, Street, Landmark, Pincode"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-98 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-black" />
                    Place Order via WhatsApp (₹{totalAmount})
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Powered by Pixzora Footer */}
      <footer className="py-6 border-t border-white/5 text-center text-xs text-gray-500 bg-[#05070d]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} {tenant.name}. All rights reserved.</span>
          <a
            href="https://pixzora.pages.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-cyan-400 flex items-center gap-1 transition-colors text-[11px]"
          >
            Powered by <strong className="text-cyan-400/90 font-bold">Pixzora</strong>
          </a>
        </div>
      </footer>
    </div>
  );
}
