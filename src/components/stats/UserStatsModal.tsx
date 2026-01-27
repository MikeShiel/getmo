import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  Trophy, 
  Flame, 
  Crown, 
  Compass, 
  Heart,
  Zap,
  Star,
  Lock
} from 'lucide-react';

interface UserStatsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  reward: string;
  rewardType: 'badge' | 'xp' | 'frame' | 'title' | 'vip';
  icon: React.ReactNode;
  progress: number;
  target: number;
  unlocked: boolean;
}

export function UserStatsModal({ open, onOpenChange }: UserStatsModalProps) {
  const { profile } = useAuth();
  const { t } = useTheme();

  // Mock milestone data - in production, this would come from the database
  const milestones: Milestone[] = [
    {
      id: 'early-bird',
      title: 'Early Bird',
      description: 'Play 10 different games',
      reward: 'Bronze Badge',
      rewardType: 'badge',
      icon: <Trophy className="h-5 w-5 text-amber-600" />,
      progress: 3,
      target: 10,
      unlocked: false,
    },
    {
      id: 'daily-grinder',
      title: 'Daily Grinder',
      description: 'Log in 7 days in a row',
      reward: '500 XP Bonus',
      rewardType: 'xp',
      icon: <Flame className="h-5 w-5 text-orange-500" />,
      progress: 2,
      target: 7,
      unlocked: false,
    },
    {
      id: 'high-roller',
      title: 'High Roller',
      description: 'Top 10 leaderboard in any premium game',
      reward: 'Gold Frame',
      rewardType: 'frame',
      icon: <Crown className="h-5 w-5 text-yellow-500" />,
      progress: 0,
      target: 1,
      unlocked: false,
    },
    {
      id: 'explorer',
      title: 'Explorer',
      description: 'Visit all game categories',
      reward: '"Voyager" Title',
      rewardType: 'title',
      icon: <Compass className="h-5 w-5 text-blue-500" />,
      progress: 2,
      target: 5,
      unlocked: false,
    },
    {
      id: 'supportive-gamer',
      title: 'Supportive Gamer',
      description: 'Maintain subscription for 3 months',
      reward: 'Ad-free VIP Status',
      rewardType: 'vip',
      icon: <Heart className="h-5 w-5 text-pink-500" />,
      progress: profile?.is_premium ? 1 : 0,
      target: 3,
      unlocked: false,
    },
  ];

  const xpForNextLevel = 1000;
  const currentXp = profile?.xp_points || 0;
  const currentLevel = profile?.xp_level || 1;
  const xpProgress = (currentXp % xpForNextLevel) / xpForNextLevel * 100;

  const getRewardBadgeColor = (type: string) => {
    switch (type) {
      case 'badge': return 'bg-amber-600/20 text-amber-500 border-amber-600/30';
      case 'xp': return 'bg-primary/20 text-primary border-primary/30';
      case 'frame': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'title': return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      case 'vip': return 'bg-pink-500/20 text-pink-500 border-pink-500/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg glass-card border-primary/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-orbitron">
            <Star className="h-5 w-5 text-secondary" />
            Player Stats
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* XP Overview */}
          <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 neon-glow-primary">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="text-sm font-bold text-primary">LEVEL {currentLevel}</span>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">
                {currentXp % xpForNextLevel} / {xpForNextLevel} XP
              </span>
            </div>
            
            <div className="relative h-3 rounded-full overflow-hidden bg-muted">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${xpProgress}%`,
                  background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)))',
                  boxShadow: '0 0 10px hsl(var(--primary) / 0.5), 0 0 20px hsl(var(--primary) / 0.3)'
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              {xpForNextLevel - (currentXp % xpForNextLevel)} XP to Level {currentLevel + 1}
            </p>
          </div>

          {/* Milestone Goals */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Milestone Goals
            </h3>
            <div className="space-y-3">
              {milestones.map((milestone) => (
                <div 
                  key={milestone.id}
                  className={`p-3 rounded-lg border transition-all ${
                    milestone.unlocked 
                      ? 'bg-primary/10 border-primary/30' 
                      : 'bg-muted/20 border-border/50 hover:border-primary/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${milestone.unlocked ? 'bg-primary/20' : 'bg-muted/50'}`}>
                      {milestone.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-medium text-sm">{milestone.title}</h4>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getRewardBadgeColor(milestone.rewardType)}`}
                        >
                          {milestone.reward}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {milestone.description}
                      </p>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">
                            {milestone.progress}/{milestone.target}
                          </span>
                        </div>
                        <Progress 
                          value={(milestone.progress / milestone.target) * 100} 
                          className="h-1.5"
                        />
                      </div>
                    </div>
                    {!milestone.unlocked && milestone.progress < milestone.target && (
                      <Lock className="h-4 w-4 text-muted-foreground/50 flex-shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 rounded-lg bg-muted/20 border border-border/50">
              <p className="text-2xl font-bold text-primary">{currentLevel}</p>
              <p className="text-xs text-muted-foreground">Level</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/20 border border-border/50">
              <p className="text-2xl font-bold text-secondary">{currentXp}</p>
              <p className="text-xs text-muted-foreground">Total XP</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/20 border border-border/50">
              <p className="text-2xl font-bold text-foreground">0</p>
              <p className="text-xs text-muted-foreground">Badges</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
