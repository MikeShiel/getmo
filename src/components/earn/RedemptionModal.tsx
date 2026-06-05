import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Loader2, CheckCircle2, Copy, CreditCard, ChevronDown, Check, Apple } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { addLocalPurchasedVoucher } from '@/lib/purchasedVouchersStore';
import { cn } from '@/lib/utils';

export interface CheckoutVoucher {
  id: string;
  brand: string;
  thumbnail: string;
  variantLabel: string;
  platform: string;
  voucherType: string;
  vendor: string;
  vendorLogo: string;
  price: number;
}

interface RedemptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  voucher: CheckoutVoucher | null;
}

type Step = 'checkout' | 'processing' | 'success';
type PaymentMethod = 'apple-pay' | 'google-pay' | 'xsolla' | 'credit-card';

function generateGiftCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segments = [];
  for (let i = 0; i < 3; i++) {
    let segment = '';
    for (let j = 0; j < 4; j++) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    segments.push(segment);
  }
  return `GTM-${segments.join('-')}`;
}

const PAYMENT_METHODS: { id: PaymentMethod; label: string; icon: React.ReactNode }[] = [
  { id: 'apple-pay', label: 'Apple Pay', icon: <Apple className="h-5 w-5" /> },
  { id: 'google-pay', label: 'Google Pay', icon: <span className="text-base font-bold">G</span> },
  { id: 'xsolla', label: 'Xsolla', icon: <span className="text-base">💳</span> },
  { id: 'credit-card', label: 'Credit Card', icon: <CreditCard className="h-5 w-5" /> },
];

export function RedemptionModal({ isOpen, onClose, voucher }: RedemptionModalProps) {
  const { toast } = useToast();
  const { user } = useAuth();

  const [step, setStep] = useState<Step>('checkout');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [promoOpen, setPromoOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardName, setCardName] = useState('');
  const [giftCode, setGiftCode] = useState('');
  const [copied, setCopied] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep('checkout');
      setPaymentMethod(null);
      setPromoOpen(false);
      setPromoCode('');
      setCardNumber('');
      setCardExpiry('');
      setCardCvc('');
      setCardName('');
      setGiftCode('');
      setCopied(false);
    }
  }, [isOpen]);

  const handleApplyPromo = () => {
    if (!promoCode.trim()) return;
    toast({ title: 'Promo applied', description: `Code "${promoCode}" recognized.` });
  };

  const handlePayNow = () => {
    if (!paymentMethod || !voucher) return;
    setStep('processing');
    setTimeout(() => {
      const code = generateGiftCode();
      setGiftCode(code);

      // Record purchase to local store so it appears in My Vouchers
      if (user) {
        addLocalPurchasedVoucher({
          id: `pv-local-${Date.now()}`,
          user_id: user.id,
          voucher_id: voucher.id,
          key_code: code,
          status: 'active',
          purchased_at: new Date().toISOString(),
          expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
          redeemed_at: null,
          platform: voucher.platform,
          voucher_type: voucher.voucherType,
          variant_label: voucher.variantLabel,
          vendor: voucher.vendor,
        });
      }

      setStep('success');
    }, 2000);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(giftCode);
      setCopied(true);
      toast({ title: 'Copied! 📋', description: 'Gift code copied to clipboard' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: 'Copy failed', description: 'Please copy the code manually', variant: 'destructive' });
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) onClose();
  };

  if (!voucher) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md glass-card border-primary/30 max-h-[90vh] overflow-y-auto">
        {step === 'checkout' && (
          <>
            <DialogHeader>
              <DialogTitle className="font-[Orbitron]">Checkout</DialogTitle>
              <DialogDescription>Review your order and choose a payment method.</DialogDescription>
            </DialogHeader>

            {/* Order Summary */}
            <div className="rounded-xl border border-border/50 bg-card/60 p-3 flex items-center gap-3">
              <img
                src={voucher.thumbnail}
                alt={voucher.brand}
                className="w-14 h-14 rounded-lg object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  {voucher.brand} — {voucher.variantLabel}
                </p>
                <p className="text-xs text-muted-foreground truncate">via {voucher.vendor}</p>
              </div>
              <span className="text-base font-bold text-foreground font-[Orbitron]">
                ${voucher.price.toFixed(2)}
              </span>
            </div>

            {/* Payment Methods */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">Select Payment Method</p>
              <div className="grid grid-cols-2 gap-2">
                {PAYMENT_METHODS.map(pm => {
                  const selected = paymentMethod === pm.id;
                  return (
                    <button
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id)}
                      className={cn(
                        'flex items-center justify-center gap-2 rounded-lg border-2 px-3 py-3 text-sm font-medium transition-all',
                        selected
                          ? 'border-[#7C3AED] bg-[#1E1A40] text-foreground'
                          : 'border-border/40 bg-card/40 text-muted-foreground hover:border-primary/40 hover:text-foreground'
                      )}
                    >
                      {pm.icon}
                      {pm.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Credit Card Fields */}
            {paymentMethod === 'credit-card' && (
              <div className="space-y-2 rounded-lg border border-border/40 bg-card/40 p-3">
                <Input
                  value={cardNumber}
                  onChange={e => setCardNumber(e.target.value)}
                  placeholder="Card Number"
                  className="bg-background text-foreground"
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    value={cardExpiry}
                    onChange={e => setCardExpiry(e.target.value)}
                    placeholder="MM / YY"
                    className="bg-background text-foreground"
                  />
                  <Input
                    value={cardCvc}
                    onChange={e => setCardCvc(e.target.value)}
                    placeholder="CVC"
                    className="bg-background text-foreground"
                  />
                </div>
                <Input
                  value={cardName}
                  onChange={e => setCardName(e.target.value)}
                  placeholder="Name on Card"
                  className="bg-background text-foreground"
                />
              </div>
            )}

            {/* Promo Code */}
            <Collapsible open={promoOpen} onOpenChange={setPromoOpen}>
              <CollapsibleTrigger className="flex items-center gap-1 text-xs text-primary hover:underline">
                Have a promo code?
                <ChevronDown className={cn('h-3 w-3 transition-transform', promoOpen && 'rotate-180')} />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 flex gap-2">
                <Input
                  value={promoCode}
                  onChange={e => setPromoCode(e.target.value)}
                  placeholder="Enter promo code"
                  className="bg-background text-foreground"
                />
                <Button type="button" variant="outline" onClick={handleApplyPromo}>
                  Apply
                </Button>
              </CollapsibleContent>
            </Collapsible>

            {/* Total */}
            <div className="flex items-center justify-between border-t border-border/50 pt-3">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="text-xl font-bold text-secondary font-[Orbitron]">
                ${voucher.price.toFixed(2)}
              </span>
            </div>

            <Button
              size="lg"
              className="w-full font-[Orbitron]"
              style={{ backgroundColor: '#7C3AED' }}
              disabled={!paymentMethod}
              onClick={handlePayNow}
            >
              Pay Now
            </Button>
          </>
        )}

        {step === 'processing' && (
          <div className="py-12 flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-sm text-foreground font-medium">Processing your payment...</p>
          </div>
        )}

        {step === 'success' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-center">🎉 Congratulations!</DialogTitle>
              <DialogDescription className="text-center">
                Your {voucher.brand} {voucher.variantLabel} gift code is ready!
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col items-center py-4">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4 animate-scale-in">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>

              <div className="w-full p-4 rounded-xl bg-muted/50 border border-border mb-4">
                <p className="text-xs text-muted-foreground text-center mb-2">Your Gift Code</p>
                <div className="flex items-center justify-center gap-2">
                  <code className="text-xl font-mono font-bold text-secondary tracking-wider">
                    {giftCode}
                  </code>
                </div>
              </div>

              <Button
                onClick={handleCopy}
                className="w-full gap-2"
                variant={copied ? 'secondary' : 'default'}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy Code
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Redeem this code on {voucher.vendor}'s website or app.
                <br />
                <span className="text-foreground/70">Code expires in 30 days.</span>
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
