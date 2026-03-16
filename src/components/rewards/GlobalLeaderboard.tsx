import { useState } from 'react';
import { Crown, TrendingUp, TrendingDown, Minus, Shield } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/AuthContext';

type TimeFilter = 'all_time' | 'this_week';

interface LeaderEntry {
  rank: number;
  gamer_name: string;
  xp: number;
  trend: 'up' | 'down' | 'same';
  isCurrentUser?: boolean;
}

const MOCK_ALL_TIME: LeaderEntry[] = [
  { rank: 1, gamer_name: 'NeonMaster', xp: 24800, trend: 'same' },
  { rank: 2, gamer_name: 'PixelWizard', xp: 21350, trend: 'up' },
  { rank: 3, gamer_name: 'StarChaser', xp: 19700, trend: 'down' },
  { rank: 4, gamer_name: 'VelocityKing', xp: 17200, trend: 'up' },
  { rank: 5, gamer_name: 'ZenPlayer', xp: 15500, trend: 'same' },
  { rank: 6, gamer_name: 'GameHunter', xp: 14100, trend: 'down' },
  { rank: 7, gamer_name: 'QuantumPro', xp: 12950, trend: 'up' },
  { rank: 8, gamer_name: 'CyberNinja', xp: 11200, trend: 'same' },
  { rank: 9, gamer_name: 'RetroGamer', xp: 9700, trend: 'up' },
  { rank: 10, gamer_name: 'DigitalAce', xp: 8400, trend: 'down' },
];

const MOCK_WEEKLY: LeaderEntry[] = [
  { rank: 1, gamer_name: 'PixelWizard', xp: 3200, trend: 'up' },
  { rank: 2, gamer_name: 'VelocityKing', xp: 2900, trend: 'up' },
  { rank: 3, gamer_name: 'NeonMaster', xp: 2600, trend: 'down' },
  { rank: 4, gamer_name: 'QuantumPro', xp: 2100, trend: 'up' },
  { rank: 5, gamer_name: 'StarChaser', xp: 1850, trend: 'same' },
  { rank: 6, gamer_name: 'RetroGamer', xp: 1600, trend: 'up' },
  { rank: 7, gamer_name: 'GameHunter', xp: 1400, trend: 'down' },
  { rank: 8, gamer_name: 'CyberNinja', xp: 1200, trend: 'same' },
  { rank: 9, gamer_name: 'ZenPlayer', xp: 950, trend: 'down' },
  { rank: 10, gamer_name: 'DigitalAce', xp: 700, trend: 'same' },
];

const TrendIcon = ({ trend }: { trend: string }) => {
  if (trend === 'up') return <TrendingUp className="h-3.5 w-3.5 text-green-500" />;
  if (trend === 'down') return <TrendingDown className="h-3.5 w-3.5 text-destructive" />;
  return <Minus className="h-3.5 w-3.5 text-muted-foreground" />;
};

const RankBadge = ({ rank }: { rank: number }) => {
  if (rank === 1) return <div className="w-8 h-8 rounded-full flex items-center justify-center bg-secondary/20 border border-secondary/40"><Crown className="h-4 w-4 text-secondary" /></div>;
  if (rank === 2) return <div className="w-8 h-8 rounded-full flex items-center justify-center bg-muted/60 border border-muted-foreground/30"><span className="text-sm font-bold text-muted-foreground">2</span></div>;
  if (rank === 3) return <div className="w-8 h-8 rounded-full flex items-center justify-center bg-amber-700/20 border border-amber-600/30"><span className="text-sm font-bold text-amber-500">3</span></div>;
  return <div className="w-8 h-8 rounded-full flex items-center justify-center bg-muted/30"><span className="text-sm text-muted-foreground">#{rank}</span></div>;
};

export function GlobalLeaderboard() {
  const [filter, setFilter] = useState<TimeFilter>('all_time');
  const { profile } = useAuth();
  const data = filter === 'all_time' ? MOCK_ALL_TIME : MOCK_WEEKLY;

  // Mark current user for highlight
  const entries = data.map(e => ({
    ...e,
    isCurrentUser: profile?.gamer_name === e.gamer_name,
  }));

  return (
    <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm h-full">
      <div className="p-4 border-b border-border/50 flex items-center justify-between">
        <h2 className="font-orbitron font-bold text-foreground flex items-center gap-2">
          <Crown className="h-5 w-5 text-secondary" />
          Global Leaderboard
        </h2>
        <div className="flex rounded-lg border border-border/50 overflow-hidden">
          <button
            onClick={() => setFilter('all_time')}
            className={`px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === 'all_time' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            All Time
          </button>
          <button
            onClick={() => setFilter('this_week')}
            className={`px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === 'this_week' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            This Week
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="grid grid-cols-12 gap-2 px-4 py-2 text-xs text-muted-foreground border-b border-border/30">
        <span className="col-span-1">Rank</span>
        <span className="col-span-5">Player</span>
        <span className="col-span-3 text-right">Total XP</span>
        <span className="col-span-3 text-right">Trend</span>
      </div>

      <ScrollArea className="h-[350px]">
        <div className="divide-y divide-border/20">
          {entries.map((entry) => (
            <div
              key={entry.rank}
              className={`grid grid-cols-12 gap-2 items-center px-4 py-3 transition-colors hover:bg-muted/20 ${
                entry.isCurrentUser ? 'bg-primary/10 border-l-2 border-l-primary' : ''
              }`}
            >
              <div className="col-span-1">
                <RankBadge rank={entry.rank} />
              </div>
              <div className="col-span-5 flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-muted/50 border border-border/30 flex items-center justify-center">
                  <Shield className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <span className={`text-sm font-medium truncate ${entry.isCurrentUser ? 'text-primary' : 'text-foreground'}`}>
                  {entry.gamer_name}
                  {entry.isCurrentUser && <span className="text-xs text-primary/70 ml-1">(You)</span>}
                </span>
              </div>
              <div className="col-span-3 text-right">
                <span className="text-sm font-bold text-foreground">{entry.xp.toLocaleString()}</span>
                <span className="text-xs text-muted-foreground ml-1">XP</span>
              </div>
              <div className="col-span-3 flex justify-end">
                <TrendIcon trend={entry.trend} />
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
