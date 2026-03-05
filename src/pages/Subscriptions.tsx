import { useState, useCallback } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  Crown,
  Gamepad2,
  Check,
  X,
  Sparkles,
  Zap,
  AlertTriangle,
  ShieldCheck,
  Mail,
  Loader2,
  Lock,
  Eye,
  EyeOff,
  User,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

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

type SelectedPlan = 'casual' | 'plus' | null;

export default function Subscriptions() {
  const { user, profile, signIn, signUp, updateProfile, refreshProfile } = useAuth();
  const navigate = useNavigate();

  // Modals
  const [quickEntryOpen, setQuickEntryOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [downgradeOpen, setDowngradeOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Quick entry form
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan>(null);
  const [quickEntryMode, setQuickEntryMode] = useState<'email' | 'login' | 'signup'>('email');
  const [entryEmail, setEntryEmail] = useState('');
  const [entryPassword, setEntryPassword] = useState('');
  const [entryGamerName, setEntryGamerName] = useState('');
  const [showEntryPassword, setShowEntryPassword] = useState(false);
  const [entryLoading, setEntryLoading] = useState(false);

  // Checkout
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const isPremium = profile?.is_premium ?? false;
  const billingEndDate = 'April 5, 2026';

  // --- Handlers ---

  const handlePlanClick = (plan: SelectedPlan) => {
    if (!user) {
      // Redirect to auth page with return to subscriptions
      navigate('/auth?redirect=/subscriptions');
      return;
    }
    // Logged in
    if (plan === 'plus' && !isPremium) {
      setSelectedPlan('plus');
      setCheckoutOpen(true);
    } else if (plan === 'casual' && isPremium) {
      setDowngradeOpen(true);
    }
  };

  const handleQuickEntryContinue = async () => {
    if (quickEntryMode === 'email') {
      if (!entryEmail || !entryEmail.includes('@')) {
        toast({ variant: 'destructive', title: 'Please enter a valid email.' });
        return;
      }
      setQuickEntryMode('login');
      return;
    }

    setEntryLoading(true);
    if (quickEntryMode === 'login') {
      const { error } = await signIn(entryEmail, entryPassword);
      setEntryLoading(false);
      if (error) {
        toast({ variant: 'destructive', title: 'Login failed', description: error.message });
        return;
      }
    } else {
      const { error } = await signUp(entryEmail, entryPassword, entryGamerName || undefined);
      setEntryLoading(false);
      if (error) {
        toast({ variant: 'destructive', title: 'Signup failed', description: error.message });
        return;
      }
    }

    setQuickEntryOpen(false);
    toast({ title: 'Welcome! 🎮', description: 'You are now signed in.' });

    // After login, open checkout for the selected plan
    if (selectedPlan === 'plus') {
      setTimeout(() => setCheckoutOpen(true), 500);
    }
  };

  const handleCheckoutAuthorize = useCallback(async () => {
    setCheckoutLoading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Actually update premium status in the database
    const { error } = await updateProfile({ is_premium: true } as any);
    
    setCheckoutLoading(false);
    setCheckoutComplete(true);
    
    setTimeout(() => {
      setCheckoutOpen(false);
      setCheckoutComplete(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3500);
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Please try again.",
        });
      } else {
        toast({
          title: "Welcome to the inner circle! 🎮",
          description: "Your access is now live. Enjoy 150+ premium titles and cloud gaming!",
        });
      }
    }, 1500);
  }, [updateProfile]);

  // Upgrade flow (logged in, switching from casual to plus)
  const handleUpgrade = () => {
    if (!user) {
      setSelectedPlan('plus');
      setQuickEntryOpen(true);
      return;
    }
    setSelectedPlan('plus');
    setCheckoutOpen(true);
  };

  const confirmDowngrade = async () => {
    setDowngradeOpen(false);
    await updateProfile({ is_premium: false } as any);
    toast({
      title: 'Subscription updated',
      description: `Your plan has been switched to Games Now.`,
    });
  };

  const confirmCancel = async () => {
    setCancelOpen(false);
    await updateProfile({ is_premium: false } as any);
    toast({
      title: 'Subscription cancelled',
      description: `Your access continues until ${billingEndDate}. We'll miss you!`,
    });
  };

  const planLabel = selectedPlan === 'plus' ? 'Games Now Plus 👑' : 'Games Now';
  const planPrice = selectedPlan === 'plus' ? '€5.00' : '€3.00';

  return (
    <Layout>
      {/* Confetti overlay */}
      {showConfetti && (
        <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
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
        {/* Hero Header */}
        <div className="text-center mb-12 md:mb-16">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 text-sm">
            Choose Your Play Style
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold font-[Orbitron] text-foreground mb-4">
            {user ? 'Your Subscription' : 'Ready to Level Up your Play?'}
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {user
              ? 'Manage your plan or unlock even more.'
              : 'Choose your mission. Unlock 2000+ games instantly.'}
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
                <span className="text-4xl font-bold text-foreground">€3</span>
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

            {user ? (
              isPremium ? (
                <Button variant="outline" className="w-full" onClick={() => handlePlanClick('casual')}>
                  Switch to Games Now
                </Button>
              ) : (
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled>
                  Current Plan ✓
                </Button>
              )
            ) : (
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => handlePlanClick('casual')}
              >
                Login to Subscribe
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
                <span className="text-4xl font-bold text-foreground">€5</span>
                <span className="text-muted-foreground">/month</span>
                <span className="ml-2 text-xs text-secondary font-medium">(First 7 days free!)</span>
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

            {user ? (
              isPremium ? (
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold" disabled>
                  Current Plan ✓
                </Button>
              ) : (
                <Button
                  className="w-full gradient-neon text-primary-foreground font-bold neon-glow-primary hover:opacity-90 py-6 text-base"
                  onClick={() => handlePlanClick('plus')}
                >
                  <Zap className="h-5 w-5 mr-1" />
                  Upgrade Now
                </Button>
              )
            ) : (
              <Button
                className="w-full gradient-neon text-primary-foreground font-bold neon-glow-primary hover:opacity-90 py-6 text-base"
                onClick={() => handlePlanClick('plus')}
              >
                <Zap className="h-5 w-5 mr-1" />
                Join the Club
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
            <div className="grid grid-cols-3 border-b border-border">
              <div className="p-4 text-sm font-semibold text-muted-foreground">Feature</div>
              <div className="p-4 text-sm font-semibold text-center text-foreground">Games Now</div>
              <div className="p-4 text-sm font-semibold text-center neon-text-primary">Games Now Plus</div>
            </div>
            {comparisonFeatures.map((feat, idx) => (
              <div
                key={feat.label}
                className={cn(
                  'grid grid-cols-3 items-center',
                  idx !== comparisonFeatures.length - 1 && 'border-b border-border/50'
                )}
              >
                <div className="p-4 text-sm text-foreground">{feat.label}</div>
                <div className="p-4 flex justify-center">
                  {feat.casual ? <Check className="h-5 w-5 text-primary" /> : <X className="h-5 w-5 text-muted-foreground/40" />}
                </div>
                <div className="p-4 flex justify-center">
                  {feat.plus ? <Check className="h-5 w-5 text-secondary" /> : <X className="h-5 w-5 text-muted-foreground/40" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cancel Subscription */}
        {user && (
          <div className="max-w-3xl mx-auto mt-16 pt-8 border-t border-border/50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-1">Need to cancel?</h3>
                <p className="text-xs text-muted-foreground/70">
                  You'll keep access until the end of your billing period ({billingEndDate}).
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive hover:bg-destructive/10 text-xs"
                onClick={() => setCancelOpen(true)}
              >
                Cancel Subscription
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* ====== Quick Entry Modal (Logged Out) ====== */}
      <Dialog open={quickEntryOpen} onOpenChange={setQuickEntryOpen}>
        <DialogContent className="glass-card border-primary/30 max-w-sm">
          <DialogHeader>
            <div className="flex justify-center mb-3">
              <div className="relative gradient-neon p-3 rounded-full">
                <Gamepad2 className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <DialogTitle className="text-xl font-[Orbitron] text-center text-foreground">
              {quickEntryMode === 'email'
                ? 'Join the Club'
                : quickEntryMode === 'login'
                ? 'Welcome Back'
                : 'Create Your Account'}
            </DialogTitle>
            <DialogDescription className="text-center text-muted-foreground text-sm">
              {quickEntryMode === 'email'
                ? 'Enter your email to save your progress and choose your plan.'
                : quickEntryMode === 'login'
                ? 'Sign in to continue to your plan.'
                : 'Set up your account to start playing.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            {/* Email step */}
            {quickEntryMode === 'email' && (
              <>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={entryEmail}
                    onChange={(e) => setEntryEmail(e.target.value)}
                    className="pl-10"
                    autoFocus
                  />
                </div>
                <Button
                  className="w-full gradient-neon text-primary-foreground font-semibold"
                  onClick={handleQuickEntryContinue}
                >
                  Continue
                </Button>
              </>
            )}

            {/* Login step */}
            {quickEntryMode === 'login' && (
              <>
                <div className="glass-card rounded-lg p-3 text-sm text-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                  {entryEmail}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="quick-password" className="text-sm">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="quick-password"
                      type={showEntryPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={entryPassword}
                      onChange={(e) => setEntryPassword(e.target.value)}
                      className="pl-10 pr-10"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowEntryPassword(!showEntryPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showEntryPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Button
                  className="w-full gradient-neon text-primary-foreground font-semibold"
                  onClick={handleQuickEntryContinue}
                  disabled={entryLoading}
                >
                  {entryLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Sign In
                </Button>
                <button
                  type="button"
                  className="text-sm text-primary hover:underline w-full text-center"
                  onClick={() => setQuickEntryMode('signup')}
                >
                  Don't have an account? Sign up
                </button>
              </>
            )}

            {/* Signup step */}
            {quickEntryMode === 'signup' && (
              <>
                <div className="glass-card rounded-lg p-3 text-sm text-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                  {entryEmail}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="quick-gamer" className="text-sm">Gamer Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="quick-gamer"
                      type="text"
                      placeholder="NeonMaster2025"
                      value={entryGamerName}
                      onChange={(e) => setEntryGamerName(e.target.value)}
                      className="pl-10"
                      autoFocus
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="quick-signup-pw" className="text-sm">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="quick-signup-pw"
                      type={showEntryPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={entryPassword}
                      onChange={(e) => setEntryPassword(e.target.value)}
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowEntryPassword(!showEntryPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showEntryPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Button
                  className="w-full gradient-neon text-primary-foreground font-semibold"
                  onClick={handleQuickEntryContinue}
                  disabled={entryLoading}
                >
                  {entryLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Create Account
                </Button>
                <button
                  type="button"
                  className="text-sm text-primary hover:underline w-full text-center"
                  onClick={() => setQuickEntryMode('login')}
                >
                  Already have an account? Sign in
                </button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* ====== Simulated Checkout Overlay ====== */}
      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent className="glass-card border-primary/30 max-w-md">
          {!checkoutLoading && !checkoutComplete ? (
            <>
              <DialogHeader>
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 blur-xl bg-gradient-to-r from-primary to-secondary opacity-50" />
                    <div className="relative gradient-neon p-4 rounded-full">
                      <Crown className="h-10 w-10 text-primary-foreground" />
                    </div>
                  </div>
                </div>
                <DialogTitle className="text-2xl font-[Orbitron] text-center neon-text-primary">
                  {"You're choosing"}
                </DialogTitle>
                <DialogDescription className="text-center text-lg text-foreground font-semibold">
                  {planLabel}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 my-4">
                <div className="glass-card rounded-lg p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Plan</span>
                    <span className="text-foreground font-semibold">{planLabel}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-muted-foreground text-sm">Price</span>
                    <div className="text-right">
                      <span className="text-foreground font-bold text-2xl">{planPrice}</span>
                      <span className="text-muted-foreground text-sm"> / month</span>
                    </div>
                  </div>
                  {selectedPlan === 'plus' && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Trial</span>
                      <span className="text-secondary font-semibold">First 7 days free!</span>
                    </div>
                  )}
                </div>

                <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg p-3">
                  <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                  <span>
                    <strong className="text-foreground">Security Note:</strong> We use industry-standard encryption. 
                    Never share your password, PIN, or full credit card details in chat or with unverified sources.
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  onClick={handleCheckoutAuthorize}
                  className="w-full gradient-neon text-primary-foreground font-bold py-6 text-base neon-glow-primary pulse-neon"
                >
                  <Zap className="h-5 w-5 mr-2" />
                  Authorize & Start Playing
                </Button>
                <Button variant="ghost" onClick={() => setCheckoutOpen(false)} className="w-full">
                  Cancel
                </Button>
              </div>
            </>
          ) : checkoutLoading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-6">
              <div className="relative">
                <div className="absolute inset-0 blur-xl gradient-neon opacity-30 rounded-full" />
                <div className="relative gradient-neon p-5 rounded-full animate-pulse">
                  <Gamepad2 className="h-12 w-12 text-primary-foreground" />
                </div>
              </div>
              <div className="space-y-3 w-full max-w-xs">
                <p className="text-foreground font-[Orbitron] text-center text-sm">
                  Syncing your Profile...
                </p>
                <div className="xp-bar">
                  <div className="xp-bar-fill animate-checkout-progress" style={{ width: '100%' }} />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="gradient-neon p-5 rounded-full">
                <Check className="h-12 w-12 text-primary-foreground" />
              </div>
              <p className="text-foreground font-[Orbitron] text-lg text-center">
                {"You're in!"}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ====== Downgrade Dialog ====== */}
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
              {"We've got you. You'll keep your Games Now Plus benefits until the end of your current billing cycle."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-4">
            <div className="glass-card rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Benefits active until</span>
                <span className="text-foreground font-semibold">{billingEndDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">New plan after</span>
                <span className="text-foreground font-semibold">Games Now — €3.00/mo</span>
              </div>
            </div>

            <div className="flex items-start gap-2 text-xs text-destructive/80 bg-destructive/10 rounded-lg p-3">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>
                You will lose access to your saved progress in premium titles and cloud gaming features once the change takes effect.
              </span>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Your subscription will switch to Games Now automatically on{' '}
              <span className="text-foreground font-medium">{billingEndDate}</span>. No further action is needed.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button onClick={confirmDowngrade} variant="outline" className="w-full">
              Confirm Downgrade
            </Button>
            <Button onClick={() => setDowngradeOpen(false)} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Keep Games Now Plus
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ====== Cancel Subscription Dialog ====== */}
      <Dialog open={cancelOpen} onOpenChange={setCancelOpen}>
        <DialogContent className="glass-card border-destructive/30 max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-3">
              <div className="p-3 rounded-full bg-destructive/20">
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
            </div>
            <DialogTitle className="text-xl font-[Orbitron] text-center text-foreground">
              Cancel Subscription?
            </DialogTitle>
            <DialogDescription className="text-center text-muted-foreground text-sm">
              Are you sure? You'll lose access to all games after your current billing period ends on <strong className="text-foreground">{billingEndDate}</strong>.
            </DialogDescription>
          </DialogHeader>
          <div className="glass-card rounded-lg p-4 my-2">
            <p className="text-sm font-semibold text-foreground mb-2">You'll lose:</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><X className="h-4 w-4 text-destructive shrink-0" /> Access to 2000+ games</li>
              <li className="flex items-center gap-2"><X className="h-4 w-4 text-destructive shrink-0" /> Ad-free gaming experience</li>
              {isPremium && <li className="flex items-center gap-2"><X className="h-4 w-4 text-destructive shrink-0" /> Cloud saves & premium titles</li>}
            </ul>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <Button onClick={() => setCancelOpen(false)} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Keep My Subscription
            </Button>
            <Button
              variant="ghost"
              className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={confirmCancel}
            >
              Yes, Cancel Subscription
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti {
          animation: confetti-fall 3s ease-in forwards;
        }
        @keyframes checkout-progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-checkout-progress {
          animation: checkout-progress 2s ease-out forwards;
        }
      `}</style>
    </Layout>
  );
}
