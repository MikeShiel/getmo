import { Layout } from '@/components/layout/Layout';
import { VoucherCard } from '@/components/vouchers/VoucherCard';
import { getVouchersByCategory } from '@/data/mockVouchers';
import { Ticket, TrendingUp, Clock, Sparkles } from 'lucide-react';

const sections = [
  {
    key: 'best-sellers' as const,
    title: 'Best Sellers',
    subtitle: 'Fan-favorite vouchers that never miss.',
    icon: TrendingUp,
  },
  {
    key: 'trending' as const,
    title: 'Trending Now',
    subtitle: 'What the community is claiming right now.',
    icon: Sparkles,
  },
  {
    key: 'recently-added' as const,
    title: 'Recently Added',
    subtitle: 'Fresh drops—be the first to grab them.',
    icon: Clock,
  },
];

export default function VoucherStore() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 gradient-neon-subtle opacity-50" />
        <div className="container mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 mb-6">
            <Ticket className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Voucher E-Store</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-[Orbitron] mb-4">
            Boost Your <span className="neon-text-secondary">Balance</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Turn your hard-earned points into real rewards. Browse, pick your tier, and claim instantly.
          </p>
        </div>
      </section>

      {/* Sections */}
      <div className="container mx-auto px-4 pb-20 space-y-16">
        {sections.map(({ key, title, subtitle, icon: Icon }) => {
          const vouchers = getVouchersByCategory(key);
          if (vouchers.length === 0) return null;

          return (
            <section key={key}>
              <div className="flex items-center gap-3 mb-2">
                <Icon className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold font-[Orbitron]">{title}</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-6">{subtitle}</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {vouchers.map(v => (
                  <VoucherCard key={v.id} voucher={v} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </Layout>
  );
}
