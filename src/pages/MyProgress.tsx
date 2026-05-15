import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Award, Crown, Lock, Gamepad2, Flame, Brain, Car, Trophy, Users as UsersIcon,
  Shield, Medal, Check,
  CalendarCheck, Clock, UserCheck, Play, TrendingUp, CheckCircle, Target, Rocket, RotateCcw, Zap,
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/AuthContext';
import { useGuest } from '@/contexts/GuestContext';
import { useAvatar, AvatarVisual, AvatarId } from '@/contexts/AvatarContext';
import { AvatarPickerModal } from '@/components/avatars/AvatarPickerModal';

const PURPLE = '#7C3AED';
const GOLD = '#F5C41A';
const CARD_BG = '#1A1730';
const BORDER = '#2E2A50';

type Tab = 'xp' | 'rewards' | 'activity';

const TABS: { id: Tab; label: string }[] = [
  { id: 'xp',       label: 'XP & Level' },
  { id: 'rewards',  label: 'Rewards' },
  { id: 'activity', label: 'Activity' },
];

type Rarity = 'common' | 'rare' | 'epic' | 'legendary';
const RARITY: Record<Rarity, { label: string; color: string }> = {
  common:    { label: 'Common',    color: '#9CA3AF' },
  rare:      { label: 'Rare',      color: '#3B82F6' },
  epic:      { label: 'Epic',      color: '#A855F7' },
  legendary: { label: 'Legendary', color: GOLD },
};

interface Badge {
  id: string;
  name: string;
  rarity: Rarity;
  condition: string;
  unlocked: boolean;
  date?: string;
  progress?: { current: number; target: number };
  icon: React.ReactNode;
}

const BADGES: Badge[] = [
  { id: 'first-game',   name: 'First Game',   rarity: 'common', condition: 'Play any game for the first time', unlocked: true,  date: 'Feb 1, 2026',  icon: <Gamepad2 className="h-7 w-7" /> },
  { id: 'dedicated',    name: 'Dedicated',    rarity: 'common', condition: 'Log in 7 days in a row',           unlocked: true,  date: 'Feb 8, 2026',  icon: <Flame className="h-7 w-7" /> },
  { id: 'puzzle-master',name: 'Puzzle Master',rarity: 'rare',   condition: 'Play 10 puzzle games',             unlocked: false, progress: { current: 6, target: 10 }, icon: <Brain className="h-7 w-7" /> },
  { id: 'speed-racer',  name: 'Speed Racer',  rarity: 'rare',   condition: 'Play 10 racing games',             unlocked: false, progress: { current: 3, target: 10 }, icon: <Car className="h-7 w-7" /> },
  { id: 'top-dog',      name: 'Top Dog',      rarity: 'epic',   condition: 'Reach #1 on any leaderboard',      unlocked: false, icon: <Trophy className="h-7 w-7" /> },
  { id: 'rival',        name: 'Rival',        rarity: 'rare',   condition: "Beat a friend's score in any game",unlocked: false, icon: <UsersIcon className="h-7 w-7" /> },
  { id: 'clan-member',  name: 'Clan Member',  rarity: 'common', condition: 'Join any clan',                    unlocked: true,  date: 'Mar 2, 2026',  icon: <Shield className="h-7 w-7" /> },
  { id: 'veteran',      name: 'Veteran',      rarity: 'epic',   condition: 'Complete 50 rounds total',         unlocked: false, progress: { current: 32, target: 50 }, icon: <Medal className="h-7 w-7" /> },
];

export default function MyProgressPage() {
  const [tab, setTab] = useState<Tab>('xp');
  const [params, setParams] = useSearchParams();
  const [pickerOpen, setPickerOpen] = useState(false);
  const badgesRef = useRef<HTMLHeadingElement | null>(null);
  const avatarsRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const scrollTo = params.get('scrollTo');
    const wantsTab = params.get('tab') as Tab | null;
    if (params.get('openAvatar') === '1') {
      setTab('rewards');
      setPickerOpen(true);
      params.delete('openAvatar');
      setParams(params, { replace: true });
      return;
    }
    if (wantsTab === 'rewards' || scrollTo === 'badges' || scrollTo === 'avatars') {
      setTab('rewards');
      // Scroll after the tab content has rendered.
      setTimeout(() => {
        const target =
          scrollTo === 'badges' ? badgesRef.current :
          scrollTo === 'avatars' ? avatarsRef.current : null;
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
      params.delete('tab');
      params.delete('scrollTo');
      setParams(params, { replace: true });
    }
  }, [params, setParams]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto" style={{ maxWidth: 1100 }}>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">My Progress</h1>

          {/* Tabs */}
          <div className="flex gap-1 border-b mb-6" style={{ borderColor: BORDER }}>
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="px-4 py-2.5 text-sm font-semibold transition-colors"
                style={{
                  color: tab === t.id ? '#fff' : 'hsl(var(--muted-foreground))',
                  borderBottom: tab === t.id ? `2px solid ${PURPLE}` : '2px solid transparent',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'xp' && <XPLevelTab />}
          {tab === 'rewards' && (
            <RewardsTab
              onOpenPicker={() => setPickerOpen(true)}
              badgesRef={badgesRef}
              avatarsRef={avatarsRef}
            />
          )}
          {tab === 'activity' && <ActivityTab />}

          <AvatarPickerModal open={pickerOpen} onOpenChange={setPickerOpen} initialTab="earned" />
        </div>
      </div>
    </Layout>
  );
}

// ---- Rewards Tab ----
function RewardsTab({
  onOpenPicker,
  badgesRef,
  avatarsRef,
}: {
  onOpenPicker: () => void;
  badgesRef?: React.RefObject<HTMLHeadingElement>;
  avatarsRef?: React.RefObject<HTMLHeadingElement>;
}) {
  const { profile } = useAuth();
  const { displayName, displayLevel } = useGuest();
  const { equipped, kingUnlocked, setEquipped } = useAvatar();

  const name = profile?.gamer_name || displayName || 'Guest';
  const initial = (name || 'G').charAt(0).toUpperCase();

  const equip = (id: AvatarId) => {
    setEquipped(id);
    toast(id === 'king' ? 'King Getmo equipped 👑' : 'Standard Getmo equipped');
  };

  return (
    <div className="animate-fade-in">
      {/* Identity */}
      <div className="p-5 flex items-center gap-5" style={{ backgroundColor: CARD_BG, borderRadius: 12, border: `1px solid ${BORDER}` }}>
        <AvatarVisual id={equipped} size={80} initial={initial} />
        <div className="flex-1 min-w-0">
          <p className="text-lg font-bold text-white truncate">{name}</p>
          <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[11px] font-bold text-white" style={{ backgroundColor: PURPLE }}>
            LV.{displayLevel}
          </span>
        </div>
        <button
          onClick={onOpenPicker}
          className="px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-colors hover:bg-white/5"
          style={{ color: PURPLE, borderColor: PURPLE }}
        >
          Change Avatar
        </button>
      </div>

      {/* Badges */}
      <h2 ref={badgesRef} className="mt-8 mb-3 text-lg font-bold text-white scroll-mt-24">Badges</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {BADGES.map(b => <BadgeCard key={b.id} badge={b} />)}
      </div>

      {/* Avatar Rewards */}
      <h2 ref={avatarsRef} className="mt-8 mb-3 text-lg font-bold text-white scroll-mt-24">Avatar Rewards</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <AvatarRewardCard
          id="standard"
          equipped={equipped === 'standard'}
          onEquip={() => equip('standard')}
        />
        <KingAvatarCard
          unlocked={kingUnlocked}
          equipped={equipped === 'king'}
          onEquip={() => equip('king')}
        />
      </div>
    </div>
  );
}

function BadgeCard({ badge }: { badge: Badge }) {
  const r = RARITY[badge.rarity];
  return (
    <div
      className="relative p-4 flex flex-col items-center text-center"
      style={{
        backgroundColor: CARD_BG,
        borderRadius: 12,
        border: `2px solid ${badge.unlocked ? r.color : BORDER}`,
        opacity: badge.unlocked ? 1 : 0.85,
      }}
    >
      <div className="relative mb-2" style={{ color: badge.unlocked ? r.color : '#555170' }}>
        {badge.icon}
        {!badge.unlocked && (
          <Lock className="absolute -bottom-1 -right-1 h-3.5 w-3.5 text-muted-foreground bg-[#0F0D1F] rounded-full p-0.5" />
        )}
      </div>
      <p className="text-sm font-bold text-white">{badge.name}</p>
      <span className="text-[10px] font-bold uppercase mt-0.5" style={{ color: r.color }}>
        {r.label}
      </span>
      {badge.unlocked ? (
        <p className="mt-1 text-[11px] text-muted-foreground">Unlocked {badge.date}</p>
      ) : (
        <>
          <p className="mt-1 text-[11px] text-muted-foreground leading-snug">{badge.condition}</p>
          {badge.progress && (
            <div className="w-full mt-2">
              <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: BORDER }}>
                <div
                  className="h-full"
                  style={{ width: `${(badge.progress.current / badge.progress.target) * 100}%`, backgroundColor: r.color }}
                />
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">{badge.progress.current}/{badge.progress.target}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function AvatarRewardCard({ id, equipped, onEquip }: { id: AvatarId; equipped: boolean; onEquip: () => void }) {
  return (
    <div
      className="p-4 flex flex-col items-center text-center"
      style={{ backgroundColor: CARD_BG, borderRadius: 12, border: `2px solid ${BORDER}` }}
    >
      <AvatarVisual id={id} size={72} initial="G" />
      <p className="mt-2 text-sm font-bold text-white">Standard Getmo</p>
      <span className="text-[10px] font-bold uppercase mt-0.5 text-muted-foreground">Default</span>
      <div className="mt-3 w-full">
        {equipped ? (
          <span className="inline-flex items-center justify-center gap-1 w-full py-1.5 rounded-md text-xs font-bold text-white" style={{ backgroundColor: '#22C55E' }}>
            <Check className="h-3 w-3" /> Currently Equipped
          </span>
        ) : (
          <button onClick={onEquip} className="w-full py-1.5 rounded-md text-xs font-bold text-white" style={{ backgroundColor: PURPLE }}>
            Equip
          </button>
        )}
      </div>
    </div>
  );
}

function KingAvatarCard({ unlocked, equipped, onEquip }: { unlocked: boolean; equipped: boolean; onEquip: () => void }) {
  return (
    <div
      className="relative p-4 flex flex-col items-center text-center"
      style={{
        backgroundColor: CARD_BG,
        borderRadius: 12,
        border: `2px solid ${GOLD}`,
      }}
    >
      <span
        className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-bold"
        style={{ backgroundColor: 'rgba(245,196,26,0.15)', color: GOLD }}
      >
        LEGENDARY
      </span>
      <div className="relative" style={{ opacity: unlocked ? 1 : 0.4 }}>
        <AvatarVisual id="king" size={72} initial="G" />
        {!unlocked && (
          <Lock className="absolute inset-0 m-auto h-6 w-6 text-white drop-shadow" />
        )}
      </div>
      <p className="mt-2 text-sm font-bold text-white">King Getmo</p>
      {unlocked ? (
        <p className="mt-1 text-[11px] font-semibold leading-snug" style={{ color: GOLD }}>
          👑 Earned — Reach #1 on Leaderboard
        </p>
      ) : (
        <p className="mt-1 text-[11px] leading-snug" style={{ color: GOLD }}>
          Reach #1 on any leaderboard to unlock 👑
        </p>
      )}
      <div className="mt-3 w-full">
        {unlocked && (
          equipped ? (
            <span className="inline-flex items-center justify-center gap-1 w-full py-1.5 rounded-md text-xs font-bold text-white" style={{ backgroundColor: '#22C55E' }}>
              <Check className="h-3 w-3" /> Currently Equipped
            </span>
          ) : (
            <button onClick={onEquip} className="w-full py-1.5 rounded-md text-xs font-bold text-white" style={{ backgroundColor: PURPLE }}>
              Use as Avatar
            </button>
          )
        )}
      </div>
    </div>
  );
}

// ---- Activity Tab ----
function ActivityTab() {
  // Reuse the right column event history full width by rendering MyProgressContent
  // and visually hiding its left column via a wrapper class. Simpler: render only events.
  return (
    <div className="animate-fade-in">
      <ActivityFullWidth />
    </div>
  );
}

// Activity events feed (full width).
const ACTIVITY_EVENTS = [
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

function ActivityFullWidth() {
  return (
    <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="p-5 border-b border-border/50">
        <h2 className="font-orbitron font-bold text-foreground flex items-center gap-2">
          <Zap className="h-5 w-5 text-secondary" />
          Full Event History
        </h2>
        <p className="text-xs text-muted-foreground mt-1">All XP earned from your activity</p>
      </div>
      <ScrollArea className="h-[700px]">
        <div className="p-4 space-y-1">
          {ACTIVITY_EVENTS.map((event, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors group"
            >
              <div className="p-2.5 rounded-lg bg-primary/15 text-primary">
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
  );
}

// ---------------- XP & Level Tab ----------------
const MUTED = 'hsl(var(--muted-foreground))';

function XPLevelTab() {
  const navigate = useNavigate();
  const { displayLevel, displayXp } = useGuest();

  // Level math (mock): each level needs level*1000 XP from prior threshold.
  const level = displayLevel || 7;
  const totalXp = displayXp || 6000;
  const nextLevelTarget = 3000;
  const currentInLevel = 2400;
  const remaining = Math.max(0, nextLevelTarget - currentInLevel);
  const pct = Math.min(100, (currentInLevel / nextLevelTarget) * 100);

  // Week stats (mock, lines up with existing data shape)
  const xpThisWeek = 1240;
  const loginStreak = 5;
  const dailyCapUsed = 320;
  const dailyCapMax = 500;
  const capPct = Math.min(100, (dailyCapUsed / dailyCapMax) * 100);
  const capReached = dailyCapUsed >= dailyCapMax;
  const onFire = loginStreak >= 7;

  // Top 2 closest rewards (highest % progress) — pulled from BADGES list above.
  const closest = useMemo(() => {
    return BADGES
      .filter(b => !b.unlocked && b.progress)
      .map(b => ({ b, pct: (b.progress!.current / b.progress!.target) * 100 }))
      .sort((a, z) => z.pct - a.pct)
      .slice(0, 2);
  }, []);

  const earnActions = [
    { xp: '+75 XP',     name: 'Beat a High Score', desc: 'Set a new personal best in any game',  cta: 'Play Now →',     href: '/' },
    { xp: '+60 XP',     name: 'Win 3 Rounds',      desc: 'Complete 3 rounds or levels in any game', cta: 'Play Now →',  href: '/' },
    { xp: 'Up to +280 XP', name: 'Complete Daily Missions', desc: "Finish today's challenges before midnight", cta: 'View Missions →', href: '/daily-missions' },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      {/* Block 1 — Your Level */}
      <div className="p-8 text-center" style={{ background: CARD_BG, borderRadius: 12 }}>
        <div className="mx-auto flex items-center justify-center rounded-full mb-5"
             style={{ width: 140, height: 140, background: PURPLE }}>
          <span className="text-white font-bold" style={{ fontSize: 48, lineHeight: 1 }}>LV.{level}</span>
        </div>
        <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: BORDER }}>
          <div className="h-full transition-all" style={{ width: `${pct}%`, background: PURPLE }} />
        </div>
        <p className="mt-2 text-xs" style={{ color: MUTED }}>{currentInLevel.toLocaleString()} / {nextLevelTarget.toLocaleString()} XP</p>
        <p className="mt-4 text-base text-white">You need <span className="font-bold">{remaining.toLocaleString()}</span> more XP to reach LV.{level + 1}</p>
        <p className="mt-1 text-sm" style={{ color: MUTED }}>Total XP earned: {totalXp.toLocaleString()}</p>
      </div>

      {/* Block 2 — This Week at a Glance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatBlock>
          <p className="text-sm mb-1">⚡ XP Earned This Week</p>
          <p className="text-3xl font-bold text-white">{xpThisWeek.toLocaleString()}</p>
          <p className="text-xs mt-1" style={{ color: MUTED }}>this week</p>
        </StatBlock>
        <StatBlock>
          <p className="text-sm mb-1">🔥 Login Streak</p>
          <p className="text-3xl font-bold" style={{ color: onFire ? GOLD : '#fff' }}>
            {loginStreak} days
          </p>
          {onFire ? (
            <p className="text-xs mt-1 font-semibold" style={{ color: GOLD }}>🔥 On fire!</p>
          ) : loginStreak < 7 ? (
            <p className="text-xs mt-1" style={{ color: MUTED }}>{7 - loginStreak} days from Dedicated badge</p>
          ) : null}
        </StatBlock>
        <button
          onClick={() => navigate('/daily-missions')}
          className="text-left p-5 transition-transform hover:-translate-y-0.5"
          style={{ background: CARD_BG, borderRadius: 12 }}
        >
          <p className="text-sm mb-1">📅 Daily Cap Today</p>
          <p className="text-3xl font-bold text-white">{dailyCapUsed} <span className="text-base font-normal" style={{ color: MUTED }}>/ {dailyCapMax} XP</span></p>
          <div className="w-full h-1.5 rounded-full overflow-hidden mt-2" style={{ background: BORDER }}>
            <div className="h-full" style={{ width: `${capPct}%`, background: capReached ? GOLD : PURPLE }} />
          </div>
          {capReached && <p className="text-xs mt-2 font-semibold" style={{ color: GOLD }}>Cap reached ✓</p>}
        </button>
      </div>

      {/* Block 3 — Best Ways to Earn XP */}
      <div>
        <h2 className="text-lg font-bold text-white">Best Ways to Earn XP</h2>
        <p className="text-sm" style={{ color: MUTED }}>Fastest paths to your next level</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
          {earnActions.map(a => (
            <div key={a.name} className="p-4 flex flex-col" style={{ background: CARD_BG, borderRadius: 12, borderLeft: `2px solid ${PURPLE}` }}>
              <p className="font-bold" style={{ color: GOLD }}>{a.xp}</p>
              <p className="font-bold text-white mt-1">{a.name}</p>
              <p className="text-xs mt-1 flex-1" style={{ color: MUTED }}>{a.desc}</p>
              <Link to={a.href} className="mt-3 text-sm font-semibold self-end" style={{ color: PURPLE }}>{a.cta}</Link>
            </div>
          ))}
        </div>
      </div>

      {/* Block 4 — Coming Up Next */}
      <div>
        <h2 className="text-lg font-bold text-white">Keep Going to Unlock These</h2>
        <p className="text-sm" style={{ color: MUTED }}>Your closest rewards — complete these to unlock</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          {closest.map(({ b }) => {
            const r = RARITY[b.rarity];
            const cur = b.progress!.current, tgt = b.progress!.target;
            const p = (cur / tgt) * 100;
            const barColor = p >= 80 ? GOLD : PURPLE;
            return (
              <div key={b.id} className="p-5" style={{ background: CARD_BG, borderRadius: 12, border: `2px solid ${r.color}` }}>
                <div className="flex items-start gap-4">
                  <div style={{ color: r.color, opacity: 0.5 }}>{b.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white">{b.name}</p>
                    <span className="text-[10px] font-bold uppercase" style={{ color: r.color }}>{r.label}</span>
                    <div className="mt-2 h-2 rounded-full overflow-hidden" style={{ background: BORDER }}>
                      <div className="h-full" style={{ width: `${p}%`, background: barColor }} />
                    </div>
                    <p className="text-[11px] mt-1" style={{ color: MUTED }}>{cur} / {tgt}</p>
                    <p className="text-xs mt-2" style={{ color: MUTED }}>{b.condition}</p>
                    <Link to="/" className="text-xs font-semibold mt-2 inline-block" style={{ color: PURPLE }}>→ Go Play</Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button
          onClick={() => navigate('/my-progress?tab=rewards')}
          className="mt-4 w-full py-3 rounded-lg text-sm font-semibold border-2 transition-colors hover:bg-white/5"
          style={{ color: PURPLE, borderColor: PURPLE, background: 'transparent' }}
        >
          View All Rewards →
        </button>
      </div>
    </div>
  );
}

function StatBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-5 text-center" style={{ background: CARD_BG, borderRadius: 12 }}>
      {children}
    </div>
  );
}