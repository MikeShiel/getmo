import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Heart, Zap } from 'lucide-react';
import type { Voucher } from '@/data/mockVouchers';

interface VoucherSpotlightProps {
  vouchers: Voucher[];
}

export function VoucherSpotlight({ vouchers }: VoucherSpotlightProps) {
  const featured = vouchers.slice(0, 5);
  if (featured.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-5">
        <Zap className="h-5 w-5 text-secondary" />
        <h2 className="text-xl font-bold font-[Orbitron] uppercase tracking-wider">Featured Deals</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {featured.map((voucher) => (
          <Link
            key={voucher.id}
            to={`/vouchers/${voucher.id}`}
            className="group relative"
          >
            <div className="relative rounded-xl overflow-hidden border-2 border-border/30 hover:border-primary/50 transition-all duration-300 bg-card hover:shadow-[0_0_20px_hsl(var(--neon-primary)/0.15)]">
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={voucher.thumbnail}
                  alt={voucher.brand}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

                <button
                  className="absolute top-3 left-3 z-10 p-1.5 rounded-full bg-background/60 backdrop-blur-sm text-muted-foreground hover:text-primary transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  <Heart className="h-4 w-4" />
                </button>

                {voucher.discountPercent && (
                  <div className="absolute top-2 right-2 z-10">
                    <Badge className="bg-destructive text-destructive-foreground border-0 text-xs font-bold px-2 py-0.5 font-[Orbitron] rounded-md">
                      -{voucher.discountPercent}%
                    </Badge>
                  </div>
                )}

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

                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <span>{voucher.platform}</span>
                  <span>•</span>
                  <span>{voucher.type === 'subscriptions' ? 'Account' : 'Key'}</span>
                  <span>•</span>
                  <span>{voucher.regions?.[0]?.name?.toUpperCase() || 'GLOBAL'}</span>
                </div>

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
