import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle2, Copy, Gift, PartyPopper } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RedemptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  voucher: {
    id: string;
    brand: string;
    value: number;
  } | null;
  isProcessing: boolean;
}

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

export function RedemptionModal({ isOpen, onClose, voucher, isProcessing }: RedemptionModalProps) {
  const [giftCode] = useState(() => generateGiftCode());
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(giftCode);
      setCopied(true);
      toast({
        title: "Copied! 📋",
        description: "Gift code copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Copy failed",
        description: "Please copy the code manually",
        variant: "destructive"
      });
    }
  };

  if (!voucher) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md glass-card border-primary/30">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-center justify-center">
            {isProcessing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                Processing Your Reward
              </>
            ) : (
              <>
                <PartyPopper className="h-5 w-5 text-secondary" />
                Congratulations!
              </>
            )}
          </DialogTitle>
          <DialogDescription className="text-center">
            {isProcessing 
              ? "Please wait while we generate your gift code..." 
              : `Your ${voucher.brand} $${voucher.value} gift code is ready!`
            }
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center py-6">
          {isProcessing ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                <Gift className="h-10 w-10 text-primary" />
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          ) : (
            <>
              {/* Success Icon */}
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4 animate-scale-in">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>

              {/* Gift Code Display */}
              <div className="w-full p-4 rounded-xl bg-muted/50 border border-border mb-4">
                <p className="text-xs text-muted-foreground text-center mb-2">Your Gift Code</p>
                <div className="flex items-center justify-center gap-2">
                  <code className="text-xl font-mono font-bold text-secondary tracking-wider">
                    {giftCode}
                  </code>
                </div>
              </div>

              {/* Copy Button */}
              <Button 
                onClick={handleCopy}
                className="w-full gap-2"
                variant={copied ? "secondary" : "default"}
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy Code
                  </>
                )}
              </Button>

              {/* Instructions */}
              <p className="text-xs text-muted-foreground text-center mt-4">
                Redeem this code on {voucher.brand}'s website or app. 
                <br />
                <span className="text-foreground/70">Code expires in 30 days.</span>
              </p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
