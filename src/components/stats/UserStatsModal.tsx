import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { 
  Trophy, 
  Flame, 
  Crown, 
  Compass, 
  Heart,
  Zap,
  Star,
  Lock,
  Target,
  Moon,
  Gamepad2,
  Share2,
  Clock,
  Award
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

interface Achievement {
  id: string;
  name: string;
  criteria: string;
  icon: React.ReactNode;
  unlocked: boolean;
  color: string;
}

interface LeaderboardEntry {
  rank: number;
  gamer_name: string;
  score: number;
}

interface Game {
  id: string;
  title: string;
}

export function UserStatsModal({ open, onOpenChange }: UserStatsModalProps) {
  const { profile } = useAuth();
  const [selectedGame, setSelectedGame] = useState<string>('all');
  const [games, setGames] = useState<Game[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  // Fetch games for leaderboard filter
  useEffect(() => {
    const fetchGames = async () => {
      const { data } = await supabase
        .from('games')
        .select('id, title')
        .order('title');
      if (data) setGames(data);
    };
    if (open) fetchGames();
  }, [open]);

  // Mock leaderboard data - in production this would come from database
  useEffect(() => {
    // Simulated leaderboard data
    const mockLeaderboard: LeaderboardEntry[] = [
      { rank: 1, gamer_name: 'NeonMaster', score: 15420 },
      { rank: 2, gamer_name: 'PixelWizard', score: 14850 },
      { rank: 3, gamer_name: 'StarChaser', score: 13200 },
      { rank: 4, gamer_name: 'VelocityKing', score: 12100 },
      { rank: 5, gamer_name: 'ZenPlayer', score: 11500 },
      { rank: 6, gamer_name: 'GameHunter', score: 10800 },
      { rank: 7, gamer_name: 'QuantumPro', score: 9950 },
      { rank: 8, gamer_name: 'CyberNinja', score: 9200 },
      { rank: 9, gamer_name: 'RetroGamer', score: 8700 },
      { rank: 10, gamer_name: 'DigitalAce', score: 8100 },
    ];
    setLeaderboard(mockLeaderboard);
  }, [selectedGame]);

  // Milestone data
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

  // Achievement awards data
  const achievements: Achievement[] = [
    {
      id: 'first-blood',
      name: 'First Blood',
      criteria: 'Play your first game',
      icon: <Target className="h-6 w-6" />,
      unlocked: true,
      color: 'text-red-500',
    },
    {
      id: 'night-owl',
      name: 'Night Owl',
      criteria: 'Play a game after midnight',
      icon: <Moon className="h-6 w-6" />,
      unlocked: false,
      color: 'text-indigo-500',
    },
    {
      id: 'pro-gamer',
      name: 'Pro Gamer',
      criteria: 'Win 5 premium games',
      icon: <Gamepad2 className="h-6 w-6" />,
      unlocked: false,
      color: 'text-purple-500',
    },
    {
      id: 'socialite',
      name: 'Socialite',
      criteria: 'Share a game link with friends',
      icon: <Share2 className="h-6 w-6" />,
      unlocked: false,
      color: 'text-blue-500',
    },
    {
      id: 'deep-diver',
      name: 'Deep Diver',
      criteria: 'Play for 2+ hours total',
      icon: <Clock className="h-6 w-6" />,
      unlocked: true,
      color: 'text-teal-500',
    },
    {
      id: 'speed-demon',
      name: 'Speed Demon',
      criteria: 'Finish a racing game in under 2 minutes',
      icon: <Zap className="h-6 w-6" />,
      unlocked: false,
      color: 'text-yellow-500',
    },
    {
      id: 'perfectionist',
      name: 'Perfectionist',
      criteria: 'Complete a game with 100% score',
      icon: <Star className="h-6 w-6" />,
      unlocked: false,
      color: 'text-amber-500',
    },
    {
      id: 'champion',
      name: 'Champion',
      criteria: 'Reach the #1 spot on any leaderboard',
      icon: <Award className="h-6 w-6" />,
      unlocked: false,
      color: 'text-gold-500',
    },
  ];

  const xpForNextLevel = 1000;
  const currentXp = profile?.xp_points || 0;
  const currentLevel = profile?.xp_level || 1;
  const xpProgress = (currentXp % xpForNextLevel) / xpForNextLevel * 100;
  const unlockedCount = achievements.filter(a => a.unlocked).length;

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

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50';
      case 2: return 'bg-gray-400/20 text-gray-400 border-gray-400/50';
      case 3: return 'bg-amber-700/20 text-amber-600 border-amber-700/50';
      default: return 'bg-muted/30 text-muted-foreground border-border/50';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl glass-card border-primary/20 max-h-[85vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-orbitron">
            <Star className="h-5 w-5 text-secondary" />
            Player Stats
          </DialogTitle>
        </DialogHeader>

        {/* XP Overview - Always visible */}
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

        {/* Tabs */}
        <Tabs defaultValue="achievements" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted/30">
            <TabsTrigger value="achievements" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <Trophy className="h-4 w-4 mr-2" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="leaderboards" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <Crown className="h-4 w-4 mr-2" />
              Leaderboards
            </TabsTrigger>
          </TabsList>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="mt-4">
            <ScrollArea className="h-[350px] pr-4">
              <div className="space-y-6">
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

                {/* Unlocked Awards Grid */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Unlocked Awards ({unlockedCount}/{achievements.length})
                  </h3>
                  <div className="grid grid-cols-4 gap-3">
                    {achievements.map((achievement) => (
                      <Tooltip key={achievement.id}>
                        <TooltipTrigger asChild>
                          <div 
                            className={`relative aspect-square rounded-xl border-2 flex items-center justify-center cursor-pointer transition-all ${
                              achievement.unlocked 
                                ? 'bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/50 neon-glow-primary hover:scale-105' 
                                : 'bg-muted/30 border-border/30 grayscale opacity-50 hover:opacity-70'
                            }`}
                          >
                            <div className={achievement.unlocked ? achievement.color : 'text-muted-foreground'}>
                              {achievement.icon}
                            </div>
                            {!achievement.unlocked && (
                              <div className="absolute bottom-1 right-1">
                                <Lock className="h-3 w-3 text-muted-foreground/70" />
                              </div>
                            )}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="bg-popover border-border z-[100]">
                          <div className="text-center">
                            <p className="font-semibold">{achievement.name}</p>
                            <p className="text-xs text-muted-foreground">{achievement.criteria}</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
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
                    <p className="text-2xl font-bold text-foreground">{unlockedCount}</p>
                    <p className="text-xs text-muted-foreground">Badges</p>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Leaderboards Tab */}
          <TabsContent value="leaderboards" className="mt-4">
            <div className="space-y-4">
              {/* Game Filter */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Filter by:</span>
                <Select value={selectedGame} onValueChange={setSelectedGame}>
                  <SelectTrigger className="w-48 bg-muted/30 border-border/50">
                    <SelectValue placeholder="Select game" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border z-[100]">
                    <SelectItem value="all">All Games</SelectItem>
                    {games.map((game) => (
                      <SelectItem key={game.id} value={game.id}>{game.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Leaderboard List */}
              <ScrollArea className="h-[320px]">
                <div className="space-y-2">
                  {leaderboard.map((entry) => (
                    <div 
                      key={entry.rank}
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-all hover:bg-muted/30 ${
                        entry.rank <= 3 ? getRankStyle(entry.rank) : 'bg-muted/10 border-border/30'
                      }`}
                    >
                      {/* Rank */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                        entry.rank === 1 ? 'bg-yellow-500/30 text-yellow-400' :
                        entry.rank === 2 ? 'bg-gray-400/30 text-gray-300' :
                        entry.rank === 3 ? 'bg-amber-700/30 text-amber-500' :
                        'bg-muted/50 text-muted-foreground'
                      }`}>
                        {entry.rank <= 3 ? (
                          <Crown className={`h-5 w-5 ${
                            entry.rank === 1 ? 'text-yellow-400' :
                            entry.rank === 2 ? 'text-gray-300' :
                            'text-amber-500'
                          }`} />
                        ) : (
                          `#${entry.rank}`
                        )}
                      </div>

                      {/* Player Info */}
                      <div className="flex-1">
                        <p className="font-medium">{entry.gamer_name}</p>
                        <p className="text-xs text-muted-foreground">
                          {entry.rank === 1 ? '👑 Champion' : entry.rank <= 3 ? '🏆 Top 3' : 'Competitor'}
                        </p>
                      </div>

                      {/* Score */}
                      <div className="text-right">
                        <p className="font-bold text-lg text-primary">{entry.score.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
