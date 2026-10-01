'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { supabase, Tenant, Product, Order } from '@/lib/supabase';
import { 
  Users, 
  IndianRupee, 
  TrendingUp, 
  ShieldCheck, 
  ExternalLink, 
  Search, 
  Power, 
  Plus,
  RefreshCw,
  ShoppingBag,
  Package,
  Layers,
  CheckCircle2,
  Clock,
  Eye,
  Trash2,
  Lock,
  KeyRound,
  LogOut,
  Rocket,
  Copy
} from 'lucide-react';

export default function AdminDashboard() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended'>('all');
  const [activeTab, setActiveTab] = useState<'tenants' | 'products' | 'orders'>('tenants');
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [productsList, setProductsList] = useState<Product[]>([]);
  
  // New Client Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    slug: '',
    business_type: 'ecommerce' as const,
    owner_name: '',
    phone: '',
    email: '',
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [authChecking, setAuthChecking] = useState(true);

  // Check existing session
  useEffect(() => {
    const savedPin = sessionStorage.getItem('pixzora_admin_auth');
    if (savedPin === 'pixzora2026') {
      setIsAuthenticated(true);
    }
    setAuthChecking(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === 'pixzora2026') {
      sessionStorage.setItem('pixzora_admin_auth', 'pixzora2026');
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Invalid Passcode! Access restricted to Super Admin.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('pixzora_admin_auth');
    setIsAuthenticated(false);
    setPinInput('');
  };

  // Fetch real data from Supabase
  const fetchData = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const { data: tenantsData } = await supabase
        .from('tenants')
        .select('*')
        .order('created_at', { ascending: false });

      if (tenantsData) {
        setTenants(tenantsData);
      }

      const { data: ordersData } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (ordersData) {
        setRecentOrders(ordersData);
      }

      const { data: productsData } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(30);

      if (productsData) {
        setProductsList(productsData);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  // Create new tenant
  const handleCreateTenant = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const cleanSlug = newClient.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
      const { data, error } = await supabase.from('tenants').insert([
        {
          name: newClient.name,
          slug: cleanSlug,
          business_type: newClient.business_type,
          owner_name: newClient.owner_name,
          phone: newClient.phone,
          email: newClient.email || null,
          monthly_price: 299,
          status: 'active',
          subscription_status: 'active',
        }
      ]).select();

      if (error) {
        alert('Error adding client: ' + error.message);
      } else {
        alert(`Client ${newClient.name} successfully created! Subdomain: ${cleanSlug}.pages.dev`);
        setShowAddModal(false);
        setNewClient({ name: '', slug: '', business_type: 'ecommerce', owner_name: '', phone: '', email: '' });
        fetchData();
      }
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  // Toggle tenant active/suspended
  const toggleTenantStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'active' ? 'suspended' : 'active';
    const { error } = await supabase
      .from('tenants')
      .update({ status: nextStatus })
      .eq('id', id);

    if (error) {
      alert('Error updating status: ' + error.message);
    } else {
      setTenants(prev => prev.map(t => t.id === id ? { ...t, status: nextStatus as any } : t));
    }
  };

  // Delete client completely
  const deleteTenant = async (id: string, name: string) => {
    const confirmed = window.confirm(`Are you sure you want to permanently delete "${name}"? This will delete all products, orders and website data.`);
    if (!confirmed) return;

    try {
      const { error } = await supabase
        .from('tenants')
        .delete()
        .eq('id', id);

      if (error) {
        alert('Error deleting client: ' + error.message);
      } else {
        setTenants(prev => prev.filter(t => t.id !== id));
        alert(`Client "${name}" has been permanently deleted.`);
      }
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  const filteredTenants = tenants.filter(t => {
    const matchesQuery = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         t.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (t.owner_name && t.owner_name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const totalClients = tenants.length;
  const activeClients = tenants.filter(c => c.status === 'active').length;
  const monthlyRevenue = activeClients * 299;

  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#090d16] text-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // PASSCODE LOCK SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#090d16] text-white flex flex-col justify-between">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/10">
              <Lock className="w-7 h-7" />
            </div>

            <h2 className="text-2xl font-black text-white text-center mb-2">Master Control Security</h2>
            <p className="text-xs text-gray-400 text-center mb-6">
              Enter Super Admin Passcode to manage 100+ client websites, subscriptions & kill-switches.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-[11px] font-semibold text-gray-300 block mb-1 uppercase tracking-wider">
                  Admin Passcode
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    autoFocus
                    required
                    placeholder="••••••••••••"
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      setPinError('');
                    }}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 font-mono tracking-widest"
                  />
                </div>
                {pinError && (
                  <p className="text-xs text-red-400 mt-2 font-medium flex items-center gap-1">
                    ⚠️ {pinError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-500 text-black font-extrabold text-sm shadow-xl shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" /> Unlock Admin Registry
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-white/5 text-center">
              <span className="text-[11px] text-gray-500">
                Protected by 256-bit Row-Level Security • Pixzora Master Gate
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white">Pixzora Master Control</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Live Supabase Connected
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Multi-Tenant Architecture • 100+ Clients Management • E-Commerce & Orders Tracking
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={fetchData}
              disabled={loading}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-semibold text-xs flex items-center gap-1.5 border border-white/10 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </button>
            <button 
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
            >
              <Plus className="w-4 h-4" /> Add New Client
            </button>
            <button 
              onClick={handleLogout}
              title="Lock Admin Session"
              className="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold flex items-center gap-1.5 border border-red-500/20 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" /> Lock
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="glass-panel p-5 rounded-2xl border border-white/5">
            <div className="flex items-center justify-between text-gray-400 mb-2">
              <span className="text-xs font-semibold uppercase">Total Clients</span>
              <Users className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-black text-white">{totalClients}</div>
            <p className="text-xs text-gray-400 mt-1">Target: 100+ active shops</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-white/5">
            <div className="flex items-center justify-between text-gray-400 mb-2">
              <span className="text-xs font-semibold uppercase">Monthly Recurring Revenue</span>
              <IndianRupee className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-emerald-400">₹{monthlyRevenue.toLocaleString('en-IN')}</div>
            <p className="text-xs text-gray-400 mt-1">@ ₹299/client monthly</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-white/5">
            <div className="flex items-center justify-between text-gray-400 mb-2">
              <span className="text-xs font-semibold uppercase">Active E-Commerce Orders</span>
              <ShoppingBag className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-3xl font-black text-purple-400">{recentOrders.length}</div>
            <p className="text-xs text-gray-400 mt-1">Across all client websites</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-white/5">
            <div className="flex items-center justify-between text-gray-400 mb-2">
              <span className="text-xs font-semibold uppercase">Tenant Security</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-emerald-400">RLS Active</div>
            <p className="text-xs text-gray-400 mt-1">Isolated client partitions</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
          <button
            onClick={() => setActiveTab('tenants')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'tenants' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" /> Client Websites ({tenants.length})
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'products' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" /> Products & Catalog ({productsList.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'orders' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" /> Global Orders ({recentOrders.length})
          </button>
        </div>

        {/* TAB 1: TENANTS */}
        {activeTab === 'tenants' && (
          <>
            {/* Filter & Search Bar */}
            <div className="glass-panel p-4 rounded-2xl border border-white/5 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by business, subdomain, or owner..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs text-gray-400 font-medium">Status:</span>
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    statusFilter === 'all' ? 'bg-cyan-500 text-black' : 'bg-white/5 text-gray-400'
                  }`}
                >
                  All ({tenants.length})
                </button>
                <button
                  onClick={() => setStatusFilter('active')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    statusFilter === 'active' ? 'bg-emerald-500 text-black' : 'bg-white/5 text-gray-400'
                  }`}
                >
                  Active ({tenants.filter(c => c.status === 'active').length})
                </button>
                <button
                  onClick={() => setStatusFilter('suspended')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    statusFilter === 'suspended' ? 'bg-red-500 text-white' : 'bg-white/5 text-gray-400'
                  }`}
                >
                  Suspended ({tenants.filter(c => c.status === 'suspended').length})
                </button>
              </div>
            </div>

            {/* Clients Table */}
            <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/80 border-b border-white/10 text-gray-400 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">Business & Owner</th>
                      <th className="py-3.5 px-4 font-semibold">Domain / Pages.dev</th>
                      <th className="py-3.5 px-4 font-semibold">Type</th>
                      <th className="py-3.5 px-4 font-semibold">Billing Plan</th>
                      <th className="py-3.5 px-4 font-semibold">Status</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Kill Switch</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-gray-400">
                          Connecting to Supabase...
                        </td>
                      </tr>
                    ) : filteredTenants.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-gray-400">
                          No clients found. Click "Add New Client" above to onboard your first shop!
                        </td>
                      </tr>
                    ) : (
                      filteredTenants.map((client) => {
                        const isActive = client.status === 'active';
                        return (
                          <tr key={client.id} className="hover:bg-white/5 transition-colors">
                            <td className="py-4 px-4">
                              <div className="font-bold text-white text-sm">{client.name}</div>
                              <div className="text-gray-400 text-[11px]">{client.owner_name || 'Owner'} • {client.phone}</div>
                            </td>

                            <td className="py-4 px-4 font-mono">
                              <div className="flex items-center gap-1.5">
                                <a
                                  href={`https://${client.slug}.pages.dev`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-cyan-400 font-semibold hover:underline flex items-center gap-1"
                                >
                                  {client.slug}.pages.dev
                                  <ExternalLink className="w-3 h-3 text-cyan-400/70" />
                                </a>
                              </div>
                              <button
                                onClick={() => {
                                  const cmd = `npm run deploy:client -- ${client.slug}`;
                                  navigator.clipboard.writeText(cmd);
                                  alert(`Deployment command copied to clipboard:\n\n${cmd}\n\nRun this in terminal to deploy this client's site to https://${client.slug}.pages.dev!`);
                                }}
                                className="mt-1 text-[10px] text-gray-400 hover:text-white flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded border border-white/5 transition-all"
                                title="Copy 1-Click Cloudflare Pages Deploy Command"
                              >
                                <Rocket className="w-3 h-3 text-purple-400" />
                                <span>Copy Deploy Command</span>
                              </button>
                            </td>

                            <td className="py-4 px-4">
                              <span className="capitalize px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300">
                                {client.business_type}
                              </span>
                            </td>

                            <td className="py-4 px-4">
                              <div className="font-bold text-emerald-400">₹{client.monthly_price}/mo</div>
                              <div className="text-[10px] text-gray-400">Due: {new Date(client.subscription_end_date).toLocaleDateString()}</div>
                            </td>

                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-400' : 'bg-red-400'}`} />
                                <span className={isActive ? 'text-emerald-300 font-medium' : 'text-red-400 font-medium'}>
                                  {isActive ? 'Active' : 'Suspended'}
                                </span>
                              </div>
                            </td>

                            <td className="py-4 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => toggleTenantStatus(client.id, client.status)}
                                  title={isActive ? 'Suspend Website' : 'Reactivate Website'}
                                  className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-all ${
                                    isActive
                                      ? 'bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-black'
                                      : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-black'
                                  }`}
                                >
                                  <Power className="w-3 h-3" />
                                  {isActive ? 'Suspend' : 'Reactivate'}
                                </button>

                                <button
                                  onClick={() => deleteTenant(client.id, client.name)}
                                  title="Permanently Delete Client"
                                  className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* TAB 2: PRODUCTS */}
        {activeTab === 'products' && (
          <div className="glass-panel p-6 rounded-2xl border border-white/5">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Package className="w-4 h-4 text-cyan-400" /> All Client Products & Menus
            </h3>
            {productsList.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-8">
                No products uploaded yet. Products added by clients in their individual dashboards will appear here in real-time.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {productsList.map((prod) => (
                  <div key={prod.id} className="p-4 rounded-xl bg-slate-900 border border-white/10 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-gray-400">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs">{prod.title}</h4>
                      <p className="text-emerald-400 font-semibold text-xs">₹{prod.price}</p>
                      <span className="text-[10px] text-gray-400">{prod.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ORDERS */}
        {activeTab === 'orders' && (
          <div className="glass-panel p-6 rounded-2xl border border-white/5">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-purple-400" /> Realtime Global Orders Stream
            </h3>
            {recentOrders.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-8">
                No live orders yet. As customers order from any client website, they will appear here instantly.
              </p>
            ) : (
              <div className="divide-y divide-white/5">
                {recentOrders.map((ord) => (
                  <div key={ord.id} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white text-xs">{ord.customer_name} • {ord.customer_phone}</div>
                      <div className="text-[11px] text-gray-400">Total: ₹{ord.total_amount} | Status: {ord.order_status}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/10 text-purple-300 border border-purple-500/20 font-bold uppercase">
                      {ord.payment_status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* Add Client Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 max-w-md w-full bg-[#0c1220]">
            <h3 className="text-lg font-black text-white mb-1">Add New Client Website</h3>
            <p className="text-xs text-gray-400 mb-4">Set up a new isolated client partition with automated ₹299/mo plan.</p>

            <form onSubmit={handleCreateTenant} className="space-y-3.5">
              <div>
                <label className="text-[11px] font-semibold text-gray-300 block mb-1">Business Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Sweets & Bakery"
                  value={newClient.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    const autoSlug = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
                    setNewClient(prev => ({ ...prev, name, slug: autoSlug }));
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-300 block mb-1">Subdomain Slug (Pages.dev)</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    required
                    placeholder="royal-sweets"
                    value={newClient.slug}
                    onChange={(e) => setNewClient(prev => ({ ...prev, slug: e.target.value }))}
                    className="w-full px-3 py-2 rounded-l-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                  <span className="px-3 py-2 bg-white/5 border border-l-0 border-white/10 rounded-r-xl text-xs text-gray-400 font-mono">
                    .pages.dev
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">Business Category</label>
                  <select
                    value={newClient.business_type}
                    onChange={(e) => setNewClient(prev => ({ ...prev, business_type: e.target.value as any }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="ecommerce">E-Commerce Store</option>
                    <option value="restaurant">Restaurant / Cafe</option>
                    <option value="services">Service / Clinic</option>
                    <option value="portfolio">Creator / Agency</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">Owner Name</label>
                  <input
                    type="text"
                    placeholder="Rahul Sharma"
                    value={newClient.owner_name}
                    onChange={(e) => setNewClient(prev => ({ ...prev, owner_name: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">Phone (WhatsApp)</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9876543210"
                    value={newClient.phone}
                    onChange={(e) => setNewClient(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="client@gmail.com"
                    value={newClient.email}
                    onChange={(e) => setNewClient(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold shadow-lg shadow-cyan-500/20"
                >
                  Save & Launch Site
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
