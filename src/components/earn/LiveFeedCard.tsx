import { useEffect, useRef } from 'react';
import { Gift, TrendingUp, Coins, Sparkles } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { usePlayAndEarn } from './PlayAndEarnContext';

export function LiveFeedCard() {
  const { rewardHistory, communityProgress, communityGoal } = usePlayAndEarn();
  const feedRef = useRef<HTMLDivElement>(null);

  // Auto-scroll effect when new items appear
  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [rewardHistory[0]?.id]);

  const progressPercentage = (communityProgress / communityGoal) * 100;

  return (
    <div className="glass-card p-6 lg:p-8 animated-border relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/15 rounded-full blur-3xl -z-10" />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-secondary">
            <Coins className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-display font-bold text-foreground">Play & Earn</h3>
            <p className="text-sm text-muted-foreground">Real rewards for playing games</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon-green/20 border border-neon-green/30">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-medium text-green-400">LIVE</span>
        </div>
      </div>

      {/* Live Feed - Scrolling rewards */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-secondary" />
          <span className="text-sm font-medium text-muted-foreground">Recent Rewards</span>
        </div>
        <div 
          ref={feedRef}
          className="h-32 overflow-hidden relative"
        >
          <div className="space-y-2">
            {rewardHistory.slice(0, 5).map((activity, index) => (
              <div 
                key={activity.id}
                className="flex items-center gap-3 p-2 rounded-lg bg-muted/30 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/50 to-secondary/50 flex items-center justify-center">
                  <Gift className="h-4 w-4 text-secondary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    <span className="text-primary">{activity.username}</span> just earned{' '}
                    <span className="text-secondary font-bold">{activity.reward}</span>
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {getTimeAgo(activity.timestamp)}
                </span>
              </div>
            ))}
          </div>
          {/* Fade overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Community Progress */}
      <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium text-foreground">Weekly Community Goal</span>
          </div>
          <span className="text-xs text-muted-foreground">
            ${communityProgress.toLocaleString()} / ${communityGoal.toLocaleString()}
          </span>
        </div>
        <div className="relative">
          <Progress value={progressPercentage} className="h-3" />
          <div 
            className="absolute top-0 h-3 rounded-full shimmer"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          <span className="text-secondary font-bold">${(communityGoal - communityProgress).toLocaleString()}</span> more to unlock bonus rewards!
        </p>
      </div>
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}
