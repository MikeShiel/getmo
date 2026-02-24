import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Zap } from 'lucide-react';
import type { Voucher } from '@/data/mockVouchers';

interface VoucherSpotlightProps {
  vouchers: Voucher[];
}

export function VoucherSpotlight({ vouchers }: VoucherSpotlightProps) {
  if (vouchers.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Zap className="h-5 w-5 text-secondary" />
        <h2 className="text-xl font-bold font-[Orbitron] uppercase tracking-wider">Legendary Drops</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vouchers.map((voucher, i) => (
          <Link
            key={voucher.id}
            to={`/vouchers/${voucher.id}`}
            className={`group relative block overflow-hidden rounded-2xl ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
          >
            {/* Background image */}
            <div className={`relative ${i === 0 ? 'aspect-[16/9]' : 'aspect-[16/7]'} overflow-hidden`}>
              <img
                src={voucher.thumbnail}
                alt={voucher.brand}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

              {/* Shimmer effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 shimmer" />
              </div>

              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/60 transition-colors duration-300 group-hover:shadow-[inset_0_0_30px_hsl(var(--neon-primary)/0.15)]" />
            </div>

            {/* Discount badge */}
            {voucher.discountPercent && (
              <div className="absolute top-4 right-4 z-10">
                <Badge className="bg-secondary text-secondary-foreground border-0 text-sm font-bold px-3 py-1 font-[Orbitron] shadow-lg">
                  -{voucher.discountPercent}%
                </Badge>
              </div>
            )}

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
              {/* Tags */}
              <div className="flex gap-1.5 mb-2">
                {voucher.tags?.map(tag => (
                  <Badge key={tag} className="text-[10px] uppercase tracking-widest bg-primary/60 text-primary-foreground border-0 backdrop-blur-sm">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h3 className={`font-bold font-[Orbitron] text-foreground ${i === 0 ? 'text-3xl' : 'text-xl'}`}>
                {voucher.brand}
              </h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{voucher.description}</p>

              <div className="flex items-center justify-between mt-3">
                <span className="text-sm font-semibold text-secondary">
                  From {voucher.variants[0].pointsCost.toLocaleString()} pts
                </span>
                <span className="text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1">
                  <Zap className="h-3 w-3" /> Claim Now
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
