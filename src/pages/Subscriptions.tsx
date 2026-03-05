import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  Crown,
  Gamepad2,
  Check,
  X,
  Cloud,
  Monitor,
  Save,
  Sparkles,
  Zap,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface PlanFeature {
  label: string;
  casual: boolean;
  plus: boolean;
}

const comparisonFeatures: PlanFeature[] = [
  { label: 'No Ads / Interruptions', casual: true, plus: true },
  { label: '2000+ Casual Games', casual: true, plus: true },
  { label: 'New Games Weekly', casual: true, plus: true },
  { label: '150+ Premium Titles', casual: false, plus: true },
  { label: 'Cloud Gaming', casual: false, plus: true },
  { label: 'Cross-Device Saves', casual: false, plus: true },
  { label: 'Enhanced Graphics', casual: false, plus: true },
];

export default function Subscriptions() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [downgradeOpen, setDowngradeOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const isPremium = profile?.is_premium ?? false;
  const billingEndDate = 'April 5, 2026'; // Mock date

  const handleUpgrade = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    setUpgradeOpen(true);
  };

  const confirmUpgrade = () => {
    setUpgradeOpen(false);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    toast({
      title: '🎮 Level Up! You're now Games Now Plus!',
      description:
        'You've unlocked Cloud Gaming and 150+ Premium titles instantly.',
    });
  };

  const handleDowngrade = () => {
    setDowngradeOpen(true);
  };

  const confirmDowngrade = () => {
    setDowngradeOpen(false);
    toast({
      title: 'Subscription updated',
      description: `You'll keep Games Now Plus benefits until ${billingEndDate}. Your plan will then switch to Games Now automatically.`,
    });
  };

  return (
    <Layout>
      {/* Confetti overlay */}
      {showConfetti && (
        <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10%',
                animationDelay: `${Math.random() * 1.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                width: `${6 + Math.random() * 8}px`,
                height: `${6 + Math.random() * 8}px`,
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                background: [
                  'hsl(268 84% 45%)',
                  'hsl(45 99% 55%)',
                  'hsl(150 80% 45%)',
                  'hsl(340 80% 55%)',
                  'hsl(200 80% 50%)',
                ][Math.floor(Math.random() * 5)],
              }}
            />
          ))}
        </div>
      )}

      <section className="container mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 text-sm">
            Choose Your Play Style
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold font-[Orbitron] text-foreground mb-4">
            Subscriptions
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            From casual fun to console-grade power — pick the plan that fits
            your game.
          </p>
        </div>

        {/* Plan Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16 md:mb-20">
          {/* Games Now — Casual */}
          <div className="glass-card rounded-2xl p-6 md:p-8 flex flex-col justify-between border border-border">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Gamepad2 className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold font-[Orbitron] text-foreground">
                  Games Now
                </h2>
              </div>
              <p className="text-muted-foreground text-sm mb-6">
                The Casual Pick — Ideal for quick breaks and fun on the go.
              </p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">$3</span>
                <span className="text-muted-foreground">/month</span>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  'Access to 2000+ casual games',
                  'New games every week',
                  'No ads, no interruptions',
                  'Cancel anytime — No lock-in',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {isPremium ? (
              <Button
                variant="outline"
                className="w-full"
                onClick={handleDowngrade}
              >
                Switch to Games Now
              </Button>
            ) : (
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() =>
                  user
                    ? toast({
                        title: 'You're on Games Now',
                        description: 'This is your current plan.',
                      })
                    : navigate('/auth')
                }
              >
                {user ? 'Current Plan' : 'Get Started'}
              </Button>
            )}
          </div>

          {/* Games Now Plus — Pro */}
          <div className="relative glass-card rounded-2xl p-6 md:p-8 flex flex-col justify-between animated-border neon-glow-primary">
            <div className="absolute -top-3 right-6">
              <Badge className="bg-secondary text-secondary-foreground font-bold text-xs px-3 py-1 shadow-lg">
                👑 BEST VALUE
              </Badge>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg gradient-neon">
                  <Crown className="h-6 w-6 text-primary-foreground" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold font-[Orbitron] neon-text-primary">
                  Games Now Plus
                </h2>
              </div>
              <p className="text-muted-foreground text-sm mb-6">
                The Ultimate Choice — Console power in your pocket.
              </p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">$5</span>
                <span className="text-muted-foreground">/month</span>
              </div>

              <p className="text-xs text-muted-foreground mb-4 italic">
                Everything in Games Now, plus:
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  '150+ Premium-quality games',
                  'Cloud gaming — no downloads required',
                  'Console-grade titles',
                  'Save your progress & level up',
                  'Enhanced graphics & gameplay',
                  'Seamless play across devices',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Sparkles className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                    <span className="text-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {isPremium ? (
              <Button
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold"
                disabled
              >
                Current Plan ✓
              </Button>
            ) : (
              <Button
                className="w-full gradient-neon text-primary-foreground font-bold neon-glow-primary hover:opacity-90 py-6 text-base"
                onClick={handleUpgrade}
              >
                <Zap className="h-5 w-5 mr-1" />
                Upgrade Now
              </Button>
            )}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold font-[Orbitron] text-foreground text-center mb-8">
            Side-by-Side Comparison
          </h2>

          <div className="glass-card rounded-2xl overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-3 border-b border-border">
              <div className="p-4 text-sm font-semibold text-muted-foreground">
                Feature
              </div>
              <div className="p-4 text-sm font-semibold text-center text-foreground">
                Games Now
              </div>
              <div className="p-4 text-sm font-semibold text-center neon-text-primary">
                Games Now Plus
              </div>
            </div>

            {/* Table Rows */}
            {comparisonFeatures.map((feat, idx) => (
              <div
                key={feat.label}
                className={cn(
                  'grid grid-cols-3 items-center',
                  idx !== comparisonFeatures.length - 1 &&
                    'border-b border-border/50'
                )}
              >
                <div className="p-4 text-sm text-foreground">{feat.label}</div>
                <div className="p-4 flex justify-center">
                  {feat.casual ? (
                    <Check className="h-5 w-5 text-primary" />
                  ) : (
                    <X className="h-5 w-5 text-muted-foreground/40" />
                  )}
                </div>
                <div className="p-4 flex justify-center">
                  {feat.plus ? (
                    <Check className="h-5 w-5 text-secondary" />
                  ) : (
                    <X className="h-5 w-5 text-muted-foreground/40" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upgrade Dialog */}
      <Dialog open={upgradeOpen} onOpenChange={setUpgradeOpen}>
        <DialogContent className="glass-card border-primary/30 max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 blur-xl bg-gradient-to-r from-primary to-secondary opacity-50" />
                <div className="relative gradient-neon p-4 rounded-full">
                  <Zap className="h-10 w-10 text-primary-foreground" />
                </div>
              </div>
            </div>
            <DialogTitle className="text-2xl font-[Orbitron] text-center neon-text-primary">
              Level Up!
            </DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              You're unlocking Cloud Gaming and 150+ Premium titles instantly.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-4">
            <div className="glass-card rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">New plan</span>
                <span className="text-foreground font-semibold">
                  Games Now Plus
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Monthly total</span>
                <span className="text-foreground font-bold text-lg">
                  $5.00/mo
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Prorated charge today</span>
                <span className="text-secondary font-semibold">$2.00</span>
              </div>
            </div>

            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
              <span>
                Your payment is securely processed. We never store your full
                card details.
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              onClick={confirmUpgrade}
              className="w-full gradient-neon text-primary-foreground font-bold py-6 neon-glow-primary"
            >
              Confirm Purchase — $2.00 today
            </Button>
            <Button
              variant="ghost"
              onClick={() => setUpgradeOpen(false)}
              className="w-full"
            >
              Maybe Later
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Downgrade Dialog */}
      <Dialog open={downgradeOpen} onOpenChange={setDowngradeOpen}>
        <DialogContent className="glass-card border-border max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="relative p-4 rounded-full bg-muted">
                <Gamepad2 className="h-10 w-10 text-primary" />
              </div>
            </div>
            <DialogTitle className="text-2xl font-[Orbitron] text-center text-foreground">
              Finding the Right Fit
            </DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              We've got you. You'll keep your Games Now Plus benefits until the
              end of your current billing cycle.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-4">
            <div className="glass-card rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Benefits active until
                </span>
                <span className="text-foreground font-semibold">
                  {billingEndDate}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">New plan after</span>
                <span className="text-foreground font-semibold">
                  Games Now — $3.00/mo
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2 text-xs text-destructive/80 bg-destructive/10 rounded-lg p-3">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>
                You will lose access to your saved progress in premium titles
                and cloud gaming features once the change takes effect.
              </span>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Your subscription will switch to Games Now automatically on{' '}
              <span className="text-foreground font-medium">
                {billingEndDate}
              </span>
              . No further action is needed.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              onClick={confirmDowngrade}
              variant="outline"
              className="w-full"
            >
              Confirm Downgrade
            </Button>
            <Button
              onClick={() => setDowngradeOpen(false)}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Keep Games Now Plus
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti-fall 3s ease-in forwards;
        }
      `}</style>
    </Layout>
  );
}
