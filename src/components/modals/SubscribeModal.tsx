import { Check, Crown, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from '@/hooks/use-toast';

interface SubscribeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SubscribeModal({ open, onOpenChange }: SubscribeModalProps) {
  const { t } = useTheme();

  const handleSubscribe = () => {
    // Mock subscription - just show a toast for now
    toast({
      title: "Premium Activated! 🎮",
      description: "Mock subscription successful. In production, this would connect to Stripe.",
    });
    onOpenChange(false);
  };

  const features = [
    t('subscribe.features.unlimited'),
    t('subscribe.features.exclusive'),
    t('subscribe.features.noAds'),
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-primary/30 max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 blur-xl bg-gradient-neon opacity-50" />
              <div className="relative bg-gradient-neon p-4 rounded-full">
                <Crown className="h-10 w-10 text-white" />
              </div>
            </div>
          </div>
          <DialogTitle className="text-2xl font-display text-center neon-text-pink">
            {t('subscribe.title')}
          </DialogTitle>
          <p className="text-muted-foreground text-center">
            {t('subscribe.subtitle')}
          </p>
        </DialogHeader>

        {/* Price */}
        <div className="text-center py-6">
          <span className="text-5xl font-bold text-foreground">$5</span>
          <span className="text-muted-foreground">/month</span>
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <div className="bg-primary/20 rounded-full p-1">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <span className="text-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="flex flex-col gap-3">
          <Button 
            onClick={handleSubscribe}
            className="w-full bg-gradient-neon hover:opacity-90 text-white font-semibold py-6 neon-glow-pink"
          >
            {t('subscribe.cta')}
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)}
            className="w-full"
          >
            {t('subscribe.cancel')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
