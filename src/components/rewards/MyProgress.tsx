import { useAuth } from '@/contexts/AuthContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  CalendarCheck, Gamepad2, Clock, UserCheck, Play, TrendingUp,
  CheckCircle, Award, Target, Rocket, RotateCcw, Zap, BarChart3, Calendar, Shield
} from 'lucide-react';

const LEVEL_HISTORY = [
  { level: 7, date: 'Mar 15, 2026', xpEarned: 1000 },
  { level: 6, date: 'Mar 10, 2026', xpEarned: 1000 },
  { level: 5, date: 'Mar 3, 2026', xpEarned: 1000 },
  { level: 4, date: 'Feb 24, 2026', xpEarned: 1000 },
  { level: 3, date: 'Feb 15, 2026', xpEarned: 1000 },
  { level: 2, date: 'Feb 8, 2026', xpEarned: 1000 },
  { level: 1, date: 'Feb 1, 2026', xpEarned: 0 },
];

const DAILY_USAGE = [
  { day: 'Mon', used: 420, cap: 500 },
  { day: 'Tue', used: 500, cap: 500 },
  { day: 'Wed', used: 310, cap: 500 },
  { day: 'Thu', used: 485, cap: 500 },
  { day: 'Fri', used: 220, cap: 500 },
  { day: 'Sat', used: 500, cap: 500 },
  { day: 'Sun', used: 120, cap: 500 },
];

const RECENT_EVENTS = [
  { label: 'Daily Login', xp: 25, time: '2m ago', icon: <CalendarCheck className="h-4 w-4" /> },
  { label: 'First Game of the Day', xp: 50, time: '5m ago', icon: <Gamepad2 className="h-4 w-4" /> },
  { label: 'Time Milestone (30 min)', xp: 30, time: '18m ago', icon: <Clock className="h-4 w-4" /> },
  { label: 'Level Up in Candy Rush', xp: 50, time: '25m ago', icon: <TrendingUp className="h-4 w-4" /> },
  { label: 'High Score Beaten!', xp: 75, time: '1h ago', icon: <Target className="h-4 w-4" /> },
  { label: 'Stage Cleared – Tower Stack', xp: 40, time: '1h ago', icon: <CheckCircle className="h-4 w-4" /> },
  { label: 'Game Started – Block Blast', xp: 10, time: '2h ago', icon: <Play className="h-4 w-4" /> },
  { label: 'Session Completed', xp: 20, time: '2h ago', icon: <Award className="h-4 w-4" /> },
  { label: 'Score Milestone (5000 pts)', xp: 50, time: '3h ago', icon: <Zap className="h-4 w-4" /> },
  { label: 'New Game Launched – Pixel Run', xp: 15, time: '4h ago', icon: <Rocket className="h-4 w-4" /> },
  { label: 'Run Completed – Neon Dash', xp: 20, time: '5h ago', icon: <RotateCcw className="h-4 w-4" /> },
  { label: 'Profile Completed', xp: 100, time: '1d ago', icon: <UserCheck className="h-4 w-4" /> },
];

const XP_BREAKDOWN = [
  { category: 'Game Play', xp: 2400, percent: 40, color: 'bg-primary' },
  { category: 'Milestones', xp: 1500, percent: 25, color: 'bg-secondary' },
  { category: 'Daily Bonuses', xp: 1050, percent: 17.5, color: 'bg-accent' },
  { category: 'Achievements', xp: 750, percent: 12.5, color: 'bg-green-500' },
  { category: 'Other', xp: 300, percent: 5, color: 'bg-muted-foreground' },
];

export function MyProgress() {
  const { profile } = useAuth();
  const currentXp = profile?.xp_points || 0;
  const currentLevel = profile?.xp_level || 1;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
      {/* Left column: XP Breakdown + Daily Cap */}
      <div className="lg:col-span-5 space-y-6">
        {/* XP Breakdown Card */}
        <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="p-5 border-b border-border/50">
            <h2 className="font-orbitron font-bold text-foreground flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              XP Breakdown
            </h2>
            <p className="text-xs text-muted-foreground mt-1">Where your XP comes from</p>
          </div>
          <div className="p-5 space-y-4">
            {XP_BREAKDOWN.map((item) => (
              <div key={item.category}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-foreground font-medium">{item.category}</span>
                  <span className="text-muted-foreground">{item.xp.toLocaleString()} XP ({item.percent}%)</span>
                </div>
                <div className="h-2.5 rounded-full bg-muted/40 overflow-hidden">
                  <div className={`h-full rounded-full ${item.color} transition-all duration-700`} style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            ))}
            <div className="pt-3 border-t border-border/30 flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Total XP</span>
              <span className="text-lg font-bold text-primary">{(currentXp || 6000).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Daily XP Cap Usage */}
        <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="p-5 border-b border-border/50">
            <h2 className="font-orbitron font-bold text-foreground flex items-center gap-2">
              <Calendar className="h-5 w-5 text-secondary" />
              Daily XP Cap – This Week
            </h2>
          </div>
          <div className="p-5 space-y-3">
            {DAILY_USAGE.map((day) => (
              <div key={day.day} className="flex items-center gap-3">
                <span className="w-8 text-xs font-medium text-muted-foreground">{day.day}</span>
                <div className="flex-1 h-3 rounded-full bg-muted/40 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(day.used / day.cap) * 100}%`,
                      background: day.used >= day.cap
                        ? 'hsl(var(--secondary))'
                        : 'hsl(var(--primary))',
                    }}
                  />
                </div>
                <span className={`text-xs font-medium w-16 text-right ${day.used >= day.cap ? 'text-secondary' : 'text-muted-foreground'}`}>
                  {day.used}/{day.cap}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Level History */}
        <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="p-5 border-b border-border/50">
            <h2 className="font-orbitron font-bold text-foreground flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Level History
            </h2>
          </div>
          <div className="p-5">
            <div className="space-y-0">
              {LEVEL_HISTORY.map((entry, i) => (
                <div key={entry.level} className="flex items-center gap-4 py-2.5 border-b border-border/20 last:border-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold border ${
                    i === 0
                      ? 'bg-primary/20 border-primary/40 text-primary'
                      : 'bg-muted/30 border-border/30 text-muted-foreground'
                  }`}>
                    {entry.level}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Level {entry.level} {i === 0 ? '(Current)' : ''}</p>
                    <p className="text-xs text-muted-foreground">{entry.date}</p>
                  </div>
                  {entry.xpEarned > 0 && (
                    <span className="text-xs font-medium text-secondary">+{entry.xpEarned.toLocaleString()} XP</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right column: Event History */}
      <div className="lg:col-span-7">
        <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm h-full">
          <div className="p-5 border-b border-border/50">
            <h2 className="font-orbitron font-bold text-foreground flex items-center gap-2">
              <Zap className="h-5 w-5 text-secondary" />
              Full Event History
            </h2>
            <p className="text-xs text-muted-foreground mt-1">All XP earned from your activity</p>
          </div>
          <ScrollArea className="h-[700px]">
            <div className="p-4 space-y-1">
              {RECENT_EVENTS.map((event, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors group animate-fade-in"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <div className="p-2.5 rounded-lg bg-primary/15 text-primary group-hover:bg-primary/25 transition-colors">
                    {event.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{event.label}</p>
                    <p className="text-xs text-muted-foreground">{event.time}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-sm font-bold text-secondary">+{event.xp}</span>
                    <span className="text-xs text-muted-foreground ml-0.5">XP</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
