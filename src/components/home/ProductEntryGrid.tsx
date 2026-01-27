import { Link } from 'react-router-dom';
import { Coins, Gift, ArrowRight, Sparkles, Trophy, Target, Clock, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { usePlayAndEarn } from '@/components/earn/PlayAndEarnContext';

export function ProductEntryGrid() {
  const { rewardHistory } = usePlayAndEarn();
  const recentRewards = rewardHistory.slice(0, 2);

  // Mock challenge progress
  const challengeProgress = 3;
  const challengeGoal = 10;
  const gamesRemaining = challengeGoal - challengeProgress;

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
            Choose Your <span className="neon-text-primary">Adventure</span>
          </h2>
          <p className="text-muted-foreground">Multiple ways to play and earn rewards</p>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Play & Earn */}
          <div className="glass-card p-6 animated-border relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
            {/* Background effects */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/20 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/15 rounded-full blur-3xl -z-10" />

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 border border-secondary/30 mb-4">
              <Coins className="h-4 w-4 text-secondary" />
              <span className="text-xs font-medium text-secondary">Play & Earn</span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-display font-bold text-foreground mb-2">
              Turn Gaming Into{' '}
              <span className="neon-text-secondary">Real Rewards</span>
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-4">
              Earn tokens playing games, redeem for gift cards. No deposit required.
            </p>

            {/* Gift Card Icons */}
            <div className="flex gap-2 mb-4">
              {['Amazon', 'PSN', 'Xbox'].map((brand) => (
                <div 
                  key={brand}
                  className="w-14 h-18 rounded-lg bg-muted/50 border border-border/50 flex flex-col items-center justify-center gap-1 p-2"
                >
                  <Gift className="h-5 w-5 text-secondary" />
                  <span className="text-[10px] font-medium text-foreground">{brand}</span>
                </div>
              ))}
            </div>

            {/* Live Ticker Mini */}
            <div className="mb-4 p-2 rounded-lg bg-muted/30 border border-border/30">
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[10px] font-medium text-green-400">LIVE REWARDS</span>
                <Sparkles className="h-3 w-3 text-secondary" />
              </div>
              <div className="space-y-1">
                {recentRewards.map((activity) => (
                  <div key={activity.id} className="text-xs text-muted-foreground truncate">
                    <span className="text-primary font-medium">{activity.username}</span>
                    {' → '}
                    <span className="text-secondary">{activity.reward}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link to="/play-and-earn">
              <Button className="w-full gap-2 bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-secondary-foreground">
                <Gift className="h-4 w-4" />
                Enter Hub
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Card 2: Play & Win */}
          <div className="glass-card p-6 animated-border relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
            {/* Background effects */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-destructive/20 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/15 rounded-full blur-3xl -z-10" />

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/20 border border-destructive/30 mb-4">
              <Trophy className="h-4 w-4 text-destructive" />
              <span className="text-xs font-medium text-destructive">Play & Win</span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-display font-bold text-foreground mb-2">
              Complete Challenges,{' '}
              <span className="text-destructive">Win Big</span>
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-4">
              Play 10 games to unlock exclusive prizes. Limited time challenges!
            </p>

            {/* Progress Dashboard Preview */}
            <div className="mb-4 p-4 rounded-xl bg-gradient-to-br from-destructive/10 to-primary/10 border border-destructive/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Daily Progress</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-destructive" />
                  <span className="text-xs font-mono text-destructive">1:59:52</span>
                </div>
              </div>
              
              {/* Big Progress Display */}
              <div className="text-center mb-3">
                <span className="text-4xl font-display font-bold text-foreground">{challengeProgress}</span>
                <span className="text-2xl text-muted-foreground">/{challengeGoal}</span>
              </div>
              
              {/* Progress Bar */}
              <Progress 
                value={(challengeProgress / challengeGoal) * 100} 
                className="h-3 mb-2 bg-muted/50"
              />
              
              <p className="text-xs text-center text-muted-foreground">
                <span className="text-destructive font-medium">{gamesRemaining} games</span> away from your prize!
              </p>
            </div>

            {/* CTA */}
            <Link to="/play-and-win">
              <Button className="w-full gap-2 bg-gradient-to-r from-destructive to-destructive/80 hover:from-destructive/90 hover:to-destructive/70 text-destructive-foreground">
                <Target className="h-4 w-4" />
                View Challenges
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Card 3: Coming Soon */}
          <div className="glass-card p-6 relative overflow-hidden group opacity-75">
            {/* Background effects */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-muted/20 rounded-full blur-3xl -z-10" />

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/30 border border-border/50 mb-4">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">Coming Soon</span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-display font-bold text-foreground mb-2">
              Something{' '}
              <span className="text-muted-foreground">Exciting</span>
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-4">
              A new way to play is coming. Stay tuned for the announcement!
            </p>

            {/* Placeholder Content */}
            <div className="mb-4 p-4 rounded-xl bg-muted/20 border border-border/30 flex flex-col items-center justify-center min-h-[120px]">
              <div className="w-16 h-16 rounded-full bg-muted/30 border border-border/50 flex items-center justify-center mb-3">
                <Lock className="h-8 w-8 text-muted-foreground/50" />
              </div>
              <p className="text-xs text-muted-foreground text-center">
                New feature launching soon
              </p>
            </div>

            {/* Disabled CTA */}
            <Button 
              className="w-full gap-2" 
              variant="outline" 
              disabled
            >
              <Lock className="h-4 w-4" />
              Notify Me
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
