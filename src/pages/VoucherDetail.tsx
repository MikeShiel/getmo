import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RedemptionModal } from '@/components/earn/RedemptionModal';
import { VoucherCard } from '@/components/vouchers/VoucherCard';
import { getVoucherById, getCheapestOffer, mockVouchers, type VendorOffer } from '@/data/mockVouchers';
import { ArrowLeft, ShieldCheck, Zap, ShoppingCart, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGuest } from '@/contexts/GuestContext';

function voucherTypeLabel(type: string): string {
  switch (type) {
    case 'games': return 'Game Key';
    case 'gift-cards': return 'Gift Card';
    case 'subscriptions': return 'Subscription';
    case 'in-game-currency':
    case 'top-ups': return 'In-Game Currency';
    default: return 'Voucher';
  }
}

export default function VoucherDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const voucher = getVoucherById(id || '');

  const { isGuest, setShowSaveProgressModal } = useGuest();

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [selectedOfferIndex, setSelectedOfferIndex] = useState<number>(0);
  const [sortMode, setSortMode] = useState<'price' | 'rating'>('price');
  const [redemptionOpen, setRedemptionOpen] = useState(false);

  if (!voucher) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Voucher not found</h1>
          <Button onClick={() => navigate('/store')} variant="outline">
            Back to Store
          </Button>
        </div>
      </Layout>
    );
  }

  const selectedVariant = voucher.variants.find(v => v.id === selectedVariantId) || voucher.variants[0];
  const offers: VendorOffer[] = selectedVariant.offers || [];

  // Sort offers: sponsored always first, then by mode
  const sortedOffers = useMemo(() => {
    const arr = [...offers];
    arr.sort((a, b) => {
      if (a.sponsored !== b.sponsored) return a.sponsored ? -1 : 1;
      return sortMode === 'price'
        ? a.price - b.price
        : b.positiveFeedback - a.positiveFeedback;
    });
    return arr;
  }, [offers, sortMode]);

  // When variant changes, auto-select cheapest offer (by index into sortedOffers)
  useEffect(() => {
    const cheapest = getCheapestOffer(selectedVariant);
    if (!cheapest) {
      setSelectedOfferIndex(0);
      return;
    }
    const idx = sortedOffers.findIndex(o => o === cheapest);
    setSelectedOfferIndex(idx >= 0 ? idx : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVariant.id, sortMode]);

  const selectedOffer = sortedOffers[selectedOfferIndex] || sortedOffers[0];

  // Similar products: same type first, then same category, excluding current
  const similarProducts = useMemo(() => {
    const sameType = mockVouchers.filter(v => v.id !== voucher.id && v.type === voucher.type);
    if (sameType.length >= 6) return sameType.slice(0, 8);
    const sameCategory = mockVouchers.filter(
      v => v.id !== voucher.id && v.category === voucher.category && !sameType.find(st => st.id === v.id)
    );
    const combined = [...sameType, ...sameCategory];
    return combined.slice(0, 8);
  }, [voucher.id, voucher.type, voucher.category]);

  const handleCheckout = () => {
    if (isGuest) {
      setShowSaveProgressModal(true);
      return;
    }
    setRedemptionOpen(true);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb */}
        <Link
          to="/store"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Store
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="space-y-4">
            <div className="glass-card overflow-hidden rounded-2xl">
              <img
                src={voucher.thumbnail}
                alt={voucher.brand}
                className="w-full aspect-[4/3] object-cover"
              />
            </div>

            {/* Redemption Instructions */}
            <div className="glass-card rounded-xl p-4 space-y-3">
              <h3 className="text-sm font-bold font-[Orbitron] text-foreground uppercase tracking-wide">
                How to Redeem
              </h3>
              <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                <li>Complete your purchase — your code will be sent via <span className="text-foreground font-medium">SMS</span> instantly.</li>
                <li>Open the <span className="text-foreground font-medium">{voucher.platform}</span> app or website and navigate to <span className="text-foreground font-medium">Redeem Code</span>.</li>
                <li>Enter the code exactly as received and confirm.</li>
                <li>Your balance or subscription will be credited immediately.</li>
              </ol>
              <p className="text-xs text-muted-foreground/70 pt-1 border-t border-border/30">
                Codes are single-use and non-refundable. Contact support if you experience any issues.
              </p>
            </div>
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
                      From ${(getCheapestOffer(variant)?.price ?? variant.dollarValue).toFixed(2)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Summary */}
            <div className="glass-card p-4 rounded-xl mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">You pay</p>
                  <p className="text-2xl font-bold text-secondary font-[Orbitron]">
                    ${selectedOffer?.price.toFixed(2) ?? '—'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">You get</p>
                  <p className="text-2xl font-bold text-foreground font-[Orbitron]">
                    {selectedVariant.label}
                  </p>
                </div>
              </div>
              {selectedOffer && (
                <p className="text-xs text-muted-foreground mt-2">
                  via <span className="text-foreground font-medium">{selectedOffer.vendor}</span> · lowest price
                </p>
              )}
            </div>

            {/* Vendor Offers */}
            {sortedOffers.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-foreground">
                    Offers from {sortedOffers.length} vendor{sortedOffers.length !== 1 ? 's' : ''}
                  </h3>
                  {sortedOffers.length > 1 && (
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-muted-foreground">Sort by:</span>
                      <button
                        onClick={() => setSortMode('price')}
                        className={cn(
                          'px-2 py-1 rounded transition-colors',
                          sortMode === 'price' ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground'
                        )}
                      >
                        Best Price
                      </button>
                      <span className="text-muted-foreground">|</span>
                      <button
                        onClick={() => setSortMode('rating')}
                        className={cn(
                          'px-2 py-1 rounded transition-colors',
                          sortMode === 'rating' ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground'
                        )}
                      >
                        Best Rating
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  {sortedOffers.map((offer, idx) => {
                    const isSelected = idx === selectedOfferIndex;
                    return (
                      <button
                        key={`${offer.vendor}-${idx}`}
                        onClick={() => setSelectedOfferIndex(idx)}
                        className={cn(
                          'w-full flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-all',
                          isSelected
                            ? 'border-[#7C3AED] bg-[#1E1A40]'
                            : 'border-border/40 bg-card/40 hover:border-primary/40'
                        )}
                      >
                        <span className="text-2xl shrink-0" aria-hidden>{offer.vendorLogo}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-foreground text-sm">{offer.vendor}</span>
                            {offer.rating === 'Excellent' && (
                              <Badge className="bg-green-500/20 text-green-400 border-0 text-[10px] uppercase tracking-wider">
                                Excellent Vendor
                              </Badge>
                            )}
                            {offer.sponsored && (
                              <Badge className="bg-secondary/20 text-secondary border-0 text-[10px] uppercase tracking-wider">
                                Sponsored
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                            <span>{offer.positiveFeedback}% positive feedback</span>
                            <span className="flex items-center gap-1">
                              <ShoppingCart className="h-3 w-3" />
                              {offer.salesCount.toLocaleString()} sold
                            </span>
                          </div>
                        </div>
                        <div className="text-right shrink-0 flex items-center gap-3">
                          <span className="text-lg font-bold text-foreground font-[Orbitron]">
                            ${offer.price.toFixed(2)}
                          </span>
                          <span
                            className={cn(
                              'h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0',
                              isSelected ? 'border-[#7C3AED] bg-[#7C3AED]' : 'border-muted-foreground/50'
                            )}
                          >
                            {isSelected && <Check className="h-2.5 w-2.5 text-white" />}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

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

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <section className="mt-12">
            <div className="mb-1">
              <h2 className="text-xl font-bold font-[Orbitron]">Similar Products</h2>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Other deals you might like</p>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {similarProducts.map(v => (
                <div key={v.id} className="min-w-[120px] sm:min-w-[140px] md:min-w-[140px] flex-shrink-0">
                  <VoucherCard voucher={v} compact />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Checkout Modal */}
      <RedemptionModal
        isOpen={redemptionOpen}
        onClose={() => setRedemptionOpen(false)}
        voucher={{
          id: voucher.id,
          brand: voucher.brand,
          thumbnail: voucher.thumbnail,
          variantLabel: selectedVariant.label,
          platform: voucher.platform,
          voucherType: voucherTypeLabel(voucher.type),
          vendor: selectedOffer?.vendor ?? 'Getmo',
          vendorLogo: selectedOffer?.vendorLogo ?? '🎁',
          price: selectedOffer?.price ?? selectedVariant.dollarValue,
        }}
      />
    </Layout>
  );
}
