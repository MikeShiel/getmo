import { Link } from 'react-router-dom';
import { Crown, Zap, Gamepad2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export function SubscriptionHeroBanner() {
  const { user } = useAuth();

  const ctaLink = user ? '/subscriptions' : '/auth?redirect=/subscriptions';

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary/25 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/30 mb-6">
            <Sparkles className="h-4 w-4 text-secondary" />
            <span className="text-sm font-semibold text-secondary">Unlimited Gaming Awaits</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-5 leading-tight">
            <span className="text-foreground">Ready to </span>
            <span className="neon-text-primary">Level Up</span>
            <span className="text-foreground"> your Play?</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
            Choose your mission. Unlock 2000+ games with no ads, no interruptions. Go premium for cloud gaming and console-grade titles.
          </p>

          {/* Two plan mini-cards */}
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
            {/* Casual */}
            <div className="glass-card rounded-xl p-5 border border-border text-left">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-primary/20">
                  <Gamepad2 className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-bold font-[Orbitron] text-foreground text-sm">Games Now</h3>
              </div>
              <p className="text-muted-foreground text-xs mb-3">2000+ casual games, no ads, new titles weekly.</p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-2xl font-bold text-foreground">€3</span>
                <span className="text-muted-foreground text-sm">/mo</span>
              </div>
              <Link to={ctaLink}>
                <Button size="sm" variant="outline" className="w-full border-primary/50 hover:bg-primary/10">
                  {user ? 'Subscribe Now' : 'Login to Subscribe'}
                </Button>
              </Link>
            </div>

            {/* Pro */}
            <div className="glass-card rounded-xl p-5 border border-secondary/40 neon-glow-primary text-left relative">
              <div className="absolute -top-2.5 right-4">
                <span className="text-[10px] font-bold bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                  👑 BEST VALUE
                </span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg gradient-neon">
                  <Crown className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-bold font-[Orbitron] neon-text-primary text-sm">Games Now Plus</h3>
              </div>
              <p className="text-muted-foreground text-xs mb-3">150+ premium titles, cloud gaming, cross-device saves.</p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-2xl font-bold text-foreground">€5</span>
                <span className="text-muted-foreground text-sm">/mo</span>
                <span className="ml-1 text-[10px] text-secondary font-medium">7 days free!</span>
              </div>
              <Link to={ctaLink}>
                <Button size="sm" className="w-full gradient-neon text-primary-foreground font-bold hover:opacity-90">
                  <Zap className="h-4 w-4 mr-1" />
                  {user ? 'Go Premium' : 'Join the Club'}
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-8 justify-center">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-foreground">2000+</p>
              <p className="text-sm text-muted-foreground">Games</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-foreground">0s</p>
              <p className="text-sm text-muted-foreground">Load Time</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-secondary">No Ads</p>
              <p className="text-sm text-muted-foreground">Ever</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
