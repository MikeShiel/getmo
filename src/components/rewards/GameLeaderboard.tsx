import { useState, useEffect } from 'react';
import { Gamepad2, Shield } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';

interface Game {
  id: string;
  title: string;
}

interface GameEntry {
  rank: number;
  gamer_name: string;
  highest_score: number;
  level_reached: number;
  last_played: string;
}

const MOCK_ENTRIES: GameEntry[] = [
  { rank: 1, gamer_name: 'NeonMaster', highest_score: 12500, level_reached: 15, last_played: '2h ago' },
  { rank: 2, gamer_name: 'PixelWizard', highest_score: 11200, level_reached: 13, last_played: '5h ago' },
  { rank: 3, gamer_name: 'StarChaser', highest_score: 9800, level_reached: 11, last_played: '1d ago' },
  { rank: 4, gamer_name: 'VelocityKing', highest_score: 8500, level_reached: 10, last_played: '3h ago' },
  { rank: 5, gamer_name: 'QuantumPro', highest_score: 7200, level_reached: 8, last_played: '12h ago' },
  { rank: 6, gamer_name: 'CyberNinja', highest_score: 6100, level_reached: 7, last_played: '1d ago' },
  { rank: 7, gamer_name: 'RetroGamer', highest_score: 5400, level_reached: 6, last_played: '2d ago' },
  { rank: 8, gamer_name: 'GameHunter', highest_score: 4200, level_reached: 5, last_played: '6h ago' },
];

export function GameLeaderboard() {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<string>('');

  useEffect(() => {
    const fetchGames = async () => {
      const { data } = await supabase.from('games').select('id, title').order('title');
      if (data && data.length > 0) {
        setGames(data);
        setSelectedGame(data[0].id);
      }
    };
    fetchGames();
  }, []);

  return (
    <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm h-full">
      <div className="p-4 border-b border-border/50 flex items-center justify-between flex-wrap gap-3">
        <h2 className="font-orbitron font-bold text-foreground flex items-center gap-2">
          <Gamepad2 className="h-5 w-5 text-primary" />
          Game Leaderboard
        </h2>
        <Select value={selectedGame} onValueChange={setSelectedGame}>
          <SelectTrigger className="w-48 bg-muted/30 border-border/50 h-9">
            <SelectValue placeholder="Select a game" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border z-[100]">
            {games.map(g => (
              <SelectItem key={g.id} value={g.id}>{g.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-12 gap-2 px-4 py-2 text-xs text-muted-foreground border-b border-border/30">
        <span className="col-span-1">#</span>
        <span className="col-span-3">Player</span>
        <span className="col-span-3 text-right">High Score</span>
        <span className="col-span-2 text-right">Level</span>
        <span className="col-span-3 text-right">Last Played</span>
      </div>

      <ScrollArea className="h-[280px]">
        <div className="divide-y divide-border/20">
          {MOCK_ENTRIES.map((entry) => (
            <div key={entry.rank} className="grid grid-cols-12 gap-2 items-center px-4 py-2.5 hover:bg-muted/20 transition-colors">
              <div className="col-span-1">
                <span className={`text-sm font-bold ${entry.rank <= 3 ? 'text-secondary' : 'text-muted-foreground'}`}>
                  {entry.rank}
                </span>
              </div>
              <div className="col-span-3 flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-muted/50 border border-border/30 flex items-center justify-center">
                  <Shield className="h-3 w-3 text-muted-foreground" />
                </div>
                <span className="text-sm font-medium text-foreground truncate">{entry.gamer_name}</span>
              </div>
              <div className="col-span-3 text-right">
                <span className="text-sm font-bold text-foreground">{entry.highest_score.toLocaleString()}</span>
              </div>
              <div className="col-span-2 text-right">
                <span className="text-sm text-primary font-medium">Lv.{entry.level_reached}</span>
              </div>
              <div className="col-span-3 text-right">
                <span className="text-xs text-muted-foreground">{entry.last_played}</span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
