import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Heart, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import type { Voucher } from '@/data/mockVouchers';

interface VoucherSpotlightProps {
  vouchers: Voucher[];
}

export function VoucherSpotlight({ vouchers }: VoucherSpotlightProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Show more vouchers – use all that have discounts or are spotlight
  const featured = vouchers.length > 0 ? vouchers : [];
  if (featured.length === 0) return null;

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.6;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-secondary" />
          <h2 className="text-xl font-bold font-[Orbitron] uppercase tracking-wider">Featured Deals</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-lg bg-muted/50 border border-border/50 hover:border-primary/40 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-lg bg-muted/50 border border-border/50 hover:border-primary/40 transition-colors"
          >
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {featured.map((voucher) => (
          <Link
            key={voucher.id}
            to={`/vouchers/${voucher.id}`}
            className="group relative flex-shrink-0 w-[200px] sm:w-[220px] snap-start"
          >
            {/* Card */}
            <div className="relative rounded-xl overflow-hidden border-2 border-border/30 hover:border-primary/50 transition-all duration-300 bg-card hover:shadow-[0_0_20px_hsl(var(--neon-primary)/0.15)]">
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={voucher.thumbnail}
                  alt={voucher.brand}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

                {/* Wishlist heart */}
                <button
                  className="absolute top-3 left-3 z-10 p-1.5 rounded-full bg-background/60 backdrop-blur-sm text-muted-foreground hover:text-primary transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  <Heart className="h-4 w-4" />
                </button>

                {/* Discount badge */}
                {voucher.discountPercent && (
                  <div className="absolute top-2 right-2 z-10">
                    <Badge className="bg-destructive text-destructive-foreground border-0 text-xs font-bold px-2 py-0.5 font-[Orbitron] rounded-md">
                      -{voucher.discountPercent}%
                    </Badge>
                  </div>
                )}

                {/* Type badge (e.g. subscription) */}
                {voucher.type === 'subscriptions' && (
                  <div className="absolute top-2 left-12 z-10">
                    <Badge className="bg-muted/80 text-foreground border-0 text-[10px] uppercase tracking-wider backdrop-blur-sm">
                      Account
                    </Badge>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-3 space-y-1.5">
                <h3 className="font-bold text-sm text-foreground line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                  {voucher.brand}
                  {voucher.variants[0] && (
                    <span className="font-normal text-muted-foreground"> {voucher.variants[0].label}</span>
                  )}
                </h3>

                {/* Meta row */}
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <span>{voucher.platform}</span>
                  <span>•</span>
                  <span className="capitalize">{voucher.type === 'gift-cards' ? 'Key' : voucher.type === 'subscriptions' ? 'Account' : 'Key'}</span>
                  {voucher.regions && voucher.regions.length > 0 ? (
                    <>
                      <span>•</span>
                      <span>{voucher.regions[0].name.toUpperCase()}</span>
                    </>
                  ) : (
                    <>
                      <span>•</span>
                      <span>GLOBAL</span>
                    </>
                  )}
                </div>

                {/* Points */}
                <div className="pt-1">
                  <span className="text-sm font-bold text-secondary font-[Orbitron]">
                    {voucher.variants[0].pointsCost.toLocaleString()}
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">pts</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
