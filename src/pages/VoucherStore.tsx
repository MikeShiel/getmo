import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { VoucherCard } from '@/components/vouchers/VoucherCard';
import { VoucherSpotlight } from '@/components/vouchers/VoucherSpotlight';
import { VoucherFilterOverlay } from '@/components/vouchers/VoucherFilterOverlay';
import { Button } from '@/components/ui/button';
import { getVouchersByCategory, getSpotlightVouchers } from '@/data/mockVouchers';
import { TrendingUp, Clock, Sparkles, Search, SlidersHorizontal } from 'lucide-react';

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
  const [filterOpen, setFilterOpen] = useState(false);
  const spotlightVouchers = getSpotlightVouchers();

  return (
    <Layout>
      {/* Sticky search bar */}
      <div className="sticky top-16 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setFilterOpen(true)}
            className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted/50 border border-border/50 text-muted-foreground hover:border-primary/40 transition-colors text-sm"
          >
            <Search className="h-4 w-4" />
            Search vouchers...
          </button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-border/50"
            onClick={() => setFilterOpen(true)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
          </Button>
        </div>
      </div>

      {/* Spotlight Hero */}
      <VoucherSpotlight vouchers={spotlightVouchers} />

      {/* Segmented Vertical Feed */}
      <div className="container mx-auto px-4 pb-20 space-y-12">
        {sections.map(({ key, title, subtitle, icon: Icon }) => {
          const vouchers = getVouchersByCategory(key);
          if (vouchers.length === 0) return null;

          return (
            <section key={key}>
              <div className="flex items-center gap-3 mb-1">
                <Icon className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold font-[Orbitron]">{title}</h2>
              </div>
              <p className="text-xs text-muted-foreground mb-4">{subtitle}</p>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                {vouchers.map(v => (
                  <VoucherCard key={v.id} voucher={v} compact />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Filter Overlay */}
      <VoucherFilterOverlay open={filterOpen} onOpenChange={setFilterOpen} />
    </Layout>
  );
}
