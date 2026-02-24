import { useState, useMemo, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { VoucherCard } from '@/components/vouchers/VoucherCard';
import { VoucherSpotlight } from '@/components/vouchers/VoucherSpotlight';
import { Button } from '@/components/ui/button';
import { mockVouchers, getVouchersByCategory, getSpotlightVouchers } from '@/data/mockVouchers';
import { TrendingUp, Clock, Sparkles, Search, SlidersHorizontal, Gamepad2, Gift, CreditCard, Monitor, ChevronRight, X } from 'lucide-react';

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
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const allSpotlight = getSpotlightVouchers();
  const discounted = mockVouchers.filter(v => v.discountPercent && !v.spotlight);
  const spotlightVouchers = [...allSpotlight, ...discounted].slice(0, 12);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return mockVouchers.filter(
      v =>
        v.brand.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        v.platform.toLowerCase().includes(q) ||
        v.tags?.some(t => t.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const isSearching = searchQuery.trim().length > 0;

  // Close search on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchQuery('');
        searchRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <Layout>
      {/* Sticky search bar */}
      <div className="sticky top-16 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <div className="flex-1 relative flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              ref={searchRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              placeholder="Search vouchers..."
              className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground hover:border-primary/40 focus:border-primary/60 focus:outline-none transition-colors text-sm"
            />
            {isSearching && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-border/50"
            onClick={() => navigate('/vouchers/category/all')}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
          </Button>
        </div>
      </div>

      {/* Search Results */}
      {isSearching ? (
        <div className="container mx-auto px-4 py-8">
          <p className="text-sm text-muted-foreground mb-4">
            {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "<span className="text-foreground font-medium">{searchQuery}</span>"
          </p>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
              {searchResults.map(v => (
                <VoucherCard key={v.id} voucher={v} compact />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-muted-foreground">No vouchers found. Try a different search.</p>
            </div>
          )}
        </div>
      ) : (
        <>
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
        </>
      )}
    </Layout>
  );
}
