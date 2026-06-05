import { useState } from 'react';
import { ShoppingBag, Gift, Coins, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePlayAndEarn } from './PlayAndEarnContext';
import { RedemptionModal } from './RedemptionModal';

interface Voucher {
  id: string;
  brand: string;
  value: number;
  tokensRequired: number;
  image: string;
  color: string;
}

const vouchers: Voucher[] = [
  {
    id: 'amazon-5',
    brand: 'Amazon',
    value: 5,
    tokensRequired: 500,
    image: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=200',
    color: 'from-orange-500 to-yellow-500'
  },
  {
    id: 'amazon-10',
    brand: 'Amazon',
    value: 10,
    tokensRequired: 950,
    image: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=200',
    color: 'from-orange-500 to-yellow-500'
  },
  {
    id: 'psn-10',
    brand: 'PlayStation',
    value: 10,
    tokensRequired: 1000,
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=200',
    color: 'from-blue-600 to-blue-400'
  },
  {
    id: 'xbox-10',
    brand: 'Xbox',
    value: 10,
    tokensRequired: 1000,
    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=200',
    color: 'from-green-600 to-green-400'
  },
  {
    id: 'zara-15',
    brand: 'Zara',
    value: 15,
    tokensRequired: 1500,
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=200',
    color: 'from-gray-800 to-gray-600'
  },
  {
    id: 'spotify-5',
    brand: 'Spotify',
    value: 5,
    tokensRequired: 500,
    image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200',
    color: 'from-green-500 to-green-400'
  },
  {
    id: 'steam-20',
    brand: 'Steam',
    value: 20,
    tokensRequired: 1900,
    image: 'https://images.unsplash.com/photo-1556438064-2d7646166914?w=200',
    color: 'from-slate-700 to-slate-500'
  },
  {
    id: 'netflix-15',
    brand: 'Netflix',
    value: 15,
    tokensRequired: 1500,
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=200',
    color: 'from-red-600 to-red-500'
  }
];

export function RedemptionStore() {
  const { tokens, subtractTokens } = usePlayAndEarn();
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [showRedemptionModal, setShowRedemptionModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRedeem = async (voucher: Voucher) => {
    if (tokens < voucher.tokensRequired) return;
    
    setSelectedVoucher(voucher);
    setIsProcessing(true);
    setShowRedemptionModal(true);

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Subtract tokens
    subtractTokens(voucher.tokensRequired);
    setIsProcessing(false);
  };

  return (
    <div className="glass-card p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent">
            <ShoppingBag className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-display font-bold text-foreground">Reward Store</h3>
            <p className="text-sm text-muted-foreground">Redeem your tokens for real rewards</p>
          </div>
        </div>
        
        {/* Token Balance */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/50 border border-border">
          <Coins className="h-5 w-5 text-secondary" />
          <span className="text-lg font-bold text-secondary">{tokens.toLocaleString()}</span>
          <span className="text-sm text-muted-foreground">Tokens</span>
        </div>
      </div>

      {/* Voucher Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {vouchers.map((voucher) => {
          const canAfford = tokens >= voucher.tokensRequired;
          
          return (
            <div 
              key={voucher.id}
              className={`group relative rounded-xl overflow-hidden border transition-all duration-300 ${
                canAfford 
                  ? 'border-border/50 hover:border-primary/50 hover:transform hover:scale-[1.02]' 
                  : 'border-border/30 opacity-60'
              }`}
            >
              {/* Brand Header */}
              <div className={`h-16 bg-gradient-to-r ${voucher.color} flex items-center justify-center relative overflow-hidden`}>
                <span className="text-white font-bold text-lg drop-shadow-lg">{voucher.brand}</span>
                <div className="absolute inset-0 bg-black/20" />
              </div>

              {/* Content */}
              <div className="p-4 bg-card">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <Gift className="h-4 w-4 text-secondary" />
                    <span className="text-xl font-bold text-foreground">${voucher.value}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                  <Coins className="h-3.5 w-3.5 text-secondary" />
                  <span>{voucher.tokensRequired.toLocaleString()} Tokens</span>
                </div>

                <Button 
                  size="sm" 
                  className="w-full"
                  variant={canAfford ? "default" : "secondary"}
                  disabled={!canAfford}
                  onClick={() => handleRedeem(voucher)}
                >
                  {canAfford ? (
                    <>
                      <Gift className="h-4 w-4 mr-1" />
                      Redeem
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Need {(voucher.tokensRequired - tokens).toLocaleString()} more
                    </>
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Redemption Modal */}
      <RedemptionModal 
        isOpen={showRedemptionModal}
        onClose={() => setShowRedemptionModal(false)}
        voucher={selectedVoucher ? {
          id: selectedVoucher.id,
          brand: selectedVoucher.brand,
          thumbnail: selectedVoucher.image,
          variantLabel: `$${selectedVoucher.value}`,
          platform: 'Other',
          voucherType: 'Gift Card',
          vendor: selectedVoucher.brand,
          vendorLogo: '🎁',
          price: selectedVoucher.value,
        } : null}
      />
    </div>
  );
}
