import { Zap } from 'lucide-react';

interface XPBarProps {
  level: number;
  xp: number;
  maxXp?: number;
  onClick?: () => void;
}

export function XPBar({ level, xp, maxXp = 1000, onClick }: XPBarProps) {
  const percentage = Math.min((xp % maxXp) / maxXp * 100, 100);

  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-2 group cursor-pointer hover:opacity-90 transition-opacity"
      aria-label="View player stats"
    >
      {/* Level Badge */}
      <div className="flex items-center gap-1 h-7 px-2 rounded-full bg-primary/20 border border-primary/30 neon-glow-primary group-hover:scale-105 transition-transform">
        <Zap className="h-3 w-3 text-primary" />
        <span className="text-[11px] font-bold text-primary leading-none">LV.{level}</span>
      </div>

      {/* Slim XP Bar with neon glow */}
      <div className="w-28">
        <div className="relative h-2 rounded-full overflow-hidden bg-muted/50">
          <div 
            className="h-full rounded-full transition-all duration-500" 
            style={{ 
              width: `${percentage}%`,
              background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)))',
              boxShadow: '0 0 8px hsl(var(--primary) / 0.6), 0 0 16px hsl(var(--primary) / 0.3)'
            }}
          />
        </div>
      </div>

      {/* XP Count */}
      <span className="text-[11px] text-muted-foreground whitespace-nowrap">
        {xp % maxXp}/{maxXp}
      </span>
    </button>
  );
}
