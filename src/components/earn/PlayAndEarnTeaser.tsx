import { Link } from 'react-router-dom';
import { Coins, Gift, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePlayAndEarn } from './PlayAndEarnContext';

export function PlayAndEarnTeaser() {
  const { rewardHistory } = usePlayAndEarn();
  
  // Get the 3 most recent rewards for the ticker
  const recentRewards = rewardHistory.slice(0, 3);

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="glass-card p-6 lg:p-8 animated-border relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-primary/20 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-secondary/15 rounded-full blur-3xl -z-10" />

          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/30 mb-4">
                <Coins className="h-4 w-4 text-secondary" />
                <span className="text-sm font-medium text-secondary">Play & Earn</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground mb-3">
                Turn Gaming Time Into{' '}
                <span className="neon-text-secondary">Real Rewards</span>
              </h2>

              {/* Value Proposition */}
              <p className="text-muted-foreground mb-6 max-w-lg">
                Play mobile games, earn tokens, and redeem them for gift cards from 
                Amazon, PlayStation, Xbox, and more. <span className="text-foreground font-medium">No deposit required.</span>
              </p>

              {/* CTA Button */}
              <Link to="/play-and-earn">
                <Button 
                  size="lg" 
                  className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 neon-glow-primary text-lg px-8"
                >
                  <Gift className="h-5 w-5" />
                  Enter Hub
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Right - Reward Cards Preview */}
            <div className="flex-shrink-0 hidden md:flex gap-3">
              {['Amazon', 'PSN', 'Xbox'].map((brand, i) => (
                <div 
                  key={brand}
                  className="w-24 h-32 rounded-xl bg-gradient-to-br from-muted/80 to-muted/40 border border-border/50 flex flex-col items-center justify-center gap-2 float"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <Gift className="h-8 w-8 text-secondary" />
                  <span className="text-xs font-medium text-foreground">{brand}</span>
                  <span className="text-xs text-muted-foreground">$5-$50</span>
                </div>
              ))}
            </div>
          </div>

          {/* Live Rewards Ticker */}
          <div className="mt-6 pt-6 border-t border-border/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-medium text-green-400">LIVE REWARDS</span>
              </div>
              <Sparkles className="h-3 w-3 text-secondary" />
            </div>
            
            <div className="flex flex-wrap gap-3">
              {recentRewards.map((activity) => (
                <div 
                  key={activity.id}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/30 border border-border/30 text-sm animate-fade-in"
                >
                  <Gift className="h-3 w-3 text-secondary" />
                  <span className="text-muted-foreground">
                    <span className="text-primary font-medium">{activity.username}</span>
                    {' earned '}
                    <span className="text-secondary font-medium">{activity.reward}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
