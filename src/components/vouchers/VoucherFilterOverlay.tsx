import { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { VoucherCard } from './VoucherCard';
import { searchVouchers, type VoucherType } from '@/data/mockVouchers';
import { Search, X, Gamepad2, Gift, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VoucherFilterOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const typeFilters: { value: VoucherType | 'all'; label: string; icon: React.ElementType }[] = [
  { value: 'all', label: 'All', icon: Search },
  { value: 'games', label: 'Games', icon: Gamepad2 },
  { value: 'gift-cards', label: 'Gift Cards', icon: Gift },
  { value: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
];

export function VoucherFilterOverlay({ open, onOpenChange }: VoucherFilterOverlayProps) {
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState<VoucherType | 'all'>('all');
  const [maxPrice, setMaxPrice] = useState(10000);

  const results = useMemo(() => {
    return searchVouchers(
      query,
      selectedType === 'all' ? undefined : selectedType,
      maxPrice
    );
  }, [query, selectedType, maxPrice]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl h-[85vh] flex flex-col p-0 glass-card border-border/50 gap-0">
        <DialogHeader className="p-6 pb-4 border-b border-border/50 shrink-0">
          <DialogTitle className="font-[Orbitron] text-xl">Find Your Reward</DialogTitle>

          {/* Search bar */}
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search the store..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-border/50"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>
        </DialogHeader>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar filters */}
          <div className="w-56 shrink-0 border-r border-border/50 p-4 space-y-6 overflow-y-auto hidden md:block">
            {/* Category */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Category</p>
              <div className="space-y-1">
                {typeFilters.map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => setSelectedType(value)}
                    className={cn(
                      'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors',
                      selectedType === value
                        ? 'bg-primary/20 text-primary font-medium'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price slider */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Max Points</p>
              <Slider
                value={[maxPrice]}
                onValueChange={([val]) => setMaxPrice(val)}
                min={500}
                max={10000}
                step={500}
                className="mb-2"
              />
              <p className="text-sm text-foreground font-medium">{maxPrice.toLocaleString()} pts</p>
            </div>
          </div>

          {/* Mobile type filters */}
          <div className="md:hidden flex gap-2 px-4 pt-3 pb-2 overflow-x-auto shrink-0 absolute top-[140px] left-0 right-0 z-10 bg-card/80 backdrop-blur-sm">
            {typeFilters.map(({ value, label }) => (
              <Badge
                key={value}
                className={cn(
                  'cursor-pointer whitespace-nowrap',
                  selectedType === value ? 'bg-primary text-primary-foreground' : 'bg-muted/50 text-muted-foreground'
                )}
                onClick={() => setSelectedType(value)}
              >
                {label}
              </Badge>
            ))}
          </div>

          {/* Results grid */}
          <div className="flex-1 overflow-y-auto p-4">
            {results.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {results.map(v => (
                  <div key={v.id} onClick={() => onOpenChange(false)}>
                    <VoucherCard voucher={v} compact />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Search className="h-12 w-12 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">No vouchers match your filters.</p>
                <Button variant="ghost" size="sm" className="mt-2" onClick={() => { setQuery(''); setSelectedType('all'); setMaxPrice(10000); }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
