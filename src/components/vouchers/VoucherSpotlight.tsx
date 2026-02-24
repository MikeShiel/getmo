import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Heart } from 'lucide-react';
import type { Voucher } from '@/data/mockVouchers';

interface VoucherSpotlightProps {
  vouchers: Voucher[];
}

export function VoucherSpotlight({ vouchers }: VoucherSpotlightProps) {
  const featured = vouchers.slice(0, 4);
  if (featured.length === 0) return null;

  return (
    <section className="relative overflow-hidden">
      {/* Hero banner background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_60%)]" />

      <div className="container mx-auto px-4 py-10 relative z-10">
        {/* Banner headline */}
        <div className="mb-8 max-w-xl">
          <h1 className="text-3xl md:text-4xl font-bold font-[Orbitron] uppercase tracking-wide text-foreground leading-tight">
            Redeem Your <span className="text-primary">Points</span>
          </h1>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            Grab gift cards, game keys & subscriptions — instantly delivered.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {featured.map((voucher) => (
            <Link
              key={voucher.id}
              to={`/vouchers/${voucher.id}`}
              className="group relative"
            >
              <div className="relative rounded-2xl overflow-hidden border-2 border-border/40 hover:border-primary/60 transition-all duration-300 bg-card hover:shadow-[0_0_30px_hsl(var(--neon-primary)/0.2)]">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={voucher.thumbnail}
                    alt={voucher.brand}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <button
                    className="absolute top-4 left-4 z-10 p-2 rounded-full bg-background/50 backdrop-blur-sm text-muted-foreground hover:text-primary transition-colors"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Heart className="h-5 w-5" />
                  </button>

                  {voucher.discountPercent && (
                    <div className="absolute top-0 right-0 z-10">
                      <div className="bg-destructive text-destructive-foreground text-sm font-bold font-[Orbitron] px-4 py-2 rounded-bl-xl">
                        -{voucher.discountPercent}%
                      </div>
                    </div>
                  )}

                  {voucher.type === 'subscriptions' && (
                    <div className="absolute top-3 left-16 z-10">
                      <Badge className="bg-muted/80 text-foreground border-0 text-[10px] uppercase tracking-widest backdrop-blur-sm px-3 py-1">
                        Account
                      </Badge>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                    <h3 className="font-bold text-lg md:text-xl text-white leading-tight font-[Orbitron] uppercase mb-2 drop-shadow-lg">
                      {voucher.brand}
                      {voucher.variants[0] && (
                        <span className="block text-base font-semibold normal-case opacity-90">
                          {voucher.variants[0].label}
                        </span>
                      )}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-white/70">
                      <span>{voucher.platform}</span>
                      <span>•</span>
                      <span>{voucher.type === 'subscriptions' ? 'Account' : 'Key'}</span>
                      <span>•</span>
                      <span>{voucher.regions?.[0]?.name?.toUpperCase() || 'GLOBAL'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
