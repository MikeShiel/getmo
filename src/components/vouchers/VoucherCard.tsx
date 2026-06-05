import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { getProductFromPrice, type Voucher } from '@/data/mockVouchers';

interface VoucherCardProps {
  voucher: Voucher;
  compact?: boolean;
}

export function VoucherCard({ voucher, compact = false }: VoucherCardProps) {
  const cheapest = getProductFromPrice(voucher);
  const priceLabel = cheapest ? `$${cheapest.price.toFixed(2)}` : '—';

  if (compact) {
    return (
      <Link to={`/vouchers/${voucher.id}`} className="group block">
        <div className="glass-card overflow-hidden transition-all duration-300 group-hover:scale-[1.04] group-hover:-translate-y-0.5 group-hover:shadow-[0_0_20px_hsl(var(--neon-primary)/0.25)]">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={voucher.thumbnail}
              alt={voucher.brand}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

            {/* Platform badge */}
            <Badge className="absolute top-1.5 right-1.5 text-[9px] uppercase tracking-wider bg-muted/80 text-foreground border-0 backdrop-blur-sm px-1.5 py-0.5">
              {voucher.platform}
            </Badge>

            {voucher.discountPercent && (
              <Badge className="absolute top-1.5 left-1.5 text-[9px] bg-secondary text-secondary-foreground border-0 font-bold px-1.5 py-0.5">
                -{voucher.discountPercent}%
              </Badge>
            )}

            {/* Bottom info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-2.5">
              <h3 className="font-bold text-foreground text-sm truncate font-[Orbitron]">
                {voucher.brand}
              </h3>
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-xs font-semibold text-secondary">
                  {priceLabel}
                </span>
                <span className="text-[10px] text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Claim →
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Original larger card
  return (
    <Link to={`/vouchers/${voucher.id}`} className="group block">
      <div className="glass-card overflow-hidden transition-all duration-300 group-hover:scale-[1.03] group-hover:-translate-y-1 group-hover:shadow-[0_0_30px_hsl(var(--neon-primary)/0.3)]">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={voucher.thumbnail}
            alt={voucher.brand}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {voucher.tags && voucher.tags.length > 0 && (
            <div className="absolute top-2 left-2 flex gap-1.5 flex-wrap">
              {voucher.tags.map(tag => (
                <Badge
                  key={tag}
                  className="text-[10px] uppercase tracking-wider bg-primary/80 text-primary-foreground border-0 backdrop-blur-sm"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-bold text-foreground text-lg truncate font-[Orbitron]">
            {voucher.brand}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {voucher.description}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-secondary">
              From {priceLabel}
            </span>
            <span className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Claim Now →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
