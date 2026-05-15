import {
  CalendarCheck, Gamepad2, Clock, Trophy, Star, Target,
  CheckCircle2, Circle,
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Progress } from '@/components/ui/progress';

interface Mission {
  id: string;
  label: string;
  description: string;
  xpReward: number;
  icon: React.ReactNode;
  completed: boolean;
  progress?: { current: number; target: number };
}

const MISSIONS: Mission[] = [
  { id: 'daily-login', label: 'Daily Login',          description: 'Log in to Getmo today',                       xpReward: 25, icon: <CalendarCheck className="h-5 w-5" />, completed: true },
  { id: 'first-game',  label: 'Play Your First Game', description: 'Launch and play any game today',              xpReward: 50, icon: <Gamepad2 className="h-5 w-5" />,      completed: true },
  { id: 'play-30',     label: 'Play for 30 Minutes',  description: 'Spend 30 minutes in active gameplay',         xpReward: 30, icon: <Clock className="h-5 w-5" />,         completed: false, progress: { current: 18, target: 30 } },
  { id: 'win-3',       label: 'Win 3 Rounds',         description: 'Complete 3 rounds or levels in any game',     xpReward: 60, icon: <Trophy className="h-5 w-5" />,        completed: false, progress: { current: 1, target: 3 } },
  { id: 'try-new',     label: 'Try a New Game',       description: "Play a game you haven't tried before",        xpReward: 40, icon: <Star className="h-5 w-5" />,          completed: false },
  { id: 'high-score',  label: 'Beat a High Score',    description: 'Set a new personal best in any game',         xpReward: 75, icon: <Target className="h-5 w-5" />,        completed: false },
];

const GOLD = '#F5C41A';
const PURPLE = '#7C3AED';
const CARD_BG = '#1A1730';
const BORDER = '#2E2A50';

export default function DailyMissions() {
  const totalXP = MISSIONS.reduce((s, m) => s + m.xpReward, 0);
  const earnedXP = MISSIONS.filter(m => m.completed).reduce((s, m) => s + m.xpReward, 0);
  const pct = (earnedXP / totalXP) * 100;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto" style={{ maxWidth: 720 }}>
          {/* Header */}
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            <span aria-hidden="true">🔥</span> Daily Missions
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Resets at midnight · {earnedXP}/{totalXP} XP earned today
          </p>

          {/* Overall progress */}
          <div className="mt-4 w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: BORDER }}>
            <div
              className="h-full transition-all"
              style={{ width: `${pct}%`, backgroundColor: PURPLE }}
            />
          </div>

          {/* Missions list */}
          <ul className="mt-8 flex flex-col" style={{ gap: 12 }}>
            {MISSIONS.map((m) => (
              <li
                key={m.id}
                className="flex items-start gap-4 p-4"
                style={{
                  backgroundColor: CARD_BG,
                  borderRadius: 12,
                  border: `1px solid ${BORDER}`,
                  borderLeft: m.completed ? '4px solid #22C55E' : `1px solid ${BORDER}`,
                  opacity: m.completed ? 0.75 : 1,
                }}
              >
                {/* Icon */}
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-full"
                  style={{
                    width: 44, height: 44,
                    backgroundColor: '#0F0D1F',
                    color: m.completed ? GOLD : '#A8A0C8',
                  }}
                >
                  {m.icon}
                </div>

                {/* Middle */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm md:text-base font-bold ${m.completed ? 'line-through text-muted-foreground' : 'text-white'}`}>
                    {m.label}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
                    {m.description}
                  </p>
                  {m.progress && !m.completed && (
                    <div className="mt-2 flex items-center gap-2">
                      <Progress
                        value={(m.progress.current / m.progress.target) * 100}
                        className="h-1.5 flex-1"
                      />
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {m.progress.current}/{m.progress.target}
                      </span>
                    </div>
                  )}
                </div>

                {/* Right */}
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <span className="text-sm font-bold" style={{ color: GOLD }}>
                    +{m.xpReward} XP
                  </span>
                  {m.completed ? (
                    <CheckCircle2 className="h-5 w-5" style={{ color: GOLD }} />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
