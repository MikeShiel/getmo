import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { VoucherCard } from '@/components/vouchers/VoucherCard';
import { VoucherSpotlight } from '@/components/vouchers/VoucherSpotlight';
import { VoucherFilterOverlay } from '@/components/vouchers/VoucherFilterOverlay';
import { Button } from '@/components/ui/button';
import { getVouchersByCategory, getSpotlightVouchers } from '@/data/mockVouchers';
import { TrendingUp, Clock, Sparkles, Search, SlidersHorizontal, Gamepad2, Gift, CreditCard, Monitor, ChevronRight } from 'lucide-react';

const categories = [
  { label: 'Gaming', icon: Gamepad2, slug: 'gaming' },
  { label: 'Gift Cards', icon: Gift, slug: 'gift-cards' },
  { label: 'Subscriptions', icon: CreditCard, slug: 'subscriptions' },
  { label: 'PC', icon: Monitor, slug: 'pc' },
  { label: 'PlayStation', icon: Gamepad2, slug: 'playstation' },
  { label: 'Xbox', icon: Gamepad2, slug: 'xbox' },
  { label: 'Nintendo', icon: Gamepad2, slug: 'nintendo' },
  { label: 'Mobile', icon: Monitor, slug: 'mobile' },
];

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
  // Show more featured vouchers in the hero – spotlight + any with discounts
  const allSpotlight = getSpotlightVouchers();
  const discounted = mockVouchers.filter(v => v.discountPercent && !v.spotlight);
  const spotlightVouchers = [...allSpotlight, ...discounted].slice(0, 12);

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

      {/* Category Quick-Links */}
      <section className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {categories.map(({ label, icon: Icon, slug }) => (
            <Link
              key={label}
              to={`/vouchers/category/${slug}`}
              className="flex flex-col items-center gap-2 p-3 rounded-xl glass-card border border-border/30 hover:border-primary/50 hover:shadow-[0_0_15px_hsl(var(--neon-primary)/0.15)] transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-full bg-muted/60 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <span className="text-[11px] font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center leading-tight">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Segmented Vertical Feed */}
      <div className="container mx-auto px-4 pb-20 space-y-12">
        {sections.map(({ key, title, subtitle, icon: Icon }) => {
          const vouchers = getVouchersByCategory(key);
          if (vouchers.length === 0) return null;

          return (
            <section key={key}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-bold font-[Orbitron]">{title}</h2>
                </div>
                <Link
                  to={`/vouchers/category/${key}`}
                  className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  View All
                  <ChevronRight className="h-4 w-4" />
                </Link>
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
