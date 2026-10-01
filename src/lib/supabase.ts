import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Tenant = {
  id: string;
  name: string;
  slug: string;
  business_type: 'ecommerce' | 'restaurant' | 'services' | 'portfolio';
  owner_name?: string;
  phone: string;
  email?: string;
  status: 'active' | 'inactive' | 'suspended';
  subscription_status: 'active' | 'due' | 'cancelled';
  monthly_price: number;
  subscription_end_date: string;
  created_at: string;
};

export type Product = {
  id: string;
  tenant_id: string;
  title: string;
  description?: string;
  price: number;
  compare_price?: number;
  image_url?: string;
  category: string;
  in_stock: boolean;
  created_at: string;
};

export type Order = {
  id: string;
  tenant_id: string;
  customer_name: string;
  customer_phone: string;
  customer_address?: string;
  order_items: {
    product_id: string;
    title: string;
    price: number;
    quantity: number;
    image_url?: string;
  }[];
  total_amount: number;
  order_status: 'new' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'cod';
  created_at: string;
};

export type TenantSettings = {
  tenant_id: string;
  logo_url?: string;
  banner_url?: string;
  theme_color: string;
  whatsapp_number?: string;
  upi_id?: string;
  address?: string;
  social_links?: Record<string, string>;
};
