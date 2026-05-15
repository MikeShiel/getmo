import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarCheck, Gamepad2, Clock, Trophy, Sparkles, Zap, Brain, Car,
  Users as UsersIcon, Shield, Crown, Flame, Star, Target, Award, Medal,
  TrendingUp, Rocket, CheckCircle, Circle,
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';

const PURPLE = '#7C3AED';
const GOLD = '#F5C41A';
const CARD_BG = '#1A1730';
const BORDER = '#2E2A50';
const MUTED = 'hsl(var(--muted-foreground))';
const GREEN = '#22C55E';

type Category = 'daily' | 'gameplay' | 'social' | 'milestones';

interface Challenge {
  id: string;
  category: Category;
  name: string;
  desc: string;
  xp: number;
  icon: React.ReactNode;
  done: boolean;
  progress?: { current: number; target: number; label?: string };
}

const CHALLENGES: Challenge[] = [
  // Daily
  { id: 'd1', category: 'daily', name: 'Daily Login', desc: 'Log in to Getmo today', xp: 25, icon: <CalendarCheck className="h-5 w-5" />, done: true },
  { id: 'd2', category: 'daily', name: 'Play Your First Game', desc: 'Launch any game today', xp: 50, icon: <Gamepad2 className="h-5 w-5" />, done: true },
  { id: 'd3', category: 'daily', name: 'Play for 30 Minutes', desc: 'Spend 30 mins in active gameplay', xp: 30, icon: <Clock className="h-5 w-5" />, done: false, progress: { current: 18, target: 30 } },
  { id: 'd4', category: 'daily', name: 'Win 3 Rounds', desc: 'Complete 3 rounds in any game', xp: 60, icon: <Trophy className="h-5 w-5" />, done: false, progress: { current: 1, target: 3 } },
  { id: 'd5', category: 'daily', name: 'Try a New Game', desc: "Play a game you haven't tried before", xp: 40, icon: <Sparkles className="h-5 w-5" />, done: false },
  { id: 'd6', category: 'daily', name: 'Beat a High Score', desc: 'Set a new personal best', xp: 75, icon: <Zap className="h-5 w-5" />, done: false },
  { id: 'd7', category: 'daily', name: 'Play 5 Different Games', desc: 'Variety challenge', xp: 50, icon: <Star className="h-5 w-5" />, done: false, progress: { current: 2, target: 5 } },
  { id: 'd8', category: 'daily', name: 'Complete a Puzzle Game', desc: 'Finish any puzzle game session', xp: 35, icon: <Brain className="h-5 w-5" />, done: false },

  // Gameplay
  { id: 'g1', category: 'gameplay', name: 'First Blood', desc: 'Play your very first game on Getmo', xp: 50, icon: <Gamepad2 className="h-5 w-5" />, done: true },
  { id: 'g2', category: 'gameplay', name: 'Warm Up', desc: 'Play 5 games total', xp: 40, icon: <Flame className="h-5 w-5" />, done: true },
  { id: 'g3', category: 'gameplay', name: 'Getting Serious', desc: 'Play 25 games total', xp: 100, icon: <Target className="h-5 w-5" />, done: false, progress: { current: 18, target: 25 } },
  { id: 'g4', category: 'gameplay', name: 'Century Club', desc: 'Play 100 games total', xp: 250, icon: <Award className="h-5 w-5" />, done: false, progress: { current: 18, target: 100 } },
  { id: 'g5', category: 'gameplay', name: 'Genre Explorer', desc: 'Play a game in 5 different categories', xp: 150, icon: <Sparkles className="h-5 w-5" />, done: false, progress: { current: 3, target: 5 } },
  { id: 'g6', category: 'gameplay', name: 'Puzzle Enthusiast', desc: 'Play 5 puzzle games', xp: 75, icon: <Brain className="h-5 w-5" />, done: true },
  { id: 'g7', category: 'gameplay', name: 'Puzzle Master', desc: 'Play 10 puzzle games', xp: 150, icon: <Brain className="h-5 w-5" />, done: false, progress: { current: 6, target: 10 } },
  { id: 'g8', category: 'gameplay', name: 'Speed Fan', desc: 'Play 5 racing games', xp: 75, icon: <Car className="h-5 w-5" />, done: true },
  { id: 'g9', category: 'gameplay', name: 'Speed Racer', desc: 'Play 10 racing games', xp: 150, icon: <Car className="h-5 w-5" />, done: false, progress: { current: 3, target: 10 } },
  { id: 'g10', category: 'gameplay', name: 'Arcade Lover', desc: 'Play 10 arcade games', xp: 150, icon: <Gamepad2 className="h-5 w-5" />, done: false, progress: { current: 5, target: 10 } },
  { id: 'g11', category: 'gameplay', name: 'Strategy Mind', desc: 'Play 10 strategy games', xp: 150, icon: <Target className="h-5 w-5" />, done: false, progress: { current: 2, target: 10 } },
  { id: 'g12', category: 'gameplay', name: 'Round 1', desc: 'Complete your first round', xp: 20, icon: <Trophy className="h-5 w-5" />, done: true },
  { id: 'g13', category: 'gameplay', name: 'Round and Round', desc: 'Complete 10 rounds', xp: 60, icon: <Trophy className="h-5 w-5" />, done: true },
  { id: 'g14', category: 'gameplay', name: 'Veteran', desc: 'Complete 50 rounds total', xp: 200, icon: <Medal className="h-5 w-5" />, done: false, progress: { current: 32, target: 50 } },
  { id: 'g15', category: 'gameplay', name: 'Centurion', desc: 'Complete 100 rounds total', xp: 400, icon: <Medal className="h-5 w-5" />, done: false, progress: { current: 32, target: 100 } },
  { id: 'g16', category: 'gameplay', name: 'High Scorer', desc: 'Beat your personal best once', xp: 75, icon: <Zap className="h-5 w-5" />, done: true },
  { id: 'g17', category: 'gameplay', name: 'On a Roll', desc: 'Beat your personal best 5 times', xp: 150, icon: <Zap className="h-5 w-5" />, done: false, progress: { current: 3, target: 5 } },
  { id: 'g18', category: 'gameplay', name: 'Unstoppable', desc: 'Beat your personal best 10 times', xp: 300, icon: <Rocket className="h-5 w-5" />, done: false, progress: { current: 3, target: 10 } },

  // Social
  { id: 's1', category: 'social', name: 'First Friend', desc: 'Add your first friend', xp: 25, icon: <UsersIcon className="h-5 w-5" />, done: true },
  { id: 's2', category: 'social', name: 'Squad Up', desc: 'Add 5 friends', xp: 75, icon: <UsersIcon className="h-5 w-5" />, done: false, progress: { current: 3, target: 5 } },
  { id: 's3', category: 'social', name: 'Social Butterfly', desc: 'Add 10 friends', xp: 150, icon: <UsersIcon className="h-5 w-5" />, done: false, progress: { current: 3, target: 10 } },
  { id: 's4', category: 'social', name: 'Rival', desc: "Beat a friend's score in any game", xp: 100, icon: <Trophy className="h-5 w-5" />, done: false },
  { id: 's5', category: 'social', name: 'Clan Member', desc: 'Join any clan', xp: 75, icon: <Shield className="h-5 w-5" />, done: true },
  { id: 's6', category: 'social', name: 'Clan Loyal', desc: 'Stay in a clan for 7 days', xp: 100, icon: <Shield className="h-5 w-5" />, done: false, progress: { current: 2, target: 7 } },
  { id: 's7', category: 'social', name: 'Clan Champion', desc: 'Top your clan leaderboard', xp: 200, icon: <Crown className="h-5 w-5" />, done: false },

  // Milestones
  { id: 'm1', category: 'milestones', name: 'First Level Up', desc: 'Reach LV.2', xp: 100, icon: <TrendingUp className="h-5 w-5" />, done: true },
  { id: 'm2', category: 'milestones', name: 'Rising Star', desc: 'Reach LV.5', xp: 200, icon: <Star className="h-5 w-5" />, done: false, progress: { current: 1, target: 5, label: 'LV.1 currently' } },
  { id: 'm3', category: 'milestones', name: 'Veteran Player', desc: 'Reach LV.10', xp: 500, icon: <Award className="h-5 w-5" />, done: false, progress: { current: 1, target: 10, label: 'LV.1 currently' } },
  { id: 'm4', category: 'milestones', name: 'XP Grinder', desc: 'Earn 1,000 XP total', xp: 150, icon: <Zap className="h-5 w-5" />, done: true },
  { id: 'm5', category: 'milestones', name: 'XP Machine', desc: 'Earn 5,000 XP total', xp: 300, icon: <Zap className="h-5 w-5" />, done: true, progress: { current: 6000, target: 5000 } },
  { id: 'm6', category: 'milestones', name: 'Top 10', desc: 'Reach top 10 on any leaderboard', xp: 150, icon: <Trophy className="h-5 w-5" />, done: false },
  { id: 'm7', category: 'milestones', name: 'Top Dog', desc: 'Reach #1 on any leaderboard', xp: 300, icon: <Crown className="h-5 w-5" />, done: false },
  { id: 'm8', category: 'milestones', name: 'Daily Devotion', desc: 'Hit daily XP cap 3 times', xp: 150, icon: <Target className="h-5 w-5" />, done: false, progress: { current: 2, target: 3 } },
  { id: 'm9', category: 'milestones', name: 'Weekly Warrior', desc: 'Hit daily XP cap 5 days in one week', xp: 300, icon: <Target className="h-5 w-5" />, done: false, progress: { current: 2, target: 5 } },
  { id: 'm10', category: 'milestones', name: 'Streak Starter', desc: 'Log in 3 days in a row', xp: 75, icon: <Flame className="h-5 w-5" />, done: true },
  { id: 'm11', category: 'milestones', name: 'Dedicated', desc: 'Log in 7 days in a row', xp: 150, icon: <Flame className="h-5 w-5" />, done: false, progress: { current: 5, target: 7 } },
  { id: 'm12', category: 'milestones', name: 'Comeback Kid', desc: 'Return after 7 days away', xp: 50, icon: <Rocket className="h-5 w-5" />, done: false },
];

type Filter = 'all' | Category;
const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'daily', label: 'Daily' },
  { id: 'gameplay', label: 'Gameplay' },
  { id: 'social', label: 'Social' },
  { id: 'milestones', label: 'Milestones' },
];

const CAT_ORDER: Category[] = ['daily', 'gameplay', 'social', 'milestones'];

export default function Challenges() {
  const [filter, setFilter] = useState<Filter>('all');

  const sorted = useMemo(() => {
    const list = filter === 'all' ? CHALLENGES : CHALLENGES.filter(c => c.category === filter);
    const pct = (c: Challenge) => (c.progress ? c.progress.current / c.progress.target : 0);
    return [...list].sort((a, b) => {
      if (a.category !== b.category) {
        return CAT_ORDER.indexOf(a.category) - CAT_ORDER.indexOf(b.category);
      }
      if (a.done !== b.done) return a.done ? 1 : -1;
      return pct(b) - pct(a);
    });
  }, [filter]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto" style={{ maxWidth: 720 }}>
          <Link
            to="/my-progress?tab=xp"
            className="text-sm font-semibold inline-block mb-4"
            style={{ color: PURPLE }}
          >
            ← Back to My Progress
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white">All Challenges</h1>
          <p className="mt-1 text-sm" style={{ color: MUTED }}>
            Complete challenges to earn XP and unlock rewards
          </p>

          <div className="flex flex-wrap gap-2 mt-5 mb-5">
            {FILTERS.map(f => {
              const active = f.id === filter;
              return (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className="px-4 py-1.5 rounded-full text-sm font-semibold transition-colors"
                  style={{
                    backgroundColor: active ? '#fff' : CARD_BG,
                    color: active ? '#0D0B1E' : '#fff',
                    border: `1px solid ${active ? '#fff' : BORDER}`,
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-2">
            {sorted.map(c => <ChallengeCard key={c.id} c={c} />)}
          </div>
        </div>
      </div>
    </Layout>
  );
}

function ChallengeCard({ c }: { c: Challenge }) {
  const pct = c.progress ? Math.min(100, (c.progress.current / c.progress.target) * 100) : 0;
  return (
    <div
      className="p-4 flex items-center gap-4"
      style={{
        backgroundColor: CARD_BG,
        borderRadius: 12,
        borderLeft: c.done ? `2px solid ${GREEN}` : `2px solid transparent`,
      }}
    >
      <div
        className="flex-shrink-0 flex items-center justify-center rounded-full"
        style={{ width: 44, height: 44, backgroundColor: '#0D0B1E', color: c.done ? GREEN : PURPLE }}
      >
        {c.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="font-bold text-white"
          style={c.done ? { textDecoration: 'line-through', opacity: 0.7 } : undefined}
        >
          {c.name}
        </p>
        <p className="text-xs" style={{ color: MUTED }}>{c.desc}</p>
        {c.progress && !c.done && (
          <div className="mt-2">
            <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: BORDER }}>
              <div className="h-full" style={{ width: `${pct}%`, backgroundColor: pct >= 80 ? GOLD : PURPLE }} />
            </div>
            <p className="text-[11px] mt-1" style={{ color: MUTED }}>
              {c.progress.label ?? `${c.progress.current}/${c.progress.target}`}
            </p>
          </div>
        )}
      </div>
      <div className="flex-shrink-0 flex flex-col items-end gap-1">
        <p className="font-bold text-sm" style={{ color: GOLD }}>+{c.xp} XP</p>
        {c.done ? (
          <CheckCircle className="h-5 w-5" style={{ color: GOLD, fill: GOLD }} />
        ) : (
          <Circle className="h-5 w-5" style={{ color: BORDER }} />
        )}
      </div>
    </div>
  );
}