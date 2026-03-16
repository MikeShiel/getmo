import { Layout } from '@/components/layout/Layout';
import { UserXPHeader } from '@/components/rewards/UserXPHeader';
import { XPEventFeed } from '@/components/rewards/XPEventFeed';
import { GlobalLeaderboard } from '@/components/rewards/GlobalLeaderboard';
import { XPRulesReference } from '@/components/rewards/XPRulesReference';
import { GameLeaderboard } from '@/components/rewards/GameLeaderboard';

export default function Rewards() {
  return (
    <Layout hideFooter>
      <div className="min-h-[calc(100vh-4rem)] bg-background">
        {/* XP Header */}
        <UserXPHeader />

        {/* Main Grid: Event Feed + Leaderboard */}
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: XP Event Feed */}
            <div className="lg:col-span-4">
              <XPEventFeed />
            </div>

            {/* Right: Leaderboard */}
            <div className="lg:col-span-8">
              <GlobalLeaderboard />
            </div>
          </div>

          {/* Bottom row: XP Rules + Game Leaderboard */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
            <div className="lg:col-span-4">
              <XPRulesReference />
            </div>
            <div className="lg:col-span-8">
              <GameLeaderboard />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
