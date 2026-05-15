import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarCheck, Gamepad2, Clock, Trophy, Star,
  CheckCircle2, Circle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface Mission {
  id: string;
  label: string;
  xpReward: number;
  icon: React.ReactNode;
  completed: boolean;
}

const MISSIONS: Mission[] = [
  { id: 'daily-login', label: 'Daily Login',         xpReward: 25, icon: <CalendarCheck className="h-4 w-4" />, completed: true },
  { id: 'first-game',  label: 'Play Your First Game',xpReward: 50, icon: <Gamepad2 className="h-4 w-4" />,      completed: true },
  { id: 'play-30',     label: 'Play for 30 Minutes', xpReward: 30, icon: <Clock className="h-4 w-4" />,         completed: false },
  { id: 'win-3',       label: 'Win 3 Rounds',        xpReward: 60, icon: <Trophy className="h-4 w-4" />,        completed: false },
  { id: 'try-new',     label: 'Try a New Game',      xpReward: 40, icon: <Star className="h-4 w-4" />,          completed: false },
  { id: 'high-score',  label: 'Beat a High Score',   xpReward: 75, icon: <Trophy className="h-4 w-4" />,        completed: false },
];

const TOTAL = MISSIONS.length;

export function DailyMissionsNavItem() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const showTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);

  const completed = MISSIONS.filter(m => m.completed).length;
  const incomplete = TOTAL - completed;

  const handleEnter = () => {
    if (isMobile) return;
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    if (!open) {
      showTimer.current = window.setTimeout(() => setOpen(true), 150);
    }
  };
  const handleLeave = () => {
    if (isMobile) return;
    if (showTimer.current) {
      window.clearTimeout(showTimer.current);
      showTimer.current = null;
    }
    closeTimer.current = window.setTimeout(() => setOpen(false), 150);
  };

  return (
    <div
      className="relative pb-3"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Link to="/daily-missions">
        <Button variant="ghost" size="sm" className="gap-2 h-10">
          <span aria-hidden="true">🔥</span>
          Daily Missions
          <span
            className="ml-1 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold"
            style={{ backgroundColor: 'rgba(245,196,26,0.15)', color: '#F5C41A' }}
          >
            {incomplete}/{TOTAL}
          </span>
        </Button>
      </Link>

      {/* Desktop hover popup */}
      {open && !isMobile && (
        <div
          className="absolute left-0 top-full z-50 animate-fade-in"
          style={{
            minWidth: 320,
            backgroundColor: '#1A1730',
            border: '1px solid #2E2A50',
            borderRadius: 12,
            boxShadow: '0 12px 32px rgba(0,0,0,0.45)',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: '1px solid #2E2A50' }}
          >
            <span className="text-sm font-semibold text-foreground">
              <span aria-hidden="true">🔥</span> Daily Missions
            </span>
            <span
              className="text-[11px] font-bold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: 'rgba(245,196,26,0.15)', color: '#F5C41A' }}
            >
              {completed}/{TOTAL} Done
            </span>
          </div>

          {/* List - first 5 */}
          <ul className="py-2">
            {MISSIONS.slice(0, 5).map((m) => (
              <li
                key={m.id}
                className="flex items-center gap-3 px-4 py-2"
              >
                <span className={m.completed ? 'text-primary' : 'text-muted-foreground'}>
                  {m.icon}
                </span>
                <span className={`flex-1 text-sm truncate ${m.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                  {m.label}
                </span>
                <span className="text-xs font-bold" style={{ color: '#F5C41A' }}>
                  +{m.xpReward} XP
                </span>
                {m.completed ? (
                  <CheckCircle2 className="h-4 w-4" style={{ color: '#F5C41A' }} />
                ) : (
                  <Circle className="h-4 w-4 text-muted-foreground" />
                )}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="p-3" style={{ borderTop: '1px solid #2E2A50' }}>
            <Link to="/daily-missions" onClick={() => setOpen(false)}>
              <button
                className="w-full text-sm font-semibold py-2 rounded-lg text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#7C3AED' }}
              >
                View All Missions →
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
