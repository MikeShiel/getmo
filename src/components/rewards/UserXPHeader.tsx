import { useAuth } from '@/contexts/AuthContext';
import { Zap, Shield, TrendingUp } from 'lucide-react';

export function UserXPHeader() {
  const { profile } = useAuth();
  const currentXp = profile?.xp_points || 0;
  const currentLevel = profile?.xp_level || 1;
  const xpForNextLevel = 1000;
  const xpInLevel = currentXp % xpForNextLevel;
  const xpProgress = (xpInLevel / xpForNextLevel) * 100;

  // Mock daily XP cap
  const dailyCap = 500;
  const dailyUsed = 120;
  const dailyPercent = (dailyUsed / dailyCap) * 100;

  return (
    <div className="relative overflow-hidden border-b border-border/50" style={{ background: 'linear-gradient(135deg, hsl(268 30% 8%), hsl(268 25% 12%))' }}>
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(hsl(var(--primary)), transparent)' }} />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Avatar + Gamertag */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl border-2 border-primary/50 bg-muted/50 flex items-center justify-center overflow-hidden" style={{ boxShadow: '0 0 20px hsl(var(--primary) / 0.3)' }}>
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <Shield className="h-8 w-8 text-primary" />
                )}
              </div>
              {/* Level badge */}
              <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full text-xs font-bold border border-secondary/50 bg-secondary/20 text-secondary" style={{ boxShadow: '0 0 8px hsl(var(--secondary) / 0.4)' }}>
                LV.{currentLevel}
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground font-orbitron">
                {profile?.gamer_name || 'Player'}
              </h1>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-primary" />
                {currentXp.toLocaleString()} Total XP
              </p>
            </div>
          </div>

          {/* XP Progress */}
          <div className="flex-1 w-full max-w-xl space-y-3">
            {/* Main XP bar */}
            <div>
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-muted-foreground">Level {currentLevel} → {currentLevel + 1}</span>
                <span className="font-medium text-foreground">{xpInLevel} / {xpForNextLevel} XP</span>
              </div>
              <div className="relative h-4 rounded-full overflow-hidden bg-muted/50 border border-border/30">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out relative"
                  style={{
                    width: `${xpProgress}%`,
                    background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(268 84% 55%))',
                    boxShadow: '0 0 12px hsl(var(--primary) / 0.5)',
                  }}
                >
                  {/* Yellow glow leading edge */}
                  <div className="absolute right-0 top-0 bottom-0 w-3 rounded-full" style={{ background: 'hsl(var(--secondary))', boxShadow: '0 0 10px hsl(var(--secondary) / 0.8), 0 0 20px hsl(var(--secondary) / 0.4)' }} />
                </div>
              </div>
            </div>

            {/* Daily cap */}
            <div className="flex items-center gap-3">
              <Zap className="h-4 w-4 text-secondary flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Daily XP Cap</span>
                  <span className="text-secondary font-medium">{dailyUsed}/{dailyCap}</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted/40 overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${dailyPercent}%`, background: 'hsl(var(--secondary))' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
