import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import type { Voucher } from '@/data/mockVouchers';

interface VoucherCardProps {
  voucher: Voucher;
}

export function VoucherCard({ voucher }: VoucherCardProps) {
  const lowestVariant = voucher.variants[0];

  return (
    <Link to={`/vouchers/${voucher.id}`} className="group block">
      <div className="glass-card overflow-hidden transition-all duration-300 group-hover:scale-[1.03] group-hover:-translate-y-1 group-hover:shadow-[0_0_30px_hsl(var(--neon-primary)/0.3)]">
        {/* Thumbnail */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={voucher.thumbnail}
            alt={voucher.brand}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          {/* Overlay glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Tags */}
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

        {/* Info */}
        <div className="p-4">
          <h3 className="font-bold text-foreground text-lg truncate font-[Orbitron]">
            {voucher.brand}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {voucher.description}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-secondary">
              From {lowestVariant.pointsCost.toLocaleString()} pts
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
