import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RedemptionModal } from '@/components/earn/RedemptionModal';
import { getVoucherById } from '@/data/mockVouchers';
import { ArrowLeft, ShieldCheck, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function VoucherDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const voucher = getVoucherById(id || '');

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [redemptionOpen, setRedemptionOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!voucher) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Voucher not found</h1>
          <Button onClick={() => navigate('/vouchers')} variant="outline">
            Back to Store
          </Button>
        </div>
      </Layout>
    );
  }

  const selectedVariant = voucher.variants.find(v => v.id === selectedVariantId) || voucher.variants[0];

  const handleCheckout = () => {
    setIsProcessing(true);
    setRedemptionOpen(true);
    // Simulate processing
    setTimeout(() => setIsProcessing(false), 2000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb */}
        <Link
          to="/vouchers"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Store
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="glass-card overflow-hidden rounded-2xl">
            <img
              src={voucher.thumbnail}
              alt={voucher.brand}
              className="w-full aspect-[4/3] object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            {/* Tags */}
            {voucher.tags && (
              <div className="flex gap-1.5 mb-3 flex-wrap">
                {voucher.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs uppercase tracking-wider">
                    {tag}
                  </Badge>
                ))}
                <Badge className="text-xs uppercase tracking-wider bg-muted/80 text-foreground border-border/50">
                  {voucher.platform}
                </Badge>
              </div>
            )}

            <h1 className="text-3xl md:text-4xl font-bold font-[Orbitron] mb-2">
              {voucher.brand}
            </h1>
            <p className="text-muted-foreground mb-6">{voucher.description}</p>

            {/* Variant Selector */}
            <div className="mb-6">
              <p className="text-sm font-medium text-foreground mb-3">Select Tier</p>
              <div className="grid grid-cols-2 gap-3">
                {voucher.variants.map(variant => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariantId(variant.id)}
                    className={cn(
                      'glass-card p-4 text-center transition-all duration-200 cursor-pointer border-2',
                      selectedVariant.id === variant.id
                        ? 'border-primary neon-glow-primary'
                        : 'border-transparent hover:border-primary/40'
                    )}
                  >
                    <span className="block text-lg font-bold font-[Orbitron] text-foreground">
                      {variant.label}
                    </span>
                    <span className="block text-sm text-secondary font-semibold mt-1">
                      {variant.pointsCost.toLocaleString()} pts
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Summary */}
            <div className="glass-card p-4 rounded-xl mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">You pay</p>
                <p className="text-2xl font-bold text-secondary font-[Orbitron]">
                  {selectedVariant.pointsCost.toLocaleString()} <span className="text-sm">pts</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">You get</p>
                <p className="text-2xl font-bold text-foreground font-[Orbitron]">
                  {selectedVariant.label}
                </p>
              </div>
            </div>

            {/* CTA */}
            <Button
              size="lg"
              className="w-full gap-2 text-lg neon-glow-primary font-[Orbitron]"
              onClick={handleCheckout}
            >
              <Zap className="h-5 w-5" />
              Buy Now
            </Button>

            {/* Trust badges */}
            <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground justify-center">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Instant delivery • Secure checkout • 30-day validity
            </div>
          </div>
        </div>
      </div>

      {/* Redemption Modal (existing Payment Gateway) */}
      <RedemptionModal
        isOpen={redemptionOpen}
        onClose={() => setRedemptionOpen(false)}
        voucher={{
          id: voucher.id,
          brand: voucher.brand,
          value: selectedVariant.dollarValue,
        }}
        isProcessing={isProcessing}
      />
    </Layout>
  );
}
