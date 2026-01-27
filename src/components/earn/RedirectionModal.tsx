import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Loader2, CheckCircle2, Smartphone, Coins, QrCode } from 'lucide-react';
import { usePlayAndEarn } from './PlayAndEarnContext';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

interface RedirectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  game: {
    id: string;
    title: string;
    tokens: number;
    requirement: string;
  } | null;
}

type ModalState = 'redirecting' | 'tracking' | 'detected' | 'closed';

// Mock QR Code Component for Desktop
function MockQRCode() {
  return (
    <div className="w-32 h-32 bg-white p-2 rounded-lg">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* QR Code pattern - simplified mock */}
        <rect x="0" y="0" width="100" height="100" fill="white"/>
        {/* Position patterns (corners) */}
        <rect x="5" y="5" width="25" height="25" fill="black"/>
        <rect x="10" y="10" width="15" height="15" fill="white"/>
        <rect x="13" y="13" width="9" height="9" fill="black"/>
        
        <rect x="70" y="5" width="25" height="25" fill="black"/>
        <rect x="75" y="10" width="15" height="15" fill="white"/>
        <rect x="78" y="13" width="9" height="9" fill="black"/>
        
        <rect x="5" y="70" width="25" height="25" fill="black"/>
        <rect x="10" y="75" width="15" height="15" fill="white"/>
        <rect x="13" y="78" width="9" height="9" fill="black"/>
        
        {/* Data pattern (random-looking squares) */}
        <rect x="35" y="5" width="5" height="5" fill="black"/>
        <rect x="45" y="5" width="5" height="5" fill="black"/>
        <rect x="55" y="5" width="5" height="5" fill="black"/>
        <rect x="35" y="15" width="5" height="5" fill="black"/>
        <rect x="50" y="15" width="5" height="5" fill="black"/>
        <rect x="60" y="15" width="5" height="5" fill="black"/>
        <rect x="40" y="25" width="5" height="5" fill="black"/>
        <rect x="55" y="25" width="5" height="5" fill="black"/>
        
        <rect x="5" y="35" width="5" height="5" fill="black"/>
        <rect x="15" y="35" width="5" height="5" fill="black"/>
        <rect x="25" y="40" width="5" height="5" fill="black"/>
        <rect x="5" y="50" width="5" height="5" fill="black"/>
        <rect x="20" y="55" width="5" height="5" fill="black"/>
        <rect x="10" y="60" width="5" height="5" fill="black"/>
        
        <rect x="35" y="35" width="5" height="5" fill="black"/>
        <rect x="45" y="40" width="5" height="5" fill="black"/>
        <rect x="55" y="35" width="5" height="5" fill="black"/>
        <rect x="40" y="50" width="5" height="5" fill="black"/>
        <rect x="50" y="55" width="5" height="5" fill="black"/>
        <rect x="60" y="45" width="5" height="5" fill="black"/>
        <rect x="35" y="60" width="5" height="5" fill="black"/>
        <rect x="55" y="60" width="5" height="5" fill="black"/>
        
        <rect x="70" y="35" width="5" height="5" fill="black"/>
        <rect x="80" y="40" width="5" height="5" fill="black"/>
        <rect x="90" y="35" width="5" height="5" fill="black"/>
        <rect x="75" y="50" width="5" height="5" fill="black"/>
        <rect x="85" y="55" width="5" height="5" fill="black"/>
        <rect x="70" y="60" width="5" height="5" fill="black"/>
        <rect x="90" y="60" width="5" height="5" fill="black"/>
        
        <rect x="35" y="70" width="5" height="5" fill="black"/>
        <rect x="45" y="75" width="5" height="5" fill="black"/>
        <rect x="55" y="70" width="5" height="5" fill="black"/>
        <rect x="40" y="85" width="5" height="5" fill="black"/>
        <rect x="60" y="80" width="5" height="5" fill="black"/>
        <rect x="50" y="90" width="5" height="5" fill="black"/>
        
        <rect x="70" y="75" width="5" height="5" fill="black"/>
        <rect x="80" y="70" width="5" height="5" fill="black"/>
        <rect x="90" y="80" width="5" height="5" fill="black"/>
        <rect x="75" y="85" width="5" height="5" fill="black"/>
        <rect x="85" y="90" width="5" height="5" fill="black"/>
      </svg>
    </div>
  );
}

export function RedirectionModal({ isOpen, onClose, game }: RedirectionModalProps) {
  const [state, setState] = useState<ModalState>('redirecting');
  const { addPendingReward } = usePlayAndEarn();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isOpen || !game) {
      setState('redirecting');
      return;
    }

    // Simulate redirect -> tracking -> detection flow
    const redirectTimer = setTimeout(() => {
      setState('tracking');
    }, 2000);

    const trackingTimer = setTimeout(() => {
      setState('detected');
    }, 5000);

    const closeTimer = setTimeout(() => {
      // Add pending reward
      addPendingReward({
        gameId: game.id,
        gameName: game.title,
        tokens: game.tokens,
        minutesRequired: 10,
        startTime: new Date()
      });

      // Show notification
      toast({
        title: "Install Detected! 🎮",
        description: `Play ${game.title} for 10 minutes to unlock ${game.tokens} Tokens!`,
      });

      onClose();
    }, 7000);

    return () => {
      clearTimeout(redirectTimer);
      clearTimeout(trackingTimer);
      clearTimeout(closeTimer);
    };
  }, [isOpen, game, addPendingReward, onClose, toast]);

  if (!game) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md glass-card border-primary/30">
        <DialogTitle className="sr-only">Installing {game.title}</DialogTitle>
        <DialogDescription className="sr-only">
          Redirecting to app store and tracking installation
        </DialogDescription>
        
        <div className="flex flex-col items-center justify-center py-8 text-center">
          {/* Animated Phone Icon */}
          <div className="relative mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center neon-glow-primary">
              <Smartphone className="h-10 w-10 text-primary-foreground" />
            </div>
            {state !== 'detected' && (
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                <Loader2 className="h-4 w-4 text-primary animate-spin" />
              </div>
            )}
            {state === 'detected' && (
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center animate-scale-in">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
            )}
          </div>

          {/* Status Text */}
          <div className="space-y-2">
            {state === 'redirecting' && (
              <>
                <h3 className="text-lg font-display font-bold text-foreground">
                  Redirecting to App Store...
                </h3>
                <p className="text-sm text-muted-foreground">
                  Please wait while we open the store
                </p>
              </>
            )}
            
            {state === 'tracking' && (
              <>
                <h3 className="text-lg font-display font-bold text-foreground">
                  Tracking Active
                </h3>
                <div className="flex items-center justify-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <p className="text-sm text-green-400 font-medium">
                    Waiting for install...
                  </p>
                </div>
              </>
            )}
            
            {state === 'detected' && (
              <>
                <h3 className="text-lg font-display font-bold text-green-400">
                  Install Detected! 🎉
                </h3>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Coins className="h-5 w-5 text-secondary" />
                  <p className="text-sm text-muted-foreground">
                    Play for <span className="text-foreground font-bold">10 minutes</span> to unlock{' '}
                    <span className="text-secondary font-bold">{game.tokens} Tokens</span>
                  </p>
                </div>
              </>
            )}
          </div>

          {/* QR Code for Desktop Users Only */}
          {!isMobile && state !== 'detected' && (
            <div className="mt-6 flex flex-col items-center gap-3">
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <QrCode className="h-4 w-4" />
                <span>Or scan with your phone</span>
              </div>
              <MockQRCode />
              <p className="text-xs text-muted-foreground max-w-[200px]">
                Scan this QR code to download directly on your mobile device
              </p>
            </div>
          )}

          {/* Progress Indicator */}
          <div className="flex items-center gap-2 mt-6">
            {['redirecting', 'tracking', 'detected'].map((step, index) => (
              <div 
                key={step}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  ['redirecting', 'tracking', 'detected'].indexOf(state) >= index
                    ? 'w-8 bg-primary'
                    : 'w-4 bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
