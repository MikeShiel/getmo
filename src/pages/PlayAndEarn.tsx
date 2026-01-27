import { Link } from 'react-router-dom';
import { ArrowLeft, Coins, Wallet, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { LiveFeedCard } from '@/components/earn/LiveFeedCard';
import { EarningHub } from '@/components/earn/EarningHub';
import { RedemptionStore } from '@/components/earn/RedemptionStore';
import { usePlayAndEarn } from '@/components/earn/PlayAndEarnContext';

const PlayAndEarn = () => {
  const { tokens, communityProgress, communityGoal } = usePlayAndEarn();

  return (
    <Layout hideFooter>
      {/* Sticky Header with Wallet */}
      <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left - Back Button */}
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>

            {/* Center - Stats */}
            <div className="hidden sm:flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <span className="text-muted-foreground">Clan:</span>
                <span className="text-foreground font-medium">
                  ${communityProgress.toLocaleString()} / ${communityGoal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Right - Wallet Balance */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-secondary/20 to-primary/20 border border-secondary/30 neon-glow-secondary">
              <Wallet className="h-5 w-5 text-secondary" />
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Balance</p>
                <div className="flex items-center gap-1">
                  <Coins className="h-4 w-4 text-secondary" />
                  <span className="text-lg font-bold text-secondary">{tokens.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/30 text-secondary text-sm font-medium mb-4">
            💰 Play & Earn Hub
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-3">
            Get Paid to <span className="neon-text-secondary">Play Games</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Complete game offers, earn tokens, and redeem them for real gift cards from your favorite brands. 
            No deposit required – start earning today!
          </p>
        </div>

        {/* Hero Section - Rewards Banner */}
        <div className="mb-10">
          <LiveFeedCard />
        </div>

        {/* Offerwall Grid */}
        <div className="mb-10">
          <EarningHub />
        </div>

        {/* Redemption Store */}
        <div className="mb-10">
          <RedemptionStore />
        </div>

        {/* Bottom CTA */}
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            Need more tokens? Keep playing games in our offerwall above!
          </p>
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Browse More Games
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default PlayAndEarn;
