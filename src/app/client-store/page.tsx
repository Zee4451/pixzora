import DedicatedClientStore from '@/components/DedicatedClientStore';

// In standalone client deployment, the tenant slug is injected via environment variable
const clientSlug = process.env.NEXT_PUBLIC_CLIENT_SLUG || 'demo-store';

export default function StandaloneClientPage() {
  return <DedicatedClientStore tenantSlug={clientSlug} />;
}
