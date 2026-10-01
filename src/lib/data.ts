export interface WebsiteTemplate {
  id: string;
  name: string;
  category: 'ecommerce' | 'service' | 'portfolio' | 'restaurant';
  tagline: string;
  description: string;
  badge: string;
  features: string[];
  previewUrl: string;
  colorTheme: string;
}

export interface ClientWebsiteData {
  id: string;
  businessName: string;
  category: string;
  templateId: string;
  subdomain: string;
  customDomain?: string;
  ownerName: string;
  email: string;
  phone: string;
  upiId?: string;
  status: 'active' | 'suspended' | 'pending';
  planAmount: number;
  monthlyRenewalDate: string;
  autoDebitStatus: 'authorized' | 'pending' | 'failed';
  razorpaySubscriptionId?: string;
  createdAt: string;
}

export const POPULAR_TEMPLATES: WebsiteTemplate[] = [
  {
    id: 'store-express',
    name: 'QuickShop Pro',
    category: 'ecommerce',
    tagline: 'Modern eCommerce Store with Direct WhatsApp Checkout',
    description: 'Sell up to 100+ products with zero transaction cuts. Seamless cart, instant WhatsApp/UPI order routing, product catalog.',
    badge: 'Most Popular for Sellers',
    features: ['WhatsApp Direct Order', 'UPI QR & GPay integration', 'Product variants & stocks', 'Zero commission'],
    previewUrl: '/preview/store-express',
    colorTheme: 'from-emerald-500 to-teal-700'
  },
  {
    id: 'service-flow',
    name: 'OmniService & Booking',
    category: 'service',
    tagline: 'High-Converting Website for Salons, Clinics, Gyms & Agencies',
    description: 'Showcase services, pricing packages, customer testimonials, and direct phone/WhatsApp booking lead generation.',
    badge: 'Best for Local Businesses',
    features: ['Instant Lead Capture to WhatsApp', 'Interactive Service Menu', 'Google Maps & Reviews Sync', 'Click-to-Call CTAs'],
    previewUrl: '/preview/service-flow',
    colorTheme: 'from-blue-600 to-indigo-800'
  },
  {
    id: 'creator-luxe',
    name: 'Luxe Portfolio & Studio',
    category: 'portfolio',
    tagline: 'Elite Portfolio for Creators, Freelancers, Consultants & Photographers',
    description: 'Sleek dark-mode aesthetic, client case studies, social links, and enquiry booking calendar.',
    badge: 'Creator Favorite',
    features: ['High-Res Image Grid', 'Project Case Studies', 'Social Media Hub', 'Direct Consultation Link'],
    previewUrl: '/preview/creator-luxe',
    colorTheme: 'from-purple-600 to-pink-700'
  },
  {
    id: 'dine-hub',
    name: 'Bistro & Cafe Menu',
    category: 'restaurant',
    tagline: 'Interactive Digital Menu & Table Reservation for Food Outlets',
    description: 'QR-compatible mobile menu, daily specials, table reservation forms, and food delivery links.',
    badge: 'Food & Dining',
    features: ['Mobile-optimized Menu', 'Table Booking Form', 'Swiggy/Zomato Outlinks', 'Location & Hours'],
    previewUrl: '/preview/dine-hub',
    colorTheme: 'from-amber-500 to-orange-700'
  }
];

export const MOCK_CLIENT_SITES: ClientWebsiteData[] = [
  {
    id: 'site-101',
    businessName: 'Aura Organic Skincare',
    category: 'ecommerce',
    templateId: 'store-express',
    subdomain: 'auraskincare',
    customDomain: 'auraskincare.in',
    ownerName: 'Priya Sharma',
    email: 'priya@auraskincare.in',
    phone: '+91 98765 43210',
    status: 'active',
    planAmount: 299,
    monthlyRenewalDate: '2026-10-15',
    autoDebitStatus: 'authorized',
    razorpaySubscriptionId: 'sub_N98xKlq1029',
    createdAt: '2026-08-15'
  },
  {
    id: 'site-102',
    businessName: 'Vanguard Fitness Studio',
    category: 'service',
    templateId: 'service-flow',
    subdomain: 'vanguardgym',
    ownerName: 'Rahul Verma',
    email: 'rahul@vanguardfit.com',
    phone: '+91 98111 22334',
    status: 'active',
    planAmount: 299,
    monthlyRenewalDate: '2026-10-22',
    autoDebitStatus: 'authorized',
    razorpaySubscriptionId: 'sub_K82jLm90182',
    createdAt: '2026-09-22'
  },
  {
    id: 'site-103',
    businessName: 'The Rustic Crust Pizzeria',
    category: 'restaurant',
    templateId: 'dine-hub',
    subdomain: 'rusticcrust',
    customDomain: 'rusticcrustcafe.com',
    ownerName: 'Arjun Mehta',
    email: 'arjun@rusticcrust.com',
    phone: '+91 97234 56789',
    status: 'active',
    planAmount: 299,
    monthlyRenewalDate: '2026-10-05',
    autoDebitStatus: 'authorized',
    razorpaySubscriptionId: 'sub_P76ytU99823',
    createdAt: '2026-09-05'
  },
  {
    id: 'site-104',
    businessName: 'DevLens Architecture Studio',
    category: 'portfolio',
    templateId: 'creator-luxe',
    subdomain: 'devlens',
    ownerName: 'Sameer Sen',
    email: 'sameer@devlens.design',
    phone: '+91 99001 12233',
    status: 'active',
    planAmount: 299,
    monthlyRenewalDate: '2026-10-11',
    autoDebitStatus: 'authorized',
    razorpaySubscriptionId: 'sub_A44tyR77112',
    createdAt: '2026-09-11'
  }
];
