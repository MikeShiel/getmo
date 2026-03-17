import { useState } from 'react';
import {
  CalendarCheck, Gamepad2, Clock, Trophy, Star, Target,
  CheckCircle2, Circle, Flame
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface Objective {
  id: string;
  label: string;
  description: string;
  xpReward: number;
  icon: React.ReactNode;
  completed: boolean;
  progress?: { current: number; target: number };
}

const DAILY_OBJECTIVES: Objective[] = [
  {
    id: 'daily-login',
    label: 'Daily Login',
    description: 'Log in to Getmo today',
    xpReward: 25,
    icon: <CalendarCheck className="h-4 w-4" />,
    completed: true,
  },
  {
    id: 'first-game',
    label: 'Play Your First Game',
    description: 'Launch and play any game today',
    xpReward: 50,
    icon: <Gamepad2 className="h-4 w-4" />,
    completed: true,
  },
  {
    id: 'play-30',
    label: 'Play for 30 Minutes',
    description: 'Spend 30 minutes in active gameplay',
    xpReward: 30,
    icon: <Clock className="h-4 w-4" />,
    completed: false,
    progress: { current: 18, target: 30 },
  },
  {
    id: 'win-3',
    label: 'Win 3 Rounds',
    description: 'Complete 3 rounds or levels in any game',
    xpReward: 60,
    icon: <Trophy className="h-4 w-4" />,
    completed: false,
    progress: { current: 1, target: 3 },
  },
  {
    id: 'try-new',
    label: 'Try a New Game',
    description: 'Play a game you haven\'t tried before',
    xpReward: 40,
    icon: <Star className="h-4 w-4" />,
    completed: false,
  },
  {
    id: 'high-score',
    label: 'Beat a High Score',
    description: 'Set a new personal best in any game',
    xpReward: 75,
    icon: <Target className="h-4 w-4" />,
    completed: false,
  },
];

export function DailyObjectives() {
  const [objectives] = useState(DAILY_OBJECTIVES);

  const completedCount = objectives.filter((o) => o.completed).length;
  const totalXP = objectives.reduce((sum, o) => sum + o.xpReward, 0);
  const earnedXP = objectives.filter((o) => o.completed).reduce((sum, o) => sum + o.xpReward, 0);

  return (
    <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <h2 className="font-orbitron font-bold text-foreground flex items-center gap-2">
            <Flame className="h-5 w-5 text-secondary" />
            Daily Objectives
          </h2>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-secondary/15 text-secondary">
            {completedCount}/{objectives.length} Done
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {earnedXP}/{totalXP} XP earned today — resets at midnight
        </p>
      </div>

      {/* Objectives List */}
      <div className="p-3 space-y-1.5 flex-1 overflow-y-auto">
        {objectives.map((obj, i) => (
          <div
            key={obj.id}
            className={`flex items-start gap-3 p-3 rounded-lg transition-colors animate-fade-in ${
              obj.completed
                ? 'bg-primary/10 opacity-70'
                : 'hover:bg-muted/30'
            }`}
            style={{ animationDelay: `${i * 40}ms` }}
          >
            {/* Status Icon */}
            <div className={`mt-0.5 flex-shrink-0 ${obj.completed ? 'text-primary' : 'text-muted-foreground'}`}>
              {obj.completed ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={`p-1.5 rounded-md ${obj.completed ? 'bg-primary/20 text-primary' : 'bg-muted/40 text-muted-foreground'}`}>
                  {obj.icon}
                </span>
                <p className={`text-sm font-medium truncate ${obj.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                  {obj.label}
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-1 ml-9">{obj.description}</p>

              {/* Progress bar for partial objectives */}
              {obj.progress && !obj.completed && (
                <div className="mt-2 ml-9 flex items-center gap-2">
                  <Progress value={(obj.progress.current / obj.progress.target) * 100} className="h-1.5 flex-1" />
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {obj.progress.current}/{obj.progress.target}
                  </span>
                </div>
              )}
            </div>

            {/* XP Reward */}
            <div className="flex-shrink-0 text-right">
              <span className={`text-sm font-bold ${obj.completed ? 'text-primary/60' : 'text-secondary'}`}>
                +{obj.xpReward}
              </span>
              <span className="text-xs text-muted-foreground ml-0.5">XP</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
