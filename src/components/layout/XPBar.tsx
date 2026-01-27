import { Zap } from 'lucide-react';

interface XPBarProps {
  level: number;
  xp: number;
  maxXp?: number;
}

export function XPBar({ level, xp, maxXp = 1000 }: XPBarProps) {
  const percentage = Math.min((xp % maxXp) / maxXp * 100, 100);

  return (
    <div className="flex items-center gap-3 w-full">
      {/* Level Badge */}
      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20 border border-primary/30">
        <Zap className="h-3 w-3 text-primary" />
        <span className="text-xs font-bold text-primary">LV.{level}</span>
      </div>

      {/* XP Bar */}
      <div className="flex-1">
        <div className="xp-bar">
          <div 
            className="xp-bar-fill animate-glow-pulse" 
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* XP Count */}
      <span className="text-xs text-muted-foreground whitespace-nowrap">
        {xp % maxXp}/{maxXp} XP
      </span>
    </div>
  );
}
