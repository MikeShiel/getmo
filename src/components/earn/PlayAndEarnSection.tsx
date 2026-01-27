import { LiveFeedCard } from './LiveFeedCard';
import { EarningHub } from './EarningHub';
import { RedemptionStore } from './RedemptionStore';

export function PlayAndEarnSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/30 text-secondary text-sm font-medium mb-4">
            💰 NEW - Play & Earn
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
            Get Paid to <span className="neon-text-secondary">Play Games</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Play mobile games, earn tokens, and redeem them for real gift cards from your favorite brands.
          </p>
        </div>

        {/* Hero Card - Live Feed */}
        <div className="mb-8">
          <LiveFeedCard />
        </div>

        {/* Earning Hub */}
        <div className="mb-8">
          <EarningHub />
        </div>

        {/* Redemption Store */}
        <RedemptionStore />
      </div>
    </section>
  );
}
