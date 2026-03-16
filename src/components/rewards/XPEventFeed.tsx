import { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  CalendarCheck, Gamepad2, Clock, UserCheck, Play, TrendingUp,
  CheckCircle, Award, Target, Rocket, RotateCcw, Zap
} from 'lucide-react';

interface XPEvent {
  id: string;
  type: string;
  label: string;
  xp: number;
  timestamp: string;
  icon: React.ReactNode;
}

const EVENT_DATA: Omit<XPEvent, 'id' | 'timestamp'>[] = [
  { type: 'daily_login', label: 'Daily Login', xp: 25, icon: <CalendarCheck className="h-4 w-4" /> },
  { type: 'first_game', label: 'First Game of the Day', xp: 50, icon: <Gamepad2 className="h-4 w-4" /> },
  { type: 'time_milestone', label: 'Time Milestone (30 min)', xp: 30, icon: <Clock className="h-4 w-4" /> },
  { type: 'profile_completed', label: 'Profile Completed', xp: 100, icon: <UserCheck className="h-4 w-4" /> },
  { type: 'game_started', label: 'Game Started – Block Blast', xp: 10, icon: <Play className="h-4 w-4" /> },
  { type: 'level_up', label: 'Level Up in Candy Rush', xp: 50, icon: <TrendingUp className="h-4 w-4" /> },
  { type: 'stage_cleared', label: 'Stage Cleared – Tower Stack', xp: 40, icon: <CheckCircle className="h-4 w-4" /> },
  { type: 'session_completed', label: 'Session Completed', xp: 20, icon: <Award className="h-4 w-4" /> },
  { type: 'high_score', label: 'High Score Beaten!', xp: 75, icon: <Target className="h-4 w-4" /> },
  { type: 'score_milestone', label: 'Score Milestone (5000 pts)', xp: 50, icon: <Zap className="h-4 w-4" /> },
  { type: 'new_game', label: 'New Game Launched – Pixel Run', xp: 15, icon: <Rocket className="h-4 w-4" /> },
  { type: 'round_completed', label: 'Run Completed – Neon Dash', xp: 20, icon: <RotateCcw className="h-4 w-4" /> },
];

function timeAgo(minutes: number) {
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  return `${Math.floor(minutes / 60)}h ago`;
}

export function XPEventFeed() {
  const [events, setEvents] = useState<XPEvent[]>([]);

  useEffect(() => {
    // Generate mock events with staggered timestamps
    const generated = EVENT_DATA.map((e, i) => ({
      ...e,
      id: `evt-${i}`,
      timestamp: timeAgo(i * 12 + Math.floor(Math.random() * 10)),
    }));
    setEvents(generated);
  }, []);

  return (
    <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm h-full">
      <div className="p-4 border-b border-border/50">
        <h2 className="font-orbitron font-bold text-foreground flex items-center gap-2">
          <Zap className="h-5 w-5 text-secondary" />
          XP Event Feed
        </h2>
        <p className="text-xs text-muted-foreground mt-1">Recent XP earned from your activity</p>
      </div>
      <ScrollArea className="h-[380px]">
        <div className="p-3 space-y-1">
          {events.map((event, i) => (
            <div
              key={event.id}
              className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/30 transition-colors group animate-fade-in"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="p-2 rounded-lg bg-primary/15 text-primary group-hover:bg-primary/25 transition-colors">
                {event.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{event.label}</p>
                <p className="text-xs text-muted-foreground">{event.timestamp}</p>
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
  );
}
