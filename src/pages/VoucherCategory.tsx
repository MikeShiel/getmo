import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { VoucherCard } from '@/components/vouchers/VoucherCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockVouchers, getProductFromPrice, type Voucher, webshops } from '@/data/mockVouchers';
import { ArrowLeft, Search, X, LayoutGrid, List, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

// Category config mapping slug → filter logic & display name
const categoryConfig: Record<string, { title: string; filter: (v: Voucher) => boolean }> = {
  gaming: { title: 'Gaming', filter: v => v.type === 'games' },
  'gift-cards': { title: 'Gift Cards', filter: v => v.type === 'gift-cards' },
  webshops: { title: 'Webshops', filter: () => false },
  subscriptions: { title: 'Subscriptions', filter: v => v.type === 'subscriptions' },
  pc: { title: 'PC', filter: v => v.platform === 'PC' },
  playstation: { title: 'PlayStation', filter: v => v.platform === 'PlayStation' },
  xbox: { title: 'Xbox', filter: v => v.platform === 'Xbox' },
  nintendo: { title: 'Nintendo', filter: v => v.platform === 'Switch' },
  mobile: { title: 'Mobile', filter: v => v.platform === 'Android' || v.platform === 'iOS' },
  'best-sellers': { title: 'Best Sellers', filter: v => v.category === 'best-sellers' },
  trending: { title: 'Trending Now', filter: v => v.category === 'trending' },
  'recently-added': { title: 'Recently Added', filter: v => v.category === 'recently-added' },
  all: { title: 'All Vouchers', filter: () => true },
};

const platformOptions = ['All', 'PC', 'PlayStation', 'Xbox', 'Switch', 'Multi', 'Android', 'iOS'];
const typeOptions = [
  { value: 'all', label: 'All Types' },
  { value: 'games', label: 'Games' },
  { value: 'gift-cards', label: 'Gift Cards' },
  { value: 'subscriptions', label: 'Subscriptions' },
];
const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name', label: 'Name A-Z' },
  { value: 'discount', label: 'Biggest Discount' },
];

export default function VoucherCategory() {
  const { slug } = useParams<{ slug: string }>();
  const config = categoryConfig[slug || ''] || categoryConfig.all;

  const [query, setQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [selectedType, setSelectedType] = useState('all');
  const [maxPrice, setMaxPrice] = useState(200);
  const [sortBy, setSortBy] = useState('popular');
  const [gridView, setGridView] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const results = useMemo(() => {
    let filtered = mockVouchers.filter(config.filter);

    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(v => v.brand.toLowerCase().includes(q) || v.description.toLowerCase().includes(q));
    }
    if (selectedPlatform !== 'All') {
      filtered = filtered.filter(v => v.platform === selectedPlatform);
    }
    if (selectedType !== 'all') {
      filtered = filtered.filter(v => v.type === selectedType);
    }
    filtered = filtered.filter(v => {
      const cheapest = getProductFromPrice(v);
      return cheapest ? cheapest.price <= maxPrice : true;
    });

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (getProductFromPrice(a)?.price ?? 0) - (getProductFromPrice(b)?.price ?? 0));
        break;
      case 'price-high':
        filtered.sort((a, b) => (getProductFromPrice(b)?.price ?? 0) - (getProductFromPrice(a)?.price ?? 0));
        break;
      case 'name':
        filtered.sort((a, b) => a.brand.localeCompare(b.brand));
        break;
      case 'discount':
        filtered.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
        break;
    }

    return filtered;
  }, [config, query, selectedPlatform, selectedType, maxPrice, sortBy]);

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Search</p>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="pl-9 h-9 bg-muted/50 border-border/50 text-sm"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2">
              <X className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>
      </div>

      {/* Type */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Type</p>
        <div className="space-y-1">
          {typeOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => setSelectedType(opt.value)}
              className={cn(
                'w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors',
                selectedType === opt.value
                  ? 'bg-primary/20 text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Platform */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Platform</p>
        <div className="flex flex-wrap gap-1.5">
          {platformOptions.map(p => (
            <button
              key={p}
              onClick={() => setSelectedPlatform(p)}
              className={cn(
                'px-2.5 py-1 rounded-lg text-xs font-medium transition-colors border',
                selectedPlatform === p
                  ? 'bg-primary/20 text-primary border-primary/40'
                  : 'text-muted-foreground border-border/50 hover:border-primary/30 hover:text-foreground'
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Max Price (USD)</p>
        <Slider
          value={[maxPrice]}
          onValueChange={([val]) => setMaxPrice(val)}
          min={5}
          max={200}
          step={5}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>$5</span>
          <span className="font-medium text-foreground">${maxPrice}</span>
          <span>$200</span>
        </div>
      </div>

      {/* Reset */}
      <Button
        variant="ghost"
        size="sm"
        className="w-full text-xs"
        onClick={() => { setQuery(''); setSelectedPlatform('All'); setSelectedType('all'); setMaxPrice(200); }}
      >
        Reset Filters
      </Button>
    </div>
  );

  return (
    <Layout>
      {/* Top bar */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-3">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-3">
            <Link to="/store" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" />
              Store
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">{config.title}</span>
          </div>

          {/* Title + Sort + View Toggle */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold font-[Orbitron]">{config.title}</h1>
              <p className="text-xs text-muted-foreground mt-0.5">{results.length} items found</p>
            </div>
            <div className="flex items-center gap-2">
              {/* Mobile filter toggle */}
              <Button
                variant="outline"
                size="sm"
                className="md:hidden gap-1.5"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filters
              </Button>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px] h-9 text-xs bg-muted/50 border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value} className="text-xs">
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="hidden sm:flex items-center border border-border/50 rounded-lg overflow-hidden">
                <button
                  onClick={() => setGridView(true)}
                  className={cn('p-1.5 transition-colors', gridView ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground')}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setGridView(false)}
                  className={cn('p-1.5 transition-colors', !gridView ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground')}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile filters drawer */}
      {showMobileFilters && (
        <div className="md:hidden border-b border-border/50 bg-card/80 backdrop-blur-sm px-4 py-4 animate-fade-in">
          <FilterSidebar />
        </div>
      )}

      {/* Main content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop sidebar */}
          <aside className="hidden md:block w-56 shrink-0">
            <div className="sticky top-36 glass-card rounded-xl p-4 border border-border/30">
              <FilterSidebar />
            </div>
          </aside>

          {/* Results */}
          <main className="flex-1 min-w-0">
            {results.length > 0 ? (
              <div
                className={cn(
                  'gap-3',
                  gridView
                    ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                    : 'flex flex-col'
                )}
              >
                {results.map(v =>
                  gridView ? (
                    <VoucherCard key={v.id} voucher={v} compact />
                  ) : (
                    <Link key={v.id} to={`/store/${v.id}`} className="group">
                      <div className="glass-card flex items-center gap-4 p-3 rounded-xl hover:border-primary/40 transition-all border border-transparent hover:shadow-[0_0_15px_hsl(var(--neon-primary)/0.15)]">
                        <img
                          src={v.thumbnail}
                          alt={v.brand}
                          className="w-16 h-16 rounded-lg object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-sm font-[Orbitron] truncate">{v.brand}</h3>
                          <p className="text-xs text-muted-foreground truncate">{v.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-medium text-muted-foreground bg-muted/60 px-1.5 py-0.5 rounded">{v.platform}</span>
                            {v.discountPercent && (
                              <span className="text-xs font-bold text-secondary">-{v.discountPercent}%</span>
                            )}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-bold text-secondary">
                            From ${getProductFromPrice(v)?.price.toFixed(2) ?? '—'}
                          </p>
                          <p className="text-[10px] text-primary opacity-0 group-hover:opacity-100 transition-opacity">Claim →</p>
                        </div>
                      </div>
                    </Link>
                  )
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Search className="h-12 w-12 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground mb-2">No vouchers match your filters.</p>
                <Button variant="ghost" size="sm" onClick={() => { setQuery(''); setSelectedPlatform('All'); setSelectedType('all'); setMaxPrice(200); }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
}
