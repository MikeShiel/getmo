import { Trophy, Flame, Moon, Gamepad2, Share2, Timer, Lock } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface Achievement {
  id: string;
  name: string;
  description: string;
  criteria: string;
  icon: React.ReactNode;
  unlocked: boolean;
  color: string;
}

const achievements: Achievement[] = [
  {
    id: 'first-blood',
    name: 'First Blood',
    description: 'Start your gaming journey',
    criteria: 'Play your first game',
    icon: <Gamepad2 className="h-6 w-6" />,
    unlocked: true,
    color: 'text-green-400'
  },
  {
    id: 'night-owl',
    name: 'Night Owl',
    description: 'Gaming knows no time',
    criteria: 'Play a game after midnight',
    icon: <Moon className="h-6 w-6" />,
    unlocked: false,
    color: 'text-blue-400'
  },
  {
    id: 'pro-gamer',
    name: 'Pro Gamer',
    description: 'Master of premium content',
    criteria: 'Win 5 premium games',
    icon: <Trophy className="h-6 w-6" />,
    unlocked: false,
    color: 'text-yellow-400'
  },
  {
    id: 'socialite',
    name: 'Socialite',
    description: 'Spread the fun',
    criteria: 'Share a game link with friends',
    icon: <Share2 className="h-6 w-6" />,
    unlocked: false,
    color: 'text-pink-400'
  },
  {
    id: 'deep-diver',
    name: 'Deep Diver',
    description: 'True dedication',
    criteria: 'Play for 2+ hours in a single session',
    icon: <Timer className="h-6 w-6" />,
    unlocked: false,
    color: 'text-purple-400'
  },
  {
    id: 'on-fire',
    name: 'On Fire',
    description: 'Unstoppable streak',
    criteria: 'Win 10 games in a row',
    icon: <Flame className="h-6 w-6" />,
    unlocked: false,
    color: 'text-orange-400'
  },
];

export function AchievementsTab() {
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-foreground">Your Achievements</h3>
          <p className="text-sm text-muted-foreground">
            {unlockedCount} of {achievements.length} unlocked
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/20 border border-secondary/30">
          <Trophy className="h-4 w-4 text-secondary" />
          <span className="text-sm font-bold text-secondary">{unlockedCount}</span>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
        {achievements.map((achievement) => (
          <Tooltip key={achievement.id}>
            <TooltipTrigger asChild>
              <div 
                className={`relative aspect-square rounded-xl border-2 flex flex-col items-center justify-center p-3 cursor-pointer transition-all hover:scale-105 ${
                  achievement.unlocked 
                    ? 'bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/50 neon-glow-primary' 
                    : 'bg-muted/30 border-border/30 grayscale opacity-60'
                }`}
              >
                {/* Icon */}
                <div className={achievement.unlocked ? achievement.color : 'text-muted-foreground'}>
                  {achievement.icon}
                </div>
                
                {/* Name */}
                <p className="text-xs font-medium text-foreground mt-2 text-center line-clamp-1">
                  {achievement.name}
                </p>
                
                {/* Lock overlay for locked achievements */}
                {!achievement.unlocked && (
                  <div className="absolute top-2 right-2">
                    <Lock className="h-3 w-3 text-muted-foreground" />
                  </div>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent 
              side="top" 
              className="max-w-xs bg-popover border-border z-[100]"
            >
              <div className="space-y-1">
                <p className="font-bold text-foreground">{achievement.name}</p>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                <p className="text-xs text-primary font-medium">
                  {achievement.unlocked ? '✓ Unlocked!' : `Criteria: ${achievement.criteria}`}
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      {/* Tip */}
      <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
        <p className="text-xs text-muted-foreground text-center">
          💡 <span className="text-foreground">Tip:</span> Hover over achievements to see unlock requirements
        </p>
      </div>
    </div>
  );
}
