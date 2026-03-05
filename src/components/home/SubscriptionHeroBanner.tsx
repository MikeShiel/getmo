import { Link } from 'react-router-dom';
import { Play, Zap, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export function SubscriptionHeroBanner() {
  const { user } = useAuth();

  // Not logged in → go to auth, logged in but not subscribed → go to subscriptions
  const ctaLink = user ? '/subscriptions' : '/auth?redirect=/subscriptions';

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 mb-6">
            <Zap className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">Instant Play</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-5 leading-tight">
            <span className="text-foreground">Play Games </span>
            <span className="neon-text-primary">Right Now</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
            No downloads. No waiting. Jump into 2000+ games instantly in your browser — ad-free and ready to go.
          </p>

          <Link to={ctaLink}>
            <Button
              size="lg"
              className="gap-2 bg-primary hover:bg-primary/90 neon-glow-primary text-lg px-10 py-6 font-bold"
            >
              <Play className="h-5 w-5 fill-current" />
              Play Now
            </Button>
          </Link>

          {/* Stats */}
          <div className="flex gap-8 mt-12 justify-center">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-foreground">2000+</p>
              <p className="text-sm text-muted-foreground">Games</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-foreground">0s</p>
              <p className="text-sm text-muted-foreground">Load Time</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-secondary">FREE</p>
              <p className="text-sm text-muted-foreground">To Start</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
